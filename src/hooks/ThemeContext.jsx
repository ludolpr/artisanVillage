import React, { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const savedMode = localStorage.getItem("darkMode");
    return savedMode ? JSON.parse(savedMode) : "light";
  });

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      if (prevTheme === "dark") {
        return "light";
      } else if (prevTheme === "light") {
        return "eye";
      } else {
        return "dark";
      }
    });
  };
  

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(theme));
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
