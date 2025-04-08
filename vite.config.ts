import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: 'local.intuitionwritofstandards.com',
    port: 5174,
  },
  test: {
    globals: true,
    environment: "jsdom",
    //setupFiles: "./src/setupTests.ts",
  },
})