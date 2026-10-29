const CLAVE_CUPON = "mil-sabores-cupon";

export function cargarCupon() {
  try {
    const codigo = localStorage.getItem(CLAVE_CUPON);
    return typeof codigo === "string" ? codigo : "";
  } catch {
    return "";
  }
}

export function guardarCupon(codigo) {
  try {
    if (typeof codigo !== "string") return false;

    if (codigo === "") {
      localStorage.removeItem(CLAVE_CUPON);
    } else {
      localStorage.setItem(CLAVE_CUPON, codigo);
    }

    return true;
  } catch {
    return false;
  }
}
