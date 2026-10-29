import {
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

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
import Registro from "./pages/Registro";
import Login from "./pages/Login";
import Perfil from "./pages/Perfil";
import Checkout from "./pages/Checkout";

// Administración de usuarios.
import UsuariosAdmin from "./pages/admin/UsuariosAdmin";
import DetalleUsuarioAdmin from "./pages/admin/DetalleUsuarioAdmin";
import NuevoUsuario from "./pages/admin/NuevoUsuario";
import EditarUsuario from "./pages/admin/EditarUsuario";

// Administración de productos.
import InicioAdmin from "./pages/admin/InicioAdmin";
import ProductosAdmin from "./pages/admin/ProductosAdmin";
import DetalleProductoAdmin from "./pages/admin/DetalleProductoAdmin";
import NuevoProducto from "./pages/admin/NuevoProducto";
import EditarProducto from "./pages/admin/EditarProducto";

// Selecciona el menú según la dirección actual.
function MenuActual({
  abrirCarrito,
  cantidadTotal,
  sesion = null,
  onCerrarSesion,
}) {
  const { pathname } = useLocation();

  const esAdministracion =
    pathname === "/admin" || pathname.startsWith("/admin/");

  if (esAdministracion) {
    return sesion?.rol === "admin" ? <MenuAdmin /> : null;
  }

  return (
    <Encabezado
      abrirCarrito={abrirCarrito}
      cantidadTotal={cantidadTotal}
      sesion={sesion}
      onCerrarSesion={onCerrarSesion}
    />
  );
}

// Exige una sesión de cliente para finalizar la compra.
function SoloCliente({ sesion, children, destino = "/checkout" }) {
  if (sesion?.rol !== "cliente") {
    return (
      <Navigate
        to="/login"
        replace
        state={{
          from: destino,
          aviso: "Inicia sesión como cliente para finalizar tu compra.",
        }}
      />
    );
  }

  return children;
}

// Protege las rutas administrativas.
function SoloAdmin({ sesion, children }) {
  if (sesion?.rol !== "admin") {
    return (
      <Navigate
        to="/login"
        replace
        state={{
          aviso: "Debes ingresar como administrador para acceder.",
        }}
      />
    );
  }

  return children;
}

function Router({
  productos,
  actualizarProductos,
  agregarAlCarrito,
  abrirCarrito,
  cantidadTotal,
  carrito,
  subtotal,
  descuento,
  total,
  codigoCupon,
  vaciarCarrito,
  sesion = null,
  onCerrarSesion,
}) {
  return (
    <div className="estructura-aplicacion">
      {/* Menú público o administrativo. */}
      <MenuActual
        abrirCarrito={abrirCarrito}
        cantidadTotal={cantidadTotal}
        sesion={sesion}
        onCerrarSesion={onCerrarSesion}
      />

      <main className="contenido-principal">
        <Routes>
          {/* Páginas públicas. */}
          <Route
            path="/"
            element={
              <Inicio
                productos={productos}
                agregarAlCarrito={agregarAlCarrito}
              />
            }
          />

          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogs/:id" element={<DetalleBlog />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/perfil"
            element={
              <SoloCliente sesion={sesion} destino="/perfil">
                <Perfil />
              </SoloCliente>
            }
          />

          {/* Catálogo de productos. */}
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
            element={
              <DetalleProducto productos={productos} />
            }
          />

          {/* Checkout: datos de entrega y resumen de compra. */}
          <Route
            path="/checkout"
            element={
              <SoloCliente sesion={sesion}>
                <Checkout
                  sesion={sesion}
                  productos={productos}
                  actualizarProductos={actualizarProductos}
                  codigoCupon={codigoCupon}
                  vaciarCarrito={vaciarCarrito}
                  carrito={carrito}
                  subtotal={subtotal}
                  descuento={descuento}
                  total={total}
                />
              </SoloCliente>
            }
          />

          {/* Inicio administrativo. */}
          <Route
            path="/admin"
            element={
              <SoloAdmin sesion={sesion}>
                <InicioAdmin />
              </SoloAdmin>
            }
          />

          {/* Administración de usuarios. */}
          <Route
            path="/admin/usuarios"
            element={
              <SoloAdmin sesion={sesion}>
                <UsuariosAdmin />
              </SoloAdmin>
            }
          />

          <Route
            path="/admin/usuario/nuevo"
            element={
              <SoloAdmin sesion={sesion}>
                <NuevoUsuario />
              </SoloAdmin>
            }
          />

          <Route
            path="/admin/usuario/:id"
            element={
              <SoloAdmin sesion={sesion}>
                <DetalleUsuarioAdmin />
              </SoloAdmin>
            }
          />

          <Route
            path="/admin/usuario/:id/editar"
            element={
              <SoloAdmin sesion={sesion}>
                <EditarUsuario />
              </SoloAdmin>
            }
          />

          {/* Administración de productos. */}
          <Route
            path="/admin/productos"
            element={
              <SoloAdmin sesion={sesion}>
                <ProductosAdmin
                  productos={productos}
                  actualizarProductos={actualizarProductos}
                />
              </SoloAdmin>
            }
          />

          <Route
            path="/admin/producto/nuevo"
            element={
              <SoloAdmin sesion={sesion}>
                <NuevoProducto
                  productos={productos}
                  actualizarProductos={actualizarProductos}
                />
              </SoloAdmin>
            }
          />

          <Route
            path="/admin/producto/:codigo"
            element={
              <SoloAdmin sesion={sesion}>
                <DetalleProductoAdmin
                  productos={productos}
                />
              </SoloAdmin>
            }
          />

          <Route
            path="/admin/producto/:codigo/editar"
            element={
              <SoloAdmin sesion={sesion}>
                <EditarProducto
                  productos={productos}
                  actualizarProductos={actualizarProductos}
                />
              </SoloAdmin>
            }
          />

          {/* Ruta no encontrada. */}
          <Route
            path="*"
            element={<NoEncontrado />}
          />
        </Routes>
      </main>

      <PiePagina />
    </div>
  );
}

export default Router;
