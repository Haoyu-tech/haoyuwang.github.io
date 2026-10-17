/* Decorative light field. No mesh or connections between particles. */
(() => {
  const canvas = document.getElementById('tech-background');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const button = document.getElementById('motion-toggle');
  let width = 0, height = 0, nodes = [], request = null, previous = 0;
  let paused = false, dark = false, phase = 0;
  try { paused = localStorage.getItem('haoyu-background-paused') === 'true'; } catch (_) {}
  const point = { x: -1000, y: -1000 };
  function colors() {
    dark = document.documentElement.dataset.theme === 'dark' ||
      (!document.documentElement.dataset.theme && matchMedia('(prefers-color-scheme: dark)').matches);
  }
  function resize() {
    width = innerWidth; height = innerHeight;
    const ratio = Math.min(devicePixelRatio || 1, 1.5);
    canvas.width = Math.round(width * ratio); canvas.height = Math.round(height * ratio);
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    const count = reduced.matches ? 28 : width < 640 ? 42 : 110;
    nodes = Array.from({ length: count }, () => ({ x: Math.random() * width,
      y: Math.random() * height, vx: .12 + Math.random() * .32,
      vy: -.08 - Math.random() * .2, r: .5 + Math.random() * 1.5,
      glow: Math.random() > .8, offset: Math.random() * Math.PI * 2 }));
    draw(false);
  }
  function draw(move) {
    colors(); ctx.clearRect(0, 0, width, height);
    if (move) phase += .012;
    // A broad, slow sweep reads as light rather than a connecting line.
    const sweepY = height * (.5 + Math.sin(phase * .16) * .55);
    const sweep = ctx.createLinearGradient(0, sweepY - 100, 0, sweepY + 100);
    sweep.addColorStop(0, 'transparent');
    sweep.addColorStop(.5, dark ? 'rgba(80,195,235,.045)' : 'rgba(40,130,180,.025)');
    sweep.addColorStop(1, 'transparent');
    ctx.fillStyle = sweep; ctx.fillRect(0, 0, width, height);
    for (const p of nodes) {
      if (move) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < -10) p.x = width + 10; if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10; if (p.y > height + 10) p.y = -10;
      }
      const dx = p.x - point.x, dy = p.y - point.y;
      const near = Math.max(0, 1 - Math.hypot(dx, dy) / 150);
      const shimmer = .75 + Math.sin(phase + p.offset) * .25;
      if (p.glow) {
        const halo = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, 18);
        halo.addColorStop(0, dark ? 'rgba(111,194,255,.20)' : 'rgba(43,113,184,.13)');
        halo.addColorStop(1, 'transparent');
        ctx.fillStyle = halo; ctx.fillRect(p.x - 18, p.y - 18, 36, 36);
      }
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r + near * .7, 0, Math.PI * 2);
      ctx.fillStyle = dark ? `rgba(140,222,255,${(.55 + near * .25) * shimmer})` : `rgba(47,105,154,${(.4 + near * .2) * shimmer})`;
      ctx.fill();
    }
  }
  function frame(now) {
    request = null;
    if (now - previous > 32) { draw(true); previous = now; }
    request = requestAnimationFrame(frame);
  }
  function sync() {
    if (request !== null) cancelAnimationFrame(request);
    request = null;
    const active = !paused && !reduced.matches && !document.hidden;
    canvas.dataset.motion = reduced.matches ? 'reduced' : active ? 'running' : 'paused';
    if (button) {
      button.setAttribute('aria-pressed', String(active));
      button.setAttribute('aria-label', reduced.matches ? 'Background animation disabled by reduced motion preference' : active ? 'Pause background animation' : 'Resume background animation');
      button.textContent = active ? 'Motion on' : 'Motion off';
      button.disabled = reduced.matches;
    }
    draw(false); if (active) request = requestAnimationFrame(frame);
  }
  button?.addEventListener('click', () => {
    paused = !paused; try { localStorage.setItem('haoyu-background-paused', String(paused)); } catch (_) {}
    sync();
  });
  addEventListener('resize', () => { resize(); sync(); }, { passive: true });
  addEventListener('pointermove', e => { point.x = e.clientX; point.y = e.clientY; }, { passive: true });
  document.addEventListener('pointerleave', () => { point.x = point.y = -1000; });
  document.addEventListener('visibilitychange', sync);
  reduced.addEventListener('change', () => { resize(); sync(); });
  new MutationObserver(() => { colors(); draw(false); }).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  resize(); sync();
})();

