import { act } from "react";
import { createRoot } from "react-dom/client";
import { MemoryRouter } from "react-router-dom";
import Login from "../../src/pages/Login";
import { UsuariosProvider } from "../../src/hooks/useUsuarios.jsx";
describe("Login", () => {
  it("presenta credenciales y acceso", async () => {
    const nodo = document.createElement("div"); document.body.appendChild(nodo); const raiz = createRoot(nodo);
    await act(async () => raiz.render(<MemoryRouter><UsuariosProvider><Login /></UsuariosProvider></MemoryRouter>));
    expect(nodo.querySelector('input[type="password"]')).not.toBe(null);
    expect(nodo.textContent).toContain("Iniciar sesión");
    await act(async () => raiz.unmount()); nodo.remove();
  });
});
