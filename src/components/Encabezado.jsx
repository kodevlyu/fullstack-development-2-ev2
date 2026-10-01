import { Navbar, Nav, Container } from "react-bootstrap";
import "./Encabezado.css";

function Encabezado() {
  return (
    <Navbar className="encabezado" expand="lg" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="/" className="encabezado-marca">
          Pastelería Mil Sabores
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="menu-principal" />

        <Navbar.Collapse id="menu-principal">
          <Nav className="ms-auto">
            <Nav.Link href="#inicio">Inicio</Nav.Link>
            <Nav.Link href="#productos">Productos</Nav.Link>
            <Nav.Link href="#nosotros">Nosotros</Nav.Link>
            <Nav.Link href="#blogs">Blogs</Nav.Link>
            <Nav.Link href="#contacto">Contacto</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Encabezado;
