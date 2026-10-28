import { useContext, useState } from "react";
import { ContextoUsuarios } from "../context/contextoUsuarios.js";
import { validarContacto } from "../utils/validarContacto";
import "./Contacto.css";

function Contacto() {
  const { sesion = null } = useContext(ContextoUsuarios) ?? {};

  const [datos, setDatos] = useState({
    nombre: "",
    correo: "",
    comentario: "",
  });

  const [mensaje, setMensaje] = useState("");
  const [errores, setErrores] = useState({});

  const autenticado = Boolean(sesion);

  const datosFormulario = {
    nombre: autenticado ? sesion.nombre : datos.nombre,
    correo: autenticado ? sesion.correo : datos.correo,
    comentario: datos.comentario,
  };

  function actualizarCampo(evento) {
    const { name, value } = evento.target;

    setDatos(anterior => ({
      ...anterior,
      [name]: value,
    }));

    setMensaje("");
    setErrores(anterior => ({
      ...anterior,
      [name]: undefined,
    }));
  }

  function manejarFormulario(evento) {
    evento.preventDefault();

    const resultado = validarContacto(datosFormulario, sesion);

    setErrores(resultado.errores);
    setMensaje(
      resultado.valido
        ? "Consulta validada correctamente (demostración, no enviada)."
        : "Revisa los datos del formulario."
    );
  }

  return (
    <section className="contacto" aria-labelledby="titulo-contacto">
      <header className="contacto-presentacion">
        <h1 id="titulo-contacto">Conversemos</h1>
        <p>
          Cuéntanos tu idea o consulta. Queremos acompañarte en tu próxima
          celebración.
        </p>
      </header>

      <form className="contacto-formulario" onSubmit={manejarFormulario}>
        <div className="contacto-campo">
          <label htmlFor="nombre-contacto">Nombre</label>
          <input
            id="nombre-contacto"
            name="nombre"
            type="text"
            maxLength={100}
            autoComplete="name"
            value={datosFormulario.nombre}
            onChange={actualizarCampo}
            readOnly={autenticado}
            required
          />
        </div>

        <div className="contacto-campo">
          <label htmlFor="correo-contacto">Correo electrónico</label>
          <input
            id="correo-contacto"
            name="correo"
            type="email"
            maxLength={100}
            autoComplete="email"
            aria-describedby="ayuda-correo-contacto"
            value={datosFormulario.correo}
            onChange={actualizarCampo}
            readOnly={autenticado}
            required
          />
          <small id="ayuda-correo-contacto">
            {autenticado
              ? "Correo asociado a tu sesión."
              : "Usa un correo @duoc.cl, @profesor.duoc.cl o @gmail.com."}
          </small>
        </div>

        <div className="contacto-campo">
          <label htmlFor="comentario-contacto">Comentario</label>
          <textarea
            id="comentario-contacto"
            name="comentario"
            maxLength={500}
            rows={5}
            aria-describedby="contador-comentario"
            value={datos.comentario}
            onChange={actualizarCampo}
            required
          />
          <small id="contador-comentario">
            {datos.comentario.length} de 500 caracteres
          </small>
        </div>

        <button type="submit" className="contacto-boton">
          Validar consulta
        </button>

        {mensaje && (
          <p role="status" className="contacto-aviso">
            {mensaje}
          </p>
        )}

        {Object.entries(errores).map(([campo, error]) =>
          error ? (
            <p key={campo} role="alert">
              {error}
            </p>
          ) : null
        )}

        <p className="contacto-aclaracion">
          Formulario de demostración: la consulta no se envía ni se guarda.
        </p>
      </form>
    </section>
  );
}

export default Contacto;
