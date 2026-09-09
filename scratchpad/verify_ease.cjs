/* The retuned ease must actually REACH every surface. Two of the six hardcoded copies
   folded into the token live in INLINE style props (the Work progress bar's width and
   the carousel dots), where a var() resolves against :root at computed-style time: if
   that ever stopped resolving the transition silently falls back to the initial value
   and the control just snaps. So this reads the COMPUTED value off live elements. */
const { main } = require('./cdp.cjs');
const WANT = 'cubic-bezier(0.32, 0.72, 0, 1)';
const OLD  = 'cubic-bezier(0.16, 1, 0.3, 1)';
let pass = 0, fail = 0;
const ok = (c, m, x) => { c ? (pass++, console.log('  PASS ' + m + (x ? '  ' + x : ''))) : (fail++, console.log('  FAIL ' + m + (x ? '  ' + x : ''))); };

main(async ({ evaluate, sleep, logs, send }) => {
  await send('Emulation.setDeviceMetricsOverride', { width: 1512, height: 900, deviceScaleFactor: 1, mobile: false });
  await sleep(3500);

  const tok = await evaluate(`getComputedStyle(document.documentElement).getPropertyValue('--ease-out').trim()`);
  ok(tok === 'cubic-bezier(0.32,0.72,0,1)', 'the token itself is the Apple curve', tok);

  await evaluate(`[...document.querySelectorAll('button,a')].find(e=>/^work$/i.test((e.textContent||'').trim())).click()`);
  await sleep(1800);

  // The carousel dots: inline `transition: all .45s var(--ease-out)`.
  const dot = await evaluate(`(() => {
    const d = [...document.querySelectorAll('div')].find(e => e.style && e.style.borderRadius === '980px');
    return d ? getComputedStyle(d).transitionTimingFunction : null;
  })()`);
  ok(dot === WANT, 'carousel dot (inline var) resolves', dot);

  // The nav's active underline: inline `transition: width 0.4s var(--ease-out)`. It is a
  // SPAN, and it carries display:none, so it is inert today; the assertion is only that
  // the var still resolves in an inline style prop, which is the thing that could break.
  const bar = await evaluate(`(() => {
    const b = [...document.querySelectorAll('span')].find(e => e.style && /width 0\\.4s/.test(e.style.transition));
    return b ? getComputedStyle(b).transitionTimingFunction : null;
  })()`);
  ok(bar === WANT, 'nav underline (inline var) resolves', bar);

  // Open the modal so the masonry cards exist: .ss-scell, three transitions in one rule.
  await evaluate(`(() => {
    const cards = [...document.querySelectorAll('.ss-card')];
    cards.map(c=>({c,z:+getComputedStyle(c).zIndex||0})).sort((a,b)=>b.z-a.z)[0].c.click();
  })()`);
  await sleep(1800);
  const cell = await evaluate(`(() => {
    const c = document.querySelector('.ss-scell');
    if (!c) return null;
    const img = c.querySelector('.ss-sthumb img');
    return { cell: getComputedStyle(c).transitionTimingFunction,
             img: img ? getComputedStyle(img).transitionTimingFunction : null };
  })()`);
  if (cell) {
    ok(cell.cell.split(', cubic').length === 3 && cell.cell.startsWith(WANT),
       '.ss-scell all three transitions', cell.cell.slice(0, 60) + '...');
    ok(cell.img === WANT, '.ss-scell thumbnail zoom', cell.img);
  } else {
    console.log('  (this project has no .ss-scell masonry, skipped)');
  }

  // Nothing anywhere may still be carrying the old curve.
  const stale = await evaluate(`(() => {
    const hits = [];
    for (const el of document.querySelectorAll('*')) {
      const t = getComputedStyle(el).transitionTimingFunction;
      if (t && t.includes('0.16, 1, 0.3, 1')) hits.push(el.className || el.tagName);
      if (hits.length > 6) break;
    }
    return hits;
  })()`);
  ok(stale.length === 0, 'no live element still carries the OLD curve', stale.join(' | '));

  const errs = logs.filter(l => /^error|EXCEPTION/i.test(l));
  ok(errs.length === 0, 'zero console errors', errs.slice(0,2).join(' | '));
  console.log(`\n${pass} passed, ${fail} failed`);
  process.exitCode = fail ? 1 : 0;
}, 'http://localhost:5421/');
