// src/pages/admin/NuevoProducto.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { cargarProductos, guardarProductos } from "../../utils/guardarProductos";
import "./NuevoProducto.css";

export default function NuevoProducto() {
  const [form, setForm] = useState({
    codigo: "",
    nombre: "",
    descripcion: "",
    categoria: "",
    precio: "",
  });
  const navigate = useNavigate();

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const productos = cargarProductos();
    const nuevo = {
      ...form,
      precio: Number(form.precio),
    };
    guardarProductos([...productos, nuevo]);
    navigate("/admin/productos");
  };

  return (
    <main className="nuevo-producto">
      <h1>Nuevo producto</h1>
      <form onSubmit={onSubmit}>
        <input name="codigo" placeholder="Código" value={form.codigo} onChange={onChange} />
        <input name="nombre" placeholder="Nombre" value={form.nombre} onChange={onChange} />
        <input name="descripcion" placeholder="Descripción" value={form.descripcion} onChange={onChange} />
        <input name="categoria" placeholder="Categoría" value={form.categoria} onChange={onChange} />
        <input name="precio" placeholder="Precio" value={form.precio} onChange={onChange} />

        <button type="submit">Guardar</button>
        <button type="button" onClick={() => navigate("/admin/productos")}>
          Cancelar
        </button>
      </form>
    </main>
  );
}
