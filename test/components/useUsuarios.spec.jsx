import { act, useContext, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { UsuariosProvider } from "../../src/hooks/useUsuarios.jsx";
import { ContextoUsuarios } from "../../src/context/contextoUsuarios.js";

describe("UsuariosProvider", () => {
  let nodo;
  let raiz;
  let contexto;

  function Consumidor() {
    const valor = useContext(ContextoUsuarios);

    useEffect(() => {
      contexto = valor;
    }, [valor]);

    return null;
  }

  beforeEach(async () => {
    nodo = document.createElement("div");
    document.body.appendChild(nodo);
    raiz = createRoot(nodo);

    await act(async () => {
      raiz.render(
        <UsuariosProvider>
          <Consumidor />
        </UsuariosProvider>
      );
    });
  });

  afterEach(async () => {
    await act(async () => {
      raiz.unmount();
    });
    nodo.remove();
  });

  it("rechaza credenciales incorrectas", () => {
    const resultado = contexto.ingresar(
      "usuario.inexistente@ejemplo.cl",
      "clave-incorrecta"
    );

    expect(resultado.ok).toBe(false);
    expect(resultado.mensaje).toBe(
      "Correo o contraseña incorrectos."
    );
  });

  it("permite cerrar la sesión", async () => {
    await act(async () => {
      contexto.salir();
    });

    expect(contexto.sesion).toBe(null);
  });
});
