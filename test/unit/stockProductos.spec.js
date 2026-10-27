import productos from "../../src/data/productos";
import { validarDatosProducto } from "../../src/utils/validarDatosProducto";
import { permiteCantidad } from "../../src/utils/stockCarrito";

const base = { codigo: "ST001", nombre: "Producto", descripcion: "Prueba", categoria: "Tortas Cuadradas", precio: "1000", imagen: "", disponible: true, personalizable: false };
describe("Stock en administración y catálogo", () => {
  it("los 16 productos iniciales tienen stock entero no negativo", () => {
    expect(productos.length).toBe(16);
    expect(productos.every((p) => Number.isInteger(p.stock) && p.stock >= 0)).toBeTrue();
  });
  it("acepta stock cero y lo guarda como número", () => {
    const r = validarDatosProducto({ ...base, stock: "0" });
    expect(r.valido).toBeTrue();
    expect(r.producto.stock).toBe(0);
    expect(permiteCantidad(r.producto, 1)).toBeFalse();
  });
  it("acepta existencias positivas y respeta el límite del carrito", () => {
    const r = validarDatosProducto({ ...base, stock: "10" });
    expect(r.valido).toBeTrue();
    expect(permiteCantidad(r.producto, 10)).toBeTrue();
    expect(permiteCantidad(r.producto, 11)).toBeFalse();
  });
  it("rechaza stock ausente, negativo, decimal o no numérico", () => {
    for (const stock of [undefined, "", "-1", "2.5", "abc", "9007199254740992"]) {
      expect(validarDatosProducto({ ...base, stock }).errores.stock).toBeDefined();
    }
  });
  it("conserva disponible como atributo separado", () => {
    const r = validarDatosProducto({ ...base, stock: "5", disponible: false });
    expect(r.producto.stock).toBe(5);
    expect(r.producto.disponible).toBeFalse();
    expect(permiteCantidad(r.producto, 1)).toBeFalse();
  });
  it("un registro antiguo sin stock queda pendiente y no se puede comprar", () => {
    expect(permiteCantidad({ ...base, disponible: true }, 1)).toBeFalse();
  });
});
