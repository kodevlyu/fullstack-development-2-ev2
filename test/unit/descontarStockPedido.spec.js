import { descontarStockPedido } from "../../src/utils/descontarStockPedido";

describe("descontarStockPedido", () => {
  const productos = [
    { codigo: "TC001", stock: 55, disponible: true },
    { codigo: "TC002", stock: 30, disponible: true },
  ];

  it("descuenta las cantidades compradas", () => {
    const resultado = descontarStockPedido(productos, [
      { codigo: "TC001", cantidad: 2 },
      { codigo: "TC002", cantidad: 3 },
    ]);

    expect(resultado[0].stock).toBe(53);
    expect(resultado[1].stock).toBe(27);
  });

  it("no modifica el catálogo original", () => {
    descontarStockPedido(productos, [
      { codigo: "TC001", cantidad: 2 },
    ]);

    expect(productos[0].stock).toBe(55);
  });

  it("rechaza compras que superan el stock", () => {
    const resultado = descontarStockPedido(productos, [
      { codigo: "TC001", cantidad: 56 },
    ]);

    expect(resultado).toBeNull();
  });

  it("rechaza productos inexistentes", () => {
    const resultado = descontarStockPedido(productos, [
      { codigo: "NOEXISTE", cantidad: 1 },
    ]);

    expect(resultado).toBeNull();
  });

  it("rechaza cantidades inválidas", () => {
    const resultado = descontarStockPedido(productos, [
      { codigo: "TC001", cantidad: -1 },
    ]);

    expect(resultado).toBeNull();
  });

  it("acumula cantidades repetidas", () => {
    const resultado = descontarStockPedido(productos, [
      { codigo: "TC001", cantidad: 2 },
      { codigo: "TC001", cantidad: 3 },
    ]);

    expect(resultado[0].stock).toBe(50);
  });
});
