import { Link } from "react-router-dom";
import { useUsuarios } from "../../hooks/useUsuarios.js";
import "./UsuariosAdmin.css";

export default function UsuariosAdmin() {
  const { usuarios, eliminar, errorPersistencia } = useUsuarios();

  function confirmarEliminacion(usuario) {
    if (window.confirm(`¿Eliminar a ${usuario.nombre}?`)) {
      eliminar(usuario.id);
    }
  }

  return (
    <section className="lucia-contenedor usuarios-admin">
      <div className="usuarios-admin-encabezado">
        <h1>Administración de usuarios</h1>
        <p>Datos de demostración almacenados en este navegador.</p>

        <Link
          to="/admin/usuario/nuevo"
          className="usuarios-admin-crear"
        >
          <span aria-hidden="true">+</span>
          Crear usuario
        </Link>
      </div>

      {errorPersistencia && (
        <p role="alert" className="lucia-error">
          {errorPersistencia}
        </p>
      )}

      <div className="lucia-tabla-wrap usuarios-admin-tabla-wrap">
        <table className="lucia-tabla usuarios-admin-tabla">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Rol</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {usuarios.map((usuario) => (
              <tr key={usuario.id}>
                <td>{usuario.nombre}</td>
                <td>{usuario.correo}</td>
                <td>
                  <span className="usuarios-admin-rol">
                    {usuario.rol}
                  </span>
                </td>

                <td>
                  <div className="usuarios-admin-acciones">
                    <Link
                      to={`/admin/usuario/${usuario.id}`}
                      className="usuarios-admin-accion"
                    >
                      <span aria-hidden="true">◉</span>
                      Detalle
                    </Link>

                    <Link
                      to={`/admin/usuario/${usuario.id}/editar`}
                      className="usuarios-admin-accion"
                    >
                      <span aria-hidden="true">✎</span>
                      Editar
                    </Link>

                    <button
                      type="button"
                      className="usuarios-admin-accion usuarios-admin-eliminar"
                      onClick={() => confirmarEliminacion(usuario)}
                    >
                      <span aria-hidden="true">✕</span>
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {!usuarios.length && (
        <p>No hay usuarios registrados.</p>
      )}
    </section>
  );
}
