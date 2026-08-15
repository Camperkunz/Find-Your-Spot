import Header from "./Header.jsx";
import Footer from "./Footer.jsx";

export default function Layout({ children, wide = false }) {
    return (
        <div className="h-dvh bg-surface text-ink flex flex-col font-sans overflow-hidden">
            <Header />
            <main
                className={`flex-1 min-h-0 h-full flex flex-col px-6 sm:px-4 lg:px-8 py-8 w-full mx-auto ${wide ? "max-w-md lg:max-w-5xl" : "max-w-md"
                    }`}
            >
                {children}
            </main>
            <Footer />
        </div>
    );
}