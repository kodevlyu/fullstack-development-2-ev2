import { guardarUsuarios, cargarUsuarios, CLAVE_USUARIOS } from "../../src/utils/guardarUsuarios";
describe("guardarUsuarios", () => {
  let almacenamiento;
  beforeEach(() => { const datos = new Map(); almacenamiento = { getItem: k => datos.get(k) ?? null, setItem: (k,v) => datos.set(k,v) }; });
  it("guarda y recupera usuarios", () => { expect(guardarUsuarios([{ id: "1", correo: "a@gmail.com" }], almacenamiento)).toBe(true); expect(cargarUsuarios(almacenamiento).length).toBe(1); });
  it("tolera JSON corrupto", () => { almacenamiento.setItem(CLAVE_USUARIOS, "{"); expect(cargarUsuarios(almacenamiento)).toEqual([]); });
});
