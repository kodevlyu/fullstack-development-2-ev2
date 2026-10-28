import { validarProducto } from "../../src/utils/validarProducto";
describe("validarProducto compartido", () => {
  it("reutiliza la validación de productos existente", () => {
    const r = validarProducto({ codigo: "P01", nombre: "Torta", categoria: "Tortas Especiales", descripcion: "Torta de prueba", precio: 1000, stock: 1 });
    expect(r.valido).toBe(true);
  });
});
