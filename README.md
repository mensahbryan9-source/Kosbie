# KOSBIE

Site vitrine de **KOSBIE**, boutique de sacs et de chaussures pour femmes.
Les clientes parcourent la collection, choisissent la couleur et la pointure, puis envoient leur commande en un message WhatsApp déjà rédigé.

- Accueil noir et or avec un sac en 3D (Three.js) qu'on fait tourner et dont on change la teinte
- Collection sur fond poudré, filtres Sacs / Chaussures
- Fiche produit : couleurs, pointures, bouton « Commander sur WhatsApp » prérempli
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
| Photos des articles | `public/produits/` puis `image: 'produits/mon-sac.jpg'` |
| Textes de la page | `index.html` |
| Couleurs et typographie | variables en haut de `src/style.css` |

Les 8 articles actuels sont des **exemples** : remplacez-les par les vrais modèles. Tant qu'un article n'a pas de photo, une illustration teintée à sa couleur s'affiche.

Conseil photo : format portrait (4:5), fond uni clair, article centré, environ 1200 px de large, en `.jpg` ou `.webp`.

## Déploiement

Le site est 100 % statique (`dist/`), il se déploie gratuitement :

- **GitHub Pages** : le workflow `.github/workflows/deploy.yml` publie automatiquement à chaque push sur `main`
  (Settings → Pages → Source : *GitHub Actions*).
- **Vercel / Netlify** : importer le dépôt, commande `npm run build`, dossier `dist`.

## Stack

Vite, JavaScript sans framework, Three.js pour la scène 3D, polices Bodoni Moda et Jost.
