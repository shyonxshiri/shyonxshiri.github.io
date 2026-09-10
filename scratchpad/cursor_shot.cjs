/* The bubble is nine pixels, so it cannot be judged at actual size in a screenshot. This
   parks the pointer on each of the grounds it really crosses, cuts a 40px box around it out
   of the composited frame and blows it up 12x with smoothing off, then lays the strips out
   as one sheet. Same method the Realm used to pick this shape (scratchpad/cursor/bubble.html). */
const fs=require('fs'); const {main}=require('./cdp.cjs');
const URL=process.argv[2]||'http://localhost:5199/';
const OUT=process.argv[3]||'/tmp/cursor_sheet.png';
main(async ({evaluate,sleep,send})=>{
  await send('Emulation.setDeviceMetricsOverride',{width:1512,height:857,deviceScaleFactor:2,mobile:false});
  await send('Page.navigate',{url:URL});
  for(let i=0;i<80;i++){ if(await evaluate('!!document.querySelector("#root > *")')) break; await sleep(220); }
  await sleep(1000);
  const shots=[];
  const grab=async(x,y,label,hover)=>{
    await send('Input.dispatchMouseEvent',{type:'mouseMoved',x:x-7,y});
    await send('Input.dispatchMouseEvent',{type:'mouseMoved',x,y});
    await sleep(hover?650:340);
    const {data}=await send('Page.captureScreenshot',{format:'png'});
    shots.push({data,x,y,label});
  };
  const go=async(p)=>{ await evaluate(`(()=>{const t=[...document.querySelectorAll('button,a,[role=button]')].find(e=>e.textContent.trim().toLowerCase()==='${p}'); t&&t.click();})()`); await sleep(2400); };
  await go('about');   await grab(1450,430,'studio wall'); await grab(300,600,'cream copy'); await grab(1250,800,'black jacket');
  await go('work');    await grab(756,429,'card artwork'); await grab(120,700,'page ground');
  await go('contact'); await grab(1250,260,'sky glow');
  const navBox=JSON.parse(await evaluate(`(()=>{const b=[...document.querySelectorAll('nav button')].pop();
    const r=b.getBoundingClientRect(); return JSON.stringify({x:Math.round(r.x+r.width/2),y:Math.round(r.y+r.height/2)});})()`));
  await grab(navBox.x,navBox.y,'HOVER (over a nav item)',true);

  const png=await evaluate(`(async()=>{
    const S=${JSON.stringify(shots.map(s=>({x:s.x,y:s.y,label:s.label})))};
    const D=${JSON.stringify(shots.map(s=>s.data))};
    const CROP=34, Z=11, PAD=14, LBL=26;
    const out=document.createElement('canvas');
    out.width=(CROP*Z+PAD)*S.length+PAD; out.height=CROP*Z+PAD*2+LBL;
    const o=out.getContext('2d'); o.imageSmoothingEnabled=false;
    o.fillStyle='#141414'; o.fillRect(0,0,out.width,out.height);
    for(let i=0;i<S.length;i++){
      const img=new Image(); await new Promise(r=>{img.onload=r; img.src='data:image/png;base64,'+D[i];});
      const s=img.width/window.innerWidth;
      const c=document.createElement('canvas'); c.width=img.width; c.height=img.height;
      c.getContext('2d').drawImage(img,0,0);
      const dx=PAD+i*(CROP*Z+PAD);
      o.drawImage(c, Math.round((S[i].x-CROP/2)*s), Math.round((S[i].y-CROP/2)*s), Math.round(CROP*s), Math.round(CROP*s), dx, PAD, CROP*Z, CROP*Z);
      o.strokeStyle='rgba(255,255,255,.25)'; o.strokeRect(dx+.5,PAD+.5,CROP*Z-1,CROP*Z-1);
      o.fillStyle='#e8e8e8'; o.font='600 15px -apple-system,system-ui,sans-serif'; o.textAlign='center';
      o.fillText(S[i].label, dx+CROP*Z/2, PAD+CROP*Z+19);
    }
    return out.toDataURL('image/png').split(',')[1];
  })()`, true);
  fs.writeFileSync(OUT, Buffer.from(png,'base64'));
  console.log('wrote', OUT);
}, URL);
