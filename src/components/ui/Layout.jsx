import { FiRotateCcw } from "react-icons/fi";
// 
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import { useAppContext } from "../../context/AppContext";
import { DURATIONS, VIBES, COMPANIONS } from "../../logic/categories.js";

const getLabel = (list, id) => list.find((item) => item.id === id)?.label ?? id;

export default function Layout({ children, wide = false }) {
    const { step, duration, vibe, companion, setStep } = useAppContext();
    const showSelectionSummary = step !== 'welcome' && step !== 'onboarding';
    const isCardsStep = step === 'cards';

    const selectionSummary = [
        ...duration.map((id) => getLabel(DURATIONS, id)),
        ...vibe.map((id) => getLabel(VIBES, id)),
        ...companion.map((id) => getLabel(COMPANIONS, id)),
    ].join(' · ');

    return (
        <div className="h-dvh bg-surface text-ink flex flex-col font-sans">
            <Header />
            <main
                className={`flex-1 min-h-0 flex flex-col px-4 sm:px-6 lg:px-8 py-6 sm:py-8 w-full mx-auto ${isCardsStep ? 'overflow-hidden' : 'overflow-y-auto'
                    } ${wide ? 'max-w-md lg:max-w-5xl' : 'max-w-md'}`}
            >
                {showSelectionSummary && (
                    <div className="flex items-center justify-between gap-2 mb-3 shrink-0">
                        <span className="text-xs text-ink-soft font-mono truncate min-w-0">
                            {selectionSummary}
                        </span>
                        <button
                            onClick={() => setStep('onboarding')}
                            className="shrink-0 flex items-center gap-1 text-[11px] font-mono text-ink-soft border border-ink-soft/20 rounded-full px-2.5 py-1 active:opacity-70 transition-opacity"
                        >
                            <FiRotateCcw className="w-3 h-3" />
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