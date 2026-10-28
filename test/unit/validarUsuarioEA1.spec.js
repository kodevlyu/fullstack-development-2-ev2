import { validarUsuario, runValido } from "../../src/utils/validarUsuario";
import { usuarioMock } from "../mocks/usuarios";

describe("Validaciones de usuarios alineadas a EA1", () => {
  it("valida el dígito verificador del RUN", () => {
    expect(runValido("123456785")).toBe(true);
    expect(runValido("123456786")).toBe(false);
    expect(runValido("12.345.678-5")).toBe(false);
  });
  it("rechaza ausencia de apellidos y dirección", () => {
    const r = validarUsuario({ ...usuarioMock, apellidos: "", direccion: "" });
    expect(r.errores.apellidos).toBeDefined();
    expect(r.errores.direccion).toBeDefined();
  });
  it("rechaza contraseña fuera del rango EA1", () => {
    expect(validarUsuario({ ...usuarioMock, clave: "123", confirmacion: "123" }).errores.clave).toBeDefined();
    expect(validarUsuario({ ...usuarioMock, clave: "12345678901", confirmacion: "12345678901" }).errores.clave).toBeDefined();
  });
  it("rechaza confirmación diferente", () => {
    expect(validarUsuario({ ...usuarioMock, confirmacion: "otra" }).errores.confirmacion).toBeDefined();
  });
  it("admite edición de cuenta semilla conservando su correo", () => {
    const r = validarUsuario({ ...usuarioMock, correo: "admin@pasteleria.cl", clave: "", confirmacion: "" }, [], "admin-ea2-001", { exigirClave: false });
    expect(r.valido).toBe(true);
  });
  it("no permite registrar libremente correos del dominio de demostración", () => {
    expect(validarUsuario({ ...usuarioMock, correo: "otro@pasteleria.cl" }).errores.correo).toBeDefined();
  });
});
