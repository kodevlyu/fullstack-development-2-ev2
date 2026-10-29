import { validarPedido } from "../../src/utils/validarPedido";

describe("Validación final de pedido", () => {
  const productos = [
    {
      codigo: "T001",
      nombre: "Torta de prueba",
      precio: 20000,
      stock: 5,
      disponible: true,
    },
  ];

  const carrito = [
    {
      codigo: "T001",
      nombre: "Torta de prueba",
      precio: 18000,
      cantidad: 2,
    },
  ];

  it("rechaza un carrito vacío", () => {
    const resultado = validarPedido([], productos);
    expect(resultado.valido).toBe(false);
  });

  it("rechaza cantidades superiores al stock", () => {
    const resultado = validarPedido(
      [{ ...carrito[0], cantidad: 6 }],
      productos
    );
    expect(resultado.valido).toBe(false);
  });

  it("utiliza el precio vigente del catálogo", () => {
    const resultado = validarPedido(carrito, productos);
    expect(resultado.valido).toBe(true);
    expect(resultado.subtotal).toBe(40000);
    expect(resultado.total).toBe(40000);
  });

  it("recalcula el descuento usando el subtotal vigente", () => {
    const resultado = validarPedido(carrito, productos, "PASTEL10");
    expect(resultado.valido).toBe(true);
    expect(resultado.descuento).toBe(4000);
    expect(resultado.total).toBe(36000);
  });

  it("rechaza productos inexistentes", () => {
    const resultado = validarPedido(
      [{ ...carrito[0], codigo: "INEXISTENTE" }],
      productos
    );
    expect(resultado.valido).toBe(false);
  });
});
