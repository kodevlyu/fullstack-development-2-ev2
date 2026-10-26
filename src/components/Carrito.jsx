import { Offcanvas } from "react-bootstrap";
import { formatoPrecio } from "../utils/formatoPrecio";
import { permiteCantidad } from "../utils/stockCarrito";
import "./Carrito.css";

function Carrito({
  productos = [],
  mostrar,
  cerrar,
  carrito,
  total,
  errorGuardado,
  actualizarCantidad,
  quitarDelCarrito,
  vaciarCarrito,
}) {
  return (
    <Offcanvas
      show={mostrar}
      onHide={cerrar}
      placement="end"
      className="carrito-panel"
      aria-labelledby="titulo-carrito"
    >
      {/* App.jsx controla la apertura y el cierre del panel. */}
      <Offcanvas.Header closeButton closeLabel="Cerrar carrito">
        <Offcanvas.Title id="titulo-carrito">Tu carrito</Offcanvas.Title>
      </Offcanvas.Header>

      <Offcanvas.Body>
        {/* Mensaje de useCarrito.js cuando falla el guardado. */}
        {errorGuardado && (
          <p className="carrito-error" role="alert">
            {errorGuardado}
          </p>
        )}

        {carrito.length === 0 ? (
          <div className="carrito-vacio">
            <p>Tu carrito está vacío.</p>
            <p>Agrega productos desde el catálogo para comenzar.</p>
            <button type="button" className="carrito-boton" onClick={cerrar}>
              Cerrar carrito
            </button>
          </div>
        ) : (
          <>
            {/* Comprueba cada cantidad contra el catálogo recibido de App. */}
            <ul className="carrito-lista">
              {carrito.map((item) => {
                const productoActual = productos.find(
                  (producto) => producto.codigo === item.codigo,
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
                  <li className="carrito-item" key={item.codigo}>
                    <img
                      className="carrito-imagen"
                      src={item.imagen}
                      alt={item.nombre}
                    />

                    <div className="carrito-informacion">
                      <h2>{item.nombre}</h2>
                      <p>Precio unitario: {formatoPrecio(item.precio)}</p>

                      {/* useCarrito.js valida nuevamente antes de guardar. */}
                      <div
                        className="carrito-cantidad"
                        role="group"
                        aria-label={`Cantidad de ${item.nombre}`}
                      >
                        <button
                          type="button"
                          className="carrito-control"
                          onClick={() =>
                            actualizarCantidad(item.codigo, item.cantidad - 1)
                          }
                          disabled={!puedeRestar}
                          aria-label={`Restar una unidad de ${item.nombre}`}
                        >
                          −
                        </button>

                        <span aria-live="polite">{item.cantidad}</span>

                        <button
                          type="button"
                          className="carrito-control"
                          onClick={() =>
                            actualizarCantidad(item.codigo, item.cantidad + 1)
                          }
                          disabled={!puedeSumar}
                          aria-label={`Sumar una unidad de ${item.nombre}`}
                        >
                          +
                        </button>
                      </div>

                      {/* Avisa si las unidades guardadas ya no están disponibles. */}
                      {!cantidadValida && (
                        <p className="carrito-error" role="status">
                          La cantidad no está disponible o falta confirmar el
                          stock. Puedes eliminar este producto.
                        </p>
                      )}

                      {cantidadValida && !puedeSumar && (
                        <p role="status">Alcanzaste el stock disponible.</p>
                      )}

                      <p className="carrito-subtotal">
                        Subtotal: {formatoPrecio(item.precio * item.cantidad)}
                      </p>

                      {/* Siempre se puede eliminar, incluso sin stock. */}
                      <button
                        type="button"
                        className="carrito-eliminar"
                        onClick={() => quitarDelCarrito(item.codigo)}
                        aria-label={`Eliminar ${item.nombre} del carrito`}
                      >
                        Eliminar
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>

            {/* Muestra el total calculado por useCarrito.js. */}
            <div className="carrito-resumen">
              <p className="carrito-total" aria-live="polite">
                Total: {formatoPrecio(total)}
              </p>

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
                  onClick={vaciarCarrito}
                >
                  Vaciar carrito
                </button>
              </div>

              <p className="carrito-aclaracion">
                Este carrito no realiza pagos ni confirma pedidos.
              </p>
            </div>
          </>
        )}
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default Carrito;
