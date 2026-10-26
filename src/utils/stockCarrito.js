// Comprueba el stock del producto recibido desde el catálogo.
// operacionesCarrito.js utilizará esta función para validar cantidades.
export function permiteCantidad(producto, cantidad) {
  // Un producto inexistente o no disponible no permite agregar unidades.
  if (!producto || !producto.disponible) {
    return false;
  }

  // Sin un stock válido no podemos asegurar que existan unidades.
  if (!Number.isInteger(producto.stock) || producto.stock < 0) {
    return false;
  }

  // Solo permite cantidades enteras, positivas y dentro del stock.
  return (
    Number.isInteger(cantidad) && cantidad >= 1 && cantidad <= producto.stock
  );
}

// Comprueba si se puede agregar una unidad más del mismo producto.
// Considera las unidades que ya están dentro del carrito.
export function permiteAgregar(carrito, producto) {
  if (!producto) {
    return false;
  }

  const item = carrito.find((elemento) => elemento.codigo === producto.codigo);

  const cantidadActual = item ? item.cantidad : 0;

  return permiteCantidad(producto, cantidadActual + 1);
}
