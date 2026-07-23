import { useAppContext } from '../../context/AppContext';

export default function Header() {
    const { step, setStep, savedPlaces } = useAppContext();
    const hasSaved = savedPlaces.length > 0;
    // 
    return (
        <header className="flex h-20 items-center justify-between px-6 md:px-16 border-b border-surface-muted bg-surface">
            <button onClick={() => setStep('welcome')} className="flex items-center hover:cursor-pointer">
                <h1 className="text-xl md:text-xl font-bold text-accent">
                    Where should I go?
                </h1>
            </button>
            {hasSaved && (
                <button
                    className="btn-pill border border-surface-muted/50 "
                >
                    Saved ({savedPlaces.length})
                </button>
            )}
        </header>
    );
}