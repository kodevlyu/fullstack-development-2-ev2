import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

// Menús y pie de página.
import Encabezado from "./components/Encabezado";
import MenuAdmin from "./components/MenuAdmin";
import PiePagina from "./components/PiePagina";

// Páginas públicas.
import Inicio from "./pages/Inicio";
import Nosotros from "./pages/Nosotros";
import Blogs from "./pages/Blogs";
import DetalleBlog from "./pages/DetalleBlog";
import Contacto from "./pages/Contacto";
import NoEncontrado from "./pages/NoEncontrado";
import Productos from "./pages/Productos";
import DetalleProducto from "./pages/DetalleProducto";

// Inicio del panel y páginas de administración de productos.
import InicioAdmin from "./pages/admin/InicioAdmin";
import ProductosAdmin from "./pages/admin/ProductosAdmin";
import DetalleProductoAdmin from "./pages/admin/DetalleProductoAdmin";
import NuevoProducto from "./pages/admin/NuevoProducto";
import EditarProducto from "./pages/admin/EditarProducto";

// Selecciona el menú según la dirección actual.
function MenuActual() {
  const { pathname } = useLocation();

  // Reconoce /admin y las páginas que comienzan con /admin/.
  const esAdministracion =
    pathname === "/admin" || pathname.startsWith("/admin/");

  if (esAdministracion) {
    return <MenuAdmin />;
  }

  return <Encabezado />;
}

function Router({ productos }) {
  return (
    <BrowserRouter>
      {/* MenuActual debe estar dentro de BrowserRouter para leer la ruta. */}
      <MenuActual />

      <main>
        <Routes>
          {/* Presentación e información de la pastelería. */}
          <Route path="/" element={<Inicio />} />
          <Route path="/nosotros" element={<Nosotros />} />

          {/* Listado de artículos y detalle identificado por su id. */}
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogs/:id" element={<DetalleBlog />} />

          {/* Formulario de contacto. */}
          <Route path="/contacto" element={<Contacto />} />

          {/* Catálogo y detalle reciben la lista desde App.jsx. */}
          <Route
            path="/productos"
            element={<Productos productos={productos} />}
          />
          <Route
            path="/producto/:codigo"
            element={<DetalleProducto productos={productos} />}
          />

          {/* Inicio administrativo creado en pages/admin/InicioAdmin.jsx. */}
          <Route path="/admin" element={<InicioAdmin />} />

          {/* Se conservan las rutas de administración de Rimsky. */}
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

          {/* Direcciones que no corresponden a ninguna página. */}
          <Route path="*" element={<NoEncontrado />} />
        </Routes>
      </main>

      {/* Conserva el pie de página compartido. */}
      <PiePagina />
    </BrowserRouter>
  );
}

export default Router;
