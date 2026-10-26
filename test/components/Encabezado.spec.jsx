import { act } from "react";
import { createRoot } from "react-dom/client";
import { MemoryRouter } from "react-router-dom";

// Componente real que queremos comprobar.
import Encabezado from "../../src/components/Encabezado";

describe("Encabezado", () => {
  let nodo;
  let raiz;
  let abrirCarrito;

  // Prepara un espacio independiente para cada prueba.
  beforeEach(() => {
    nodo = document.createElement("div");
    document.body.appendChild(nodo);
    raiz = createRoot(nodo);

    // Registra si se solicita abrir el carrito, sin abrir el panel real.
    abrirCarrito = jasmine.createSpy("abrirCarrito");
  });

  // Desmonta React y retira el espacio utilizado por la prueba.
  afterEach(async () => {
    await act(async () => {
      raiz.unmount();
    });

    nodo.remove();
  });

  // MemoryRouter simula la navegación sin cambiar la dirección del navegador.
  async function mostrarEncabezado(cantidad) {
    await act(async () => {
      raiz.render(
        <MemoryRouter>
          <Encabezado cantidadTotal={cantidad} abrirCarrito={abrirCarrito} />
        </MemoryRouter>,
      );
    });
  }

  // 1. Comprueba la marca y las direcciones del menú.
  it("muestra la marca y los enlaces principales", async () => {
    await mostrarEncabezado(0);

    expect(nodo.textContent).toContain("Pastelería Mil Sabores");
    expect(nodo.querySelector('a[href="/"]')).not.toBeNull();
    expect(nodo.querySelector('a[href="/productos"]')).not.toBeNull();
    expect(nodo.querySelector('a[href="/nosotros"]')).not.toBeNull();
    expect(nodo.querySelector('a[href="/blogs"]')).not.toBeNull();
    expect(nodo.querySelector('a[href="/contacto"]')).not.toBeNull();
  });

  // 2. Comprueba que el contador muestra las unidades recibidas desde App.
  it("muestra la cantidad total de unidades", async () => {
    await mostrarEncabezado(3);

    const boton = nodo.querySelector(
      'button[aria-label="Abrir carrito: 3 unidades"]',
    );

    expect(boton).not.toBeNull();
    expect(boton.textContent).toContain("Carrito (3)");
  });

  // 3. Comprueba que el contador cambia al recibir una cantidad nueva.
  it("actualiza el contador cuando cambia la cantidad", async () => {
    await mostrarEncabezado(1);
    await mostrarEncabezado(4);

    const boton = nodo.querySelector(
      'button[aria-label="Abrir carrito: 4 unidades"]',
    );

    expect(boton).not.toBeNull();
    expect(boton.textContent).toContain("Carrito (4)");
  });

  // 4. Comprueba que pulsar el botón llama a la función de apertura.
  it("solicita abrir el carrito al pulsar su botón", async () => {
    await mostrarEncabezado(0);

    const boton = nodo.querySelector(
      'button[aria-label="Abrir carrito: 0 unidades"]',
    );

    await act(async () => {
      boton.click();
    });

    expect(abrirCarrito).toHaveBeenCalledTimes(1);
  });
});
