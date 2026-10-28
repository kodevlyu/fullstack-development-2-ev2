import { correoValido } from "./validarUsuario";

export function validarContacto(datos, sesion = null) {
  const errores = {};

  const nombre = String(datos.nombre ?? "").trim();
  const correo = String(datos.correo ?? "").trim().toLowerCase();
  const comentario = String(datos.comentario ?? "").trim();

  const correoAdministradorInicial =
    sesion?.id === "admin-ea2-001" &&
    sesion?.correo?.toLowerCase() === "admin@pasteleria.cl" &&
    correo === "admin@pasteleria.cl";

  if (!nombre || nombre.length > 100) {
    errores.nombre = "Ingresa un nombre de hasta 100 caracteres.";
  }

  if (!correoValido(correo) && !correoAdministradorInicial) {
    errores.correo = "El correo debe pertenecer a un dominio permitido.";
  }

  if (!comentario || comentario.length > 500) {
    errores.comentario = "Ingresa un comentario de hasta 500 caracteres.";
  }

  return {
    valido: Object.keys(errores).length === 0,
    errores
  };
}
