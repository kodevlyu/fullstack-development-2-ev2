import { Link } from "react-router-dom";
import { useUsuarios } from "../../hooks/useUsuarios.js";
import "./UsuariosAdmin.css";
export default function UsuariosAdmin() {
  const { usuarios, eliminar, errorPersistencia } = useUsuarios();
  return <section className="lucia-contenedor"><h1>Administración de usuarios</h1><p>Datos de demostración almacenados en este navegador.</p><p><Link to="/admin/usuario/nuevo">Crear usuario</Link></p>
    {errorPersistencia && <p role="alert" className="lucia-error">{errorPersistencia}</p>}
    <div className="lucia-tabla-wrap"><table className="lucia-tabla"><thead><tr><th>Nombre</th><th>Correo</th><th>Rol</th><th>Acciones</th></tr></thead><tbody>{usuarios.map(u => <tr key={u.id}><td>{u.nombre}</td><td>{u.correo}</td><td>{u.rol}</td><td><Link to={`/admin/usuario/${u.id}`}>Detalle</Link>{" · "}<Link to={`/admin/usuario/${u.id}/editar`}>Editar</Link>{" · "}<button type="button" onClick={() => { if (window.confirm(`¿Eliminar a ${u.nombre}?`)) eliminar(u.id); }}>Eliminar</button></td></tr>)}</tbody></table></div>
    {!usuarios.length && <p>No hay usuarios registrados.</p>}</section>;
}
