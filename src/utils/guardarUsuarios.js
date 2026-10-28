// Persistencia SOLO de demostración EA2: no usar para contraseñas reales.
import { usuariosIniciales } from "../data/usuariosIniciales.js";

export const CLAVE_USUARIOS = "mil-sabores-usuarios-ea2";

export function cargarUsuarios(storage = globalThis.localStorage) {
  try {
    const guardado = storage.getItem(CLAVE_USUARIOS);

    if (guardado === null) {
      return usuariosIniciales.map(usuario => ({ ...usuario }));
    }

    const valor = JSON.parse(guardado);

    return Array.isArray(valor)
      ? valor.filter(
          u => u &&
          typeof u.id === "string" &&
          typeof u.correo === "string"
        )
      : [];
  } catch {
    return [];
  }
}

export function guardarUsuarios(usuarios, storage = globalThis.localStorage) {
  try {
    storage.setItem(CLAVE_USUARIOS, JSON.stringify(usuarios));
    return true;
  } catch {
    return false;
  }
}
