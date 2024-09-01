import React, { useContext, useEffect } from "react";
import { ThemeContext } from "./ThemeContext";
import { createGlobalStyle } from "styled-components";

const Kings = "/fonts/Kings.woff2";
const Ribeye = "/fonts/Ribeye.woff2";

const StyledGlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Kings';
    src: url(${Kings}) format('woff2');
  }

  @font-face {
    font-family: 'Ribeye';
    src: url(${Ribeye}) format('woff2');
  }

  :root {
    --background-color-light: #fff;
    --text-color-light: #000;

    --background-color-dark: #000;
    --text-color-dark: #fff;

    --primary-color: #d9b99b;
    --secondary-color: #9a7d6b;
    --tertiary-color: #d5bab9;

    --background-color: var(--background-color-light);
    --text-color: var(--text-color-light);
  }

   [data-theme='dark'] {
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

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Kings', Helvetica, sans-serif;
  }
`;

export const GlobalStyle = () => {
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return <StyledGlobalStyle />;
};
