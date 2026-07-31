import React from 'react';
import { useAppContext } from '../context/AppContext';
import { DURATIONS, VIBES, COMPANIONS } from '../logic/categories.js';

// Shared active/inactive styling for selectable option buttons (Duration, Vibe, Companion)
const selectableBtn = (isActive) =>
    `font-medium transition flex items-center gap-1.5 border ${isActive
        ? 'bg-accent text-surface-card border-accent font-semibold shadow-md'
        : 'bg-surface-card text-ink border-surface-muted hover:border-ink-soft'
    }`;

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

            {/* Duration */}
            <div className="space-y-3">
                <label className="text-xs font-semibold text-ink-soft uppercase tracking-wider">
                    How much time do you have?
                </label>
                <div className="grid grid-cols-2 gap-2">
                    {DURATIONS.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setDuration(item.id)}
                            className={`py-3 px-4 rounded-card text-sm text-left ${selectableBtn(duration === item.id)}`}
                        >
                            <span>{item.icon}</span>
                            <span>{item.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Experience / Vibe */}
            <div className="space-y-3">
                <label className="text-xs font-semibold text-ink-soft uppercase tracking-wider">
                    What sounds good?
                </label>
                <div className="flex flex-wrap gap-2">
                    {VIBES.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setVibe(item.id)}
                            className={`py-2 px-4 rounded-pill text-sm ${selectableBtn(vibe === item.id)}`}
                        >
                            <span>{item.icon}</span>
                            <span>{item.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Companion */}
            <div className="space-y-3">
                <label className="text-xs font-semibold text-ink-soft uppercase tracking-wider">
                    Who is joining?
                </label>
                <div className="grid grid-cols-3 gap-2">
                    {COMPANIONS.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setCompanion(item.id)}
                            className={`py-2.5 px-3 rounded-card text-sm ${selectableBtn(companion === item.id)}`}
                        >
                            <span>{item.icon}</span>
                            <span>{item.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Actions */}
            <div className="pt-4 flex gap-3">
                <button
                    onClick={() => setStep('welcome')}
                    className="btn-outline px-6 py-4 text-ink-soft hover:text-ink font-semibold"
                >
                    ← Back
                </button>

                <button
                    onClick={onStart}
                    className="btn-primary-hero flex-1 text-center"
                >
                    Generate Idea ⚡
                </button>
            </div>
        </div>
    );
}