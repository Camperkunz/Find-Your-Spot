import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';

export default function WelcomeStep() {
    const {
        city, setCity,
        setStep,
        setUserCoords
    } = useAppContext();

    const [isLocating, setIsLocating] = useState(false);
    const [geoError, setGeoError] = useState(null);

    const handleGetLocation = () => {
        setGeoError(null);
        setIsLocating(true);

        if (!navigator.geolocation) {
            setGeoError("Geolocation is not supported by your browser.");
            setIsLocating(false);
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                setUserCoords({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                });
                setIsLocating(false);
                setStep('onboarding');
            },
            (error) => {
                console.warn(error.message);
                setGeoError("Couldn't get location. You can select a city instead.");
                setIsLocating(false);
            },
            {
                enableHighAccuracy: true,
                timeout: 8000,
                maximumAge: 0
            }
        );
    };

    return (
        <div className="text-center space-y-8">
            <div className="space-y-3">
                <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-ink">
                    You don't <br />need to plan.
                </h2>
                <p className="text-ink-soft text-lg md:text-md mt-4">
                    Just go. Discover your next adventure across Canada. Find a spot and go!
                </p>
            </div>

            <div className="space-y-4 max-w-sm mx-auto">
                <button
                    onClick={handleGetLocation}
                    disabled={isLocating}
                    aria-busy={isLocating}
                    className="btn-primary-hero w-full flex items-center justify-center gap-2"
                >
                    {isLocating ? (
                        <span>📍 Locating you...</span>
                    ) : (
                        <span>📍 Use My Current Location</span>
                    )}
                </button>

                {geoError && (
                    <p className="text-danger text-sm font-medium animate-fade-in" role="alert">
                        {geoError}
                    </p>
                )}

                <div className="flex items-center gap-3 text-ink-faint/70">
                    <div className="h-px bg-current flex-1"></div>
                    <span className="text-sm uppercase font-bold tracking-widest">OR</span>
                    <div className="h-px bg-current flex-1"></div>
                </div>

                <div className="bg-surface-card p-6 rounded-card border border-ink-faint/30 shadow-md">
                    <label
                        htmlFor="city-select"
                        className="text-sm font-bold text-accent2 uppercase tracking-wider block mb-2 text-center"
                    >
                        Leaving from
                    </label>
                    <div className="relative">
                        <select
                            id="city-select"
                            value={city}
                            onChange={(e) => {
                                setCity(e.target.value);
                                setUserCoords(null);
                            }}
                            className="w-full bg-surface border border-surface-muted rounded-card px-4 py-3 text-ink font-medium appearance-none cursor-pointer"
                        >
                            <option value="Ottawa">Ottawa, ON</option>
                            <option value="Toronto" disabled>Toronto (Coming Soon)</option>
                            <option value="Montreal" disabled>Montreal (Coming Soon)</option>
                        </select>
                        <div
                            aria-hidden="true"
                            className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-ink-soft"
                        >
                            ▼
                        </div>
                    </div>
                </div>

                <button
                    onClick={() => setStep('onboarding')}
                    className="btn-outline-lg w-full mt-4"
                >
                    Continue with {city}
                </button>
            </div>
        </div>
    );
}