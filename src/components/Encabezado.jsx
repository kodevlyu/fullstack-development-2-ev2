import { Navbar, Nav, Container } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import "./Encabezado.css";

function Encabezado({ abrirCarrito, cantidadTotal }) {
  return (
    <Navbar
      className="encabezado"
      expand="lg"
      collapseOnSelect
      data-bs-theme="dark"
    >
      <Container>
        {/* La marca vuelve a Inicio sin recargar la aplicación. */}
        <Navbar.Brand as={Link} to="/" className="encabezado-marca">
          Pastelería Mil Sabores
        </Navbar.Brand>

        {/* Controla el menú en pantallas pequeñas. */}
        <Navbar.Toggle
          aria-controls="menu-principal"
          aria-label="Abrir o cerrar menú"
        />

        <Navbar.Collapse id="menu-principal">
          <Nav className="ms-auto">
            {/* Enlaces conectados con las páginas de router.jsx. */}
            <Nav.Link as={NavLink} to="/" end eventKey="inicio">
              Inicio
            </Nav.Link>

            <Nav.Link as={NavLink} to="/productos" eventKey="productos">
              Productos
            </Nav.Link>

            <Nav.Link as={NavLink} to="/nosotros" eventKey="nosotros">
              Nosotros
            </Nav.Link>

            <Nav.Link as={NavLink} to="/blogs" eventKey="blogs">
              Blogs
            </Nav.Link>

            <Nav.Link as={NavLink} to="/contacto" eventKey="contacto">
              Contacto
            </Nav.Link>

          </Nav>
          {/* Botón independiente, alineado al extremo derecho como la referencia. */}
          <button
            type="button"
            className="encabezado-carrito"
            onClick={abrirCarrito}
            aria-label={`Abrir carrito: ${cantidadTotal} unidades`}
          >
            <span aria-hidden="true" className="encabezado-carrito-icono">🛒</span>
            <span>Carrito ({cantidadTotal})</span>
          </button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Encabezado;
