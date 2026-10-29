import { Link, useParams } from "react-router-dom";
import { formatoPrecio } from "../../utils/formatoPrecio";
import "./DetalleProductoAdmin.css";

export default function DetalleProductoAdmin({ productos = [] }) {
  const { codigo } = useParams();
  const producto = productos.find((p) => p.codigo === codigo);

  if (!producto) {
    return (
      <main className="detalle-producto-admin">
        <section className="detalle-admin-tarjeta">
          <h1>Producto no encontrado</h1>
          <Link
            className="detalle-admin-boton detalle-admin-volver"
            to="/admin/productos"
          >
            ← Volver al listado
          </Link>
        </section>
      </main>
    );
  }

  const stockValido =
    Number.isInteger(producto.stock) && producto.stock >= 0;

  return (
    <main className="detalle-producto-admin">
      <article className="detalle-admin-tarjeta">

        <header className="detalle-admin-encabezado">
          <div>
            <p className="detalle-admin-etiqueta">
              Administración de productos
            </p>
            <h1>{producto.nombre}</h1>
            <p className="detalle-admin-codigo">
              Código: {producto.codigo}
            </p>
          </div>

          <span
            className={
              producto.disponible
                ? "detalle-admin-estado disponible"
                : "detalle-admin-estado no-disponible"
            }
          >
            {producto.disponible ? "Disponible" : "No disponible"}
          </span>
        </header>

        <div className="detalle-admin-contenido">
          <div className="detalle-admin-imagen-contenedor">
            {producto.imagen ? (
              <img
                src={producto.imagen}
                alt={producto.nombre}
                className="detalle-admin-imagen"
              />
            ) : (
              <div className="detalle-admin-sin-imagen">
                Imagen no disponible
              </div>
            )}
          </div>

          <div className="detalle-admin-informacion">
            <div className="detalle-admin-precio">
              <span>Precio de venta</span>
              <strong>{formatoPrecio(producto.precio)}</strong>
            </div>

            <dl className="detalle-admin-datos">
              <div>
                <dt>Categoría</dt>
                <dd>{producto.categoria}</dd>
              </div>

              <div>
                <dt>Stock</dt>
                <dd>
                  {stockValido
                    ? `${producto.stock} unidades`
                    : "Pendiente"}
                </dd>
              </div>

              <div>
                <dt>Personalizable</dt>
                <dd>{producto.personalizable ? "Sí" : "No"}</dd>
              </div>
            </dl>
          </div>
        </div>

        <section className="detalle-admin-descripcion">
          <h2>Descripción</h2>
          <p>{producto.descripcion || "Sin descripción registrada."}</p>
        </section>

        <nav
          className="detalle-admin-acciones"
          aria-label="Acciones del producto"
        >
          <Link
            to={`/admin/producto/${codigo}/editar`}
            className="detalle-admin-boton detalle-admin-editar"
          >
            Editar producto
          </Link>

          <Link
            to="/admin/productos"
            className="detalle-admin-boton detalle-admin-volver"
          >
            ← Volver al listado
          </Link>
        </nav>

      </article>
    </main>
  );
}
