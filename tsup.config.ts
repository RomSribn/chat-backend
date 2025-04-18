import { defineConfig } from 'tsup';

export default defineConfig({
    entry: ['src/index.ts'], // entry point to the project
    outDir: 'dist', // folder for output files
    format: ['esm', 'cjs'], // build in two formats at once
    target: 'node20', // target for modern Node.js
    splitting: false, // do not split into chunks (this is rarely needed on the backend)
    sourcemap: true, // generate sourcemap for debugging
    clean: true, // clean dist before each build
    dts: false, // do not generate .d.ts files (unless you are making a library)
    shims: false // do not add unnecessary polyfills
});