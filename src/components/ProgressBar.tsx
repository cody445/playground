import React from 'react';
import { Check, Truck, Package, Home } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { TrackingStep } from '../services/mockTracking';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface ProgressBarProps {
    steps: TrackingStep[];
    carrier: string | null;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ steps, carrier }) => {
    if (!steps || steps.length === 0) return null;

    const getIcon = (label: string) => {
        if (label.includes('Label')) return Package;
        if (label.includes('Transit') || label.includes('Way')) return Truck;
        if (label.includes('Out')) return Truck;
        if (label.includes('Delivered')) return Home;
        return Check;
    };

    const brandColor = carrier === 'FedEx' ? 'bg-purple-600 text-purple-600' : 'bg-yellow-600 text-yellow-600';
    const brandBorder = carrier === 'FedEx' ? 'border-purple-600' : 'border-yellow-600';

    return (
        <div className="w-full py-6">
            <div className="flex items-center justify-between relative">
                {/* Connection Line */}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-gray-200 -z-10"></div>
                <div
                    className={cn("absolute left-0 top-1/2 -translate-y-1/2 h-1 -z-10 transition-all duration-500",
                        carrier === 'FedEx' ? 'bg-purple-600' : 'bg-yellow-600'
                    )}
                    style={{ width: `${(steps.findIndex(s => s.status === 'current') / (steps.length - 1)) * 100}%` }}
                ></div>

                {steps.map((step, index) => {
                    const Icon = getIcon(step.label);
                    const isCompleted = step.status === 'completed';
                    const isCurrent = step.status === 'current';
                    const isPending = step.status === 'pending';

                    return (
                        <div key={index} className="flex flex-col items-center group relative">
                            <div
                                className={cn(
                                    "w-10 h-10 rounded-full flex items-center justify-center border-2 bg-white transition-all duration-300",
                                    isCompleted ? `${brandBorder} ${brandColor.split(' ')[1]}` :
                                        isCurrent ? `${brandBorder} ${brandColor} text-white` :
                                            "border-gray-200 text-gray-300"
                                )}
                            >
                                {isCompleted ? <Check className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                            </div>

                            <div className="absolute top-12 flex flex-col items-center w-32 text-center">
                                <span className={cn("text-xs font-bold", isPending ? "text-gray-400" : "text-gray-800")}>
                                    {step.label}
                                </span>
                                <span className="text-[10px] text-gray-500">{step.date}</span>
                                <span className="text-[10px] text-gray-400">{step.location}</span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
