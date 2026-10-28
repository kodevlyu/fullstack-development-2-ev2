import { useUsuarios } from "../../hooks/useUsuarios";
import MenuAdmin from "../../components/MenuAdmin";
import "./UsuariosAdmin.css";

export default function UsuariosAdmin() {
  const { usuarios, eliminarUsuario } = useUsuarios();

  const handleEliminar = (run, nombre) => {
    if (window.confirm(`¿Estás seguro de eliminar al usuario ${nombre}?`)) {
      eliminarUsuario(run);
    }
  };

  return (
    <div className="usuarios-admin">
      <MenuAdmin />
      <h2>Gestión de Usuarios</h2>
      <p>Administra los usuarios registrados en la plataforma.</p>

      {usuarios.length === 0 ? (
        <p>No hay usuarios registrados.</p>
      ) : (
        <table className="usuarios-tabla">
          <thead>
            <tr>
              <th>RUN</th>
              <th>Nombre Completo</th>
              <th>Correo Electrónico</th>
              <th>Región / Comuna</th>
              <th>Rol</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((u) => (
              <tr key={u.run}>
                <td>{u.run}</td>
                <td>{`${u.nombre} ${u.apellidos || ""}`}</td>
                <td>{u.correo}</td>
                <td>{`${u.region || "-"} / ${u.comuna || "-"}`}</td>
                <td>
                  <span className={`badge ${u.rol === "admin" ? "bg-primary" : "bg-secondary"}`}>
                    {u.rol || "cliente"}
                  </span>
                </td>
                <td>
                  {u.rol !== "admin" && (
                    <button
                      className="btn-eliminar"
                      onClick={() => handleEliminar(u.run, u.nombre)}
                    >
                      Eliminar
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}