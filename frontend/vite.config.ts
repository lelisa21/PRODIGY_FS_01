import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tsConfigPaths from "vite-tsconfig-paths"
export default defineConfig({
  plugins: [react(), tailwindcss(), tsConfigPaths()],
  server:{
    proxy:{
        "/api":{
             target: 'http://localhost:9000',
             changeOrigin: true,
        }
    }
  }
})
