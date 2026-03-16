/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ["Poppins", "sans-serif"],
        mono: ["Roboto Mono", "monospace"],
        sans: ["Inter", "sans-serif"],
      },
      colors: {
        "nature-bg": "#E8F5E9",
        "midnight-bg": "#020617",
        "brutal-green": "#00FF00",
        "brutal-red": "#FF3131",
        primary: "#6C63FF",
        success: "#4CAF50",
        danger: "#FF6B6B",
        "bg-main": "#F8F9FA",
        "text-main": "#212529",
      },
      boxShadow: {
        neo: "0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.05)",
        "neo-hover": "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -6px rgba(0, 0, 0, 0.1)",
        brutal: "4px 4px 0px 0px rgba(0,0,0,1)",
        "brutal-hover": "6px 6px 0px 0px rgba(0,0,0,1)",
        "brutal-white": "4px 4px 0px 0px rgba(255,255,255,1)",
      },
      borderRadius: {
        "neo": "2rem",
      }
    },
  },
  plugins: [],
}