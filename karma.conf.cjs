const fs = require("node:fs");

const edgePath =
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";

if (process.platform === "win32" && fs.existsSync(edgePath)) {
  process.env.CHROME_BIN = edgePath;
}

module.exports = function (config) {
  config.set({
    frameworks: ["jasmine"],

    files: [".karma-tests/bundle.js"],

    browsers: ["EdgeHeadless"],

    customLaunchers: {
      EdgeHeadless: {
        base: "ChromeHeadless",
        flags: ["--headless=new"],
      },
    },

    singleRun: true,
    autoWatch: false,
    reporters: ["progress"],

    client: {
      clearContext: false,
    },
  });
};