import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { MemoryRouter } from "react-router-dom";
import ProductosAdmin from "../../src/pages/admin/ProductosAdmin";
import { productosMock } from "../mocks/productos";
describe("ProductosAdmin", () => {
  it("muestra productos y elimina tras confirmar", async () => {
    const nodo = document.createElement("div"); document.body.appendChild(nodo);
    const raiz = createRoot(nodo);
    let nuevos = null;
    const confirmacionAnterior = window.confirm;
    window.confirm = () => true;
    try {
      await act(async () => raiz.render(<MemoryRouter><ProductosAdmin productos={productosMock} actualizarProductos={(lista) => { nuevos = lista; }} /></MemoryRouter>));
      expect(nodo.textContent).toContain(productosMock[0].nombre);
      const boton = nodo.querySelector(`button[aria-label="Eliminar ${productosMock[0].nombre}"]`);
      await act(async () => boton.click());
      expect(nuevos.length).toBe(productosMock.length - 1);
    } finally {
      window.confirm = confirmacionAnterior;
      await act(async () => raiz.unmount());
    }
  });
});
