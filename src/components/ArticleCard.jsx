// Recibimos un artículo por props; HomePage será quien obtenga los datos.
// La tarjeta solo muestra el contenido: no hace fetch ni modifica el objeto recibido.
export const ArticleCard = ({ article }) => {
  return (
    <article className="border p-4">
      {/* Las llaves permiten mostrar las propiedades del objeto dentro del JSX. */}
      <h2 className="mb-2 break-words text-xl font-bold">{article.title}</h2>
      <p className="mb-2 break-words">{article.excerpt}</p>

      {/* author es otro objeto del artículo; username contiene el nombre del autor. */}
      <p className="text-blue-700">Autor: {article.author.username}</p>
    </article>
  );
};
