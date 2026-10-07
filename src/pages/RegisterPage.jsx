import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { API_URL } from "../config/api.js";
import { useForm } from "../hooks/useForm.js";

export const RegisterPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [validationErrors, setValidationErrors] = useState([]);

  // Usamos un solo objeto y un manejador para todos los campos del formulario.
  // Sus claves coinciden con los nombres que espera el endpoint de nuestro TP1.
  const { form, handleInputChange, handleReset } = useForm({
    username: "",
    email: "",
    password: "",
    first_name: "",
    last_name: "",
  });
  const { username, email, password, first_name, last_name } = form;

  // El objeto form ya tiene los cinco nombres que necesita el registro del TP1.
  // No enviamos role ni datos de sesión: el backend crea una cuenta de usuario común.
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isLoading) return;

    setIsLoading(true);
    setError(null);
    setValidationErrors([]);

    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await response.json();

      // Los errores de formato o duplicados llegan como un arreglo con mensajes.
      // Conservamos los campos escritos para que el usuario pueda corregirlos.
      if (!response.ok) {
        if (response.status === 400 && Array.isArray(data.errors)) {
          setValidationErrors(data.errors);
          return;
        }

        const requestError = new Error(
          response.status >= 500
            ? "Ocurrió un error en el servidor. Intentá nuevamente más tarde."
            : data.message || "No se pudo crear la cuenta.",
        );
        requestError.status = response.status;
        throw requestError;
      }

      // Registrar no inicia sesión: limpiamos los campos y volvemos al login.
      // state transporta el mensaje de éxito a la pantalla de destino.
      handleReset();
      navigate("/login", {
        replace: true,
        state: { message: "Cuenta creada correctamente. Ya podés iniciar sesión." },
      });
    } catch (requestError) {
      setError(
        requestError.status
          ? requestError.message
          : "No se pudo completar el registro. Verificá la conexión y el backend.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="mx-auto max-w-sm p-4">
      <h1 className="mb-4 text-2xl font-bold">Crear cuenta</h1>

      {/* Agrupamos los cinco campos obligatorios que espera nuestro backend. */}
      <form
        onSubmit={handleSubmit}
        onReset={handleReset}
        className="flex flex-col gap-4"
      >
        <div>
          {/* El label apunta al id; name identifica el campo del formulario. */}
          <label htmlFor="register-username" className="mb-2 block">
            Nombre de usuario
          </label>
          <input
            id="register-username"
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
          <label htmlFor="register-email" className="mb-2 block">
            Correo electrónico
          </label>
          <input
            id="register-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="Tu correo electrónico"
            value={email}
            onChange={handleInputChange}
            required
            disabled={isLoading}
            className="w-full border p-2"
          />
        </div>

        <div>
          <label htmlFor="register-password" className="mb-2 block">
            Contraseña
          </label>
          {/* new-password indica al navegador que estamos creando una contraseña. */}
          <input
            id="register-password"
            name="password"
            type="password"
            autoComplete="new-password"
            placeholder="Tu contraseña"
            value={password}
            onChange={handleInputChange}
            required
            disabled={isLoading}
            className="w-full border p-2"
          />
        </div>

        <div>
          <label htmlFor="register-first-name" className="mb-2 block">
            Nombre
          </label>
          {/* name coincide con la clave del estado que el manejador debe actualizar. */}
          <input
            id="register-first-name"
            name="first_name"
            type="text"
            autoComplete="given-name"
            placeholder="Tu nombre"
            value={first_name}
            onChange={handleInputChange}
            required
            disabled={isLoading}
            className="w-full border p-2"
          />
        </div>

        <div>
          <label htmlFor="register-last-name" className="mb-2 block">
            Apellido
          </label>
          <input
            id="register-last-name"
            name="last_name"
            type="text"
            autoComplete="family-name"
            placeholder="Tu apellido"
            value={last_name}
            onChange={handleInputChange}
            required
            disabled={isLoading}
            className="w-full border p-2"
          />
        </div>

        {/* Recorremos las validaciones reales del backend con map para mostrarlas. */}
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
        {isLoading && <p role="status">Creando cuenta...</p>}

        <button
          type="submit"
          disabled={isLoading}
          className="bg-green-600 p-2 text-white disabled:opacity-50"
        >
          Registrarse
        </button>
      </form>

      <p className="mt-4">
        ¿Ya tenés cuenta? <Link to="/login" className="text-blue-700 underline">Iniciar sesión</Link>
      </p>
    </main>
  );
};
