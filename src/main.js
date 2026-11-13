import { SHOP, formatPrice, whatsappLink, productShareUrl, slugify } from './config.js';
import { products } from './data/products.js';
import { illustration } from './illustrations.js';

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const CATEGORY_LABEL = { sac: 'Sac', chaussure: 'Chaussure' };

/* ---------- Liens WhatsApp généraux ---------- */
const generalMessage = `Bonjour ${SHOP.name}, je viens de votre site et j’aimerais avoir des informations.`;
$$('[data-wa-general]').forEach((a) => { a.href = whatsappLink(generalMessage); });
$$('[data-wa-display]').forEach((el) => { el.textContent = `WhatsApp ${SHOP.whatsappDisplay}`; });
$$('[data-city]').forEach((el) => { el.textContent = SHOP.city; });
$('[data-year]').textContent = new Date().getFullYear();

/* ---------- En-tête : fond plein après le haut de page ---------- */
const header = $('[data-header]');
const onScroll = () => header.classList.toggle('is-solid', window.scrollY > 40);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

/* ---------- Visuel d'un produit : photo si disponible, sinon illustration ---------- */
function media(product, color) {
  const src = color?.image || product.image || product.colors.find((c) => c.image)?.image;
  if (src) {
    const kind = product.photo ? 'is-photo' : 'is-cutout';
    return `<img class="${kind}" src="${src}" alt="${product.name}" loading="lazy" decoding="async" />`;
  }
  return illustration(product, color?.hex);
}
const priceLabel = (product) => (product.price ? formatPrice(product.price) : 'Prix sur demande');
// Un modèle est « en boutique » quand il vient des photos de la boutique, « sur commande » sinon.
const groupOf = (product) => (product.category === 'chaussure' ? 'chaussure' : product.ref?.startsWith('KB-') ? 'boutique' : 'commande');

/* ---------- Catalogue ---------- */
const grid = $('[data-grid]');

function card(product) {
  const li = document.createElement('li');
  li.className = 'card';
  li.dataset.category = groupOf(product);
  const dots = product.colors
    .map((c) => `<span class="dot" style="--c:${c.hex}" title="${c.name}"></span>`)
    .join('');
  li.innerHTML = `
    <button class="card__btn" type="button" aria-label="${product.name}, ${priceLabel(product)}. Voir le détail">
      <span class="card__media">${media(product)}</span>
      ${product.tag ? `<span class="card__tag">${product.tag}</span>` : ''}
      <span class="card__info">
        <span class="card__name">${product.name}</span>
        <span class="card__price${product.price ? '' : ' is-ask'}">${priceLabel(product)}</span>
      </span>
      <span class="card__meta">
        <span class="card__dots" aria-hidden="true">${dots}</span>
        <span class="card__more">Voir le modèle</span>
      </span>
    </button>`;
  $('.card__btn', li).addEventListener('click', () => openSheet(product));
  return li;
}

grid.append(...products.map(card));

['tout', 'boutique', 'commande', 'chaussure'].forEach((key) => {
  const n = key === 'tout' ? products.length : products.filter((p) => groupOf(p) === key).length;
  const el = $(`[data-count="${key}"]`);
  if (el) el.textContent = n;
  // Le filtre Chaussures apparaît tout seul dès qu'une paire est ajoutée au catalogue.
  if (key === 'chaussure' && n > 0) $(`[data-filter="chaussure"]`).hidden = false;
});
$$('[data-count-total]').forEach((el) => { el.textContent = products.length; });

