// Preparación básica de los casos del módulo de productos.
// La integración del runner Karma/Jasmine la coordina el equipo.
beforeEach(() => {
  localStorage.removeItem("productos");
});
afterEach(() => {
  document.body.innerHTML = "";
  localStorage.removeItem("productos");
});
