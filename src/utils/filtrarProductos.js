
export function filtrarProductos(lista, texto, categoria) {
  const textoNormalizado = texto.trim().toLowerCase();

  return lista.filter((p) => {
    const coincideTexto =
      textoNormalizado === "" ||
      p.nombre.toLowerCase().includes(textoNormalizado) ||
      p.descripcion.toLowerCase().includes(textoNormalizado);

    const coincideCategoria =
      !categoria || categoria === "" || p.categoria === categoria;

    return coincideTexto && coincideCategoria;
  });
}

