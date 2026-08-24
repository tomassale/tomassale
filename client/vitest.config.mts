import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'node:path'

// Dos entornos en una sola suite: la API route necesita Request/Response
// reales de Node (next/server), los componentes necesitan DOM.
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
  test: {
    environment: 'jsdom',
    // Los route handlers trabajan con Request/Response y fs de Node, no con DOM.
    environmentMatchGlobs: [
      ['src/app/api/**', 'node'],
      ['src/app/cv/**', 'node'],
    ],
    setupFiles: ['./src/test/setup.ts'],
    css: false,
    // src/app/test/page.test.tsx es un scratch file viejo (ya excluido del
    // tsc build en tsconfig.json), no una suite real: importa Swiper/CSS y
    // rompe la carga de PostCSS si vitest lo levanta.
    exclude: ['**/node_modules/**', 'src/app/test/**'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      include: ['src/**/*.{ts,tsx,js}'],
      exclude: [
        'src/**/*.test.{ts,tsx,js}',
        'src/test/**',
        'src/app/layout.tsx',
        'src/app/page.tsx',
      ],
    },
  },
})
