import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

// Menús y pie de página compartidos.
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

// Inicio administrativo y páginas de productos de Rimsky.
import InicioAdmin from "./pages/admin/InicioAdmin";
import ProductosAdmin from "./pages/admin/ProductosAdmin";
import DetalleProductoAdmin from "./pages/admin/DetalleProductoAdmin";
import NuevoProducto from "./pages/admin/NuevoProducto";
import EditarProducto from "./pages/admin/EditarProducto";

// Selecciona el menú según la dirección actual.
function MenuActual({ abrirCarrito, cantidadTotal }) {
  const { pathname } = useLocation();

  const esAdministracion =
    pathname === "/admin" || pathname.startsWith("/admin/");

  if (esAdministracion) {
    return <MenuAdmin />;
  }

  // Conserva el acceso al carrito en el menú público.
  return (
    <Encabezado abrirCarrito={abrirCarrito} cantidadTotal={cantidadTotal} />
  );
}

function Router({
  productos,
  actualizarProductos,
  agregarAlCarrito,
  abrirCarrito,
  cantidadTotal,
}) {
  return (
    <BrowserRouter>
      {/* Recibe desde App.jsx la apertura y el contador del carrito. */}
      <MenuActual abrirCarrito={abrirCarrito} cantidadTotal={cantidadTotal} />

      <main>
        <Routes>
          {/* Páginas informativas y formulario de contacto. */}
          <Route
            path="/"
            element={
              <Inicio productos={productos} agregarAlCarrito={agregarAlCarrito} />
            }
          />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogs/:id" element={<DetalleBlog />} />
          <Route path="/contacto" element={<Contacto />} />

          {/* Conserva la conexión del catálogo con el carrito. */}
          <Route
            path="/productos"
            element={
              <Productos
                productos={productos}
                agregarAlCarrito={agregarAlCarrito}
              />
            }
          />

          {/* El detalle recibe la misma lista compartida de productos. */}
          <Route
            path="/producto/:codigo"
            element={<DetalleProducto productos={productos} />}
          />

          {/* Inicio del panel administrativo. */}
          <Route path="/admin" element={<InicioAdmin />} />

          {/* Conserva las conexiones de Rimsky para actualizar productos. */}
          <Route
            path="/admin/productos"
            element={
              <ProductosAdmin
                productos={productos}
                actualizarProductos={actualizarProductos}
              />
            }
          />

          <Route
            path="/admin/producto/nuevo"
            element={
              <NuevoProducto
                productos={productos}
                actualizarProductos={actualizarProductos}
              />
            }
          />

          <Route
            path="/admin/producto/:codigo"
            element={<DetalleProductoAdmin productos={productos} />}
          />

          <Route
            path="/admin/producto/:codigo/editar"
            element={
              <EditarProducto
                productos={productos}
                actualizarProductos={actualizarProductos}
              />
            }
          />

          {/* Muestra una explicación cuando ninguna ruta coincide. */}
          <Route path="*" element={<NoEncontrado />} />
        </Routes>
      </main>

      <PiePagina />
    </BrowserRouter>
  );
}

export default Router;
