// Three drags back to back: Chrome rate-limits re-locking, and the question is whether a refused
// re-lock costs the pan or only costs it being unbounded.
const {main}=require('./cdp.cjs');
main(async ({evaluate,sleep,logs,send})=>{
  for(let i=0;i<180;i++){ if(await evaluate('!!(window.__D&&__D.scene&&__D.renderer)')) break; await sleep(500); }
  await evaluate('__D.renderer.setSize(64,64,false); 1'); await sleep(1500);
  const box=await evaluate('(()=>{const b=document.querySelector("#controls .go").getBoundingClientRect();return {x:Math.round(b.x+b.width/2),y:Math.round(b.y+b.height/2)};})()');
  await send('Input.dispatchMouseEvent',{type:'mousePressed',x:box.x,y:box.y,button:'left',buttons:1,clickCount:1});
  await send('Input.dispatchMouseEvent',{type:'mouseReleased',x:box.x,y:box.y,button:'left',buttons:0,clickCount:1});
  await sleep(800);

  const W=await evaluate('innerWidth');
  const edge=(W-640)*0.0065*180/Math.PI;
  console.log('window '+W+'px wide; the screen edge alone allows '+edge.toFixed(0)+'deg from x=640\n');
  for(let d=1; d<=3; d++){
    const y0=await evaluate('+__D.yaw');
    await send('Input.dispatchMouseEvent',{type:'mousePressed',x:640,y:400,button:'left',buttons:1,clickCount:1});
    await sleep(250);
    const locked=await evaluate('__D.lookLocked');
    for(let x=640;x<=640+30*60;x+=60)
      await send('Input.dispatchMouseEvent',{type:'mouseMoved',x,y:400,button:'left',buttons:1});
    await sleep(150);
    const y1=await evaluate('+__D.yaw');
    await send('Input.dispatchMouseEvent',{type:'mouseReleased',x:900,y:400,button:'left',buttons:0,clickCount:1});
    await sleep(120);   // straight into the next drag, no pause: the worst case for a rate limit
    const turned=Math.abs(y1-y0)*180/Math.PI;
    console.log('drag '+d+': lock='+(locked?'granted':'REFUSED ')+'  turned '+turned.toFixed(0)+'deg'
      +(turned>edge*1.5?'   (unbounded)':'   (bounded by the screen — fallback path)')
      +(turned>1?'':'   *** FROZEN ***'));
  }
  const ex=logs.filter(l=>/EXCEPTION/i.test(l));
  console.log(ex.length? '\nexceptions:\n'+ex.slice(0,4).join('\n') : '\nno exceptions');
}, 'http://localhost:5199/lego.html#nopipe').catch(e=>{console.error('FAILED',e.message);process.exit(1);});
