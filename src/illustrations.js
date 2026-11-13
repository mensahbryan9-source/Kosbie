// Illustrations vectorielles utilisées tant qu'un article n'a pas de vraie photo.
// Chaque dessin reçoit la couleur du modèle et se teinte automatiquement.

const GOLD = '#C9A45C';
const GOLD_DARK = '#9C7A3C';

function mix(hex, target, amount) {
  const a = hex.replace('#', '');
  const b = target.replace('#', '');
  const out = [0, 2, 4].map((i) => {
    const x = parseInt(a.slice(i, i + 2), 16);
    const y = parseInt(b.slice(i, i + 2), 16);
    return Math.round(x + (y - x) * amount).toString(16).padStart(2, '0');
  });
  return `#${out.join('')}`;
}
const dark = (c, a = 0.28) => mix(c, '#000000', a);
const light = (c, a = 0.25) => mix(c, '#ffffff', a);

function wrap(inner, uid) {
  return `<svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true">
  <defs>
    <linearGradient id="sheen-${uid}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#fff" stop-opacity=".22"/>
      <stop offset=".45" stop-color="#fff" stop-opacity="0"/>
      <stop offset="1" stop-color="#000" stop-opacity=".12"/>
    </linearGradient>
    <radialGradient id="floor-${uid}" cx=".5" cy=".5" r=".5">
      <stop offset="0" stop-color="#3a2a1e" stop-opacity=".22"/>
      <stop offset="1" stop-color="#3a2a1e" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <ellipse cx="200" cy="350" rx="150" ry="14" fill="url(#floor-${uid})"/>
  ${inner}
</svg>`;
}

