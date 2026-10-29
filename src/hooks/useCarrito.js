
import { useState } from "react";

import {
  agregarProducto,
  cambiarCantidad,
  eliminarProducto,
  calcularTotal,
  contarProductos,
} from "../utils/operacionesCarrito";

import { permiteAgregar, permiteCantidad } from "../utils/stockCarrito";
import { cargarCarrito, guardarCarrito } from "../utils/guardarCarrito";
import { validarCupon } from "../utils/validarCupon";
import { cargarCupon, guardarCupon } from "../utils/guardarCupon";

function useCarrito(productos) {
  const [carrito, setCarrito] = useState(cargarCarrito);
  const [errorGuardado, setErrorGuardado] = useState("");
  const [codigoCupon, setCodigoCupon] = useState(cargarCupon);
  const [mensajeCupon, setMensajeCupon] = useState("");

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

  function agregarAlCarrito(producto) {
    if (!producto) return;

    const productoActual = productos.find(
      (elemento) => elemento.codigo === producto.codigo,
    );

    if (!permiteAgregar(carrito, productoActual)) return;

    actualizarCarrito(agregarProducto(carrito, productoActual));
  }

  function actualizarCantidad(codigo, cantidad) {
    const productoActual = productos.find(
      (elemento) => elemento.codigo === codigo,
    );

    if (!permiteCantidad(productoActual, cantidad)) return;

    actualizarCarrito(cambiarCantidad(carrito, codigo, cantidad));
  }

  function quitarDelCarrito(codigo) {
    const nuevoCarrito = eliminarProducto(carrito, codigo);
    actualizarCarrito(nuevoCarrito);

    if (nuevoCarrito.length === 0) {
      setCodigoCupon("");
      guardarCupon("");
      setMensajeCupon("");
    }
  }

  function vaciarCarrito() {
    actualizarCarrito([]);
    setCodigoCupon("");
    guardarCupon("");
    setMensajeCupon("");
  }

  const subtotal = calcularTotal(carrito);
  const cantidadTotal = contarProductos(carrito);

  // Revalida el cupón cada vez que cambia el subtotal.
  const resultadoCupon = codigoCupon
    ? validarCupon(codigoCupon, subtotal)
    : null;

  const descuento = resultadoCupon?.valido
    ? resultadoCupon.descuento
    : 0;

  const total = Math.max(0, subtotal - descuento);

  function aplicarCupon(codigo) {
    const resultado = validarCupon(codigo, subtotal);

    if (!resultado.valido) {
      setMensajeCupon(resultado.mensaje);
      return false;
    }

    setCodigoCupon(resultado.codigo);
    guardarCupon(resultado.codigo);
    setMensajeCupon(resultado.mensaje);
    return true;
  }

  function quitarCupon() {
    setCodigoCupon("");
    guardarCupon("");
    setMensajeCupon("");
  }

  return {
    carrito,
    subtotal,
    descuento,
    total,
    cantidadTotal,
    errorGuardado,
    codigoCupon,
    mensajeCupon,
    resultadoCupon,
    aplicarCupon,
    quitarCupon,
    agregarAlCarrito,
    actualizarCantidad,
    quitarDelCarrito,
    vaciarCarrito,
  };
}

export default useCarrito;
