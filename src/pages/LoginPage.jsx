import { useState } from "react";

export const LoginPage = () => {
  // Guardamos el texto del input en el estado, empezando con una cadena vacía.
  // setUsername le pide a React actualizar ese valor y volver a mostrar la interfaz.
  const [username, setUsername] = useState("");

  // React entrega el evento cuando escribimos en el input.
  // target es el input que cambió y value contiene el texto que ingresamos.
  const handleInputChange = (event) => {
    setUsername(event.target.value);
  };

  return (
    <main className="mx-auto max-w-sm p-4">
      <h1 className="mb-4 text-2xl font-bold">Iniciar sesión</h1>

      {/* htmlFor coincide con el id del input para relacionar el texto con el campo. */}
      <label htmlFor="username" className="mb-2 block">
        Nombre de usuario
      </label>
      {/*
        value toma el texto del estado; onChange ejecuta el manejador al escribir.
        No llamamos al manejador acá React lo ejecuta cuando ocurre el cambio.
      */}
      <input
        id="username"
        name="username"
        type="text"
        autoComplete="username"
        placeholder="Tu nombre de usuario"
        value={username}
        onChange={handleInputChange}
        className="w-full border p-2"
      />
    </main>
  );
};
