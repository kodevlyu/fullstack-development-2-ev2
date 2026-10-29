const CLAVE_PEDIDOS = "mil-sabores-pedidos";

export function guardarPedido(pedido) {
  try {
    const contenido = localStorage.getItem(CLAVE_PEDIDOS);
    const pedidos = contenido === null ? [] : JSON.parse(contenido);

    if (!Array.isArray(pedidos)) {
      return false;
    }

    localStorage.setItem(
      CLAVE_PEDIDOS,
      JSON.stringify([...pedidos, pedido])
    );

    return true;
  } catch {
    return false;
  }
}
