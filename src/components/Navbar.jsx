import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { API_URL } from "../config/api.js";

export const Navbar = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Pedimos al servidor eliminar la cookie antes de quitar nuestra marca local.
  // Un fallo de red no debe mostrarse como si la sesión se hubiera cerrado.
  const handleLogout = async () => {
    if (isLoading) return;
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
      const data = await response.json();

      // Un 401 significa que la sesión ya no existe; también limpiamos la marca.
      // Cualquier otro error mantiene la pantalla y permite volver a intentar.
      if (!response.ok && response.status !== 401) {
        const requestError = new Error(
          response.status >= 500
            ? "Ocurrió un error en el servidor. No se pudo cerrar la sesión."
            : data.message || "No se pudo cerrar la sesión.",
        );
        requestError.status = response.status;
        throw requestError;
      }

      localStorage.removeItem("isLogged");
      navigate("/login", {
        replace: true,
        state: {
          message: response.status === 401
            ? "Tu sesión ya había finalizado."
            : "Sesión cerrada correctamente.",
        },
      });
    } catch (requestError) {
      setError(
        requestError.status
          ? requestError.message
          : "No se pudo cerrar la sesión. Verificá la conexión y volvé a intentar.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <nav aria-label="Navegación principal" className="border-b">
      <div className="mx-auto flex max-w-3xl items-center justify-between gap-4 p-4">
        <Link to="/home" className="text-blue-700 underline">Inicio</Link>

        {/* El botón informa la carga y evita enviar varios logout simultáneos. */}
        <button
          type="button"
          onClick={handleLogout}
          disabled={isLoading}
          className="border p-2 disabled:opacity-50"
        >
          {isLoading ? "Cerrando sesión..." : "Cerrar sesión"}
        </button>
      </div>
      {error && <p role="alert" className="mx-auto max-w-3xl px-4 pb-4 text-red-700">{error}</p>}
    </nav>
  );
};
