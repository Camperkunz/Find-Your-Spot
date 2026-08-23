import './App.css';
import { useAppContext } from './context/AppContext';
// 
import destinationsData from './data/ottawa_destinations.json';
import { filterDestinations } from './logic/sorting.js';
// 
import Layout from './components/ui/Layout.jsx';
import Card from './components/elements/Card.jsx';
import OrDivider from './components/elements/OrDivider.jsx';
// 
import WelcomeStep from './steps/Welcome.jsx';
import OnboardingStep from './steps/Onboarding.jsx';
import SavedStep from './steps/Saved.jsx';

function DeckFinishedState({ savedCount, onViewSaved, onReplayDeck, onChangeFilters }) {
  const hasSaved = savedCount > 0;

  return (
    <div className="text-center space-y-6 py-12 max-w-md w-full mx-auto">
      <span className="text-5xl">🗺️</span>

      <div className="space-y-2">
        <h4 className="text-2xl font-bold text-ink">That's all for today!</h4>
        <p className="text-ink-soft text-sm max-w-xs mx-auto">
          {hasSaved
            ? `You've saved ${savedCount} ${savedCount === 1 ? 'place' : 'places'} so far — take a look at your bucket list!`
            : "Looks like you haven't saved anything yet. Try changing your vibe check to see more adventures!"}
        </p>
      </div>

      <div className="pt-4 space-y-2 max-w-xs mx-auto w-full">
        {hasSaved ? (
          <button onClick={onViewSaved} className="btn-primary-lg w-full">
            View Saved Places ({savedCount})
          </button>
        ) : (
          <button onClick={onReplayDeck} className="btn-primary-lg w-full">
            Replay Deck 👀
          </button>
        )}

        {hasSaved && (
          <button onClick={onReplayDeck} className="btn-outline-lg w-full">
            Replay Deck 👀
          </button>
        )}

        <OrDivider />

        <button onClick={onChangeFilters} className="btn-outline-lg w-full">
          Change Filters 🔁
        </button>
      </div>
    </div>
  );
}

export default function AdventureApp() {
  const {
    step, setStep,
    savedPlaces, setSavedPlaces,
    city,
    userCoords,
    duration,
    vibe,
    companion,
    deck, setDeck,
    currentIndex, setCurrentIndex
  } = useAppContext();

  const handleStartDiscovery = () => {
    const finalDeck = filterDestinations({
      destinations: destinationsData,
      city,
      userCoords,
      duration,
      vibe,
      companion
    });

    setDeck(finalDeck);
    setCurrentIndex(0);
    setStep('cards');
  };

  const handleRestartDeck = () => {
    setCurrentIndex(0);
  };

  const handleDecision = (action) => {
    if (action === 'save') {
      setSavedPlaces((prev) => {
        const place = deck[currentIndex];
        return prev.some((p) => p.id === place.id) ? prev : [...prev, place];
      });
      setCurrentIndex((prev) => prev + 1);
    } else if (action === 'back') {
      setCurrentIndex((prev) => Math.max(0, prev - 1));
    } else {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const isWideStep = step === 'cards' || step === 'saved';
  const isDeckFinished = currentIndex >= deck.length;

  return (
    <Layout wide={isWideStep}>
      {step === 'welcome' && <WelcomeStep />}

      {step === 'onboarding' && <OnboardingStep onStart={handleStartDiscovery} />}

      {step === 'cards' && (
        <div className="w-full h-full flex-1 min-h-0 flex justify-center items-stretch">
          {isDeckFinished ? (
            <DeckFinishedState
              savedCount={savedPlaces.length}
              onViewSaved={() => setStep('saved')}
              onReplayDeck={handleRestartDeck}
              onChangeFilters={() => setStep('onboarding')}
            />
          ) : (
            <Card
              deck={deck}
              currentIndex={currentIndex}
              handleDecision={handleDecision}
            />
          )}
        </div>
      )}

      {step === 'saved' && <SavedStep />}
    </Layout>
  );
}