import SvgRegion from '../SvgRegion.jsx';

// The four cover panels, in 2x2 order: top-left, top-right, bottom-left, bottom-right.
const PANELS = [
  { id: 0, position: 'top left' },
  { id: 1, position: 'top right' },
  { id: 2, position: 'bottom left' },
  { id: 3, position: 'bottom right' }
];

function FlagCoverGrid({ flag, revealedPanels, onRevealPanel, disabled = false }) {
  return (
    <div className="reveal-stage">
      {/* Bottom layer: the fully colored, read-only flag. */}
      <svg
        className="reveal-flag-svg"
        viewBox={flag.viewBox}
        aria-label="Mystery flag to guess"
      >
        {flag.regions.map((region) => (
          <SvgRegion
            key={region.id}
            className="reveal-flag-region"
            region={region}
            fill={region.correctColor}
          />
        ))}
      </svg>

      {/* Top layer: four tappable cover panels in a 2x2 grid. */}
      <div className="reveal-cover-grid" aria-label="Cover panels">
        {PANELS.map(({ id, position }) => {
          const isRevealed = revealedPanels.includes(id);

          return (
            <button
              key={id}
              type="button"
              className={`reveal-cover-panel ${isRevealed ? 'revealed' : ''}`}
              onClick={() => onRevealPanel(id)}
              disabled={isRevealed || disabled}
              aria-label={isRevealed ? `${position} panel revealed` : `Reveal ${position} panel`}
              aria-hidden={isRevealed}
            >
              <span className="reveal-cover-face">?</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default FlagCoverGrid;
