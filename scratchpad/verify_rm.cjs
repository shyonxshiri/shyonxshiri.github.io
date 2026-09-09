/* The modal and the page crossfade under prefers-reduced-motion: no travel, no ghost. */
const { main } = require('./cdp.cjs');
let pass = 0, fail = 0;
const ok = (c, m, x) => { c ? (pass++, console.log('  PASS ' + m + (x ? '  ' + x : ''))) : (fail++, console.log('  FAIL ' + m + (x ? '  ' + x : ''))); };

main(async ({ evaluate, sleep, logs, send }) => {
  await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
  await send('Emulation.setDeviceMetricsOverride', { width: 1512, height: 900, deviceScaleFactor: 1, mobile: false });
  await send('Page.reload', {});
  await sleep(4000);

  ok(await evaluate(`matchMedia('(prefers-reduced-motion: reduce)').matches`), 'reduced motion is emulated');

  await evaluate(`[...document.querySelectorAll('button,a')].find(e=>/^work$/i.test((e.textContent||'').trim())).click()`);
  await sleep(1200);
  ok(await evaluate(`!!document.querySelector('.ss-card')`), 'work page reached');

  await evaluate(`(() => {
    const cards = [...document.querySelectorAll('.ss-card')];
    const mid = cards.map(c=>({c,z:+getComputedStyle(c).zIndex||0})).sort((a,b)=>b.z-a.z)[0].c;
    window.__src = mid.getBoundingClientRect(); mid.click();
  })()`);
  await sleep(120);
  const st = await evaluate(`(() => {
    const p = document.querySelector('.ss-work-modal');
    if (!p) return null;
    const r = p.getBoundingClientRect();
    return { w: r.width, op: +getComputedStyle(p).opacity,
             ghosts: document.querySelectorAll('[aria-hidden][style*="fixed"]').length };
  })()`);
  ok(!!st, 'modal mounted');
  ok(st.ghosts === 0, 'no ghost layer is rendered', 'ghosts=' + st.ghosts);
  ok(Math.abs(st.w - 1080) < 3, 'panel is at its final size immediately', 'w=' + (st.w|0));
  ok(st.op > 0.9, 'panel is already up', st.op.toFixed(2));

  const errs = logs.filter(l => /^error|EXCEPTION/i.test(l));
  ok(errs.length === 0, 'zero console errors', errs.slice(0,2).join(' | '));
  console.log(`\n${pass} passed, ${fail} failed`);
  process.exitCode = fail ? 1 : 0;
}, 'http://localhost:5421/');
