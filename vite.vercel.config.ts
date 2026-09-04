// Importa la funcion de configuracion oficial de Vite.
import { defineConfig } from "vite";

// Exporta la configuracion que Vite usa al correr o construir la pagina.
export default defineConfig({
  // Indica que el build se guarda en dist-vercel y limpia esa carpeta antes de generar.
  build: {
    outDir: "dist-vercel",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: "index.html",
        creditos: "creditos.html",
      },
    },
  },
});
