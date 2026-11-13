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
};

export function formatPrice(value) {
  return `${new Intl.NumberFormat('fr-FR').format(value).replace(/ | /g, ' ')} ${SHOP.currency}`;
}

export function whatsappLink(message) {
  return `https://wa.me/${SHOP.whatsapp}?text=${encodeURIComponent(message)}`;
}
