import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    ssr: true,
    emptyOutDir: false,
    outDir: 'build',
    rollupOptions: {
      input: 'server.ts',
      output: {
        format: 'cjs',
      },
    },
  },
});
