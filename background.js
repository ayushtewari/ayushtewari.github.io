(() => {
  // --- Helpers ---
  function randn(m, s) {
    return m + (Math.sqrt(-2 * Math.log(Math.random())) *
                Math.cos(2 * Math.PI * Math.random())) * s;
  }
  function normalPDF(x, m, s) {
    return Math.exp(-Math.pow((x - m), 2) / (2 * s * s)) /
           Math.sqrt(2 * Math.PI * s * s);
  }

  function drawBackground() {
    const container = document.getElementById('background-container');
    if (!container) {
      console.error('Error: #background-container not found.');
      return;
    }

    // Clear any previous canvases
    while (container.firstChild) container.removeChild(container.firstChild);

    const mainCanvas = document.createElement('canvas');
    const patternCanvas = document.createElement('canvas');
    container.appendChild(mainCanvas);

    const mainCtx = mainCanvas.getContext('2d');
    const patternCtx = patternCanvas.getContext('2d');

    const currentTheme = document.body.dataset.theme || 'dark';
    const colors = {
      dark:  { bg: '#000008', stroke: 'rgba(229,112,69,0.25)' },
      light: { bg: '#f5f5f5', stroke: 'rgba(50,50,150,0.05)' }
    };

    // Size + HiDPI
    const dpr = Math.max(1, window.devicePixelRatio || 1);
    const viewWidth = window.innerWidth;
    const canvasHeight = Math.max(document.body.scrollHeight, window.innerHeight);

    mainCanvas.style.width  = viewWidth + 'px';
    mainCanvas.style.height = canvasHeight + 'px';
    mainCanvas.width  = Math.floor(viewWidth  * dpr);
    mainCanvas.height = Math.floor(canvasHeight * dpr);
    mainCtx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const patternHeight = 250;
    patternCanvas.width  = Math.floor(viewWidth * dpr);
    patternCanvas.height = Math.floor(patternHeight * dpr);
    patternCtx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // Paint pattern tile
    patternCtx.fillStyle = colors[currentTheme].bg;
    patternCtx.strokeStyle = colors[currentTheme].stroke;
    patternCtx.lineWidth = 2;
    patternCtx.fillRect(0, 0, viewWidth, patternHeight);

    const lineSpacing = 50;
    const lineCount = Math.floor(patternHeight / lineSpacing);

    for (let i = 0; i < lineCount; i++) {
      const y = lineSpacing + i * lineSpacing;
      const modes  = Math.floor(Math.random() * 5) + 1;
      const mus    = Array.from({ length: modes }, () => randn(viewWidth / 2, viewWidth / 15));
      const sigmas = Array.from({ length: modes }, () => Math.max(10, Math.abs(randn(0.03 * viewWidth, viewWidth / 200))));
      let w = y;
      patternCtx.beginPath();
      for (let x = 0; x <= viewWidth; x += 10) {
        let noise = 0;
        for (let l = 0; l < modes; l++) noise += normalPDF(x, mus[l], sigmas[l]);
        w = 0.5 * w + 0.5 * (y - (lineSpacing / 20) * viewWidth * noise + randn(0, lineSpacing / 20));
        (x === 0 ? patternCtx.moveTo : patternCtx.lineTo).call(patternCtx, x, w);
      }
      patternCtx.stroke();
    }

    // Fill page with repeated tile
    const pattern = mainCtx.createPattern(patternCanvas, 'repeat');
    mainCtx.fillStyle = pattern;
    mainCtx.fillRect(0, 0, viewWidth, canvasHeight);
  }

  // Expose if you want to call manually elsewhere
  window.drawBackground = drawBackground;

  // Draw on load
  document.addEventListener('DOMContentLoaded', drawBackground);

  // Redraw on resize (throttled)
  let resizeTimer = null;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(drawBackground, 150);
  });

  // Redraw if theme changes (watch body[data-theme])
  new MutationObserver(drawBackground).observe(document.body, {
    attributes: true, attributeFilter: ['data-theme']
  });
})();
