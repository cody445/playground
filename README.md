# HubSpot Package Tracker PoC

A Proof of Concept for a HubSpot "App Card" that tracks packages via a "Pizza Tracker" interface.

## Project Structure
- `src/components/TrackerCard.tsx`: Main component mimicking the HubSpot card style.
- `src/components/ProgressBar.tsx`: Visual progress stepper.
- `src/utils/carrierUtils.ts`: Logic to detect UPS vs FedEx.
- `src/services/mockTracking.ts`: Mock data generator to simulate API responses.

## How to Run

1.  **Install Dependencies**:
    ```bash
    cd package-tracker-poc
    npm install
    ```

2.  **Run Development Server**:
    ```bash
    npm run dev
    ```
    Open the local URL (mock: http://localhost:5173).

## Vercel Deployment

If deploying to Vercel:
1.  Ensure the "Root Directory" in Vercel project settings is set to `package-tracker-poc` (if this folder is inside a larger repo).
2.  The build command should be `npm run build` or `vite build`.
3.  The output directory is `dist`.

## Features (PoC)
- **Carrier Detection**: Auto-detects "FedEx" (12/15/20 digits) or "UPS" (1Z...).
- **Mock Data**: Returns "dummy" tracking history for PoC purposes immediately upon valid input.
- **Visual Feedback**: Purple branding for FedEx, Gold/Yellow for UPS.
