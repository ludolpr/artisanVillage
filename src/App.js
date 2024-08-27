import React from "react";
import Routes from "./components/routes/routesContainer";
import { ThemeProvider } from "./hooks/ThemeContext";
import { AuthProvider } from "./hooks/AuthContext";
import { UserProvider } from "./hooks/UserContext";
import { GlobalStyle } from "./hooks/globalStyle";

const App = () => {
  return (
    <AuthProvider>
      <UserProvider>
        <ThemeProvider>
          <GlobalStyle />
          <Routes />
        </ThemeProvider>
      </UserProvider>
    </AuthProvider>
  );
};

export default App;
