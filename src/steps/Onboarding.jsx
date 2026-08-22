import React from 'react';
import { useAppContext } from '../context/AppContext';
import { DURATIONS, VIBES, COMPANIONS } from '../logic/categories.js';

const selectableBtn = (isActive, sizeClassName) =>
    `${sizeClassName} font-medium transition flex items-center justify-center gap-1.5 border select-none ${isActive
        ? 'bg-accent text-surface-card border-accent font-semibold shadow-md'
        : 'bg-surface-card text-ink border-surface-muted hover:border-ink-soft'
    }`;

function SelectableGroup({ label, items, selected, onToggle, layoutClassName, sizeClassName }) {
    return (
        <div className="space-y-3">
            <label className="text-xs font-semibold text-ink-soft uppercase tracking-wider block">
                {label}
            </label>
            <div className={layoutClassName}>
                {items.map((item) => {
                    const isActive = selected.includes(item.id);
                    return (
                        <button
                            key={item.id}
                            onClick={() => onToggle(item.id)}
                            className={selectableBtn(isActive, sizeClassName)}
                        >
                            {item.icon && <span>{item.icon}</span>}
                            <span>{item.label}</span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

export default function OnboardingStep({ onStart }) {
    const {
        setStep,
        duration,
        setDuration,
        vibe,
        setVibe,
        companion,
        setCompanion
    } = useAppContext();

    const toggleSelection = (currentList, itemID, setter) => {
        if (currentList.includes(itemID)) {
            if (currentList.length > 1) {
                setter(currentList.filter(id => id !== itemID));
            }
        } else {
            setter([...currentList, itemID]);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-ink">
                    What's the mood?
                </h3>
                <span className="text-xs text-ink-soft font-mono">
                    STEP 2 OF 2
                </span>
            </div>

            <SelectableGroup
                label="How much time do you have?"
                items={DURATIONS}
                selected={duration}
                onToggle={(id) => toggleSelection(duration, id, setDuration)}
                layoutClassName="grid grid-cols-2 gap-2"
                sizeClassName="py-3 px-4 rounded-card text-sm text-left"
            />

            <SelectableGroup
                label="What sounds good?"
                items={VIBES}
                selected={vibe}
                onToggle={(id) => toggleSelection(vibe, id, setVibe)}
                layoutClassName="flex flex-wrap gap-2"
                sizeClassName="py-2 px-4 rounded-pill text-sm"
            />

            <SelectableGroup
                label="Who is joining?"
                items={COMPANIONS}
                selected={companion}
                onToggle={(id) => toggleSelection(companion, id, setCompanion)}
                layoutClassName="grid grid-cols-3 gap-2"
                sizeClassName="py-2.5 px-3 rounded-card text-sm"
            />

            {/* Actions */}
            <div className="pt-4 pb-2 space-y-3 text-center">
                <button
                    onClick={onStart}
                    className="btn-primary-hero w-full text-center py-4 text-lg shadow-lg"
                >
                    Generate Idea ⚡
                </button>
                <button
                    onClick={() => setStep('welcome')}
                    className="text-sm text-ink-soft hover:text-ink transition-colors inline-flex items-center gap-1 font-medium pt-2 cursor-pointer"
                >
                    ← Change selected location
                </button>
            </div>
        </div>
    );
}