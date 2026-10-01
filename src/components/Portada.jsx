import { Container } from "react-bootstrap";
import "./Portada.css";

function Portada() {
  return (
    <header id="inicio" className="portada">
      <Container>
        <h1 className="portada-titulo">Pastelería Mil Sabores</h1>

        <p className="portada-descripcion">
          Tradición y sabor para cada celebración.
        </p>
      </Container>
    </header>
  );
}

export default Portada;
