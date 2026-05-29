import { Fragment, useEffect, useMemo, useRef, useState } from 'react';
import confetti from 'canvas-confetti';
import { ArrowLeft, BookOpen, Check, Lightbulb, MapPin, MessageCircle, PawPrint, RotateCcw, Stamp, Volume2 } from 'lucide-react';
import { allPaletteColors, flags } from './data/flags.js';
import { animalFacts } from './data/animalFacts.js';
import { countryFacts } from './data/countryFacts.js';
import { greetingRecordings } from './data/greetingRecordings.js';
import { speechLanguages } from './data/speechLanguages.js';
import ColorPalette from './components/ColorPalette.jsx';
import FlagCanvas from './components/FlagCanvas.jsx';
import CountrySelect from './components/CountrySelect.jsx';
import WorldMapSelector from './components/WorldMapSelector.jsx';
import RevealMode from './modes/RevealMode.jsx';

const emptyPaint = (flag) =>
  Object.fromEntries(flag.regions.map((region) => [region.id, '#ffffff']));

const normalizeHex = (value) => value.toLowerCase();

const formatTime = (totalSeconds) => {
  const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
  const seconds = (totalSeconds % 60).toString().padStart(2, '0');
  return `${minutes}:${seconds}`;
};

const KID_SPEECH_RATE = 0.78;
const COMPLETED_FLAGS_STORAGE_KEY = 'completedFlags';
const SPEECH_NOT_SUPPORTED_MESSAGE =
  'Browser voice pronunciation is not supported in this browser.';

const readCompletedFlagNames = () => {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    const storedValue = window.localStorage.getItem(COMPLETED_FLAGS_STORAGE_KEY);

    if (!storedValue) {
      return [];
    }

    const parsedValue = JSON.parse(storedValue);

    if (!Array.isArray(parsedValue)) {
      return [];
    }

    return Array.from(
      new Set(parsedValue.filter((countryName) => typeof countryName === 'string'))
    );
  } catch {
    return [];
  }
};

const writeCompletedFlagNames = (countryNames) => {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    window.localStorage.setItem(
      COMPLETED_FLAGS_STORAGE_KEY,
      JSON.stringify(countryNames)
    );
  } catch {
    // Progress still updates in memory if localStorage is unavailable.
  }
};

const fireSuccessConfetti = () => {
  const cannonOptions = {
    particleCount: 90,
    spread: 64,
    startVelocity: 52,
    ticks: 220,
    scalar: 1.05,
    zIndex: 1000
  };

  confetti({
    ...cannonOptions,
    angle: 58,
    origin: { x: 0, y: 1 }
  });

  confetti({
    ...cannonOptions,
    angle: 122,
    origin: { x: 1, y: 1 }
  });
};

const canUseSpeechSynthesis = () =>
  typeof window !== 'undefined' &&
  'speechSynthesis' in window &&
  'SpeechSynthesisUtterance' in window;

const findVoiceForLanguage = (languageCode) => {
  const voices = window.speechSynthesis.getVoices();
  const normalizedLanguage = languageCode.toLowerCase();
  const baseLanguage = normalizedLanguage.split('-')[0];

  return (
    voices.find((voice) => voice.lang.toLowerCase() === normalizedLanguage) ||
    voices.find((voice) => voice.lang.toLowerCase().startsWith(`${baseLanguage}-`)) ||
    null
  );
};

const shuffleFlags = (items) => {
  const shuffledItems = [...items];

  for (let index = shuffledItems.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [shuffledItems[index], shuffledItems[randomIndex]] = [
      shuffledItems[randomIndex],
      shuffledItems[index]
    ];
  }

  return shuffledItems;
};

const createRandomSessionList = (startingFlag, sourceList) => {
  const availableFlags = sourceList.length > 0 ? sourceList : flags;
  const remainingFlags = availableFlags.filter((flag) => flag.id !== startingFlag.id);

  return [startingFlag, ...shuffleFlags(remainingFlags)];
};

