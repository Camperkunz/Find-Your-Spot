export function openDirections(place) {
    const locationQuery = place?.address || place?.name;

    if (!locationQuery) {
        console.warn('No address or name for place:', place);
        return;
    }

    const searchQuery = place?.name && place?.address
        ? `${place.name}, ${place.address}`
        : locationQuery;

    const destination = encodeURIComponent(searchQuery);

    const url = `https://www.google.com/maps/search/?api=1&query=${destination}`;

    window.open(url, '_blank', 'noopener,noreferrer');
}