import { VIBE_MAPPING } from './categories.js';

export function filterDestinations({ destinations, city, vibe, duration, companion }) {
    if (!destinations || !destinations.length) return [];

    const cleanCity = (city || '').trim().toLowerCase();
    const cityPlaces = destinations.filter(place =>
        place.city_base?.toLowerCase().includes(cleanCity)
    );

    const matchedCategories = VIBE_MAPPING[vibe] || [vibe];

    const scoredPlaces = cityPlaces.map(place => {
        let score = 1; // Not empty anyway

        // Category
        if (matchedCategories.includes(place.category)) {
            score += 5;
        }

        // Tags
        const placeTags = place.tags || [];
        const placeActivities = place.recommended_activities || [];

        if (placeTags.some(tag => tag === vibe || matchedCategories.includes(tag))) {
            score += 4;
        }

        if (placeActivities.some(act => act === vibe || matchedCategories.includes(act))) {
            score += 4;
        }

        // Duration
        if (place.duration === duration) {
            score += 5;
        }

        // Companion
        if (place.companions?.includes(companion)) {
            score += 4;
        }

        // Hidden Gems
        if (vibe === "hidden_gem") {
            const text = `${place.description || ''} ${place.why_visit_today || ''}`.toLowerCase();
            const keywords = ["unique", "charming", "local", "unusual", "hidden", "quiet", "off-the-radar", "secret"];
            if (keywords.some(word => text.includes(word))) {
                score += 5;
            }
        }

        // Distance
        if (place.distance_km <= 10) score += 2;
        else if (place.distance_km <= 30) score += 1;

        // Family friendly
        if (companion === "family" && typeof place.accessibility_notes === "boolean") {
            score += place.accessibility_notes ? 3 : -4;
        }

        return {
            ...place,
            score,
        };
    });

    // return the top 15 scored places
    return scoredPlaces
        .sort((a, b) => b.score - a.score)
        .slice(0, 15);
}