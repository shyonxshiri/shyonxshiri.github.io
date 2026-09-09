/* The last three copy items.
   1. The deck rail's tick for the closing slide used to read "Try it" even to a
      visitor the slide itself had just told the Realm would not run for. The rail
      HIDES under 860px wide, so this only ever showed on a WIDE window that still
      failed the gate: emulating touch at 1280x800 gives pointer:coarse, so the real
      probe returns {ok:false, why:'touch'} while the rail stays on screen. That is
      the case under test, and it is why this does not emulate a phone.
   2. "testing" was the fallback of the Work modal's descriptor ternary.
   3. The two NABU years contradicted their own titles on screen. The year DATA is
      correct (a spring collection is shot the autumn before, a teaser runs ahead of
      its drop) so it is untouched; the descriptions now carry the relationship.
   Usage: node scratchpad/verify_last3.cjs [url]     (localhost, never 127.0.0.1) */
const {main}=require('./cdp.cjs');
const URL=process.argv[2]||'http://localhost:5421/';
let pass=0, fail=0;
const ok=(c,m)=>{ c?(pass++,console.log('  ok   '+m)):(fail++,console.log('  FAIL '+m)); };

main(async ({evaluate, sleep, send, logs})=>{
  const asDevice=async(w,h,touch)=>{
    await send('Emulation.setDeviceMetricsOverride',{width:w,height:h,deviceScaleFactor:1,mobile:touch});
    await send('Emulation.setTouchEmulationEnabled', touch ? {enabled:true,maxTouchPoints:5} : {enabled:false});
  };
  const labels=()=>evaluate(`JSON.stringify([...document.querySelectorAll('[data-slide]')].map(e=>e.dataset.label))`);
  const tips=()=>evaluate(`JSON.stringify([...document.querySelectorAll('.ss-deck-tip')].map(e=>e.textContent))`);
  const closeTitle=()=>evaluate(`(()=>{const t=document.querySelector('.ss-close-title'); return t?t.textContent.replace(/\\u00a0/g,' ').trim():'';})()`);

  // ── A. SUPPORTED DESKTOP ────────────────────────────────────────────────
  await asDevice(1280,800,false);
  await send('Page.navigate',{url:URL});
  await sleep(3000);
  let sup=await evaluate(`JSON.stringify(window.__realmSupported?window.__realmSupported():null)`);
  console.log('\n── DESKTOP 1280x800, no touch');
  console.log('   gate:', sup);
  ok(JSON.parse(sup).ok===true, 'the gate lets this device in');
  await evaluate(`(()=>{const s=document.querySelector('.ss-home-scroll'); s.scrollTop=s.scrollHeight;})()`);
  await sleep(2500);
  let L=JSON.parse(await labels()), T=JSON.parse(await tips());
  console.log('   rail labels:', L.join(' / '));
  ok(L[L.length-1]==='Try it', 'the closing tick reads "Try it"');
  ok(T.includes('Try it'), 'and the rail renders it');
  ok((await closeTitle()).startsWith('Walk it yourself'), 'the slide title agrees: "Walk it yourself"');

  // ── B. WIDE WINDOW THAT FAILS THE GATE ──────────────────────────────────
  await asDevice(1280,800,true);
  await send('Page.navigate',{url:URL});
  await sleep(3500);
  sup=await evaluate(`JSON.stringify(window.__realmSupported?window.__realmSupported():null)`);
  console.log('\n── DESKTOP 1280x800, coarse pointer (fails the gate, rail still shown)');
  console.log('   gate:', sup);
  ok(JSON.parse(sup).ok===false, 'the gate turns this device away');
  await evaluate(`(()=>{const s=document.querySelector('.ss-home-scroll'); s.scrollTop=s.scrollHeight;})()`);
  await sleep(2500);
  L=JSON.parse(await labels()); T=JSON.parse(await tips());
  const railOn=await evaluate(`(()=>{const r=document.querySelector('.ss-deck-rail'); return r?getComputedStyle(r).display!=='none':false;})()`);
  console.log('   rail labels:', L.join(' / '), '| rail visible:', railOn);
  ok(railOn, 'the rail really is on screen at this size, so the label matters');
  ok(L[L.length-1]==='The finished build', 'the closing tick now reads "The finished build"');
  ok(!L.includes('Try it'), '"Try it" is not offered to a device that cannot run it');
  ok(T.includes('The finished build'), 'and the rail renders the new label');
  const ct=await closeTitle();
  ok(ct.startsWith('The finished build'), 'the tick and the slide title now agree ["'+ct+'"]');

  // ── C. THE PLACEHOLDER, AND THE NABU YEARS ──────────────────────────────
  await asDevice(1280,800,false);
  await send('Page.navigate',{url:URL});
  await sleep(3000);
  await evaluate(`(()=>{const b=[...document.querySelectorAll('button')].find(x=>x.textContent.trim().toUpperCase()==='WORK'); b&&b.click();})()`);
  await sleep(1600);
  await evaluate(`(()=>{const d=[...document.querySelectorAll('div')].filter(e=>e.style&&e.style.borderRadius==='980px'); d[2]&&d[2].click();})()`);
  await sleep(1200);
  await evaluate(`(()=>{const c=[...document.querySelectorAll('div')].filter(e=>e.style&&e.style.transformStyle==='preserve-3d'&&e.style.zIndex==='3'); c[0]&&c[0].click();})()`);
  await sleep(1600);
  const modal=await evaluate(`(()=>{const m=document.querySelector('.ss-work-modal'); return m?m.innerText:'';})()`);
  console.log('\n── WORK MODAL (NABU)');
  ok(modal.includes('NABU'), 'the NABU modal opened ('+modal.length+' chars)');
  ok(!/testing/i.test(modal), 'the "testing" placeholder renders nowhere');
  const body=await evaluate('document.body.innerText');
  ok(!/\btesting\b/i.test(body), 'and it is absent from the whole page');
  // The DESCRIPTIONS are not in the modal grid, only in the media viewer, so each
  // asset has to be opened. This is also the surface where the year label and the
  // title sit together, which is where the contradiction was actually visible.
  const openAsset=async(name)=>{
    await evaluate(`(()=>{const els=[...document.querySelectorAll('.ss-work-modal *')]
      .filter(e=>!e.children.length && new RegExp(${'`'}^${'$'}{${JSON.stringify(name)}}${'$'}${'`'}).test((e.textContent||'').trim()));
      let n=els[0]; while(n && n.parentElement && !/ss-work-modal/.test(n.parentElement.className||'')){ if(n.onclick) break; n=n.parentElement; }
      (n||els[0]).click();})()`);
    await sleep(1500);
    const v=await evaluate(`(()=>{const x=document.querySelector('.ss-media-viewer'); return x?x.innerText:'';})()`);
    await evaluate(`(()=>{const x=document.querySelector('.ss-media-viewer'); x&&x.parentElement&&x.parentElement.click();})()`);
    await sleep(1000);
    return v;
  };
  const teaser=await openAsset('NABU 2026 Teaser');
  console.log('   teaser viewer:', teaser.replace(/\n/g,' | ').slice(0,120));
  ok(/2025/.test(teaser) && /NABU 2026 Teaser/.test(teaser),
     'the viewer shows the 2026 title beside its 2025 year, which is the pairing that read as a contradiction');
  ok(/Cut in 2025 to trail the 2026 puffer jacket collection/.test(teaser),
     'and the description now explains it');
  const spring=await openAsset('NABU 2023 Spring Collection');
  console.log('   spring viewer:', spring.replace(/\n/g,' | ').slice(0,120));
  ok(/Shot in 2022 for the 2023 spring collection/.test(spring),
     'the 2023 Spring Collection explains its 2022 date');
  const errs=logs.filter(l=>/^error|EXCEPTION/.test(l));
  ok(errs.length===0, 'no console errors ('+errs.length+')'+(errs.length?' :: '+errs[0]:''));
  console.log('\n'+pass+' passed, '+fail+' failed');
  process.exitCode=fail?1:0;
}, 'about:blank');
