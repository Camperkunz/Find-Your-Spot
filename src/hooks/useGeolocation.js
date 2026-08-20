import { useState } from 'react';

export function useGeolocation() {
    const [isLocating, setIsLocating] = useState(false);
    const [error, setError] = useState(null);

    const getLocation = () => {
        return new Promise((resolve, reject) => {
            setError(null);

            if (!navigator.geolocation) {
                const message = "Geolocation is not supported by your browser.";
                setError(message);
                reject(new Error(message));
                return;
            }

            setIsLocating(true);

            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setIsLocating(false);
                    resolve({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    });
                },
                (err) => {
                    console.warn(err.message);
                    setIsLocating(false);
                    const message = "Couldn't get location. You can select a city instead.";
                    setError(message);
                    reject(new Error(message));
                },
                { enableHighAccuracy: true, timeout: 8000, maximumAge: 0 }
            );
        });
    };

    return { getLocation, isLocating, error };
}