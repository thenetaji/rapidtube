import { defineConfig } from "vite";

export default defineConfig({
  root: "src",
  build: {
    outDir: "../build",
    emptyOutDir: true,
  },
  server: {
    open: true,
  },
  css: {
    postcss: "./postcss.config.js",
  },
  envDir: "..",
});
