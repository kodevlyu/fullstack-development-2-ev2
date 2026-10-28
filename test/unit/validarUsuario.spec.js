import { validarUsuario, correoValido } from "../../src/utils/validarUsuario";
import { usuarioMock } from "../mocks/usuarios";
describe("validarUsuario", () => {
  it("acepta registro válido", () => expect(validarUsuario(usuarioMock).valido).toBe(true));
  it("rechaza dominio no permitido", () => expect(correoValido("persona@ejemplo.com")).toBe(false));
  it("rechaza correos duplicados", () => expect(validarUsuario(usuarioMock, [usuarioMock, { ...usuarioMock, id: "otro" }]).valido).toBe(false));
  it("rechaza comuna de otra región", () => expect(validarUsuario({ ...usuarioMock, comuna: "Valparaíso" }).errores.comuna).toBeDefined());
  it("permite editar sin cambiar clave", () => expect(validarUsuario({ ...usuarioMock, clave: "" }, [usuarioMock], "demo1", { exigirClave: false }).valido).toBe(true));
});
