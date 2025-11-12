import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Fonts & global styles
import "./styles/fonts.css";
import "@fontsource/zen-loop/400.css";
import "@fontsource/nanum-gothic/400.css";
import "@fontsource/nanum-gothic/700.css";
import "@fontsource/zen-loop";
import "@fontsource/nanum-gothic";

import { AuthProvider } from "./context/AuthContext.jsx";
import { theme } from "./theme.js";

// Creează root O SINGURĂ DATĂ
const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <AuthProvider>
          <App />
          <ToastContainer position="top-center" autoClose={2200} />
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
