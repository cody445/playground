import { TrackerCard } from './components/TrackerCard';

function App() {
    return (
        <div className="min-h-screen bg-gray-50 p-8 font-sans text-gray-900">
            <div className="max-w-2xl mx-auto space-y-8">
                <div className="text-center space-y-2">
                    <h1 className="text-2xl font-bold">PoC: Package Tracker for HubSpot</h1>
                    <p className="text-slate-500">
                        Enter a tracking number below to verify the card logic.
                    </p>
                </div>

                <TrackerCard />

                <div className="text-xs text-center text-gray-400">
                    <p>Proof of Concept - Not connected to live Carrier APIs</p>
                </div>
            </div>
        </div>
    )
}

export default App
