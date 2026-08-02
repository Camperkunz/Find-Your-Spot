import './App.css';
import React from 'react';
import { useAppContext } from './context/AppContext';
//
import destinationsData from './data/ottawa_destinations.json';
//
import { filterDestinations } from './logic/sorting.js';
//
import Layout from './components/ui/Layout.jsx';
import Card from './components/elements/Card.jsx';
//
import WelcomeStep from './steps/Welcome.jsx';
import OnboardingStep from './steps/Onboarding.jsx';


// Start of the main Part of App
export default function AdventureApp() {
  const {
    step, setStep,
    savedPlaces, setSavedPlaces,
    city,
    duration,
    vibe,
    companion,
    deck, setDeck,
    currentIndex, setCurrentIndex } = useAppContext();

  // Call of filtering function (logic/sorting)
  const handleStartDiscovery = () => {
    const finalDeck = filterDestinations({
      destinations: destinationsData,
      city,
      duration,
      vibe,
      companion
    });

    setDeck(finalDeck);
    setCurrentIndex(0);
    setStep('cards');
  };

  // Saving and Skipping
  const handleDecision = (action) => {
    if (action === 'save') {
      setSavedPlaces((prev) => {
        const place = deck[currentIndex];
        return prev.some((p) => p.id === place.id) ? prev : [...prev, place];
      });
    }
    setCurrentIndex((prev) => prev + 1);
  };

  // DECK step needs a wider container (for the Card component on lg screens)
  const isWideStep = step === 'cards';

  return (
    <Layout wide={isWideStep}>
      {/* WELCOME */}
      {step === 'welcome' && <WelcomeStep />}

      {/* ONBOARDING */}
      {step === 'onboarding' && <OnboardingStep onStart={handleStartDiscovery} />}

      {/* DECK */}
      {step === 'cards' && (
        <div className="w-full flex justify-center">
          {currentIndex < deck.length ? (
            <Card
              deck={deck}
              currentIndex={currentIndex}
              handleDecision={handleDecision}
            />
          ) : (
            /* out of cards */
            <div className="text-center space-y-6 py-12 max-w-md w-full mx-auto">
              <span className="text-5xl">🗺️</span>

              {savedPlaces.length > 0 ? (
                <>
                  <div className="space-y-2">
                    <h4 className="text-2xl font-bold text-ink">That's all for today!</h4>
                    <p className="text-ink-soft text-sm max-w-xs mx-auto">
                      You've saved {savedPlaces.length} {savedPlaces.length === 1 ? 'place' : 'places'} so far — take a look at your bucket list!
                    </p>
                  </div>
                  <div className="pt-4 space-y-2 max-w-xs mx-auto w-full">
                    <button
                      onClick={() => setStep('saved')}
                      className="btn-primary-lg w-full"
                    >
                      View Saved Places ({savedPlaces.length})
                    </button>
                    <button
                      onClick={() => setStep('onboarding')}
                      className="btn-outline-lg w-full"
                    >
                      Change Filters 🔄
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="space-y-2">
                    <h4 className="text-2xl font-bold text-ink">That's all for today!</h4>
                    <p className="text-ink-soft text-sm max-w-xs mx-auto">
                      Looks like you haven't saved anything yet. Try changing your vibe check to see more adventures!
                    </p>
                  </div>
                  <div className="pt-4 space-y-2 max-w-xs mx-auto w-full">
                    <button
                      onClick={() => setStep('onboarding')}
                      className="btn-primary-lg w-full"
                    >
                      Change Filters 🔄
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      )}
    </Layout>
  );
}