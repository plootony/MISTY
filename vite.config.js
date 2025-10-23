import path from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig(({ mode }) => {
  const target = mode === 'landing' ? 'landing' : 'app'
  const isApp = target === 'app'
  const rootDir = path.resolve(__dirname, target)
  const alias = {
    '@shared': path.resolve(__dirname, 'shared'),
  }

  if (isApp) {
    alias['@'] = path.resolve(__dirname, 'app/src')
  }

  const port = target === 'landing' ? 5173 : 5174

  return {
    root: rootDir,
    publicDir: path.resolve(__dirname, `${target}/public`),
    plugins: isApp ? [vue()] : [],
    resolve: {
      alias,
    },
    server: {
      open: true,
      port,
      strictPort: true,
    },
    preview: {
      open: true,
      port,
    },
    build: {
      outDir: path.resolve(__dirname, `${target}/dist`),
      emptyOutDir: true,
    },
  }
})
