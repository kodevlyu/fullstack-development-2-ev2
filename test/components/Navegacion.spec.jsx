import { act } from "react";
import { createRoot } from "react-dom/client";

// Usa las rutas reales de la aplicación.
import Router from "../../src/router";

describe("Navegación", () => {
  let nodo;
  let raiz;
  let direccionOriginal;

  beforeEach(() => {
    // Conserva la dirección del navegador de pruebas de Karma.
    direccionOriginal = window.location.href;

    nodo = document.createElement("div");
    document.body.appendChild(nodo);
    raiz = createRoot(nodo);
  });

  afterEach(async () => {
    // Desmonta las rutas y restaura la dirección original.
    await act(async () => {
      raiz.unmount();
    });

    nodo.remove();
    window.history.replaceState(null, "", direccionOriginal);
  });

  // Inicia la aplicación en la dirección que necesita cada prueba.
  async function abrirPagina(direccion) {
    window.history.replaceState(null, "", direccion);

    await act(async () => {
      raiz.render(
        <Router
          productos={[]}
          actualizarProductos={jasmine.createSpy("actualizarProductos")}
          agregarAlCarrito={jasmine.createSpy("agregarAlCarrito")}
          abrirCarrito={jasmine.createSpy("abrirCarrito")}
          cantidadTotal={0}
        />,
      );
    });
  }

  // Pulsa un enlace real y espera a que React muestre la nueva página.
  async function pulsarEnlace(selector) {
    const enlace = nodo.querySelector(selector);

    expect(enlace).not.toBeNull();

    await act(async () => {
      enlace.click();
    });
  }

  // 1. Comprueba la conexión del menú público con Nosotros.
  it("navega desde Inicio hasta Nosotros", async () => {
    await abrirPagina("/");

    await pulsarEnlace('a[href="/nosotros"]');

    expect(window.location.pathname).toBe("/nosotros");
    expect(nodo.querySelector("h1").textContent).toContain(
      "Una tradición que se comparte con cariño",
    );
  });

  // 2. Comprueba el listado, el primer artículo y el regreso al listado.
  it("abre un artículo desde Blogs y permite volver", async () => {
    await abrirPagina("/");

    await pulsarEnlace('a[href="/blogs"]');
    expect(nodo.querySelector("h1").textContent).toBe(
      "Historias para disfrutar",
    );

    await pulsarEnlace('a[href="/blogs/1"]');
    expect(window.location.pathname).toBe("/blogs/1");
    expect(nodo.querySelector("h1").textContent).toBe(
      "¿Qué hace que un bizcocho sea esponjoso?",
    );

    await pulsarEnlace('.detalle-blog-navegacion a[href="/blogs"]');
    expect(window.location.pathname).toBe("/blogs");
    expect(nodo.querySelector("h1").textContent).toBe(
      "Historias para disfrutar",
    );
  });

  // 3. Comprueba el acceso a Contacto desde la invitación de Nosotros.
  it("abre Contacto desde el botón Contáctanos", async () => {
    await abrirPagina("/nosotros");

    await pulsarEnlace('.nosotros-contacto a[href="/contacto"]');

    expect(window.location.pathname).toBe("/contacto");
    expect(nodo.querySelector("h1").textContent).toBe("Conversemos");
    expect(nodo.querySelector("#comentario-contacto")).not.toBeNull();
  });

  // 4. Comprueba una dirección incorrecta y la recuperación hacia Inicio.
  it("muestra NoEncontrado y permite regresar al inicio", async () => {
    await abrirPagina("/direccion-de-prueba-inexistente");

    expect(nodo.querySelector("h1").textContent).toBe("Página no encontrada");

    await pulsarEnlace('.no-encontrado-acciones a[href="/"]');

    expect(window.location.pathname).toBe("/");
    expect(nodo.querySelector(".no-encontrado")).toBeNull();
    expect(nodo.querySelector("h1").textContent).toContain(
      "Pastelería Mil Sabores",
    );
  });

  // 5. Comprueba el cambio entre el menú administrativo y el público.
  it("vuelve desde administración a la tienda y cambia el menú", async () => {
    await abrirPagina("/admin");

    expect(nodo.querySelector(".menu-admin")).not.toBeNull();
    expect(nodo.querySelector("h1").textContent).toBe(
      "Bienvenido al área de gestión",
    );

    await pulsarEnlace('.admin-grid a[href="/"]');

    expect(window.location.pathname).toBe("/");
    expect(nodo.querySelector(".menu-admin")).toBeNull();
    expect(nodo.querySelector(".encabezado")).not.toBeNull();
  });
});
