// Replay the SHIPPED bubbleTex layout against the real Fredoka metrics, for a range of `lines`,
// so the greeting is sized by measurement rather than by eye.
const {main}=require('./cdp.cjs');
main(async ({evaluate,sleep,logs,send})=>{
  for(let i=0;i<300;i++){ if(await evaluate('!!(window.__D&&__D.scene)')) break; await sleep(500); }
  await sleep(3000);
  console.log(await evaluate(`(async()=>{
    if(document.fonts&&document.fonts.ready) await document.fonts.ready;
    const S=[...document.querySelectorAll('script')].map(s=>s.textContent).join('');
    const m=S.match(/text:"([^"]*may find[^"]*)"/);
    const text=m?m[1]:'MISSING';
    const W=760,H=275;
    const c=document.createElement('canvas'); c.width=W; c.height=H; const x=c.getContext('2d');
    const F=s=>'700 '+s+'px "Fredoka",sans-serif';
    const out=['text ('+text.split(' ').length+' words, '+text.length+' chars):','  '+text,''];
    out.push('  lines  fontpx  used  block-h  fits-275   wrapped');
    for(const LN of [3,4,5,6,7]){
      let fs=Math.min(104,Math.round((H-40)/(LN*1.22))), lines=null;
      for(;;){ x.font=F(fs);
        const L=[]; let cur='';
        for(const wd of text.split(' ')){ const t=cur?cur+' '+wd:wd;
          if(x.measureText(t).width>W-70 && cur){ L.push(cur); cur=wd; } else cur=t; }
        if(cur) L.push(cur);
        if(L.length<=LN || fs<=18){ lines=L; break; }
        fs-=4; }
      const bh=lines.length*fs*1.22;
      out.push('  '+String(LN).padStart(5)+String(fs).padStart(8)+String(lines.length).padStart(6)
        +String(Math.round(bh)).padStart(9)+(bh<=H-10?'   yes    ':'   NO     ')+'  '+lines[0].slice(0,42));
    }
    return out.join('\\n');
  })()`, true));
}, process.argv[2]).catch(e=>{ console.error(e); process.exit(1); });
