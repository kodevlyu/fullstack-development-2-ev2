import { validarCupon } from "../../src/utils/validarCupon";

describe("Validación de cupones de descuento", () => {
  it("acepta PASTEL10 y aplica un 10%", () => {
    const resultado = validarCupon("PASTEL10", 30000);

    expect(resultado.valido).toBeTrue();
    expect(resultado.descuento).toBe(3000);
    expect(resultado.total).toBe(27000);
  });

  it("acepta códigos con espacios y minúsculas", () => {
    const resultado = validarCupon(" pastel10 ", 10000);

    expect(resultado.valido).toBeTrue();
    expect(resultado.codigo).toBe("PASTEL10");
  });

  it("rechaza cupones inexistentes", () => {
    const resultado = validarCupon("DESCUENTO99", 30000);

    expect(resultado.valido).toBeFalse();
    expect(resultado.descuento).toBe(0);
  });

  it("rechaza cupones con carrito vacío", () => {
    const resultado = validarCupon("PASTEL10", 0);

    expect(resultado.valido).toBeFalse();
  });

  it("rechaza DUOC15 bajo el mínimo de compra", () => {
    const resultado = validarCupon("DUOC15", 19999);

    expect(resultado.valido).toBeFalse();
  });

  it("aplica DUOC15 al alcanzar el mínimo", () => {
    const resultado = validarCupon("DUOC15", 20000);

    expect(resultado.valido).toBeTrue();
    expect(resultado.descuento).toBe(3000);
  });

  it("rechaza MIL5000 bajo el mínimo", () => {
    const resultado = validarCupon("MIL5000", 29999);

    expect(resultado.valido).toBeFalse();
  });

  it("aplica MIL5000 sobre compras elegibles", () => {
    const resultado = validarCupon("MIL5000", 30000);

    expect(resultado.valido).toBeTrue();
    expect(resultado.descuento).toBe(5000);
    expect(resultado.total).toBe(25000);
  });

  it("rechaza subtotales negativos", () => {
    const resultado = validarCupon("PASTEL10", -1000);

    expect(resultado.valido).toBeFalse();
  });

  it("rechaza subtotales no numéricos", () => {
    const resultado = validarCupon("PASTEL10", NaN);

    expect(resultado.valido).toBeFalse();
  });
});
