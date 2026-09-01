// Test 3 failed. Two candidate causes, and they need different fixes:
//   (a) the edge condition never fired          -> my logic is wrong
//   (b) the request fired and Chrome REFUSED it -> transient user activation had expired,
//       because a mousedown grants ~5s and this harness takes far longer than that to walk
//       the cursor to the edge one dispatched event at a time
// Distinguish them: count pointerlockerror, and run the same pan FAST (few big steps).
const {main}=require('./cdp.cjs');
main(async ({evaluate,sleep,logs,send})=>{
  for(let i=0;i<300;i++){ if(await evaluate('!!(window.__D&&__D.scene)')) break; await sleep(500); }
  await sleep(2500);
  const b=await evaluate('(()=>{const e=document.querySelector("#controls .go");if(!e)return null;const r=e.getBoundingClientRect();return{x:Math.round(r.x+r.width/2),y:Math.round(r.y+r.height/2)};})()');
  if(b){ await send('Input.dispatchMouseEvent',{type:'mousePressed',x:b.x,y:b.y,button:'left',buttons:1,clickCount:1});
         await send('Input.dispatchMouseEvent',{type:'mouseReleased',x:b.x,y:b.y,button:'left',buttons:0,clickCount:1}); }
  await sleep(2500);
  // instrument: count lock errors and changes from the page itself
  await evaluate(`window.__LK={err:0,chg:0};
    document.addEventListener('pointerlockerror',()=>{window.__LK.err++});
    document.addEventListener('pointerlockchange',()=>{window.__LK.chg++}); 1`);
  const W=await evaluate('innerWidth'), H=await evaluate('innerHeight');
  const locked=()=>evaluate('document.pointerLockElement===document.querySelector("canvas")');
  const yaw=()=>evaluate('+__D.yaw.toFixed(5)');
  const deg=r=>Math.abs(r*180/Math.PI).toFixed(1);
  const down=(x,y)=>send('Input.dispatchMouseEvent',{type:'mousePressed',x,y,button:'left',buttons:1,clickCount:1});
  const move=(x,y)=>send('Input.dispatchMouseEvent',{type:'mouseMoved',x,y,button:'left',buttons:1});
  const up  =(x,y)=>send('Input.dispatchMouseEvent',{type:'mouseReleased',x,y,button:'left',buttons:0,clickCount:1});

  // FAST pan: 11 big steps, so the whole gesture is well inside a 5s activation window
  await evaluate('__LK.err=0; __LK.chg=0; 1');
  const t0=Date.now();
  let y0=await yaw(); await down(W>>1,H>>1);
  let x=W>>1;
  for(let i=0;i<11;i++){ x=Math.min(W-2,x+60); await move(x,H>>1); }
  const elapsed=Date.now()-t0;
  await sleep(600);
  const l=await locked(), lk=await evaluate('JSON.stringify(__LK)');
  console.log('FAST pan  gesture took '+elapsed+'ms   locked='+l+'   '+lk);
  for(let i=0;i<60;i++) await move(W-2,H>>1);
  const y1=await yaw(); await up(W-2,H>>1); await sleep(300);
  console.log('          turned '+deg(y1-y0)+' deg   (screen-edge bound is ~238)');

  // and does a bare request work at all with no gesture in flight?
  await evaluate('__LK.err=0; 1');
  await evaluate('document.querySelector("canvas").requestPointerLock&&document.querySelector("canvas").requestPointerLock(); 1');
  await sleep(600);
  console.log('bare request, no gesture: locked='+(await locked())+'  '+(await evaluate('JSON.stringify(__LK)')));
  if(await locked()) await evaluate('document.exitPointerLock(); 1');
}, process.argv[2]).catch(e=>{ console.error(e); process.exit(1); });
