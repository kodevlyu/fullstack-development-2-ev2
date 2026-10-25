import { BrowserRouter, Routes, Route } from "react-router-dom";

// Componentes compartidos por todas las páginas.
import Encabezado from "./components/Encabezado";
import PiePagina from "./components/PiePagina";

// Páginas públicas de la tienda.
import Inicio from "./pages/Inicio";
import Nosotros from "./pages/Nosotros";
import Blogs from "./pages/Blogs";
import DetalleBlog from "./pages/DetalleBlog";
import Productos from "./pages/Productos";
import DetalleProducto from "./pages/DetalleProducto";

// Páginas de administración desarrolladas por Rimsky.
import ProductosAdmin from "./pages/admin/ProductosAdmin";
import DetalleProductoAdmin from "./pages/admin/DetalleProductoAdmin";
import NuevoProducto from "./pages/admin/NuevoProducto";
import EditarProducto from "./pages/admin/EditarProducto";

function Router({ productos }) {
  return (
    <BrowserRouter>
      {/* Menú compartido para navegar entre páginas. */}
      <Encabezado />

      <main>
        <Routes>
          {/* Páginas de bienvenida e información de la pastelería. */}
          <Route path="/" element={<Inicio />} />
          <Route path="/nosotros" element={<Nosotros />} />

          {/* Listado de artículos guardados en data/blogs.js. */}
          <Route path="/blogs" element={<Blogs />} />

          {/* DetalleBlog lee :id para elegir qué artículo mostrar. */}
          <Route path="/blogs/:id" element={<DetalleBlog />} />

          {/* Catálogo y detalle reciben la lista desde App.jsx. */}
          <Route
            path="/productos"
            element={<Productos productos={productos} />}
          />
          <Route
            path="/producto/:codigo"
            element={<DetalleProducto productos={productos} />}
          />

          {/* Se conservan las rutas de administración de productos. */}
          <Route
            path="/admin/productos"
            element={<ProductosAdmin productos={productos} />}
          />
          <Route
            path="/admin/producto/nuevo"
            element={<NuevoProducto productos={productos} />}
          />
          <Route
            path="/admin/producto/:codigo"
            element={<DetalleProductoAdmin productos={productos} />}
          />
          <Route
            path="/admin/producto/:codigo/editar"
            element={<EditarProducto productos={productos} />}
          />
        </Routes>
      </main>

      {/* Pie de página compartido por todo el sitio. */}
      <PiePagina />
    </BrowserRouter>
  );
}

export default Router;
