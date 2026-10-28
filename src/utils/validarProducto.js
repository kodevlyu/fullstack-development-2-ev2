/**
 * Valida los datos de un producto antes de crearlo o actualizarlo.
 * 
 * @param {Object} producto - Objeto del producto a validar.
 * @returns {Object} Objeto con 'errores', 'valido' y 'esValido'.
 */
export function validarProducto(producto = {}) {
  const errores = {};

  const nombre = String(producto.nombre ?? "").trim();
  const precioNum = Number(producto.precio);
  const stockNum = Number(producto.stock);
  const categoria = String(producto.categoria ?? "").trim();
  const descripcion = String(producto.descripcion ?? "").trim();

  // Nombre
  if (!nombre) {
    errores.nombre = "El nombre del producto es obligatorio.";
  } else if (nombre.length < 3) {
    errores.nombre = "El nombre debe tener al menos 3 caracteres.";
  } else if (nombre.length > 100) {
    errores.nombre = "El nombre no puede superar los 100 caracteres.";
  }

  // Precio
  if (producto.precio === undefined || producto.precio === null || producto.precio === "") {
    errores.precio = "El precio es obligatorio.";
  } else if (isNaN(precioNum) || precioNum <= 0) {
    errores.precio = "El precio debe ser un número mayor a 0.";
  }

  // Stock
  if (producto.stock === undefined || producto.stock === null || producto.stock === "") {
    errores.stock = "El stock es obligatorio.";
  } else if (isNaN(stockNum) || stockNum < 0 || !Number.isInteger(stockNum)) {
    errores.stock = "El stock debe ser un número entero mayor o igual a 0.";
  }

  // Categoría
  if (!categoria) {
    errores.categoria = "Debe seleccionar una categoría.";
  }

  // Descripción
  if (descripcion && descripcion.length > 500) {
    errores.descripcion = "La descripción no puede superar los 500 caracteres.";
  }

  const esValido = Object.keys(errores).length === 0;

  return {
    errores,
    valido: esValido,
    esValido: esValido
  };
}