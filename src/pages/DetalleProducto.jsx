import { Link, useParams } from "react-router-dom";
import { formatoPrecio } from "../utils/formatoPrecio";
import "./DetalleProducto.css";

export default function DetalleProducto({ productos = [] }) {
  const { codigo } = useParams();
  const producto = productos.find((p) => p.codigo === codigo);
  if (!producto) return (
    <main className="detalle-producto"><div><h1>Producto no encontrado</h1>
      <p>El producto solicitado no existe o fue eliminado.</p><Link to="/productos" className="detalle-producto-volver">← Volver al catálogo</Link></div></main>
  );
  return (
    <main className="detalle-producto">
      <div>
        <h1>{producto.nombre}</h1>
        <p><strong>Código:</strong> {producto.codigo}</p>
        <p><strong>Descripción:</strong> {producto.descripcion}</p>
        <p><strong>Categoría:</strong> {producto.categoria}</p>
        <p className="precio"><strong>Precio:</strong> {formatoPrecio(producto.precio)}</p>
        <p><strong>Stock:</strong> {Number.isInteger(producto.stock) && producto.stock >= 0 ? `${producto.stock} unidades` : "Stock pendiente"}</p>
        <p className={producto.disponible ? "estado" : "no-disponible"}>
          {!producto.disponible ? "No disponible" : !Number.isInteger(producto.stock) || producto.stock < 0 ? "Stock pendiente" : producto.stock === 0 ? "Sin stock" : "Disponible"}
        </p>
        <p><strong>Personalizable:</strong> {producto.personalizable ? "Sí" : "No"}</p>
        <Link to="/productos" className="detalle-producto-volver">← Volver al catálogo</Link>
      </div>
      {producto.imagen && <img src={producto.imagen} alt={producto.nombre} className="detalle-producto-imagen" />}
    </main>
  );
}
