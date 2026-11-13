// Scène 3D de l'accueil : un sac à main modélisé en code (aucun fichier 3D à télécharger),
// éclairé comme en vitrine, que l'on fait tourner du doigt ou de la souris.
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

const GOLD = new THREE.Color('#D4AF6A');

function taper(geometry, amount) {
  // Rétrécit le haut du sac pour lui donner une silhouette trapèze.
  const pos = geometry.attributes.position;
  geometry.computeBoundingBox();
  const { min, max } = geometry.boundingBox;
  for (let i = 0; i < pos.count; i += 1) {
    const t = (pos.getY(i) - min.y) / (max.y - min.y);
    const s = 1 - amount * t;
    pos.setX(i, pos.getX(i) * s);
    pos.setZ(i, pos.getZ(i) * (1 - amount * 0.6 * t));
  }
  geometry.computeVertexNormals();
  return geometry;
}

function leatherTexture() {
  // Grain de cuir procédural, utilisé comme carte de relief.
  const size = 256;
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#808080';
  ctx.fillRect(0, 0, size, size);
  for (let i = 0; i < 2600; i += 1) {
    const x = Math.random() * size;
    const y = Math.random() * size;
    const r = Math.random() * 1.4 + 0.3;
    const v = 100 + Math.random() * 70;
    ctx.fillStyle = `rgb(${v},${v},${v})`;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(5, 5);
  return tex;
}

function buildBag(leather, leatherDark, gold) {
  const bag = new THREE.Group();

  const body = new THREE.Mesh(taper(new RoundedBoxGeometry(2.6, 1.85, 1.0, 8, 0.22), 0.16), leather);
  body.castShadow = true;
  bag.add(body);

  // Rabat qui recouvre le haut de la face avant.
  const flapShape = new THREE.Shape();
  flapShape.moveTo(-1.12, 0);
  flapShape.lineTo(1.12, 0);
  flapShape.lineTo(1.2, -0.62);
  flapShape.quadraticCurveTo(0, -1.02, -1.2, -0.62);
  flapShape.lineTo(-1.12, 0);
  const flapGeo = new THREE.ExtrudeGeometry(flapShape, {
    depth: 0.05, bevelEnabled: true, bevelThickness: 0.025, bevelSize: 0.03, bevelSegments: 3, curveSegments: 24,
  });
  const flap = new THREE.Mesh(flapGeo, leatherDark);
  flap.position.set(0, 0.9, 0.44);
  flap.rotation.x = -0.1;
  bag.add(flap);

  // Fermoir doré.
  const clasp = new THREE.Mesh(new RoundedBoxGeometry(0.34, 0.24, 0.08, 4, 0.04), gold);
  clasp.position.set(0, 0.06, 0.6);
  bag.add(clasp);
  const claspInner = new THREE.Mesh(new THREE.TorusGeometry(0.06, 0.018, 12, 32), gold);
  claspInner.position.set(0, 0.06, 0.65);
  bag.add(claspInner);

  // Poignée.
  const handleCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.62, 0.92, 0),
    new THREE.Vector3(-0.6, 1.5, 0),
    new THREE.Vector3(-0.3, 1.86, 0),
    new THREE.Vector3(0.3, 1.86, 0),
    new THREE.Vector3(0.6, 1.5, 0),
    new THREE.Vector3(0.62, 0.92, 0),
  ]);
  const handle = new THREE.Mesh(new THREE.TubeGeometry(handleCurve, 64, 0.075, 16, false), leatherDark);
  bag.add(handle);

  // Anneaux dorés à la base de la poignée.
  [-0.62, 0.62].forEach((x) => {
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.11, 0.025, 12, 32), gold);
    ring.position.set(x, 0.98, 0);
    ring.rotation.y = Math.PI / 2;
    bag.add(ring);
  });

  // Pieds dorés.
  [[-0.95, -0.32], [0.95, -0.32], [-0.95, 0.32], [0.95, 0.32]].forEach(([x, z]) => {
    const foot = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.07, 0.06, 20), gold);
    foot.position.set(x, -0.95, z);
    bag.add(foot);
  });

  bag.position.y = -0.1;
  return bag;
}

function goldDust(count) {
  const geo = new THREE.BufferGeometry();
  const positions = new Float32Array(count * 3);
  const speeds = new Float32Array(count);
  for (let i = 0; i < count; i += 1) {
    positions[i * 3] = (Math.random() - 0.5) * 9;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 6;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 5 - 1;
    speeds[i] = 0.05 + Math.random() * 0.12;
  }
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const mat = new THREE.PointsMaterial({
    color: GOLD, size: 0.035, transparent: true, opacity: 0.75, depthWrite: false, blending: THREE.AdditiveBlending,
  });
  const points = new THREE.Points(geo, mat);
  points.userData.speeds = speeds;
  return points;
}

