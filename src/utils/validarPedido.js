import { permiteCantidad } from "./stockCarrito";
import { validarCupon } from "./validarCupon";

export function validarPedido(carrito, productos, codigoCupon = "") {
  if (!Array.isArray(carrito) || carrito.length === 0) {
    return { valido: false, mensaje: "El carrito está vacío." };
  }

  if (!Array.isArray(productos)) {
    return { valido: false, mensaje: "No se pudo consultar el catálogo." };
  }

  const codigos = new Set();
  const items = [];

  for (const item of carrito) {
    if (!item || typeof item.codigo !== "string" || codigos.has(item.codigo)) {
      return { valido: false, mensaje: "El carrito contiene productos inválidos." };
    }

    codigos.add(item.codigo);

    const producto = productos.find(
      (actual) => actual.codigo === item.codigo
    );

    if (!producto || !permiteCantidad(producto, item.cantidad)) {
      return {
        valido: false,
        mensaje: `Producto sin disponibilidad suficiente: ${item.nombre ?? item.codigo}.`,
      };
    }

    if (!Number.isFinite(producto.precio) || producto.precio < 0) {
      return {
        valido: false,
        mensaje: `Precio inválido para el producto ${item.codigo}.`,
      };
    }

    items.push({
      codigo: producto.codigo,
      nombre: producto.nombre,
      precio: producto.precio,
      cantidad: item.cantidad,
    });
  }

  const subtotal = items.reduce(
    (suma, item) => suma + item.precio * item.cantidad,
    0
  );

  const cupon = codigoCupon
    ? validarCupon(codigoCupon, subtotal)
    : null;

  const descuento = cupon?.valido ? cupon.descuento : 0;

  return {
    valido: true,
    items,
    subtotal,
    descuento,
    total: Math.max(0, subtotal - descuento),
    codigoCupon: cupon?.valido ? cupon.codigo : "",
    mensaje: cupon && !cupon.valido
      ? "El cupón ya no cumple las condiciones de compra."
      : "",
  };
}
