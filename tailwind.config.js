/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Include all JS/JSX/TS/TSX files in src
  ],
  theme: {
    extend: {
      colors: {
        // Custom colors (optional)
        purple: {
          100: "#F3E8FF",
          600: "#9333EA",
          700: "#7E22CE",
        },
        gray: {
          50: "#F9FAFB",
          100: "#F3F4F6",
          500: "#6B7280",
          600: "#4B5563",
          800: "#1F2937",
        },
        red: {
          100: "#FEE2E2",
          600: "#DC2626",
        },
        blue: {
          100: "#DBEAFE",
          600: "#2563EB",
        },
      },
      boxShadow: {
        sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
        DEFAULT: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)",
      },
    },
  },
  plugins: [],
};