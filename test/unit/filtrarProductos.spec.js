import { filtrarProductos } from "../../src/utils/filtrarProductos";
import { productosMock } from "../mocks/productos";

describe("filtrarProductos", () => {
  it("filtra por texto en nombre", () => {
    const resultado = filtrarProductos(productosMock, "chocolate", "");
    expect(resultado).toHaveLength(1);
    expect(resultado[0].nombre).toMatch(/chocolate/i);
  });

  it("filtra por categoría", () => {
    const resultado = filtrarProductos(productosMock, "", "pies");
    expect(resultado).toHaveLength(1);
    expect(resultado[0].categoria).toBe("pies");
  });

  it("retorna todos si texto y categoría están vacíos", () => {
    const resultado = filtrarProductos(productosMock, "", "");
    expect(resultado).toHaveLength(productosMock.length);
  });
});
