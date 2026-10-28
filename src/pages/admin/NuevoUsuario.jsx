import { Link, useNavigate } from "react-router-dom";
import FormularioUsuario from "../../components/FormularioUsuario";
import { useUsuarios } from "../../hooks/useUsuarios.js";
import "./NuevoUsuario.css";
export default function NuevoUsuario() { const { crear } = useUsuarios(); const navegar = useNavigate();
  function enviar(datos) { const r = crear(datos, { desdeAdmin: true }); if (r.ok) navegar("/admin/usuarios"); return r; }
  return <section className="lucia-contenedor"><h1>Nuevo usuario</h1><FormularioUsuario enviar={enviar} administrador/><p><Link to="/admin/usuarios">Volver</Link></p></section>;
}