function applyFilter(value) {
  $$('[data-filter]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.filter === value)));
  const cards = $$('.card', grid);
  const update = () => cards.forEach((c) => { c.hidden = value !== 'tout' && c.dataset.category !== value; });
  if (document.startViewTransition && !reducedMotion) document.startViewTransition(update);
  else update();
}
$$('[data-filter]').forEach((b) => b.addEventListener('click', () => applyFilter(b.dataset.filter)));
$$('[data-filter-link]').forEach((a) => a.addEventListener('click', () => applyFilter(a.dataset.filterLink)));

/* ---------- Fiche produit ---------- */
const sheet = $('[data-sheet]');
const state = { product: null, color: null, size: null };

function orderMessage() {
  const { product, color, size } = state;
  const lines = [
    `Bonjour ${SHOP.name}, je suis intéressée par cet article :`,
    `• ${product.name}${product.ref ? ` (réf. ${product.ref})` : ''}`,
  ];
  if (product.price) lines.push(`• Prix affiché : ${formatPrice(product.price)}`);
  if (color) lines.push(`• Couleur : ${color.name}`);
  if (product.sizes) lines.push(`• Pointure : ${size ?? 'à préciser'}`);
  lines.push(product.price ? 'Est-il disponible ?' : 'Quel est son prix, et est-il disponible ?');
  // Lien vers l'article : WhatsApp affiche sa photo en aperçu sous le message.
  lines.push('', productShareUrl(product, color));
  return lines.join('\n');
}

function refreshSheet() {
  const { product, color, size } = state;
  $('[data-sheet-media]').innerHTML = media(product, color);
  $('[data-sheet-color-name]').textContent = color?.name ?? '';
  $('[data-sheet-size-name]').textContent = size ?? 'à choisir';
  $$('[data-color-btn]', sheet).forEach((b) => b.setAttribute('aria-checked', String(b.dataset.colorBtn === color?.name)));
  $$('[data-size-btn]', sheet).forEach((b) => b.setAttribute('aria-checked', String(Number(b.dataset.sizeBtn) === size)));
  $('[data-sheet-wa]').href = whatsappLink(orderMessage());
}

function openSheet(product, color = null) {
  state.product = product;
  state.color = color ?? product.colors[0] ?? null;
  state.size = null;

  $('[data-sheet-cat]').textContent = groupOf(product) === 'commande' ? 'Sur commande' : groupOf(product) === 'boutique' ? 'En boutique' : CATEGORY_LABEL[product.category];
  $('[data-sheet-title]').textContent = product.name;
  $('[data-sheet-price]').textContent = priceLabel(product);
  $('[data-sheet-desc]').textContent = product.description;
  $('[data-sheet-specs]').textContent = [product.brand, product.dims, product.ref && `Réf. ${product.ref}`].filter(Boolean).join(', ');
  const note = $('[data-sheet-note]');
  note.hidden = !product.note;
  note.textContent = product.note ?? '';

  const colors = $('[data-sheet-colors]');
  colors.setAttribute('role', 'radiogroup');
  colors.innerHTML = product.colors
    .map((c) => `<button type="button" class="swatch" role="radio" data-color-btn="${c.name}" aria-label="${c.name}" style="--c:${c.hex}"></button>`)
    .join('');
  $$('[data-color-btn]', colors).forEach((b) => b.addEventListener('click', () => {
    state.color = product.colors.find((c) => c.name === b.dataset.colorBtn);
    refreshSheet();
  }));
  $('[data-sheet-colors-wrap]').hidden = product.colors.length === 0;

  const sizesWrap = $('[data-sheet-sizes-wrap]');
  const sizes = $('[data-sheet-sizes]');
  sizesWrap.hidden = !product.sizes;
  if (product.sizes) {
    sizes.setAttribute('role', 'radiogroup');
    sizes.innerHTML = product.sizes
      .map((s) => `<button type="button" class="size" role="radio" data-size-btn="${s}">${s}</button>`)
      .join('');
    $$('[data-size-btn]', sizes).forEach((b) => b.addEventListener('click', () => {
      state.size = Number(b.dataset.sizeBtn);
      refreshSheet();
    }));
  }

  refreshSheet();
  sheet.showModal();
  document.documentElement.classList.add('is-locked');
}

sheet.addEventListener('close', () => document.documentElement.classList.remove('is-locked'));

// Arrivée depuis un lien d'article (…/#produit=<id>&couleur=<couleur>) : on ouvre sa fiche.
function openFromHash() {
  const params = new URLSearchParams(location.hash.slice(1));
  const product = products.find((p) => p.id === params.get('produit'));
  if (!product) return;
  const color = product.colors.find((c) => slugify(c.name) === params.get('couleur'));
  history.replaceState(null, '', location.pathname + location.search);
  $('#collection')?.scrollIntoView();
  openSheet(product, color);
}
openFromHash();
window.addEventListener('hashchange', openFromHash);
// Clic sur le fond assombri : on ferme.
sheet.addEventListener('click', (e) => { if (e.target === sheet) sheet.close(); });

/* ---------- Scène 3D (chargée à part pour ne pas retarder la page) ---------- */
const RING = ['r01', 'r18', 'r03', 'c13_hero', 'r08', 'r19', 'r13', 'c06_hero', 'r10', 'r17'];
const stage = $('[data-stage]');
const fallback = $('[data-stage-fallback]');
const tintName = $('[data-tint-name]');
let hero = null;

function webglAvailable() {
  try {
    const c = document.createElement('canvas');
    return !!(window.WebGL2RenderingContext && c.getContext('webgl2'));
  } catch {
    return false;
  }
}

function showFallback(hex = '#A8743F') {
  stage.hidden = true;
  fallback.hidden = false;
  fallback.innerHTML = illustration({ category: 'sac', shape: 'main', colors: [] }, hex);
}

if (webglAvailable()) {
  import('./hero3d.js')
    .then(({ initHero }) => {
      hero = initHero(stage, { reducedMotion, ringImages: RING.map((name) => `produits/ring/${name}.webp`) });
      document.body.classList.add('has-3d');
      onVoyage();
    })
    .catch(() => showFallback());
} else {
  showFallback();
}

$$('[data-tint]').forEach((btn) => btn.addEventListener('click', () => {
  $$('[data-tint]').forEach((b) => b.setAttribute('aria-checked', String(b === btn)));
  tintName.textContent = btn.dataset.name;
  if (hero) hero.setColor(btn.dataset.tint);
  else showFallback(btn.dataset.tint);
}));

/* ---------- Voyage : le défilement pilote la scène 3D et fait apparaître les textes ---------- */
const voyage = $('[data-voyage]');
const beats = $$('[data-beat]');
const hint = $('[data-hint]');
function onVoyage() {
  const total = voyage.offsetHeight - window.innerHeight;
  const p = total > 0 ? Math.min(1, Math.max(0, -voyage.getBoundingClientRect().top / total)) : 0;
  if (hero) hero.setProgress(p);
  beats.forEach((beat) => {
    const from = Number(beat.dataset.from);
    const to = Number(beat.dataset.to);
    const fade = 0.07;
    const o = Math.min(1, Math.max(0, (p - from) / fade)) * Math.min(1, Math.max(0, (to - p) / fade));
    beat.style.opacity = o;
    beat.style.setProperty('--shift', `${(1 - o) * 24}px`);
    beat.classList.toggle('is-live', o > 0.5);
  });
  hint.style.opacity = p < 0.04 ? 1 : 0;
}
window.addEventListener('scroll', onVoyage, { passive: true });
window.addEventListener('resize', onVoyage);
onVoyage();

/* ---------- Apparition du titre (un seul moment animé, au chargement) ---------- */
requestAnimationFrame(() => document.body.classList.add('is-ready'));
