import { useAppContext } from '../../context/AppContext';

export default function Header() {
    const { step, setStep, savedPlaces } = useAppContext();
    const hasSaved = savedPlaces.length > 0;

    const handleLogoClick = () => {
        setStep(step !== 'welcome' ? 'onboarding' : 'welcome');
    };

    return (
        <header className="flex items-center justify-between gap-3 min-h-16 px-4 sm:px-6 lg:px-8 py-3 border-b border-surface-muted bg-surface shrink-0">
            <button
                onClick={handleLogoClick}
                className="flex items-center min-w-0 cursor-pointer active:opacity-70 transition-opacity"
            >
                <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-accent truncate">
                    Find Your Spot
                </h1>
            </button>
            {hasSaved && (
                <button
                    onClick={() => setStep('saved')}
                    className="btn-pill border border-surface-muted/50 shrink-0 active:scale-95 transition-transform"
                >
                    Saved ({savedPlaces.length})
                </button>
            )}
        </header>
    );
}