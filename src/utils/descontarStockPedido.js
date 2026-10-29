export function descontarStockPedido(productos, items) {
  if (!Array.isArray(productos) ||
      !Array.isArray(items) ||
      items.length === 0) {
    return null;
  }

  const cantidades = new Map();

  for (const item of items) {
    if (!item ||
        typeof item.codigo !== "string" ||
        !Number.isSafeInteger(item.cantidad) ||
        item.cantidad <= 0) {
      return null;
    }

    cantidades.set(
      item.codigo,
      (cantidades.get(item.codigo) ?? 0) + item.cantidad
    );
  }

  const catalogo = new Map(productos.map(
    (producto) => [producto.codigo, producto]
  ));

  for (const [codigo, cantidad] of cantidades) {
    const producto = catalogo.get(codigo);

    if (!producto ||
        producto.disponible === false ||
        !Number.isSafeInteger(producto.stock) ||
        producto.stock < cantidad) {
      return null;
    }
  }

  return productos.map((producto) => {
    const cantidad = cantidades.get(producto.codigo) ?? 0;

    if (cantidad === 0) return producto;

    return {
      ...producto,
      stock: producto.stock - cantidad,
    };
  });
}
