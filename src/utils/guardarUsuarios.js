const CLAVE_USUARIOS = "mil_sabores_usuarios";

// Usuario administrador por defecto para poder ingresar al panel
const USUARIO_ADMIN_DEFAULT = {
  run: "111111111",
  nombre: "Administrador",
  apellidos: "Sistema",
  correo: "admin@duoc.cl",
  contrasena: "admin123",
  direccion: "Av. Providencia 1234",
  region: "Metropolitana de Santiago",
  comuna: "Providencia",
  rol: "admin"
};


 // Obtiene la lista completa de usuarios guardada en localStorage.
 //Si no existe, inicializa la lista con el usuario admin por defecto.
 
export function obtenerUsuarios() {
  try {
    const usuariosGuardados = localStorage.getItem(CLAVE_USUARIOS);
    if (!usuariosGuardados) {
      const listaInicial = [USUARIO_ADMIN_DEFAULT];
      localStorage.setItem(CLAVE_USUARIOS, JSON.stringify(listaInicial));
      return listaInicial;
    }
    return JSON.parse(usuariosGuardados);
  } catch (e) {
    console.error("Error al leer usuarios de localStorage:", e);
    return [USUARIO_ADMIN_DEFAULT];
  }
}

//Guarda el arreglo completo de usuarios en localStorage.
 
export function guardarUsuarios(usuarios) {
  try {
    localStorage.setItem(CLAVE_USUARIOS, JSON.stringify(usuarios));
  } catch (e) {
    console.error("Error al guardar usuarios en localStorage:", e);
  }
}

//Agrega un nuevo usuario a la lista existente.
 
export function agregarUsuario(nuevoUsuario) {
  const usuarios = obtenerUsuarios();
  const usuarioConRol = {
    ...nuevoUsuario,
    rol: nuevoUsuario.rol || "cliente"
  };
  usuarios.push(usuarioConRol);
  guardarUsuarios(usuarios);
  return usuarios;
}

// Actualiza la información de un usuario según su RUN.
 
export function actualizarUsuario(runOriginal, datosActualizados) {
  const usuarios = obtenerUsuarios();
  const indice = usuarios.findIndex((u) => u.run === runOriginal);
  if (indice !== -1) {
    usuarios[indice] = { ...usuarios[indice], ...datosActualizados };
    guardarUsuarios(usuarios);
  }
  return usuarios;
}

// Elimina un usuario por su RUN.
export function eliminarUsuario(run) {
  const usuarios = obtenerUsuarios();
  const usuariosFiltrados = usuarios.filter((u) => u.run !== run);
  guardarUsuarios(usuariosFiltrados);
  return usuariosFiltrados;
}