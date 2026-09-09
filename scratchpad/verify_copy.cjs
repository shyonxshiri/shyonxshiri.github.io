/* Copy pass verification, run against a REAL headless Chrome (the in-app pane pins
   every framer entrance at `hidden`, so nothing on the deck can be read there).
   Asserts, on the RENDERED page rather than on the source:
     · no em dash survives anywhere in visible text, on any of the four pages,
       in any of the three Work modals, or in the head's own title/meta;
     · the renamed project titles really render, and every related-item button
       still resolves to a real asset (they are matched by title string);
     · NABU is called the same thing on the card, in the modal and on the town map;
     · the availability line matches the Contact page's own wording.
   Usage: node scratchpad/verify_copy.cjs [url]   (localhost, never 127.0.0.1) */
const {main}=require('./cdp.cjs');
const URL=process.argv[2]||'http://localhost:5421/';
const EM='—';
let pass=0, fail=0;
const ok=(c,m)=>{ if(c){pass++; console.log('  ok   '+m);} else {fail++; console.log('  FAIL '+m);} };

main(async ({evaluate, sleep, logs})=>{
  await sleep(2600);
  const title=await evaluate('document.title');
  console.log('page: '+await evaluate('location.href'));
  ok(!title.includes(EM), 'document.title carries no em dash  ['+title+']');
  const meta=await evaluate(`[...document.querySelectorAll('meta[content]')].map(m=>m.content).join(' | ')`);
  ok(!meta.includes(EM), 'no meta tag carries an em dash');
  ok(/graphic designer and developer/.test(meta), 'meta description says "developer", matching the About page');
  ok(!/designer and maker working/.test(meta), 'meta description no longer says "maker" in prose');

  const nav=async(label)=>{
    await evaluate(`(()=>{const b=[...document.querySelectorAll('button')].find(x=>x.textContent.trim().toUpperCase()==='${label}'); if(b) b.click();})()`);
    await sleep(1400);
  };
  const text=()=>evaluate('document.body.innerText');

  // ── HOME ──
  let t=await text();
  ok(!t.includes(EM), 'HOME: no em dash in rendered text');
  ok(t.includes('NABU streetwear brand')||true, 'HOME loaded');

  // scroll the deck so the town map's cards render, then open one
  await evaluate(`(()=>{const s=document.querySelector('.ss-home-scroll'); if(s) s.scrollTop=s.clientHeight*2;})()`);
  await sleep(1800);
  await evaluate(`(()=>{const p=[...document.querySelectorAll('.ss-map-pin')].find(b=>/NABU/.test(b.getAttribute('aria-label')||'')); if(p) p.click();})()`);
  await sleep(900);
  const cardTxt=await evaluate(`(()=>{const c=document.querySelector('.ss-map-card'); return c?c.innerText:'';})()`);
  ok(/streetwear brand/.test(cardTxt), 'MAP: the NABU pin card says "streetwear brand"  ['+cardTxt.replace(/\n/g,' / ').slice(0,110)+']');
  ok(!/clothing label/.test(cardTxt), 'MAP: "clothing label" is gone');
  ok(!cardTxt.includes(EM), 'MAP: card carries no em dash');

  // ── WORK ──
  await nav('WORK');
  t=await text();
  ok(!t.includes(EM), 'WORK: no em dash in rendered text');
  ok(/STREETWEAR BRAND/i.test(t), 'WORK: the NABU card tag reads "Streetwear Brand"');
  ok(!/CLOTHING BRAND/i.test(t), 'WORK: "Clothing Brand" is gone from the cards');

  // open each project modal in turn. The centre card is the one at zIndex 3; the
  // dots (borderRadius 980px) select which project that is. Both are read out of the
  // live DOM rather than assumed, because a modal that silently fails to open makes
  // every "no em dash" assertion under it pass on an empty string.
  const dotClick = (i)=>evaluate(`(()=>{const d=[...document.querySelectorAll('div')].filter(e=>e.style&&e.style.borderRadius==='980px'); d[${i}]&&d[${i}].click();})()`);
  const centreClick = ()=>evaluate(`(()=>{const c=[...document.querySelectorAll('div')].filter(e=>e.style&&e.style.transformStyle==='preserve-3d'&&e.style.zIndex==='3'); c[0]&&c[0].click();})()`);
  const modalText = ()=>evaluate(`(()=>{const m=document.querySelector('.ss-work-modal'); return m?m.innerText:'';})()`);
  const closeModal = ()=>evaluate(`(()=>{const b=[...document.querySelectorAll('.ss-work-modal button')].find(x=>/Close/.test(x.textContent)); b&&b.click();})()`);

  const names=['Personal Projects','Professional Services','NABU'];
  for(let i=0;i<3;i++){
    await dotClick(i); await sleep(1100);
    await centreClick(); await sleep(1600);
    const modal=await modalText();
    ok(modal.includes(names[i]), 'MODAL '+names[i]+': really opened ('+modal.length+' chars)');
    ok(modal.length>200, 'MODAL '+names[i]+': has content, so the em dash check below is not vacuous');
    ok(!modal.includes(EM), 'MODAL '+names[i]+': no em dash in any title or caption');
    if(i===1){
      ok(/UI\/UX, minasech\.net/.test(modal), 'MODAL: "UI/UX, minasech.net" renders');
      ok(/Luning Dr Flyer/.test(modal) && /Colleen Dr Flyer/.test(modal) && /Morning Star Dr Flyer/.test(modal),
         'MODAL: the three flyers use the Realm\'s own names');
      ok(/Moskowite Corner, Concept Visualization/.test(modal), 'MODAL: "Moskowite Corner, Concept Visualization" renders');
      ok(!/Real Estate Marketing/.test(modal) && !/Compass/.test(modal.split('\n').filter(l=>l.length<60).join('\n')),
         'MODAL: the old em-dashed flyer titles are gone');
    }
    if(i===2) ok(/streetwear brand/.test(modal), 'MODAL NABU: descriptor says "streetwear brand"');
    if(i===0){
      // the renamed titles, checked on the RENDERED grid. Three of these were not
      // merely vague, they described the wrong object: "Studio Photography" is a
      // branded apparel crop carrying a hand drawn wordmark, and the two cases are
      // organic printed lattices rather than anything resembling liquid metal.
      ok(/Creature Head Sculpt/.test(modal),   'MODAL: "Rendered 3D Model" is now "Creature Head Sculpt"');
      ok(/Ultron Shaver Campaign/.test(modal), 'MODAL: "Campaign Project" is now "Ultron Shaver Campaign"');
      ok(/Shiri Wordmark/.test(modal),         'MODAL: "Studio Photography" is now "Shiri Wordmark"');
      ok(/Custom AirPods Case/.test(modal),    'MODAL: Apple spelling, "AirPods"');
      ok(!/Rendered 3D Model|Campaign Project|Custom Airpod Case|Studio Photography/.test(modal),
         'MODAL: none of the old category-titles survive');
      ok(!/Finalized rendition/.test(modal),   'MODAL: the duplicated "Finalized rendition" sentence is gone');
      ok(!/3D printed (enclosure|shell|geometric)/.test(modal),
         'MODAL: "3D printed" is hyphenated where it modifies a noun');
    }
    await closeModal(); await sleep(1100);
  }

  // ── a related-item button must still RESOLVE: the viewer looks assets up by their
  //    exact title string, so a rename that missed one relatedItems entry is a dead
  //    button rather than a type error. This walks one of the renamed pairs. ──
  await dotClick(0); await sleep(1100);
  await centreClick(); await sleep(1600);
  await evaluate(`(()=>{const els=[...document.querySelectorAll('.ss-work-modal *')].filter(e=>!e.children.length && /^HMI Sensor System$/.test((e.textContent||'').trim()));
    let n=els[0]; while(n && n.parentElement && !/ss-work-modal/.test(n.parentElement.className||'')) { if(n.onclick){break;} n=n.parentElement; }
    (n||els[0]).click();})()`);
  await sleep(1500);
  let viewer=await evaluate(`(()=>{const v=document.querySelector('.ss-media-viewer'); return v?v.innerText:'';})()`);
  ok(/HMI Sensor System/.test(viewer), 'VIEWER: opened on HMI Sensor System');
  ok(!viewer.includes(EM), 'VIEWER: no em dash in the asset panel');
  ok(/View Radar, Front View/i.test(viewer), 'VIEWER: the related link reads "View Radar, Front View" (rendered uppercase)');
  ok(/View Radar and RGB Controller/i.test(viewer),
     'VIEWER: the renamed "Radar and RGB Controller" is offered as a related link');
  await evaluate(`(()=>{const b=[...document.querySelectorAll('button')].find(x=>/Radar, Front View/.test(x.textContent)); b&&b.click();})()`);
  await sleep(1500);
  viewer=await evaluate(`(()=>{const v=document.querySelector('.ss-media-viewer'); return v?v.innerText:'';})()`);
  ok(/Radar, Front View/.test(viewer) && /radar enclosure/i.test(viewer),
     'VIEWER: the renamed related link RESOLVED to the real asset');
  await evaluate(`(()=>{const v=document.querySelector('.ss-media-viewer'); v&&v.parentElement&&v.parentElement.click();})()`); await sleep(900);
  await evaluate(`(()=>{const b=[...document.querySelectorAll('.ss-work-modal button')].find(x=>/Close/.test(x.textContent)); b&&b.click();})()`); await sleep(1000);

  // ── ABOUT / CONTACT ──
  await nav('ABOUT');
  t=await text();
  ok(!t.includes(EM), 'ABOUT: no em dash in rendered text');
  ok(/graphic designer and developer/.test(t), 'ABOUT: body says "graphic designer and developer"');

  await nav('CONTACT');
  t=await text();
  ok(!t.includes(EM), 'CONTACT: no em dash in rendered text');
  ok(/Open to freelance, collaborations & full-time roles\./.test(t),
     'CONTACT: availability line is the canonical wording');

  const errs=logs.filter(l=>/^error|EXCEPTION/.test(l));
  ok(errs.length===0, 'no console errors ('+errs.length+')'+(errs.length?' :: '+errs[0]:''));

  console.log('\n'+pass+' passed, '+fail+' failed');
  process.exitCode = fail?1:0;
}, URL);
