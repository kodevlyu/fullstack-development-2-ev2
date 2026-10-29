import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useUsuarios } from "../hooks/useUsuarios.js";
import ConfirmarCerrarSesion from "../components/ConfirmarCerrarSesion";
import "./Login.css";

export default function Login() {
  const [correo, setCorreo] = useState("");
  const [clave, setClave] = useState("");
  const [error, setError] = useState("");
  const [confirmacionAbierta, setConfirmacionAbierta] = useState(false);

  const { ingresar, sesion, salir } = useUsuarios();
  const navegar = useNavigate();
  const location = useLocation();

  function submit(evento) {
    evento.preventDefault();
    setError("");

    const resultado = ingresar(correo, clave);

    if (!resultado.ok) {
      setError(resultado.mensaje);
      return;
    }

    const destino = location.state?.from === "/checkout"
      ? "/checkout"
      : "/";

    navegar(
      resultado.usuario.rol === "admin"
        ? "/admin/usuarios"
        : destino,
      { replace: true }
    );
  }

  function cerrarSesion() {
    setConfirmacionAbierta(false);
    salir();
    navegar("/");
  }

  if (sesion) {
    const esAdmin = sesion.rol === "admin";

    return (
      <>
      <section className="login-pagina">
        <div className="login-tarjeta login-tarjeta-sesion">
          <div className="login-icono" aria-hidden="true">
            ✓
          </div>

          <h1>Sesión iniciada</h1>
          <p className="login-subtitulo">
            Bienvenido a Pastelería Mil Sabores
          </p>

          <div className="login-usuario">
            <span className="login-etiqueta">Usuario autenticado</span>
            <strong>{sesion.nombre}</strong>
            <span className="login-rol">
              {esAdmin ? "Administrador" : "Cliente"}
            </span>
          </div>

          <p className="login-descripcion">
            {esAdmin
              ? "Puedes administrar los productos y usuarios de la tienda."
              : "Tu cuenta está lista para continuar comprando."}
          </p>

          <div className="login-acciones">
            {!esAdmin && (
              <Link
                className="login-boton login-boton-principal"
                to="/perfil"
              >
                Mi perfil / Editar mis datos
              </Link>
            )}
            <Link
              className="login-boton login-boton-principal"
              to={esAdmin ? "/admin/usuarios" : "/productos"}
            >
              {esAdmin ? "Ir a Administración" : "Ir al catálogo"}
            </Link>

            <button
              type="button"
              className="login-boton login-boton-secundario"
              onClick={() => setConfirmacionAbierta(true)}
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </section>

      <ConfirmarCerrarSesion
        abierto={confirmacionAbierta}
        cancelar={() => setConfirmacionAbierta(false)}
        confirmar={cerrarSesion}
      />
      </>
    );
  }

  return (
    <section className="login-pagina">
      <div className="login-tarjeta">
        <h1>Iniciar sesión</h1>

        <p className="login-subtitulo">
          Ingresa a tu cuenta para continuar.
        </p>

        <p className="login-aviso">
          Acceso simulado para evaluación frontend.
          No ingresar contraseñas personales.
        </p>

        {location.state?.aviso && (
          <p className="login-mensaje" role="status">
            {location.state.aviso}
          </p>
        )}

        <form className="login-formulario" onSubmit={submit}>
          <label htmlFor="login-correo">Correo electrónico</label>
          <input
            id="login-correo"
            type="email"
            value={correo}
            onChange={(evento) => setCorreo(evento.target.value)}
            required
            autoComplete="email"
            placeholder="correo@ejemplo.cl"
          />

          <label htmlFor="login-clave">Contraseña</label>
          <input
            id="login-clave"
            type="password"
            value={clave}
            onChange={(evento) => setClave(evento.target.value)}
            required
            autoComplete="current-password"
            placeholder="Ingresa tu contraseña"
          />

          {error && (
            <p className="login-error" role="alert">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="login-boton login-boton-principal"
          >
            Ingresar
          </button>
        </form>

        <p className="login-registro">
          ¿No tienes cuenta? <Link to="/registro">Regístrate</Link>
        </p>
      </div>
    </section>
  );
}
