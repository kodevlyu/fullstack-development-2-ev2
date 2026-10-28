import { guardarSesion, leerSesion, cerrarSesion } from "../../src/utils/sesion";
describe("sesion", () => {
  let almacenamiento;
  beforeEach(() => { const datos = new Map(); almacenamiento = { getItem: k => datos.get(k) ?? null, setItem: (k,v) => datos.set(k,v), removeItem: k => datos.delete(k) }; });
  it("guarda solo datos públicos de sesión", () => { expect(guardarSesion({ id: "1", nombre: "Demo", correo: "a@gmail.com", rol: "cliente", clave: "secreto" }, almacenamiento)).toBe(true); expect(leerSesion(almacenamiento).clave).toBeUndefined(); });
  it("cierra sesión", () => { guardarSesion({ id: "1" }, almacenamiento); cerrarSesion(almacenamiento); expect(leerSesion(almacenamiento)).toBe(null); });
});
