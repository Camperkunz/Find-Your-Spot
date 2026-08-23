export default function OrDivider() {
    return (
        <div className="flex items-center gap-3 text-ink-faint/70">
            <div className="h-px bg-current flex-1"></div>
            <span className="text-sm uppercase font-bold tracking-widest">OR</span>
            <div className="h-px bg-current flex-1"></div>
        </div>
    );
}