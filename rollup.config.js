import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import json from '@rollup/plugin-json';
import swc from "@rollup/plugin-swc";

export default {
    input: "app.js", // Archivo de entrada.
    output: {
        file: "dist/index.js", // Archivo de salida.
        format: "esm", // Mantiene ES6.
        sourcemap: false
    },
    plugins: [
        resolve(), // Permite importar módulos ES6.
        commonjs(),
        json(),
        swc({ minify: true }) // Transpila y minifica con SWC.
    ]
};
