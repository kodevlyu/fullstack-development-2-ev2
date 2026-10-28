import { obtenerUsuarios } from "./guardarUsuarios.js";

const CLAVE_SESION = "mil_sabores_sesion_activa";

// Obtiene los datos del usuario que tiene la sesión iniciada actualmente.
export function obtenerSesionActiva() {
  try {
    const sesion = localStorage.getItem(CLAVE_SESION);
    return sesion ? JSON.parse(sesion) : null;
  } catch (e) {
    console.error("Error al obtener la sesión activa:", e);
    return null;
  }
}

// Intenta iniciar sesión comparando correo y contraseña.
export function iniciarSesion(correo, contrasena) {
  const usuarios = obtenerUsuarios();
  const correoLimpio = String(correo || "").trim().toLowerCase();

  const usuarioEncontrado = usuarios.find(
    (u) => u.correo.toLowerCase() === correoLimpio && u.contrasena === contrasena
  );

  if (usuarioEncontrado) {
    // Guardamos la sesión omitiendo la clave por seguridad
    const { contrasena: _, ...datosSesion } = usuarioEncontrado;
    localStorage.setItem(CLAVE_SESION, JSON.stringify(datosSesion));
    return { exito: true, usuario: datosSesion };
  }

  return { exito: false, mensaje: "Correo o contraseña incorrectos." };
}

//Cierra la sesión activa borrando los datos de localStorage.
export function cerrarSesion() {
  localStorage.removeItem(CLAVE_SESION);
}

//Verifica si el usuario conectado tiene rol de administrador.
 
export function esAdministrador() {
  const usuario = obtenerSesionActiva();
  return usuario?.rol === "admin";
}