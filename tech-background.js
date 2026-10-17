/* Lightweight decorative constellation. No network or third-party dependencies. */
(() => {
  const canvas = document.getElementById('tech-background');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const button = document.getElementById('motion-toggle');
  let width = 0, height = 0, nodes = [], request = null, previous = 0;
  let paused = false, dark = false;
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
    const count = reduced.matches ? 20 : width < 640 ? 24 : 66;
    nodes = Array.from({ length: count }, () => ({ x: Math.random() * width,
      y: Math.random() * height, vx: (Math.random() - .5) * .24,
      vy: (Math.random() - .5) * .24, r: .8 + Math.random() * 1.5 }));
    draw(false);
  }
  function draw(move) {
    colors(); ctx.clearRect(0, 0, width, height);
    for (const p of nodes) {
      if (move) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < -10) p.x = width + 10; if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10; if (p.y > height + 10) p.y = -10;
      }
      const dx = p.x - point.x, dy = p.y - point.y;
      const near = Math.max(0, 1 - Math.hypot(dx, dy) / 150);
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r + near, 0, Math.PI * 2);
      ctx.fillStyle = dark ? `rgba(103,211,229,${.34 + near * .22})` : `rgba(47,105,154,${.30 + near * .18})`;
      ctx.fill();
    }
    const distance = width < 640 ? 95 : 155;
    for (let i = 0; i < nodes.length; i++) {
      let links = 0;
      for (let j = i + 1; j < nodes.length && links < 3; j++) {
        const a = nodes[i], b = nodes[j], d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d > distance) continue;
        ctx.strokeStyle = dark ? `rgba(103,211,229,${.16 * (1 - d / distance)})` : `rgba(47,105,154,${.14 * (1 - d / distance)})`;
        ctx.lineWidth = .65; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke(); links++;
      }
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
