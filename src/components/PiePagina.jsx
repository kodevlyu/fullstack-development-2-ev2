import { Container } from "react-bootstrap";
import "./PiePagina.css";

function PiePagina() {
  return (
    <footer className="pie-pagina">
      <Container>
        <p className="pie-pagina-nombre">Pastelería Mil Sabores</p>

        <p className="pie-pagina-texto">
          Tradición y sabor para cada celebración.
        </p>
      </Container>
    </footer>
  );
}

export default PiePagina;
