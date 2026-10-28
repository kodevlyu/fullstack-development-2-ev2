import { useState } from "react";
import { regionesComunas } from "../data/regionesComunas";
import "../pages/UsuarioFormulario.css";
export default function FormularioUsuario({ inicial = {}, enviar, editar = false, administrador = false }) {
  const [datos, setDatos] = useState({ run: inicial.run ?? "", nombre: inicial.nombre ?? "", apellidos: inicial.apellidos ?? "", direccion: inicial.direccion ?? "", correo: inicial.correo ?? "", clave: "", confirmacion: "", region: inicial.region ?? "", comuna: inicial.comuna ?? "", rol: inicial.rol ?? "cliente" });
  const [errores, setErrores] = useState({});
  const [mensaje, setMensaje] = useState("");
  function cambiar(e) { const { name, value } = e.target; setDatos(d => ({ ...d, [name]: value, ...(name === "region" ? { comuna: "" } : {}) })); }
  function submit(e) { e.preventDefault(); const resultado = enviar(datos); if (!resultado.ok) { setErrores(resultado.errores ?? {}); setMensaje(resultado.mensaje ?? "Revisa los campos indicados."); } else { setErrores({}); setMensaje("Operación realizada correctamente."); } }
  return <form className="lucia-form" onSubmit={submit} noValidate>
    <label>RUN (sin puntos ni guion)<input name="run" value={datos.run} onChange={cambiar} maxLength={9} required />{errores.run && <small className="lucia-error">{errores.run}</small>}</label>
    <label>Nombre<input name="nombre" autoComplete="given-name" value={datos.nombre} onChange={cambiar} maxLength={50} required />{errores.nombre && <small className="lucia-error">{errores.nombre}</small>}</label>
    <label>Apellidos<input name="apellidos" autoComplete="family-name" value={datos.apellidos} onChange={cambiar} maxLength={100} required />{errores.apellidos && <small className="lucia-error">{errores.apellidos}</small>}</label>
    <label>Correo electrónico<input name="correo" type="email" autoComplete="email" value={datos.correo} onChange={cambiar} maxLength={100} required />{errores.correo && <small className="lucia-error">{errores.correo}</small>}</label>
    <label>Contraseña {editar && "(dejar vacía para conservar)"}<input name="clave" type="password" autoComplete="new-password" value={datos.clave} onChange={cambiar} required={!editar} />{errores.clave && <small className="lucia-error">{errores.clave}</small>}</label>
    <label>Confirmar contraseña<input name="confirmacion" type="password" autoComplete="new-password" value={datos.confirmacion} onChange={cambiar} required={!editar} />{errores.confirmacion && <small className="lucia-error">{errores.confirmacion}</small>}</label>
    <label>Dirección<input name="direccion" value={datos.direccion} onChange={cambiar} maxLength={300} required />{errores.direccion && <small className="lucia-error">{errores.direccion}</small>}</label>
    <label>Región<select name="region" value={datos.region} onChange={cambiar} required><option value="">Selecciona una región</option>{Object.keys(regionesComunas).map(r => <option key={r} value={r}>{r}</option>)}</select>{errores.region && <small className="lucia-error">{errores.region}</small>}</label>
    <label>Comuna<select name="comuna" value={datos.comuna} onChange={cambiar} required><option value="">Selecciona una comuna</option>{(regionesComunas[datos.region] ?? []).map(c => <option key={c} value={c}>{c}</option>)}</select>{errores.comuna && <small className="lucia-error">{errores.comuna}</small>}</label>
    {administrador && <label>Rol<select name="rol" value={datos.rol} onChange={cambiar}><option value="cliente">Cliente</option><option value="admin">Administrador (solo simulación)</option></select></label>}
    {mensaje && <p role="status" className={Object.keys(errores).length ? "lucia-error" : "lucia-exito"}>{mensaje}</p>}
    <button type="submit">{editar ? "Guardar cambios" : "Registrar usuario"}</button>
  </form>;
}
