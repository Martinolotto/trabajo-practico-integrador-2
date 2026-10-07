import { LoginPage } from "./pages/LoginPage.jsx";

// App es el componente raíz elige qué componentes mostramos en la aplicación.
// Por ahora muestra LoginPage después delegará la navegación a AppRouter.
export const App = () => {
  return <LoginPage />;
};
