import { guardarProductos, cargarProductos } from "../../src/utils/guardarProductos";
import { productosMock } from "../mocks/productos";
describe("guardarProductos", () => {
  beforeEach(() => localStorage.removeItem("productos"));
  afterEach(() => localStorage.removeItem("productos"));
  it("guarda y recupera productos", () => {
    guardarProductos(productosMock);
    expect(cargarProductos().length).toBe(productosMock.length);
    expect(cargarProductos()[0].codigo).toBe("P001");
  });
  it("conserva una lista vacía", () => {
    guardarProductos([]);
    expect(cargarProductos()).toEqual([]);
  });
});
