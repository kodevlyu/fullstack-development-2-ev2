import "./App.css";
import Encabezado from "./components/Encabezado";
import Portada from "./components/Portada";
import Catalogo from "./components/Catalogo";
import PiePagina from "./components/PiePagina";
import productos from "./data/productos";

function App() {
  return (
    <>
      <Encabezado />

      <main>
        <Portada />
        <Catalogo productos={productos} />
      </main>

      <PiePagina />
    </>
  );
}

export default App;
