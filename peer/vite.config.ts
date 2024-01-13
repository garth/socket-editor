import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import externalize from 'vite-plugin-externalize-dependencies'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    externalize({
      externals: [/^socket:.*/],
    }),
  ],
  build: {
    rollupOptions: {
      external(id) {
        return id.startsWith('socket:')
      },
    },
    chunkSizeWarningLimit: 99999999999999
  },
})
