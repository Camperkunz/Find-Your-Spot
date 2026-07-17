export default function Header() {
    return (
        <header className="flex h-20 items-center justify-between px-6 md:px-16 border-b border-surface-muted">
            <button onClick={() => setStep('welcome')} className="flex items-center hover:cursor-pointer">
                <h1 className="text-xl md:text-xl font-bold text-accent">
                    Where should I go?
                </h1>
            </button>
        </header>
    );
}