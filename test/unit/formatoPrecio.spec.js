import { formatoPrecio } from "../../src/utils/formatoPrecio";
describe("formatoPrecio", () => {
  it("muestra CLP sin decimales", () => expect(formatoPrecio(45000)).toBe("$45.000"));
  it("retorna $0 para datos no numéricos", () => expect(formatoPrecio("abc")).toBe("$0"));
});
