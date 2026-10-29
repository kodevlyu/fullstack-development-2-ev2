import { useState } from "react";

// Catálogo inicial: se usa cuando todavía no hay productos guardados.
import productosIniciales from "../data/productos";

// Reutiliza las funciones de almacenamiento creadas por Rimsky.
import { cargarProductos, guardarProductos } from "../utils/guardarProductos";

// Decide qué lista utilizar al iniciar la aplicación.
function obtenerProductosIniciales() {
  try {
    // "productos" es la misma clave que utiliza guardarProductos.js.
    const datosGuardados = localStorage.getItem("productos");

    // Si nunca se guardó un catálogo, utiliza los productos originales.
    if (datosGuardados === null) {
      return productosIniciales;
    }

    const productosGuardados = cargarProductos();

    // Comprueba que los datos tengan formato de lista.
    if (!Array.isArray(productosGuardados)) {
      return productosIniciales;
    }

    // Respeta una lista vacía si se eliminaron todos los productos.
    // No inventar inventario en registros antiguos: sin stock = pendiente.
    // El administrador puede asignar cantidades mediante Editar producto.
    return productosGuardados;
  } catch (error) {
    // Permite mostrar el catálogo si el navegador bloquea el almacenamiento.
    console.error("No se pudo cargar el catálogo guardado:", error);
    return productosIniciales;
  }
}

// Centraliza la lista de productos y la forma de actualizarla.
function useProductos() {
  // React ejecuta esta función al inicializar el estado.
  const [productos, setProductos] = useState(obtenerProductosIniciales);

  // Recibe la lista completa después de crear, editar o eliminar.
  function actualizarProductos(nuevaLista) {
    if (!Array.isArray(nuevaLista)) {
      console.error("Los productos deben entregarse como una lista.");
      return false;
    }

    // Actualiza lo que muestran los componentes conectados a este estado.
    // Solo actualizar React si el guardado fue exitoso.
    if (!guardarProductos(nuevaLista)) {
      return false;
    }

    setProductos(nuevaLista);
    return true;
  }

  // App.jsx podrá compartir estos valores mediante router.jsx.
  return { productos, actualizarProductos };
}

export default useProductos;
