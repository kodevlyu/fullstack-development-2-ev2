import { Link } from "react-router-dom";

// Estilos exclusivos de esta página.
import "./Nosotros.css";

function Nosotros() {
  return (
    <div className="nosotros">
      {/* Presentación e historia de la pastelería. */}
      <section className="nosotros-presentacion">
        <div className="nosotros-contenido">
          <p className="nosotros-etiqueta">Nuestra historia</p>

          <h1>Una tradición que se comparte con cariño</h1>

          <p>
            En Pastelería Mil Sabores llevamos 50 años acompañando
            celebraciones. Queremos que cada torta y cada postre formen parte de
            un recuerdo especial.
          </p>

          <p>
            En 1995, Pastelería Mil Sabores participó en un récord Guinness.
            Además, apoya a estudiantes de gastronomía como parte de su
            compromiso con la comunidad.
          </p>

          {/* Abre el catálogo mediante la ruta definida en router.jsx. */}
          <Link to="/productos" className="nosotros-boton">
            Explorar productos
          </Link>
        </div>

        {/* Muestra la imagen guardada en public/img. */}
        <figure className="nosotros-visual">
          <img
            className="nosotros-imagen"
            src="/img/hero-pasteleria.jpeg"
            alt="Torta con crema y frutos rojos en una pastelería"
          />
          <figcaption>Nuestra pasión es compartir</figcaption>
        </figure>
      </section>

      {/* Presenta el propósito y los principios del negocio. */}
      <section className="nosotros-principios">
        <div className="nosotros-introduccion">
          <p className="nosotros-etiqueta">Lo que nos inspira</p>
          <h2>Más que preparar algo dulce</h2>
          <p>
            Nos mueve el cuidado de cada detalle y la alegría de acompañar los
            momentos importantes.
          </p>
        </div>

        {/* Nosotros.css adapta las tarjetas al tamaño de pantalla. */}
        <div className="nosotros-tarjetas">
          <article className="nosotros-tarjeta">
            <span className="nosotros-numero">01</span>
            <h3>Nuestra misión</h3>
            <p>
              Ofrecer productos de pastelería de calidad que acompañen las
              celebraciones de nuestros clientes, con una atención cercana y
              dedicada.
            </p>
          </article>

          <article className="nosotros-tarjeta">
            <span className="nosotros-numero">02</span>
            <h3>Nuestra visión</h3>
            <p>
              Ser una pastelería reconocida por su tradición, creatividad y
              capacidad de acercar sus sabores a más personas.
            </p>
          </article>

          <article className="nosotros-tarjeta">
            <span className="nosotros-numero">03</span>
            <h3>Nuestros valores</h3>
            <p>
              Trabajamos con dedicación, respeto y compromiso con la calidad,
              valorando la confianza de quienes nos eligen.
            </p>
          </article>
        </div>
      </section>

      {/* Invitación que conecta con el formulario de Contacto.jsx. */}
      <section className="nosotros-contacto">
        <p className="nosotros-etiqueta">Queremos conocerte</p>
        <h2>Tu próxima celebración comienza aquí</h2>
        <p>
          Cuéntanos qué tienes en mente y conversemos sobre cómo acompañar ese
          momento.
        </p>

        {/* Usa la ruta /contacto definida en router.jsx. */}
        <Link to="/contacto" className="nosotros-boton">
          Contáctanos
        </Link>
      </section>
    </div>
  );
}

export default Nosotros;
