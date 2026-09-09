/* The Realm's own panels carry the same project copy as the main site, so the
   mirrored pass has to be checked HERE too, not just in React. Panels are 3D
   textures, so the only readable surface is the viewer caption: this walks every
   panel in the Personal Projects portal by index and reads its title and desc.
   Notes: `mode`/`PORTALS` are not globals, only enterPortal/openViewer/__D, and
   the entry is a rAF camera move on SwiftShader, so poll, never sleep-and-hope. */
const {main}=require('./cdp.cjs');
main(async ({evaluate, sleep, logs})=>{
  let pct='';
  for(let i=0;i<90;i++){
    pct=await evaluate(`(()=>{const m=/(\\d+)%/.exec(document.body.innerText||''); return m?m[1]:'done';})()`);
    if(pct==='done'||pct==='100') break;
    await sleep(2000);
  }
  console.log('load   :', (pct==='done'||pct==='100')?'complete':'stuck at '+pct+'%');
  await sleep(4000);
  await evaluate(`window.__D.tp(20.7,-22.5)`);      // the Cottage, Personal Projects
  await sleep(4000);
  await evaluate(`enterPortal('creative')`);
  let inMenu=false;
  for(let t=0;t<50;t++){
    const p=await evaluate(`(()=>{const e=document.querySelector('#prompt'); return e?e.textContent:'';})()`);
    if(/project/i.test(p)){ inMenu=true; break; }
    await sleep(2500);
  }
  console.log('portal :', inMenu?'in the Personal Projects menu':'never reached the menu');
  if(!inMenu) return;
  const seen=[];
  for(let i=0;i<12;i++){
    await evaluate(`openViewer(${i})`);
    await sleep(700);
    const head=await evaluate(`(()=>{const h=document.querySelector('#viewer .cap div'); return h?h.textContent:'';})()`);
    const desc=await evaluate(`(()=>{const d=document.querySelector('#viewer .cap .d'); return d?d.textContent:'';})()`);
    if(head) seen.push({head, desc});
    await evaluate(`closeViewer&&closeViewer()`);
    await sleep(300);
  }
  console.log('panels read:', seen.length);
  seen.forEach(p=>console.log('   '+p.head));
  const all=seen.map(p=>p.head+' :: '+p.desc).join('\n');
  let pass=0,fail=0;
  const ok=(c,m)=>{ c?(pass++,console.log('  ok   '+m)):(fail++,console.log('  FAIL '+m)); };
  console.log('');
  ok(/Creature Head Sculpt/.test(all),   'the Realm shows "Creature Head Sculpt"');
  ok(/Ultron Shaver Campaign/.test(all), 'the Realm shows "Ultron Shaver Campaign"');
  ok(/Shiri Wordmark/.test(all),         'the Realm shows "Shiri Wordmark"');
  ok(/Custom AirPods Case/.test(all),    'the Realm shows the Apple spelling "AirPods"');
  ok(!/Rendered 3D Model|Campaign Project|Custom Airpod Case/.test(all), 'no old category-title survives in the Realm');
  ok(!/Finalized rendition/.test(all),   'the duplicated "Finalized rendition" sentence is gone from the Realm');
  ok(!/3D printed (enclosure|geometric)/.test(all), '"3D printed" is hyphenated as a modifier in the Realm');
  ok(!all.includes('—'),            'no em dash in any Realm panel');
  const errs=logs.filter(l=>/^error|EXCEPTION/.test(l));
  ok(errs.length===0, 'no console errors ('+errs.length+')'+(errs.length?' :: '+errs[0]:''));
  console.log('\n'+pass+' passed, '+fail+' failed');
  process.exitCode=fail?1:0;
}, process.argv[2]);
