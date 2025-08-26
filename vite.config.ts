import { defineConfig } from 'vite'
import { resolve } from 'path'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'


// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: { 'react-win32-menu': '/src' },
  },
  plugins: [
    react(),
    dts({
      include: ['src'],
      tsconfigPath: './tsconfig.lib.json',
      rollupTypes: true,
    }),
  ],
  
  build: {
    lib: {
      formats: ['es', 'cjs'],
      entry: resolve(__dirname, 'src/index.ts'),
      fileName: ((format, entryName) => { switch (format) {
        case 'cjs': return `${entryName}.js`;
        case 'es':  return `${entryName}.esm.js`;
        default:    return `${entryName}.${format}.js`;
      }}),
    },
    rollupOptions: {
      external: ['react', 'react/jsx-runtime'],
    },
  },
})
