import { act, useContext, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { UsuariosProvider } from "../../src/hooks/useUsuarios.jsx";
import { ContextoUsuarios } from "../../src/context/contextoUsuarios.js";
import { CLAVE_USUARIOS } from "../../src/utils/guardarUsuarios.js";
import { CLAVE_SESION } from "../../src/utils/sesion.js";

describe("UsuariosProvider - operaciones CRUD", () => {
  let nodo;
  let raiz;
  let contexto;
  let usuariosPrevios;
  let sesionPrevia;

  const datosValidos = {
    run: "123456785",
    nombre: "Usuario",
    apellidos: "Prueba",
    direccion: "Dirección de prueba 123",
    correo: "usuario.prueba@gmail.com",
    clave: "Prueba123",
    confirmacion: "Prueba123",
    region: "Metropolitana de Santiago",
    comuna: "Melipilla",
  };

  function Consumidor() {
    const valor = useContext(ContextoUsuarios);

    useEffect(() => {
      contexto = valor;
    }, [valor]);

    return null;
  }

  beforeEach(async () => {
    usuariosPrevios = localStorage.getItem(CLAVE_USUARIOS);
    sesionPrevia = sessionStorage.getItem(CLAVE_SESION);

    localStorage.setItem(CLAVE_USUARIOS, "[]");
    sessionStorage.removeItem(CLAVE_SESION);

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

    if (usuariosPrevios === null) {
      localStorage.removeItem(CLAVE_USUARIOS);
    } else {
      localStorage.setItem(CLAVE_USUARIOS, usuariosPrevios);
    }

    if (sesionPrevia === null) {
      sessionStorage.removeItem(CLAVE_SESION);
    } else {
      sessionStorage.setItem(CLAVE_SESION, sesionPrevia);
    }
  });

  async function crearUsuario() {
    let resultado;

    await act(async () => {
      resultado = contexto.crear(datosValidos);
    });

    return resultado;
  }

  it("crea un usuario válido", async () => {
    const resultado = await crearUsuario();

    expect(resultado.ok).toBe(true);
    expect(contexto.usuarios.length).toBe(1);
    expect(contexto.usuarios[0].correo).toBe(datosValidos.correo);
    expect(contexto.usuarios[0].rol).toBe("cliente");
  });

  it("rechaza un usuario con datos inválidos", async () => {
    let resultado;

    await act(async () => {
      resultado = contexto.crear({
        ...datosValidos,
        correo: "correo-invalido",
      });
    });

    expect(resultado.ok).toBe(false);
    expect(resultado.errores.correo).toBeDefined();
    expect(contexto.usuarios.length).toBe(0);
  });

  it("rechaza un usuario duplicado", async () => {
    await crearUsuario();

    let resultado;

    await act(async () => {
      resultado = contexto.crear(datosValidos);
    });

    expect(resultado.ok).toBe(false);
    expect(resultado.errores.run).toBeDefined();
    expect(resultado.errores.correo).toBeDefined();
  });

  it("permite iniciar sesión con credenciales correctas", async () => {
    await crearUsuario();

    let resultado;

    await act(async () => {
      resultado = contexto.ingresar(
        datosValidos.correo,
        datosValidos.clave
      );
    });

    expect(resultado.ok).toBe(true);
    expect(contexto.sesion.correo).toBe(datosValidos.correo);
  });

  it("rechaza la actualización de un usuario inexistente", () => {
    const resultado = contexto.actualizar("id-inexistente", datosValidos);

    expect(resultado.ok).toBe(false);
    expect(resultado.mensaje).toBe("Usuario no encontrado.");
  });

  it("actualiza los datos de un usuario existente", async () => {
    const creado = await crearUsuario();

    let resultado;

    await act(async () => {
      resultado = contexto.actualizar(creado.usuario.id, {
        ...datosValidos,
        nombre: "NombreActualizado",
        clave: "",
        confirmacion: "",
      });
    });

    expect(resultado.ok).toBe(true);
    expect(contexto.usuarios[0].nombre).toBe("NombreActualizado");
    expect(contexto.usuarios[0].clave).toBe(datosValidos.clave);
  });

  it("elimina un usuario existente", async () => {
    const creado = await crearUsuario();

    let eliminado;

    await act(async () => {
      eliminado = contexto.eliminar(creado.usuario.id);
    });

    expect(eliminado).toBe(true);
    expect(contexto.usuarios.length).toBe(0);
  });

  it("rechaza la eliminación de un usuario inexistente", () => {
    expect(contexto.eliminar("id-inexistente")).toBe(false);
  });

  it("rechaza actualizar el perfil sin sesión de cliente", () => {
    const resultado = contexto.actualizarMiPerfil(datosValidos);

    expect(resultado.ok).toBe(false);
    expect(resultado.mensaje).toBe(
      "Debes iniciar sesión como cliente."
    );
  });
});
