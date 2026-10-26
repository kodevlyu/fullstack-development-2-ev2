import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { MemoryRouter } from "react-router-dom";
import TarjetaProducto from "../../src/components/TarjetaProducto";
import { productosMock } from "../mocks/productos";
describe("TarjetaProducto", () => {
  it("muestra nombre, precio y botón de detalle", async () => {
    const nodo = document.createElement("div"); document.body.appendChild(nodo);
    const raiz = createRoot(nodo);
    await act(async () => raiz.render(<MemoryRouter><TarjetaProducto producto={productosMock[0]} /></MemoryRouter>));
    expect(nodo.textContent).toContain(productosMock[0].nombre);
    expect(nodo.textContent).toContain("Ver detalle");
    await act(async () => raiz.unmount());
  });
});