function SpeechButton({ label, onSpeak }) {
  return (
    <button className="speech-button" type="button" onClick={onSpeak} aria-label={label} title={label}>
      <Volume2 size={17} />
    </button>
  );
}

function App() {
  const [selectedFlagId, setSelectedFlagId] = useState(null);
  const [selectedColor, setSelectedColor] = useState(allPaletteColors[0].hex);
  const [paintedRegions, setPaintedRegions] = useState({});
  const [incorrectRegionIds, setIncorrectRegionIds] = useState([]);
  const [message, setMessage] = useState('Pick a country to start painting.');
  const [score, setScore] = useState({ completed: 0, attempted: 0 });
  const [attemptedFlags, setAttemptedFlags] = useState({});
  const [sessionCompletedFlags, setSessionCompletedFlags] = useState({});
  const [completedFlagNames, setCompletedFlagNames] = useState(readCompletedFlagNames);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [difficultyFilter, setDifficultyFilter] = useState('all');
  const [selectionMode, setSelectionMode] = useState('cards');
  const [gameMode, setGameMode] = useState('paint');
  const [playList, setPlayList] = useState([]);
  const [currentPlayIndex, setCurrentPlayIndex] = useState(0);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [sessionComplete, setSessionComplete] = useState(false);
  const [isAdvancing, setIsAdvancing] = useState(false);
  const [isPassportOpen, setIsPassportOpen] = useState(false);
  const advanceTimeoutRef = useRef(null);
  const greetingAudioRef = useRef(null);
  const isAdvancingRef = useRef(false);

  const selectedFlag = useMemo(
    () => flags.find((flag) => flag.id === selectedFlagId),
    [selectedFlagId]
  );
  const selectedAnimalFact = selectedFlag ? animalFacts[selectedFlag.id] : null;
  const selectedCountryFact = selectedFlag ? countryFacts[selectedFlag.id] : null;
  const selectedGreetingRecording = selectedFlag
    ? greetingRecordings[selectedFlag.id] || null
    : null;
  const selectedSpeechLanguage = selectedFlag
    ? speechLanguages[selectedFlag.id] || 'en-US'
    : 'en-US';
  const [speechMessage, setSpeechMessage] = useState('');
  const speechSupported = canUseSpeechSynthesis();
  const visibleSpeechMessage =
    speechMessage || (!speechSupported && selectedFlag ? SPEECH_NOT_SUPPORTED_MESSAGE : '');

  const stopGreetingRecording = () => {
    const currentClip = greetingAudioRef.current;

    if (!currentClip) {
      return;
    }

    currentClip.abort();
    greetingAudioRef.current = null;
  };

  useEffect(() => {
    if (!timerRunning) {
      return undefined;
    }

    const intervalId = window.setInterval(() => {
      setElapsedSeconds((current) => current + 1);
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, [timerRunning]);

  useEffect(() => () => {
    if (advanceTimeoutRef.current) {
      window.clearTimeout(advanceTimeoutRef.current);
    }

    stopGreetingRecording();

    if (canUseSpeechSynthesis()) {
      window.speechSynthesis.cancel();
    }
  }, []);

  useEffect(() => {
    stopGreetingRecording();
    setSpeechMessage('');
  }, [selectedFlag]);

  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === COMPLETED_FLAGS_STORAGE_KEY) {
        setCompletedFlagNames(readCompletedFlagNames());
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const saveCompletedFlagName = (countryName) => {
    setCompletedFlagNames((currentNames) => {
      if (currentNames.includes(countryName)) {
        writeCompletedFlagNames(currentNames);
        return currentNames;
      }

      const nextNames = [...currentNames, countryName];
      writeCompletedFlagNames(nextNames);
      return nextNames;
    });
  };

  const resetProgressPassport = () => {
    const shouldReset = window.confirm(
      'Reset your progress passport and remove all saved country stamps?'
    );

    if (!shouldReset) {
      return;
    }

    writeCompletedFlagNames([]);
    setCompletedFlagNames([]);
    setMessage('Progress passport reset. New stamps will appear after correct flags.');
  };

  const loadFlag = (flag, nextIndex) => {
    setSelectedFlagId(flag.id);
    setPaintedRegions(emptyPaint(flag));
    setIncorrectRegionIds([]);
    setSelectedColor(flag.palette[0].hex);
    setHintsUsed(0);
    setCurrentPlayIndex(nextIndex);
    isAdvancingRef.current = false;
    setIsAdvancing(false);
    setMessage(`Paint ${flag.name}'s flag. Choose a color, then tap a region.`);
  };

  const chooseCountry = (flag, sourceList = flags) => {
    const sessionList = createRandomSessionList(flag, sourceList);

    if (advanceTimeoutRef.current) {
      window.clearTimeout(advanceTimeoutRef.current);
      advanceTimeoutRef.current = null;
    }

    setPlayList(sessionList);
    setScore({ completed: 0, attempted: 0 });
    setAttemptedFlags({});
    setSessionCompletedFlags({});
    setElapsedSeconds(0);
    setTimerRunning(true);
    setSessionComplete(false);
    loadFlag(flag, 0);
  };

  const goHome = () => {
    if (advanceTimeoutRef.current) {
      window.clearTimeout(advanceTimeoutRef.current);
      advanceTimeoutRef.current = null;
    }
    setSelectedFlagId(null);
    setPlayList([]);
    setCurrentPlayIndex(0);
    setIncorrectRegionIds([]);
    setPaintedRegions({});
    setScore({ completed: 0, attempted: 0 });
    setAttemptedFlags({});
    setSessionCompletedFlags({});
    setHintsUsed(0);
    setElapsedSeconds(0);
    setTimerRunning(false);
    setSessionComplete(false);
    isAdvancingRef.current = false;
    setIsAdvancing(false);
    setMessage('Pick a country to start painting.');
  };

  const paintRegion = (regionId) => {
    setPaintedRegions((current) => ({
      ...current,
      [regionId]: selectedColor
    }));
    setIncorrectRegionIds((current) => current.filter((id) => id !== regionId));
    setMessage('Nice! Keep painting or check your answer.');
  };

  const resetFlag = () => {
    setPaintedRegions(emptyPaint(selectedFlag));
    setIncorrectRegionIds([]);
    setHintsUsed(0);
    setMessage('Fresh white flag. Try again!');
  };

  const checkAnswer = () => {
    if (isAdvancingRef.current) {
      return;
    }

    const wrongIds = selectedFlag.regions
      .filter(
        (region) =>
          normalizeHex(paintedRegions[region.id]) !== normalizeHex(region.correctColor)
      )
      .map((region) => region.id);

    setIncorrectRegionIds(wrongIds);

    const isNewAttempt = !attemptedFlags[selectedFlag.id];
    const isCorrect = wrongIds.length === 0;
    const isNewCompletion = isCorrect && !sessionCompletedFlags[selectedFlag.id];

    if (isNewAttempt) {
      setAttemptedFlags((current) => ({ ...current, [selectedFlag.id]: true }));
    }

    if (isNewCompletion) {
      setSessionCompletedFlags((current) => ({ ...current, [selectedFlag.id]: true }));
    }

    if (isNewAttempt || isNewCompletion) {
      setScore((current) => ({
        completed: current.completed + (isNewCompletion ? 1 : 0),
        attempted: current.attempted + (isNewAttempt ? 1 : 0)
      }));
    }

    if (isCorrect) {
      fireSuccessConfetti();
      saveCompletedFlagName(selectedFlag.name);
      setIsPassportOpen(true);
      isAdvancingRef.current = true;
      setIsAdvancing(true);
      setMessage('Correct! Moving to a random next flag...');
      advanceTimeoutRef.current = window.setTimeout(() => {
        const nextIndex = currentPlayIndex + 1;
        const nextFlag = playList[nextIndex];

        if (nextFlag) {
          loadFlag(nextFlag, nextIndex);
          return;
        }

        setTimerRunning(false);
        setSelectedFlagId(null);
        setIncorrectRegionIds([]);
        setPaintedRegions({});
        isAdvancingRef.current = false;
        setIsAdvancing(false);
        setSessionComplete(true);
      }, 1500);
      return;
    }

    setMessage(`${wrongIds.length} region${wrongIds.length === 1 ? ' is' : 's are'} still waiting for the right color.`);
  };

  const revealHint = () => {
    if (hintsUsed >= 2) {
      setMessage('No hints left for this flag. You can do it!');
      return;
    }

    const nextRegion = selectedFlag.regions.find(
      (region) =>
        normalizeHex(paintedRegions[region.id]) !== normalizeHex(region.correctColor)
    );

    if (!nextRegion) {
      setMessage('Everything already looks correct. Try checking your answer!');
      return;
    }

    setPaintedRegions((current) => ({
      ...current,
      [nextRegion.id]: nextRegion.correctColor
    }));
    setIncorrectRegionIds((current) => current.filter((id) => id !== nextRegion.id));
    setHintsUsed((current) => current + 1);
    setMessage(nextRegion.hint || `Hint placed: ${nextRegion.label}.`);
  };

  const playAgain = () => {
    const firstFlag = playList[0] || flags[0];
    chooseCountry(firstFlag, playList.length > 0 ? playList : flags);
  };

  const speakText = (text, languageCode = selectedSpeechLanguage) => {
    if (!speechSupported) {
      setSpeechMessage(SPEECH_NOT_SUPPORTED_MESSAGE);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    const voice = findVoiceForLanguage(languageCode);

    if (voice) {
      utterance.voice = voice;
    }

    utterance.lang = voice?.lang || languageCode;
    utterance.rate = KID_SPEECH_RATE;
    utterance.pitch = 1;
    utterance.onstart = () => setSpeechMessage(`Playing: ${text}`);
    utterance.onend = () => setSpeechMessage('');
    utterance.onerror = () => {
      setSpeechMessage('Audio pronunciation could not play. Try again.');
    };

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };

  const playGreetingClip = (clipInfo) =>
    new Promise((resolve, reject) => {
      if (typeof Audio === 'undefined') {
        reject(new Error('Audio element is not available.'));
        return;
      }

      const audio = new Audio(clipInfo.src);

      const cleanup = () => {
        audio.removeEventListener('ended', handleEnded);
        audio.removeEventListener('error', handleError);

        if (greetingAudioRef.current?.audio === audio) {
          greetingAudioRef.current = null;
        }
      };

      const handleEnded = () => {
        cleanup();
        resolve();
      };

      const handleError = () => {
        cleanup();
        reject(new Error('Greeting recording could not play.'));
      };

      const abort = () => {
        const abortError = new Error('Greeting recording stopped.');
        abortError.name = 'AbortError';

        audio.pause();
        audio.currentTime = 0;
        cleanup();
        reject(abortError);
      };

      audio.addEventListener('ended', handleEnded);
      audio.addEventListener('error', handleError);
      greetingAudioRef.current = { abort, audio };
      audio.play().catch(handleError);
    });

  const speakGreeting = async (text) => {
    stopGreetingRecording();

    if (canUseSpeechSynthesis()) {
      window.speechSynthesis.cancel();
    }

    if (!selectedGreetingRecording) {
      setSpeechMessage('Human recording not added yet, using browser voice.');
      speakText(text);
      return;
    }

    setSpeechMessage(`Playing human recording: ${text}`);

    try {
      for (const clipInfo of selectedGreetingRecording.clips) {
        await playGreetingClip(clipInfo);
      }

      setSpeechMessage('');
    } catch (error) {
      if (error.name === 'AbortError') {
        return;
      }

      setSpeechMessage('Recording unavailable, using browser voice.');
      speakText(text);
    }
  };

  if (gameMode === 'reveal') {
    return <RevealMode flags={flags} onExit={() => setGameMode('paint')} />;
  }

  if (sessionComplete) {
    return (
      <main className="app-shell">
        <section className="completion-panel">
          <p className="eyebrow">Challenge complete</p>
          <h1>Great Painting!</h1>
          <p className="completion-copy">
            You finished every flag in this session.
          </p>
          <div className="completion-stats" aria-label="Session results">
            <div>
              <strong>{score.completed}</strong>
              <span>flags completed</span>
            </div>
            <div>
              <strong>{formatTime(elapsedSeconds)}</strong>
              <span>elapsed time</span>
            </div>
            <div>
              <strong>{score.completed}</strong>
              <span>of {score.attempted} correct</span>
            </div>
          </div>
          <div className="completion-actions">
            <button className="action-button check" type="button" onClick={playAgain}>
              Play Again
            </button>
            <button className="action-button" type="button" onClick={goHome}>
              Back to Country Select
            </button>
          </div>
        </section>
      </main>
    );
  }

  if (!selectedFlag) {
    return (
      <main className="app-shell">
        <section className="home-panel">
          <div className="home-copy">
            <p className="eyebrow">Color, learn, and check your work</p>
            <h1>Flag Painter Challenge</h1>
            <p>
              Choose a country, paint each outlined part of the flag, and see how
              many you can complete.
            </p>
          </div>
          <div className="selection-tabs" aria-label="Choose game mode">
            <button
              className="active"
              type="button"
              onClick={() => setGameMode('paint')}
            >
              Paint the Flag
            </button>
            <button
              type="button"
              onClick={() => setGameMode('reveal')}
            >
              Flag Reveal
            </button>
          </div>
          <div className="selection-tabs" aria-label="Choose selection mode">
            <button
              className={selectionMode === 'cards' ? 'active' : ''}
              type="button"
              onClick={() => setSelectionMode('cards')}
            >
              Cards
            </button>
            <button
              className={selectionMode === 'map' ? 'active' : ''}
              type="button"
              onClick={() => setSelectionMode('map')}
            >
              World Map
            </button>
          </div>
          {selectionMode === 'cards' ? (
            <CountrySelect
              flags={flags}
              activeFilter={difficultyFilter}
              onFilterChange={setDifficultyFilter}
              onChoose={chooseCountry}
            />
          ) : (
            <WorldMapSelector flags={flags} onChoose={(flag) => chooseCountry(flag, flags)} />
          )}
        </section>
      </main>
    );
  }

  return (
    <main className="app-shell">
      <section className="game-layout">
        <div className="game-header">
          <button className="icon-button" type="button" onClick={goHome} aria-label="Back to country select">
            <ArrowLeft size={22} />
          </button>
          <div>
            <p className="eyebrow">Now painting</p>
            <div className="speakable-title">
              <h1>{selectedFlag.name}</h1>
              <SpeechButton
                label={`Hear ${selectedFlag.name}`}
                onSpeak={() => speakText(selectedFlag.name)}
              />
            </div>
          </div>
          <div className="timer-card" aria-label="Elapsed time">
            <strong>{formatTime(elapsedSeconds)}</strong>
            <span>time</span>
          </div>
          <button
            className="passport-button"
            type="button"
            onClick={() => setIsPassportOpen((isOpen) => !isOpen)}
            aria-controls="passport-stamps"
            aria-expanded={isPassportOpen}
          >
            <BookOpen size={25} />
            <span>
              <strong>Passport</strong>
              <small>{completedFlagNames.length} stamps</small>
            </span>
          </button>
          <div className="score-card" aria-label="Score">
            <strong>{completedFlagNames.length}</strong>
            <span>of {flags.length} completed</span>
          </div>
        </div>

        {isPassportOpen ? (
          <section className="passport-panel" id="passport-stamps" aria-label="Saved progress passport">
            <div className="passport-panel-heading">
              <BookOpen size={34} />
              <div>
                <p className="eyebrow">Save progress passport</p>
                <h2>Country Stamps</h2>
              </div>
              <button
                className="passport-reset-button"
                type="button"
                onClick={resetProgressPassport}
                disabled={completedFlagNames.length === 0}
              >
                <RotateCcw size={16} />
                Reset Passport
              </button>
            </div>
            {completedFlagNames.length > 0 ? (
              <div className="passport-stamp-grid">
                {completedFlagNames.map((countryName) => (
                  <span className="passport-stamp" key={countryName}>
                    <Stamp size={15} />
                    {countryName}
                  </span>
                ))}
              </div>
            ) : (
              <p className="passport-empty">Complete a flag to earn your first passport stamp.</p>
            )}
          </section>
        ) : null}

        <div className="play-area">
          <div className="canvas-panel">
            <FlagCanvas
              flag={selectedFlag}
              paintedRegions={paintedRegions}
              incorrectRegionIds={incorrectRegionIds}
              onPaintRegion={paintRegion}
            />
            <p className="game-message" role="status">{message}</p>
          </div>

          <aside className="tool-panel" aria-label="Painting tools">
            <ColorPalette
              colors={selectedFlag.palette}
              selectedColor={selectedColor}
              onSelectColor={setSelectedColor}
            />
            {selectedAnimalFact ? (
              <section className="animal-fact-card" aria-label={`Animal fact for ${selectedFlag.name}`}>
                <div className="animal-fact-heading">
                  <PawPrint size={20} />
                  <span>Animal fact</span>
                </div>
                <strong>{selectedAnimalFact.animal}</strong>
                <p>{selectedAnimalFact.fact}</p>
              </section>
            ) : null}
            {selectedCountryFact ? (
              <section className="country-fact-card" aria-label={`Country fact for ${selectedFlag.name}`}>
                <div className="animal-fact-heading">
                  <MapPin size={20} />
                  <span>Country facts</span>
                </div>
                <dl className="country-fact-list">
                  <div>
                    <dt>Capital</dt>
                    <dd className="speakable-value">
                      <span>{selectedCountryFact.capital}</span>
                      <SpeechButton
                        label={`Hear ${selectedCountryFact.capital}`}
                        onSpeak={() => speakText(selectedCountryFact.capital)}
                      />
                    </dd>
                  </div>
                  <div>
                    <dt>
                      <MessageCircle size={16} />
                      Hello in {selectedCountryFact.language}
                    </dt>
                    <dd className="speakable-value">
                      <span>{selectedCountryFact.hello}</span>
                      <SpeechButton
                        label={`Hear ${selectedCountryFact.hello}`}
                        onSpeak={() => speakGreeting(selectedCountryFact.hello)}
                      />
                    </dd>
                    {selectedGreetingRecording ? (
                      <p className="recording-credit">
                        Human recording:{' '}
                        {selectedGreetingRecording.clips.map((clipInfo, index) => (
                          <Fragment key={clipInfo.src}>
                            {index > 0 ? ', ' : ''}
                            <a href={clipInfo.sourceUrl} target="_blank" rel="noreferrer">
                              {clipInfo.credit}
                            </a>
                          </Fragment>
                        ))}
                      </p>
                    ) : null}
                  </div>
                </dl>
                {visibleSpeechMessage ? (
                  <p className="speech-status" role="status">{visibleSpeechMessage}</p>
                ) : null}
              </section>
            ) : null}
            <div className="action-grid">
              <button className="action-button check" type="button" onClick={checkAnswer} disabled={isAdvancing}>
                <Check size={20} /> Check Answer
              </button>
              <button className="action-button" type="button" onClick={resetFlag}>
                <RotateCcw size={20} /> Reset Flag
              </button>
              <button className="action-button" type="button" onClick={revealHint}>
                <Lightbulb size={20} /> Hint ({2 - hintsUsed})
              </button>
              <button className="action-button" type="button" onClick={goHome}>
                <ArrowLeft size={20} /> Country Select
              </button>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}

export default App;
