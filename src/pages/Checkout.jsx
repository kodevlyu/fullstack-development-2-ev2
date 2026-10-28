import { useState } from "react";
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

function Checkout({
  carrito = [],
  subtotal = 0,
  descuento = 0,
  total = 0,
}) {
  const [datos, setDatos] = useState({
    nombre: "",
    correo: "",
    telefono: "",
    direccion: "",
    numero: "",
    region: "",
    comuna: "",
    observaciones: "",
  });

  const [validado, setValidado] = useState(false);
  const [datosConfirmados, setDatosConfirmados] = useState(false);

  function actualizarCampo(evento) {
    const { name, value } = evento.target;

    setDatos((anteriores) => ({
      ...anteriores,
      [name]: value,
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
                        <option value="Metropolitana">
                          Metropolitana
                        </option>
                        <option value="Valparaiso">
                          Valparaíso
                        </option>
                        <option value="OHiggins">
                          O'Higgins
                        </option>
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
                      <Form.Control
                        required
                        name="comuna"
                        value={datos.comuna}
                        onChange={actualizarCampo}
                        maxLength={80}
                        placeholder="Ejemplo: Melipilla"
                      />
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
