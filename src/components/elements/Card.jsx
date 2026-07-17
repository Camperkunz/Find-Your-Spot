import { useAppContext } from '../../context/AppContext';

export default function Card({ deck, currentIndex, handleSwipe }) {
    const { savedPlaces, setSavedPlaces } = useAppContext();
    const currentCard = deck[currentIndex];

    return (
        <div className="p-4 border border-gray-300 rounded max-w-md mx-auto">

            {/* Main info */}
            <div className="relative mb-4">
                <img
                    src={currentCard.image_url}
                    alt={currentCard.name}
                    className="w-full h-48 object-cover gray-200"
                />
                <div>
                    Distance: {currentCard.distance_km} km ({currentCard.travel_time_min} min)
                </div>
            </div>
            {/*  */}
            <div className="mb-4">
                <span className="text-xs text-gray-500 uppercase">{currentCard.region}</span>
                <h4 className="text-xl font-bold">{currentCard.name}</h4>
                <p className="text-sm text-gray-700 my-2">{currentCard.description}</p>
            </div>
            {/*  */}
            <div className="bg-gray-100 p-3 my-2 text-sm">
                <strong>Why today:</strong>
                <p className="italic">"{currentCard.why_visit_today}"</p>
            </div>
            {/*  */}
            <div className="my-2 text-sm">
                <strong>What to pack:</strong>
                <div className="flex flex-wrap gap-1 mt-1">
                    {currentCard.what_to_bring?.map((item, idx) => (
                        <span key={idx} className="bg-gray-200 px-2 py-0.5 rounded text-xs">
                            {item}
                        </span>
                    ))}
                </div>
            </div>
            {/* Buttons */}
            <div className="flex justify-between items-center gap-4 mt-6">
                <button
                    onClick={() => handleSwipe('left')}
                    className="px-4 py-2 bg-red-100 text-red-700 rounded hover:bg-red-200"
                >
                    Skip
                </button>

                <button
                    onClick={() => alert(`Opening map routing to: ${currentCard.address}`)}
                    className="flex-1 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Let's Go
                </button>

                <button
                    onClick={() => handleSwipe('right')}
                    className="px-4 py-2 bg-green-100 text-green-700 rounded hover:bg-green-200"
                >
                    Save
                </button>
            </div>
        </div>
    );
}