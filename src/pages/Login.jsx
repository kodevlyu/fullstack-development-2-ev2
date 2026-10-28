import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useUsuarios } from "../hooks/useUsuarios.js";
import "./Login.css";
export default function Login() {
  const [correo, setCorreo] = useState(""); const [clave, setClave] = useState(""); const [error, setError] = useState("");
  const { ingresar, sesion, salir } = useUsuarios(); const navegar = useNavigate(); const location = useLocation();
  function submit(e) { e.preventDefault(); const r = ingresar(correo, clave); if (!r.ok) setError(r.mensaje); else navegar(r.usuario.rol === "admin" ? "/admin/usuarios" : "/", { replace: true }); }
  return <section className="lucia-contenedor"><h1>Iniciar sesión</h1><p>Acceso simulado para evaluación frontend. No ingresar contraseñas personales.</p>
    {location.state?.aviso && <p role="status">{location.state.aviso}</p>}
    {sesion ? <><p>Sesión iniciada como {sesion.nombre} ({sesion.rol}).</p><button className="lucia-accion" onClick={() => { salir(); navegar("/"); }}>Cerrar sesión</button></> : <form className="lucia-form" onSubmit={submit}><label>Correo<input type="email" value={correo} onChange={e => setCorreo(e.target.value)} required autoComplete="email"/></label><label>Contraseña<input type="password" value={clave} onChange={e => setClave(e.target.value)} required autoComplete="current-password"/></label>{error && <p role="alert" className="lucia-error">{error}</p>}<button type="submit">Ingresar</button></form>}
    <p>¿No tienes cuenta? <Link to="/registro">Regístrate</Link></p></section>;
}
