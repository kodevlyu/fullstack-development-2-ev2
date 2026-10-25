import { Link } from "react-router-dom";

// Datos compartidos con DetalleBlog.jsx.
import blogs from "../data/blogs";

// Estilos del listado de artículos.
import "./Blogs.css";

function Blogs() {
  return (
    <section className="blogs" aria-labelledby="titulo-blogs">
      {/* Presentación de la página. */}
      <header className="blogs-presentacion">
        <p className="blogs-etiqueta">El blog de Mil Sabores</p>
        <h1 id="titulo-blogs">Historias para disfrutar</h1>
        <p>
          Descubre curiosidades y consejos del mundo de la pastelería. Un
          espacio para aprender y compartir algo dulce.
        </p>
      </header>

      {/* Crea una tarjeta por cada artículo de data/blogs.js. */}
      <div className="blogs-listado">
        {blogs.map((blog) => (
          <article className="blogs-tarjeta" key={blog.id}>
            {/* Imagen y descripción definidas en los datos del artículo. */}
            <img
              className="blogs-imagen"
              src={blog.imagen}
              alt={blog.textoAlternativo}
            />

            <div className="blogs-contenido">
              <h2>{blog.titulo}</h2>
              <p>{blog.resumen}</p>

              {/* Abre /blogs/1 o /blogs/2 mediante router.jsx. */}
              <Link to={`/blogs/${blog.id}`} className="blogs-boton">
                {blog.textoEnlace}
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Blogs;
