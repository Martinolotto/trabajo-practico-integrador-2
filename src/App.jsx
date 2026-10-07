import { AppRouter } from "./router/AppRouter.jsx";

// App es el componente raíz y delega la selección de páginas al router.
// main.jsx monta este árbol dentro del contenedor root de nuestro HTML.
export const App = () => {
  return <AppRouter />;
};
