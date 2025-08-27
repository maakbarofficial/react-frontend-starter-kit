import { defineConfig } from 'vite'
import path from "path";
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import obfuscatorPlugin from 'vite-plugin-javascript-obfuscator';

// https://vite.dev/config/
export default defineConfig({
  base: "/app/",
  plugins: [
    react(),
    tailwindcss(),
    obfuscatorPlugin({
      options: {
        debugProtection: true,
        controlFlowFlattening: true,
        stringArray: true,
        stringArrayEncoding: ['base64'],
        stringArrayThreshold: 1,
      },
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    sourcemap: false,
    minify: 'esbuild',
  }
})