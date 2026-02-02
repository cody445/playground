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

export const ProgressBar: React.FC<ProgressBarProps> = ({ steps }) => {
    if (!steps || steps.length === 0) return null;

    const getIcon = (label: string) => {
        if (label.includes('Label')) return Package;
        if (label.includes('Transit') || label.includes('Way')) return Truck;
        if (label.includes('Out')) return Truck;
        if (label.includes('Delivered')) return Home;
        return Check;
    };

    // We are using Brand Colors primarily now.
    // "Completed" steps = Primary Blue (Secured Tech Brand)
    // "Current" step = Primary Orange (Action color)
    // "Pending" step = Gray

    return (
        <div className="w-full px-2">
            <div className="flex items-center justify-between relative">
                {/* Background Grey Line */}
                <div className="absolute left-0 top-[18px] w-full h-1 bg-slate-100 -z-20 rounded-full"></div>

                {/* Dynamic Progress Line - Fills up to the current step */}
                {/* We calculate absolute position better or just rely on flex layout, but creating a bar that connects them is visually nice. 
             Simplified for Reliability: Let the individual items handle their "state" visualization, but the line is tricky in flex without fixed widths.
             Let's emulate the progress bar line.
         */}

                {steps.map((step, index) => {
                    const Icon = getIcon(step.label);
                    const isCompleted = step.status === 'completed';
                    const isCurrent = step.status === 'current';
                    const isPending = step.status === 'pending';

                    // Line segment to the right (except last item)
                    // This is a simple visual hack to color the line between steps
                    const isLast = index === steps.length - 1;

                    return (
                        <div key={index} className="flex-1 flex flex-col items-center relative group">
                            {/* Connecting Line to next step */}
                            {!isLast && (
                                <div className={cn(
                                    "absolute top-[18px] left-[50%] w-full h-1 -z-10 transition-colors duration-500",
                                    isCompleted ? "bg-brand-blue" : "bg-slate-100"
                                )}></div>
                            )}

                            {/* Icon Circle */}
                            <div
                                className={cn(
                                    "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 z-10 shadow-sm",
                                    isCompleted ? "bg-brand-blue border-brand-blue text-white" :
                                        isCurrent ? "bg-brand-orange border-brand-orange text-white ring-4 ring-brand-light-orange" :
                                            "bg-white border-slate-200 text-slate-300"
                                )}
                            >
                                {isCompleted ? <Check className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                            </div>

                            {/* Text Labels */}
                            <div className="mt-4 flex flex-col items-center text-center w-24">
                                <span className={cn(
                                    "text-[11px] font-bold uppercase tracking-wide mb-0.5",
                                    isCurrent ? "text-brand-orange" :
                                        isCompleted ? "text-brand-blue" : "text-slate-400"
                                )}>
                                    {step.label}
                                </span>
                                <span className="text-[10px] text-slate-500 font-medium">{step.date}</span>
                                <span className="text-[10px] text-slate-400">{step.location}</span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
