// Comprueba las reglas que utilizará el carrito para respetar el stock.
import { permiteCantidad, permiteAgregar } from "../../src/utils/stockCarrito";

describe("Control de stock del carrito", () => {
  // Producto de prueba: no modifica el catálogo real.
  const producto = {
    codigo: "PRUEBA",
    disponible: true,
    stock: 3,
  };

  // Validación de la cantidad solicitada.
  it("permite una cantidad igual al stock", () => {
    expect(permiteCantidad(producto, 3)).toBeTrue();
  });

  it("rechaza una cantidad superior al stock", () => {
    expect(permiteCantidad(producto, 4)).toBeFalse();
  });

  it("rechaza una cantidad de cero", () => {
    expect(permiteCantidad(producto, 0)).toBeFalse();
  });

  it("rechaza cantidades negativas", () => {
    expect(permiteCantidad(producto, -1)).toBeFalse();
  });

  it("rechaza cantidades decimales", () => {
    expect(permiteCantidad(producto, 1.5)).toBeFalse();
  });

  // Disponibilidad y existencia del dato stock.
  it("impide agregar un producto con stock cero", () => {
    expect(permiteAgregar([], { ...producto, stock: 0 })).toBeFalse();
  });

  it("impide agregar un producto no disponible", () => {
    expect(permiteAgregar([], { ...producto, disponible: false })).toBeFalse();
  });

  it("impide agregar un producto sin stock definido", () => {
    const productoSinStock = {
      codigo: "PRUEBA",
      disponible: true,
    };

    expect(permiteAgregar([], productoSinStock)).toBeFalse();
  });

  // El límite considera las unidades que ya están en el carrito.
  it("permite agregar cuando todavía queda stock", () => {
    const carrito = [{ codigo: "PRUEBA", cantidad: 2 }];

    expect(permiteAgregar(carrito, producto)).toBeTrue();
  });

  it("impide agregar cuando el carrito ya alcanzó el stock", () => {
    const carrito = [{ codigo: "PRUEBA", cantidad: 3 }];

    expect(permiteAgregar(carrito, producto)).toBeFalse();
  });
});
