import { useRef, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import FlagCoverGrid from '../components/reveal/FlagCoverGrid.jsx';
import LetterScramble from '../components/reveal/LetterScramble.jsx';
import '../styles-reveal.css';

const SESSION_SIZE = 10;
// Score by number of panels revealed when the answer is solved.
const SCORE_BY_REVEALED = [100, 75, 50, 25, 10];

// Shuffle a copy and take up to SESSION_SIZE flags for one session.
const buildSession = (flags) => {
  const pool = [...flags];

  for (let i = pool.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }

  return pool.slice(0, Math.min(SESSION_SIZE, pool.length));
};

// Flag Reveal: a short shuffled session of flags. Players spell the country
// name with tap-to-place or drag-and-drop and reveal cover panels for hints.
function RevealMode({ flags, onExit }) {
  const [sessionFlags, setSessionFlags] = useState(() => buildSession(flags));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [revealedPanels, setRevealedPanels] = useState([]);
  const [sessionScore, setSessionScore] = useState(0);
  const [roundScore, setRoundScore] = useState(0);
  const [solvedCount, setSolvedCount] = useState(0);
  const [status, setStatus] = useState('playing'); // 'playing' | 'solved' | 'complete'
  const scoredRef = useRef(false); // guards against double scoring within a round

  const currentFlag = sessionFlags[currentIndex];

  const revealPanel = (panelId) => {
    if (status !== 'playing') return;
    setRevealedPanels((current) =>
      current.includes(panelId) ? current : [...current, panelId]
    );
  };

  const handleSolved = () => {
    if (scoredRef.current) return; // already scored this round
    scoredRef.current = true;

    const earned = SCORE_BY_REVEALED[revealedPanels.length];
    setRoundScore(earned);
    setSessionScore((current) => current + earned);
    setSolvedCount((current) => current + 1);
    setStatus('solved');
  };

  const goToNext = () => {
    const nextIndex = currentIndex + 1;

    if (nextIndex >= sessionFlags.length) {
      setStatus('complete');
      return;
    }

    scoredRef.current = false;
    setCurrentIndex(nextIndex);
    setRevealedPanels([]);
    setRoundScore(0);
    setStatus('playing');
  };

  const playAgain = () => {
    scoredRef.current = false;
    setSessionFlags(buildSession(flags));
    setCurrentIndex(0);
    setRevealedPanels([]);
    setSessionScore(0);
    setRoundScore(0);
    setSolvedCount(0);
    setStatus('playing');
  };

  if (status === 'complete') {
    return (
      <main className="app-shell">
        <section className="completion-panel">
          <p className="eyebrow">Flag Reveal</p>
          <h1>Session complete!</h1>
          <div className="completion-stats" aria-label="Session results">
            <div>
              <strong>{sessionScore}</strong>
              <span>final score</span>
            </div>
            <div>
              <strong>{solvedCount}</strong>
              <span>of {sessionFlags.length} flags</span>
            </div>
          </div>
          <div className="completion-actions">
            <button className="action-button check" type="button" onClick={playAgain}>
              Play Again
            </button>
            <button className="action-button" type="button" onClick={onExit}>
              <ArrowLeft size={20} /> Back
            </button>
          </div>
        </section>
      </main>
    );
  }

  const isSolved = status === 'solved';

  return (
    <main className="app-shell">
      <section className="home-panel reveal-panel">
        <div className="home-copy">
          <p className="eyebrow">Guess the country</p>
          <h1>Flag Reveal</h1>
          <p className="reveal-instructions">
            Guess the country. Tap letters to fill the answer. Tap a cover to
            reveal part of the flag.
          </p>
        </div>

        <div className="reveal-summary" aria-label="Round summary">
          <span>Flag {currentIndex + 1} of {sessionFlags.length}</span>
          <span>Score: {sessionScore}</span>
          <span role="status">Panels revealed: {revealedPanels.length} / 4</span>
        </div>

        <FlagCoverGrid
          flag={currentFlag}
          revealedPanels={revealedPanels}
          onRevealPanel={revealPanel}
          disabled={isSolved}
        />

        <LetterScramble
          key={currentFlag.id}
          answer={currentFlag.name}
          disabled={isSolved}
          onSolved={handleSolved}
        />

        {isSolved ? (
          <div className="reveal-solved" role="status">
            <p className="reveal-solved-title">Correct!</p>
            <p className="reveal-earned">You earned {roundScore} points.</p>
            <button className="action-button check" type="button" onClick={goToNext}>
              Next
            </button>
          </div>
        ) : null}

        <button className="action-button" type="button" onClick={onExit}>
          <ArrowLeft size={20} /> Back
        </button>
      </section>
    </main>
  );
}

export default RevealMode;
