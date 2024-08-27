import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import "./assets/styles/stylesTailwind.css";
import "./assets/styles/stylesSass.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
