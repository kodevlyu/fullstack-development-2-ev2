import { validarDatosProducto } from "../../src/utils/validarDatosProducto";
const valido = { codigo: "TC999", nombre: "Torta prueba", descripcion: "Descripción de prueba", categoria: "Tortas Cuadradas", precio: "10000", stock: "10", imagen: "/img/tc001.jpg", disponible: true, personalizable: false };
describe("validarDatosProducto", () => {
  it("normaliza código y precio", () => {
    const r = validarDatosProducto({ ...valido, codigo: " tc999 " });
    expect(r.valido).toBeTrue(); expect(r.producto.codigo).toBe("TC999"); expect(r.producto.precio).toBe(10000);
  });
  it("rechaza códigos duplicados", () => {
    expect(validarDatosProducto(valido, [{ codigo: "TC999" }]).errores.codigo).toBeDefined();
  });
  it("rechaza precio cero y negativo", () => {
    expect(validarDatosProducto({ ...valido, precio: 0 }).valido).toBeFalse();
    expect(validarDatosProducto({ ...valido, precio: -2 }).valido).toBeFalse();
  });
  it("permite conservar el código al editar", () => {
    expect(validarDatosProducto(valido, [{ codigo: "TC999" }], "TC999").valido).toBeTrue();
  });
  it("rechaza categoría no definida", () => {
    expect(validarDatosProducto({ ...valido, categoria: "otra" }).valido).toBeFalse();
  });
});
