import { useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';

export default function Card({ deck, currentIndex, handleDecision }) {

    // Fetch and preload images for the next two cards 
    useEffect(() => {
        if (!deck) return;
        const upcoming = deck.slice(currentIndex + 1, currentIndex + 3);

        upcoming.forEach((place) => {
            if (place?.image_url) {
                const img = new Image();
                img.src = place.image_url;
            }
        });
    }, [currentIndex, deck]);

    if (!deck || !deck[currentIndex]) return null;

    const currentPlace = deck[currentIndex];

    return (
        <div className="flex flex-col lg:flex-row h-full w-full bg-surface-card rounded-4xl border border-ink-faint/15 shadow-xl overflow-hidden">
            {/* Image */}
            <div className="h-64 lg:h-auto w-full lg:w-1/2 relative bg-black overflow-hidden select-none shrink-0">
                <img
                    src={currentPlace.image_url}
                    alt={currentPlace.name}
                    className="absolute inset-0 w-full h-full object-cover"
                />
                {/* Distance */}
                <div className="absolute bottom-4 left-4 backdrop-blur-md bg-ink/40 text-white border border-white/10 text-xs px-3 py-1.5 rounded-pill font-medium">
                    ~ {currentPlace.distance_km} km ({currentPlace.travel_time_min} min)
                </div>
            </div>

            {/* main text Content */}
            <div className="flex-1 p-6 md:p-8 flex flex-col justify-between overflow-hidden">
                <div className="flex-1 overflow-y-auto space-y-4 md:space-y-5 pr-1 scrollbar-thin mb-4">
                    {/* body of text */}
                    <div className="text-xs font-mono font-bold tracking-widest text-ink-soft uppercase">
                        {currentPlace.region}
                    </div>
                    <h4 className="text-2xl md:text-3xl font-extrabold tracking-tight text-ink leading-tight">
                        {currentPlace.name}
                    </h4>

                    <p className="text-sm text-ink-soft leading-relaxed">
                        {currentPlace.description}
                    </p>
                    {/* Why today */}
                    <div className="border-l-2 border-accent pl-3 py-0.5 my-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-accent block">
                            Why today
                        </span>
                        <p className="text-sm text-ink italic font-medium mt-0.5 leading-snug">
                            “{currentPlace.why_visit_today}”
                        </p>
                    </div>

                    {/* What to pack */}
                    <div className="space-y-1.5 pt-1">
                        <span className="text-xs font-bold text-ink-soft uppercase tracking-wider block">
                            What to pack:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                            {currentPlace.what_to_bring.map((item, idx) => (
                                <span
                                    key={idx}
                                    className="bg-surface-muted/50 text-ink border border-ink-faint/10 text-xs px-2.5 py-1 rounded-pill capitalize font-medium"
                                >
                                    {item}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
                {/* buttons */}
                <div className="flex items-end justify-between gap-3 pt-4 border-t border-ink-faint/10 shrink-0">
                    {/* Skip */}
                    <div className="flex flex-col items-center gap-1.5 shrink-0">
                        <button
                            onClick={() => handleDecision('Skip')}
                            className="w-12 h-12 rounded-full bg-ink-faint/40 text-ink-soft border border-ink-faint/10 flex items-center justify-center transition-all duration-200 hover:bg-danger-soft hover:text-danger hover:border-danger/30 hover:-translate-y-0.5 active:scale-90"
                            title="Skip"
                            aria-label="Skip"
                        >
                            <span className="text-base font-bold">✕</span>
                        </button>
                    </div>

                    {/* Let's Go */}
                    <div className="flex-1 flex flex-col items-center gap-1.5">
                        <button
                            onClick={() => alert(`Opening map routing to: ${currentPlace.address}`)}
                            className="btn-primary w-full h-12 rounded-pill text-sm tracking-wide shadow-md hover:shadow-lg hover:-translate-y-0.5 active:scale-[0.98] flex items-center justify-center gap-2"
                        >
                            <span>Let's Go</span>
                            <span className="text-base">🗺️</span>
                        </button>
                    </div>

                    {/* Save */}
                    <div className="flex flex-col items-center gap-1.5 shrink-0">
                        <button
                            onClick={() => handleDecision('save')}
                            className="w-12 h-12 rounded-full bg-surface-card border border-ink-faint/50 text-ink-soft flex items-center justify-center transition-all duration-200 hover:text-danger hover:border-danger/40 hover:bg-danger-soft hover:-translate-y-0.5 active:scale-90"
                            title="Save Adventure"
                            aria-label="Save"
                        >
                            <span className="text-base transition-transform duration-200 hover:scale-110">❤️</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}