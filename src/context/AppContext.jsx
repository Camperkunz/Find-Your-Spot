import { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export function AppProvider({ children }) {
    // Steps
    const [step, setStep] = useState('welcome');

    // Filters
    const [city, setCity] = useState('Ottawa');
    const [duration, setDuration] = useState('2-3 hours');
    const [vibe, setVibe] = useState('nature');
    const [companion, setCompanion] = useState('solo');

    // Cards
    const [deck, setDeck] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [savedPlaces, setSavedPlaces] = useState([]);

    const value = {
        step,
        setStep,

        city,
        setCity,

        duration,
        setDuration,

        vibe,
        setVibe,

        companion,
        setCompanion,

        deck,
        setDeck,

        currentIndex,
        setCurrentIndex,

        savedPlaces,
        setSavedPlaces,
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
    const context = useContext(AppContext);

    if (!context) {
        throw new Error('useAppContext must be used inside AppProvider');
    }

    return context;
}