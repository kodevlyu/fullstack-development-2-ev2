import { useState } from "react";
import { validarContacto } from "../utils/validarContacto";
import "./Contacto.css";

function Contacto() {
  const [datos, setDatos] = useState({
    nombre: "",
    correo: "",
    comentario: "",
  });

  const [errores, setErrores] = useState({});
  const [mensajeExito, setMensajeExito] = useState("");

  function actualizarCampo(evento) {
    const { name, value } = evento.target;

    setDatos({
      ...datos,
      [name]: value,
    });

    if (errores[name]) {
      setErrores({
        ...errores,
        [name]: "",
      });
    }
  }

  function manejarFormulario(evento) {
    evento.preventDefault();
    setMensajeExito("");

    const resultado = validarContacto(datos);

    if (!resultado.valido) {
      setErrores(resultado.errores);
      return;
    }

    setErrores({});
    setMensajeExito("¡Consulta validada con éxito! Tu mensaje ha sido registrado.");
    setDatos({
      nombre: "",
      correo: "",
      comentario: "",
    });
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

      {mensajeExito && (
        <div className="contacto-exito" role="alert" style={{ padding: "1rem", marginBottom: "1rem", backgroundColor: "#d4edda", color: "#155724", borderRadius: "4px" }}>
          {mensajeExito}
        </div>
      )}

      <form className="contacto-formulario" onSubmit={manejarFormulario}>
        <div className="contacto-campo">
          <label htmlFor="nombre-contacto">Nombre</label>
          <input
            id="nombre-contacto"
            name="nombre"
            type="text"
            maxLength={100}
            autoComplete="name"
            value={datos.nombre}
            onChange={actualizarCampo}
            required
          />
          {errores.nombre && <span className="contacto-error" style={{ color: "red", fontSize: "0.85rem" }}>{errores.nombre}</span>}
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
            value={datos.correo}
            onChange={actualizarCampo}
            required
          />
          <small id="ayuda-correo-contacto">
            Usa un correo @duoc.cl, @profesor.duoc.cl o @gmail.com.
          </small>
          {errores.correo && <span className="contacto-error" style={{ color: "red", fontSize: "0.85rem", display: "block" }}>{errores.correo}</span>}
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
          {errores.comentario && <span className="contacto-error" style={{ color: "red", fontSize: "0.85rem", display: "block" }}>{errores.comentario}</span>}
        </div>

        <button
          type="submit"
          className="contacto-boton"
          aria-describedby="contacto-pendiente"
          disabled
        >
          Validar consulta
        </button>

        <p id="contacto-pendiente" className="contacto-aviso">
          Validación pendiente de integración.
        </p>

        <p className="contacto-aclaracion">
          Formulario de demostración: la consulta no se envía ni se guarda.
        </p>
      </form>
    </section>
  );
}

export default Contacto;