import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { API_URL } from "../config/api.js";
import { useForm } from "../hooks/useForm.js";

export const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [validationErrors, setValidationErrors] = useState([]);

  // El hook reúne los campos y su manejador; la página conserva el formulario JSX.
  // Desestructuramos form para usar username y password directamente en los inputs.
  const { form, handleInputChange, handleReset } = useForm({
    username: "",
    password: "",
  });
  const { username, password } = form;

  // Evitamos el envío HTML por defecto y consultamos el login real del TP1.
  // Deshabilitamos nuevos envíos mientras esperamos la respuesta del servidor.
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isLoading) return;

    setIsLoading(true);
    setError(null);
    setValidationErrors([]);

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await response.json();

      // Un 400 contiene errores de formato; un 401 indica credenciales incorrectas.
      // Ninguno de esos resultados debe guardar una marca de sesión exitosa.
      if (!response.ok) {
        if (response.status === 400 && Array.isArray(data.errors)) {
          setValidationErrors(data.errors);
          return;
        }

        const requestError = new Error(
          response.status >= 500
            ? "Ocurrió un error en el servidor. Intentá nuevamente más tarde."
            : data.message || "No se pudo iniciar sesión.",
        );
        requestError.status = response.status;
        throw requestError;
      }

      // La cookie la guarda el navegador; solo guardamos la marca para nuestras rutas.
      // Recién un resultado HTTP exitoso permite entrar a Home.
      localStorage.setItem("isLogged", "true");
      handleReset();
      navigate("/home", { replace: true });
    } catch (requestError) {
      setError(
        requestError.status
          ? requestError.message
          : "No se pudo completar el inicio de sesión. Verificá la conexión y el backend.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="mx-auto max-w-sm p-4">
      <h1 className="mb-4 text-2xl font-bold">Iniciar sesión</h1>

      {/* Recibimos el mensaje de registro, logout o sesión vencida mediante la navegación. */}
      {!isLoading && !error && validationErrors.length === 0 && location.state?.message && (
        <p role="status" className="mb-4 text-blue-700">{location.state.message}</p>
      )}

      {/* El form agrupa los campos; onSubmit recibe el intento de enviarlos. */}
      <form
        onSubmit={handleSubmit}
        onReset={handleReset}
        className="flex flex-col gap-4"
      >
        <div>
          {/* htmlFor coincide con el id del input para relacionar texto y campo. */}
          <label htmlFor="username" className="mb-2 block">
            Nombre de usuario
          </label>
          {/*
            value toma el texto del estado; onChange ejecuta el manejador al escribir.
            No llamamos al manejador acá: React lo ejecuta cuando ocurre el cambio.
          */}
          <input
            id="username"
            name="username"
            type="text"
            autoComplete="username"
            placeholder="Tu nombre de usuario"
            value={username}
            onChange={handleInputChange}
            required
            disabled={isLoading}
            className="w-full border p-2"
          />
        </div>

        <div>
          <label htmlFor="password" className="mb-2 block">
            Contraseña
          </label>
          {/* type="password" oculta el texto en pantalla; no cifra su contenido. */}
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            placeholder="Tu contraseña"
            value={password}
            onChange={handleInputChange}
            required
            disabled={isLoading}
            className="w-full border p-2"
          />
        </div>

        {/* Mostramos los mensajes de express-validator, no datos sensibles del formulario. */}
        {validationErrors.length > 0 && (
          <ul role="alert" className="list-inside list-disc text-red-700">
            {validationErrors.map((validationError) => (
              <li key={`${validationError.path}-${validationError.msg}`}>
                {validationError.msg}
              </li>
            ))}
          </ul>
        )}
        {error && <p role="alert" className="text-red-700">{error}</p>}
        {isLoading && <p role="status">Iniciando sesión...</p>}

        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-600 p-2 text-white disabled:opacity-50"
        >
          Iniciar sesión
        </button>
      </form>

      {/* Link cambia de página dentro de React sin recargar todo el documento. */}
      <p className="mt-4">
        ¿No tenés cuenta? <Link to="/register" className="text-blue-700 underline">Crear cuenta</Link>
      </p>
    </main>
  );
};
