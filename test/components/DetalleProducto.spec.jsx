import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import DetalleProducto from "../../src/pages/DetalleProducto";
import { productosMock } from "../mocks/productos";
describe("DetalleProducto", () => {
  async function montar(ruta) {
    const nodo = document.createElement("div"); document.body.appendChild(nodo);
    const raiz = createRoot(nodo);
    await act(async () => raiz.render(<MemoryRouter initialEntries={[ruta]}><Routes><Route path="/producto/:codigo" element={<DetalleProducto productos={productosMock} />} /></Routes></MemoryRouter>));
    return { nodo, raiz };
  }
  it("muestra el producto por código", async () => {
    const { nodo, raiz } = await montar("/producto/P001");
    expect(nodo.textContent).toContain(productosMock[0].nombre);
    await act(async () => raiz.unmount());
  });
  it("informa cuando el producto no existe", async () => {
    const { nodo, raiz } = await montar("/producto/NOEXISTE");
    expect(nodo.textContent).toContain("Producto no encontrado");
    await act(async () => raiz.unmount());
  });
});
