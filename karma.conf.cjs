const fs = require("node:fs");

// Utiliza Edge si está instalado en esta ubicación de Windows.
const edgePath =
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";

if (process.platform === "win32" && fs.existsSync(edgePath)) {
  process.env.CHROME_BIN = edgePath;
}

module.exports = function (config) {
  config.set({
    // Ejecuta las pruebas escritas con Jasmine.
    frameworks: ["jasmine"],

    files: [
      // Archivo que reúne las pruebas mediante scripts/build-tests.mjs.
      ".karma-tests/bundle.js",

      // Sirve las imágenes sin tratarlas como archivos JavaScript.
      {
        pattern: "public/img/**/*",
        included: false,
        served: true,
        watched: false,
      },
    ],

    // Conecta las direcciones /img/ con las imágenes del proyecto.
    proxies: {
      "/img/": "/base/public/img/",
    },

    // Conserva el navegador de pruebas configurado por Rimsky.
    browsers: ["EdgeHeadless"],

    customLaunchers: {
      EdgeHeadless: {
        base: "ChromeHeadless",
        flags: ["--headless=new"],
      },
    },

    // Ejecuta una vez y termina mostrando los resultados.
    singleRun: true,
    autoWatch: false,
    reporters: ["progress"],

    client: {
      clearContext: false,
    },
  });
};
