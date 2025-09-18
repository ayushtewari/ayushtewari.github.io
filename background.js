(() => {
  // --- Configuration ---
  const TILE = { w: 1280, h: 800 };
  const COLORS = {
    light: { bg: '#f7f7f8', stroke: 'rgba(50,50,150,0.10)' },
    dark:  { bg: '#0b0c10', stroke: 'rgba(229,112,69,0.15)' },
  };
  const cache = {};

  // --- Generative Art Functions ---
  function randn(m, s) { return m + (Math.sqrt(-2.0 * Math.log(Math.random())) * Math.cos(2.0 * Math.PI * Math.random())) * s; }
  function normalPDF(x, m, s) { return Math.exp(-Math.pow((x - m), 2) / (2 * s * s)) / Math.sqrt(2 * Math.PI * s * s); }

  // --- Main Drawing Function ---
  function makeTile(theme) {
    const canvas = document.createElement("canvas");
    canvas.width = TILE.w; canvas.height = TILE.h;
    const ctx = canvas.getContext("2d");
    const themeColors = COLORS[theme];
    const lineWidth = theme === 'light' ? 1.5 : 2.5;

    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = themeColors.stroke;
    ctx.fillStyle = themeColors.bg;
    ctx.fillRect(0, 0, canvas.width, canvas.height); // This still colors the whole canvas

    // --- NEW: Define the drawing boundaries ---
    const margin = canvas.width * 0.0; // 7.5% margin on each side. Adjust as you like.
    const drawableWidth = canvas.width - 2 * margin;

    const dy = 50, xRes = 100, dx = drawableWidth / xRes, yLines = (canvas.height - dy) / dy;

    for (let i = 0; i <= yLines; i++) {
      const nModes = Math.floor(Math.random() * 6) + 1;
      ctx.beginPath();
      const mus = [], sigmas = [];
      for (let j = 0; j < nModes; j++) {
        // Center the 'peaks' within the new drawable area
        mus[j] = randn(margin + drawableWidth / 2, drawableWidth / 15);
        sigmas[j] = randn(0.03 * drawableWidth, drawableWidth / 200);
      }
      let y = dy + (i * dy), w = y;

      // UPDATED: Start drawing from the left margin
      ctx.moveTo(margin, w);
      const points = [];
      for (let j = 0; j < xRes; j++) {
        // UPDATED: Calculate x-position with the margin offset
        const x = margin + (j + 1) * dx;
        let noise = 0;
        for (let l = 0; l < nModes; l++) noise += normalPDF(x, mus[l], sigmas[l]);
        const noiseEffect = (dy / 30) * canvas.width * noise + randn(0, dy / 35);
        w = 0.3 * w + 0.7 * (y - noiseEffect);
        points.push({ x, y: w });
      }

      // This part for drawing curves remains the same, as it uses the 'points' array
      // which now contains the correctly offset coordinates.
      for (let j = 1; j < points.length - 2; j++) {
        const xc = (points[j].x + points[j + 1].x) / 2;
        const yc = (points[j].y + points[j + 1].y) / 2;
        ctx.quadraticCurveTo(points[j].x, points[j].y, xc, yc);
      }
      ctx.quadraticCurveTo(points[points.length - 2].x, points[points.length - 2].y, points[points.length - 1].x, points[points.length - 1].y);
      ctx.fill(); ctx.stroke();
    }
    return canvas.toDataURL('image/jpeg', 0.9);
  }

  // --- DOM Interaction ---
  function applyBG(theme) {
    // const target = document.getElementById('background-container');
    const target = document.body;
    if (!target || !cache[theme]) return;
    target.style.transition = 'opacity 0.8s ease-in-out';
    target.style.backgroundImage = `url(${cache[theme]})`;
    target.style.opacity = 1;
  }

  // --- CORRECTED THEME DETECTION ---
  // This now correctly reads the theme from the `<html>` tag (document.documentElement).
  function currentTheme() {
    return document.documentElement.dataset.theme || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  }

  // This global function is called by the theme toggle button in base.njk
  window.redrawBackground = () => {
    applyBG(currentTheme());
  };

  // --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
  const t = currentTheme();
  cache[t] = cache[t] || makeTile(t);
  applyBG(t);

  // build the other theme when idle
  const other = t === 'dark' ? 'light' : 'dark';
  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => { cache[other] = cache[other] || makeTile(other); });
  } else {
    setTimeout(() => { cache[other] = cache[other] || makeTile(other); }, 0);
  }
});
})();

