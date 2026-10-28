import { Navbar, Nav, Container } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";

// Estilos exclusivos del menú administrativo.
import "./MenuAdmin.css";

function MenuAdmin() {
  return (
    <Navbar
      className="menu-admin"
      expand="lg"
      collapseOnSelect
      data-bs-theme="dark"
      aria-label="Navegación del administrador"
    >
      <Container>
        {/* La marca regresa al inicio del panel administrativo. */}
        <Navbar.Brand as={Link} to="/admin" className="menu-admin-marca">
          Mil Sabores · Administración
        </Navbar.Brand>

        {/* Permite abrir y cerrar el menú en pantallas pequeñas. */}
        <Navbar.Toggle
          aria-controls="menu-administracion"
          aria-label="Abrir o cerrar menú de administración"
        />

        <Navbar.Collapse id="menu-administracion">
          <Nav className="ms-auto">
            {/* end evita marcar Inicio al visitar otras rutas de admin. */}
            <Nav.Link as={NavLink} to="/admin" end eventKey="inicio-admin">
              Inicio administrador
            </Nav.Link>

            {/* Conecta con el listado de productos de Rimsky. */}
            <Nav.Link
              as={NavLink}
              to="/admin/productos"
              eventKey="productos-admin"
            >
              Productos
            </Nav.Link>

            {/* Se habilitará al integrar la página de usuarios de Lucía. */}
            <Nav.Link as={NavLink} to="/admin/usuarios" eventKey="usuarios-admin">Usuarios</Nav.Link>

            {/* Regresa al sitio público mediante la ruta de Inicio. */}
            <Nav.Link as={Link} to="/" eventKey="tienda">
              Volver a la tienda
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MenuAdmin;
