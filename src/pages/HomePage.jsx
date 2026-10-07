import { useEffect } from "react";
import { useNavigate } from "react-router";
import { ArticleCard } from "../components/ArticleCard.jsx";
import { API_URL } from "../config/api.js";
import { useFetch } from "../hooks/useFetch.js";

export const HomePage = () => {
  const navigate = useNavigate();
  // Home elige qué mostrar; el hook se ocupa de la consulta y sus estados.
  // Este endpoint devuelve directamente un array, no un objeto con una clave articles.
  const { data, isLoading, error } = useFetch(`${API_URL}/articles`);

  // La marca local puede existir aunque la cookie ya haya vencido.
  // Solo un 401 termina esta sesión; un 403 se muestra como falta de permisos.
  useEffect(() => {
    if (error?.status === 401) {
      localStorage.removeItem("isLogged");
      navigate("/login", {
        replace: true,
        state: { message: "Tu sesión terminó. Iniciá sesión nuevamente." },
      });
    }
  }, [error, navigate]);

  return (
    <main className="mx-auto max-w-3xl p-4">
      <h1 className="mb-4 text-2xl font-bold">Artículos publicados</h1>

      {/* Priorizamos carga/error antes de intentar recorrer los datos recibidos. */}
      {isLoading ? (
        <p role="status">Cargando artículos...</p>
      ) : error ? (
        <p role="alert" className="text-red-700">{error.message}</p>
      ) : !Array.isArray(data) ? (
        <p role="alert" className="text-red-700">
          El servidor no devolvió una lista de artículos válida.
        </p>
      ) : data.length === 0 ? (
        <p>No hay artículos publicados.</p>
      ) : (
        <section aria-label="Listado de artículos" className="flex flex-col gap-4">
          {/* Cada artículo genera una tarjeta; su id es la key estable de React. */}
          {data.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </section>
      )}
    </main>
  );
};
