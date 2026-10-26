import { act } from "react";
import { createRoot } from "react-dom/client";

// Panel real del carrito.
import Carrito from "../../src/components/Carrito";

describe("Carrito", () => {
  let nodo;
  let raiz;
  let cerrar;
  let actualizarCantidad;
  let quitarDelCarrito;
  let vaciarCarrito;

  // Producto ficticio utilizado en las pruebas del panel.
  const producto = {
    codigo: "PRUEBA01",
    nombre: "Torta de prueba",
    precio: 10000,
    imagen: "/img/tc001.jpg",
    cantidad: 2,
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
    // Desmontar React también retira el panel lateral y su fondo.
    await act(async () => {
      raiz.unmount();
    });

    nodo.remove();
  });

  // Abre el panel con los datos indicados por cada prueba.
  async function mostrarCarrito(lista, total) {
    await act(async () => {
      raiz.render(
        <Carrito
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

    // Offcanvas coloca el panel en document.body, fuera de nodo.
    return document.querySelector(".carrito-panel");
  }

  // 1. Comprueba el mensaje inicial y el botón para cerrar.
  it("muestra el carrito vacío y permite solicitar su cierre", async () => {
    const panel = await mostrarCarrito([], 0);

    expect(panel.textContent).toContain("Tu carrito está vacío.");

    const boton = panel.querySelector(".carrito-vacio button");

    await act(async () => {
      boton.click();
    });

    expect(cerrar).toHaveBeenCalledTimes(1);
  });

  // 2. Comprueba el producto, sus unidades, subtotal y total recibido.
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

  // 3. Comprueba el código y la cantidad enviados al pulsar + y −.
  it("solicita aumentar y disminuir la cantidad del producto", async () => {
    const panel = await mostrarCarrito([producto], 20000);

    const sumar = panel.querySelector(
      'button[aria-label="Sumar una unidad de Torta de prueba"]',
    );
    const restar = panel.querySelector(
      'button[aria-label="Restar una unidad de Torta de prueba"]',
    );

    await act(async () => {
      sumar.click();
    });

    expect(actualizarCantidad).toHaveBeenCalledWith("PRUEBA01", 3);

    await act(async () => {
      restar.click();
    });

    // El espía registra llamadas; no cambia las dos unidades recibidas.
    expect(actualizarCantidad).toHaveBeenCalledWith("PRUEBA01", 1);
  });

  // 4. Impide que el usuario reste por debajo de una unidad.
  it("deshabilita restar cuando queda una unidad", async () => {
    const panel = await mostrarCarrito([{ ...producto, cantidad: 1 }], 10000);

    const restar = panel.querySelector(
      'button[aria-label="Restar una unidad de Torta de prueba"]',
    );

    expect(restar.disabled).toBe(true);

    await act(async () => {
      restar.click();
    });

    expect(actualizarCantidad).not.toHaveBeenCalled();
  });

  // 5. Eliminar debe informar el código del producto seleccionado.
  it("solicita eliminar el producto seleccionado", async () => {
    const panel = await mostrarCarrito([producto], 20000);
    const boton = panel.querySelector(".carrito-eliminar");

    await act(async () => {
      boton.click();
    });

    expect(quitarDelCarrito).toHaveBeenCalledOnceWith("PRUEBA01");
  });

  // 6. El botón de vaciar debe llamar a la operación correspondiente.
  it("solicita vaciar el carrito", async () => {
    const panel = await mostrarCarrito([producto], 20000);
    const boton = panel.querySelector(".carrito-boton-secundario");

    await act(async () => {
      boton.click();
    });

    expect(vaciarCarrito).toHaveBeenCalledTimes(1);
  });
});
