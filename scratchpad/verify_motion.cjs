/* Verifies the Apple-motion pass in REAL headless Chrome (the in-app pane pins
   framer-motion and reports innerHeight 0, so nothing here can be judged there).
   Asserts, in order:
     1. the page crossfade OVERLAPS (both pages on screen at once, no black gap)
     2. the work modal's first painted frame sits on the CARD's rect, not centred
     3. it settles onto its own box
     4. the ghost is the real card's clone and it fades out
     5. closing returns it toward the card
     6. zero console errors throughout                                           */
const { main } = require('./cdp.cjs');
const URL = process.argv[2] || 'http://localhost:5421/';

let pass = 0, fail = 0;
const ok = (c, m, extra) => { c ? (pass++, console.log('  PASS ' + m + (extra ? '  ' + extra : '')))
                                : (fail++, console.log('  FAIL ' + m + (extra ? '  ' + extra : ''))); };

main(async ({ evaluate, sleep, logs, send }) => {
  await send('Emulation.setDeviceMetricsOverride', { width: 1512, height: 900, deviceScaleFactor: 1, mobile: false });
  await sleep(3200);

  console.log('\n[1] page transition overlaps');
  // Instrument: sample how many page roots are mounted, and their opacities.
  await evaluate(`
    window.__samples = [];
    window.__probe = () => {
      const roots = [...document.querySelectorAll('.ss-home-page, [style*="position: absolute"]')];
      return null;
    };
    true;`);

  // Click WORK in the nav.
  const navClicked = await evaluate(`(() => {
    const b = [...document.querySelectorAll('button, a')].find(e => /^work$/i.test((e.textContent||'').trim()));
    if (!b) return false; b.click(); return true; })()`);
  ok(navClicked, 'nav WORK is clickable');

  // Sample immediately: during an overlapping transition both the home root and the
  // work root are in the DOM at the same time. mode="wait" would show exactly one.
  let maxRoots = 0;
  for (let i = 0; i < 26; i++) {
    const n = await evaluate(`document.querySelectorAll('#root > div > div[style*="inset: 0px"]').length`);
    if (n > maxRoots) maxRoots = n;
    await sleep(20);
  }
  ok(maxRoots >= 2, 'outgoing and incoming pages coexist (no black gap)', 'max concurrent roots=' + maxRoots);

  await sleep(1600);

  console.log('\n[2..5] work modal expands from the card');
  const cardRect = await evaluate(`(() => {
    const c = document.querySelector('.ss-card');
    if (!c) return null;
    const r = c.getBoundingClientRect();
    return { l: r.left, t: r.top, w: r.width, h: r.height };
  })()`);
  ok(!!cardRect, 'a work card is on screen', cardRect ? JSON.stringify(cardRect.w|0) + 'x' + (cardRect.h|0) : '');

  // Click the CENTRE card (zIndex 3 / rel 0) and record every frame IN THE PAGE.
  // Polling this over CDP starves rAF: the ghost's fade froze at 0.61 for 30 straight
  // samples and then completed the moment the loop stopped, which is the measurement
  // interfering rather than the animation stalling. An in-page rAF recorder costs the
  // page nothing and reads the same values framer is writing.
  await evaluate(`(() => {
    const cards = [...document.querySelectorAll('.ss-card')];
    const mid = cards.map(c => ({ c, z: +getComputedStyle(c).zIndex || 0 })).sort((a,b) => b.z - a.z)[0].c;
    window.__srcRect = mid.getBoundingClientRect();
    window.__rec = [];
    const t0 = performance.now();
    const tick = () => {
      const p = document.querySelector('.ss-work-modal');
      if (p) {
        const r = p.getBoundingClientRect();
        const g = document.querySelector('[aria-hidden][style*="fixed"]');
        window.__rec.push({
          t: performance.now() - t0,
          l: r.left, t2: r.top, w: r.width, h: r.height,
          op: +getComputedStyle(p).opacity,
          ghost: g ? +getComputedStyle(g).opacity : -1,
          ghostImgs: g ? g.querySelectorAll('img').length : -1,
        });
      }
      if (performance.now() - t0 < 1400) requestAnimationFrame(tick);
      else window.__recDone = true;
    };
    mid.click();
    requestAnimationFrame(tick);
  })()`);

  for (let i = 0; i < 100 && !(await evaluate('!!window.__recDone')); i++) await sleep(80);
  const frames = await evaluate('window.__rec');
  // Headless SwiftShader renders this page at 6-8fps, so the recording is coarse and its
  // LENGTH is not the thing under test: what matters is that the first frame is the card
  // and the last is the panel. Anything above 5 samples covers the 0.62s move.
  ok(frames.length >= 6, 'panel mounted and recorded', frames.length + ' frames over 1.4s');

  const first = frames[0], last = frames[frames.length - 1];
  const src = await evaluate(`({l: window.__srcRect.left, t: window.__srcRect.top, w: window.__srcRect.width, h: window.__srcRect.height})`);

  const dw = Math.abs(first.w - src.w), dh = Math.abs(first.h - src.h);
  ok(dw < 24 && dh < 24, 'first frame is the CARD box',
     `first ${first.w|0}x${first.h|0} vs card ${src.w|0}x${src.h|0}`);
  const dcx = Math.abs((first.l + first.w/2) - (src.l + src.w/2));
  const dcy = Math.abs((first.t2 + first.h/2) - (src.t + src.h/2));
  ok(dcx < 24 && dcy < 24, 'first frame is centred ON the card', `dx=${dcx|0} dy=${dcy|0}`);

  ok(first.ghostImgs >= 1, 'ghost carries the cloned card image', 'imgs=' + first.ghostImgs);
  ok(first.ghost > 0.8, 'ghost starts opaque', first.ghost.toFixed(2));

  const gs = frames.map(f => f.ghost);
  ok(gs.some(v => v >= 0 && v < 0.05), 'ghost fades out during the move',
     'min=' + Math.min(...gs.filter(v => v >= 0)).toFixed(3));

  // The two layers must cross over, not hand off with a gap: at no point may BOTH be
  // faint, or the card visibly disappears before the panel arrives.
  // Stacked layers composite as 1-(1-a)(1-b), NOT max(a,b): the two fades overlap, so
  // the honest question is how much of the backdrop shows through at the crossover.
  const dip = frames.filter(f => f.ghost >= 0)
    .reduce((m, f) => Math.min(m, 1 - (1 - f.ghost) * (1 - f.op)), 1);
  ok(dip > 0.5, 'the crossfade never dips (no empty beat)', 'worst coverage = ' + dip.toFixed(2));

  // And it must grow monotonically, never overshoot past its own box.
  const wmax = Math.max(...frames.map(f => f.w));
  ok(wmax <= Math.min(1512 * 0.76, 1080) + 1, 'panel never overshoots its width', 'max=' + (wmax|0));

  await sleep(900);
  const settled = await evaluate(`(() => {
    const p = document.querySelector('.ss-work-modal');
    const r = p.getBoundingClientRect();
    return { l: r.left, t: r.top, w: r.width, h: r.height, op: +getComputedStyle(p).opacity };
  })()`);
  const wantW = Math.min(1512 * 0.76, 1080);
  ok(Math.abs(settled.w - wantW) < 3, 'panel settles on its own width', `${settled.w|0} vs ${wantW|0}`);
  ok(settled.op > 0.99, 'panel settles fully opaque', settled.op.toFixed(3));
  const cx = settled.l + settled.w / 2;
  ok(Math.abs(cx - 756) < 3, 'panel settles horizontally centred', 'cx=' + (cx|0));

  const ghostDead = await evaluate(`document.querySelectorAll('[aria-hidden][style*="fixed"]').length === 0 || +getComputedStyle(document.querySelector('[aria-hidden][style*="fixed"]')).opacity < 0.02`);
  ok(ghostDead, 'ghost is gone once settled');

  console.log('\n[6] close returns toward the card');
  await evaluate(`document.querySelector('.ss-modal-close').click()`);
  let minW = 1e9, sawShrink = false;
  for (let i = 0; i < 30; i++) {
    const w = await evaluate(`(() => { const p = document.querySelector('.ss-work-modal'); if(!p) return -1; return p.getBoundingClientRect().width; })()`);
    if (w > 0) { minW = Math.min(minW, w); if (w < wantW - 40) sawShrink = true; }
    await sleep(16);
  }
  ok(sawShrink, 'panel shrinks back on close', 'min width seen ' + (minW === 1e9 ? 'n/a' : (minW|0)));

  await sleep(700);
  const closed = await evaluate(`!document.querySelector('.ss-work-modal')`);
  ok(closed, 'modal unmounts');

  console.log('\n[7] console');
  const errs = logs.filter(l => /^error|EXCEPTION/i.test(l));
  ok(errs.length === 0, 'zero console errors', errs.slice(0, 3).join(' | '));

  console.log(`\n${pass} passed, ${fail} failed`);
  process.exitCode = fail ? 1 : 0;
}, URL);
