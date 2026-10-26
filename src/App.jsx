import { useState } from "react";
import "./App.css";

// Cada hook mantiene una única lista compartida en la aplicación.
import useProductos from "./hooks/useProductos";
import useCarrito from "./hooks/useCarrito";

import Router from "./router";
import Carrito from "./components/Carrito";

function App() {
  const { productos, actualizarProductos } = useProductos();

  // Datos y operaciones que reciben el panel y el catálogo.
  const {
    carrito,
    total,
    cantidadTotal,
    errorGuardado,
    agregarAlCarrito,
    actualizarCantidad,
    quitarDelCarrito,
    vaciarCarrito,
  } = useCarrito();

  // Controla únicamente si el panel lateral está visible.
  const [mostrarCarrito, setMostrarCarrito] = useState(false);

  function abrirCarrito() {
    setMostrarCarrito(true);
  }

  function cerrarCarrito() {
    setMostrarCarrito(false);
  }

  return (
    <>
      {/* Router comunica las páginas con los datos de App. */}
      <Router
        productos={productos}
        actualizarProductos={actualizarProductos}
        agregarAlCarrito={agregarAlCarrito}
        abrirCarrito={abrirCarrito}
        cantidadTotal={cantidadTotal}
      />

      {/* El panel utiliza la misma lista que maneja useCarrito. */}
      <Carrito
        mostrar={mostrarCarrito}
        cerrar={cerrarCarrito}
        carrito={carrito}
        total={total}
        errorGuardado={errorGuardado}
        actualizarCantidad={actualizarCantidad}
        quitarDelCarrito={quitarDelCarrito}
        vaciarCarrito={vaciarCarrito}
      />
    </>
  );
}

export default App;
