# Trabajo Práctico Integrador II — Blog personal

Frontend desarrollado con React, JavaScript y Vite para consumir el backend del TP1.
Permite crear una cuenta, iniciar sesión, consultar artículos publicados y cerrar sesión.
La presentación utiliza exclusivamente clases de Tailwind CSS v4.

Autor: Martino Lotto Vera.

## Backend utilizado

[Trabajo Práctico Integrador I](https://github.com/Martinolotto/trabajo-practico-integrador-1)

El backend debe estar funcionando en `http://localhost:3000`, con su base MySQL
configurada siguiendo su propio README. Debe permitir por CORS el origen
`http://localhost:5173` y las peticiones con credenciales.

Este repositorio no incluye el backend ni las credenciales de la base de datos.

## Instalación y ejecución

Se necesita npm y una versión de Node compatible con Vite: Node 20.19.x o Node 22.12
en adelante. El entorno de desarrollo del estudiante utiliza Node 24.

Desde la carpeta del frontend:

```bash
npm ci
npm run dev
```

Abrir `http://localhost:5173`. El puerto es fijo para coincidir con el CORS del TP1;
si está ocupado, Vite informa el error en lugar de usar otro puerto automáticamente.
Mantener el backend y el frontend ejecutándose en terminales separadas.

### Variable de entorno

La URL predeterminada es `http://localhost:3000/api`. Si se necesita cambiarla, copiar
`.env.example` como `.env`, editar `VITE_API_URL` y reiniciar Vite:

```env
VITE_API_URL=http://localhost:3000/api
```

La URL incluye `/api` y no debe repetirse al construir los endpoints.
Los archivos `.env` personales están ignorados en Git; el ejemplo sí se publica.
Las variables `VITE_` son públicas: no colocar contraseñas, JWT_SECRET ni credenciales
de MySQL en este proyecto.

## Funcionamiento

- `/register`: envía `username`, `email`, `password`, `first_name` y `last_name` a
  `POST /api/auth/register`. Muestra validaciones del servidor. En éxito limpia el
  formulario y vuelve al login con un mensaje; no inicia sesión automáticamente.
- `/login`: envía usuario/contraseña a `POST /api/auth/login`. Solo ante un resultado
  exitoso guarda `isLogged` como `"true"` y navega a Home.
- `/home`: consulta `GET /api/articles` y muestra título, resumen y autor de cada
  artículo publicado. Contempla carga, error y listado vacío.
- Navbar: aparece únicamente en las rutas privadas. Incluye un Link a Home y logout
  mediante `POST /api/auth/logout`, que elimina la cookie del backend y la marca local.
- Los guards redirigen según `isLogged`; las URLs desconocidas también redirigen.

Todas las peticiones utilizan `credentials: "include"`. El JWT permanece en una
cookie HttpOnly administrada por el navegador; React no lo lee ni lo guarda.
`isLogged` controla navegación, no reemplaza la autorización del backend. Si Home
recibe un `401`, elimina la marca y regresa al login. Un `403` muestra falta de permisos.
Si logout falla por red o servidor, muestra el error y no finge haber cerrado la sesión.

## Organización y contenidos

- `src/pages`: LoginPage, RegisterPage y HomePage.
- `src/components`: Navbar y ArticleCard.
- `src/hooks/useForm.js`: objeto de campos, actualización funcional que conserva
  los demás valores y reinicio del formulario.
- `src/hooks/useFetch.js`: GET, datos/carga/error, función async fuera del efecto,
  dependencias y cancelación de peticiones pendientes.
- `src/router`: AppRouter, PrivateRoutes y PublicRoutes.
- `src/config/api.js`: URL común de la API.
- `main.jsx`: montaje con createRoot/StrictMode e import de Tailwind desde index.css.

Componentes funcionales, exports nombrados, inputs controlados, listas con `map`
y `key` basada en el id. Sin Context, axios ni librerías adicionales de formularios.

## Comprobaciones

```bash
npm run lint
npm run build
```

Para revisar el recorrido completo con el backend encendido:

1. Intentar entrar directamente a Home sin sesión: debe volver al login.
2. Registrar una cuenta nueva; probar contraseña inválida y usuario/correo duplicados.
3. Probar credenciales incorrectas: mostrar error sin abrir Home.
4. Iniciar sesión correctamente: mostrar artículos reales y conservar la sesión al recargar.
5. Con sesión activa, acceder a login/registro: volver a Home.
6. Cerrar sesión y comprobar que Home ya no sea accesible.
7. Revisar una URL inexistente y comprobar su redirección según la sesión.
8. Revisar carga, mensajes y presentación en móvil/escritorio.

Las cuentas antiguas del TP1 con contraseñas sin hash no tienen login alternativo:
crear una cuenta nueva desde el formulario. No borrar datos para probar el listado vacío.

## Ramas de trabajo

`main` contiene la entrega; `develop` integra los avances. `desarrollo-pantallas`
reúne hooks, pantallas y estilos; `proteccion-rutas` incorpora navegación y
autenticación real después de integrar la primera rama en develop.
La consigna exige al menos diez commits reales entre las dos ramas de trabajo.

## Documentación consultada

- [React](https://es.react.dev/learn)
- [React Router declarativo](https://reactrouter.com/start/declarative/installation)
- [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)
- [Tailwind CSS v4 con Vite](https://tailwindcss.com/docs/installation/using-vite)
