import { SHOP, formatPrice, whatsappLink } from './config.js';
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
function media(product, colorHex) {
  if (product.image) {
    return `<img src="${product.image}" alt="${product.name}" loading="lazy" decoding="async" />`;
  }
  return illustration(product, colorHex);
}

/* ---------- Catalogue ---------- */
const grid = $('[data-grid]');

function card(product) {
  const li = document.createElement('li');
  li.className = 'card';
  li.dataset.category = product.category;
  const dots = product.colors
    .map((c) => `<span class="dot" style="--c:${c.hex}" title="${c.name}"></span>`)
    .join('');
  li.innerHTML = `
    <button class="card__btn" type="button" aria-label="${product.name}, ${formatPrice(product.price)}. Voir le détail">
      <span class="card__media">${media(product)}</span>
      ${product.tag ? `<span class="card__tag">${product.tag}</span>` : ''}
      <span class="card__info">
        <span class="card__name">${product.name}</span>
        <span class="card__price">${formatPrice(product.price)}</span>
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

['tout', 'sac', 'chaussure'].forEach((key) => {
  const n = key === 'tout' ? products.length : products.filter((p) => p.category === key).length;
  const el = $(`[data-count="${key}"]`);
  if (el) el.textContent = n;
});

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
    `• ${product.name} (${CATEGORY_LABEL[product.category].toLowerCase()}) à ${formatPrice(product.price)}`,
  ];
  if (color) lines.push(`• Couleur : ${color.name}`);
  if (product.sizes) lines.push(`• Pointure : ${size ?? 'à préciser'}`);
  lines.push('Est-il disponible ?');
  return lines.join('\n');
}

function refreshSheet() {
  const { product, color, size } = state;
  $('[data-sheet-media]').innerHTML = media(product, color?.hex);
  $('[data-sheet-color-name]').textContent = color?.name ?? '';
  $('[data-sheet-size-name]').textContent = size ?? 'à choisir';
  $$('[data-color-btn]', sheet).forEach((b) => b.setAttribute('aria-checked', String(b.dataset.colorBtn === color?.name)));
  $$('[data-size-btn]', sheet).forEach((b) => b.setAttribute('aria-checked', String(Number(b.dataset.sizeBtn) === size)));
  $('[data-sheet-wa]').href = whatsappLink(orderMessage());
}

function openSheet(product) {
  state.product = product;
  state.color = product.colors[0] ?? null;
  state.size = null;

  $('[data-sheet-cat]').textContent = CATEGORY_LABEL[product.category];
  $('[data-sheet-title]').textContent = product.name;
  $('[data-sheet-price]').textContent = formatPrice(product.price);
  $('[data-sheet-desc]').textContent = product.description;

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
// Clic sur le fond assombri : on ferme.
sheet.addEventListener('click', (e) => { if (e.target === sheet) sheet.close(); });

/* ---------- Scène 3D (chargée à part pour ne pas retarder la page) ---------- */
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
      hero = initHero(stage, { reducedMotion });
      document.body.classList.add('has-3d');
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

/* ---------- Apparition du titre (un seul moment animé, au chargement) ---------- */
requestAnimationFrame(() => document.body.classList.add('is-ready'));
