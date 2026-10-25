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

        {/* Abre y cierra el menú en pantallas pequeñas. */}
        <Navbar.Toggle
          aria-controls="menu-principal"
          aria-label="Abrir o cerrar menú"
        />

        <Navbar.Collapse id="menu-principal">
          <Nav className="ms-auto">
            {/* Conecta con la ruta / definida en router.jsx. */}
            <Nav.Link as={NavLink} to="/" end eventKey="inicio">
              Inicio
            </Nav.Link>

            {/* Abre el catálogo de productos. */}
            <Nav.Link as={NavLink} to="/productos" eventKey="productos">
              Productos
            </Nav.Link>

            {/* Abre la página de historia, misión, visión y valores. */}
            <Nav.Link as={NavLink} to="/nosotros" eventKey="nosotros">
              Nosotros
            </Nav.Link>

            {/* Conecta /blogs con la página Blogs.jsx mediante router.jsx. */}
            <Nav.Link as={NavLink} to="/blogs" eventKey="blogs">
              Blogs
            </Nav.Link>

            {/* Pendiente de conectar cuando creemos la página Contacto. */}
            <Nav.Link href="#contacto">Contacto</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Encabezado;
