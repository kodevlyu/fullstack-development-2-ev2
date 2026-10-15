// src/pages/admin/EditarProducto.jsx
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { cargarProductos, guardarProductos } from "../../utils/guardarProductos";
import "./EditarProducto.css";

export default function EditarProducto() {
  const { codigo } = useParams();
  const navigate = useNavigate();
  const productos = cargarProductos();
  const original = productos.find((p) => p.codigo === codigo);

  const [form, setForm] = useState(
    original || { codigo: "", nombre: "", descripcion: "", categoria: "", precio: "" }
  );

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const actualizados = productos.map((p) =>
      p.codigo === codigo ? { ...form, precio: Number(form.precio) } : p
    );
    guardarProductos(actualizados);
    navigate("/admin/productos");
  };

  if (!original) {
    return (
      <main className="editar-producto">
        <h1>Producto no encontrado</h1>
        <button onClick={() => navigate("/admin/productos")}>Volver</button>
      </main>
    );
  }

  return (
    <main className="editar-producto">
      <h1>Editar producto</h1>
      <form onSubmit={onSubmit}>
        <input name="codigo" value={form.codigo} onChange={onChange} readOnly />
        <input name="nombre" value={form.nombre} onChange={onChange} />
        <input name="descripcion" value={form.descripcion} onChange={onChange} />
        <input name="categoria" value={form.categoria} onChange={onChange} />
        <input name="precio" value={form.precio} onChange={onChange} />

        <button type="submit">Actualizar</button>
        <button type="button" onClick={() => navigate("/admin/productos")}>
          Cancelar
        </button>
      </form>
    </main>
  );
}