const bags = {
  cabas(c, u) {
    return `
    <path d="M150 178 C150 92 250 92 250 178" fill="none" stroke="${dark(c, .42)}" stroke-width="9" stroke-linecap="round"/>
    <path d="M132 178 C132 76 268 76 268 178" fill="none" stroke="${dark(c, .18)}" stroke-width="10" stroke-linecap="round"/>
    <path d="M92 176 H308 L332 326 Q334 344 316 344 H84 Q66 344 68 326 Z" fill="${c}"/>
    <path d="M92 176 H308 L332 326 Q334 344 316 344 H84 Q66 344 68 326 Z" fill="url(#sheen-${u})"/>
    <path d="M92 176 H308 L311 196 H89 Z" fill="${dark(c, .14)}"/>
    <path d="M96 204 H304" stroke="${light(c, .3)}" stroke-width="1.5" stroke-dasharray="5 5" opacity=".7"/>
    ${[132, 150, 250, 268].map((x) => `<circle cx="${x}" cy="186" r="5" fill="${GOLD}" stroke="${GOLD_DARK}" stroke-width="1.5"/>`).join('')}`;
  },
  pochette(c, u) {
    return `
    <path d="M78 196 C100 70 300 70 322 196" fill="none" stroke="${GOLD}" stroke-width="4" stroke-dasharray="9 4" stroke-linecap="round"/>
    <rect x="64" y="190" width="272" height="132" rx="14" fill="${c}"/>
    <rect x="64" y="190" width="272" height="132" rx="14" fill="url(#sheen-${u})"/>
    <path d="M64 204 Q64 190 78 190 H322 Q336 190 336 204 V222 L200 276 L64 222 Z" fill="${dark(c, .18)}"/>
    <path d="M64 222 L200 276 L336 222" fill="none" stroke="${light(c, .25)}" stroke-width="1.5" stroke-dasharray="5 5" opacity=".7"/>
    <rect x="186" y="262" width="28" height="22" rx="4" fill="${GOLD}" stroke="${GOLD_DARK}" stroke-width="2"/>
    <circle cx="78" cy="196" r="6" fill="none" stroke="${GOLD}" stroke-width="3"/>
    <circle cx="322" cy="196" r="6" fill="none" stroke="${GOLD}" stroke-width="3"/>`;
  },
  main(c, u) {
    return `
    <path d="M152 186 C152 104 248 104 248 186" fill="none" stroke="${dark(c, .2)}" stroke-width="14" stroke-linecap="round"/>
    <path d="M104 184 H296 Q316 184 320 204 L338 318 Q342 344 316 344 H84 Q58 344 62 318 L80 204 Q84 184 104 184 Z" fill="${c}"/>
    <path d="M104 184 H296 Q316 184 320 204 L338 318 Q342 344 316 344 H84 Q58 344 62 318 L80 204 Q84 184 104 184 Z" fill="url(#sheen-${u})"/>
    <path d="M86 196 Q90 184 104 184 H296 Q310 184 314 196 L318 236 Q200 282 82 236 Z" fill="${dark(c, .16)}"/>
    <path d="M84 244 Q200 290 316 244" fill="none" stroke="${light(c, .25)}" stroke-width="1.5" stroke-dasharray="5 5" opacity=".7"/>
    <rect x="182" y="246" width="36" height="26" rx="5" fill="${GOLD}" stroke="${GOLD_DARK}" stroke-width="2"/>
    <rect x="194" y="254" width="12" height="10" rx="2" fill="${GOLD_DARK}"/>
    <circle cx="152" cy="190" r="7" fill="none" stroke="${GOLD}" stroke-width="4"/>
    <circle cx="248" cy="190" r="7" fill="none" stroke="${GOLD}" stroke-width="4"/>`;
  },
  seau(c, u) {
    return `
    <path d="M116 168 C112 40 288 40 284 168" fill="none" stroke="${dark(c, .25)}" stroke-width="7" stroke-linecap="round"/>
    <path d="M110 166 H290 L312 318 Q316 346 286 346 H114 Q84 346 88 318 Z" fill="${c}"/>
    <path d="M110 166 H290 L312 318 Q316 346 286 346 H114 Q84 346 88 318 Z" fill="url(#sheen-${u})"/>
    <ellipse cx="200" cy="166" rx="90" ry="16" fill="${dark(c, .45)}"/>
    <path d="M114 186 Q200 204 286 186" fill="none" stroke="${dark(c, .3)}" stroke-width="5"/>
    ${[130, 165, 200, 235, 270].map((x, i) => `<circle cx="${x}" cy="${190 + (i === 2 ? 8 : i % 2 ? 6 : 1)}" r="4.5" fill="${GOLD}" stroke="${GOLD_DARK}" stroke-width="1.5"/>`).join('')}
    <path d="M206 198 L216 246 M206 198 L196 248" stroke="${dark(c, .3)}" stroke-width="4" stroke-linecap="round"/>
    <circle cx="216" cy="250" r="5" fill="${GOLD}"/><circle cx="196" cy="252" r="5" fill="${GOLD}"/>`;
  },
};

