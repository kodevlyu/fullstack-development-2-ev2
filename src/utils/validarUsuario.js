import { regionesComunas } from "../data/regionesComunas";
export const DOMINIOS_PERMITIDOS = ["gmail.com", "duoc.cl", "profesor.duoc.cl"];
export function correoValido(correo) {
  const valor = String(correo ?? "").trim().toLowerCase();
  return valor.length <= 100 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor) && DOMINIOS_PERMITIDOS.some(d => valor.endsWith(`@${d}`));
}
// RUN sin puntos ni guion, con dígito verificador módulo 11.
export function runValido(run) {
  const valor = String(run ?? "").trim().toUpperCase();
  if (!/^[0-9]{6,8}[0-9K]$/.test(valor) || valor.length < 7 || valor.length > 9) return false;
  const cuerpo = valor.slice(0, -1);
  let suma = 0;
  for (let i = cuerpo.length - 1, factor = 2; i >= 0; i--, factor = factor === 7 ? 2 : factor + 1) suma += Number(cuerpo[i]) * factor;
  const resto = 11 - (suma % 11);
  const dv = resto === 11 ? "0" : resto === 10 ? "K" : String(resto);
  return valor.at(-1) === dv;
}
export function validarUsuario(datos, usuarios = [], originalId = null, { exigirClave = true } = {}) {
  const errores = {};
  const nombre = String(datos.nombre ?? "").trim();
  const apellidos = String(datos.apellidos ?? "").trim();
  const run = String(datos.run ?? "").trim().toUpperCase();
  const direccion = String(datos.direccion ?? "").trim();
  const correo = String(datos.correo ?? "").trim().toLowerCase();
  const clave = String(datos.clave ?? "");
  const confirmacion = String(datos.confirmacion ?? "");
  const region = String(datos.region ?? "");
  const comuna = String(datos.comuna ?? "");
  // La cuenta semilla es una excepción de demostración, no un dominio público permitido.
  const adminSemilla = originalId === "admin-ea2-001" && correo === "admin@pasteleria.cl";
  if (!runValido(run)) errores.run = "RUN inválido: 7 a 9 caracteres, sin puntos ni guion y con dígito verificador correcto.";
  else if (usuarios.some(u => u.run === run && u.id !== originalId)) errores.run = "El RUN ya está registrado.";
  if (!nombre || nombre.length > 50) errores.nombre = "El nombre es obligatorio y admite hasta 50 caracteres.";
  if (!apellidos || apellidos.length > 100) errores.apellidos = "Los apellidos son obligatorios y admiten hasta 100 caracteres.";
  if (!correoValido(correo) && !adminSemilla) errores.correo = "Usa un correo @gmail.com, @duoc.cl o @profesor.duoc.cl (máximo 100 caracteres).";
  else if (usuarios.some(u => u.correo?.toLowerCase() === correo && u.id !== originalId)) errores.correo = "El correo ya está registrado.";
  if ((exigirClave || clave) && !/^(?=.*[A-Za-z])(?=.*[0-9])[A-Za-z0-9]{8,10}$/.test(clave))
    errores.clave = "La contraseña debe tener entre 8 y 10 caracteres, con letras y números obligatorios.";
  if ((exigirClave || clave) && confirmacion !== clave) errores.confirmacion = "La confirmación debe coincidir con la contraseña.";
  if (!direccion || direccion.length > 300) errores.direccion = "La dirección es obligatoria y admite hasta 300 caracteres.";
  if (!regionesComunas[region]) errores.region = "Selecciona una región válida.";
  if (!regionesComunas[region]?.includes(comuna)) errores.comuna = "Selecciona una comuna de la región.";
  return { valido: Object.keys(errores).length === 0, errores, usuario: { run, nombre, apellidos, direccion, correo, region, comuna } };
}
