import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, Plugin } from 'vite';

// Tree-shake lucide icons by rewriting barrel imports to direct icon modules
const lucideTreeShakePlugin: Plugin = {
  name: 'lucide-treeshake',
  enforce: 'pre',
  transform(code: string, id: string) {
    if (!id.includes('node_modules') && (id.endsWith('.tsx') || id.endsWith('.ts'))) {
      if (code.includes('lucide-react')) {
        return {
          code: code.replace(/import\s*\{([^}]+)\}\s*from\s*['"]lucide-react['"];?/g, (_match, imports) => {
            const iconNames = imports.split(',').map((s: string) => s.trim()).filter(Boolean);
            return iconNames.map((name: string) => {
              const parts = name.split(/\s+as\s+/);
              const original = parts[0].trim();
              const alias = parts[1] ? parts[1].trim() : original;
              const kebab = original
                .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
                .replace(/([a-zA-Z])([0-9])/g, '$1-$2')
                .toLowerCase();
              return `import ${alias} from 'lucide-react/dist/esm/icons/${kebab}.js';`;
            }).join('\n');
          }),
          map: null,
        };
      }
    }
  },
};

// Eliminate render-blocking CSS by loading stylesheet via preload + async stylesheet swap
const nonBlockingCssPlugin: Plugin = {
  name: 'non-blocking-css',
  apply: 'build',
  transformIndexHtml(html: string) {
    return html.replace(
      /<link rel="stylesheet" crossorigin href="(\/assets\/[^"]+\.css)">/g,
      '<link rel="preload" as="style" href="$1" crossorigin onload="this.onload=null;this.rel=\'stylesheet\'">\n    <noscript><link rel="stylesheet" crossorigin href="$1"></noscript>'
    );
  },
};

export default defineConfig(() => {
  return {
    plugins: [lucideTreeShakePlugin, react(), tailwindcss(), nonBlockingCssPlugin],
    resolve: {
      alias: {
        '@': path.resolve(process.cwd(), '.'),
      },
    },
    build: {
      target: 'esnext',
      minify: 'esbuild',
      cssMinify: true,
      sourcemap: false,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              if (id.includes('react-dom') || id.includes('/react/') || id.includes('scheduler')) {
                return 'react-core';
              }
              if (id.includes('@tanstack')) {
                return 'virtual';
              }
              if (id.includes('lucide-react')) {
                return 'icons';
              }
              return 'vendor';
            }
          },
        },
      },
      chunkSizeWarningLimit: 1000,
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
