export const DURATIONS = [
    { id: 'short', label: '2–3 Hours' },
    { id: 'half_day', label: 'Half Day' },
    { id: 'full_day', label: 'Full Day' },
    { id: 'weekend', label: 'Weekend' }
];

export const VIBES = [
    { id: 'nature', label: 'Nature', icon: '🌿', tags: ['nature', 'relaxing', 'water', 'scenic_drive', 'outdoors', 'lakes'] },
    { id: 'hiking', label: 'Hiking', icon: '🥾', tags: ['hiking', 'adventure', 'trail', 'lookout', 'steep_trail'] },
    { id: 'art', label: 'Culture & Art', icon: '🎨', tags: ['art', 'museum', 'culture', 'history', 'architecture'] },
    { id: 'food', label: 'Food & Coffee', icon: '☕', tags: ['food', 'coffee', 'bakery', 'restaurant', 'market', 'local_food'] },
    { id: 'hidden_gem', label: 'Hidden Gems', icon: '✨', tags: ['hidden_gem', 'small_town', 'unusual', 'quiet', 'off_the_radar', 'ruins'] }
];

export const COMPANIONS = [
    { id: 'solo', label: 'Solo', matchValues: ['solo', 'everyone'] },
    { id: 'couple', label: 'Couple', matchValues: ['couple', 'romantic'] },
    { id: 'friends', label: 'Friends', matchValues: ['friends', 'group'] },
    { id: 'family', label: 'Family', matchValues: ['family', 'kids', 'family_friendly'] },
    { id: 'dog', label: 'Dog', icon: '🐕', matchValues: ['dog', 'dog_friendly', 'pets'] }
];

export const VIBE_MAPPING = VIBES.reduce((acc, item) => {
    acc[item.id] = item.tags;
    return acc;
}, {});