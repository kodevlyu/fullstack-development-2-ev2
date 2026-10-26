import { build } from "esbuild";
import { readdirSync } from "node:fs";
import { join, resolve } from "node:path";

function encontrarPruebas(directorio) {
  return readdirSync(directorio, { withFileTypes: true }).flatMap((entrada) => {
    const ruta = join(directorio, entrada.name);

    if (entrada.isDirectory()) {
      return encontrarPruebas(ruta);
    }

    return /\.spec\.(js|jsx)$/.test(entrada.name) ? [ruta] : [];
  });
}

const pruebas = encontrarPruebas("test");

if (pruebas.length === 0) {
  throw new Error("No se encontraron archivos de pruebas.");
}

const codigo = [
  'globalThis.IS_REACT_ACT_ENVIRONMENT = true;',
  'import "./test/setup.js";',
  ...pruebas.map((ruta) => `import "./${ruta.replaceAll("\\", "/")}";`),
].join("\n");

await build({
  stdin: {
    contents: codigo,
    resolveDir: resolve("."),
    sourcefile: "test-entry.jsx",
    loader: "jsx",
  },
  bundle: true,
  outfile: ".karma-tests/bundle.js",
  format: "iife",
  platform: "browser",
  jsx: "automatic",
  define: {
    "process.env.NODE_ENV": '"test"',
  },
});

console.log(`${pruebas.length} archivos de pruebas preparados.`);