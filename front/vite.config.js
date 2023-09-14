import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(() => {
  return {
    build: {
      outDir: 'build'
    },
    plugins: [react()],
    server: {
      host: true,
      port: 3000
    },
    test: {
      files: 'src/**/*.test.{ts,tsx}',
      environment: 'jsdom',
      deps: {
        inline: ['vitest-canvas-mock']
      },
      threads: false,
      environmentOptions: {
        jsdom: {
          resources: 'usable'
        }
      }
    }
  }
})
