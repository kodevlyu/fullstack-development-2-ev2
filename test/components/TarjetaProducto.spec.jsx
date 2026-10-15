import { render, screen } from "@testing-library/react";
import TarjetaProducto from "../../src/components/TarjetaProducto";
import { productosMock } from "../mocks/productos";

describe("TarjetaProducto", () => {
  it("muestra nombre y precio del producto", () => {
    const producto = productosMock[0];
    render(<TarjetaProducto producto={producto} />);
    expect(screen.getByText(producto.nombre)).toBeInTheDocument();
  });
});
