import { guardarProductos, cargarProductos } from "../../src/utils/guardarProductos";
import { productosMock } from "../mocks/productos";

describe("guardarProductos / cargarProductos", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("guarda y carga productos desde localStorage", () => {
    guardarProductos(productosMock);
    const cargados = cargarProductos();
    expect(cargados).toHaveLength(productosMock.length);
    expect(cargados[0].codigo).toBe("P001");
  });
});
