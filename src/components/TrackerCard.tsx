import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { ProgressBar } from './ProgressBar';
import { detectCarrier } from '../utils/carrierUtils';
import { getMockTrackingData, TrackingData } from '../services/mockTracking';

export const TrackerCard: React.FC = () => {
    const [input, setInput] = useState('');
    const [data, setData] = useState<TrackingData | null>(null);

    useEffect(() => {
        // Auto-detect when input changes
        const carrier = detectCarrier(input);
        if (carrier) {
            const mockData = getMockTrackingData(carrier, input);
            setData(mockData);
        } else {
            setData(null);
        }
    }, [input]);

    const carrierColor = data?.carrier === 'FedEx' ? 'text-purple-600' : 'text-yellow-600';

    return (
        <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md border border-gray-200">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-800">Package Status</h2>
                {data?.carrier && (
                    <span className={`text-xs font-bold px-2 py-1 rounded bg-opacity-10 ${carrierColor} bg-current border border-current`}>
                        via {data.carrier}
                    </span>
                )}
            </div>

            <div className="mb-8 relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">Tracking Number or Link</label>
                <div className="relative">
                    <input
                        type="text"
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                        placeholder="Paste FedEx or UPS tracking number..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                </div>
                <p className="text-xs text-gray-500 mt-1">Try: "1Z..." for UPS or "123456789012" for FedEx</p>
            </div>

            {data ? (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="mb-6 flex justify-between items-end border-b pb-4 border-gray-100">
                        <div>
                            <p className="text-sm text-gray-500">Scheduled Delivery</p>
                            <p className="text-2xl font-bold text-gray-900">{data.estimatedDelivery}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-sm text-gray-500">Status</p>
                            <p className={`font-semibold ${carrierColor}`}>{data.status}</p>
                        </div>
                    </div>

                    <ProgressBar steps={data.steps} carrier={data.carrier} />
                </div>
            ) : (
                <div className="h-40 flex items-center justify-center bg-gray-50 rounded border border-dashed border-gray-200 text-gray-400 text-sm">
                    Enter a valid tracking ID to see status
                </div>
            )}
        </div>
    );
};
