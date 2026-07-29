// src/logic/sorting.js
import { VIBE_MAPPING, DURATIONS, COMPANIONS } from './categories.js';

export function filterDestinations({ destinations, city, vibe, duration, companion }) {
    if (!destinations || !destinations.length) return [];

    const cleanCity = (city || '').trim().toLowerCase();
    const cityPlaces = destinations.filter(place =>
        place.city_base?.toLowerCase().includes(cleanCity)
    );

    const matchedCategories = VIBE_MAPPING[vibe] || [vibe];
    const durationConfig = DURATIONS.find(d => d.id === duration);
    const companionConfig = COMPANIONS.find(c => c.id === companion);

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
        const allowedDurations = durationConfig?.matchValues || [duration];
        if (allowedDurations.includes(place.recommended_duration)) {
            score += 5;
        }

        // Companion
        const allowedCompanions = companionConfig?.matchValues || [companion];
        const hasCompanionMatch = place.companions_fit?.some(fit =>
            allowedCompanions.includes(fit)
        );

        if (hasCompanionMatch) {
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

        // 
        if (place.distance_km <= 10) score += 2;
        else if (place.distance_km <= 30) score += 1;

        // Family friendly
        const accessNotes = (place.accessibility_notes || '').toLowerCase();
        if (companion === "family") {
            if (accessNotes.includes("accessible") || accessNotes.includes("wheelchair")) {
                score += 3;
            }
            if (accessNotes.includes("steep") || accessNotes.includes("difficult")) {
                score -= 4;
            }
        }

        return {
            ...place,
            score,
        };
    });

    // return Top-10
    return scoredPlaces
        .sort((a, b) => b.score - a.score)
        .slice(0, 10);
}