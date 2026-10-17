import { render, screen } from "@testing-library/react";
import Catalogo from "../../src/components/Catalogo";
import { productosMock } from "../mocks/productos";

describe("Catalogo", () => {
  it("muestra productos del catálogo", () => {
    render(<Catalogo productos={productosMock} />);
    expect(screen.getByText("Torta chocolate")).toBeInTheDocument();
    expect(screen.getByText("Pie de limón")).toBeInTheDocument();
  });
});
