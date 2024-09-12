import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Modal from "react-modal";
import "./assets/styles/stylesTailwind.css";
import "./assets/styles/stylesSass.css";

import { ThemeProvider } from "./hooks/ThemeContext";
import { UserProvider } from "./hooks/UserContext";
import { GlobalStyle } from "./hooks/globalStyle";

Modal.setAppElement("#root");

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <UserProvider>
        <App />
        <GlobalStyle />
      </UserProvider>
    </ThemeProvider>
  </React.StrictMode>
);
