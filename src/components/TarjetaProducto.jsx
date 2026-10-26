import { useNavigate } from "react-router-dom";
import "./TarjetaProducto.css";
import { formatoPrecio } from "../utils/formatoPrecio";
import { permiteCantidad } from "../utils/stockCarrito";

function TarjetaProducto({ producto, agregarAlCarrito }) {
  const navigate = useNavigate();

  // Datos que recibe desde Catalogo.jsx.
  const {
    codigo,
    nombre,
    categoria,
    precio,
    descripcion,
    disponible,
    imagen,
    stock,
  } = producto;

  // Comprueba si el catálogo permite solicitar al menos una unidad.
  // useCarrito.js también comprueba las unidades que ya están agregadas.
  const puedeAgregar = permiteCantidad(producto, 1);
  const stockValido = Number.isInteger(stock) && stock >= 0;

  // Explica por qué el botón está deshabilitado.
  let textoBoton = "Agregar al carrito";

  if (!stockValido) {
    textoBoton = "Stock pendiente";
  } else if (stock === 0) {
    textoBoton = "Sin stock";
  } else if (!disponible) {
    textoBoton = "No disponible";
  }

  // Conserva la conexión con la página de detalle de Rimsky.
  function verDetalle() {
    navigate(`/producto/${codigo}`);
  }

  // Envía el producto al carrito compartido mediante App.jsx.
  function agregarProducto() {
    if (puedeAgregar) {
      agregarAlCarrito(producto);
    }
  }

  return (
    <article
      className={`tarjeta-producto ${disponible ? "" : "no-disponible"}`}
    >
      {/* Imagen y descripción del producto. */}
      <img src={imagen} alt={nombre} />
      <h3>{nombre}</h3>
      <p className="categoria">{categoria}</p>
      <p className="precio">{formatoPrecio(precio)}</p>
      <p className="descripcion">{descripcion}</p>

      {!disponible && <p className="estado">No disponible</p>}

      {/* Ver detalle sigue disponible aunque el producto esté agotado. */}
      <div className="acciones">
        <button type="button" onClick={verDetalle}>
          Ver detalle
        </button>

        {/* El atributo disabled impide pulsarlo con mouse o teclado. */}
        <button
          type="button"
          onClick={agregarProducto}
          disabled={!puedeAgregar}
          aria-label={
            puedeAgregar
              ? `Agregar ${nombre} al carrito`
              : `${textoBoton}: ${nombre}`
          }
        >
          {textoBoton}
        </button>
      </div>
    </article>
  );
}

export default TarjetaProducto;
