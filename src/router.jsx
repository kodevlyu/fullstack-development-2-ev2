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

// Páginas administrativas existentes.
import InicioAdmin from "./pages/admin/InicioAdmin";
import ProductosAdmin from "./pages/admin/ProductosAdmin";
import DetalleProductoAdmin from "./pages/admin/DetalleProductoAdmin";
import NuevoProducto from "./pages/admin/NuevoProducto";
import EditarProducto from "./pages/admin/EditarProducto";

// El botón del carrito aparece únicamente en el menú público.
function MenuActual({ abrirCarrito, cantidadTotal }) {
  const { pathname } = useLocation();

  const esAdministracion =
    pathname === "/admin" || pathname.startsWith("/admin/");

  if (esAdministracion) {
    return <MenuAdmin />;
  }

  return (
    <Encabezado abrirCarrito={abrirCarrito} cantidadTotal={cantidadTotal} />
  );
}

function Router({ productos, agregarAlCarrito, abrirCarrito, cantidadTotal }) {
  return (
    <BrowserRouter>
      {/* Entrega al menú la función para abrir el panel de App.jsx. */}
      <MenuActual abrirCarrito={abrirCarrito} cantidadTotal={cantidadTotal} />

      <main>
        <Routes>
          {/* Páginas informativas y formulario. */}
          <Route path="/" element={<Inicio />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogs/:id" element={<DetalleBlog />} />
          <Route path="/contacto" element={<Contacto />} />

          {/* Prepara la función que conectaremos con las tarjetas. */}
          <Route
            path="/productos"
            element={
              <Productos
                productos={productos}
                agregarAlCarrito={agregarAlCarrito}
              />
            }
          />
          <Route
            path="/producto/:codigo"
            element={<DetalleProducto productos={productos} />}
          />

          {/* Conserva las páginas de administración existentes. */}
          <Route path="/admin" element={<InicioAdmin />} />
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

          {/* Direcciones que no coinciden con ninguna página. */}
          <Route path="*" element={<NoEncontrado />} />
        </Routes>
      </main>

      <PiePagina />
    </BrowserRouter>
  );
}

export default Router;
