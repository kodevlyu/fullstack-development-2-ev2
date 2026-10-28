import { useState, useEffect } from "react";
import {
  obtenerUsuarios,
  agregarUsuario,
  actualizarUsuario,
  eliminarUsuario
} from "../utils/guardarUsuarios.js";

export function useUsuarios() {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    // Carga inicial de usuarios desde localStorage
    const lista = obtenerUsuarios();
    setUsuarios(lista);
  }, []);

  const crear = (nuevoUsuario) => {
    const listaActualizada = agregarUsuario(nuevoUsuario);
    setUsuarios(listaActualizada);
  };

  const editar = (runOriginal, datosActualizados) => {
    const listaActualizada = actualizarUsuario(runOriginal, datosActualizados);
    setUsuarios(listaActualizada);
  };

  const borrar = (run) => {
    const listaActualizada = eliminarUsuario(run);
    setUsuarios(listaActualizada);
  };

  return {
    usuarios,
    crearUsuario: crear,
    editarUsuario: editar,
    eliminarUsuario: borrar
  };
}