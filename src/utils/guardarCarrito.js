// Clave exclusiva del carrito en el almacenamiento del navegador.
// No modifica los productos guardados por la administración.
const CLAVE_CARRITO = "mil-sabores-carrito";

// Comprueba los datos necesarios para mostrar y calcular cada producto.
function esItemValido(item) {
  return (
    item !== null &&
    typeof item === "object" &&
    typeof item.codigo === "string" &&
    typeof item.nombre === "string" &&
    typeof item.imagen === "string" &&
    Number.isFinite(item.precio) &&
    item.precio >= 0 &&
    Number.isInteger(item.cantidad) &&
    item.cantidad >= 1
  );
}

// Recupera el carrito. useCarrito.js utilizará esta función al iniciar.
export function cargarCarrito() {
  try {
    const guardado = localStorage.getItem(CLAVE_CARRITO);

    // La primera visita comienza con un carrito vacío.
    if (guardado === null) {
      return [];
    }

    const carrito = JSON.parse(guardado);

    // Evita utilizar datos guardados con un formato incorrecto.
    if (!Array.isArray(carrito) || !carrito.every(esItemValido)) {
      return [];
    }

    return carrito;
  } catch (error) {
    // Permite abrir la aplicación aunque los datos no se puedan leer.
    console.error("No se pudo recuperar el carrito:", error);
    return [];
  }
}

// Guarda la lista completa después de modificar el carrito.
export function guardarCarrito(carrito) {
  try {
    if (!Array.isArray(carrito) || !carrito.every(esItemValido)) {
      return false;
    }

    // JSON convierte la lista en texto para almacenarla en el navegador.
    localStorage.setItem(CLAVE_CARRITO, JSON.stringify(carrito));
    return true;
  } catch (error) {
    // Informa a useCarrito.js si el navegador no permite guardar.
    console.error("No se pudo guardar el carrito:", error);
    return false;
  }
}