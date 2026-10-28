import { act } from "react";
import { createRoot } from "react-dom/client";
import { MemoryRouter } from "react-router-dom";
import UsuariosAdmin from "../../src/pages/admin/UsuariosAdmin";
import { UsuariosProvider } from "../../src/hooks/useUsuarios.jsx";
describe("UsuariosAdmin", () => {
  it("muestra el listado y enlace de creación", async () => {
    const nodo = document.createElement("div"); document.body.appendChild(nodo); const raiz = createRoot(nodo);
    await act(async () => raiz.render(<MemoryRouter><UsuariosProvider><UsuariosAdmin /></UsuariosProvider></MemoryRouter>));
    expect(nodo.textContent).toContain("Administración de usuarios");
    expect(nodo.querySelector('a[href="/admin/usuario/nuevo"]')).not.toBe(null);
    await act(async () => raiz.unmount()); nodo.remove();
  });
});
