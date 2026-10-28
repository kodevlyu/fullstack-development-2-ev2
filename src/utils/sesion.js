export const CLAVE_SESION = "mil-sabores-sesion-ea2";
export function leerSesion(storage = globalThis.sessionStorage) {
  try { const s = JSON.parse(storage.getItem(CLAVE_SESION) || "null"); return s && typeof s.id === "string" ? s : null; }
  catch { return null; }
}
export function guardarSesion(usuario, storage = globalThis.sessionStorage) {
  const { id, nombre, correo, rol } = usuario;
  try { storage.setItem(CLAVE_SESION, JSON.stringify({ id, nombre, correo, rol })); return true; }
  catch { return false; }
}
export function cerrarSesion(storage = globalThis.sessionStorage) { try { storage.removeItem(CLAVE_SESION); } catch { /* sin almacenamiento */ } }