const shoes = {
  escarpin(c, u) {
    return `
    <path d="M98 300 L122 300 L113 346 L102 346 Z" fill="${dark(c, .35)}"/>
    <path d="M86 296 C80 236 112 206 142 212 C160 216 172 238 188 258 C218 292 276 294 326 296 C350 297 356 316 342 326 C330 334 300 334 262 334 H170 C140 334 120 318 108 304 Z" fill="${c}"/>
    <path d="M86 296 C80 236 112 206 142 212 C160 216 172 238 188 258 C218 292 276 294 326 296 C350 297 356 316 342 326 C330 334 300 334 262 334 H170 C140 334 120 318 108 304 Z" fill="url(#sheen-${u})"/>
    <path d="M96 252 C108 226 138 222 156 238 C168 248 176 260 186 266 C150 270 116 266 96 252 Z" fill="${dark(c, .5)}"/>
    <path d="M108 304 C130 326 150 334 172 334 H262 C300 334 330 334 342 326" fill="none" stroke="${dark(c, .45)}" stroke-width="4"/>`;
  },
  sandale(c, u) {
    const s = dark(c, .15);
    return `
    <path d="M96 290 H128 L124 346 H100 Z" fill="${dark(c, .35)}"/>
    <path d="M90 290 C120 300 150 318 190 324 C240 330 300 326 334 322 C352 320 356 334 340 338 C300 346 220 346 180 342 C140 338 108 316 90 302 Z" fill="${dark(c, .3)}"/>
    <path d="M92 214 C90 250 92 276 96 292" fill="none" stroke="${s}" stroke-width="12" stroke-linecap="round"/>
    <path d="M80 222 C100 210 126 212 140 226" fill="none" stroke="${c}" stroke-width="9" stroke-linecap="round"/>
    <rect x="128" y="216" width="18" height="18" rx="3" fill="none" stroke="${GOLD}" stroke-width="4"/>
    <path d="M244 326 C252 290 300 284 320 322" fill="none" stroke="${c}" stroke-width="10" stroke-linecap="round"/>
    <path d="M262 328 C274 300 304 298 312 320" fill="none" stroke="${light(c, .25)}" stroke-width="5" stroke-linecap="round"/>
    <path d="M190 322 C198 300 216 296 228 326" fill="none" stroke="${c}" stroke-width="7" stroke-linecap="round"/>`;
  },
  mule(c, u) {
    return `
    <path d="M112 312 L134 312 L130 346 L116 346 Z" fill="${dark(c, .35)}"/>
    <path d="M84 312 C120 316 160 324 200 326 C260 330 310 326 336 322 C354 320 358 336 342 340 C300 348 220 348 170 344 C130 340 100 330 84 322 Z" fill="${dark(c, .32)}"/>
    <path d="M176 324 C180 268 236 240 290 262 C320 274 344 298 342 322 C300 330 230 330 176 324 Z" fill="${c}"/>
    <path d="M176 324 C180 268 236 240 290 262 C320 274 344 298 342 322 C300 330 230 330 176 324 Z" fill="url(#sheen-${u})"/>
    <path d="M178 316 C190 278 230 262 262 270" fill="none" stroke="${light(c, .3)}" stroke-width="2" stroke-dasharray="5 5"/>
    <rect x="236" y="276" width="30" height="12" rx="4" fill="${GOLD}" stroke="${GOLD_DARK}" stroke-width="1.5" transform="rotate(-12 251 282)"/>`;
  },
  ballerine(c, u) {
    return `
    <path d="M70 318 C70 286 96 270 130 274 C160 278 176 296 206 298 C250 300 300 290 330 300 C352 308 352 334 330 338 C290 344 200 346 140 344 C96 342 70 336 70 318 Z" fill="${c}"/>
    <path d="M70 318 C70 286 96 270 130 274 C160 278 176 296 206 298 C250 300 300 290 330 300 C352 308 352 334 330 338 C290 344 200 346 140 344 C96 342 70 336 70 318 Z" fill="url(#sheen-${u})"/>
    <path d="M86 296 C100 280 130 280 150 290 C170 300 190 306 214 306 C180 316 120 316 86 296 Z" fill="${dark(c, .5)}"/>
    <path d="M70 330 C120 344 260 346 336 334" fill="none" stroke="${dark(c, .4)}" stroke-width="4"/>
    <path d="M222 300 C206 286 200 312 222 306 C244 312 238 286 222 300 Z" fill="${dark(c, .2)}"/>
    <circle cx="222" cy="303" r="4" fill="${GOLD}"/>`;
  },
};

let counter = 0;
export function illustration(product, colorHex) {
  const color = colorHex || product.colors?.[0]?.hex || '#A8743F';
  const set = product.category === 'sac' ? bags : shoes;
  const draw = set[product.shape] || Object.values(set)[0];
  counter += 1;
  return wrap(draw(color, counter), counter);
}
