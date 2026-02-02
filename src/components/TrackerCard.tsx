import React, { useState, useEffect } from 'react';
import { Search, Loader2 } from 'lucide-react';
import { ProgressBar } from './ProgressBar';
import { detectCarrier } from '../utils/carrierUtils';
import { getMockTrackingData, TrackingData } from '../services/mockTracking';

export const TrackerCard: React.FC = () => {
    const [input, setInput] = useState('');
    const [data, setData] = useState<TrackingData | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Check URL params for tracking number
        const params = new URLSearchParams(window.location.search);
        const trackingParam = params.get('tracking');
        if (trackingParam) {
            setInput(trackingParam);
        }
    }, []);

    useEffect(() => {
        // Auto-detect when input changes
        const carrier = detectCarrier(input);
        if (carrier) {
            setLoading(true);
            // Simulate network request for effect
            setTimeout(() => {
                const mockData = getMockTrackingData(carrier, input);
                setData(mockData);
                setLoading(false);
            }, 600);
        } else {
            setData(null);
        }
    }, [input]);

    // Use brand colors for both, but maybe differentiate slightly if needed.
    // The user wants BRAND colors. Let's use Primary Orange for "active" things and Primary Blue for structure.
    // We can still use the brand-secondary-blue for FedEx to keep some distinction, but keep it "on brand".

    const statusColor = data?.status === 'Delivered' ? 'text-green-600' : 'text-brand-orange';

    return (
        <div className="max-w-xl mx-auto mt-12 bg-white rounded-xl shadow-card hover:shadow-card-hover transition-shadow duration-300 overflow-hidden border border-slate-100">
            {/* Header Bar */}
            <div className="bg-brand-blue px-6 py-4 flex items-center justify-between">
                <h2 className="text-lg font-bold text-white tracking-wide">Package Status</h2>
                {data?.carrier && (
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-white/10 text-white backdrop-blur-sm border border-white/20">
                        Via {data.carrier}
                    </span>
                )}
            </div>

            <div className="p-6">
                <label className="block text-xs font-bold text-brand-blue uppercase tracking-wider mb-2">
                    Tracking Number
                </label>
                <div className="relative mb-8 group">
                    <input
                        type="text"
                        className="w-full pl-10 pr-4 py-3 border-2 border-slate-200 rounded-lg focus:ring-4 focus:ring-brand-light-blue focus:border-brand-blue transition-all duration-300 text-brand-blue font-medium placeholder:text-slate-400"
                        placeholder="Paste FedEx or UPS tracking number..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <Search className="absolute left-3 top-3.5 w-5 h-5 text-slate-400 group-focus-within:text-brand-blue transition-colors" />
                    <p className="text-xs text-slate-400 mt-2 px-1">
                        Try: <span className="font-mono text-brand-secondary-blue">1Z...</span> for UPS or <span className="font-mono text-brand-secondary-blue">1234...</span> for FedEx
                    </p>
                </div>

                {loading ? (
                    <div className="h-48 flex flex-col items-center justify-center text-brand-blue/50">
                        <Loader2 className="w-8 h-8 animate-spin mb-2" />
                        <span className="text-sm font-medium">Locating Package...</span>
                    </div>
                ) : data ? (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="flex justify-between items-end border-b border-dashed border-slate-200 pb-6 mb-8">
                            <div>
                                <p className="text-xs text-slate-500 font-semibold uppercase mb-1">Scheduled Delivery</p>
                                <p className="text-3xl font-bold text-brand-blue tracking-tight">{data.estimatedDelivery}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-xs text-slate-500 font-semibold uppercase mb-1">Current Status</p>
                                <p className={`text-xl font-bold ${statusColor}`}>{data.status}</p>
                            </div>
                        </div>

                        <ProgressBar steps={data.steps} carrier={data.carrier} />
                    </div>
                ) : (
                    <div className="h-48 flex flex-col items-center justify-center bg-brand-light-blue/30 rounded-lg border-2 border-dashed border-brand-blue/10 text-brand-blue/40">
                        <div className="w-12 h-12 rounded-full bg-brand-light-blue/50 flex items-center justify-center mb-3">
                            <Search className="w-6 h-6 opacity-50" />
                        </div>
                        <span className="text-sm font-medium">Enter a tracking number to begin</span>
                    </div>
                )}
            </div>

            {/* Footer stripe */}
            <div className="h-1.5 w-full bg-gradient-to-r from-brand-blue via-brand-secondary-blue to-brand-orange"></div>
        </div>
    );
};
