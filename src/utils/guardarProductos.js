const CLAVE = "productos";

export function guardarProductos(productos) {
  try {
    localStorage.setItem(CLAVE, JSON.stringify(productos));
  } catch (e) {
    console.error("Error al guardar productos en localStorage", e);
  }
}

export function cargarProductos() {
  try {
    const data = localStorage.getItem(CLAVE);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error("Error al cargar productos desde localStorage", e);
    return [];
  }
}
