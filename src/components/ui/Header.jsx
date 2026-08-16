import { useAppContext } from '../../context/AppContext';

export default function Header() {
    const { step, setStep, savedPlaces } = useAppContext();
    const hasSaved = savedPlaces.length > 0;

    const handleLogoClick = () => {
        if (step !== 'welcome') {
            setStep('onboarding');
        } else {
            setStep('welcome');
        }
    };

    return (
        <header className="flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8 border-b border-surface-muted bg-surface shrink-0">
            <button onClick={handleLogoClick} className="flex items-center cursor-pointer">
                <h1 className="text-xl md:text-2xl font-bold text-accent">
                    Find Your Spot
                </h1>
            </button>
            {hasSaved && (
                <button
                    onClick={() => setStep('saved')}
                    className="btn-pill border border-surface-muted/50"
                >
                    Saved ({savedPlaces.length})
                </button>
            )}
        </header>
    );
}