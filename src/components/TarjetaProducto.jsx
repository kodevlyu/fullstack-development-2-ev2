import React from "react";
import { useNavigate } from "react-router-dom";
import "./TarjetaProducto.css";
import { formatoPrecio } from "../utils/formatoPrecio";

function TarjetaProducto({ producto }) {
  const navigate = useNavigate();

  const {
    codigo,
    nombre,
    categoria,
    precio,
    descripcion,
    disponible,
    imagen,
  } = producto;

  const handleVerDetalle = () => {
    navigate(`/producto/${codigo}`);
  };

  return (
    <article className={`tarjeta-producto ${disponible ? "" : "no-disponible"}`}>
      <img src={imagen} alt={nombre} />
      <h3>{nombre}</h3>
      <p className="categoria">{categoria}</p>
      <p className="precio">{formatoPrecio(precio)}</p>
      <p className="descripcion">{descripcion}</p>
      {!disponible && <p className="estado">No disponible</p>}

      <div className="acciones">
        <button type="button" onClick={handleVerDetalle}>
          Ver detalle
        </button>
      </div>
    </article>
  );
}

export default TarjetaProducto;
