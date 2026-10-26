import { Link, useParams } from "react-router-dom";
import { formatoPrecio } from "../../utils/formatoPrecio";
import "./DetalleProductoAdmin.css";

export default function DetalleProductoAdmin({ productos = [] }) {
  const { codigo } = useParams();
  const producto = productos.find((p) => p.codigo === codigo);
  if (!producto) return <main className="detalle-producto-admin"><h1>Producto no encontrado</h1><Link to="/admin/productos">Volver</Link></main>;
  return (
    <main className="detalle-producto-admin">
      <h1>{producto.nombre}</h1>
      {producto.imagen && <img src={producto.imagen} alt={producto.nombre} style={{maxWidth: "100%", width: 320}} />}
      <p><strong>Código:</strong> {producto.codigo}</p>
      <p><strong>Descripción:</strong> {producto.descripcion}</p>
      <p><strong>Categoría:</strong> {producto.categoria}</p>
      <p><strong>Precio:</strong> {formatoPrecio(producto.precio)}</p>
      <p><strong>Disponible:</strong> {producto.disponible ? "Sí" : "No"}</p>
      <p><strong>Personalizable:</strong> {producto.personalizable ? "Sí" : "No"}</p>
      <Link to={`/admin/producto/${codigo}/editar`}>Editar</Link>{" · "}<Link to="/admin/productos">Volver al listado</Link>
    </main>
  );
}
