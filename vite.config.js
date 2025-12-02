import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  base: '/agenda-frontend2/',   
  plugins: [vue()]
})