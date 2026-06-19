import { defineConfig, Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import viteCompression from 'vite-plugin-compression';
import fs from 'fs';

// Vite/Rollup GLSL transform — handles production build + HMR
function glslPlugin(): Plugin {
  return {
    name: 'vite-glsl-inline',
    transform(code, id) {
      if (/\.glsl(\?.*)?$/.test(id)) {
        return { code: `export default ${JSON.stringify(code)}`, map: null };
      }
    },
  };
}

// esbuild GLSL plugin — runs during dep pre-bundling (dev server)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const esbuildGlslPlugin: any = {
  name: 'esbuild-glsl',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setup(build: any) {
    build.onLoad({ filter: /\.glsl$/ }, (args: { path: string }) => ({
      contents: `export default ${JSON.stringify(fs.readFileSync(args.path, 'utf8'))}`,
      loader: 'js',
    }));
  },
};

export default defineConfig({
  plugins: [
    react(),
    glslPlugin(),
    viteCompression({ algorithm: 'brotliCompress' }),
    viteCompression({ algorithm: 'gzip' }),
  ],
  optimizeDeps: {
    exclude: ['lucide-react'],
    include: ['sheryjs'],
    esbuildOptions: { plugins: [esbuildGlslPlugin] },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return undefined;
          if (id.includes('three') || id.includes('@react-three')) return 'vendor-three';
          if (id.includes('framer-motion') || id.includes('gsap') || id.includes('lenis')) {
            return 'vendor-motion';
          }
          if (id.includes('posthog') || id.includes('@calcom')) return 'vendor-analytics';
          if (id.includes('react-icons') || id.includes('lucide-react')) return 'vendor-icons';
          if (id.includes('react') || id.includes('scheduler')) return 'vendor-react';
          return undefined;
        },
      },
    },
  },
});
