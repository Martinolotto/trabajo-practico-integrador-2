import { useForm } from "../hooks/useForm.js";

export const LoginPage = () => {
  // El hook reúne los campos y su manejador; la página conserva el formulario JSX.
  // Desestructuramos form para usar username y password directamente en los inputs.
  const { form, handleInputChange, handleReset } = useForm({
    username: "",
    password: "",
  });
  const { username, password } = form;

  // preventDefault evita el envío HTML y la recarga de la página.
  // Todavía no hacemos un fetch ni comprobamos las credenciales.
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <main className="mx-auto max-w-sm p-4">
      <h1 className="mb-4 text-2xl font-bold">Iniciar sesión</h1>

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
            className="w-full border p-2"
          />
        </div>

        {/* Deshabilitado hasta implementar el login real contra el backend. */}
        <button
          type="submit"
          disabled
          className="bg-blue-600 p-2 text-white disabled:opacity-50"
        >
          Iniciar sesión
        </button>
      </form>
    </main>
  );
};
