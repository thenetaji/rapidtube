import { defineConfig } from "vite";

export default defineConfig({
  root: "src",
  publicDir: "../public",
  build: {
    outDir: "dist",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: "./src/index.html",
        about: "./src/pages/about.html",
        disclaimer: "./src/pages/disclaimer.html",
        contact: "./src/pages/contact.html",
      },
    },
  },
  server: {
    open: true,
  },
  css: {
    postcss: "./postcss.config.js",
  },
});
