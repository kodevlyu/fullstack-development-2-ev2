import { Container, Row, Col } from "react-bootstrap";
import TarjetaProducto from "./TarjetaProducto";
import "./Catalogo.css";

function Catalogo({ productos }) {
  return (
    <section id="productos" className="catalogo">
      <Container>
        <h2 className="catalogo-titulo">Nuestros productos</h2>

        <Row className="g-4">
          {productos.map((producto) => (
            <Col key={producto.codigo} xs={12} md={6} lg={4}>
              <TarjetaProducto producto={producto} />
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}

export default Catalogo;
