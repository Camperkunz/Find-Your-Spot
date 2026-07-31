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

            </div>
          )}
        </div>
      )}
    </Layout>
  );
}