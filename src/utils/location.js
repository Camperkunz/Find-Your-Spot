// Haversine formula
/**
 * @param {{lat: number, lng: number}} origin
 * @param {{lat: number, lng: number}} destination
 * @param {'driving' | 'cycling' | 'walking'} mode
 */
export function calculateRouteEstimate(origin, destination, mode = 'driving') {
    if (!origin || !destination || !origin.lat || !origin.lng || !destination.lat || !destination.lng) {
        return { distanceKm: 0, durationMin: 0 };
    }

    const R = 6371;
    const toRad = (deg) => (deg * Math.PI) / 180;

    const lat1 = toRad(origin.lat);
    const lon1 = toRad(origin.lng);
    const lat2 = toRad(destination.lat);
    const lon2 = toRad(destination.lng);

    const dLat = lat2 - lat1;
    const dLon = lon2 - lon1;

    // 
    const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const directDistance = R * c;

    // for roads?
    const ROAD_FACTOR = 1.3;
    const estimatedDistance = directDistance * ROAD_FACTOR;

    // common speeds
    const speeds = {
        driving: 35,
        cycling: 15,
        walking: 5,
    };

    const speed = speeds[mode] || speeds.driving;
    const durationMinutes = (estimatedDistance / speed) * 60;

    return {
        distanceKm: Number(estimatedDistance.toFixed(1)),
        durationMin: Math.max(1, Math.round(durationMinutes)),
    };
}