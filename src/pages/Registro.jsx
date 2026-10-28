import { Link, useNavigate } from "react-router-dom";
import FormularioUsuario from "../components/FormularioUsuario";
import { useUsuarios } from "../hooks/useUsuarios.js";
import "./Registro.css";
export default function Registro() { const { crear } = useUsuarios(); const navegar = useNavigate();
  function enviar(datos) { const resultado = crear(datos); if (resultado.ok) navegar("/login", { state: { aviso: "Registro realizado. Inicia sesión." } }); return resultado; }
  return <section className="lucia-contenedor"><h1>Registro de clientes</h1><p>Demostración académica EA2: no utilices contraseñas reales.</p><FormularioUsuario enviar={enviar}/><p>¿Ya tienes cuenta? <Link to="/login">Iniciar sesión</Link></p></section>;
}
