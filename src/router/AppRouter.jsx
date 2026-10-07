import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { HomePage } from "../pages/HomePage.jsx";
import { LoginPage } from "../pages/LoginPage.jsx";
import { RegisterPage } from "../pages/RegisterPage.jsx";
import { PrivateRoutes } from "./PrivateRoutes.jsx";
import { PublicRoutes } from "./PublicRoutes.jsx";

// Leemos la marca cuando se visita una URL desconocida, no solo al montar App.
// Así la redirección también refleja un login o logout realizado después.
const DefaultRoute = () => {
  const isLogged = localStorage.getItem("isLogged") === "true";
  return <Navigate to={isLogged ? "/home" : "/login"} replace />;
};

// El router relaciona las direcciones del navegador con nuestras páginas.
// Los guards deciden si se muestra la ruta hija o se redirige a otra pantalla.
export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicRoutes />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        <Route element={<PrivateRoutes />}>
          <Route path="/home" element={<HomePage />} />
        </Route>

        {/* También cubre la raíz y las URLs inexistentes, según la marca de sesión. */}
        <Route path="*" element={<DefaultRoute />} />
      </Routes>
    </BrowserRouter>
  );
};
