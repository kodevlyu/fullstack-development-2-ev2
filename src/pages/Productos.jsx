import React, { useState, useMemo } from "react";
import "./Productos.css";
import Buscador from "../components/Buscador";
import FiltroCategoria from "../components/FiltroCategoria";
import Catalogo from "../components/Catalogo";
import { filtrarProductos } from "../utils/filtrarProductos";

function Productos({ productos, agregarAlCarrito }) {
  // Conserva el estado del buscador y del filtro de categoría.
  const [texto, setTexto] = useState("");
  const [categoria, setCategoria] = useState("");

  // Calcula los productos que coinciden con los filtros actuales.
  const listaFiltrada = useMemo(
    () => filtrarProductos(productos, texto, categoria),
    [productos, texto, categoria],
  );

  return (
    <main className="pagina-productos">
      <div className="productos-contenedor">
        <div className="productos-encabezado">
          <h1>Catálogo de productos</h1>
          <p>Encuentra la torta perfecta para cada celebración.</p>
        </div>

        {/* Controles existentes del catálogo. */}
        <section className="filtros" aria-label="Filtros de productos">
          <Buscador valor={texto} onBuscar={setTexto} />
          <FiltroCategoria valor={categoria} onFiltrar={setCategoria} />
        </section>
      </div>

      {/* Entrega la lista filtrada y la función del carrito a Catalogo. */}
      <Catalogo productos={listaFiltrada} agregarAlCarrito={agregarAlCarrito} />
    </main>
  );
}

export default Productos;
