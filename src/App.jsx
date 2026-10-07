import { LoginPage } from "./pages/LoginPage.jsx";

// App es el componente raíz: elige qué página mostramos en la aplicación.
// Por ahora muestra LoginPage; después AppRouter elegirá según la URL.
export const App = () => {
  return <LoginPage />;
};
