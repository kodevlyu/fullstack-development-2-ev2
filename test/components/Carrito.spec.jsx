import { act } from "react";
import { createRoot } from "react-dom/client";
import Carrito from "../../src/components/Carrito";

describe("Carrito", () => {
  let nodo;
  let raiz;
  let cerrar;
  let actualizarCantidad;
  let quitarDelCarrito;
  let vaciarCarrito;

  // Producto guardado en el carrito con dos unidades.
  const producto = {
    codigo: "PRUEBA01",
    nombre: "Torta de prueba",
    precio: 10000,
    imagen: "/img/tc001.jpg",
    cantidad: 2,
  };

  // El catálogo informa la disponibilidad y el stock actual.
  const productoCatalogo = {
    codigo: "PRUEBA01",
    nombre: "Torta de prueba",
    precio: 10000,
    imagen: "/img/tc001.jpg",
    disponible: true,
    stock: 3,
  };

  beforeEach(() => {
    nodo = document.createElement("div");
    document.body.appendChild(nodo);
    raiz = createRoot(nodo);

    // Registran las acciones solicitadas por los botones.
    cerrar = jasmine.createSpy("cerrar");
    actualizarCantidad = jasmine.createSpy("actualizarCantidad");
    quitarDelCarrito = jasmine.createSpy("quitarDelCarrito");
    vaciarCarrito = jasmine.createSpy("vaciarCarrito");
  });

  afterEach(async () => {
    // Retira el componente y el fondo del panel lateral.
    await act(async () => {
      raiz.unmount();
    });

    nodo.remove();
  });

  // Entrega al panel el carrito y el catálogo, como hace App.jsx.
  async function mostrarCarrito(lista, total, catalogo = [productoCatalogo]) {
    await act(async () => {
      raiz.render(
        <Carrito
          productos={catalogo}
          mostrar={true}
          cerrar={cerrar}
          carrito={lista}
          total={total}
          errorGuardado=""
          actualizarCantidad={actualizarCantidad}
          quitarDelCarrito={quitarDelCarrito}
          vaciarCarrito={vaciarCarrito}
        />,
      );
    });

    // Offcanvas muestra el panel fuera del nodo original.
    return document.querySelector(".carrito-panel");
  }

  it("muestra el carrito vacío y permite solicitar su cierre", async () => {
    const panel = await mostrarCarrito([], 0);

    expect(panel.textContent).toContain("Tu carrito está vacío.");

    await act(async () => {
      panel.querySelector(".carrito-vacio button").click();
    });

    expect(cerrar).toHaveBeenCalledTimes(1);
  });

  it("muestra las cantidades y los importes del carrito", async () => {
    const panel = await mostrarCarrito([producto], 20000);

    expect(panel.textContent).toContain("Torta de prueba");
    expect(panel.querySelector(".carrito-cantidad span").textContent).toBe("2");
    expect(panel.querySelector(".carrito-subtotal").textContent).toContain(
      "$20.000",
    );
    expect(panel.querySelector(".carrito-total").textContent).toContain(
      "$20.000",
    );
  });

  it("solicita aumentar y disminuir dentro del stock", async () => {
    const panel = await mostrarCarrito([producto], 20000);

    const sumar = panel.querySelector(
      'button[aria-label="Sumar una unidad de Torta de prueba"]',
    );
    const restar = panel.querySelector(
      'button[aria-label="Restar una unidad de Torta de prueba"]',
    );

    expect(sumar.disabled).toBeFalse();
    expect(restar.disabled).toBeFalse();

    await act(async () => {
      sumar.click();
    });

    expect(actualizarCantidad).toHaveBeenCalledWith("PRUEBA01", 3);

    await act(async () => {
      restar.click();
    });

    // El espía registra acciones; no modifica las unidades recibidas.
    expect(actualizarCantidad).toHaveBeenCalledWith("PRUEBA01", 1);
  });

  it("deshabilita restar cuando queda una unidad", async () => {
    const panel = await mostrarCarrito([{ ...producto, cantidad: 1 }], 10000);

    const restar = panel.querySelector(
      'button[aria-label="Restar una unidad de Torta de prueba"]',
    );

    expect(restar.disabled).toBeTrue();

    await act(async () => {
      restar.click();
    });

    expect(actualizarCantidad).not.toHaveBeenCalled();
  });

  it("solicita eliminar el producto seleccionado", async () => {
    const panel = await mostrarCarrito([producto], 20000);

    await act(async () => {
      panel.querySelector(".carrito-eliminar").click();
    });

    expect(quitarDelCarrito).toHaveBeenCalledOnceWith("PRUEBA01");
  });

  it("solicita vaciar el carrito", async () => {
    const panel = await mostrarCarrito([producto], 20000);

    await act(async () => {
      panel.querySelector(".carrito-boton-secundario").click();
    });

    expect(vaciarCarrito).toHaveBeenCalledTimes(1);
  });

  // Con tres unidades y stock tres, no permite solicitar una cuarta.
  it("bloquea sumar cuando se alcanza el stock disponible", async () => {
    const panel = await mostrarCarrito([{ ...producto, cantidad: 3 }], 30000);

    const sumar = panel.querySelector(
      'button[aria-label="Sumar una unidad de Torta de prueba"]',
    );

    expect(sumar.disabled).toBeTrue();
    expect(panel.textContent).toContain("Alcanzaste el stock disponible.");

    await act(async () => {
      sumar.click();
    });

    expect(actualizarCantidad).not.toHaveBeenCalled();
  });

  // Simula que un producto guardado se agotó en el catálogo.
  it("bloquea sumar con stock cero y permite eliminar el producto", async () => {
    const panel = await mostrarCarrito([producto], 20000, [
      { ...productoCatalogo, stock: 0 },
    ]);

    const sumar = panel.querySelector(
      'button[aria-label="Sumar una unidad de Torta de prueba"]',
    );
    const eliminar = panel.querySelector(".carrito-eliminar");

    expect(sumar.disabled).toBeTrue();
    expect(eliminar.disabled).toBeFalse();

    await act(async () => {
      sumar.click();
      eliminar.click();
    });

    expect(actualizarCantidad).not.toHaveBeenCalled();
    expect(quitarDelCarrito).toHaveBeenCalledOnceWith("PRUEBA01");
  });
});
