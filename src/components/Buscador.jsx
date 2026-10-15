// src/components/Buscador.jsx
import React from "react";
import "./Buscador.css";

function Buscador({ valor, onBuscar }) {
  const handleChange = (e) => {
    onBuscar(e.target.value);
  };

  return (
    <div className="filtro-item">
      <label htmlFor="buscador-input">Buscar productos</label>
      <input
        id="buscador-input"
        type="text"
        value={valor}
        onChange={handleChange}
        placeholder="Ingresa nombre o descripción..."
      />
    </div>
  );
}

export default Buscador;
