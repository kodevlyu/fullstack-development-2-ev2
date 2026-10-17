// src/pages/admin/ProductosAdmin.jsx
import { useNavigate } from "react-router-dom";
import { guardarProductos } from "../../utils/guardarProductos";
import { formatoPrecio } from "../../utils/formatoPrecio";
import "./ProductosAdmin.css";

export default function ProductosAdmin({ productos }) {
  const navigate = useNavigate();

  const irANuevo = () => navigate("/admin/producto/nuevo");
  const irADetalle = (codigo) => navigate(`/admin/producto/${codigo}`);
  const irAEditar = (codigo) => navigate(`/admin/producto/${codigo}/editar`);

  const eliminarProducto = (codigo) => {
    const confirmacion = window.confirm("¿Seguro que deseas eliminar este producto?");
    if (!confirmacion) return;

    const actualizados = productos.filter((p) => p.codigo !== codigo);
    guardarProductos(actualizados);
    navigate(0); // refresca la vista
  };

  return (
    <main className="productos-admin">
      <h1>Administrar productos</h1>
      <button onClick={irANuevo}>Nuevo producto</button>

      <table>
        <thead>
          <tr>
            <th>Código</th>
            <th>Nombre</th>
            <th>Categoría</th>
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((p) => (
            <tr key={p.codigo}>
              <td>{p.codigo}</td>
              <td>{p.nombre}</td>
              <td>{p.categoria}</td>
              <td>{formatoPrecio(p.precio)}</td>
              <td>
                <button onClick={() => irADetalle(p.codigo)}>Ver</button>
                <button onClick={() => irAEditar(p.codigo)}>Editar</button>
                <button onClick={() => eliminarProducto(p.codigo)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
