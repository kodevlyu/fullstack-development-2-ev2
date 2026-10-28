import { validarContacto } from "../../src/utils/validarContacto";
describe("validarContacto", () => {
  it("acepta consulta válida", () => expect(validarContacto({ nombre: "Ejemplo", correo: "a@gmail.com", comentario: "Consulta" }).valido).toBe(true));
  it("rechaza comentario vacío", () => expect(validarContacto({ nombre: "Ejemplo", correo: "a@gmail.com", comentario: "" }).valido).toBe(false));
  it("rechaza correo externo", () => expect(validarContacto({ nombre: "Ejemplo", correo: "a@otro.com", comentario: "Consulta" }).valido).toBe(false));
});
