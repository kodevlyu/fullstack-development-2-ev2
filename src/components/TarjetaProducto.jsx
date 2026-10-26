import React from "react";
import { useNavigate } from "react-router-dom";
import "./TarjetaProducto.css";
import { formatoPrecio } from "../utils/formatoPrecio";

function TarjetaProducto({ producto, agregarAlCarrito }) {
  const navigate = useNavigate();

  // Datos del producto que muestra esta tarjeta.
  const { codigo, nombre, categoria, precio, descripcion, disponible, imagen } =
    producto;

  // Conserva la navegación existente hacia el detalle.
  const handleVerDetalle = () => {
    navigate(`/producto/${codigo}`);
  };

  return (
    <article
      className={`tarjeta-producto ${disponible ? "" : "no-disponible"}`}
    >
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

        {/* Llama al carrito compartido de App con este producto. */}
        <button
          type="button"
          onClick={() => agregarAlCarrito(producto)}
          disabled={!disponible}
          aria-label={`Agregar ${nombre} al carrito`}
        >
          Agregar al carrito
        </button>
      </div>
    </article>
  );
}

export default TarjetaProducto;
