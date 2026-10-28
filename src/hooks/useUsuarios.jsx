import { useState } from "react";
import { ContextoUsuarios } from "../context/contextoUsuarios.js";
import { cargarUsuarios, guardarUsuarios } from "../utils/guardarUsuarios";
import { leerSesion, guardarSesion, cerrarSesion } from "../utils/sesion";
import { validarUsuario } from "../utils/validarUsuario";


const idNuevo = () => globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random()}`;
// IMPORTANTE: las credenciales y los roles son simulados; no constituyen seguridad real.
export function UsuariosProvider({ children }) {
  const [usuarios, setUsuarios] = useState(() => cargarUsuarios());
  const [sesion, setSesion] = useState(() => leerSesion());
  const [errorPersistencia, setErrorPersistencia] = useState("");
  function persistir(lista) {
    if (!guardarUsuarios(lista)) { setErrorPersistencia("No se pudieron guardar los usuarios en este navegador."); return false; }
    setErrorPersistencia(""); setUsuarios(lista); return true;
  }
  function crear(datos, { desdeAdmin = false } = {}) {
    const resultado = validarUsuario(datos, usuarios);
    if (!resultado.valido) return { ok: false, errores: resultado.errores };
    const usuario = { ...resultado.usuario, id: idNuevo(), clave: String(datos.clave), rol: desdeAdmin && datos.rol === "admin" ? "admin" : "cliente" };
    if (!persistir([...usuarios, usuario])) return { ok: false, mensaje: "No se pudo guardar el usuario." };
    return { ok: true, usuario };
  }
  function actualizar(id, datos) {
    const anterior = usuarios.find(u => u.id === id);
    if (!anterior) return { ok: false, mensaje: "Usuario no encontrado." };
    const resultado = validarUsuario(datos, usuarios, id, { exigirClave: false });
    if (!resultado.valido) return { ok: false, errores: resultado.errores };
    const nuevo = { ...anterior, ...resultado.usuario, clave: datos.clave ? String(datos.clave) : anterior.clave, rol: datos.rol === "admin" ? "admin" : "cliente" };
    if (!persistir(usuarios.map(u => u.id === id ? nuevo : u))) return { ok: false, mensaje: "No se pudieron guardar los cambios." };
    if (sesion?.id === id) { guardarSesion(nuevo); setSesion(({ id: sid }) => ({ id: sid, nombre: nuevo.nombre, correo: nuevo.correo, rol: nuevo.rol })); }
    return { ok: true };
  }
  function eliminar(id) {
    if (!usuarios.some(u => u.id === id)) return false;
    if (!persistir(usuarios.filter(u => u.id !== id))) return false;
    if (sesion?.id === id) salir();
    return true;
  }
  function ingresar(correo, clave) {
    const usuario = usuarios.find(u => u.correo === String(correo).trim().toLowerCase() && u.clave === String(clave));
    if (!usuario) return { ok: false, mensaje: "Correo o contraseña incorrectos." };
    if (!guardarSesion(usuario)) return { ok: false, mensaje: "No se pudo guardar la sesión." };
    setSesion({ id: usuario.id, nombre: `${usuario.nombre} ${usuario.apellidos ?? ""}`.trim(), correo: usuario.correo, rol: usuario.rol });
    return { ok: true, usuario };
  }
  function salir() { cerrarSesion(); setSesion(null); }
  return <ContextoUsuarios.Provider value={{ usuarios, sesion, errorPersistencia, crear, actualizar, eliminar, ingresar, salir }}>{children}</ContextoUsuarios.Provider>;
}
