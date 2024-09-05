module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "var(--primary-color)",
        secondary: {
          500: "var(--secondary-color)",
        },
        tertiary: {
          500: "var(--tertiary-color)",
        },
        transition: {
          100: "var(--transition-100)",
          200: "var(--transition-200)",
          300: "var(--transition-300)",
          400: "var(--transition-400)",
          500: "var(--transition-500)",
          600: "var(--transition-600)",
          700: "var(--transition-700)",
          800: "var(--transition-800)",
          900: "var(--transition-900)",
        },
      },
    },
  },
  plugins: [],
};
