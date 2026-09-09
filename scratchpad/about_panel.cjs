/* Does the About panel's rewritten copy really reach the screen IN ENGINE?
   The in-app pane has no WebGL, so this is headless Chrome on SwiftShader, which runs
   the Realm at a few frames a second. Notes for whoever runs this next:
     · the entry is a rAF-driven camera move, so POLL a signal, never sleep a fixed time;
     · `mode` and `PORTALS` are NOT globals in this build, only enterPortal / openViewer
       / __D, so menu mode is detected off #prompt's own text instead;
     · a synthetic keydown for E does not take; call enterPortal directly.
   Usage: node about_panel.cjs http://localhost:PORT/lego.html   (localhost, not 127.0.0.1) */
const {main}=require('./cdp.cjs');
main(async ({evaluate, sleep, logs, send})=>{
  // run the WHOLE session at a short window, which is where the caption used to be
  // cut: a 1280x800 laptop lands here once browser chrome is taken off.
  await send('Emulation.setDeviceMetricsOverride',{width:1280,height:660,deviceScaleFactor:1,mobile:false});
  const txt=()=>evaluate('document.body.innerText');
  // 1. wait for the build to finish loading
  let pct='';
  for(let i=0;i<90;i++){
    pct=await evaluate(`(()=>{const m=/(\\d+)%/.exec(document.body.innerText||''); return m?m[1]:'done';})()`);
    if(pct==='done'||pct==='100') break;
    await sleep(2000);
  }
  console.log('load        :', (pct==='done'||pct==='100')?'complete':'stuck at '+pct+'%');
  if(pct!=='done'&&pct!=='100') return;
  await sleep(4000);
  // 2. stand on the mansion porch and open the About portal
  await evaluate(`window.__D.tp(48.4,-0.1)`);
  await sleep(4000);
  await evaluate(`enterPortal('about')`);
  let inMenu=false;
  for(let t=0;t<50;t++){
    const p=await evaluate(`(()=>{const e=document.querySelector('#prompt'); return e?e.textContent:'';})()`);
    if(/project/i.test(p)){ inMenu=true; break; }
    await sleep(2500);
  }
  console.log('portal      :', inMenu?'in the About panel menu':'never reached the menu');
  if(!inMenu) return;
  // 3. open the first panel, which is About Me
  await evaluate(`openViewer(0)`);
  await sleep(3000);
  const head=await evaluate(`(()=>{const h=document.querySelector('#viewer .cap div'); return h?h.textContent:'';})()`);
  const desc=await evaluate(`(()=>{const d=document.querySelector('#viewer .cap .d'); return d?d.textContent:'';})()`);
  const geom=JSON.parse(await evaluate(`(()=>{const c=document.querySelector('#viewer .card'),d=document.querySelector('#viewer .cap .d');
    if(!c||!d) return '{}';
    const cr=c.getBoundingClientRect(), dr=d.getBoundingClientRect();
    return JSON.stringify({cardH:Math.round(cr.height), overrun:Math.round(dr.bottom-cr.bottom), vh:innerHeight});})()`));
  console.log('panel head  :', head);
  console.log('panel desc  :', desc.slice(0,86)+'...');
  console.log('geometry    :', JSON.stringify(geom));
  let pass=0, fail=0;
  const ok=(c,m)=>{ c?(pass++,console.log('  ok   '+m)):(fail++,console.log('  FAIL '+m)); };
  console.log('');
  ok(/^About/.test(head), 'the panel that opened is About Me  ['+head+']');
  ok(/in the Bay Area/.test(desc) && /models fail\.$/.test(desc.trim()), "renders the About page's own first paragraph, in full");
  ok(!/motion graphics, UI\/UX, fabrication, cinematography/.test(desc), 'the retired six-discipline copy is gone');
  ok(!desc.includes('—'), 'no em dash in the panel');
  ok(geom.overrun<=0, 'the caption is not clipped at this viewport ('+geom.vh+'px tall, overrun '+geom.overrun+'px)');
  const reach=JSON.parse(await evaluate(`(()=>{const v=document.getElementById('viewer'),c=v.querySelector('.card');
    v.scrollTop=0; const t=Math.round(c.getBoundingClientRect().top - v.getBoundingClientRect().top);
    v.scrollTop=v.scrollHeight; const b=Math.round(v.getBoundingClientRect().bottom - c.getBoundingClientRect().bottom);
    v.scrollTop=0; return JSON.stringify({t,b,scrolls:v.scrollHeight>v.clientHeight});})()`));
  ok(reach.t>=0, 'the top of the card is reachable (gap '+reach.t+'px)');
  ok(reach.b>=0, 'the bottom of the card is reachable (gap '+reach.b+'px)');
  console.log('        viewer scrolls at this height:', reach.scrolls);
  const errs=logs.filter(l=>/^error|EXCEPTION/.test(l));
  ok(errs.length===0, 'no console errors ('+errs.length+')'+(errs.length?' :: '+errs[0]:''));
  console.log('\n'+pass+' passed, '+fail+' failed');
  process.exitCode=fail?1:0;
}, process.argv[2]);
