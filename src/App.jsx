import { useState } from "react";
import "./App.css";

// Mantienen las listas compartidas del catálogo y del carrito.
import useProductos from "./hooks/useProductos";
import useCarrito from "./hooks/useCarrito";

import Router from "./router";
import Carrito from "./components/Carrito";

function App() {
  // Catálogo compartido con las páginas y la administración.
  const { productos, actualizarProductos } = useProductos();

  // Entrega el catálogo al carrito para comprobar el stock actual.
  const {
    carrito,
    total,
    cantidadTotal,
    errorGuardado,
    agregarAlCarrito,
    actualizarCantidad,
    quitarDelCarrito,
    vaciarCarrito,
  } = useCarrito(productos);

  // Controla la apertura y el cierre del panel lateral.
  const [mostrarCarrito, setMostrarCarrito] = useState(false);

  function abrirCarrito() {
    setMostrarCarrito(true);
  }

  function cerrarCarrito() {
    setMostrarCarrito(false);
  }

  return (
    <>
      {/* Conecta las páginas con el catálogo y las acciones del carrito. */}
      <Router
        productos={productos}
        actualizarProductos={actualizarProductos}
        agregarAlCarrito={agregarAlCarrito}
        abrirCarrito={abrirCarrito}
        cantidadTotal={cantidadTotal}
      />

      {/* Comparte la lista y las acciones con el panel lateral. */}
      <Carrito
        productos={productos}
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
