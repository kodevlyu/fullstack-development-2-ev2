import { Card, Button } from "react-bootstrap";
import "./TarjetaProducto.css";

function TarjetaProducto({ producto }) {
  return (
    <Card className="tarjeta-producto">
      <Card.Img
        variant="top"
        src={producto.imagen}
        alt={producto.nombre}
        className="tarjeta-producto-imagen"
      />
      <Button
        className="tarjeta-producto-boton"
        disabled={!producto.disponible}
      >
        Agregar al carrito
      </Button>
      <Card.Body>
        <p className="tarjeta-producto-categoria">{producto.categoria}</p>

        <Card.Title as="h3" className="tarjeta-producto-nombre">
          {producto.nombre}
        </Card.Title>

        <Card.Text>{producto.descripcion}</Card.Text>

        <p className="tarjeta-producto-precio">
          ${producto.precio.toLocaleString("es-CL")}
        </p>

        <p className="tarjeta-producto-disponibilidad">
          {producto.disponible ? "Disponible" : "No disponible"}
        </p>
      </Card.Body>
    </Card>
  );
}

export default TarjetaProducto;
