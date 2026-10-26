// Estas funciones serán utilizadas por hooks/useCarrito.js.
// Devuelven una lista nueva sin modificar directamente el carrito recibido.

// Agrega una unidad del producto o aumenta su cantidad si ya existe.
export function agregarProducto(carrito, producto) {
  // Los productos no disponibles no se pueden agregar.
  if (!producto.disponible) {
    return carrito;
  }

  const existe = carrito.some((item) => item.codigo === producto.codigo);

  if (existe) {
    return carrito.map((item) => {
      if (item.codigo === producto.codigo) {
        return {
          ...item,
          cantidad: item.cantidad + 1,
        };
      }

      return item;
    });
  }

  // Guarda los datos necesarios para mostrar el producto en el carrito.
  const nuevoItem = {
    codigo: producto.codigo,
    nombre: producto.nombre,
    precio: producto.precio,
    imagen: producto.imagen,
    cantidad: 1,
  };

  return [...carrito, nuevoItem];
}

// Cambia la cantidad de un producto identificado por su código.
export function cambiarCantidad(carrito, codigo, cantidad) {
  // Solo acepta números enteros mayores que cero.
  if (!Number.isInteger(cantidad) || cantidad < 1) {
    return carrito;
  }

  return carrito.map((item) => {
    if (item.codigo === codigo) {
      return {
        ...item,
        cantidad: cantidad,
      };
    }

    return item;
  });
}

// Quita del carrito el producto que coincide con el código recibido.
export function eliminarProducto(carrito, codigo) {
  return carrito.filter((item) => item.codigo !== codigo);
}

// Suma el precio multiplicado por la cantidad de cada producto.
export function calcularTotal(carrito) {
  return carrito.reduce((total, item) => {
    return total + item.precio * item.cantidad;
  }, 0);
}

// Cuenta todas las unidades para mostrarlas junto al botón del carrito.
export function contarProductos(carrito) {
  return carrito.reduce((total, item) => {
    return total + item.cantidad;
  }, 0);
}
