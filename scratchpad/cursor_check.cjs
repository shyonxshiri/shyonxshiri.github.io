/* The pointer, checked on the RENDERED page. Four things, each of which was a real defect
   found by measurement rather than by eye (user, 2026-09-09: the cursor does not look right
   and sometimes glitches back to the original mouse):
   · a desktop window under 768px had NO pointer at all, the dot hidden by a layout
     breakpoint and the native arrow suppressed by a star rule the dot-hiding could not undo;
   · every image was natively draggable, and an HTML5 drag is the one state where the
     browser paints its own cursor over the page and cursor:none is ignored;
   · the dot sat at (-4.5,-4.5) on every fresh load until the pointer was first moved;
   · a drag across the coverflow started a text selection under it.
   Run: node scratchpad/cursor_check.cjs http://localhost:5199/ */
const {main}=require('./cdp.cjs');
const URL=process.argv[2]||'http://localhost:5199/';
let fail=0;
const ok=(c,m)=>{ console.log((c?'  ok   ':'  FAIL ')+m); if(!c) fail++; };
const boot=async({evaluate,sleep,send},w,h,touch)=>{
  await send('Emulation.setDeviceMetricsOverride',{width:w,height:h,deviceScaleFactor:1,mobile:!!touch});
  /* a real coarse pointer, the way verify_touch_act.cjs does it, PLUS the media features
     themselves: touch emulation alone does not always flip (hover:none)/(pointer:coarse)
     in headless, and it is the media query that the rule under test is written against. */
  await send('Emulation.setTouchEmulationEnabled', touch ? {enabled:true,maxTouchPoints:5} : {enabled:false});
  await send('Emulation.setEmulatedMedia', touch
    ? {features:[{name:'hover',value:'none'},{name:'pointer',value:'coarse'}]}
    : {features:[]});
  await send('Page.navigate',{url:URL});
  for(let i=0;i<80;i++){ if(await evaluate('!!document.querySelector("#root > *")')) break; await sleep(220); }
  await sleep(800);
};
main(async (ctx)=>{
  const {evaluate,sleep,send}=ctx;

  console.log('\n-- the dot is not parked in the corner before the pointer has moved');
  await boot(ctx,1512,857,false);
  /* the opacity TRANSITIONS over .18s, so read a settled value, not a frame mid ramp:
     an exact ==='1' check 150ms after the move is a race, and it flaked twice. */
  const atRest=await evaluate(`getComputedStyle(document.getElementById('ss-cursor-dot')).opacity`);
  ok(parseFloat(atRest)<0.05, `hidden at rest on a fresh load (opacity ${atRest})`);
  /* A SWEEP, not one event. The reveal is gated on a real DELTA, so the first move only
     establishes a position: that is what stops the load-time move at 0,0 flashing the
     bubble in the corner. Two dispatches flaked, because the first can land before the
     effect has attached its listener; real mouse motion delivers a stream at 60/s, so
     the check delivers one too. */
  for (let i=4;i>=0;i--) await send('Input.dispatchMouseEvent',{type:'mouseMoved',x:700-i*9,y:400-i*5});
  await sleep(600);
  const p=JSON.parse(await evaluate(`(()=>{const d=document.getElementById('ss-cursor-dot');
    const r=d.getBoundingClientRect(); return JSON.stringify({op:getComputedStyle(d).opacity,x:Math.round(r.x+r.width/2),y:Math.round(r.y+r.height/2)});})()`));
  ok(parseFloat(p.op)>0.95, `shown on the first real move (opacity ${p.op})`);
  ok(Math.abs(p.x-700)<=1 && Math.abs(p.y-400)<=1, `centred on the pointer (${p.x},${p.y} for 700,400)`);

  console.log('\n-- a mouse keeps its pointer at every width. 760 and under used to have none');
  for(const w of [1512,900,768,760,700,640,500]){
    await boot(ctx,w,800,false);
    const r=JSON.parse(await evaluate(`(()=>{const d=document.getElementById('ss-cursor-dot');
      return JSON.stringify({dot:getComputedStyle(d).display, cur:getComputedStyle(document.body).cursor});})()`));
    ok(!(r.dot==='none' && r.cur==='none'), `${w}px has a pointer (dot ${r.dot}, native ${r.cur})`);
  }

  console.log('\n-- a coarse pointer gets the native one back and no dot');
  await boot(ctx,390,844,true);
  const t=JSON.parse(await evaluate(`(()=>{const d=document.getElementById('ss-cursor-dot');
    return JSON.stringify({dot:getComputedStyle(d).display, cur:getComputedStyle(document.body).cursor});})()`));
  ok(t.dot==='none', 'no custom dot on touch');
  ok(t.cur!=='none', `native cursor restored on touch (${t.cur})`);


  console.log('\n-- no native drag anywhere, which is what handed the arrow back mid gesture');
  for(const page of ['home','work','about']){
    await boot(ctx,1512,857,false);
    await evaluate(`(()=>{const t=[...document.querySelectorAll('button,a,[role=button]')].find(e=>e.textContent.trim().toLowerCase()==='${page}'); t&&t.click();})()`);
    await sleep(2000);
    const r=JSON.parse(await evaluate(`(()=>{const m=[...document.querySelectorAll('img,video')];
      const d=m.filter(e=>e.draggable!==false && getComputedStyle(e).webkitUserDrag!=='none');
      return JSON.stringify({n:m.length,drag:d.length});})()`));
    ok(r.drag===0, `${page}: 0 of ${r.n} media natively draggable`);
  }
  await evaluate(`(()=>{window.__dg=0; document.addEventListener('dragstart',()=>window.__dg++); return 1;})()`);
  ok(await evaluate(`(()=>{const e=new DragEvent('dragstart',{bubbles:true,cancelable:true});
     document.querySelector('img').dispatchEvent(e); return e.defaultPrevented;})()`),
     'a dragstart that does reach the document is cancelled');

  console.log('\n-- every element still hides the native pointer on a mouse');
  await boot(ctx,1512,857,false);
  for(const page of ['home','work','about','contact']){
    await evaluate(`(()=>{const t=[...document.querySelectorAll('button,a,[role=button]')].find(e=>e.textContent.trim().toLowerCase()==='${page}'); t&&t.click();})()`);
    await sleep(1800);
    const bad=await evaluate(`(()=>{const o=new Set();
      for(const el of document.querySelectorAll('*')){const c=getComputedStyle(el).cursor; if(c!=='none') o.add(el.tagName.toLowerCase()+':'+c);} 
      return JSON.stringify([...o].slice(0,6));})()`);
    ok(bad==='[]', `${page}: nothing shows the native cursor ${bad}`);
  }

  console.log('\n-- the coverflow drag does not select the page under it');
  await evaluate(`(()=>{const t=[...document.querySelectorAll('button,a,[role=button]')].find(e=>e.textContent.trim().toLowerCase()==='work'); t&&t.click();})()`);
  await sleep(2000);
  ok(await evaluate(`(()=>{const c=document.querySelector('.ss-card'); if(!c) return false;
     let n=c; while(n&&n!==document.body){ if(getComputedStyle(n).userSelect==='none') return true; n=n.parentElement; } return false;})()`),
     'the card row is user-select:none');

  console.log('\n-- the hover state actually fires (the class was styled by nothing before)');
  await boot(ctx,1512,857,false);
  await send('Input.dispatchMouseEvent',{type:'mouseMoved',x:700,y:400}); await sleep(150);
  const rest=await evaluate(`getComputedStyle(document.getElementById('ss-cursor-dot')).transform`);
  const nav=JSON.parse(await evaluate(`(()=>{const b=[...document.querySelectorAll('nav button')].pop();
    const r=b.getBoundingClientRect(); return JSON.stringify({x:Math.round(r.x+r.width/2),y:Math.round(r.y+r.height/2)});})()`));
  for (let i=3;i>=0;i--) await send('Input.dispatchMouseEvent',{type:'mouseMoved',x:nav.x-i*5,y:nav.y});
  await sleep(500);
  const on=await evaluate(`document.body.classList.contains('ss-hover')`);
  const big=await evaluate(`getComputedStyle(document.getElementById('ss-cursor-dot')).transform`);
  ok(on, 'body takes .ss-hover over a nav item');
  ok(rest!==big, `the bubble grows on hover (${rest} -> ${big})`);

  console.log('\n-- separation from the ground, read off the real composited frame');
  const SAMPLES=[['about',[[1450,430,'studio wall (mid grey)'],[300,600,'cream copy column'],[1250,800,'black jacket']]],
                 ['work', [[756,429,'card artwork (the old worst case)'],[120,700,'page ground']]],
                 ['contact',[[1250,260,'sky glow']]]];
  for(const [page,pts] of SAMPLES){
    await evaluate(`(()=>{const t=[...document.querySelectorAll('button,a,[role=button]')].find(e=>e.textContent.trim().toLowerCase()==='${page}'); t&&t.click();})()`);
    await sleep(2200);
    for(const [x,y,label] of pts){
      for (let i=3;i>=0;i--) await send('Input.dispatchMouseEvent',{type:'mouseMoved',x:x-i*6,y});
      await sleep(320);
      const {data}=await send('Page.captureScreenshot',{format:'png'});
      const r=await evaluate(`(async()=>{
        const img=new Image(); await new Promise(r=>{img.onload=r; img.src='data:image/png;base64,${data}';});
        const c=document.createElement('canvas'); c.width=img.width; c.height=img.height;
        const ctx=c.getContext('2d'); ctx.drawImage(img,0,0);
        const s=img.width/window.innerWidth, L=p=>0.2126*p[0]+0.7152*p[1]+0.0722*p[2];
        const box=ctx.getImageData(Math.round((${x}-6)*s),Math.round((${y}-6)*s),Math.round(13*s),Math.round(13*s)).data;
        let mx=-1,mn=1e9; for(let i=0;i<box.length;i+=4){const l=L([box[i],box[i+1],box[i+2]]); if(l>mx)mx=l; if(l<mn)mn=l;}
        const g=(px,py)=>{const d=ctx.getImageData(Math.round(px*s),Math.round(py*s),1,1).data; return L([d[0],d[1],d[2]]);};
        const gl=(g(${x}+18,${y})+g(${x}-18,${y}))/2;
        return {gl:+gl.toFixed(1), sep:+Math.max(mx-gl, gl-mn).toFixed(1)};
      })()`, true);
      ok(r.sep>=45, `${label.padEnd(34)} ground lum ${String(r.gl).padStart(5)}  separation ${String(r.sep).padStart(5)}`);
    }
  }

  console.log(fail? `\n${fail} FAILED` : '\nall passed');
}, URL);
