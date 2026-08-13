import { useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';
import { openDirections } from '../../logic/maps';
// 
import { TbParkingCircleFilled } from "react-icons/tb";
import { TbAccessibleFilled } from "react-icons/tb";
import { TbAccessibleOff } from "react-icons/tb";
import { TbCurrencyDollar } from "react-icons/tb";
// 
function getParkingBadge(parking) {
    if (parking === 'paid') {
        return { label: 'Paid parking', Icon: TbParkingCircleFilled, tone: 'paid', showFee: true };
    }
    if (parking === 'free') {
        return { label: 'Free parking', Icon: TbParkingCircleFilled, tone: 'free', showFee: false };
    }
    return null;
}

function getAccessibilityBadge(accessibility_notes) {
    if (accessibility_notes === true) {
        return { label: 'Accessible', Icon: TbAccessibleFilled, tone: 'positive', showFee: false };
    }
    if (accessibility_notes === false) {
        return { label: 'Not accessible', Icon: TbAccessibleOff, tone: 'negative', showFee: false };
    }
    return null;
}
// 
const TONE_CLASSES = {
    positive: 'text-accent',
    negative: 'text-danger',
    free: 'text-accent',
    paid: 'text-amber-500',
};

// Logic of badge
function CornerBadge({ label, Icon, tone, showFee }) {
    return (
        <span
            title={label}
            aria-label={label}
            className={`relative flex items-center justify-center size-8 md:size-9 rounded-full ${TONE_CLASSES[tone] || 'text-accent'
                }`}
        >
            {Icon && <Icon className="size-7 md:size-8" />}
            {/* Small coin/dollar overlay in the corner, only for paid parking */}
            {showFee && (
                <span
                    className="absolute -bottom-0.5 -right-1 flex items-center justify-center size-4 md:size-4 rounded-full bg-amber-500 text-white ring-2 ring-surface-card"
                    aria-hidden="true"
                >
                    <TbCurrencyDollar className="w-2.5 h-2.5 md:w-3 md:h-3" strokeWidth={3} />
                </span>
            )}
        </span>
    );
}

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
    // 
    const parkingBadge = getParkingBadge(currentPlace.parking);
    const accessibilityBadge = getAccessibilityBadge(currentPlace.accessibility_notes);
    // 

    return (
        <div className="w-full h-full md:h-[clamp(400px,65vh,550px)] flex flex-col lg:flex-row bg-surface-card rounded-4xl border border-ink-faint/15 shadow-xl overflow-hidden">
            {/* Image */}
            <div className="h-48 lg:h-auto w-full lg:w-2/5 relative bg-black overflow-hidden select-none shrink-0">
                <img
                    loading="lazy"
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
            <div className="flex-1 min-h-0 p-6 md:p-8 flex flex-col justify-between overflow-hidden relative">

                {/* Corner badges: parking / accessibility */}
                {(parkingBadge || accessibilityBadge) && (
                    <div className="absolute top-3 right-3 md:top-4 md:right-5 z-10 flex items-center gap-1.5">
                        {parkingBadge && (
                            <CornerBadge
                                label={parkingBadge.label}
                                Icon={parkingBadge.Icon}
                                tone={parkingBadge.tone}
                                showFee={parkingBadge.showFee}
                            />
                        )}
                        {accessibilityBadge && (
                            <CornerBadge
                                label={accessibilityBadge.label}
                                Icon={accessibilityBadge.Icon}
                                tone={accessibilityBadge.tone}
                                showFee={accessibilityBadge.showFee}
                            />
                        )}
                    </div>
                )}

                <div className="flex-1 min-h-0 overflow-y-auto space-y-4 md:space-y-4 pr-1 scrollbar-thin mb-4">
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
                <div className="flex items-center gap-4 sm:gap-6 pt-4 border-t border-ink-faint/10 shrink-0">
                    {/* Skip */}
                    <button
                        onClick={() => handleDecision('Skip')}
                        className="size-14 md:size-16 rounded-full bg-ink-faint/40 text-ink-soft border border-ink-faint/10 flex items-center justify-center transition-all duration-200 hover:bg-danger-soft hover:text-danger hover:border-danger/30 hover:-translate-y-0.5 active:scale-90"
                        title="Skip"
                        aria-label="Skip"
                    >
                        <span className="text-xl font-bold">✕</span>
                    </button>

                    {/* Let's Go */}
                    <div className="flex-1 flex flex-col items-center gap-1.5">
                        <button
                            onClick={(e) => {
                                openDirections(currentPlace);
                            }}
                            className="btn-primary-hero w-full h-12 md:h-14 text-sm md:text-base tracking-wide shadow-md transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 active:scale-[0.98] flex items-center justify-center gap-2"
                        >
                            <span>Check on Map</span>
                            <span className="text-base">🗺️</span>
                        </button>
                    </div>

                    {/* Save */}
                    <button
                        onClick={() => handleDecision('save')}
                        className="size-14 md:size-16 rounded-full bg-surface-card border border-ink-faint/50 text-ink-soft flex items-center justify-center transition-all duration-200 hover:bg-accent-soft hover:text-accent hover:border-accent/40 hover:-translate-y-0.5 active:scale-90"
                        title="Save Adventure"
                        aria-label="Save"
                    >
                        <span className="text-xl transition-transform duration-200 hover:scale-110">❤️</span>
                    </button>
                </div>
            </div>
        </div>
    );
}