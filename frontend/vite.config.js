import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import process from "node:process";

export default defineConfig(({ mode }) => {
  // Carga las variables de entorno para el modo actual (desarrollo, producción, etc.)
  const env = loadEnv(mode, process.cwd(), "");

  return {
    // Configuración de Vite
    plugins: [react()],
    define: {
      __APP_ENV__: JSON.stringify(env.APP_ENV),
      __API_URL__: JSON.stringify(env.VITE_API_URL), // Accede a la variable de entorno VITE_API_URL
    },
    base: "/",
    build: {
      outDir: "dist", // Carpeta de salida
    },
    // Puedes añadir otras configuraciones aquí si es necesario
  };
});
