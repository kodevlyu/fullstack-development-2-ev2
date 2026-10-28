const CUPONES = {
  PASTEL10: { tipo: "porcentaje", valor: 10, minimo: 0 },
  DUOC15: { tipo: "porcentaje", valor: 15, minimo: 20000 },
  MIL5000: { tipo: "fijo", valor: 5000, minimo: 30000 },
};

export function validarCupon(codigo, subtotal) {
  const normalizado =
    typeof codigo === "string" ? codigo.trim().toUpperCase() : "";

  if (!Number.isFinite(subtotal) || subtotal <= 0) {
    return { valido: false, descuento: 0, mensaje: "El carrito está vacío o tiene un subtotal inválido." };
  }

  const cupon = Object.hasOwn(CUPONES, normalizado)
    ? CUPONES[normalizado]
    : null;

  if (!cupon) {
    return { valido: false, descuento: 0, mensaje: "Cupón no válido." };
  }

  if (subtotal < cupon.minimo) {
    return {
      valido: false,
      descuento: 0,
      mensaje: `Este cupón requiere una compra mínima de $${cupon.minimo.toLocaleString("es-CL")}.`,
    };
  }

  const descuento = cupon.tipo === "porcentaje"
    ? Math.round(subtotal * cupon.valor / 100)
    : Math.min(cupon.valor, subtotal);

  return {
    valido: true,
    codigo: normalizado,
    descuento,
    total: subtotal - descuento,
    mensaje: "Cupón aplicado correctamente.",
  };
}
