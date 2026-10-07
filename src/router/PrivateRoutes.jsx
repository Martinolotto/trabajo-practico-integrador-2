import { Navigate, Outlet } from "react-router";
import { Navbar } from "../components/Navbar.jsx";

export const PrivateRoutes = () => {
  // localStorage guarda strings: "false" también es texto, por eso comparamos "true".
  // Esta marca organiza la navegación; la autorización real la hace nuestro TP1.
  const isLogged = localStorage.getItem("isLogged") === "true";

  if (!isLogged) {
    return <Navigate to="/login" replace />;
  }

  // Navbar aparece solo en este grupo; Outlet muestra la página privada seleccionada.
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};
