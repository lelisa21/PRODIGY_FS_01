import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tsConfigPaths from "vite-tsconfig-paths"
import path from "path"
export default defineConfig({
  plugins: [react(), tailwindcss(), tsConfigPaths()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
 build: {
    outDir: 'build',  
    assetsDir: '.',   
    rollupOptions: {
      output: {
        // All JS files in root
        entryFileNames: '[name].js',
        chunkFileNames: '[name].js',
        assetFileNames: '[name].[ext]',
      },
    } },
  server:{
    proxy:{
        "/api":{
             target: 'http://localhost:9000',
             changeOrigin: true,
        }
    },
  }
})
