// Estilos generales de la aplicación.
import "./App.css";

// Maneja la lista de productos y su almacenamiento.
import useProductos from "./hooks/useProductos";

// Define las páginas y sus direcciones.
import Router from "./router";

function App() {
  // Se usa una sola vez para compartir la misma lista entre las páginas.
  const { productos, actualizarProductos } = useProductos();

  return (
    <Router
      // Lista actual que reciben el catálogo y las páginas de administración.
      productos={productos}
      // Función que Rimsky deberá pasar desde Router a sus páginas.
      actualizarProductos={actualizarProductos}
    />
  );
}

export default App;
