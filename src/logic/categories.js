export const DURATIONS = [
    { id: '2-3 hours', label: '2–3 Hours', matchValues: ['2-3 hours', 'quick_visit'] },
    { id: 'half day', label: 'Half Day', matchValues: ['half_day', '3-5 hours'] },
    { id: 'full day', label: 'Full Day', matchValues: ['full_day', 'day_trip'] },
    { id: 'weekend', label: 'Weekend', matchValues: ['weekend', 'multi_day'] }
];

export const VIBES = [
    { id: 'nature', label: 'Nature', icon: '🌿', tags: ['nature', 'relaxing', 'water', 'scenic_drive', 'outdoors'] },
    { id: 'hiking', label: 'Hiking', icon: '🥾', tags: ['hiking', 'adventure', 'trail'] },
    { id: 'art', label: 'Culture & Art', icon: '🎨', tags: ['art', 'museum', 'culture', 'history'] },
    { id: 'food', label: 'Food & Coffee', icon: '☕', tags: ['food', 'coffee', 'bakery', 'restaurant', 'market'] },
    { id: 'hidden_gem', label: 'Hidden Gems', icon: '✨', tags: ['hidden_gem', 'small_town', 'unusual', 'quiet'] }
];

export const COMPANIONS = [
    { id: 'solo', label: 'Solo', matchValues: ['solo', 'everyone'] },
    { id: 'couple', label: 'Couple', matchValues: ['couple', 'romantic'] },
    { id: 'friends', label: 'Friends', matchValues: ['friends', 'group'] },
    { id: 'family', label: 'Family', matchValues: ['family', 'kids'] },
    { id: 'dog', label: 'Dog', icon: '🐕', matchValues: ['dog_friendly', 'pets'] }
];

// Mapping for filtering in sorting.js
export const VIBE_MAPPING = VIBES.reduce((acc, item) => {
    acc[item.id] = item.tags;
    return acc;
}, {});