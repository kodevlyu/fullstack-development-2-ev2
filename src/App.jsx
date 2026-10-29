
import { useState } from "react";
import { BrowserRouter, useNavigate } from "react-router-dom";
import "./App.css";

// Mantienen las listas compartidas del catálogo y del carrito.
import useProductos from "./hooks/useProductos";
import useCarrito from "./hooks/useCarrito";

import Router from "./router";
import Carrito from "./components/Carrito";
import { UsuariosProvider } from "./hooks/useUsuarios.jsx";
import { useUsuarios } from "./hooks/useUsuarios.js";

// Consulta la sesión dentro del proveedor de usuarios.
function RouterConSesion(props) {
  const { sesion, salir } = useUsuarios();

  return (
    <Router
      {...props}
      sesion={sesion}
      onCerrarSesion={salir}
    />
  );
}

function AppContenido() {
  const navegar = useNavigate();
  // Catálogo compartido con las páginas y la administración.
  const { productos, actualizarProductos } = useProductos();

  // Entrega el catálogo al carrito para comprobar el stock actual.
  const {
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
  } = useCarrito(productos);

  // Controla la apertura y el cierre del panel lateral.
  const [mostrarCarrito, setMostrarCarrito] = useState(false);

  function abrirCarrito() {
    setMostrarCarrito(true);
  }

  function cerrarCarrito() {
    setMostrarCarrito(false);
  }

  function irAlCheckout() {
    setMostrarCarrito(false);
    navegar("/checkout");
  }

  return (
    <UsuariosProvider>
      {/* Conecta las páginas con el catálogo y las acciones del carrito. */}
      <RouterConSesion
        productos={productos}
        actualizarProductos={actualizarProductos}
        agregarAlCarrito={agregarAlCarrito}
        abrirCarrito={abrirCarrito}
        cantidadTotal={cantidadTotal}
        carrito={carrito}
        subtotal={subtotal}
        descuento={descuento}
        total={total}
        codigoCupon={codigoCupon}
        vaciarCarrito={vaciarCarrito}
      />

      {/* Comparte la lista y las acciones con el panel lateral. */}
      <Carrito
        productos={productos}
        mostrar={mostrarCarrito}
        cerrar={cerrarCarrito}
        irAlCheckout={irAlCheckout}
        carrito={carrito}
        subtotal={subtotal}
        descuento={descuento}
        total={total}
        codigoCupon={codigoCupon}
        mensajeCupon={mensajeCupon}
        resultadoCupon={resultadoCupon}
        aplicarCupon={aplicarCupon}
        quitarCupon={quitarCupon}
        errorGuardado={errorGuardado}
        actualizarCantidad={actualizarCantidad}
        quitarDelCarrito={quitarDelCarrito}
        vaciarCarrito={vaciarCarrito}
      />
    </UsuariosProvider>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContenido />
    </BrowserRouter>
  );
}

export default App;
