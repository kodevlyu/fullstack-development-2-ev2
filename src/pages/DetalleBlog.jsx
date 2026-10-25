import { Link, useParams } from "react-router-dom";

// Artículos compartidos con la página Blogs.jsx.
import blogs from "../data/blogs";

// Estilos del artículo, ubicados en la misma carpeta.
import "./DetalleBlog.css";

function DetalleBlog() {
  // Obtiene el id de la dirección que conectaremos en router.jsx.
  const { id } = useParams();

  // Busca el artículo correspondiente dentro de data/blogs.js.
  const blog = blogs.find((articulo) => articulo.id === id);

  // Muestra una explicación si la dirección contiene un id inexistente.
  if (!blog) {
    return (
      <section className="detalle-blog">
        <h1>Artículo no encontrado</h1>
        <p>El artículo que buscas no está disponible.</p>

        <Link to="/blogs" className="detalle-blog-boton">
          Volver al blog
        </Link>
      </section>
    );
  }

  return (
    <article className="detalle-blog">
      {/* Presentación del artículo seleccionado. */}
      <header className="detalle-blog-presentacion">
        <p className="detalle-blog-etiqueta">{blog.etiqueta}</p>
        <h1>{blog.titulo}</h1>
        <p>{blog.introduccion}</p>
      </header>

      {/* La imagen y su descripción provienen de blogs.js. */}
      <img
        className="detalle-blog-imagen"
        src={blog.imagen}
        alt={blog.textoAlternativo}
      />

      {/* Recorre las secciones del artículo y muestra sus párrafos. */}
      <div className="detalle-blog-contenido">
        {blog.secciones.map((seccion) => (
          <section key={seccion.titulo}>
            <h2>{seccion.titulo}</h2>

            {seccion.parrafos.map((parrafo) => (
              <p key={parrafo}>{parrafo}</p>
            ))}
          </section>
        ))}
      </div>

      {/* Regresa al listado mediante la ruta /blogs de router.jsx. */}
      <nav
        className="detalle-blog-navegacion"
        aria-label="Navegación del artículo"
      >
        <Link to="/blogs" className="detalle-blog-boton">
          Volver al blog
        </Link>
      </nav>
    </article>
  );
}

export default DetalleBlog;
