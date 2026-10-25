import { useState } from "react";
import "./Contacto.css";

function Contacto() {
  // Guarda lo que escribe el usuario en los tres campos.
  const [datos, setDatos] = useState({
    nombre: "",
    correo: "",
    comentario: "",
  });

  // Actualiza el campo que cambió y conserva los demás.
  function actualizarCampo(evento) {
    const { name, value } = evento.target;

    setDatos({
      ...datos,
      [name]: value,
    });
  }

  // Evita recargar la página. Aquí conectaremos la validación de Lucía.
  function manejarFormulario(evento) {
    evento.preventDefault();
  }

  return (
    <section className="contacto" aria-labelledby="titulo-contacto">
      {/* Presentación conservada del formulario original. */}
      <header className="contacto-presentacion">
        <h1 id="titulo-contacto">Conversemos</h1>
        <p>
          Cuéntanos tu idea o consulta. Queremos acompañarte en tu próxima
          celebración.
        </p>
      </header>

      {/* Los campos están conectados con el estado datos. */}
      <form className="contacto-formulario" onSubmit={manejarFormulario}>
        {/* Nombre: obligatorio y con un máximo de 100 caracteres. */}
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
        </div>

        {/* La validación de Lucía comprobará los dominios permitidos. */}
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
        </div>

        {/* Comentario con contador conectado al texto ingresado. */}
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

        {/* Se habilitará al conectar las funciones de validación de Lucía. */}
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

        {/* Esta versión no realiza envíos ni almacena datos personales. */}
        <p className="contacto-aclaracion">
          Formulario de demostración: la consulta no se envía ni se guarda.
        </p>
      </form>
    </section>
  );
}

export default Contacto;
