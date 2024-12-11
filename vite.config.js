import { defineConfig } from "vite";

export default defineConfig({
  build: {
    minify: false, // Desactivar minificación para evitar que se eliminen clases dinámicas
    cssCodeSplit: false
  }
});
