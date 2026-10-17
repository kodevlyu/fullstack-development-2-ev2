// src/pages/DetalleProducto.jsx
import { useParams } from "react-router-dom";
import { cargarProductos } from "../utils/guardarProductos";
import { formatoPrecio } from "../utils/formatoPrecio";
import "./DetalleProducto.css";

export default function DetalleProducto() {
  const { codigo } = useParams();

  // Cargar productos desde localStorage
  const productos = cargarProductos();
  const producto = productos.find((p) => p.codigo === codigo);

  if (!producto) {
    return (
      <main className="detalle-producto">
        <h1>Producto no encontrado</h1>
        <p>El producto solicitado no existe o fue eliminado.</p>
      </main>
    );
  }

  return (
    <main className="detalle-producto">
      <h1>{producto.nombre}</h1>

      <p><strong>Descripción:</strong> {producto.descripcion}</p>
      <p><strong>Categoría:</strong> {producto.categoria}</p>
      <p><strong>Precio:</strong> {formatoPrecio(producto.precio)}</p>

      {/* Si tienes imagen */}
      {producto.imagen && (
        <img
          src={producto.imagen}
          alt={producto.nombre}
          className="detalle-producto-imagen"
        />
      )}
    </main>
  );
}
