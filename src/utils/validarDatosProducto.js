// Validaciones propias del módulo de productos. Lucía puede reutilizarlas o
// sustituirlas por validarProducto.js cuando se integre la validación compartida.
export const CATEGORIAS_PRODUCTO = [
  "Tortas Cuadradas", "Tortas Circulares", "Postres Individuales",
  "Productos Sin Azúcar", "Pastelería Tradicional", "Productos Veganos",
  "Productos Sin Gluten", "Tortas Especiales",
];

export function validarDatosProducto(datos, productos = [], codigoOriginal = null) {
  const errores = {};
  const codigo = String(datos.codigo ?? "").trim().toUpperCase();
  const nombre = String(datos.nombre ?? "").trim();
  const categoria = String(datos.categoria ?? "").trim();
  const descripcion = String(datos.descripcion ?? "").trim();
  const imagen = String(datos.imagen ?? "").trim();
  const precioTexto = String(datos.precio ?? "").trim();
  const precio = Number(precioTexto);

  if (!codigo) errores.codigo = "Ingresa un código.";
  else if (!/^[A-Z0-9_-]+$/.test(codigo)) errores.codigo = "Usa letras, números, guion o guion bajo.";
  else if (productos.some((p) => p.codigo.toUpperCase() === codigo && p.codigo !== codigoOriginal)) {
    errores.codigo = "Este código ya existe.";
  }
  if (!nombre) errores.nombre = "Ingresa un nombre.";
  if (!descripcion) errores.descripcion = "Ingresa una descripción.";
  if (!CATEGORIAS_PRODUCTO.includes(categoria)) errores.categoria = "Selecciona una categoría válida.";
  if (!precioTexto || !Number.isFinite(precio) || precio <= 0 || !Number.isInteger(precio)) {
    errores.precio = "Ingresa un precio entero mayor que cero.";
  }
  if (imagen && !imagen.startsWith("/img/") && !/^https?:\/\//i.test(imagen)) {
    errores.imagen = "Usa una imagen de /img/ o una dirección http(s).";
  }
  return { errores, valido: Object.keys(errores).length === 0, producto: {
    codigo, nombre, descripcion, categoria, precio, imagen,
    disponible: Boolean(datos.disponible), personalizable: Boolean(datos.personalizable),
  }};
}
