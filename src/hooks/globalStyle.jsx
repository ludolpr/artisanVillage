import React, { useContext, useEffect } from "react";
import { ThemeContext } from "./ThemeContext";
import { createGlobalStyle } from "styled-components";

const StyledGlobalStyle = createGlobalStyle`
  :root {
    --primary-color: #d9b99b;
    --secondary-color: #9a7d6b;
    --tertiary-color: #d5bab9;

    --transition-100: #ffffff;
    --transition-200: #ffffff;
    --transition-300: #ffffff;
    --transition-400: #ffffff;
    --transition-500: #ffffff;
    --transition-600: #cccccc;
    --transition-700: #999999;
    --transition-800: #666666;
    --transition-900: #333333;

    --background-color-light: #fff;
    --text-color-light: #000;
    --background-color-dark: #000;
    --text-color-dark: #fff;
  }

  [data-theme='dark'] {
    --primary-color: #333333;
    --secondary-color: #666666;
    --tertiary-color: #999999;

    --transition-100: #000000;
    --transition-200: #000000;
    --transition-300: #000000;
    --transition-400: #000000;
    --transition-500: #000000;
    --transition-600: #333333;
    --transition-700: #666666;
    --transition-800: #999999;
    --transition-900: #cccccc;

    --background-color: var(--background-color-dark);
    --text-color: var(--text-color-dark);
  }

  [data-theme='light'] {
    --background-color: var(--background-color-light);
    --text-color: var(--text-color-light);
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
`;

export const GlobalStyle = () => {
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return <StyledGlobalStyle />;
};
