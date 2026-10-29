import { Container } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import "./PiePagina.css";

function PiePagina() {
  return (
    <footer className="pie-pagina">
      <Container>
        <div className="pie-pagina-contenido">
          <div className="pie-pagina-marca">
            <Link to="/" className="pie-pagina-logo">
              Pastelería Mil Sabores
            </Link>

            <p>
              Creamos momentos dulces con tradición,
              dedicación y sabores para compartir.
            </p>
          </div>

          <nav
            className="pie-pagina-navegacion"
            aria-label="Navegación del pie de página"
          >
            <h2>EXPLORA</h2>

            <ul>
              <li><NavLink className="pie-pagina-enlace" to="/productos">Productos</NavLink></li>
              <li><NavLink className="pie-pagina-enlace" to="/nosotros">Nosotros</NavLink></li>
              <li><NavLink className="pie-pagina-enlace" to="/blogs">Blogs</NavLink></li>
              <li><NavLink className="pie-pagina-enlace" to="/contacto">Contacto</NavLink></li>
            </ul>
          </nav>

          <div className="pie-pagina-proyecto">
            <h2>PROYECTO ACADÉMICO</h2>
            <p>DSY1104 – Desarrollo Fullstack II</p>
            <p>Duoc UC · 2026</p>
          </div>
        </div>

        <div className="pie-pagina-inferior">
          <p>
            © 2026 Pastelería Mil Sabores. Todos los derechos reservados.
          </p>
        </div>
      </Container>
    </footer>
  );
}

export default PiePagina;