export function initHero(container, { reducedMotion = false, ringImages = [] } = {}) {
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowMap;
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environmentIntensity = 0.32;

  const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 50);
  camera.position.set(0, 0.6, 7.2);
  camera.lookAt(0, 0.15, 0);

  // Lumières de vitrine : une principale chaude, un contre-jour doré.
  const key = new THREE.SpotLight('#fff1dc', 90, 20, Math.PI / 7, 0.55, 1.6);
  key.position.set(4.5, 5.5, 4);
  key.castShadow = true;
  key.shadow.mapSize.set(1024, 1024);
  key.shadow.radius = 6;
  scene.add(key);
  const rim = new THREE.PointLight('#e0b25e', 22, 12, 1.5);
  rim.position.set(-3.5, 1.5, -2.5);
  scene.add(rim);
  const fill = new THREE.DirectionalLight('#f5dcc0', 0.35);
  fill.position.set(-4, 1, 4);
  scene.add(fill);
  scene.add(new THREE.AmbientLight('#3a2a1c', 0.4));

  const bump = leatherTexture();
  const leather = new THREE.MeshPhysicalMaterial({
    color: '#A8743F', roughness: 0.6, clearcoat: 0.25, clearcoatRoughness: 0.5, sheen: 0.5,
    sheenColor: new THREE.Color('#ffe2c2'), bumpMap: bump, bumpScale: 0.45,
  });
  const leatherDark = leather.clone();
  leatherDark.color = new THREE.Color('#A8743F').multiplyScalar(0.82);
  const gold = new THREE.MeshStandardMaterial({ color: GOLD, metalness: 1, roughness: 0.22 });

  const pivot = new THREE.Group();
  const bag = buildBag(leather, leatherDark, gold);
  pivot.add(bag);
  const display = new THREE.Group();
  display.add(pivot);
  scene.add(display);

  // Socle : disque sombre qui reçoit l'ombre.
  const plinth = new THREE.Mesh(
    new THREE.CylinderGeometry(1.95, 2.02, 0.12, 96),
    new THREE.MeshStandardMaterial({ color: '#120d0a', roughness: 0.55, metalness: 0 }),
  );
  plinth.position.y = -1.12;
  plinth.receiveShadow = true;
  display.add(plinth);
  const plinthEdge = new THREE.Mesh(new THREE.TorusGeometry(1.98, 0.012, 8, 128), gold);
  plinthEdge.rotation.x = Math.PI / 2;
  plinthEdge.position.y = -1.06;
  display.add(plinthEdge);

  const dust = goldDust(reducedMotion ? 60 : 180);
  scene.add(dust);

  // Ronde de vrais sacs de la boutique : des photos détourées qui gravitent autour du sac 3D.
  const ring = new THREE.Group();
  scene.add(ring);
  const loader = new THREE.TextureLoader();
  const cards = ringImages.map((url, i) => {
    const mat = new THREE.MeshBasicMaterial({ transparent: true, opacity: 0, depthWrite: false, toneMapped: false });
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), mat);
    mesh.userData.angle = (i / ringImages.length) * Math.PI * 2;
    mesh.userData.lift = (i % 2 ? 0.55 : -0.25) + (i % 3) * 0.1;
    mesh.visible = false;
    loader.load(url, (tex) => {
      tex.colorSpace = THREE.SRGBColorSpace;
      mat.map = tex;
      mat.needsUpdate = true;
      const ratio = tex.image.width / tex.image.height;
      const h = ratio > 1 ? 1.45 / ratio : 1.45;
      mesh.scale.set(h * ratio, h, 1);
      mesh.userData.ready = true;
    });
    ring.add(mesh);
    return mesh;
  });

  // Couleur du cuir : transition douce vers la teinte choisie.
  const targetColor = new THREE.Color('#A8743F');
  function setColor(hex) {
    targetColor.set(hex);
  }

  // Défilement : la page envoie sa progression (0 → 1) et la scène se met en place.
  let progress = 0;
  function setProgress(p) {
    progress = Math.min(1, Math.max(0, p));
  }

  // Interaction : glisser pour tourner, survol pour un léger parallaxe.
  let dragging = false;
  let lastX = 0;
  let velocity = 0;
  let rotation = -0.5;
  const tilt = { x: 0, y: 0 };
  const el = renderer.domElement;
  el.addEventListener('pointerdown', (e) => {
    dragging = true;
    lastX = e.clientX;
    el.setPointerCapture(e.pointerId);
  });
  el.addEventListener('pointermove', (e) => {
    const r = el.getBoundingClientRect();
    tilt.x = ((e.clientY - r.top) / r.height - 0.5) * 0.2;
    tilt.y = ((e.clientX - r.left) / r.width - 0.5) * 0.2;
    if (!dragging) return;
    const dx = e.clientX - lastX;
    lastX = e.clientX;
    velocity = dx * 0.006;
    rotation += velocity;
  });
  const end = () => { dragging = false; };
  el.addEventListener('pointerup', end);
  el.addEventListener('pointercancel', end);
  el.addEventListener('pointerleave', () => { tilt.x = 0; tilt.y = 0; });

  let aspect = 1;
  function resize() {
    const { clientWidth: w, clientHeight: h } = container;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    aspect = w / h;
    camera.aspect = aspect;
    camera.updateProjectionMatrix();
  }
  const ro = new ResizeObserver(resize);
  ro.observe(container);
  resize();

  // Étapes du voyage : [progression, x du sac, y du sac, distance caméra, hauteur caméra, ronde visible, sac de face]
  const mix = (a, b, t) => a + (b - a) * t;
  const smooth = (t) => t * t * (3 - 2 * t);
  function keyframes() {
    const narrow = aspect < 1;
    const z = narrow ? Math.max(9.5, 5.4 / aspect) : 8.6;
    return narrow
      ? [[0, 0, 1.95, z * 1.08, 0.6, 0, 0], [0.4, 0, 1.25, z * 0.6, 0.5, 0, 1], [0.74, 0, -1.3, z * 1.25, 0.9, 1, 0], [1, 0, -1.3, z * 1.7, 2.6, 0.5, 0]]
      : [[0, 2.1, 0, z, 0.6, 0, 0], [0.4, -1.7, 0.1, 5.2, 0.45, 0, 1], [0.74, 0, -1.7, z * 1.3, 0.9, 1, 0], [1, 0, -1.7, z * 1.9, 2.8, 0.5, 0]];
  }
  function sample(p) {
    const k = keyframes();
    let i = 0;
    while (i < k.length - 2 && p > k[i + 1][0]) i += 1;
    const a = k[i];
    const b = k[i + 1];
    const t = smooth(Math.min(1, Math.max(0, (p - a[0]) / (b[0] - a[0]))));
    return a.map((v, j) => mix(v, b[j], t));
  }

  // Mise en scène d'entrée : le sac monte sur son socle pendant que la lumière s'allume.
  const intro = { t: reducedMotion ? 1 : 0 };
  let visible = true;
  const io = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; });
  io.observe(container);

  const cur = sample(0);
  let last = performance.now();
  let elapsed = 0;
  function frame() {
    const now = performance.now();
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;
    elapsed += dt;
    if (visible && !document.hidden) {
      const t = elapsed;
      if (intro.t < 1) intro.t = Math.min(1, intro.t + dt / 1.6);
      const ease = 1 - (1 - intro.t) ** 3;

      const target = sample(progress);
      const damp = reducedMotion ? 1 : 0.07;
      for (let i = 1; i < cur.length; i += 1) cur[i] += (target[i] - cur[i]) * damp;
      const [, bx, by, cz, cy, ringAmount, lock] = cur;

      if (!dragging) {
        velocity *= 0.94;
        rotation += velocity + (reducedMotion ? 0 : dt * 0.22);
      }
      // Pour le gros plan, le sac se présente de face (fermoir visible), puis reprend sa rotation.
      const front = Math.round((rotation - 0.38) / (Math.PI * 2)) * Math.PI * 2 + 0.38;
      pivot.rotation.y = mix(rotation, front, lock);
      pivot.rotation.x += (tilt.x - pivot.rotation.x) * 0.06;
      pivot.position.y = (1 - ease) * -0.6 + (reducedMotion ? 0 : Math.sin(t * 1.2) * 0.04);
      display.position.set(bx, by, 0);
      key.intensity = 90 * ease;
      rim.intensity = 22 * ease;
      camera.position.set(tilt.y * 1.5, cy, cz);
      camera.lookAt(bx * 0.12, 0.15 + by * 0.15, 0);

      leather.color.lerp(targetColor, 0.08);
      leatherDark.color.copy(leather.color).multiplyScalar(0.82);

      // La ronde : rayon adapté à l'écran, chaque photo reste face à la caméra.
      const radius = aspect < 1 ? 2.5 : 4.3;
      const spin = t * 0.12 + progress * 4;
      cards.forEach((card) => {
        const a = card.userData.angle + spin;
        card.position.set(bx + Math.sin(a) * radius, by + card.userData.lift, Math.cos(a) * radius * 0.8);
        card.quaternion.copy(camera.quaternion);
        const front = 0.55 + 0.45 * ((Math.cos(a) + 1) / 2);
        card.material.opacity = card.userData.ready ? ringAmount * front : 0;
        card.visible = card.material.opacity > 0.01;
      });

      if (!reducedMotion) {
        const pos = dust.geometry.attributes.position;
        const { speeds } = dust.userData;
        for (let i = 0; i < pos.count; i += 1) {
          let y = pos.getY(i) + speeds[i] * dt;
          if (y > 3) y = -3;
          pos.setY(i, y);
        }
        pos.needsUpdate = true;
      }
      renderer.render(scene, camera);
    }
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);

  return { setColor, setProgress };
}
