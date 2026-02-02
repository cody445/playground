/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                brand: {
                    orange: '#F1AF40',      // Primary orange
                    blue: '#164559',        // Primary blue
                    'light-orange': '#F8D39B', // Light orange
                    'secondary-blue': '#2E6F9E', // Secondary Blue
                    'light-blue': '#F4F8FA',   // Light blue
                    red: '#F26839',         // Primary red
                }
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'], // Ensuring modern font stack
            },
            boxShadow: {
                'card': '0 4px 6px -1px rgba(22, 69, 89, 0.1), 0 2px 4px -1px rgba(22, 69, 89, 0.06)', // Blue-tinted shadow
                'card-hover': '0 10px 15px -3px rgba(22, 69, 89, 0.1), 0 4px 6px -2px rgba(22, 69, 89, 0.05)',
            }
        },
    },
    plugins: [],
}
