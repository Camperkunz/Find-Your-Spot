import { VIBE_MAPPING } from './categories.js';
import { calculateRouteEstimate } from '../utils/location.js';

const CITY_COORDINATES = {
    'ottawa': { latitude: 45.4215, longitude: -75.6972 },
    'toronto': { latitude: 43.6532, longitude: -79.3832 },
    'montreal': { latitude: 45.5017, longitude: -73.5673 }
};

export function filterDestinations({ destinations, city, userCoords, vibe, duration, companion }) {
    if (!destinations || !destinations.length) return [];

    const cleanCity = (city || '').trim().toLowerCase();
    const cityPlaces = destinations.filter(place =>
        place.city_base?.toLowerCase().includes(cleanCity)
    );

    const originCoords = userCoords || CITY_COORDINATES[cleanCity] || CITY_COORDINATES['ottawa'];

    const selectedVibes = Array.isArray(vibe) ? vibe : [vibe].filter(Boolean);
    const matchedCategories = selectedVibes.reduce((acc, v) => {
        const mapped = VIBE_MAPPING[v] || [v];
        return [...acc, ...mapped];
    }, []);

    const selectedDurations = Array.isArray(duration) ? duration : [duration].filter(Boolean);
    const selectedCompanions = Array.isArray(companion) ? companion : [companion].filter(Boolean);

    const scoredPlaces = cityPlaces.map(place => {
        let score = 1;

        const destinationCoords = place.coordinates || { lat: place.lat, lng: place.lng };

        let dynamicDistance = place.distance_km || 0;
        let dynamicDuration = place.travel_time_min || 0;

        if (destinationCoords && destinationCoords.lat && destinationCoords.lng) {
            const estimate = calculateRouteEstimate(originCoords, destinationCoords, 'driving');
            dynamicDistance = estimate.distanceKm;
            dynamicDuration = estimate.durationMin;
        }

        // Category
        if (matchedCategories.includes(place.category)) {
            score += 5;
        }

        // Tags
        const placeTags = place.tags || [];
        if (selectedVibes.some(v => placeTags.includes(v) || matchedCategories.includes(v))) {
            score += 4;
        }

        // Duration
        if (selectedDurations.includes(place.duration)) {
            score += 5;
        }

        // Companion
        if (selectedCompanions.some(comp => place.companions?.includes(comp))) {
            score += 4;
        }

        // Hidden Gems
        if (selectedVibes.includes("hidden_gem")) {
            const text = `${place.description || ''} ${place.why || ''}`.toLowerCase();
            const keywords = ["unique", "charming", "local", "unusual", "hidden", "quiet", "off-the-radar", "secret"];
            if (keywords.some(word => text.includes(word))) {
                score += 5;
            }
        }

        // Distance
        if (dynamicDistance <= 10) score += 2;
        else if (dynamicDistance <= 30) score += 1;

        // Family friendly
        if (selectedCompanions.includes("family") && typeof place.accessibility_notes === "boolean") {
            score += place.accessibility_notes ? 3 : -4;
        }

        return {
            ...place,
            distance_km: dynamicDistance,
            travel_time_min: dynamicDuration,
            score,
        };
    });

    return scoredPlaces
        .sort((a, b) => b.score - a.score)
        .slice(0, 15);
}