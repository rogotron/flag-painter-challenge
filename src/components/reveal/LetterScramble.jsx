import { useEffect, useMemo, useState } from 'react';

// Build a scrambled set of letter tiles from a country name.
// Spaces are dropped; every tile gets a unique id so duplicate letters
// (e.g. the two A's in "BAHAMAS") are tracked independently.
const buildScrambledTiles = (name) => {
  const tiles = name
    .toUpperCase()
    .split('')
    .filter((char) => char !== ' ')
    .map((letter, index) => ({ id: `tile-${index}`, letter }));

  for (let i = tiles.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
  }

  return tiles;
};

function LetterScramble({ answer, disabled = false, onSolved }) {
  const normalizedAnswer = useMemo(
    () => answer.toUpperCase().replace(/\s/g, ''),
    [answer]
  );
  const tiles = useMemo(() => buildScrambledTiles(answer), [answer]);
  const tileMap = useMemo(
    () => Object.fromEntries(tiles.map((tile) => [tile.id, tile])),
    [tiles]
  );

  // One slot per non-space letter; value is a tile id or null.
  const [slots, setSlots] = useState(() =>
    Array(normalizedAnswer.length).fill(null)
  );
  const [selectedTileId, setSelectedTileId] = useState(null);
  const [dragOverSlot, setDragOverSlot] = useState(null);
  const [isTrayDragOver, setIsTrayDragOver] = useState(false);

  // Reset the puzzle if the answer changes (parent also remounts via key).
  useEffect(() => {
    setSlots(Array(normalizedAnswer.length).fill(null));
    setSelectedTileId(null);
  }, [answer, normalizedAnswer.length]);

  const placedTileIds = new Set(slots.filter(Boolean));
  const trayTiles = tiles.filter((tile) => !placedTileIds.has(tile.id));

  const isComplete = slots.length > 0 && slots.every(Boolean);
  const placedWord = slots
    .map((tileId) => (tileId ? tileMap[tileId].letter : ''))
    .join('');
  const isCorrect = isComplete && placedWord === normalizedAnswer;

  // Notify the parent once when the puzzle becomes correct.
  useEffect(() => {
    if (isCorrect && onSolved) {
      onSolved();
    }
    // Intentionally only depends on isCorrect: after the parent disables the
    // puzzle the slots can't change, so this won't fire again for the round.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCorrect]);

  let message = 'Tap a letter to choose it.';
  let messageTone = '';
  if (isComplete && !isCorrect) {
    message = 'Not quite. Try moving a few letters.';
    messageTone = 'wrong';
  } else if (selectedTileId) {
    message = 'Now tap an empty box.';
    messageTone = 'hint';
  }

  // --- Shared placement/removal logic (used by BOTH tap and drag) ---

  // Place a tile into a slot. If the tile is already in another slot it is
  // moved; if the target slot is occupied, the prior tile is simply
  // overwritten and (being unreferenced) falls back to the tray.
  const placeTile = (tileId, slotIndex) => {
    if (disabled || !tileId) return;
    setSlots((current) => {
      const next = [...current];
      const existingIndex = next.indexOf(tileId);
      if (existingIndex !== -1) next[existingIndex] = null;
      next[slotIndex] = tileId;
      return next;
    });
    setSelectedTileId(null);
  };

  const removeFromSlot = (slotIndex) => {
    if (disabled) return;
    setSlots((current) => {
      if (!current[slotIndex]) return current;
      const next = [...current];
      next[slotIndex] = null;
      return next;
    });
  };

  // Return a placed tile to the tray. If the tile is already in the tray
  // (e.g. a tray->tray drop) this is a no-op.
  const returnTileToTray = (tileId) => {
    if (disabled || !tileId) return;
    setSlots((current) => {
      const index = current.indexOf(tileId);
      if (index === -1) return current;
      const next = [...current];
      next[index] = null;
      return next;
    });
    setSelectedTileId(null);
  };

  // --- Tap-to-place (primary interaction) ---

  const handleTileTap = (tileId) => {
    if (disabled) return;
    setSelectedTileId((current) => (current === tileId ? null : tileId));
  };

  const handleSlotTap = (slotIndex) => {
    if (disabled) return;
    if (slots[slotIndex]) {
      removeFromSlot(slotIndex);
      return;
    }
    if (selectedTileId) {
      placeTile(selectedTileId, slotIndex);
    }
  };

  const handleClear = () => {
    if (disabled) return;
    setSlots(Array(normalizedAnswer.length).fill(null));
    setSelectedTileId(null);
  };

  // --- Drag-and-drop (optional enhancement; calls the same helpers) ---

  const handleDragStart = (event, tileId) => {
    if (disabled) {
      event.preventDefault();
      return;
    }
    event.dataTransfer.setData('text/plain', tileId);
    event.dataTransfer.effectAllowed = 'move';
  };

  const allowDrop = (event) => {
    if (!disabled) event.preventDefault();
  };

  const handleSlotDrop = (event, slotIndex) => {
    event.preventDefault();
    setDragOverSlot(null);
    const tileId = event.dataTransfer.getData('text/plain');
    placeTile(tileId, slotIndex);
  };

  const handleTrayDrop = (event) => {
    event.preventDefault();
    setIsTrayDragOver(false);
    const tileId = event.dataTransfer.getData('text/plain');
    returnTileToTray(tileId);
  };

  // Render answer slots while preserving visual gaps between words.
  let slotCursor = -1;
  const slotRow = answer
    .toUpperCase()
    .split('')
    .map((char, index) => {
      if (char === ' ') {
        return <span className="reveal-slot-gap" key={`gap-${index}`} aria-hidden="true" />;
      }

      slotCursor += 1;
      const slotIndex = slotCursor;
      const tileId = slots[slotIndex];
      const letter = tileId ? tileMap[tileId].letter : '';

      return (
        <button
          key={`slot-${slotIndex}`}
          type="button"
          className={`reveal-slot ${tileId ? 'filled' : ''} ${dragOverSlot === slotIndex ? 'drag-over' : ''}`}
          onClick={() => handleSlotTap(slotIndex)}
          disabled={disabled}
          draggable={!disabled && Boolean(tileId)}
          onDragStart={(event) => handleDragStart(event, tileId)}
          onDragOver={(event) => {
            allowDrop(event);
            if (!disabled) setDragOverSlot(slotIndex);
          }}
          onDragLeave={() => setDragOverSlot((current) => (current === slotIndex ? null : current))}
          onDrop={(event) => handleSlotDrop(event, slotIndex)}
          aria-label={tileId ? `Slot ${slotIndex + 1}: ${letter}, tap to remove` : `Empty slot ${slotIndex + 1}`}
        >
          {letter}
        </button>
      );
    });

  return (
    <div className="reveal-scramble">
      <div className="reveal-slots" aria-label="Answer">
        {slotRow}
      </div>

      {!disabled ? (
        <p className={`reveal-message ${messageTone}`} role="status">
          {message}
        </p>
      ) : null}

      <div
        className={`reveal-tray ${isTrayDragOver ? 'drag-over' : ''}`}
        aria-label="Letter tiles"
        onDragOver={(event) => {
          allowDrop(event);
          if (!disabled) setIsTrayDragOver(true);
        }}
        onDragLeave={() => setIsTrayDragOver(false)}
        onDrop={handleTrayDrop}
      >
        {trayTiles.map((tile) => (
          <button
            key={tile.id}
            type="button"
            className={`reveal-tile ${selectedTileId === tile.id ? 'selected' : ''}`}
            onClick={() => handleTileTap(tile.id)}
            disabled={disabled}
            draggable={!disabled}
            onDragStart={(event) => handleDragStart(event, tile.id)}
            aria-label={`Letter ${tile.letter}`}
            aria-pressed={selectedTileId === tile.id}
          >
            {tile.letter}
          </button>
        ))}
      </div>

      <div className="reveal-scramble-actions">
        <button
          className="action-button"
          type="button"
          onClick={handleClear}
          disabled={disabled}
        >
          Clear
        </button>
      </div>
    </div>
  );
}

export default LetterScramble;
