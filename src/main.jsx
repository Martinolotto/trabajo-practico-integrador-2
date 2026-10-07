import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { App } from "./App.jsx";

// createRoot usa el contenedor #root de index.html para montar nuestra interfaz.
// StrictMode ayuda a detectar problemas en desarrollo; no reescribimos el HTML.
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
