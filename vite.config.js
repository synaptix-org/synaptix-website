import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Allow NEXT_PUBLIC_-prefixed env vars to be exposed to the client,
  // alongside Vite's default VITE_ prefix.
  envPrefix: ['VITE_', 'NEXT_PUBLIC_'],
})
