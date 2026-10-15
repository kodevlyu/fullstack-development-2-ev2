
// src/utils/formatoPrecio.js
export function formatoPrecio(valor) {
  if (typeof valor !== "number") {
    return "$0";
  }

  return `$${valor.toLocaleString("es-CL")}`;
}
