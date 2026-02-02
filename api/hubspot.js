export default function handler(request, response) {
    const { associatedObjectId, trackingNumber } = request.query;

    // Ideally, get the Vercel URL dynamically, or hardcode the production URL if known.
    // For Vercel Serverless Functions, 'host' header usually works.
    const protocol = request.headers['x-forwarded-proto'] || 'https';
    const host = request.headers['host'];
    const baseUrl = `${protocol}://${host}`;

    // If we have a tracking number, pass it to the iframe
    const iframeUrl = trackingNumber
        ? `${baseUrl}/?tracking=${encodeURIComponent(trackingNumber)}`
        : `${baseUrl}/`;

    response.status(200).json({
        results: [
            {
                objectId: Number(associatedObjectId),
                title: "Package Tracker",
                // Primary Action: Open the Iframe
                actions: [
                    {
                        type: "IFRAME",
                        width: 890,
                        height: 748,
                        uri: iframeUrl,
                        label: "Open Package Tracker"
                    }
                ],
                // Secondary: Show a quick preview if we had data, 
                // but for this PoC we just encourage opening the tracker.

                // Note: New HubSpot Cards might require 'primaryAction' field
                primaryAction: {
                    type: "IFRAME",
                    width: 890,
                    height: 748,
                    uri: iframeUrl,
                    label: "Open Package Tracker"
                }
            }
        ]
    });
}
