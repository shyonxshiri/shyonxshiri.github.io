const {main}=require('./cdp.cjs');
main(async ({evaluate,sleep,logs,send})=>{
  for(let i=0;i<300;i++){ if(await evaluate('!!(window.__D&&__D.scene)')) break; await sleep(500); }
  await sleep(2500);
  const b=await evaluate('(()=>{const e=document.querySelector("#controls .go");if(!e)return null;const r=e.getBoundingClientRect();return{x:Math.round(r.x+r.width/2),y:Math.round(r.y+r.height/2)};})()');
  if(b){ await send('Input.dispatchMouseEvent',{type:'mousePressed',x:b.x,y:b.y,button:'left',buttons:1,clickCount:1});
         await send('Input.dispatchMouseEvent',{type:'mouseReleased',x:b.x,y:b.y,button:'left',buttons:0,clickCount:1}); }
  await sleep(2500);
  await evaluate('window.__LK={err:0,chg:0};document.addEventListener("pointerlockerror",()=>__LK.err++);document.addEventListener("pointerlockchange",()=>__LK.chg++);1');
  const W=await evaluate('innerWidth'), H=await evaluate('innerHeight');
  const yaw=()=>evaluate('+__D.yaw.toFixed(5)');
  const deg=r=>Math.abs(r*180/Math.PI).toFixed(1);
  const down=(x,y)=>send('Input.dispatchMouseEvent',{type:'mousePressed',x,y,button:'left',buttons:1,clickCount:1});
  const move=(x,y)=>send('Input.dispatchMouseEvent',{type:'mouseMoved',x,y,button:'left',buttons:1});
  const up  =(x,y)=>send('Input.dispatchMouseEvent',{type:'mouseReleased',x,y,button:'left',buttons:0,clickCount:1});

  console.log('══ 1. NO LOCK IS EVER REQUESTED ══');
  await down(W>>1,H>>1); await sleep(400);
  for(let i=1;i<=8;i++) await move((W>>1)+i*20,H>>1);
  await sleep(300);
  console.log('  locked:', await evaluate('document.pointerLockElement===document.querySelector("canvas")'), ' (want false)');
  console.log('  lock events:', await evaluate('JSON.stringify(__LK)'), ' (want err 0, chg 0)');
  await up((W>>1)+160,H>>1); await sleep(300);

  console.log('\n══ 2. EDGE PAN keeps turning past the bezel ══');
  let y0=await yaw();
  await down(W>>1,H>>1);
  let x=W>>1; for(let i=0;i<12;i++){ x=Math.min(W-2,x+60); await move(x,H>>1); }
  const yMid=await yaw();
  console.log('  drag to the edge turned      '+deg(yMid-y0)+' deg  (this is the old bound)');
  // now HOLD at the edge, dispatching nothing: the frame loop must keep turning
  for(let i=0;i<40;i++) await evaluate('__D.step(1/60)');
  const yEnd=await yaw();
  console.log('  then holding at the edge for  0.67s of frames with NO pointer input:');
  console.log('    turned a further '+deg(yEnd-yMid)+' deg   total '+deg(yEnd-y0)+' deg  (want > 238)');
  await up(W-2,H>>1); await sleep(300);
  const yAfter=await yaw();
  for(let i=0;i<30;i++) await evaluate('__D.step(1/60)');
  console.log('  after release it stops:', (Math.abs((await yaw())-yAfter)<1e-6) ? 'YES' : '*** still turning ***');

  console.log('\n══ 3. THE GLASS CURSOR ══');
  console.log(await evaluate(`(()=>{const c=getComputedStyle(document.getElementById('cur'));
    return '  background '+c.backgroundColor+'\\n  border     '+c.borderTopWidth+' '+c.borderTopColor
      +'\\n  box-sizing '+c.boxSizing+'\\n  size on screen '+document.getElementById('cur').getBoundingClientRect().width+'px (want 9)';})()`));

  console.log('\n══ 4. THE HINT BAR ══');
  await evaluate('__D.tp(19.94,-26.5);1'); for(let i=0;i<15;i++) await evaluate('__D.step(1/60)');
  await evaluate('__hero.wear(true);1'); for(let i=0;i<8;i++) await evaluate('__D.step(1/60)');
  console.log('  suit on :', await evaluate("document.querySelector('.hint').textContent.replace(/\\s+/g,' ').trim()"));
  const errs=logs.filter(l=>/EXCEPTION/i.test(l));
  console.log('\nexceptions:', errs.length?errs.slice(0,4):'none');
}, process.argv[2]).catch(e=>{ console.error(e); process.exit(1); });
