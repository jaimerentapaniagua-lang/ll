import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        catalog: 'catalog.html',
      },
    },
  },
  preview: {
    allowedHosts: true
  },
  server: {
    allowedHosts: true
  }
})
