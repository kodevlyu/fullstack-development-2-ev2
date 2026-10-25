import { Navbar, Nav, Container } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";

// Estilos del encabezado, ubicados en la misma carpeta.
import "./Encabezado.css";

function Encabezado() {
  return (
    <Navbar
      className="encabezado"
      expand="lg"
      collapseOnSelect
      data-bs-theme="dark"
    >
      <Container>
        {/* La marca permite volver a Inicio sin recargar la aplicación. */}
        <Navbar.Brand as={Link} to="/" className="encabezado-marca">
          Pastelería Mil Sabores
        </Navbar.Brand>

        {/* Controla el menú desplegable en pantallas pequeñas. */}
        <Navbar.Toggle
          aria-controls="menu-principal"
          aria-label="Abrir o cerrar menú"
        />

        <Navbar.Collapse id="menu-principal">
          <Nav className="ms-auto">
            {/* Cada enlace utiliza una dirección definida en router.jsx. */}
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

            {/* Abre Contacto.jsx mediante la ruta /contacto. */}
            <Nav.Link as={NavLink} to="/contacto" eventKey="contacto">
              Contacto
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Encabezado;
