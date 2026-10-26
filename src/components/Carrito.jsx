import { Offcanvas } from "react-bootstrap";

// Reutiliza el formato de precios del proyecto.
import { formatoPrecio } from "../utils/formatoPrecio";

// Estilos exclusivos del panel del carrito.
import "./Carrito.css";

function Carrito({
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
      {/* El botón de cierre llama a la función recibida desde App.jsx. */}
      <Offcanvas.Header closeButton closeLabel="Cerrar carrito">
        <Offcanvas.Title id="titulo-carrito">Tu carrito</Offcanvas.Title>
      </Offcanvas.Header>

      <Offcanvas.Body>
        {/* Informa si el navegador no permite conservar los cambios. */}
        {errorGuardado && (
          <p className="carrito-error" role="alert">
            {errorGuardado}
          </p>
        )}

        {carrito.length === 0 ? (
          /* Mensaje inicial cuando todavía no hay productos. */
          <div className="carrito-vacio">
            <p>Tu carrito está vacío.</p>
            <p>Agrega productos desde el catálogo para comenzar.</p>
            <button type="button" className="carrito-boton" onClick={cerrar}>
              Cerrar carrito
            </button>
          </div>
        ) : (
          <>
            {/* Cada entrada representa un producto y su cantidad. */}
            <ul className="carrito-lista">
              {carrito.map((item) => (
                <li className="carrito-item" key={item.codigo}>
                  <img
                    className="carrito-imagen"
                    src={item.imagen}
                    alt={item.nombre}
                  />

                  <div className="carrito-informacion">
                    <h2>{item.nombre}</h2>

                    <p>Precio unitario: {formatoPrecio(item.precio)}</p>

                    {/* Los botones llaman a las funciones de useCarrito.js. */}
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
                        disabled={item.cantidad <= 1}
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
                        aria-label={`Sumar una unidad de ${item.nombre}`}
                      >
                        +
                      </button>
                    </div>

                    {/* Subtotal del producto según su cantidad actual. */}
                    <p className="carrito-subtotal">
                      Subtotal: {formatoPrecio(item.precio * item.cantidad)}
                    </p>

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
              ))}
            </ul>

            {/* Total calculado por useCarrito.js a partir de la lista. */}
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

              {/* Aclara el alcance actual del carrito académico. */}
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
