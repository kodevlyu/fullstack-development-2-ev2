import { useEffect, useRef } from "react";
import "./ConfirmarCerrarSesion.css";

export default function ConfirmarCerrarSesion({
  abierto,
  cancelar,
  confirmar,
}) {
  const botonCancelar = useRef(null);

  useEffect(() => {
    if (!abierto) return;

    botonCancelar.current?.focus();

    function cerrarConEscape(evento) {
      if (evento.key === "Escape") cancelar();
    }

    document.addEventListener("keydown", cerrarConEscape);

    return () => {
      document.removeEventListener("keydown", cerrarConEscape);
    };
  }, [abierto, cancelar]);

  if (!abierto) return null;

  return (
    <div className="confirmar-sesion-fondo">
      <div
        className="confirmar-sesion-modal"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirmar-sesion-titulo"
        aria-describedby="confirmar-sesion-descripcion"
      >
        <div className="confirmar-sesion-icono" aria-hidden="true">
          ?
        </div>

        <h2 id="confirmar-sesion-titulo">
          Confirmar cierre de sesión
        </h2>

        <p id="confirmar-sesion-descripcion">
          ¿Estás seguro de que quieres cerrar sesión?
        </p>

        <div className="confirmar-sesion-acciones">
          <button
            ref={botonCancelar}
            type="button"
            className="confirmar-sesion-rechazar"
            onClick={cancelar}
          >
            Rechazar
          </button>

          <button
            type="button"
            className="confirmar-sesion-aceptar"
            onClick={confirmar}
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
}
