
import { act } from "react";
import { createRoot } from "react-dom/client";

// Usa las rutas reales de la aplicación.
import Router from "../../src/router";
import { UsuariosProvider } from "../../src/hooks/useUsuarios.jsx";

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
        <UsuariosProvider>
          <Router
          productos={[]}
          actualizarProductos={jasmine.createSpy("actualizarProductos")}
          agregarAlCarrito={jasmine.createSpy("agregarAlCarrito")}
          abrirCarrito={jasmine.createSpy("abrirCarrito")}
          cantidadTotal={0}
          sesion={direccion.startsWith("/admin") ? { correo: "admin@pasteleria.cl", rol: "admin" } : null}
        />
        </UsuariosProvider>,
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

  // 1. Comprueba la navegación desde Inicio hasta Nosotros.
  it("navega desde Inicio hasta Nosotros", async () => {
    await abrirPagina("/");

    await pulsarEnlace('a[href="/nosotros"]');

    expect(window.location.pathname).toBe("/nosotros");
    expect(nodo.querySelector("h1").textContent).toContain(
      "Una tradición que se comparte con cariño",
    );
  });

  // 2. Comprueba la portada y el catálogo vacío en Inicio.
  it("muestra el catálogo en Inicio sin crear otra lista de productos", async () => {
    await abrirPagina("/");

    // Verifica la portada recuperada del proyecto original.
    expect(nodo.querySelector(".inicio-hero")).not.toBeNull();

    expect(nodo.querySelector("#inicio-titulo").textContent).toContain(
      "Momentos inolvidables",
    );

    // El Router recibe productos=[], por lo que debe mostrar
    // el mensaje correspondiente al catálogo sin productos.
    expect(nodo.textContent).toContain(
      "No hay productos para mostrar.",
    );
  });

  // 3. Comprueba la navegación hacia Blogs y sus detalles.

it("abre un artículo desde Blogs y permite volver", async () => {
  await abrirPagina("/");

  // Navega desde Inicio hasta Blogs.
  await pulsarEnlace('a[href="/blogs"]');

  expect(window.location.pathname).toBe("/blogs");
  expect(nodo.querySelector("h1").textContent).toBe(
    "Historias para disfrutar",
  );

  // Abre el detalle del artículo.
  await pulsarEnlace('a[href="/blogs/1"]');

  expect(window.location.pathname).toBe("/blogs/1");
  expect(nodo.querySelector("h1").textContent).toBe(
    "¿Qué hace que un bizcocho sea esponjoso?",
  );

  // Regresa al listado de Blogs.
  await pulsarEnlace(
    '.detalle-blog-navegacion a[href="/blogs"]',
  );

  expect(window.location.pathname).toBe("/blogs");
  expect(nodo.querySelector("h1").textContent).toBe(
    "Historias para disfrutar",
  );
});

  // 4. Comprueba el acceso a Contacto desde Nosotros.
  it("abre Contacto desde el botón Contáctanos", async () => {
    await abrirPagina("/nosotros");

    await pulsarEnlace(
      '.nosotros-contacto a[href="/contacto"]',
    );

    expect(window.location.pathname).toBe("/contacto");

    expect(nodo.querySelector("h1").textContent).toBe(
      "Conversemos",
    );

    expect(
      nodo.querySelector("#comentario-contacto"),
    ).not.toBeNull();
  });

  // 5. Comprueba la página 404 y el regreso a Inicio.
  it("muestra NoEncontrado y permite regresar al inicio", async () => {
    await abrirPagina("/direccion-de-prueba-inexistente");

    expect(nodo.querySelector("h1").textContent).toBe(
      "Página no encontrada",
    );

    await pulsarEnlace(
      '.no-encontrado-acciones a[href="/"]',
    );

    expect(window.location.pathname).toBe("/");

    expect(nodo.querySelector(".no-encontrado")).toBeNull();

    expect(nodo.querySelector("h1").textContent).toContain(
      "Momentos inolvidables",
    );
  });

  // 6. Comprueba el cambio entre administración y tienda.
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
