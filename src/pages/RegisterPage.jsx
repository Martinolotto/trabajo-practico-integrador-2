import { useForm } from "../hooks/useForm.js";

export const RegisterPage = () => {
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

  // Evitamos que el navegador envíe el formulario y recargue la página.
  // El registro real se agregará después; acá no creamos ninguna cuenta.
  const handleSubmit = (event) => {
    event.preventDefault();
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
            className="w-full border p-2"
          />
        </div>

        {/* Se habilitará cuando conectemos el envío a POST /auth/register. */}
        <button
          type="submit"
          disabled
          className="bg-blue-600 p-2 text-white disabled:opacity-50"
        >
          Registrarse
        </button>
      </form>
    </main>
  );
};
