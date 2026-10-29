import { useRef, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Alert,
} from "react-bootstrap";

import { formatoPrecio } from "../utils/formatoPrecio";
import { regionesComunas } from "../data/regionesComunas";
import { validarPedido } from "../utils/validarPedido";
import { guardarPedido } from "../utils/guardarPedido";
import { descontarStockPedido } from "../utils/descontarStockPedido";

function Checkout({
  sesion = null,
  productos = [],
  actualizarProductos = () => false,
  codigoCupon = "",
  vaciarCarrito = () => {},
  carrito = [],
  subtotal = 0,
  descuento = 0,
  total = 0,
}) {
  const [datos, setDatos] = useState({
    nombre: sesion?.nombre ?? "",
    correo: sesion?.correo ?? "",
    telefono: "",
    direccion: "",
    numero: "",
    region: "",
    comuna: "",
    observaciones: "",
  });

  const [validado, setValidado] = useState(false);
  const [datosConfirmados, setDatosConfirmados] = useState(false);
  const [pedidoConfirmado, setPedidoConfirmado] = useState(null);
  const [errorPedido, setErrorPedido] = useState("");
  const procesandoCompra = useRef(false);

  function actualizarCampo(evento) {
    const { name, value } = evento.target;

    setDatos((anteriores) => ({
      ...anteriores,
      [name]: value,
      ...(name === "region" ? { comuna: "" } : {}),
    }));

    setDatosConfirmados(false);
  }

  function confirmarDatos(evento) {
    evento.preventDefault();

    const formulario = evento.currentTarget;
    setValidado(true);

    if (!formulario.checkValidity() || carrito.length === 0) {
      return;
    }

    setDatosConfirmados(true);
  }

  function confirmarCompra() {
    if (procesandoCompra.current || pedidoConfirmado) return;
    setErrorPedido("");

    if (!datosConfirmados || sesion?.rol !== "cliente") {
      setErrorPedido("Debes validar tus datos e iniciar sesión como cliente.");
      return;
    }

    const validacion = validarPedido(carrito, productos, codigoCupon);

    if (!validacion.valido) {
      setErrorPedido(validacion.mensaje);
      return;
    }

    if (validacion.mensaje) {
      setErrorPedido(validacion.mensaje);
      return;
    }

    const pedido = {
      id: globalThis.crypto?.randomUUID?.() ?? String(Date.now()),
      fecha: new Date().toISOString(),
      clienteId: sesion.id,
      cliente: {
        nombre: sesion.nombre,
        correo: sesion.correo,
      },
      entrega: {
        telefono: datos.telefono,
        direccion: datos.direccion,
        numero: datos.numero,
        region: datos.region,
        comuna: datos.comuna,
        observaciones: datos.observaciones,
      },
      items: validacion.items,
      subtotal: validacion.subtotal,
      descuento: validacion.descuento,
      total: validacion.total,
      codigoCupon: validacion.codigoCupon,
      estado: "confirmado",
      pago: "simulado",
    };

    const nuevosProductos = descontarStockPedido(
      productos,
      validacion.items
    );

    if (!nuevosProductos) {
      setErrorPedido("No se pudo actualizar el inventario.");
      return;
    }

    procesandoCompra.current = true;

    // Guardar el inventario antes de confirmar el pedido.
    if (!actualizarProductos(nuevosProductos)) {
      procesandoCompra.current = false;
      setErrorPedido("No se pudo guardar el inventario.");
      return;
    }

    if (!guardarPedido(pedido)) {
      // Restaurar inventario si el pedido no pudo guardarse.
      const restaurado = actualizarProductos(productos);
      procesandoCompra.current = false;
      setErrorPedido(
        restaurado
          ? "No se pudo guardar el pedido. Inténtalo nuevamente."
          : "Error de almacenamiento. Revisa el inventario antes de reintentar."
      );
      return;
    }

    setPedidoConfirmado(pedido);
    vaciarCarrito();
  }

  if (pedidoConfirmado) {
    return (
      <Container className="py-5">
        <Alert variant="success" role="status">
          <h1>Compra simulada confirmada</h1>
          <p>Número de pedido: {pedidoConfirmado.id}</p>
          <p>Total: {formatoPrecio(pedidoConfirmado.total)}</p>
          <p>No se realizó ningún cobro real.</p>
        </Alert>
      </Container>
    );
  }

  if (carrito.length === 0) {
    return (
      <Container className="py-5">
        <Alert variant="warning">
          Tu carrito está vacío. Agrega productos antes de
          continuar con el checkout.
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <h1 className="mb-4">Finalizar compra</h1>

      <Row className="g-4">
        <Col lg={7}>
          <Card>
            <Card.Body>
              <h2 className="h4 mb-4">Datos de entrega</h2>

              <Form
                noValidate
                validated={validado}
                onSubmit={confirmarDatos}
              >
                <Form.Group
                  className="mb-3"
                  controlId="checkout-nombre"
                >
                  <Form.Label>Nombre completo</Form.Label>
                  <Form.Control
                    required
                    name="nombre"
                    readOnly
                    value={datos.nombre}
                    onChange={actualizarCampo}
                    maxLength={100}
                  />
                  <Form.Control.Feedback type="invalid">
                    Ingresa tu nombre.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group
                  className="mb-3"
                  controlId="checkout-correo"
                >
                  <Form.Label>Correo electrónico</Form.Label>
                  <Form.Control
                    required
                    type="email"
                    name="correo"
                    readOnly
                    value={datos.correo}
                    onChange={actualizarCampo}
                    maxLength={150}
                  />
                  <Form.Control.Feedback type="invalid">
                    Ingresa un correo válido.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group
                  className="mb-3"
                  controlId="checkout-telefono"
                >
                  <Form.Label>Teléfono</Form.Label>
                  <Form.Control
                    required
                    type="tel"
                    name="telefono"
                    value={datos.telefono}
                    onChange={actualizarCampo}
                    pattern="[+]?[0-9 ]{8,16}"
                    placeholder="+56912345678"
                  />
                  <Form.Control.Feedback type="invalid">
                    Ingresa un teléfono válido.
                  </Form.Control.Feedback>
                </Form.Group>

                <Row>
                  <Col md={8}>
                    <Form.Group
                      className="mb-3"
                      controlId="checkout-direccion"
                    >
                      <Form.Label>Calle o dirección</Form.Label>
                      <Form.Control
                        required
                        name="direccion"
                        value={datos.direccion}
                        onChange={actualizarCampo}
                        maxLength={150}
                      />
                      <Form.Control.Feedback type="invalid">
                        Ingresa tu dirección.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  <Col md={4}>
                    <Form.Group
                      className="mb-3"
                      controlId="checkout-numero"
                    >
                      <Form.Label>Número</Form.Label>
                      <Form.Control
                        required
                        name="numero"
                        value={datos.numero}
                        onChange={actualizarCampo}
                        maxLength={20}
                      />
                      <Form.Control.Feedback type="invalid">
                        Ingresa el número.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group
                      className="mb-3"
                      controlId="checkout-region"
                    >
                      <Form.Label>Región</Form.Label>
                      <Form.Select
                        required
                        name="region"
                        value={datos.region}
                        onChange={actualizarCampo}
                      >
                        <option value="">
                          Selecciona una región
                        </option>
                        {Object.keys(regionesComunas).map((region) => (
                          <option key={region} value={region}>
                            {region}
                          </option>
                        ))}
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        Selecciona una región.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group
                      className="mb-3"
                      controlId="checkout-comuna"
                    >
                      <Form.Label>Comuna</Form.Label>
                      <Form.Select
                        required
                        name="comuna"
                        value={datos.comuna}
                        onChange={actualizarCampo}
                        disabled={!datos.region}
                      >
                        <option value="">
                          {datos.region
                            ? "Selecciona una comuna"
                            : "Selecciona una región primero"}
                        </option>
                        {(regionesComunas[datos.region] ?? []).map((comuna) => (
                          <option key={comuna} value={comuna}>
                            {comuna}
                          </option>
                        ))}
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        Ingresa tu comuna.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group
                  className="mb-4"
                  controlId="checkout-observaciones"
                >
                  <Form.Label>
                    Observaciones (opcional)
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="observaciones"
                    value={datos.observaciones}
                    onChange={actualizarCampo}
                    maxLength={500}
                  />
                </Form.Group>

                <Button type="submit" variant="primary">
                  Confirmar datos de entrega
                </Button>
              </Form>

              {datosConfirmados && (
                <Alert
                  variant="success"
                  className="mt-3"
                  role="status"
                >
                  Datos de entrega validados. El siguiente
                  paso será continuar al pago simulado.
                </Alert>
              )}

              {datosConfirmados && (
                <Button
                  type="button"
                  variant="success"
                  className="mt-3"
                  onClick={confirmarCompra}
                >
                  Confirmar compra simulada
                </Button>
              )}

              {errorPedido && (
                <Alert variant="danger" role="alert" className="mt-3">
                  {errorPedido}
                </Alert>
              )}
            </Card.Body>
          </Card>
        </Col>

        <Col lg={5}>
          <Card>
            <Card.Body>
              <h2 className="h4 mb-3">
                Resumen de compra
              </h2>

              {carrito.map((item) => (
                <div
                  key={item.codigo}
                  className="d-flex justify-content-between gap-3 mb-2"
                >
                  <span>
                    {item.nombre} × {item.cantidad}
                  </span>
                  <span>
                    {formatoPrecio(
                      item.precio * item.cantidad,
                    )}
                  </span>
                </div>
              ))}

              <hr />

              <div className="d-flex justify-content-between">
                <span>Subtotal</span>
                <strong>
                  {formatoPrecio(subtotal)}
                </strong>
              </div>

              {descuento > 0 && (
                <div className="d-flex justify-content-between text-success mt-2">
                  <span>Descuento</span>
                  <strong>
                    −{formatoPrecio(descuento)}
                  </strong>
                </div>
              )}

              <hr />

              <div className="d-flex justify-content-between">
                <strong>Total a pagar</strong>
                <strong>
                  {formatoPrecio(total)}
                </strong>
              </div>

              <p className="text-muted small mt-3 mb-0">
                No se realizará ningún cobro real.
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Checkout;
