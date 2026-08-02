import { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

// Keys used in localStorage
const STORAGE_KEYS = {
    savedPlaces: 'savedPlaces',
    filters: 'filters',
};

export function AppProvider({ children }) {
    // Steps
    const [step, setStep] = useState('welcome');

    // Filters (restored from localStorage if present)
    const [city, setCity] = useState(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEYS.filters);
            return stored ? JSON.parse(stored).city ?? 'Ottawa' : 'Ottawa';
        } catch {
            return 'Ottawa';
        }
    });
    const [duration, setDuration] = useState(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEYS.filters);
            return stored ? JSON.parse(stored).duration ?? '2-3 hours' : '2-3 hours';
        } catch {
            return '2-3 hours';
        }
    });
    const [vibe, setVibe] = useState(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEYS.filters);
            return stored ? JSON.parse(stored).vibe ?? 'nature' : 'nature';
        } catch {
            return 'nature';
        }
    });
    const [companion, setCompanion] = useState(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEYS.filters);
            return stored ? JSON.parse(stored).companion ?? 'solo' : 'solo';
        } catch {
            return 'solo';
        }
    });

    // Cards
    const [deck, setDeck] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    // Saved places from LocalStorage
    const [savedPlaces, setSavedPlaces] = useState(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEYS.savedPlaces);
            return stored ? JSON.parse(stored) : [];
        } catch {
            return [];
        }
    });

    // Persist savedPlaces whenever it changes
    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEYS.savedPlaces, JSON.stringify(savedPlaces));
        } catch (e) {
            console.error('Failed to save places to localStorage', e);
        }
    }, [savedPlaces]);

    // Persist filters whenever any of them changes
    useEffect(() => {
        try {
            const filters = { city, duration, vibe, companion };
            localStorage.setItem(STORAGE_KEYS.filters, JSON.stringify(filters));
        } catch (e) {
            console.error('Failed to save filters to localStorage', e);
        }
    }, [city, duration, vibe, companion]);

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