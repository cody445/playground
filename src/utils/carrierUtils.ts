export type Carrier = 'UPS' | 'FedEx' | null;

export const detectCarrier = (input: string): Carrier => {
    const normalizedInput = input.trim().toUpperCase();

    // UPS: Often starts with 1Z, or 18 digits
    const upsRegex = /\b(1Z[0-9A-Z]{16})\b/;

    // FedEx: Often 12, 15, 20 digits. Let's use a simpler check for PoC.
    // We'll check for 12 digits for FedEx ground, or URL patterns.
    const fedexRegex = /(\b\d{12}\b|\b\d{15}\b|\b\d{20}\b)/;

    if (normalizedInput.includes('UPS') || upsRegex.test(normalizedInput)) {
        return 'UPS';
    }

    if (normalizedInput.includes('FEDEX') || fedexRegex.test(normalizedInput)) {
        return 'FedEx';
    }

    // URL detection fallback
    if (normalizedInput.includes('UPS.COM')) return 'UPS';
    if (normalizedInput.includes('FEDEX.COM')) return 'FedEx';

    return null;
};
