/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: [
        './index.html',
        './src/**/*.{ts,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                day: '#f6f9ff',
                night: '#0b1220',
                brand: {
                    500: '#6c5ce7',
                    600: '#5849d8'
                }
            },
            boxShadow: {
                'soft': '0 10px 25px rgba(0,0,0,0.08)'
            },
            borderRadius: {
                '2xl': '1rem'
            }
        },
    },
    plugins: [],
};