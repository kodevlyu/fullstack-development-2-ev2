import { act } from "react";
import { createRoot } from "react-dom/client";
import { MemoryRouter } from "react-router-dom";
import Registro from "../../src/pages/Registro";
import { UsuariosProvider } from "../../src/hooks/useUsuarios.jsx";
describe("Registro", () => {
  it("muestra formulario de registro con región y comuna", async () => {
    const nodo = document.createElement("div"); document.body.appendChild(nodo); const raiz = createRoot(nodo);
    await act(async () => raiz.render(<MemoryRouter><UsuariosProvider><Registro /></UsuariosProvider></MemoryRouter>));
    expect(nodo.textContent).toContain("Registro de clientes");
    expect(nodo.querySelector('select[name="region"]')).not.toBe(null);
    expect(nodo.querySelector('select[name="comuna"]')).not.toBe(null);
    await act(async () => raiz.unmount()); nodo.remove();
  });
});
