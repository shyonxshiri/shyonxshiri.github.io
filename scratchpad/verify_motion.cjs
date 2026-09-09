/* The main site's motion, in REAL headless Chrome. The in-app pane keeps
   document.visibilityState 'hidden', where framer-motion never runs, so none of this
   can be judged there (CLAUDE.md 7).
   NOTE this file used to verify a card-to-panel FLIP on the work modal. That shipped on
   2026-09-08 and was pulled on 2026-09-09: the card is portrait and the panel is
   landscape, so the travel between them was a non-uniform scale and the artwork
   stretched mid-flight. What is verified now is the plain lift that replaced it, plus
   the two changes from that pass that were KEPT: the overlapping page crossfade and the
   site's one ease.
   Run it against the localhost form, never 127.0.0.1: vite refuses that and every
   assertion then fails as if the page were broken. */
const { main } = require('./cdp.cjs');
const URL = process.argv[2] || 'http://localhost:5421/';
const APPLE = 'cubic-bezier(0.32, 0.72, 0, 1)';

let pass = 0, fail = 0;
const ok = (c, m, x) => { c ? (pass++, console.log('  PASS ' + m + (x ? '  ' + x : '')))
                            : (fail++, console.log('  FAIL ' + m + (x ? '  ' + x : ''))); };

async function toWork(evaluate, sleep) {
  await evaluate(`[...document.querySelectorAll('button,a')].find(e=>/^work$/i.test((e.textContent||'').trim())).click()`);
  await sleep(1800);
}

async function modalAt({ evaluate, sleep, send }, w, h, label, reduce) {
  await send('Emulation.setDeviceMetricsOverride', { width: w, height: h, deviceScaleFactor: 1, mobile: w < 700 });
  await send('Page.reload', {});
  await sleep(4000);
  await toWork(evaluate, sleep);

  const card = await evaluate(`(() => {
    const cs = [...document.querySelectorAll('.ss-card')];
    if (!cs.length) return null;
    const mid = cs.map(c => ({ c, z: +getComputedStyle(c).zIndex || 0 })).sort((a,b) => b.z - a.z)[0].c;
    const r = mid.getBoundingClientRect();
    mid.click();
    return { w: r.width, h: r.height };
  })()`);
  ok(!!card, label + ': a centre card is clickable', card ? `${card.w|0}x${card.h|0}` : '');
  if (!card) return;

  // A LIFT, not a travel: the very first frame this driver can read must already be at
  // the panel's own box, only scaled a hair and faded. If a FLIP ever comes back this
  // is the assertion that will catch it.
  await sleep(60);
  const first = await evaluate(`(() => {
    const p = document.querySelector('.ss-work-modal');
    if (!p) return null;
    const r = p.getBoundingClientRect();
    return { w: r.width, l: r.left, op: +getComputedStyle(p).opacity,
             ghosts: document.querySelectorAll('[aria-hidden][style*="fixed"]').length };
  })()`);
  ok(!!first, label + ': modal mounted');
  if (!first) return;
  ok(first.ghosts === 0, label + ': no travelling clone exists', 'ghosts=' + first.ghosts);

  await sleep(1200);
  const s2 = await evaluate(`(() => {
    const p = document.querySelector('.ss-work-modal');
    const r = p.getBoundingClientRect();
    return { w: r.width, l: r.left, op: +getComputedStyle(p).opacity,
             t: getComputedStyle(p).transform };
  })()`);
  // 76vw capped at 1080, but GLOBAL_CSS overrides to 95vw under 1023px, so read it.
  ok(Math.abs(first.w - s2.w) / s2.w < 0.08, label + ': it never travelled, it lifted',
     `${first.w|0} -> ${s2.w|0}`);
  ok(s2.op > 0.99, label + ': settles fully opaque', s2.op.toFixed(3));
  ok(s2.t === 'none' || /matrix\(1, 0, 0, 1/.test(s2.t), label + ': settles at scale 1', s2.t.slice(0, 40));
  ok(s2.l > -1 && s2.l + s2.w <= w + 1, label + ': fits the viewport', `${s2.l|0}..${(s2.l+s2.w)|0} in ${w}`);

  await evaluate(`(() => { const b = document.querySelector('.ss-modal-close'); if (b) b.click(); })()`);
  await sleep(900);
  ok(await evaluate(`!document.querySelector('.ss-work-modal')`), label + ': closes and unmounts');
}

main(async (ctx) => {
  const { evaluate, sleep, send, logs } = ctx;
  await sleep(3000);

  console.log('\n[1] the page crossfade overlaps (no black gap)');
  await send('Emulation.setDeviceMetricsOverride', { width: 1512, height: 900, deviceScaleFactor: 1, mobile: false });
  await sleep(1200);
  await evaluate(`[...document.querySelectorAll('button,a')].find(e=>/^work$/i.test((e.textContent||'').trim())).click()`);
  let maxRoots = 0;
  for (let i = 0; i < 26; i++) {
    const n = await evaluate(`document.querySelectorAll('#root > div > div[style*="inset: 0px"]').length`);
    if (n > maxRoots) maxRoots = n;
    await sleep(20);
  }
  ok(maxRoots >= 2, 'outgoing and incoming pages coexist', 'max concurrent roots=' + maxRoots);
  await sleep(1500);

  console.log('\n[2] the modal lifts, at three widths');
  await modalAt(ctx, 1512, 900, '1512');
  await modalAt(ctx, 834, 1112, '834');
  await modalAt(ctx, 390, 844, '390');

  console.log('\n[3] the ease reaches the modal');
  await send('Emulation.setDeviceMetricsOverride', { width: 1512, height: 900, deviceScaleFactor: 1, mobile: false });
  await send('Page.reload', {});
  await sleep(4000);
  const tok = await evaluate(`getComputedStyle(document.documentElement).getPropertyValue('--ease-out').trim()`);
  ok(tok === 'cubic-bezier(0.32,0.72,0,1)', 'the site token is the Apple curve', tok);

  console.log('\n[4] reduced motion');
  await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
  await send('Page.reload', {});
  await sleep(4000);
  ok(await evaluate(`matchMedia('(prefers-reduced-motion: reduce)').matches`), 'reduced motion is emulated');
  await toWork(evaluate, sleep);
  await evaluate(`(() => {
    const cs = [...document.querySelectorAll('.ss-card')];
    cs.map(c=>({c,z:+getComputedStyle(c).zIndex||0})).sort((a,b)=>b.z-a.z)[0].c.click();
  })()`);
  await sleep(120);
  const rm = await evaluate(`(() => {
    const p = document.querySelector('.ss-work-modal');
    if (!p) return null;
    return { op: +getComputedStyle(p).opacity, t: getComputedStyle(p).transform };
  })()`);
  ok(!!rm && rm.op > 0.9, 'modal is already up under reduced motion', rm ? rm.op.toFixed(2) : 'null');
  ok(!!rm && (rm.t === 'none' || /matrix\(1, 0, 0, 1/.test(rm.t)), 'and at scale 1, not scaled in',
     rm ? rm.t.slice(0, 40) : '');
  await send('Emulation.setEmulatedMedia', { features: [] });

  console.log('\n[5] console');
  const errs = logs.filter(l => /^error|EXCEPTION/i.test(l));
  ok(errs.length === 0, 'zero console errors', errs.slice(0, 3).join(' | '));

  console.log(`\n${pass} passed, ${fail} failed`);
  process.exitCode = fail ? 1 : 0;
}, URL);
