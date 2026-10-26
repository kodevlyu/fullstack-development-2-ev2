import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import TarjetaProducto from "./TarjetaProducto";
import "./Catalogo.css";

function Catalogo({ productos, agregarAlCarrito }) {
  // Informa cuando el catálogo o el resultado de los filtros está vacío.
  if (!productos || productos.length === 0) {
    return <p className="catalogo-vacio">No hay productos para mostrar.</p>;
  }

  return (
    <section id="productos" className="catalogo">
      <Container>
        <h2 className="catalogo-titulo">Nuestros productos</h2>

        {/* Conserva la distribución adaptable de las tarjetas. */}
        <Row className="g-4">
          {productos.map((producto) => (
            <Col key={producto.codigo} xs={12} md={6} lg={4}>
              {/* Cada tarjeta recibe el producto y la misma función. */}
              <TarjetaProducto
                producto={producto}
                agregarAlCarrito={agregarAlCarrito}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}

export default Catalogo;
