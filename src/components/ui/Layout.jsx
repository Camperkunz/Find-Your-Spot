import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import { useAppContext } from "../../context/AppContext";
import { DURATIONS, VIBES, COMPANIONS } from "../../logic/categories.js";

const getLabel = (list, id) => list.find((item) => item.id === id)?.label ?? id;

export default function Layout({ children, wide = false }) {
    const { step, duration, vibe, companion, setStep } = useAppContext();
    const showSelectionSummary = step !== 'welcome' && step !== 'onboarding';

    const selectionSummary = [
        ...duration.map((id) => getLabel(DURATIONS, id)),
        ...vibe.map((id) => getLabel(VIBES, id)),
        ...companion.map((id) => getLabel(COMPANIONS, id)),
    ].join(' · ');

    return (
        <div className="h-dvh bg-surface text-ink flex flex-col font-sans overflow-hidden">
            <Header />
            <main
                className={`flex-1 min-h-0 h-full flex flex-col px-6 sm:px-4 lg:px-8 py-8 w-full mx-auto ${wide ? "max-w-md lg:max-w-5xl" : "max-w-md"
                    }`}
            >
                {showSelectionSummary && (
                    <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="text-xs text-ink-soft font-mono truncate">
                            {selectionSummary}
                        </span>
                        <button
                            onClick={() => setStep('onboarding')}
                            className="text-xs text-ink-soft font-mono shrink-0 hover:text-ink"
                        >
                            Reset filters
                        </button>
                    </div>
                )}
                {children}
            </main>
            <Footer />
        </div>
    );
}