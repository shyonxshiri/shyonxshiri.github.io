/* NAV CONTRAST, MEASURED ON THE COMPOSITED FRAME.
   This replaces a version that modelled the opener's veil gradient by hand and sampled the
   raw image under it. That was the right method while the nav had no ground of its own and
   the picture had to be darkened to carry it. It is the wrong method now: the bar is
   translucent with a backdrop blur, so what sits behind the type is the BAR's fill over a
   blurred photograph, and neither a gradient formula nor the source image describes it.
   So this screenshots the real page and reads the real pixels: the ground either side of
   the nav's glyphs, and the glyph pixels themselves, on every page.
   Run against the localhost form; vite refuses 127.0.0.1. */
const { main } = require('./cdp.cjs');
const URL = process.argv[2] || 'http://localhost:5421/';
let pass = 0, fail = 0;
const ok = (c,m,x)=>{ c?(pass++,console.log('  PASS '+m+(x?'  '+x:''))):(fail++,console.log('  FAIL '+m+(x?'  '+x:''))); };

const lum = (r,g,b) => { const f = v => { v/=255; return v<=.03928 ? v/12.92 : Math.pow((v+.055)/1.055,2.4); };
  return .2126*f(r) + .7152*f(g) + .0722*f(b); };
const ratio = (a,b) => { const L1=Math.max(a,b), L2=Math.min(a,b); return (L1+.05)/(L2+.05); };

main(async ({ evaluate, sleep, send, logs }) => {
  await send('Emulation.setDeviceMetricsOverride',{width:1512,height:900,deviceScaleFactor:1,mobile:false});
  await sleep(4200);

  const sample = async (label) => {
    // Where the nav items actually are, in CSS pixels.
    const boxes = await evaluate(`(() => [...document.querySelectorAll('nav button')].map(b => {
      const r = b.getBoundingClientRect();
      return { t: b.textContent.trim(), x: Math.round(r.left), y: Math.round(r.top),
               w: Math.round(r.width), h: Math.round(r.height),
               op: +getComputedStyle(b).opacity, col: getComputedStyle(b).color };
    }))()`);
    const { data } = await send('Page.captureScreenshot', { format: 'png' });
    const px = await evaluate(`(async () => {
      const img = new Image();
      await new Promise(r => { img.onload = r; img.src = 'data:image/png;base64,${data}'; });
      const c = document.createElement('canvas'); c.width = img.width; c.height = img.height;
      c.getContext('2d').drawImage(img,0,0);
      window.__ctx = c.getContext('2d'); window.__scale = img.width / window.innerWidth;
      return { w: img.width, scale: img.width / window.innerWidth };
    })()`, true);

    for (const b of boxes) {
      const r = await evaluate(`(() => {
        const s = window.__scale, ctx = window.__ctx;
        const x0 = Math.round(${b.x}*s), y0 = Math.round(${b.y}*s),
              w = Math.round(${b.w}*s), h = Math.round(${b.h}*s);
        const d = ctx.getImageData(x0, y0, w, h).data;
        // glyph pixels are the extremes; the ground is the median. Split on luminance.
        const L = [];
        for (let i=0;i<d.length;i+=4) L.push([d[i],d[i+1],d[i+2]]);
        L.sort((p,q) => (p[0]+p[1]+p[2]) - (q[0]+q[1]+q[2]));
        return { dark: L[Math.round(L.length*0.06)], light: L[Math.round(L.length*0.94)],
                 mid: L[Math.round(L.length*0.5)] };
      })()`);
      const cr = ratio(lum(...r.light), lum(...r.dark));
      ok(cr >= 4.5, `${label} · ${b.t}${b.op < 1 ? ' (dim)' : ''}`,
         cr.toFixed(2) + ':1  ground ' + r.mid.join(','));
    }
  };

  await sample('home hero');
  await evaluate(`document.querySelector('.ss-home-scroll').scrollTo({top: 900})`); await sleep(1500);
  await sample('home opener');
  for (const p of ['work','about','contact']) {
    await evaluate(`[...document.querySelectorAll('button,a')].find(e=>new RegExp('^${p}$','i').test((e.textContent||'').trim()))?.click()`);
    await sleep(2400);
    await sample(p);
  }
  ok(logs.filter(l=>/^error|EXCEPTION/i.test(l)).length===0,'zero console errors');
  console.log(`\n${pass} passed, ${fail} failed  (WCAG AA for large text is 3:1; this asserts 4.5:1)`);
  process.exitCode = fail ? 1 : 0;
}, URL);
