import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CATEGORIAS_PRODUCTO, validarDatosProducto } from "../utils/validarDatosProducto";
import "./FormularioProducto.css";

const VACIO = {
  codigo: "", nombre: "", descripcion: "", categoria: "", precio: "", stock: "", imagen: "",
  disponible: true, personalizable: false,
};

export default function FormularioProducto({ titulo, inicial = VACIO, productos, alGuardar, esEdicion = false }) {
  const [formulario, setFormulario] = useState(() => ({ ...VACIO, ...inicial }));
  const [errores, setErrores] = useState({});
  const navigate = useNavigate();

  function cambiar(evento) {
    const { name, type, value, checked } = evento.target;
    setFormulario((anterior) => ({ ...anterior, [name]: type === "checkbox" ? checked : value }));
    setErrores((anterior) => ({ ...anterior, [name]: undefined }));
  }

  function enviar(evento) {
    evento.preventDefault();
    const resultado = validarDatosProducto(formulario, productos, esEdicion ? inicial.codigo : null);
    if (!resultado.valido) {
      setErrores(resultado.errores);
      return;
    }
    alGuardar(resultado.producto);
    navigate("/admin/productos");
  }

  const campo = (nombre, etiqueta, tipo = "text") => (
    <div className="campo-producto" key={nombre}>
      <label htmlFor={`producto-${nombre}`}>{etiqueta}</label>
      <input id={`producto-${nombre}`} name={nombre} type={tipo}
        value={formulario[nombre]} onChange={cambiar}
        readOnly={esEdicion && nombre === "codigo"}
        min={nombre === "stock" ? 0 : tipo === "number" ? 1 : undefined}
        step={tipo === "number" ? 1 : undefined}
        aria-invalid={Boolean(errores[nombre])}
        aria-describedby={errores[nombre] ? `error-${nombre}` : undefined} />
      {errores[nombre] && <small className="error-producto" id={`error-${nombre}`}>{errores[nombre]}</small>}
    </div>
  );

  return (
    <main className="formulario-producto-pagina">
      <h1>{titulo}</h1>
      <form onSubmit={enviar} noValidate>
        {campo("codigo", "Código")}
        {campo("nombre", "Nombre")}
        <div className="campo-producto">
          <label htmlFor="producto-descripcion">Descripción</label>
          <textarea id="producto-descripcion" name="descripcion" rows="3"
            value={formulario.descripcion} onChange={cambiar} aria-invalid={Boolean(errores.descripcion)} />
          {errores.descripcion && <small className="error-producto">{errores.descripcion}</small>}
        </div>
        <div className="campo-producto">
          <label htmlFor="producto-categoria">Categoría</label>
          <select id="producto-categoria" name="categoria" value={formulario.categoria} onChange={cambiar}>
            <option value="">Selecciona una categoría</option>
            {CATEGORIAS_PRODUCTO.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
          </select>
          {errores.categoria && <small className="error-producto">{errores.categoria}</small>}
        </div>
        {campo("precio", "Precio (CLP)", "number")}
        {campo("stock", "Stock (unidades)", "number")}
        {campo("imagen", "Imagen (ej.: /img/tc001.jpg)")}
        <label className="opcion-producto"><input name="disponible" type="checkbox" checked={formulario.disponible} onChange={cambiar} /> Disponible</label>
        <label className="opcion-producto"><input name="personalizable" type="checkbox" checked={formulario.personalizable} onChange={cambiar} /> Personalizable</label>
        <div className="acciones-formulario">
          <button type="submit">{esEdicion ? "Guardar cambios" : "Crear producto"}</button>
          <button type="button" onClick={() => navigate("/admin/productos")}>Cancelar</button>
        </div>
      </form>
    </main>
  );
}
