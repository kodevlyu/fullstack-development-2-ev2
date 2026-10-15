// src/components/FiltroCategoria.jsx
import React from "react";
import "./FiltroCategoria.css";

const CATEGORIAS = [
  "Tortas Cuadradas",
  "Tortas Circulares",
  "Postres Individuales",
  "Productos Sin Azúcar",
  "Pastelería Tradicional",
  "Productos Veganos",
  "Productos Sin Gluten",
  "Tortas Especiales",
];

function FiltroCategoria({ valor, onFiltrar }) {
  const handleChange = (e) => {
    onFiltrar(e.target.value);
  };

  return (
    <div className="filtro-item">
      <label htmlFor="categoria-select">Categoría</label>
      <select
        id="categoria-select"
        value={valor}
        onChange={handleChange}
      >
        <option value="">Todas</option>
        {CATEGORIAS.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    </div>
  );
}

export default FiltroCategoria;
