import { defineConfig } from 'vite';
import { SHOP, formatPrice, shareSlug, slugify } from './src/config.js';
import { products } from './src/data/products.js';

const escapeHtml = (s) => String(s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// Une page par article, plus une par couleur qui a sa propre photo.
function sharePages() {
  return products.flatMap((product) => [
    { product, color: null },
    ...product.colors.filter((c) => c.image).map((color) => ({ product, color })),
  ]);
}

// Petite page (p/<slug>.html) lue par WhatsApp pour afficher l'aperçu
// (photo, nom, prix) sous le message de commande. Une personne qui clique
// dessus est renvoyée sur la fiche de l'article dans le site.
function sharePage({ product, color }) {
  const price = product.price ? formatPrice(product.price) : 'Prix sur demande';
  const title = escapeHtml(`${product.name}${color ? ` — ${color.name}` : ''} · ${price}`);
  const desc = escapeHtml(product.description);
  const params = new URLSearchParams({ produit: product.id });
  if (color) params.set('couleur', slugify(color.name));
  const target = `../#${params}`;
  const src = color?.image || product.image || product.colors.find((c) => c.image)?.image;
  const image = src
    ? `
  <meta property="og:image" content="${escapeHtml(SHOP.siteUrl + src)}" />
  <meta property="og:image:alt" content="${escapeHtml(product.name)}" />
  <meta name="twitter:card" content="summary_large_image" />`
    : '';
  return `<!doctype html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${title} · ${escapeHtml(SHOP.name)}</title>
  <meta name="description" content="${desc}" />
  <meta property="og:type" content="product" />
  <meta property="og:site_name" content="${escapeHtml(SHOP.name)}" />
  <meta property="og:title" content="${title}" />
  <meta property="og:description" content="${desc}" />
  <meta property="og:url" content="${escapeHtml(`${SHOP.siteUrl}p/${shareSlug(product, color)}.html`)}" />${image}
  <meta http-equiv="refresh" content="0; url=${escapeHtml(target)}" />
  <script>location.replace(${JSON.stringify(target)});</script>
</head>
<body>
  <p><a href="${escapeHtml(target)}">Voir ${escapeHtml(product.name)} sur le site ${escapeHtml(SHOP.name)}</a></p>
</body>
</html>
`;
}

function productSharePages() {
  return {
    name: 'kosbie-product-share-pages',
    // npm run dev : sert les pages à la volée pour pouvoir les tester.
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const m = req.url?.match(/^\/p\/([\w-]+)\.html(?:\?.*)?$/);
        const page = m && sharePages().find((p) => shareSlug(p.product, p.color) === m[1]);
        if (!page) return next();
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.end(sharePage(page));
      });
    },
    // npm run build : écrit dist/p/<slug>.html.
    generateBundle() {
      const seen = new Set();
      for (const page of sharePages()) {
        const slug = shareSlug(page.product, page.color);
        if (seen.has(slug)) this.error(`Deux pages de partage portent le même nom : p/${slug}.html`);
        seen.add(slug);
        this.emitFile({ type: 'asset', fileName: `p/${slug}.html`, source: sharePage(page) });
      }
    },
  };
}

// base relative : le site fonctionne aussi bien sur un domaine propre
// (Vercel, Netlify) que dans un sous-dossier (GitHub Pages /kosbie/).
export default defineConfig({
  base: './',
  plugins: [productSharePages()],
  build: {
    target: 'es2020',
    chunkSizeWarningLimit: 800,
  },
});
