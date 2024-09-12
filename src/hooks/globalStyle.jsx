import React, { useContext, useEffect } from "react";
import { ThemeContext } from "./ThemeContext";
import { createGlobalStyle } from "styled-components";

const StyledGlobalStyle = createGlobalStyle`
  :root {
    /* Couleurs pour le mode clair */
    --primary-color: #d9b99b;
    --secondary-color: #9a7d6b;
    --tertiary-color: #d5bab9;
    --hover-color: #9a7d6b;
    --background-color-light: #ffffff;
    --text-color-light: #000000;

    /* Couleurs pour le mode sombre */
    --primary-color-dark: #1a1a1a;
    --secondary-color-dark: #333333;
    --tertiary-color-dark: #444444;
    --hover-color-dark: #4d4d4d;
    --background-color-dark: #121212;
    --text-color-dark: #ffffff;

    /* Couleurs pour le mode daltonien */
    --primary-color-eye: #f0e68c;
    --secondary-color-eye: #d5b97c;
    --tertiary-color-eye: #bfbf77;
    --hover-color-eye: #e0d16e;
    --background-color-eye: #f5f5dc;
    --text-color-eye: #000000;
  }

  [data-theme='light'] {
    --background-color: var(--background-color-light);
    --text-color: var(--text-color-light);
    --primary-color: var(--primary-color);
    --secondary-color: var(--secondary-color);
    --tertiary-color: var(--tertiary-color);
    --hover-color: var(--hover-color);
  }

  [data-theme='dark'] {
    --background-color: var(--background-color-dark);
    --text-color: var(--text-color-dark);
    --primary-color: var(--primary-color-dark);
    --secondary-color: var(--secondary-color-dark);
    --tertiary-color: var(--tertiary-color-dark);
    --hover-color: var(--hover-color-dark);
  }

  [data-theme='eye'] {
    --background-color: var(--background-color-eye);
    --text-color: var(--text-color-eye);
    --primary-color: var(--primary-color-eye);
    --secondary-color: var(--secondary-color-eye);
    --tertiary-color: var(--tertiary-color-eye);
    --hover-color: var(--hover-color-eye);
  }

  *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background-color: var(--background-color);
    color: var(--text-color);
    transition: background-color 0.3s, color 0.3s;
  }

  a {
    color: var(--primary-color);
    transition: color 0.3s;
  }

  a:hover {
    color: var(--hover-color);
  }

  .btn {
    background-color: var(--primary-color);
    color: var(--text-color);
    border: 1px solid var(--primary-color);
    transition: background-color 0.3s, border-color 0.3s;
  }

  .btn:hover {
    background-color: var(--hover-color);
    border-color: var(--hover-color);
  }
`;

export const GlobalStyle = () => {
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return <StyledGlobalStyle />;
};
