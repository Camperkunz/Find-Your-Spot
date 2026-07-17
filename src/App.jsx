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
    currentIndex, setCurrentIndex
  } = useAppContext();

  return (
    <Layout>
      {/* MAIN CONTAINER */}
      <main className="flex-1 flex flex-col justify-center max-w-md w-full mx-auto px-4 py-6">
        <div className="h-full flex flex-col justify-between py-2 animate-fadeIn">
          {currentIndex < deck.length ? (
            <Card
              deck={deck}
              currentIndex={currentIndex}
              handleSwipe={handleSwipe}
            />
          ) : (
            /* OUT OF CARDS */
            <div className="text-center space-y-6 py-12 animate-fadeIn">
              <h2 className="text-2xl font-bold">No more places to show!</h2>
            </div>
          )}
        </div>
      </main>
    </Layout >
  );
}