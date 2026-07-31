import Header from "./Header.jsx";
import Footer from "./Footer.jsx";

export default function Layout({ children, wide = false }) {
    return (
        <div className="min-h-dvh bg-surface text-ink flex flex-col font-sans">
            <Header />
            <main
                className={`flex-1 px-4 sm:px-6 lg:px-8 w-full mx-auto ${wide ? "max-w-md lg:max-w-4xl" : "max-w-md"
                    }`}
            >
                {children}
            </main>
            <Footer />
        </div>
    );
}