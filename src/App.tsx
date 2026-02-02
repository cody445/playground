import { TrackerCard } from './components/TrackerCard';

function App() {
    return (
        <div className="min-h-screen bg-brand-light-blue p-8 font-sans text-brand-blue flex flex-col items-center justify-center">
            <div className="max-w-3xl w-full space-y-8">
                <div className="text-center space-y-2">
                    <h1 className="text-3xl font-extrabold tracking-tight text-brand-blue">
                        Package Status Tracker
                    </h1>
                    <p className="text-brand-secondary-blue font-medium">
                        Secured Tech Logistics
                    </p>
                </div>

                <TrackerCard />

                <div className="text-xs text-center text-slate-400 mt-12">
                    <p>© 2026 Secured Tech. Proof of Concept.</p>
                </div>
            </div>
        </div>
    )
}

export default App
