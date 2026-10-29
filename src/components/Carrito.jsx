
import { useState } from "react";
import { Button, Form, Offcanvas } from "react-bootstrap";

import { formatoPrecio } from "../utils/formatoPrecio";
import { permiteCantidad } from "../utils/stockCarrito";

import "./Carrito.css";

function Carrito({
  productos = [],
  mostrar,
  cerrar,
  irAlCheckout,
  carrito,
  subtotal = 0,
  descuento = 0,
  total,
  codigoCupon = "",
  mensajeCupon = "",
  resultadoCupon = null,
  aplicarCupon,
  quitarCupon,
  errorGuardado,
  actualizarCantidad,
  quitarDelCarrito,
  vaciarCarrito,
}) {
  const [cuponIngresado, setCuponIngresado] = useState("");

  // Envía el código al hook para validar el descuento.
  function enviarCupon(evento) {
    evento.preventDefault();

    if (!cuponIngresado.trim() || codigoCupon) {
      return;
    }

    aplicarCupon(cuponIngresado);
  }

  // Retira el descuento y limpia el formulario.
  function eliminarCupon() {
    quitarCupon();
    setCuponIngresado("");
  }

  // Vacía el carrito y limpia el formulario.
  function limpiarCarrito() {
    vaciarCarrito();
    setCuponIngresado("");
  }

  // El resultado vigente tiene prioridad sobre mensajes anteriores.
  const mensajeVisible = resultadoCupon
    ? resultadoCupon.mensaje
    : mensajeCupon;

  const cuponValido = resultadoCupon?.valido === true;

  const cuponInvalido =
    (resultadoCupon && !resultadoCupon.valido) ||
    (!resultadoCupon && Boolean(mensajeCupon));

  // Detecta si hay cantidades que ya no cumplen el stock.
  const stockValido = carrito.every((item) => {
    const productoActual = productos.find(
      (producto) => producto.codigo === item.codigo,
    );

    return permiteCantidad(productoActual, item.cantidad);
  });

  return (
    <Offcanvas
      show={mostrar}
      onHide={cerrar}
      placement="end"
      className="carrito-panel"
      aria-labelledby="titulo-carrito"
    >
      <Offcanvas.Header closeButton closeLabel="Cerrar carrito">
        <Offcanvas.Title id="titulo-carrito">
          Tu carrito
        </Offcanvas.Title>
      </Offcanvas.Header>

      <Offcanvas.Body>
        {/* Error de persistencia en localStorage. */}
        {errorGuardado && (
          <p className="carrito-error" role="alert">
            {errorGuardado}
          </p>
        )}

        {carrito.length === 0 ? (
          <div className="carrito-vacio">
            <p>Tu carrito está vacío.</p>

            <p>
              Agrega productos desde el catálogo para comenzar.
            </p>

            <Button
              type="button"
              variant="primary"
              onClick={cerrar}
            >
              Cerrar carrito
            </Button>
          </div>
        ) : (
          <>
            {/* Lista de productos del carrito. */}
            <ul className="carrito-lista">
              {carrito.map((item) => {
                const productoActual = productos.find(
                  (producto) =>
                    producto.codigo === item.codigo,
                );

                const puedeSumar = permiteCantidad(
                  productoActual,
                  item.cantidad + 1,
                );

                const puedeRestar = permiteCantidad(
                  productoActual,
                  item.cantidad - 1,
                );

                const cantidadValida = permiteCantidad(
                  productoActual,
                  item.cantidad,
                );

                return (
                  <li
                    className="carrito-item"
                    key={item.codigo}
                  >
                    <img
                      className="carrito-imagen"
                      src={item.imagen}
                      alt={item.nombre}
                    />

                    <div className="carrito-informacion">
                      <h2>{item.nombre}</h2>

                      <p>
                        Precio unitario:{" "}
                        {formatoPrecio(item.precio)}
                      </p>

                      {/* Controles de cantidad. */}
                      <div
                        className="carrito-cantidad"
                        role="group"
                        aria-label={`Cantidad de ${item.nombre}`}
                      >
                        <button
                          type="button"
                          className="carrito-control"
                          onClick={() =>
                            actualizarCantidad(
                              item.codigo,
                              item.cantidad - 1,
                            )
                          }
                          disabled={!puedeRestar}
                          aria-label={`Restar una unidad de ${item.nombre}`}
                        >
                          −
                        </button>

                        <span aria-live="polite">
                          {item.cantidad}
                        </span>

                        <button
                          type="button"
                          className="carrito-control"
                          onClick={() =>
                            actualizarCantidad(
                              item.codigo,
                              item.cantidad + 1,
                            )
                          }
                          disabled={!puedeSumar}
                          aria-label={`Sumar una unidad de ${item.nombre}`}
                        >
                          +
                        </button>
                      </div>

                      {/* Mensajes de disponibilidad. */}
                      {!cantidadValida && (
                        <p
                          className="carrito-error"
                          role="status"
                        >
                          La cantidad no está disponible o
                          falta confirmar el stock.
                          Puedes eliminar este producto.
                        </p>
                      )}

                      {cantidadValida && !puedeSumar && (
                        <p role="status">
                          Alcanzaste el stock disponible.
                        </p>
                      )}

                      <p className="carrito-subtotal">
                        Subtotal:{" "}
                        {formatoPrecio(
                          item.precio * item.cantidad,
                        )}
                      </p>

                      <button
                        type="button"
                        className="carrito-eliminar"
                        onClick={() =>
                          quitarDelCarrito(item.codigo)
                        }
                        aria-label={`Eliminar ${item.nombre} del carrito`}
                      >
                        Eliminar
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>

            {/* Resumen y descuentos. */}
            <div className="carrito-resumen">
              <div className="carrito-cupon">
                <h3>Cupón de descuento</h3>

                <Form onSubmit={enviarCupon}>
                  <Form.Group controlId="codigo-cupon">
                    <Form.Label>
                      Ingresa tu cupón
                    </Form.Label>

                    <Form.Control
                      type="text"
                      placeholder="Ejemplo: PASTEL10"
                      value={cuponIngresado}
                      onChange={(evento) =>
                        setCuponIngresado(
                          evento.target.value,
                        )
                      }
                      disabled={Boolean(codigoCupon)}
                      maxLength={30}
                    />
                  </Form.Group>

                  <div className="d-flex gap-2 mt-2">
                    {codigoCupon ? (
                      <Button
                        type="button"
                        variant="outline-secondary"
                        onClick={eliminarCupon}
                      >
                        Quitar cupón
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        variant="primary"
                        disabled={
                          !cuponIngresado.trim() ||
                          !stockValido
                        }
                      >
                        Aplicar cupón
                      </Button>
                    )}
                  </div>
                </Form>

                {codigoCupon && (
                  <p className="mt-2">
                    Cupón seleccionado:{" "}
                    <strong>{codigoCupon}</strong>
                  </p>
                )}

                {mensajeVisible && (
                  <p
                    role="status"
                    aria-live="polite"
                    className={
                      cuponInvalido
                        ? "text-danger mt-2"
                        : cuponValido
                          ? "text-success mt-2"
                          : "mt-2"
                    }
                  >
                    {mensajeVisible}
                  </p>
                )}
              </div>

              {/* Subtotal, descuento y total. */}
              <div className="carrito-totales mt-3">
                <p>
                  Subtotal: {formatoPrecio(subtotal)}
                </p>

                {descuento > 0 && (
                  <p className="text-success">
                    Descuento: −
                    {formatoPrecio(descuento)}
                  </p>
                )}

                <p
                  className="carrito-total"
                  aria-live="polite"
                >
                  Total a pagar: {formatoPrecio(total)}
                </p>
              </div>

              {!stockValido && (
                <p
                  className="carrito-error"
                  role="alert"
                >
                  Hay productos con stock insuficiente
                  o no disponible. Revisa las cantidades
                  antes de continuar.
                </p>
              )}

              {/* Navegación al checkout. */}
              <Button
                type="button"
                variant="success"
                className="w-100 mb-3"
                onClick={irAlCheckout}
                disabled={!stockValido}
              >
                Finalizar compra
              </Button>

              {/* Acciones originales del carrito. */}
              <div className="carrito-acciones">
                <button
                  type="button"
                  className="carrito-boton"
                  onClick={cerrar}
                >
                  Seguir comprando
                </button>

                <button
                  type="button"
                  className="carrito-boton carrito-boton-secundario"
                  onClick={limpiarCarrito}
                >
                  Vaciar carrito
                </button>
              </div>

              <p className="carrito-aclaracion">
                Este carrito no realiza pagos ni
                confirma pedidos.
              </p>
            </div>
          </>
        )}
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default Carrito;
