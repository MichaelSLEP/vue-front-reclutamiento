import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite"; // Plugin oficial para Vite

export default defineConfig({
  plugins: [vue(), tailwindcss()], // Tailwind se integra directamente
});
