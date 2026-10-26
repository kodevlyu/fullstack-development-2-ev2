import { filtrarProductos } from "../../src/utils/filtrarProductos";
import { productosMock } from "../mocks/productos";
describe("filtrarProductos", () => {
  it("busca por nombre sin distinguir mayúsculas", () => {
    expect(filtrarProductos(productosMock, "CHOCOLATE", "").length).toBe(1);
  });
  it("combina categoría y texto", () => {
    const encontrados = filtrarProductos(productosMock, "limón", "pies");
    expect(encontrados.length).toBe(1);
  });
  it("devuelve vacío si no hay coincidencias", () => {
    expect(filtrarProductos(productosMock, "producto inexistente", "")).toEqual([]);
  });
  it("sin filtros devuelve todos", () => {
    expect(filtrarProductos(productosMock, "", "").length).toBe(productosMock.length);
  });
});
