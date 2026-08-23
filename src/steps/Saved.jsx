import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { openDirections } from '../logic/maps';
import Card from '../components/elements/Card.jsx';
import Modal from '../components/ui/Modal.jsx';

// Compact thumbnail component with fallback and accessibility optimization
function PlaceThumbnail({ src }) {
    const [hasError, setHasError] = useState(!src);

    if (hasError) {
        return (
            <div
                className="w-14 h-14 rounded-lg bg-surface-muted flex items-center justify-center shrink-0 border border-ink-faint/10 text-xl select-none"
                aria-hidden="true"
            >
                📍
            </div>
        );
    }

    return (
        <img
            src={src}
            alt=""
            aria-hidden="true"
            loading="lazy"
            onError={() => setHasError(true)}
            className="w-16 h-16 rounded-lg object-cover shrink-0 border border-ink-faint/10 bg-surface-muted"
        />
    );
}

const getPlaceImage = (place) => place.imageUrl || place.image_url || place.photo;

function EmptyState({ onBackToDeck }) {
    return (
        <div className="text-center py-12 px-4 rounded-card max-w-md mx-auto">
            <span className="text-4xl block mb-2" role="img" aria-label="Balloon">🎈</span>
            <p className="text-sm font-medium text-ink-soft mb-4">
                Your list is empty!
            </p>
            <button
                type="button"
                onClick={onBackToDeck}
                className="btn-primary py-2 px-4 text-xs font-bold"
            >
                Back to Deck
            </button>
        </div>
    );
}

function SavedPlaceItem({ place, onSelect, onRemove, onNavigate }) {
    return (
        <div
            onClick={() => onSelect(place)}
            className="bg-surface-card p-3 rounded-card border border-ink-faint/10 flex items-center gap-2 sm:gap-3 shadow-sm hover:border-ink-faint/25 hover:shadow-md cursor-pointer transition-all"
        >
            <PlaceThumbnail src={getPlaceImage(place)} />

            <div className="space-y-1 min-w-0 flex-1">
                <h5 className="font-bold text-ink text-sm leading-tight truncate">
                    {place.name}
                </h5>

                <p className="text-xs text-ink-soft truncate">
                    🚗 {place.distance_km ?? 0} km
                    {place.recommended_duration ? ` • ${place.recommended_duration}` : ''}
                </p>
            </div>

            <div className="flex items-center gap-3 sm:gap-2 shrink-0">
                <button
                    type="button"
                    onClick={(e) => {
                        e.stopPropagation();
                        onRemove(place.id);
                    }}
                    className="text-ink-soft hover:text-danger active:text-danger text-xs w-8 h-8 sm:w-auto sm:h-auto sm:px-2 sm:py-1 flex items-center justify-center transition-colors underline-offset-2 hover:underline"
                    aria-label={`Remove ${place.name} from list`}
                >
                    <span className="sm:hidden leading-none text-lg font-bold">✕</span>
                    <span className="hidden sm:inline">Remove</span>
                </button>
                <button
                    type="button"
                    onClick={(e) => {
                        e.stopPropagation();
                        onNavigate(place);
                    }}
                    className="btn-primary flex items-center justify-center gap-1.5 w-9 h-9 sm:w-auto sm:h-auto sm:py-2 sm:px-3.5 text-xs font-bold"
                    aria-label={`Navigate to ${place.name}`}
                >
                    <span className="text-base leading-none sm:hidden">🗺️</span>
                    <span className="hidden sm:inline">Check on Map</span>
                </button>
            </div>
        </div>
    );
}

export default function SavedStep() {
    const { savedPlaces, setSavedPlaces, setStep } = useAppContext();
    const [selectedPlace, setSelectedPlace] = useState(null);

    const handleRemovePlace = (id) => {
        setSavedPlaces((prev) => prev.filter((p) => p.id !== id));
    };

    const handleClearAll = () => {
        if (window.confirm('Are you sure you want to clear your entire list?')) {
            setSavedPlaces([]);
            setStep('onboarding');
        }
    };

    const hasSavedPlaces = savedPlaces.length > 0;

    return (
        <div className="space-y-4 flex flex-col h-full w-full">
            {/* Header */}
            <div className="flex justify-between items-center rounded-card text-xs mt-4">
                <button
                    type="button"
                    onClick={() => setStep('cards')}
                    className="btn-outline text-sm px-3 py-1.5"
                >
                    ← Back to Deck
                </button>
            </div>
            <div className="flex justify-between items-center gap-2">
                <h3 className="text-2xl font-extrabold tracking-tight text-ink">
                    Your saved places
                </h3>
                {hasSavedPlaces && (
                    <button
                        type="button"
                        onClick={handleClearAll}
                        className="btn-outline-danger text-sm px-3 py-1.5"
                    >
                        Clear all
                    </button>
                )}
            </div>

            {/* List / Empty State */}
            <div className="flex-1 min-h-0 overflow-y-auto pr-1 scrollbar-thin">
                {hasSavedPlaces ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                        {savedPlaces.map((place) => (
                            <SavedPlaceItem
                                key={place.id}
                                place={place}
                                onSelect={setSelectedPlace}
                                onRemove={handleRemovePlace}
                                onNavigate={openDirections}
                            />
                        ))}
                    </div>
                ) : (
                    <EmptyState onBackToDeck={() => setStep('cards')} />
                )}
            </div>

            {/* Modal */}
            <Modal isOpen={Boolean(selectedPlace)} onClose={() => setSelectedPlace(null)}>
                <Card
                    place={selectedPlace}
                    isModal={true}
                    onClose={() => setSelectedPlace(null)}
                />
            </Modal>
        </div>
    );
}