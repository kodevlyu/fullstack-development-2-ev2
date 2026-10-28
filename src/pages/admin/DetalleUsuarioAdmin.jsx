import { Link, useParams } from "react-router-dom";
import { useUsuarios } from "../../hooks/useUsuarios.js";
import "./DetalleUsuarioAdmin.css";
export default function DetalleUsuarioAdmin() { const { id } = useParams(); const { usuarios } = useUsuarios(); const u = usuarios.find(x => x.id === id);
  if (!u) return <section className="lucia-contenedor"><h1>Usuario no encontrado</h1><Link to="/admin/usuarios">Volver</Link></section>;
  return <section className="lucia-contenedor"><h1>Detalle del usuario</h1><p><strong>Nombre:</strong> {u.nombre}</p><p><strong>Apellidos:</strong> {u.apellidos ?? "No registrado"}</p><p><strong>RUN:</strong> {u.run ?? "No registrado"}</p><p><strong>Dirección:</strong> {u.direccion ?? "No registrada"}</p><p><strong>Correo:</strong> {u.correo}</p><p><strong>Región:</strong> {u.region}</p><p><strong>Comuna:</strong> {u.comuna}</p><p><strong>Rol:</strong> {u.rol}</p><Link to={`/admin/usuario/${id}/editar`}>Editar</Link>{" · "}<Link to="/admin/usuarios">Volver</Link></section>;
}
