// Validación del formulario de contacto (migrada desde EA1).
// Reutiliza las reglas de correo y texto de validarUsuario.js.
import { validarCorreo, validarTextoObligatorio } from "./validarUsuario";

export const LIMITE_NOMBRE_CONTACTO = 100;
export const LIMITE_COMENTARIO_CONTACTO = 500;

export function validarContacto(datos) {
  const errores = {};

  if (!validarTextoObligatorio(datos.nombre, LIMITE_NOMBRE_CONTACTO)) {
    errores.nombre = "El nombre es obligatorio y permite hasta 100 caracteres.";
  }

  if (!validarCorreo(datos.correo, 100)) {
    errores.correo = "Ingresa un correo @duoc.cl, @profesor.duoc.cl o @gmail.com.";
  }

  if (!validarTextoObligatorio(datos.comentario, LIMITE_COMENTARIO_CONTACTO)) {
    errores.comentario =
      "El comentario es obligatorio y permite hasta 500 caracteres.";
  }

  return { errores, valido: Object.keys(errores).length === 0 };
}