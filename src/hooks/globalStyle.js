import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";
import { createGlobalStyle } from "styled-components";

const StyledGlobalStyle = createGlobalStyle`
  * {
    font-family: 'Trebuchet MS', Helvetica, sans-serif;
  }

  #root {
    background-color: ${({ isDarkMode }) =>
      isDarkMode ? "black" : "primary-500"};
    margin: 0;
    color: ${({ isDarkMode }) => (isDarkMode ? "black" : "black")};
  }
    
`;

export const GlobalStyle = () => {
  const { theme } = useContext(ThemeContext);
  return <StyledGlobalStyle isDarkMode={theme === "dark"} />;
};
