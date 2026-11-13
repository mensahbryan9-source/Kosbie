// Catalogue KOSBIE.
//
// Pour ajouter un article : copier un bloc, changer l'id (unique), le nom, etc.
// Photo : déposer le fichier dans /public/produits/ puis renseigner image: 'produits/mon-sac.webp'
//
// Champs :
//   category : 'sac' | 'chaussure'
//   price    : nombre en FCFA, ou null → le site affiche « Prix sur demande »
//   image    : photo principale
//   photo    : true si l'image est une photo entière (avec son décor), false/absent si le sac est détouré
//   colors   : [{ name, hex, image? }] — image facultative, propre à la couleur
//   sizes    : pointures (chaussures)
//   ref, brand, dims : repris dans la fiche et dans le message WhatsApp
//   note     : petite précision affichée sous la description
//
// ⚠️ Les noms et descriptions sont provisoires et AUCUN prix n'est renseigné : à compléter avec maman.

const NOTE_COLORIS = 'La photo montre le modèle dans un autre coloris. Coloris disponibles ci-dessous.';

export const products = [
  /* ---------- Modèles en boutique (photos de maman) ---------- */
  { id: 'kb-01', ref: 'KB-01', name: 'Cabas monogramme, anses camel', category: 'sac', price: null, image: 'produits/r01.webp', tag: 'En boutique',
    description: 'Cabas souple en toile monogramme, rabat et anses en cuir camel, fermoir cadenas argenté.', colors: [] },
  { id: 'kb-02', ref: 'KB-02', name: 'Sac bowling tissé ivoire', category: 'sac', price: null, image: 'produits/r02.webp',
    description: 'Sac bowling en toile tissée ivoire, bordure et anses en cuir camel.', colors: [] },
  { id: 'kb-03', ref: 'KB-03', name: 'Sac dôme noir tressé', category: 'sac', price: null, image: 'produits/r03.webp',
    description: 'Sac dôme noir à motif tressé, patte centrale et fermoir argenté.', colors: [] },
  { id: 'kb-04', ref: 'KB-04', name: 'Sac à rabat monogramme, liseré camel', category: 'sac', price: null, image: 'produits/r04.webp',
    description: 'Sac à main structuré en toile monogramme, rabat bordé de cuir camel, fermoir cadenas.', colors: [] },
  { id: 'kb-05', ref: 'KB-05', name: 'Sac à rabat cuir camel', category: 'sac', price: null, image: 'produits/r06.webp',
    description: 'Sac à rabat tout en cuir camel grainé, fermoir tourniquet.', colors: [] },
  { id: 'kb-06', ref: 'KB-06', name: 'Sac polochon noir', category: 'sac', price: null, image: 'produits/r07.webp',
    description: 'Sac polochon noir à motif tressé, sangles et boucles argentées.', colors: [] },
  { id: 'kb-07', ref: 'KB-07', name: 'Sac à main miel et monogramme', category: 'sac', price: null, image: 'produits/r08.webp', tag: 'En boutique',
    description: 'Sac à poignée, rabat en cuir miel sur toile monogramme, coins renforcés et fermoir cadenas.', colors: [] },
  { id: 'kb-08', ref: 'KB-08', name: 'Sac bandoulière à chaîne', category: 'sac', price: null, image: 'produits/r10.webp',
    description: 'Petit sac à rabat en toile monogramme et cuir cognac, bandoulière chaîne.', colors: [] },
  { id: 'kb-09', ref: 'KB-09', name: 'Sac dôme monogramme, poche zippée', category: 'sac', price: null, image: 'produits/r11.webp',
    description: 'Sac dôme en toile monogramme, poche zippée à l’avant, finitions en cuir camel.', colors: [] },
  { id: 'kb-10', ref: 'KB-10', name: 'Duo de pochettes monogramme', category: 'sac', price: null, image: 'produits/r12.webp', photo: true,
    description: 'Pochette à rabat et fermoir cadenas, en version claire ou chocolat.',
    colors: [{ name: 'Ivoire', hex: '#d9d4cc' }, { name: 'Chocolat', hex: '#4a3228' }] },
  { id: 'kb-11', ref: 'KB-11', name: 'Grand sac à rabat chocolat', category: 'sac', price: null, image: 'produits/r13.webp',
    description: 'Grand sac en toile monogramme chocolat, rabat bordé de cuir camel, fermoir cadenas argenté.', colors: [] },
  { id: 'kb-12', ref: 'KB-12', name: 'Cabas cuir à médaillon', category: 'sac', price: null, image: 'produits/r14.webp', photo: true,
    description: 'Cabas souple à médaillon embossé. Plusieurs coloris en boutique.',
    colors: [{ name: 'Camel', hex: '#b5703c' }, { name: 'Bleu canard', hex: '#1f5a66' }, { name: 'Vert d’eau', hex: '#8fb8a4' }] },
  { id: 'kb-13', ref: 'KB-13', name: 'Cabas noir, médaillon camel', category: 'sac', price: null, image: 'produits/r15.webp', photo: true,
    description: 'Cabas noir à anses et médaillon en cuir camel.', colors: [] },
  { id: 'kb-14', ref: 'KB-14', name: 'Cabas taupe à médaillon', category: 'sac', price: null, image: 'produits/r16.webp',
    description: 'Cabas taupe, anses camel et médaillon embossé ton sur ton.', colors: [] },
  { id: 'kb-15', ref: 'KB-15', name: 'Sac bandoulière monogramme, liseré orange', category: 'sac', price: null, image: 'produits/r17.webp',
    description: 'Sac à rabat en toile monogramme chocolat, bordure orange et fermoir cadenas doré.', colors: [] },
  { id: 'kb-16', ref: 'KB-16', name: 'Sac verni rouge', category: 'sac', price: null, image: 'produits/r18.webp', tag: 'En boutique',
    description: 'Sac à main en verni rouge, rabat arrondi et fermoir doré.', colors: [] },
  { id: 'kb-17', ref: 'KB-17', name: 'Sac verni vert anis', category: 'sac', price: null, image: 'produits/r19.webp',
    description: 'Sac à main en verni vert anis, rabat arrondi et fermoir doré.', colors: [] },
  { id: 'kb-18', ref: 'KB-18', name: 'Cabas ivoire, anses camel', category: 'sac', price: null, image: 'produits/r20.webp', photo: true,
    description: 'Grand cabas ivoire, anses en cuir camel et étiquette assortie.', colors: [] },

  /* ---------- Modèles sur catalogue (coloris cochés par maman) ---------- */
  { id: 'sq-2920', ref: '2920', brand: 'Su Queena', dims: '36 × 17 × 21 cm', name: 'Sac bugatti 2920', category: 'sac', price: null,
    description: 'Sac bugatti à double zip, deux anses rondes.',
    colors: [
      { name: 'Noir', hex: '#1f1d1d', image: 'produits/c01_m1.webp' },
      { name: 'Café', hex: '#7a4a33', image: 'produits/c01_m2.webp' },
      { name: 'Marron', hex: '#b5612f', image: 'produits/c01_m3.webp' },
    ] },
  { id: 'sq-3167', ref: '3167', brand: 'Su Queena', dims: '31 × 18 × 17 cm', name: 'Sac galet 3167', category: 'sac', price: null,
    description: 'Sac ovale aux lignes souples, anse fine et fermoir doré.',
    colors: [
      { name: 'Noir', hex: '#161616', image: 'produits/c02_m1.webp' },
      { name: 'Bordeaux', hex: '#7a1f24', image: 'produits/c02_m2.webp' },
    ] },
  { id: 'sq-2896', ref: '2896', brand: 'Su Queena', dims: '34 × 15 × 24 cm', name: 'Sac à main cadenas 2896', category: 'sac', price: null,
    description: 'Sac à main structuré, fermoir barrette et petit cadenas décoratif.',
    colors: [
      { name: 'Café', hex: '#8a4f2f', image: 'produits/c03_m1.webp' },
      { name: 'Noir', hex: '#1c1c1e', image: 'produits/c03_m2.webp' },
    ] },
  { id: 'sq-3171', ref: '3171', brand: 'Su Queena', dims: '28 × 11 × 21 cm', name: 'Besace tressée 3171', category: 'sac', price: null,
    description: 'Besace à rabat brodé, anse tressée et pompon.',
    colors: [
      { name: 'Noir', hex: '#1b1b1d', image: 'produits/c04_m1.webp' },
      { name: 'Bleu', hex: '#3f8fa8', image: 'produits/c04_m2.webp' },
    ] },
  { id: 'sq-3177', ref: '3177', brand: 'Su Queena', dims: '29 × 13 × 15 cm', name: 'Sac foulard 3177', category: 'sac', price: null,
    description: 'Sac trapèze dont l’anse est habillée d’un foulard imprimé.',
    colors: [
      { name: 'Prune', hex: '#5e2238', image: 'produits/c07_m1.webp' },
      { name: 'Noir', hex: '#161616', image: 'produits/c07_m2.webp' },
      { name: 'Jaune', hex: '#e3b62c', image: 'produits/c07_m3.webp' },
    ] },
  { id: 'e101', ref: 'E101', dims: '24 × 14 × 14 cm', name: 'Sac souple E101', category: 'sac', price: null,
    description: 'Petit sac souple à poignée découpée, surpiqûres contrastées, bandoulière amovible.',
    colors: [
      { name: 'Doré', hex: '#c9a84f', image: 'produits/c09_m1.webp' },
      { name: 'Chocolat', hex: '#4f342c', image: 'produits/c09_m2.webp' },
      { name: 'Noir', hex: '#1d1d1f', image: 'produits/c09_m3.webp' },
    ] },
  { id: 'm-2602', ref: '2602', dims: '28 × 9 × 16 cm', name: 'Sac baguette 2602', category: 'sac', price: null,
    description: 'Sac baguette à rabat, fermoir tourniquet doré et bandoulière.',
    colors: [
      { name: 'Vert sapin', hex: '#1f4a3c', image: 'produits/c10_m1.webp' },
      { name: 'Noir', hex: '#1b1b1d', image: 'produits/c10_m2.webp' },
    ] },
  { id: 'cb-polochon', ref: 'PQ012604345', brand: 'Chrisbella', dims: '28,5 × 14,5 × 14,5 cm', name: 'Polochon façon croco et sa pochette', category: 'sac', price: null,
    image: 'produits/c05_hero.webp', note: NOTE_COLORIS,
    description: 'Sac polochon aux anses et sangles façon croco, vendu avec sa petite pochette.',
    colors: [{ name: 'Chocolat', hex: '#583e32' }, { name: 'Bleu marine', hex: '#202c3e' }, { name: 'Noir', hex: '#1c1f24' }] },
  { id: 'cb-besace', ref: 'AA012603120', brand: 'Chrisbella', dims: '35 × 12 × 21 cm', name: 'Besace bicolore et sa pochette', category: 'sac', price: null,
    image: 'produits/c06_hero.webp', note: NOTE_COLORIS,
    description: 'Besace à grand rabat arrondi en deux tons, anse épaule et pochette assortie.',
    colors: [{ name: 'Marine et chocolat', hex: '#2b2d3c' }, { name: 'Noir et gris', hex: '#424244' }, { name: 'Marron et beige', hex: '#8a5a3c' }] },
  { id: 'cb-demi-lune', ref: 'AA012603225', brand: 'Chrisbella', dims: '30 × 10,5 × 30 cm', name: 'Sac demi-lune et son mini', category: 'sac', price: null,
    image: 'produits/c08_hero.webp',
    description: 'Sac demi-lune porté épaule, livré avec sa version mini (16 × 5,5 × 16 cm).',
    colors: [{ name: 'Moutarde', hex: '#d08a1e' }, { name: 'Bordeaux', hex: '#572c3b' }, { name: 'Bleu marine', hex: '#263a50' }, { name: 'Noir', hex: '#22252a' }] },
  { id: 'cb-dome', ref: 'AA012604226', brand: 'Chrisbella', dims: '30 × 14 × 21,5 cm', name: 'Sac dôme surpiqué et sa pochette', category: 'sac', price: null,
    image: 'produits/c13_hero.webp', note: NOTE_COLORIS,
    description: 'Sac dôme aux surpiqûres en arc, anse épaule et pochette assortie.',
    colors: [{ name: 'Noir', hex: '#242927' }, { name: 'Doré', hex: '#b6966e' }, { name: 'Bleu marine', hex: '#2c3344' }, { name: 'Chocolat', hex: '#584c44' }] },
  { id: 'bg-epaule', ref: 'BX012601587', brand: 'Bagco', dims: '31 × 13 × 20 cm', name: 'Sac épaule bicolore et son portefeuille', category: 'sac', price: null,
    image: 'produits/c11_hero.webp', note: NOTE_COLORIS,
    description: 'Sac épaule à bande contrastée et patte centrale, vendu avec son portefeuille.',
    colors: [{ name: 'Noir', hex: '#232525' }, { name: 'Chocolat', hex: '#483929' }, { name: 'Bordeaux', hex: '#6e2f30' }] },
  { id: 'bg-cabas', ref: 'BX012510427A', brand: 'Bagco', dims: '32 × 16 × 24 cm', name: 'Cabas structuré et sa pochette chaîne', category: 'sac', price: null,
    image: 'produits/c12_hero.webp', note: NOTE_COLORIS,
    description: 'Cabas structuré bicolore, vendu avec une pochette à chaîne (22 × 7 × 14 cm).',
    colors: [{ name: 'Bleu marine', hex: '#2b384e' }, { name: 'Chocolat', hex: '#594637' }, { name: 'Noir', hex: '#1f252c' }] },
  { id: 'bg-matelasse', ref: 'BX012510439', brand: 'Bagco', dims: '32 × 17 × 22 cm', name: 'Cabas matelassé et sa pochette', category: 'sac', price: null,
    image: 'produits/c14_hero.webp',
    description: 'Cabas souple à face matelassée, vendu avec sa pochette à chaîne.',
    colors: [{ name: 'Noir', hex: '#2a2d2b' }, { name: 'Beige', hex: '#b7967e' }, { name: 'Chocolat', hex: '#63544c' }] },
];
