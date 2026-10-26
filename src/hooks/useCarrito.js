import { useState } from "react";

// Operaciones que construyen la nueva lista y calculan sus totales.
import {
  agregarProducto,
  cambiarCantidad,
  eliminarProducto,
  calcularTotal,
  contarProductos,
} from "../utils/operacionesCarrito";

// Comprueban las cantidades contra el stock actual del catálogo.
import { permiteAgregar, permiteCantidad } from "../utils/stockCarrito";

// Recupera y guarda el carrito en el navegador.
import { cargarCarrito, guardarCarrito } from "../utils/guardarCarrito";

function useCarrito(productos) {
  // Recupera las compras guardadas al iniciar la aplicación.
  const [carrito, setCarrito] = useState(cargarCarrito);
  const [errorGuardado, setErrorGuardado] = useState("");

  // Actualiza la pantalla y conserva la lista en el navegador.
  function actualizarCarrito(nuevoCarrito) {
    setCarrito(nuevoCarrito);

    const guardado = guardarCarrito(nuevoCarrito);

    if (guardado) {
      setErrorGuardado("");
    } else {
      setErrorGuardado(
        "No se pudo guardar el carrito. Los cambios podrían perderse al recargar.",
      );
    }
  }

  // Consulta el catálogo recibido desde App, no un stock guardado antiguo.
  function agregarAlCarrito(producto) {
    if (!producto) {
      return;
    }

    const productoActual = productos.find(
      (elemento) => elemento.codigo === producto.codigo,
    );

    // Considera también las unidades que ya existen en el carrito.
    if (!permiteAgregar(carrito, productoActual)) {
      return;
    }

    const nuevoCarrito = agregarProducto(carrito, productoActual);
    actualizarCarrito(nuevoCarrito);
  }

  // Valida el stock antes de aceptar una nueva cantidad.
  function actualizarCantidad(codigo, cantidad) {
    const productoActual = productos.find(
      (elemento) => elemento.codigo === codigo,
    );

    if (!permiteCantidad(productoActual, cantidad)) {
      return;
    }

    const nuevoCarrito = cambiarCantidad(carrito, codigo, cantidad);
    actualizarCarrito(nuevoCarrito);
  }

  // Eliminar no requiere stock: siempre se puede retirar un producto.
  function quitarDelCarrito(codigo) {
    const nuevoCarrito = eliminarProducto(carrito, codigo);
    actualizarCarrito(nuevoCarrito);
  }

  // Conserva el carrito vacío incluso después de recargar.
  function vaciarCarrito() {
    actualizarCarrito([]);
  }

  // El panel muestra el total y el encabezado muestra las unidades.
  const total = calcularTotal(carrito);
  const cantidadTotal = contarProductos(carrito);

  return {
    carrito,
    total,
    cantidadTotal,
    errorGuardado,
    agregarAlCarrito,
    actualizarCantidad,
    quitarDelCarrito,
    vaciarCarrito,
  };
}

export default useCarrito;
