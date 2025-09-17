// background.js (optimized)
(() => {
  const TILE = { w: 640, h: 240, dprCap: 1.5 };
  const COLORS = {
    dark:  { bg: '#0b0c10', stroke: 'rgba(229,112,69,0.25)' },
    light: { bg: '#f7f7f8',  stroke: 'rgba(50,50,150,0.10)' }
  };
  const cache = {}; // theme -> dataURL

  const randn = (m,s)=> m + Math.sqrt(-2*Math.log(Math.random()))*Math.cos(2*Math.PI*Math.random())*s;
  const pdf   = (x,m,s)=> Math.exp(-((x-m)*(x-m))/(2*s*s))/Math.sqrt(2*Math.PI*s*s);

  function makeTile(theme){
    const dpr = Math.min(TILE.dprCap, window.devicePixelRatio || 1);
    const c = document.createElement('canvas');
    c.width  = Math.floor(TILE.w * dpr);
    c.height = Math.floor(TILE.h * dpr);
    const g = c.getContext('2d');
    g.setTransform(dpr,0,0,dpr,0,0);

    g.fillStyle = COLORS[theme].bg;
    g.fillRect(0,0,TILE.w,TILE.h);
    g.strokeStyle = COLORS[theme].stroke;
    g.lineWidth = 1.2;

    const spacing = 72, step = 16, rows = Math.floor(TILE.h/spacing);
    for (let i=0;i<rows;i++){
      const y = spacing + i*spacing;
      const modes = (Math.random()*3|0)+1;
      const mus   = Array.from({length:modes}, ()=> randn(TILE.w/2, TILE.w/10));
      const sig   = Array.from({length:modes}, ()=> Math.max(12, Math.abs(randn(0.03*TILE.w, TILE.w/180))));
      let w = y;
      g.beginPath();
      for (let x=0;x<=TILE.w;x+=step){
        let noise=0; for (let k=0;k<modes;k++) noise += pdf(x, mus[k], sig[k]);
        w = 0.5*w + 0.5*(y - (spacing/22)*TILE.w*noise + randn(0, spacing/22));
        x===0 ? g.moveTo(x,w) : g.lineTo(x,w);
      }
      g.stroke();
    }
    return c.toDataURL('image/png');
  }

function applyBG(theme){
  const target = document.body; // was: document.getElementById('background-container')
  if (!target || !cache[theme]) return;
  target.style.backgroundImage  = `url(${cache[theme]})`;
  target.style.backgroundRepeat = 'repeat';
  target.style.backgroundSize   = `${TILE.w}px ${TILE.h}px`;
  // Important: let it scroll with content (default behavior)
  target.style.backgroundAttachment = 'scroll'; // explicit for clarity
  target.style.backgroundPosition = 'top left'; // or '0 0'
}

  function currentTheme(){
    return document.body.dataset.theme ||
      (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  }

  document.addEventListener('DOMContentLoaded', () => {
    const el = document.getElementById('background-container');
    // if (el) {
    //   el.style.position='fixed';
    //   el.style.inset='0';
    //   el.style.zIndex='-1';
    //   el.style.pointerEvents='none';
    // }

    const build = t => { cache[t] = makeTile(t); };
    if ('requestIdleCallback' in window) {
      requestIdleCallback(()=> build('light')); requestIdleCallback(()=> build('dark'));
    } else {
      setTimeout(()=> build('light'),0); setTimeout(()=> build('dark'),0);
    }
    // apply as soon as available
    const t = currentTheme();
    const applyWhenReady = () => cache[t] ? applyBG(t) : setTimeout(applyWhenReady, 30);
    applyWhenReady();
  });

  // On theme attribute change: just swap image (no re-draw)
  new MutationObserver(() => applyBG(currentTheme()))
    .observe(document.body, { attributes:true, attributeFilter:['data-theme'] });
})();
