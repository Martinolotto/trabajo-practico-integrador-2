// La barra pertenece a la pantalla privada, no al login ni al registro.
// Por ahora es visual: después Inicio será un Link y el botón hará el logout real.
export const Navbar = () => {
  return (
    <nav aria-label="Navegación principal" className="border-b">
      <div className="mx-auto flex max-w-3xl items-center justify-between gap-4 p-4">
        <span>Inicio</span>

        {/* No fingimos cerrar sesión: se habilitará al conectar POST /auth/logout. */}
        <button
          type="button"
          disabled
          className="border p-2 disabled:opacity-50"
        >
          Cerrar sesión
        </button>
      </div>
    </nav>
  );
};
