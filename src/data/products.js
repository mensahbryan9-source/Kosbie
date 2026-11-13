// Catalogue KOSBIE.
//
// Pour ajouter un article : copier un bloc, changer l'id (unique), le nom, le prix…
// Photo : déposer le fichier dans /public/produits/ puis renseigner
//   image: 'produits/mon-sac.jpg'
// Sans photo, le site affiche une illustration dessinée à partir de `shape` et des couleurs.
//
// category : 'sac' | 'chaussure'
// shape (sacs)       : 'cabas' | 'pochette' | 'main' | 'seau'
// shape (chaussures) : 'escarpin' | 'sandale' | 'mule' | 'ballerine'
//
// ⚠️ Les articles ci-dessous sont des EXEMPLES : remplacer par les vrais modèles.

export const products = [
  {
    id: 'cabas-sika',
    name: 'Cabas Sika',
    category: 'sac',
    shape: 'cabas',
    price: 28000,
    description: 'Grand cabas souple qui avale ordinateur, trousse et bouteille d’eau. Deux anses portées épaule.',
    colors: [
      { name: 'Caramel', hex: '#A8743F' },
      { name: 'Noir', hex: '#2B2522' },
      { name: 'Taupe', hex: '#8C7B6E' },
    ],
    tag: 'Nouveau',
  },
  {
    id: 'pochette-ayaba',
    name: 'Pochette Ayaba',
    category: 'sac',
    shape: 'pochette',
    price: 15000,
    description: 'Pochette de soirée à rabat, fermoir doré et chaîne amovible. Tient un téléphone, des clés et un rouge à lèvres.',
    colors: [
      { name: 'Noir', hex: '#2B2522' },
      { name: 'Or', hex: '#C9A45C' },
      { name: 'Bordeaux', hex: '#6E2232' },
    ],
  },
  {
    id: 'sac-main-lea',
    name: 'Sac à main Léa',
    category: 'sac',
    shape: 'main',
    price: 32000,
    description: 'Sac structuré à poignée, rabat et fermoir doré. Bandoulière réglable fournie pour le porter croisé.',
    colors: [
      { name: 'Poudre', hex: '#D9B3A6' },
      { name: 'Caramel', hex: '#A8743F' },
      { name: 'Noir', hex: '#2B2522' },
    ],
    tag: 'Le plus demandé',
  },
  {
    id: 'seau-noa',
    name: 'Sac seau Noa',
    category: 'sac',
    shape: 'seau',
    price: 22000,
    description: 'Sac seau à lien coulissant, longue bandoulière. Pratique au quotidien, se ferme d’un geste.',
    colors: [
      { name: 'Cognac', hex: '#8A4B26' },
      { name: 'Crème', hex: '#E6D9C4' },
    ],
  },
  {
    id: 'escarpins-ayo',
    name: 'Escarpins Ayo',
    category: 'chaussure',
    shape: 'escarpin',
    price: 25000,
    description: 'Escarpins à bout pointu, talon de 8 cm. Pour les cérémonies comme pour le bureau.',
    colors: [
      { name: 'Nude', hex: '#D4A98C' },
      { name: 'Noir', hex: '#2B2522' },
      { name: 'Rouge', hex: '#A1252B' },
    ],
    sizes: [36, 37, 38, 39, 40, 41],
    tag: 'Nouveau',
  },
  {
    id: 'sandales-mina',
    name: 'Sandales Mina',
    category: 'chaussure',
    shape: 'sandale',
    price: 18000,
    description: 'Sandales à brides fines et talon carré de 6 cm, boucle dorée à la cheville. Stables et légères.',
    colors: [
      { name: 'Or', hex: '#C9A45C' },
      { name: 'Noir', hex: '#2B2522' },
    ],
    sizes: [36, 37, 38, 39, 40, 41],
  },
  {
    id: 'mules-iris',
    name: 'Mules Iris',
    category: 'chaussure',
    shape: 'mule',
    price: 16000,
    description: 'Mules à petit talon, dos ouvert. Elles s’enfilent sans les mains et se portent toute la journée.',
    colors: [
      { name: 'Crème', hex: '#E6D9C4' },
      { name: 'Caramel', hex: '#A8743F' },
    ],
    sizes: [37, 38, 39, 40, 41],
  },
  {
    id: 'ballerines-clara',
    name: 'Ballerines Clara',
    category: 'chaussure',
    shape: 'ballerine',
    price: 12000,
    description: 'Ballerines plates avec petit nœud, semelle souple. La paire qu’on garde dans son sac.',
    colors: [
      { name: 'Poudre', hex: '#D9B3A6' },
      { name: 'Noir', hex: '#2B2522' },
      { name: 'Bordeaux', hex: '#6E2232' },
    ],
    sizes: [36, 37, 38, 39, 40, 41],
  },
];
