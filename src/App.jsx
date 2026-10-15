import { useState } from "react";
import "./App.css";

import productosData from "./data/productos";
import Router from "./router";

function App() {
  // Estado global del catálogo
  const [productos, setProductos] = useState(productosData);

  return (
    <>
      <Router productos={productos} />
    </>
  );
}

export default App;
