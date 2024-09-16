module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class", // Active le mode sombre avec la classe "dark"
  theme: {
    extend: {
      colors: {
        bgPrimary: {
          DEFAULT: "#d9b99b", // Couleur primaire par défaut
          dark: "#1a1a1a", // Couleur primaire en mode sombre
          eye: "#f0e68c", // Couleur primaire en mode daltonien
        },
        bgSecondary: {
          DEFAULT: "#9a7d6b", // Couleur secondaire par défaut
          dark: "#333333", // Couleur secondaire en mode sombre
          eye: "#d5b97c", // Couleur secondaire en mode daltonien
        },
        hoverPrimary: {
          DEFAULT: "#9a7d6b", // Inverse de la couleur primaire (couleur secondaire)
          dark: "#333333", // Inverse de la couleur sombre pour primaire
          eye: "#d5b97c", // Inverse de la couleur daltonien pour primaire
        },
        hoverSecondary: {
          DEFAULT: "#d9b99b", // Inverse de la couleur secondaire (couleur primaire)
          dark: "#1a1a1a", // Inverse de la couleur sombre pour secondaire
          eye: "#f0e68c", // Inverse de la couleur daltonien pour secondaire
        },
        textPrimary: {
          DEFAULT: "#ffffff", // Couleur de texte par défaut
          dark: "#ffffff", // Couleur de texte en mode sombre
          eye: "#000000", // Couleur de texte en mode daltonien
        },
        textSecondary: {
          DEFAULT: "#000000", // Couleur de texte par défaut
          dark: "#000000", // Couleur de texte en mode sombre
          eye: "#ffffff", // Couleur de texte en mode daltonien
        },
      },
    },
  },
  plugins: [
    function ({ addUtilities, theme }) {
      addUtilities({
        ".bg-primary": {
          backgroundColor: theme("colors.primary.DEFAULT"), // Couleur primaire par défaut
          "@media (prefers-color-scheme: dark)": {
            backgroundColor: theme("colors.primary.dark"), // Couleur primaire en mode sombre
          },
          ".eye &": {
            backgroundColor: theme("colors.primary.eye"), // Couleur primaire en mode daltonien
          },
        },
        ".bg-hoverPrimary:hover": {
          backgroundColor: theme("colors.hoverPrimary.DEFAULT"), // Couleur hover primaire par défaut
          "@media (prefers-color-scheme: dark)": {
            backgroundColor: theme("colors.hoverPrimary.dark"), // Couleur hover en mode sombre
          },
          ".eye &": {
            backgroundColor: theme("colors.hoverPrimary.eye"), // Couleur hover en mode daltonien
          },
        },
        ".bg-secondary": {
          backgroundColor: theme("colors.secondary.DEFAULT"), // Couleur secondaire par défaut
          "@media (prefers-color-scheme: dark)": {
            backgroundColor: theme("colors.secondary.dark"), // Couleur secondaire en mode sombre
          },
          ".eye &": {
            backgroundColor: theme("colors.secondary.eye"), // Couleur secondaire en mode daltonien
          },
        },
        ".bg-hoverSecondary:hover": {
          backgroundColor: theme("colors.hoverSecondary.DEFAULT"), // Couleur hover secondaire par défaut
          "@media (prefers-color-scheme: dark)": {
            backgroundColor: theme("colors.hoverSecondary.dark"), // Couleur hover en mode sombre
          },
          ".eye &": {
            backgroundColor: theme("colors.hoverSecondary.eye"), // Couleur hover en mode daltonien
          },
        },
        ".text-primary": {
          color: theme("colors.text.DEFAULT"), // Couleur de texte par défaut
          "@media (prefers-color-scheme: dark)": {
            color: theme("colors.text.dark"), // Couleur de texte en mode sombre
          },
          ".eye &": {
            color: theme("colors.text.eye"), // Couleur de texte en mode daltonien
          },
        },
      });
    },
  ],
};
