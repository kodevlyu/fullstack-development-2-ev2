import { useContext } from "react";
import { ContextoUsuarios } from "../context/contextoUsuarios.js";

export function useUsuarios() {
  const contexto = useContext(ContextoUsuarios);

  if (!contexto) {
    throw new Error("useUsuarios debe utilizarse dentro de ProveedorUsuarios");
  }

  return contexto;
}

export default useUsuarios;