import { render, screen } from "@testing-library/react";
import ProductosAdmin from "../../src/pages/admin/ProductosAdmin";
import * as storage from "../../src/utils/guardarProductos";

describe("ProductosAdmin", () => {
  it("muestra listado de productos", () => {
    jest.spyOn(storage, "cargarProductos").mockReturnValue([
      { codigo: "P001", nombre: "Torta", categoria: "tortas", precio: 1000 },
    ]);

    render(<ProductosAdmin />);

    expect(screen.getByText("Torta")).toBeInTheDocument();
  });
});
