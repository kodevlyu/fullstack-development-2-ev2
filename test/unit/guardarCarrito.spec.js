// Funciones reales utilizadas por useCarrito.js.
import { cargarCarrito, guardarCarrito } from "../../src/utils/guardarCarrito";

describe("Almacenamiento del carrito", () => {
  // Lista ficticia con el mismo formato que utiliza el carrito.
  const carrito = [
    {
      codigo: "PRUEBA01",
      nombre: "Torta de prueba",
      precio: 10000,
      imagen: "/img/prueba.jpg",
      cantidad: 2,
    },
  ];

  let leer;
  let guardar;

  // Antes de cada prueba, reemplaza el acceso real por funciones simuladas.
  beforeEach(() => {
    leer = spyOn(Storage.prototype, "getItem").and.returnValue(null);
    guardar = spyOn(Storage.prototype, "setItem").and.stub();

    // Evita llenar la consola con los errores que provocamos a propósito.
    spyOn(console, "error");
  });

  // Jasmine restaura automáticamente estas funciones después de cada prueba.

  // 1. La primera visita debe comenzar sin productos.
  it("devuelve un carrito vacío cuando no hay datos guardados", () => {
    expect(cargarCarrito()).toEqual([]);
    expect(leer).toHaveBeenCalledWith("mil-sabores-carrito");
  });

  // 2. Comprueba que recupera productos, precios y cantidades.
  it("recupera un carrito guardado correctamente", () => {
    leer.and.returnValue(JSON.stringify(carrito));

    expect(cargarCarrito()).toEqual(carrito);
  });

  // 3. Un carrito vaciado debe seguir vacío al recuperarlo.
  it("respeta un carrito vacío guardado", () => {
    leer.and.returnValue("[]");

    expect(cargarCarrito()).toEqual([]);
  });

  // 4. Un texto dañado no debe impedir que se abra la aplicación.
  it("devuelve una lista vacía si el texto guardado está dañado", () => {
    leer.and.returnValue("esto no es JSON");

    expect(cargarCarrito()).toEqual([]);
    expect(console.error).toHaveBeenCalled();
  });

  // 5. Comprueba que rechaza cantidades inválidas al recuperar datos.
  it("rechaza un producto guardado con cantidad cero", () => {
    const datosInvalidos = [{ ...carrito[0], cantidad: 0 }];
    leer.and.returnValue(JSON.stringify(datosInvalidos));

    expect(cargarCarrito()).toEqual([]);
  });

  // 6. Verifica la clave y el contenido enviados al almacenamiento.
  it("guarda el carrito como texto y devuelve true", () => {
    const resultado = guardarCarrito(carrito);

    expect(resultado).toBe(true);
    expect(guardar).toHaveBeenCalledWith(
      "mil-sabores-carrito",
      JSON.stringify(carrito),
    );
  });

  // 7. No debe escribir datos incompletos o inválidos.
  it("rechaza datos inválidos sin guardarlos", () => {
    const resultado = guardarCarrito([{ ...carrito[0], precio: -100 }]);

    expect(resultado).toBe(false);
    expect(guardar).not.toHaveBeenCalled();
  });

  // 8. Informa si el navegador impide guardar los cambios.
  it("devuelve false cuando falla el almacenamiento", () => {
    guardar.and.throwError("Almacenamiento bloqueado");

    expect(guardarCarrito(carrito)).toBe(false);
    expect(console.error).toHaveBeenCalled();
  });
});
