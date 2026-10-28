import { Link, useNavigate, useParams } from "react-router-dom";
import FormularioUsuario from "../../components/FormularioUsuario";
import { useUsuarios } from "../../hooks/useUsuarios.js";
import "./EditarUsuario.css";
export default function EditarUsuario() { const { id } = useParams(); const { usuarios, actualizar } = useUsuarios(); const navegar = useNavigate(); const usuario = usuarios.find(u => u.id === id);
  if (!usuario) return <section className="lucia-contenedor"><h1>Usuario no encontrado</h1><Link to="/admin/usuarios">Volver</Link></section>;
  function enviar(datos) { const r = actualizar(id, datos); if (r.ok) navegar("/admin/usuarios"); return r; }
  return <section className="lucia-contenedor"><h1>Editar usuario</h1><FormularioUsuario inicial={usuario} enviar={enviar} editar administrador/><p><Link to="/admin/usuarios">Volver</Link></p></section>;
}
