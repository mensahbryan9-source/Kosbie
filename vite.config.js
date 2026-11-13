import { defineConfig } from 'vite';

// base relative : le site fonctionne aussi bien sur un domaine propre
// (Vercel, Netlify) que dans un sous-dossier (GitHub Pages /kosbie/).
export default defineConfig({
  base: './',
  build: {
    target: 'es2020',
    chunkSizeWarningLimit: 800,
  },
});
