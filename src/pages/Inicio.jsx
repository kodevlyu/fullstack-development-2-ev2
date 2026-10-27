import { Link } from "react-router-dom";
import Catalogo from "../components/Catalogo";
import "./Inicio.css";

function Inicio({ productos = [], agregarAlCarrito }) {
  const tortaEspecial = productos.find((producto) => producto.codigo === "ES001");

  return (
    <div className="inicio-ea2">
      <section className="inicio-hero" aria-labelledby="inicio-titulo">
        <div className="inicio-hero-contenido">
          <p className="inicio-etiqueta">Tradición y sabor para cada celebración</p>
          <h1 id="inicio-titulo">
            <span>Momentos inolvidables</span>
            <em>comienzan con</em>
            <strong>algo dulce</strong>
          </h1>
          <p>Descubre tortas, postres y productos especiales preparados para acompañar tus celebraciones.</p>
          <div className="inicio-acciones">
            <Link className="inicio-boton inicio-boton-principal" to="/productos">Ver productos</Link>
            <Link className="inicio-boton inicio-boton-secundario" to="/nosotros">Conocer nuestra historia</Link>
          </div>
        </div>
        <div className="inicio-hero-visual">
          <img src="/img/hero-pasteleria.jpeg" alt="Torta artesanal decorada con crema y frutos rojos" />
          <div className="inicio-sello"><strong>50</strong><span>años creando recuerdos</span></div>
          <span className="inicio-nota">Hecho con cariño</span>
        </div>
      </section>

      <section className="inicio-experiencia" aria-labelledby="inicio-experiencia-titulo">
        <div className="inicio-seccion-cabecera">
          <p className="inicio-sobrelinea">Nuestra esencia</p>
          <h2 id="inicio-experiencia-titulo">Cada detalle está pensado para celebrar</h2>
          <p>Combinamos tradición, creatividad y dedicación para transformar cada pedido en un recuerdo especial.</p>
        </div>
        <div className="inicio-beneficios">
          <article><span>01</span><h3>Preparación artesanal</h3><p>Elaboramos cada producto con dedicación e ingredientes seleccionados.</p></article>
          <article><span>02</span><h3>Opciones para todos</h3><p>Contamos con alternativas veganas, sin azúcar y libres de gluten.</p></article>
          <article><span>03</span><h3>Detalles personalizados</h3><p>Creamos tortas y mensajes especiales para acompañar cada ocasión.</p></article>
        </div>
      </section>

      {tortaEspecial && (
        <section className="inicio-especial" aria-labelledby="inicio-especial-titulo">
          <div className="inicio-especial-foto">
            <img src={tortaEspecial.imagen} alt={tortaEspecial.nombre} />
          </div>
          <div className="inicio-especial-texto">
            <p className="inicio-sobrelinea">Nuestra torta especial</p>
            <h2 id="inicio-especial-titulo">{tortaEspecial.nombre}</h2>
            <p>{tortaEspecial.descripcion}</p>
            <p className="inicio-especial-precio">{new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP", maximumFractionDigits: 0 }).format(tortaEspecial.precio)}</p>
            <p className="inicio-especial-stock">
              {!tortaEspecial.disponible ? "No disponible" : !Number.isInteger(tortaEspecial.stock) || tortaEspecial.stock < 0 ? "Stock pendiente" : tortaEspecial.stock === 0 ? "Sin stock" : `Quedan ${tortaEspecial.stock} unidades`}
            </p>
            <Link className="inicio-boton inicio-boton-principal" to={`/producto/${tortaEspecial.codigo}`}>Ver torta especial</Link>
          </div>
        </section>
      )}

      {/* Catálogo compartido con la página Productos y el carrito. */}
      <Catalogo productos={productos} agregarAlCarrito={agregarAlCarrito} />

      <section className="inicio-contacto" aria-labelledby="inicio-contacto-titulo">
        <p className="inicio-sobrelinea">Hagamos algo especial</p>
        <h2 id="inicio-contacto-titulo">¿Tienes una celebración en mente?</h2>
        <p>Cuéntanos tu idea y te ayudaremos a encontrar una opción para ese momento especial.</p>
        <Link className="inicio-boton inicio-boton-principal" to="/contacto">Hablemos de tu celebración</Link>
      </section>
    </div>
  );
}

export default Inicio;
