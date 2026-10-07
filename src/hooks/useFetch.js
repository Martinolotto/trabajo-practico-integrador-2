import { useCallback, useEffect, useState } from "react";

// Este hook consulta una URL y devuelve los tres estados que necesita Home.
// También recordamos a qué URL corresponde el resultado para no mostrar datos viejos.
export const useFetch = (url) => {
  const [result, setResult] = useState({
    url: null,
    data: null,
    isLoading: true,
    error: null,
  });

  // La función async está fuera del efecto. useCallback conserva su referencia
  // mientras la URL no cambie, evitando volver a consultar en cada render.
  const getFetch = useCallback(async (signal) => {
    let data = null;
    let error = null;

    try {
      // El navegador envía la cookie HttpOnly; React no necesita leer el JWT.
      // signal permite cancelar esta consulta al cambiar de URL o desmontar Home.
      const response = await fetch(url, {
        credentials: "include",
        signal,
      });
      const body = await response.json();

      // fetch no lanza un error por un 401/500: debemos revisar la respuesta HTTP.
      // Conservamos status para distinguir una sesión vencida de otros errores.
      if (!response.ok) {
        let message = body.message || "No se pudieron obtener los artículos.";

        if (response.status === 401) {
          message = "Necesitás iniciar sesión para ver los artículos.";
        } else if (response.status === 403) {
          message = "No tenés permisos para consultar estos artículos.";
        } else if (response.status >= 500) {
          message = "Ocurrió un error en el servidor. Intentá nuevamente más tarde.";
        }

        const requestError = new Error(message);
        requestError.status = response.status;
        throw requestError;
      }

      data = body;
    } catch (requestError) {
      // Cancelar una petición es parte de la limpieza, no un fallo para el usuario.
      // Los demás errores se muestran sin imprimir datos internos ni credenciales.
      if (!signal.aborted) {
        error = {
          status: requestError.status || null,
          message: requestError.status
            ? requestError.message
            : "No se pudo completar la consulta. Verificá la conexión y el backend.",
        };
      }
    } finally {
      // Terminamos la carga tanto en éxito como en error, pero no tras cancelar.
      // Actualizamos juntos los datos de esta URL para no mezclar respuestas.
      if (!signal.aborted) {
        setResult({ url, data, isLoading: false, error });
      }
    }
  }, [url]);

  useEffect(() => {
    const controller = new AbortController();
    getFetch(controller.signal);

    // React llama a esta limpieza antes de repetir el efecto o desmontar el componente.
    // También permite mantener StrictMode sin aceptar respuestas de consultas viejas.
    return () => controller.abort();
  }, [getFetch]);

  // Si cambió la URL, mostramos carga hasta recibir su resultado, no el anterior.
  // No hace falta disparar otra actualización de estado solo para encender la carga.
  const isCurrentResult = result.url === url;

  return {
    data: isCurrentResult ? result.data : null,
    isLoading: !isCurrentResult || result.isLoading,
    error: isCurrentResult ? result.error : null,
  };
};
