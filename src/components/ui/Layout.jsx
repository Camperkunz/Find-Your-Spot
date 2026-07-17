import Header from "./Header.jsx";
import Footer from "./Footer.jsx";

export default function Layout({ children }) {
    return (
        <div className="min-h-screen bg-surface text-ink flex flex-col font-sans selection:bg-accent-soft selection:text-accent">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
        </div>
    );
}