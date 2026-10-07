import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

// React procesa nuestros componentes JSX. Tailwind genera los estilos de las clases.
// Registramos ambos plugins para que Vite los use al desarrollar y al compilar.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // El TP1 permite este puerto por CORS; no cambiamos a otro silenciosamente.
  server: { port: 5173, strictPort: true },
});
