import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  minify: true,
  target: "es2015",
  noExternal: ["esm-seedrandom"], // Fix for an import issue with esm-seedrandom
  sourcemap: true,
  dts: true,
  clean: true,
  format: ["esm", "cjs", "iife"],
  injectStyle: true,
  esbuildOptions(options) {
    options.define = {
      "process.env.NODE_ENV": JSON.stringify("production"),
    };
    options.banner = {
      js: '"use client"',
    };
  },
});
