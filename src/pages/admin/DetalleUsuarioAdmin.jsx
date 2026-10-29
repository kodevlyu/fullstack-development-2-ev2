import { Link, useParams } from "react-router-dom";
import { useUsuarios } from "../../hooks/useUsuarios.js";
import "./DetalleUsuarioAdmin.css";

export default function DetalleUsuarioAdmin() {
  const { id } = useParams();
  const { usuarios } = useUsuarios();
  const usuario = usuarios.find((u) => u.id === id);

  if (!usuario) {
    return (
      <section className="lucia-contenedor detalle-usuario-admin">
        <h1>Usuario no encontrado</h1>

        <div className="detalle-usuario-acciones">
          <Link
            to="/admin/usuarios"
            className="detalle-usuario-boton detalle-usuario-volver"
          >
            ← Volver al listado
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="lucia-contenedor detalle-usuario-admin">
      <h1>Detalle del usuario</h1>

      <div className="detalle-usuario-informacion">
        <p><strong>Nombre:</strong> {usuario.nombre}</p>
        <p><strong>Apellidos:</strong> {usuario.apellidos ?? "No registrado"}</p>
        <p><strong>RUN:</strong> {usuario.run ?? "No registrado"}</p>
        <p><strong>Dirección:</strong> {usuario.direccion ?? "No registrada"}</p>
        <p><strong>Correo:</strong> {usuario.correo}</p>
        <p><strong>Región:</strong> {usuario.region}</p>
        <p><strong>Comuna:</strong> {usuario.comuna}</p>
        <p><strong>Rol:</strong> {usuario.rol}</p>
      </div>

      <div className="detalle-usuario-acciones">
        <Link
          to={`/admin/usuario/${id}/editar`}
          className="detalle-usuario-boton detalle-usuario-editar"
        >
          ✎ Editar usuario
        </Link>

        <Link
          to="/admin/usuarios"
          className="detalle-usuario-boton detalle-usuario-volver"
        >
          ← Volver al listado
        </Link>
      </div>
    </section>
  );
}
