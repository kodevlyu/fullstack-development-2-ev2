import { Link } from "react-router-dom";

// Estilos exclusivos de esta página.
import "./NoEncontrado.css";

function NoEncontrado() {
  return (
    <section className="no-encontrado" aria-labelledby="titulo-no-encontrado">
      {/* El código 404 identifica una página que no existe. */}
      <p className="no-encontrado-codigo">404</p>

      <h1 id="titulo-no-encontrado">Página no encontrada</h1>

      <p className="no-encontrado-descripcion">
        La dirección que buscas no existe o pudo haber cambiado. Puedes volver
        al inicio o explorar nuestros productos.
      </p>

      {/* Usa las rutas existentes de router.jsx para seguir navegando. */}
      <div className="no-encontrado-acciones">
        <Link to="/" className="no-encontrado-boton">
          Volver al inicio
        </Link>

        <Link
          to="/productos"
          className="no-encontrado-boton no-encontrado-boton-secundario"
        >
          Ver productos
        </Link>
      </div>
    </section>
  );
}

export default NoEncontrado;
