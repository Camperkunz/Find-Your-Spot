import { useAppContext } from '../context/AppContext';

export default function WelcomeStep() {
    const {
        city, setCity,
        step, setStep } = useAppContext();

    return (
        <div className="text-center space-y-8 py-8 max-w-sm mx-auto">
            <div className="space-y-3">
                <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-ink">
                    You don't <br />need to plan.
                </h2>
                <p className="text-ink-soft text-base sm:text-lg mt-4">
                    Stop scrolling through endless maps. Get one perfect idea and just go!
                </p>
            </div>
            {/* City Selector */}
            <div className="bg-surface-card p-6 rounded-card border border-ink-faint/30 shadow-md">
                <label
                    htmlFor="city-select"
                    className="text-sm font-bold text-accent2 uppercase tracking-wider block mb-2 text-center"
                >
                    Leaving from
                </label>
                <div className="relative">
                    <select
                        id="city-select"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full bg-surface border border-surface-muted rounded-card px-4 py-3 text-ink font-medium appearance-none cursor-pointer"
                    >
                        <option value="Ottawa">Ottawa, ON</option>
                        {/* for future */}
                        <option value="Toronto" disabled>Toronto (Coming Soon)</option>
                        <option value="Montreal" disabled>Montreal (Coming Soon)</option>
                    </select>
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-ink-soft"
                    > ▼
                    </div>
                </div>
            </div>
            {/* Button */}
            <button
                onClick={() => setStep('onboarding')}
                className="btn-primary w-full text-lg py-4 rounded-card shadow-lg shadow-accent/10"
            >
                Find My Adventure
            </button>
        </div>
    );
}