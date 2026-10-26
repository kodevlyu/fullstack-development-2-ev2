import { useState } from "react";

// Operaciones del carrito: agregar, cambiar, eliminar y calcular.
import {
  agregarProducto,
  cambiarCantidad,
  eliminarProducto,
  calcularTotal,
  contarProductos,
} from "../utils/operacionesCarrito";

// Lectura y guardado en el almacenamiento del navegador.
import { cargarCarrito, guardarCarrito } from "../utils/guardarCarrito";

function useCarrito() {
  // Recupera la lista guardada cuando se inicia el carrito.
  const [carrito, setCarrito] = useState(cargarCarrito);

  // Mensaje que Carrito.jsx muestra si no se pueden guardar los cambios.
  const [errorGuardado, setErrorGuardado] = useState("");

  // Centraliza la actualización de pantalla y el guardado.
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

  // Agrega una unidad y guarda la lista resultante.
  function agregarAlCarrito(producto) {
    const nuevoCarrito = agregarProducto(carrito, producto);
    actualizarCarrito(nuevoCarrito);
  }

  // Cambia la cantidad y guarda la lista resultante.
  function actualizarCantidad(codigo, cantidad) {
    const nuevoCarrito = cambiarCantidad(carrito, codigo, cantidad);
    actualizarCarrito(nuevoCarrito);
  }

  // Retira el producto identificado por su código.
  function quitarDelCarrito(codigo) {
    const nuevoCarrito = eliminarProducto(carrito, codigo);
    actualizarCarrito(nuevoCarrito);
  }

  // Guarda una lista vacía para que siga vacía al recargar.
  function vaciarCarrito() {
    actualizarCarrito([]);
  }

  // Valores que utilizan el panel y el contador del encabezado.
  const total = calcularTotal(carrito);
  const cantidadTotal = contarProductos(carrito);

  // App.jsx comparte estos datos y funciones con los componentes.
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
