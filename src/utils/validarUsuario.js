import { comunaPerteneceARegion } from "./regionesComunas.js";

export const DOMINIOS_CORREO_PERMITIDOS = [
  "duoc.cl",
  "profesor.duoc.cl",
  "gmail.com",
];

export function validarRun(run) {
  if (typeof run !== "string") return false;

  const limpio = run.trim().toUpperCase();

  if (!/^[0-9]+[0-9K]$/.test(limpio)) return false;
  if (limpio.length < 7 || limpio.length > 9) return false;

  const cuerpo = limpio.slice(0, -1);
  const dv = limpio.slice(-1);

  let suma = 0;
  let multiplo = 2;
  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma += parseInt(cuerpo[i], 10) * multiplo;
    multiplo = multiplo === 7 ? 2 : multiplo + 1;
  }

  const resto = 11 - (suma % 11);
  let dvEsperado;
  if (resto === 11) dvEsperado = "0";
  else if (resto === 10) dvEsperado = "K";
  else dvEsperado = String(resto);

  return dv === dvEsperado;
}

export function validarCorreo(correo, largoMaximo = 100) {
  if (typeof correo !== "string") return false;

  const limpio = correo.trim();
  if (!limpio || limpio.length > largoMaximo) return false;

  const dominios = DOMINIOS_CORREO_PERMITIDOS.map((d) =>
    d.replaceAll(".", "\\."),
  ).join("|");

  return new RegExp(`^[^\\s@]+@(${dominios})$`, "i").test(limpio);
}

export function validarTextoObligatorio(texto, largoMaximo) {
  if (typeof texto !== "string") return false;
  const limpio = texto.trim();
  return limpio.length > 0 && limpio.length <= largoMaximo;
}

export function validarContrasena(clave) {
  if (typeof clave !== "string") return false;
  return clave.length >= 4 && clave.length <= 10;
}

export function validarUsuario(
  datos,
  usuarios = [],
  runOriginal = null,
  { exigirContrasena = true } = {},
) {
  const errores = {};

  const run = String(datos.run ?? "").trim().toUpperCase();
  const nombre = String(datos.nombre ?? "").trim();
  const apellidos = String(datos.apellidos ?? "").trim();
  const correo = String(datos.correo ?? "").trim().toLowerCase();
  const contrasena = String(datos.contrasena ?? "");
  const confirmacion = String(datos.confirmarContrasena ?? "");
  const direccion = String(datos.direccion ?? "").trim();
  const region = String(datos.region ?? "").trim();
  const comuna = String(datos.comuna ?? "").trim();

  if (!run) {
    errores.run = "El RUN es obligatorio.";
  } else if (!validarRun(run)) {
    errores.run =
      "RUN inválido. Ingresa entre 7 y 9 caracteres, sin puntos ni guion (ej: 187654327).";
  } else if (usuarios.some((u) => u.run === run && u.run !== runOriginal)) {
    errores.run = "Ya existe una cuenta registrada con este RUN.";
  }

  if (!validarTextoObligatorio(nombre, 50)) {
    errores.nombre = "El nombre es obligatorio (máximo 50 caracteres).";
  }
  if (!validarTextoObligatorio(apellidos, 100)) {
    errores.apellidos = "Los apellidos son obligatorios (máximo 100 caracteres).";
  }

  if (!validarCorreo(correo, 100)) {
    errores.correo =
      "Correo inválido. Debe ser @duoc.cl, @profesor.duoc.cl o @gmail.com (máximo 100 caracteres).";
  } else if (
    usuarios.some((u) => u.correo === correo && u.run !== runOriginal)
  ) {
    errores.correo = "Ya existe una cuenta registrada con este correo.";
  }

  const hayContrasena = contrasena !== "" || exigirContrasena;
  if (hayContrasena) {
    if (!validarContrasena(contrasena)) {
      errores.contrasena = "La contraseña debe tener entre 4 y 10 caracteres.";
    }
    if (!confirmacion) {
      errores.confirmarContrasena = "Debes confirmar la contraseña.";
    } else if (contrasena !== confirmacion) {
      errores.confirmarContrasena = "Las contraseñas no coinciden.";
    }
  }

  if (!validarTextoObligatorio(direccion, 300)) {
    errores.direccion = "La dirección es obligatoria (máximo 300 caracteres).";
  }
  if (!region) {
    errores.region = "Selecciona una región.";
  }
  if (!comuna) {
    errores.comuna = "Selecciona una comuna.";
  } else if (region && !comunaPerteneceARegion(region, comuna)) {
    errores.comuna = "La comuna no pertenece a la región seleccionada.";
  }

  const esValido = Object.keys(errores).length === 0;

  return {
    errores,
    valido: esValido,
    esValido: esValido,
    usuario: { run, nombre, apellidos, correo, contrasena, direccion, region, comuna },
  };
}

export function validarLogin(datos) {
  const errores = {};
  const correo = String(datos.correo ?? "").trim();
  const contrasena = String(datos.contrasena ?? "");

  if (!validarCorreo(correo, 100)) {
    errores.correo =
      "Correo inválido. Debe ser @duoc.cl, @profesor.duoc.cl o @gmail.com (máximo 100 caracteres).";
  }
  if (!contrasena) {
    errores.contrasena = "Debes ingresar tu contraseña.";
  }

  const esValido = Object.keys(errores).length === 0;

  return { 
    errores, 
    valido: esValido,
    esValido: esValido 
  };
}