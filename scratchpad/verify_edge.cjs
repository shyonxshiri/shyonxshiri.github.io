/* Two cases the main suite does not reach: a NARROW viewport, and the NABU card, which
   is the one card that is a bare transparent PNG with no .ss-card box round it. */
const { main } = require('./cdp.cjs');
let pass = 0, fail = 0;
const ok = (c, m, x) => { c ? (pass++, console.log('  PASS ' + m + (x ? '  ' + x : ''))) : (fail++, console.log('  FAIL ' + m + (x ? '  ' + x : ''))); };

async function run({ evaluate, sleep, send }, w, h, label, wantNabu) {
  await send('Emulation.setDeviceMetricsOverride', { width: w, height: h, deviceScaleFactor: 1, mobile: w < 700 });
  await send('Page.reload', {});
  await sleep(4000);
  await evaluate(`[...document.querySelectorAll('button,a')].find(e=>/^work$/i.test((e.textContent||'').trim())).click()`);
  await sleep(1600);

  if (wantNabu) {
    // Step the carousel until NABU is the centre card.
    for (let i = 0; i < 6; i++) {
      const isNabu = await evaluate(`(() => {
        const t = [...document.querySelectorAll('div')].find(d => d.textContent.trim() === 'NABU');
        return !!t;
      })()`);
      const centred = await evaluate(`(() => {
        const dots = [...document.querySelectorAll('div')].filter(d => /^NABU$/.test(d.textContent.trim()));
        if (!dots.length) return false;
        const r = dots[0].getBoundingClientRect();
        return Math.abs((r.left + r.width/2) - ${w}/2) < 60;
      })()`);
      if (isNabu && centred) break;
      await evaluate(`(() => { const d = [...document.querySelectorAll('div')].filter(e => e.style && e.style.borderRadius === '980px'); if (d[2]) d[2].click(); })()`);
      await sleep(900);
    }
  }

  const before = await evaluate(`(() => {
    const all = [...document.querySelectorAll('.ss-card')];
    const bare = [...document.querySelectorAll('div')].filter(d => d.style && d.style.perspective).map(d => [...d.children]).flat();
    const pool = ${wantNabu ? 'bare' : 'all'};
    const mid = pool.map(c=>({c,z:+getComputedStyle(c).zIndex||0})).sort((a,b)=>b.z-a.z)[0];
    if (!mid) return null;
    const r = mid.c.getBoundingClientRect();
    window.__src = { l:r.left, t:r.top, w:r.width, h:r.height };
    mid.c.click();
    return window.__src;
  })()`);
  ok(!!before, label + ': found a centre card', before ? `${before.w|0}x${before.h|0}` : '');
  if (!before) return;

  await sleep(40);
  const f = await evaluate(`(() => {
    const p = document.querySelector('.ss-work-modal');
    if (!p) return null;
    const r = p.getBoundingClientRect();
    const g = document.querySelector('[aria-hidden][style*="fixed"]');
    return { w:r.width, h:r.height, l:r.left, t:r.top,
             gImgs: g ? g.querySelectorAll('img').length : -1,
             gw: g ? g.getBoundingClientRect().width : -1 };
  })()`);
  ok(!!f, label + ': modal mounted');
  if (!f) return;
  // Not an equality test: headless renders at a few fps, so the first sample this driver
  // can take has already travelled some way. The claim is that it starts from the CARD,
  // so measure it as a FRACTION of the whole journey.
  // (the first-frame claim is asserted below, once the settled width is known)
  ok(f.gImgs >= 1, label + ': ghost carries the card image', 'imgs=' + f.gImgs);

  await sleep(1400);
  const s2 = await evaluate(`(() => { const p = document.querySelector('.ss-work-modal'); const r = p.getBoundingClientRect(); return { w:r.width, l:r.left, op:+getComputedStyle(p).opacity }; })()`);
  // The panel's own width is 76vw capped at 1080, but GLOBAL_CSS overrides it to 95vw
  // under 1023px, so the target is read off the settled element rather than computed.
  const travelled = Math.abs(f.w - before.w) / Math.max(1, Math.abs(s2.w - before.w));
  ok(travelled < 0.25, label + ': first frame is still near the card',
     `${(travelled*100)|0}% of the way, ${f.w|0} between ${before.w|0} and ${s2.w|0}`);
  ok(s2.w > before.w + 20, label + ': the panel really grew', `${before.w|0} -> ${s2.w|0}`);
  ok(s2.op > 0.99, label + ': fully opaque', s2.op.toFixed(2));
  ok(s2.l > -1 && s2.l + s2.w <= w + 1, label + ': fits the viewport',
     `${s2.l|0}..${(s2.l + s2.w)|0} in ${w}`);
  await evaluate(`(() => { const b = document.querySelector('.ss-modal-close'); if (b) b.click(); })()`);
  await sleep(900);
}

main(async (ctx) => {
  await ctx.sleep(2500);
  console.log('\n[narrow 390x844]');
  await run(ctx, 390, 844, '390', false);
  console.log('\n[tablet 834x1112]');
  await run(ctx, 834, 1112, '834', false);
  console.log('\n[NABU card, 1512]');
  await run(ctx, 1512, 900, 'nabu', true);

  const errs = ctx.logs.filter(l => /^error|EXCEPTION/i.test(l));
  ok(errs.length === 0, 'zero console errors', errs.slice(0,3).join(' | '));
  console.log(`\n${pass} passed, ${fail} failed`);
  process.exitCode = fail ? 1 : 0;
}, 'http://localhost:5421/');
