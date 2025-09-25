import React from 'react'
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { AppProviders } from './context/Providers'

createRoot(document.getElementById("root")!).render(
      <React.StrictMode>
            <AppProviders>
                  <App />
            </AppProviders>
      </React.StrictMode>,
);
