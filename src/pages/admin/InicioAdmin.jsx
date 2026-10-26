import { Link } from "react-router-dom";

// Estilos exclusivos del inicio de administración.
import "./InicioAdmin.css";

function InicioAdmin() {
  return (
    <div className="admin-inicio">
      {/* Presentación conservada del proyecto original. */}
      <section className="admin-presentacion">
        <p className="admin-etiqueta">Panel de administración</p>
        <h1>Bienvenido al área de gestión</h1>
        <p>
          Desde aquí puedes acceder a los módulos administrativos de la
          pastelería.
        </p>
      </section>

      {/* Accesos a los módulos del equipo y al sitio público. */}
      <section className="admin-grid" aria-label="Módulos de administración">
        <article className="admin-tarjeta">
          <span className="admin-numero">01</span>
          <h2>Productos</h2>
          <p>
            Revisa el catálogo y accede a las opciones para crear, mostrar o
            editar productos.
          </p>

          {/* Abre la ruta existente de administración de Rimsky. */}
          <Link to="/admin/productos" className="admin-boton">
            Administrar productos
          </Link>
        </article>

        <article className="admin-tarjeta">
          <span className="admin-numero">02</span>
          <h2>Usuarios</h2>
          <p>
            Accede al listado de usuarios y a sus opciones de administración.
          </p>

          {/* Se conectará cuando esté integrada la página de Lucía. */}
          <button
            type="button"
            className="admin-boton"
            aria-describedby="admin-usuarios-pendiente"
            disabled
          >
            Administrar usuarios
          </button>

          <small id="admin-usuarios-pendiente">
            Módulo pendiente de integración.
          </small>
        </article>

        <article className="admin-tarjeta">
          <span className="admin-numero">03</span>
          <h2>Sitio público</h2>
          <p>
            Regresa al Inicio para revisar la experiencia que verán los
            clientes.
          </p>

          {/* Regresa a la ruta de Inicio definida en router.jsx. */}
          <Link to="/" className="admin-boton admin-boton-secundario">
            Ver la tienda
          </Link>
        </article>
      </section>
    </div>
  );
}

export default InicioAdmin;
