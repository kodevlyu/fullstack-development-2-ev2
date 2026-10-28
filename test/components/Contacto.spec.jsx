import { act } from "react";
import { createRoot } from "react-dom/client";

// Formulario real que vamos a probar.
import Contacto from "../../src/pages/Contacto";

describe("Contacto", () => {
  let nodo;
  let raiz;

  // Monta un formulario nuevo antes de cada prueba.
  beforeEach(async () => {
    nodo = document.createElement("div");
    document.body.appendChild(nodo);
    raiz = createRoot(nodo);

    await act(async () => {
      raiz.render(<Contacto />);
    });
  });

  // Desmonta el componente al terminar cada prueba.
  afterEach(async () => {
    await act(async () => {
      raiz.unmount();
    });

    nodo.remove();
  });

  // Simula la escritura en el comentario utilizando el control del navegador.
  async function escribirComentario(texto) {
    const campo = nodo.querySelector("#comentario-contacto");

    // Usa el setter nativo para que React detecte el cambio simulado.
    const cambiarValor = Object.getOwnPropertyDescriptor(
      HTMLTextAreaElement.prototype,
      "value",
    ).set;

    await act(async () => {
      cambiarValor.call(campo, texto);
      campo.dispatchEvent(new Event("input", { bubbles: true }));
    });
  }

  // 1. Comprueba los campos obligatorios y sus límites configurados.
  it("muestra los tres campos con sus límites", () => {
    const nombre = nodo.querySelector("#nombre-contacto");
    const correo = nodo.querySelector("#correo-contacto");
    const comentario = nodo.querySelector("#comentario-contacto");

    expect(nodo.textContent).toContain("Conversemos");

    expect(nombre.required).toBe(true);
    expect(nombre.maxLength).toBe(100);

    expect(correo.required).toBe(true);
    expect(correo.type).toBe("email");
    expect(correo.maxLength).toBe(100);

    expect(comentario.required).toBe(true);
    expect(comentario.maxLength).toBe(500);
  });

  // 2. Comprueba que escribir modifica el contador visible.
  it("actualiza el contador al escribir un comentario", async () => {
    await escribirComentario("Hola");

    const contador = nodo.querySelector("#contador-comentario");

    expect(contador.textContent).toContain("4 de 500 caracteres");
    expect(nodo.querySelector("#comentario-contacto").value).toBe("Hola");
  });

  // 3. Comprueba que borrar el texto también actualiza el contador.
  it("devuelve el contador a cero al borrar el comentario", async () => {
    await escribirComentario("Hola");
    await escribirComentario("");

    const contador = nodo.querySelector("#contador-comentario");

    expect(contador.textContent).toContain("0 de 500 caracteres");
  });

  // 4. La validación de Lucía habilita la comprobación del formulario.
  it("permite validar consultas", () => {
    const boton = nodo.querySelector('button[type="submit"]');
    expect(boton.disabled).toBe(false);
    expect(nodo.textContent).toContain("Formulario de demostración");
  });
});
