// Importa las funciones reales utilizadas por useCarrito.js.
import {
  agregarProducto,
  cambiarCantidad,
  eliminarProducto,
  calcularTotal,
  contarProductos,
} from "../../src/utils/operacionesCarrito";

describe("Operaciones del carrito", () => {
  // Datos ficticios: estas pruebas no modifican el catálogo real.
  const torta = {
    codigo: "PRUEBA01",
    nombre: "Torta de prueba",
    precio: 10000,
    imagen: "/img/prueba.jpg",
    disponible: true,
  };

  const postre = {
    codigo: "PRUEBA02",
    nombre: "Postre de prueba",
    precio: 5000,
    imagen: "/img/postre.jpg",
    disponible: true,
  };

  // 1. Un producto nuevo debe comenzar con una unidad.
  it("agrega un producto a un carrito vacío", () => {
    const resultado = agregarProducto([], torta);

    expect(resultado.length).toBe(1);
    expect(resultado[0].codigo).toBe("PRUEBA01");
    expect(resultado[0].cantidad).toBe(1);
    expect(resultado[0].precio).toBe(10000);
  });

  // 2. Repetir un producto aumenta su cantidad, sin duplicar la entrada.
  it("aumenta la cantidad al agregar el mismo producto", () => {
    const carrito = agregarProducto([], torta);
    const resultado = agregarProducto(carrito, torta);

    expect(resultado.length).toBe(1);
    expect(resultado[0].cantidad).toBe(2);

    // Comprueba que no se modificó directamente la lista anterior.
    expect(carrito[0].cantidad).toBe(1);
  });

  // 3. Un producto diferente debe ocupar su propia entrada.
  it("mantiene separados los productos con distintos códigos", () => {
    const carrito = agregarProducto([], torta);
    const resultado = agregarProducto(carrito, postre);

    expect(resultado.length).toBe(2);
    expect(resultado[0].codigo).toBe("PRUEBA01");
    expect(resultado[1].codigo).toBe("PRUEBA02");
  });

  // 4. No permite agregar productos marcados como no disponibles.
  it("rechaza un producto no disponible", () => {
    const resultado = agregarProducto([], {
      ...torta,
      disponible: false,
    });

    expect(resultado).toEqual([]);
  });

  // 5. Cambiar una cantidad no debe afectar a los demás productos.
  it("cambia únicamente la cantidad del producto seleccionado", () => {
    const carrito = [
      { ...torta, cantidad: 1 },
      { ...postre, cantidad: 2 },
    ];

    const resultado = cambiarCantidad(carrito, "PRUEBA01", 3);

    expect(resultado[0].cantidad).toBe(3);
    expect(resultado[1].cantidad).toBe(2);
    expect(carrito[0].cantidad).toBe(1);
  });

  // 6. Solo se permiten cantidades enteras mayores que cero.
  it("rechaza cantidades cero, negativas y decimales", () => {
    const carrito = [{ ...torta, cantidad: 2 }];

    expect(cambiarCantidad(carrito, "PRUEBA01", 0)).toEqual(carrito);
    expect(cambiarCantidad(carrito, "PRUEBA01", -1)).toEqual(carrito);
    expect(cambiarCantidad(carrito, "PRUEBA01", 1.5)).toEqual(carrito);
  });

  // 7. Eliminar debe conservar los otros productos.
  it("elimina únicamente el producto seleccionado", () => {
    const carrito = [
      { ...torta, cantidad: 1 },
      { ...postre, cantidad: 2 },
    ];

    const resultado = eliminarProducto(carrito, "PRUEBA01");

    expect(resultado.length).toBe(1);
    expect(resultado[0].codigo).toBe("PRUEBA02");
    expect(carrito.length).toBe(2);
  });

  // 8. El total considera el precio y la cantidad de cada entrada.
  it("calcula el total de productos con diferentes cantidades", () => {
    const carrito = [
      { ...torta, cantidad: 2 },
      { ...postre, cantidad: 3 },
    ];

    // Dos tortas de 10000 y tres postres de 5000 suman 35000.
    expect(calcularTotal(carrito)).toBe(35000);
  });

  // 9. Un carrito vacío no debe producir totales incorrectos.
  it("devuelve total y unidades en cero para un carrito vacío", () => {
    expect(calcularTotal([])).toBe(0);
    expect(contarProductos([])).toBe(0);
  });

  // 10. El contador del encabezado representa unidades, no tipos de producto.
  it("cuenta todas las unidades del carrito", () => {
    const carrito = [
      { ...torta, cantidad: 2 },
      { ...postre, cantidad: 3 },
    ];

    expect(contarProductos(carrito)).toBe(5);
  });
});
