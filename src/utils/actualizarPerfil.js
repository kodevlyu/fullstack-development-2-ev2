import { validarUsuario } from "./validarUsuario";

export function prepararActualizacionPerfil(usuario, datos, usuarios) {
  if (!usuario || !Array.isArray(usuarios)) {
    return { ok: false, mensaje: "Usuario no encontrado." };
  }

  const datosPermitidos = {
    run: usuario.run,
    nombre: datos.nombre,
    apellidos: datos.apellidos,
    correo: datos.correo,
    direccion: datos.direccion,
    region: datos.region,
    comuna: datos.comuna,
    clave: datos.clave ?? "",
    confirmacion: datos.confirmacion ?? "",
  };

  const resultado = validarUsuario(
    datosPermitidos,
    usuarios,
    usuario.id,
    { exigirClave: false }
  );

  if (!resultado.valido) {
    return { ok: false, errores: resultado.errores };
  }

  return {
    ok: true,
    usuario: {
      ...usuario,
      ...resultado.usuario,
      id: usuario.id,
      run: usuario.run,
      rol: usuario.rol,
      clave: datosPermitidos.clave
        ? datosPermitidos.clave
        : usuario.clave,
    },
  };
}
