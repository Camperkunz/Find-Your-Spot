export function openDirections(place) {
    if (!place?.name && !place?.address) {
        console.warn('No address or name for place:', place);
        return;
    }
    let searchQuery = '';

    if (place.name) {
        const locationContext = place.region || place.city_base || '';
        searchQuery = locationContext ? `${place.name}, ${locationContext}` : place.name;
    } else {
        searchQuery = place.address;
    }

    const destination = encodeURIComponent(searchQuery);
    const url = `https://www.google.com/maps/search/?api=1&query=${destination}`;

    window.open(url, '_blank', 'noopener,noreferrer');
}