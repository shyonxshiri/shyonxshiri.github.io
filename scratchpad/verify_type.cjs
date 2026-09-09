/* ONE FAMILY. Asserts every piece of type on all four pages resolves to the SF stack and
   that not one of the four faces the site used to carry survives anywhere in the DOM.
   Run against the localhost form; vite refuses 127.0.0.1 and every check then "fails". */
const { main } = require('./cdp.cjs');
const URL = process.argv[2] || 'http://localhost:5421/';
const GONE = ['Bebas Neue', 'Cormorant Garamond', 'Space Mono', 'Space Grotesk', 'SF Pro Rounded'];
let pass = 0, fail = 0;
const ok = (c, m, x) => { c ? (pass++, console.log('  PASS ' + m + (x ? '  ' + x : ''))) : (fail++, console.log('  FAIL ' + m + (x ? '  ' + x : ''))); };

const sweep = `(() => {
  const bad = [];
  for (const el of document.querySelectorAll('*')) {
    if (!el.textContent || !el.textContent.trim()) continue;
    const f = getComputedStyle(el).fontFamily;
    for (const g of ${JSON.stringify(GONE)}) if (f.includes(g)) {
      bad.push((el.className && String(el.className).slice(0,28) || el.tagName) + ' -> ' + f.slice(0,40));
    }
    if (bad.length > 8) break;
  }
  return bad;
})()`;

async function page(ctx, label, click) {
  const { evaluate, sleep } = ctx;
  if (click) { await evaluate(`[...document.querySelectorAll('button,a')].find(e=>/^${click}$/i.test((e.textContent||'').trim()))?.click()`); await sleep(2000); }
  const bad = await evaluate(sweep);
  ok(bad.length === 0, label + ': no old face survives', bad.slice(0, 3).join(' | '));
}

main(async (ctx) => {
  const { evaluate, sleep, send, logs } = ctx;
  await send('Emulation.setDeviceMetricsOverride', { width: 1512, height: 900, deviceScaleFactor: 1, mobile: false });
  await sleep(4000);

  const tok = await evaluate(`getComputedStyle(document.documentElement).getPropertyValue('--sf').trim()`);
  ok(tok.startsWith('-apple-system'), 'the --sf token exists and leads with -apple-system', tok.slice(0, 54) + '...');
  ok(/Inter/.test(tok), 'and names Inter as the non-Apple fallback');

  // Inter must be DECLARED, not loaded. On a Mac -apple-system wins the stack, so the
  // browser never downloads Inter at all and `fonts.check` is false: that is correct
  // lazy behaviour, and asserting it loads here fails on exactly the machines where the
  // fallback is not needed. What matters is that the @font-face rules ARRIVED, which is
  // what a non-Apple device would then pull.
  const interFaces = await evaluate(`(() => { let n = 0; document.fonts.forEach(f => { if (f.family === 'Inter') n++; }); return n; })()`);
  ok(interFaces > 0, 'Inter @font-face rules arrived (the non-Apple fallback is real)', interFaces + ' faces');

  await page(ctx, 'home', null);

  // Display type: Apple sets big headings with NEGATIVE tracking. The old faces needed
  // positive tracking (condensed caps) so a leftover positive value means a rule was
  // folded to the new family without being re-tuned for it.
  const hero = await evaluate(`(() => {
    const h = document.querySelector('.ss-hero-name'); const cs = getComputedStyle(h);
    return { f: cs.fontFamily, size: parseFloat(cs.fontSize), ls: parseFloat(cs.letterSpacing), w: cs.fontWeight, lh: cs.lineHeight };
  })()`);
  ok(/-apple-system|SF Pro|Inter/.test(hero.f), 'hero name is the SF stack', hero.f.slice(0, 34) + '...');
  ok(hero.ls < 0, 'hero name tracks NEGATIVE, as a big SF heading must', hero.ls.toFixed(2) + 'px @ ' + hero.size + 'px');
  ok(+hero.w >= 600, 'hero name is a display weight', hero.w);

  await page(ctx, 'work', 'work');
  await page(ctx, 'about', 'about');
  await page(ctx, 'contact', 'contact');

  // and nothing may still be marked !important, which was the old cascade bug
  const imp = await evaluate(`(() => {
    let n = 0;
    for (const sh of document.styleSheets) {
      let rules; try { rules = sh.cssRules; } catch (e) { continue; }
      for (const r of rules || []) if (r.style && r.style.getPropertyPriority('font-family') === 'important') n++;
    }
    return n;
  })()`);
  ok(imp === 0, 'zero font-family rules marked !important', String(imp));

  const errs = logs.filter(l => /^error|EXCEPTION/i.test(l));
  ok(errs.length === 0, 'zero console errors', errs.slice(0, 2).join(' | '));
  console.log(`\n${pass} passed, ${fail} failed`);
  process.exitCode = fail ? 1 : 0;
}, URL);
