import { useState } from "react";
import { Link } from "react-router-dom";
import { useUsuarios } from "../hooks/useUsuarios.js";
import FormularioUsuario from "../components/FormularioUsuario";
import "./Perfil.css";

export default function Perfil() {
  const { usuarios, sesion, actualizarMiPerfil } = useUsuarios();
  const [editando, setEditando] = useState(false);
  const [mensaje, setMensaje] = useState("");

  const usuario = usuarios.find(u => u.id === sesion?.id);

  if (!usuario) {
    return (
      <section className="perfil-pagina">
        <div className="perfil-tarjeta">
          <h1>Perfil no encontrado</h1>
          <Link to="/login">Volver al inicio de sesión</Link>
        </div>
      </section>
    );
  }

  function guardar(datos) {
    const resultado = actualizarMiPerfil(datos);

    if (resultado.ok) {
      setEditando(false);
      setMensaje("Tus datos se actualizaron correctamente.");
    }

    return resultado;
  }

  return (
    <section className="perfil-pagina">
      <div className="perfil-tarjeta">
        <div className="perfil-encabezado">
          <h1>Mi perfil</h1>
          <p>Consulta y administra los datos de tu cuenta.</p>
        </div>

        {mensaje && <p className="perfil-exito" role="status">{mensaje}</p>}

        {editando ? (
          <>
            <h2>Editar mis datos</h2>

            <FormularioUsuario
              inicial={usuario}
              enviar={guardar}
              editar
              bloquearRun
            />

            <button
              type="button"
              className="perfil-boton-secundario"
              onClick={() => setEditando(false)}
            >
              Cancelar
            </button>
          </>
        ) : (
          <>
            <div className="perfil-datos">
              <div><span>Nombre</span><strong>{usuario.nombre}</strong></div>
              <div><span>Apellidos</span><strong>{usuario.apellidos}</strong></div>
              <div><span>Correo</span><strong>{usuario.correo}</strong></div>
              <div><span>RUN</span><strong>{usuario.run}</strong></div>
              <div><span>Dirección</span><strong>{usuario.direccion}</strong></div>
              <div><span>Región</span><strong>{usuario.region}</strong></div>
              <div><span>Comuna</span><strong>{usuario.comuna}</strong></div>
              <div><span>Rol</span><strong>Cliente</strong></div>
            </div>

            <button
              type="button"
              className="perfil-boton-principal"
              onClick={() => {
                setMensaje("");
                setEditando(true);
              }}
            >
              Editar mis datos
            </button>

            <Link className="perfil-volver" to="/productos">
              ← Volver al catálogo
            </Link>
          </>
        )}
      </div>
    </section>
  );
}
