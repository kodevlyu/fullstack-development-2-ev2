import { formatoPrecio } from "../../src/utils/formatoPrecio";

describe("formatoPrecio", () => {
  it("formatea números como CLP", () => {
    const resultado = formatoPrecio(1000);
    expect(resultado).toBe("$1.000");
  });

  it("retorna string vacío si no es número", () => {
    const resultado = formatoPrecio("abc");
    expect(resultado).toBe("");
  });
});
