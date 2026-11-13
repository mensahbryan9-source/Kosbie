# KOSBIE

Site vitrine de **KOSBIE**, boutique de sacs pour femmes.
Les clientes parcourent la collection, choisissent leur coloris, puis envoient leur commande en un message WhatsApp déjà rédigé.

- Accueil immersif piloté par le défilement : un sac en 3D (Three.js), un gros plan sur le fermoir, puis une ronde de vrais sacs de la boutique
- Collection sur fond poudré, filtres En boutique / Sur commande (le filtre Chaussures apparaît dès qu'une paire est ajoutée)
- Fiche produit : coloris, référence, dimensions, bouton « Commander sur WhatsApp » prérempli
- Pensé d'abord pour le mobile, 3D chargée à part et mise en pause hors écran, illustration de secours sans WebGL

## Démarrer

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # génère dist/
npm run preview  # sert dist/ en local
```

## Modifier le contenu

| Quoi | Où |
| --- | --- |
| Numéro WhatsApp, nom, ville | `src/config.js` |
| Articles (nom, prix, couleurs, pointures, photo) | `src/data/products.js` |
| Photos des articles | `public/produits/` puis `image: 'produits/mon-sac.webp'` |
| Sacs de la ronde 3D | `public/produits/ring/` et la liste `RING` dans `src/main.js` |
| Textes de la page | `index.html` |
| Couleurs et typographie | variables en haut de `src/style.css` |

Les 32 sacs viennent des photos de la boutique (sacs détourés) et des catalogues fournisseurs (coloris cochés en vert). Les noms et descriptions sont provisoires et **aucun prix n'est renseigné** : le site affiche « Prix sur demande » tant que `price` vaut `null`.

Conseil photo : format portrait (4:5), fond uni clair, article centré, environ 1200 px de large, en `.jpg` ou `.webp`.

## Photo dans le message WhatsApp

Le message de commande se termine par un lien vers l'article (`…/p/<id>.html`, ou `…/p/<id>--<couleur>.html` quand la couleur choisie a sa propre photo). WhatsApp affiche alors un aperçu avec la photo, le nom et le prix. Ces pages sont générées automatiquement au build à partir de `src/data/products.js`. Un clic sur le lien ouvre la fiche de l'article sur le site, dans la bonne couleur.

- L'aperçu n'apparaît que pour les articles qui ont une photo. Visez moins de 300 Ko par photo.
- L'adresse du site est réglée dans `src/config.js` (`siteUrl`) : à changer en cas de passage sur un nom de domaine.

## Déploiement

Le site est 100 % statique (`dist/`), il se déploie gratuitement :

- **GitHub Pages** : le workflow `.github/workflows/deploy.yml` publie automatiquement à chaque push sur `main`
  (Settings → Pages → Source : *GitHub Actions*).
- **Vercel / Netlify** : importer le dépôt, commande `npm run build`, dossier `dist`.

## Stack

Vite, JavaScript sans framework, Three.js pour la scène 3D, polices Bodoni Moda et Jost.
