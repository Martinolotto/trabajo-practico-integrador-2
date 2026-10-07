import { useState } from "react";

// Compartimos la lógica de los campos, no sus valores entre páginas.
// Cada llamada a useForm crea su propio estado con el objeto inicial recibido.
export const useForm = (initialValues) => {
  const [form, setForm] = useState(initialValues);

  // name identifica qué propiedad cambiar; value contiene el nuevo texto.
  // Copiamos el estado anterior para no borrar los otros campos ni mutar el objeto.
  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setForm((previousForm) => ({
      ...previousForm,
      [name]: value,
    }));
  };

  // Volvemos al objeto inicial: en nuestros formularios todos los campos están vacíos.
  // El registro usará esta función después de crear correctamente la cuenta.
  const handleReset = () => {
    setForm(initialValues);
  };

  return { form, handleInputChange, handleReset };
};
