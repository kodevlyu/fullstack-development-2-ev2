import React, { useState, useMemo } from "react";
import "./Productos.css";
import Buscador from "../components/Buscador";
import FiltroCategoria from "../components/FiltroCategoria";
import Catalogo from "../components/Catalogo";
import { filtrarProductos } from "../utils/filtrarProductos";

function Productos({ productos }) {
  const [texto, setTexto] = useState("");
  const [categoria, setCategoria] = useState("");

  const listaFiltrada = useMemo(
    () => filtrarProductos(productos, texto, categoria),
    [productos, texto, categoria]
  );

  return (
    <main className="pagina-productos">
      <h1>Catálogo de productos</h1>

      <section className="filtros">
        <Buscador valor={texto} onBuscar={setTexto} />
        <FiltroCategoria valor={categoria} onFiltrar={setCategoria} />
      </section>

      <Catalogo productos={listaFiltrada} />
    </main>
  );
}

export default Productos;
