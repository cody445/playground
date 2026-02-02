import { Carrier } from '../utils/carrierUtils';

export interface TrackingStep {
    label: string;
    location: string;
    date: string;
    status: 'completed' | 'current' | 'pending';
}

export interface TrackingData {
    carrier: Carrier;
    trackingNumber: string;
    status: 'Delivered' | 'In Transit' | 'Out for Delivery' | 'Exception';
    estimatedDelivery: string;
    steps: TrackingStep[];
}

export const getMockTrackingData = (carrier: Carrier, trackingNumber: string): TrackingData => {


    if (carrier === 'UPS') {
        return {
            carrier: 'UPS',
            trackingNumber,
            status: 'In Transit',
            estimatedDelivery: 'Feb 5, 2026',
            steps: [
                { label: 'Label Created', location: 'Shipper', date: 'Feb 1, 10:00 AM', status: 'completed' },
                { label: 'On the Way', location: 'Louisville, KY', date: 'Feb 2, 02:30 PM', status: 'current' },
                { label: 'Out for Delivery', location: 'Your Town', date: 'Feb 5, 08:00 AM', status: 'pending' },
                { label: 'Delivered', location: 'Front Porch', date: 'Feb 5, 02:00 PM', status: 'pending' },
            ]
        };
    } else if (carrier === 'FedEx') {
        return {
            carrier: 'FedEx',
            trackingNumber,
            status: 'Out for Delivery',
            estimatedDelivery: 'Today',
            steps: [
                { label: 'Picked Up', location: 'Memphis, TN', date: 'Feb 1, 09:00 AM', status: 'completed' },
                { label: 'In Transit', location: 'Local Facility', date: 'Feb 2, 06:00 AM', status: 'completed' },
                { label: 'Out for Delivery', location: 'Your Town', date: 'Feb 2, 08:45 AM', status: 'current' },
                { label: 'Delivered', location: 'Reception', date: 'Today', status: 'pending' },
            ]
        };
    }

    // Fallback / Unknown
    return {
        carrier: null,
        trackingNumber,
        status: 'In Transit',
        estimatedDelivery: 'Unknown',
        steps: []
    };
};
