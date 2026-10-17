// src/router.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Encabezado from "./components/Encabezado";
import Portada from "./components/Portada";
import PiePagina from "./components/PiePagina";

import Productos from "./pages/Productos";
import DetalleProducto from "./pages/DetalleProducto";

// Admin
import ProductosAdmin from "./pages/admin/ProductosAdmin";
import DetalleProductoAdmin from "./pages/admin/DetalleProductoAdmin";
import NuevoProducto from "./pages/admin/NuevoProducto";
import EditarProducto from "./pages/admin/EditarProducto";

function Router({ productos }) {
  return (
    <BrowserRouter>
      <Encabezado />

      <main>
        <Portada />

        <Routes>
          {/* Cliente */}
          <Route path="/" element={<Productos productos={productos} />} />
          <Route
            path="/producto/:codigo"
            element={<DetalleProducto productos={productos} />}
          />

          {/* Admin */}
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

      <PiePagina />
    </BrowserRouter>
  );
}

export default Router;
