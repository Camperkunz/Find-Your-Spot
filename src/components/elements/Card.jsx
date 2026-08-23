import { useEffect } from 'react';
import { openDirections } from '../../logic/maps';
import CardBadges from '../../utils/CardBadges.jsx';
import { preloadImages } from '../../utils/imagePreloader.js';

export default function Card({
    deck,
    currentIndex = 0,
    place: directPlace,
    handleDecision,
    isModal = false,
    onClose
}) {
    const currentPlace = directPlace || (deck ? deck[currentIndex] : null);

    useEffect(() => {
        if (!deck || isModal) return;

        const upcomingUrls = deck
            .slice(currentIndex + 1, currentIndex + 3)
            .map((p) => p?.image_url || p?.imageUrl);

        preloadImages(upcomingUrls);
    }, [currentIndex, deck, isModal]);

    if (!currentPlace) return null;

    const imageUrl = currentPlace.image_url || currentPlace.imageUrl || currentPlace.photo;

    return (
        <div className="w-full h-full md:h-[clamp(400px,65vh,550px)] flex flex-col lg:flex-row bg-surface-card rounded-4xl shadow-xl overflow-hidden relative">

            {!isModal && currentIndex > 0 && (
                <button
                    type="button"
                    onClick={() => handleDecision?.('back')}
                    className="absolute top-4 left-4 z-20 size-10 md:size-11 rounded-full bg-surface/80 backdrop-blur-md text-ink border border-ink-faint/50 flex items-center justify-center transition-all duration-200 hover:bg-surface hover:scale-105 active:scale-95 shadow-sm"
                    title="Previous place"
                    aria-label="Previous place"
                >
                    <span className="text-xl font-medium">←</span>
                </button>
            )}

            {/* Close button */}
            {isModal && onClose && (
                <button
                    type="button"
                    onClick={onClose}
                    className="absolute top-4 left-4 z-30 size-10 md:size-11 rounded-full bg-surface/80 backdrop-blur-md text-ink border border-ink-faint/50 flex items-center justify-center transition-all duration-200 hover:bg-surface hover:scale-105 active:scale-95 shadow-sm"
                    title="Close"
                    aria-label="Close"
                >
                    <span className="text-lg font-bold">✕</span>
                </button>
            )}
            {/*  */}
            <div className="h-32 lg:h-auto w-full lg:w-2/5 relative bg-black overflow-hidden select-none shrink-0">
                <img
                    loading="lazy"
                    src={imageUrl}
                    alt={currentPlace.name}
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute bottom-4 left-4 backdrop-blur-md bg-ink/40 text-white border border-white/10 text-xs px-3 py-1.5 rounded-pill font-medium z-10">
                    ~ {currentPlace.distance_km ?? 0} km {currentPlace.travel_time_min ? `(${currentPlace.travel_time_min} min)` : ''}
                </div>
            </div>

            {/*  */}
            <div className="flex-1 min-h-0 p-6 md:p-8 flex flex-col justify-between overflow-hidden relative">
                <CardBadges
                    parking={currentPlace.parking}
                    accessibility={currentPlace.accessibility_notes ?? currentPlace.accessibility}
                />

                <div className="flex-1 min-h-0 overflow-y-auto space-y-4 md:space-y-4 pr-1 scrollbar-thin mb-4">
                    <div className="text-xs font-mono font-bold tracking-widest text-ink-soft uppercase">
                        {currentPlace.region}
                    </div>
                    <h4 className="text-2xl md:text-3xl font-extrabold tracking-tight text-ink leading-tight">
                        {currentPlace.name}
                    </h4>

                    <p className="text-sm text-ink-soft leading-relaxed">
                        {currentPlace.description}
                    </p>

                    {currentPlace.why && (
                        <div className="border-l-2 border-accent pl-3 py-0.5 my-2">
                            <span className="text-xs font-bold uppercase tracking-wider text-accent block">
                                Why today
                            </span>
                            <p className="text-sm text-ink italic font-medium mt-0.5 leading-snug">
                                “{currentPlace.why}”
                            </p>
                        </div>
                    )}

                    {currentPlace.activities?.length > 0 && (
                        <div className="space-y-1.5 pt-1">
                            <span className="text-xs font-bold text-ink-soft uppercase tracking-wider block">
                                Things to do:
                            </span>
                            <div className="flex flex-wrap gap-1.5">
                                {currentPlace.activities.map((item, idx) => (
                                    <span
                                        key={idx}
                                        className="bg-surface-muted/50 text-ink border border-ink-faint/10 text-xs px-2.5 py-1 rounded-pill capitalize font-medium"
                                    >
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <div className="flex items-center gap-4 sm:gap-6 pt-4 border-t border-ink-faint/10 shrink-0">
                    {!isModal && (
                        <button
                            type="button"
                            onClick={() => handleDecision?.('Skip')}
                            className="size-14 md:size-16 rounded-full bg-ink-faint/40 text-ink-soft border border-ink-faint/10 flex items-center justify-center transition-all duration-200 hover:bg-danger-soft hover:text-danger hover:border-danger/30 hover:-translate-y-0.5 active:scale-90"
                            title="Skip"
                            aria-label="Skip"
                        >
                            <span className="text-xl font-bold">✕</span>
                        </button>
                    )}

                    <div className="flex-1 flex flex-col items-center gap-1.5">
                        <button
                            type="button"
                            onClick={() => openDirections(currentPlace)}
                            className="btn-primary-hero w-full h-12 md:h-14 text-sm md:text-base tracking-wide shadow-md transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 active:scale-[0.98] flex items-center justify-center gap-2"
                        >
                            <span>Check on Map</span>
                            <span className="text-base">🗺️</span>
                        </button>
                    </div>

                    {!isModal && (
                        <button
                            type="button"
                            onClick={() => handleDecision?.('save')}
                            className="size-14 md:size-16 rounded-full bg-surface-card border border-ink-faint/50 text-ink-soft flex items-center justify-center transition-all duration-200 hover:bg-accent-soft hover:text-accent hover:border-accent/40 hover:-translate-y-0.5 active:scale-90"
                            title="Save Adventure"
                            aria-label="Save"
                        >
                            <span className="text-2xl transition-transform duration-200 hover:scale-115">❤️</span>
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}