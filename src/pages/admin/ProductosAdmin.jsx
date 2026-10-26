import { Link } from "react-router-dom";
import { formatoPrecio } from "../../utils/formatoPrecio";
import "./ProductosAdmin.css";

export default function ProductosAdmin({ productos, actualizarProductos }) {
  function eliminar(codigo) {
    if (!window.confirm("¿Eliminar este producto del catálogo?")) return;
    actualizarProductos(productos.filter((p) => p.codigo !== codigo));
  }
  return (
    <main className="productos-admin">
      <h1>Administrar productos</h1>
      <Link className="accion-nuevo" to="/admin/producto/nuevo">Nuevo producto</Link>
      {productos.length === 0 ? <p>No hay productos registrados.</p> : (
        <div className="tabla-productos-contenedor">
          <table>
            <thead><tr><th>Código</th><th>Nombre</th><th>Categoría</th><th>Precio</th><th>Estado</th><th>Acciones</th></tr></thead>
            <tbody>{productos.map((p) => (
              <tr key={p.codigo}>
                <td>{p.codigo}</td><td>{p.nombre}</td><td>{p.categoria}</td>
                <td>{formatoPrecio(p.precio)}</td><td>{p.disponible ? "Disponible" : "No disponible"}</td>
                <td className="acciones-producto">
                  <Link to={`/admin/producto/${p.codigo}`}>Ver</Link>
                  <Link to={`/admin/producto/${p.codigo}/editar`}>Editar</Link>
                  <button type="button" onClick={() => eliminar(p.codigo)} aria-label={`Eliminar ${p.nombre}`}>Eliminar</button>
                </td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      )}
    </main>
  );
}
