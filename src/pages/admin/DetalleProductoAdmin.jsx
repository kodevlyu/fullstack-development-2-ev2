// src/pages/admin/DetalleProductoAdmin.jsx
import { useParams, useNavigate } from "react-router-dom";
import { cargarProductos } from "../../utils/guardarProductos";
import { formatoPrecio } from "../../utils/formatoPrecio";
import "./DetalleProductoAdmin.css";

export default function DetalleProductoAdmin() {
  const { codigo } = useParams();
  const navigate = useNavigate();

  // Cargar productos desde localStorage
  const productos = cargarProductos();
  const producto = productos.find((p) => p.codigo === codigo);

  if (!producto) {
    return (
      <main className="detalle-producto-admin">
        <h1>Producto no encontrado</h1>
        <button onClick={() => navigate("/admin/productos")}>Volver</button>
      </main>
    );
  }

  return (
    <main className="detalle-producto-admin">
      <h1>{producto.nombre}</h1>

      <p><strong>Código:</strong> {producto.codigo}</p>
      <p><strong>Descripción:</strong> {producto.descripcion}</p>
      <p><strong>Categoría:</strong> {producto.categoria}</p>
      <p><strong>Precio:</strong> {formatoPrecio(producto.precio)}</p>

      <div className="acciones-admin">
        <button onClick={() => navigate(`/admin/producto/${codigo}/editar`)}>
          Editar
        </button>

        <button onClick={() => navigate("/admin/productos")}>
          Volver al listado
        </button>
      </div>
    </main>
  );
}
