// Réglages de la boutique — c'est ici qu'on change le numéro, le nom, etc.

export const SHOP = {
  name: 'KOSBIE',
  // Numéro WhatsApp au format international, chiffres uniquement, sans "+".
  // Depuis fin 2024, les numéros mobiles béninois ont 10 chiffres (préfixe 01) :
  // +229 97 64 81 27  →  +229 01 97 64 81 27
  whatsapp: '2290197648127',
  whatsappDisplay: '+229 01 97 64 81 27',
  city: 'Bénin',
  currency: 'FCFA',
  // Adresse publique du site, avec le "/" final. Sert aux liens envoyés sur
  // WhatsApp et à l'aperçu photo (WhatsApp exige des adresses complètes).
  // À changer si le site passe sur un nom de domaine.
  siteUrl: 'https://mensahbryan9-source.github.io/Kosbie/',
};

export function formatPrice(value) {
  return `${new Intl.NumberFormat('fr-FR').format(value).replace(/ | /g, ' ')} ${SHOP.currency}`;
}

export function whatsappLink(message) {
  return `https://wa.me/${SHOP.whatsapp}?text=${encodeURIComponent(message)}`;
}

// « Café crème » → « cafe-creme » : sert à nommer la page de partage d'une couleur.
export function slugify(text) {
  return String(text).normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

// Page de partage d'un article (et de sa couleur quand elle a sa propre photo) :
// WhatsApp y lit la photo pour afficher l'aperçu sous le message.
// Ces pages sont générées au build par le plugin de vite.config.js.
export function shareSlug(product, color) {
  return color?.image ? `${product.id}--${slugify(color.name)}` : product.id;
}

export function productShareUrl(product, color) {
  return `${SHOP.siteUrl}p/${shareSlug(product, color)}.html`;
}
