// Comprueba que cada operación produzca el resultado esperado.
import assert from "node:assert/strict";

// Conecta la prueba con las operaciones del carrito.
import {
  agregarProducto,
  cambiarCantidad,
  eliminarProducto,
  calcularTotal,
  contarProductos,
} from "./src/utils/operacionesCarrito.js";

// Producto ficticio: no modifica el catálogo ni guarda datos.
const producto = {
  codigo: "PRUEBA",
  nombre: "Torta de prueba",
  precio: 10000,
  imagen: "",
  disponible: true,
};

let carrito = [];

// Agregar dos veces: una entrada con dos unidades.
carrito = agregarProducto(carrito, producto);
carrito = agregarProducto(carrito, producto);
assert.equal(carrito.length, 1);
assert.equal(contarProductos(carrito), 2);
assert.equal(calcularTotal(carrito), 20000);
console.log("OK: agregar y calcular total");

// Cambiar a tres unidades debe actualizar el total.
carrito = cambiarCantidad(carrito, "PRUEBA", 3);
assert.equal(contarProductos(carrito), 3);
assert.equal(calcularTotal(carrito), 30000);
console.log("OK: cambiar cantidad");

// Rechazar cantidad cero y conservar las tres unidades.
carrito = cambiarCantidad(carrito, "PRUEBA", 0);
assert.equal(contarProductos(carrito), 3);
console.log("OK: rechazar cantidad cero");

// Eliminar el producto debe dejar el carrito vacío.
carrito = eliminarProducto(carrito, "PRUEBA");
assert.equal(carrito.length, 0);
assert.equal(calcularTotal(carrito), 0);
console.log("OK: eliminar producto");

// Impedir que se agregue un producto no disponible.
carrito = agregarProducto(carrito, { ...producto, disponible: false });
assert.equal(carrito.length, 0);
console.log("OK: rechazar producto no disponible");

console.log("Todas las comprobaciones pasaron.");
