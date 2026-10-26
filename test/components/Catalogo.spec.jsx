import React from "react";
import { createRoot } from "react-dom/client";
import { act } from "react";
import { MemoryRouter } from "react-router-dom";
import Catalogo from "../../src/components/Catalogo";
import { productosMock } from "../mocks/productos";
describe("Catalogo", () => {
  it("muestra los productos recibidos", async () => {
    const nodo = document.createElement("div"); document.body.appendChild(nodo);
    const raiz = createRoot(nodo);
    await act(async () => raiz.render(<MemoryRouter><Catalogo productos={productosMock} /></MemoryRouter>));
    expect(nodo.textContent).toContain("Torta chocolate");
    expect(nodo.textContent).toContain("Pie de limón");
    await act(async () => raiz.unmount());
  });
});
