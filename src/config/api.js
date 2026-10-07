// La URL es pública y ya incluye /api; no guardamos secretos del backend acá.
// La variable de Vite permite cambiar el servidor sin editar cada petición.
export const API_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:3000/api"
).replace(/\/$/, "");
