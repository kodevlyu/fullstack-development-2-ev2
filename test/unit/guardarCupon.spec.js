import { cargarCupon, guardarCupon } from "../../src/utils/guardarCupon";

describe("Persistencia del cupón", () => {
  beforeEach(() => {
    localStorage.removeItem("mil-sabores-cupon");
  });

  afterEach(() => {
    localStorage.removeItem("mil-sabores-cupon");
  });

  it("comienza sin cupón cuando no existe uno guardado", () => {
    expect(cargarCupon()).toBe("");
  });

  it("guarda y recupera el código del cupón", () => {
    expect(guardarCupon("PASTEL10")).toBe(true);
    expect(cargarCupon()).toBe("PASTEL10");
  });

  it("elimina el cupón cuando recibe un código vacío", () => {
    guardarCupon("PASTEL10");
    expect(guardarCupon("")).toBe(true);
    expect(cargarCupon()).toBe("");
  });

  it("rechaza valores que no sean texto", () => {
    expect(guardarCupon(null)).toBe(false);
    expect(cargarCupon()).toBe("");
  });
});
