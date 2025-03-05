import { defineConfig } from "vite";

export default defineConfig({
  root: ".",
  build: {
    outDir: "./dist",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: "./index.html",
        about: "./src/pages/about.html",
        disclaimer: "./src/pages/disclaimer.html",
        contact: "./src/pages/contact.html",
      },
    },
  },
  css: {
    postcss: "./postcss.config.js",
  },
});