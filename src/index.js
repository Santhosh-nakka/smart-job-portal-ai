import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";

import { SkillsProvider } from "./context/SkillsContext";
import { ThemeProvider } from "./context/ThemeContext";

import "./index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root")
);

root.render(
  <React.StrictMode>

    <ThemeProvider>

      <SkillsProvider>

        {/* PARTICLES */}
        <div className="particles">
          {[...Array(25)].map((_, i) => (
            <span key={i}></span>
          ))}
        </div>

        {/* EXTRA GLOW */}
        <div className="glow-layer"></div>

        {/* MAIN APP */}
        <App />

      </SkillsProvider>

    </ThemeProvider>

  </React.StrictMode>
);