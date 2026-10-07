import { Navigate, Outlet } from "react-router";

export const PublicRoutes = () => {
  // Login y registro quedan disponibles cuando no tenemos la marca de sesión.
  // Si ya iniciamos sesión, evitamos volver a esos formularios por la URL.
  const isLogged = localStorage.getItem("isLogged") === "true";

  return isLogged ? <Navigate to="/home" replace /> : <Outlet />;
};
