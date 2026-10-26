import "./FiltroCategoria.css";
import { CATEGORIAS_PRODUCTO } from "../utils/validarDatosProducto";

export default function FiltroCategoria({ valor, onFiltrar }) {
  return (
    <div className="filtro-item">
      <label htmlFor="categoria-select">Categoría</label>
      <select id="categoria-select" value={valor} onChange={(e) => onFiltrar(e.target.value)}>
        <option value="">Todas</option>
        {CATEGORIAS_PRODUCTO.map((categoria) => <option key={categoria} value={categoria}>{categoria}</option>)}
      </select>
    </div>
  );
}
