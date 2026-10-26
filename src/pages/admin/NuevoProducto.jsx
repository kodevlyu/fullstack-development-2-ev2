import FormularioProducto from "../../components/FormularioProducto";
import "./NuevoProducto.css";

export default function NuevoProducto({ productos, actualizarProductos }) {
  function crear(producto) {
    actualizarProductos([...productos, producto]);
  }
  return <FormularioProducto titulo="Nuevo producto" productos={productos} alGuardar={crear} />;
}
