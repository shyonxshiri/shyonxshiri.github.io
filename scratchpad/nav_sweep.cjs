/* HOW MUCH OF THE STACKED ABOUT'S SCROLL PUTS THE NAV IN TROUBLE.
   nav_contrast_mobile.cjs samples ONE scroll position (700) and so reports this
   intermittently: sometimes the bar is over the jacket, sometimes over the cream below it.
   The nav is fixed and the whole page scrolls under it, so the honest question is not
   "does one position pass" but "what fraction of the travel does", which is what this sweeps.
   Reads real pixels off the composited frame, same method as nav_contrast.cjs. */
const { main } = require('./cdp.cjs');
// Default is the repo's standard dev port, NOT whichever one this was written on. Pass the
// LOCALHOST form; vite refuses 127.0.0.1 and that reads as a clean run.
//   node scratchpad/nav_sweep.cjs http://localhost:5209/
const URL = process.argv[2] || 'http://localhost:5173/';
const lum=(r,g,b)=>{const f=v=>{v/=255;return v<=.03928?v/12.92:Math.pow((v+.055)/1.055,2.4);};
  return .2126*f(r)+.7152*f(g)+.0722*f(b);};
const ratio=(a,b)=>{const L1=Math.max(a,b),L2=Math.min(a,b);return (L1+.05)/(L2+.05);};
main(async ({evaluate,sleep,send})=>{
  for(const [w,h] of [[430,932],[390,844]]){
    await send('Emulation.setDeviceMetricsOverride',{width:w,height:h,deviceScaleFactor:2,mobile:true});
    await send('Page.navigate',{url:URL});
    let up=false;
    for(let i=0;i<80;i++){ if(await evaluate('!!document.querySelector("#root > *")')){ up=true; break; } await sleep(250); }
    // A page that never mounted has a scroll range of 0, so the sweep takes ONE sample and
    // reports "all clear". Same false pass responsive_audit.cjs shipped with for months.
    if(!up){ console.error('\nFAILED: nothing rendered at '+URL+' after 20s. Is the dev server on that port?'); process.exit(1); }
    await sleep(1200);
    await evaluate(`[...document.querySelectorAll('button,a')].find(e=>/^about$/i.test((e.textContent||'').trim()))?.click()`);
    await sleep(2600);
    const max=+(await evaluate(`(()=>{const p=document.querySelector('.ss-about-page');return p.scrollHeight-p.clientHeight;})()`));
    console.log(`\n== ${w}x${h}  scroll range 0..${max}`);
    let worst={cr:99}, fails=0, n=0;
    for(let top=0; top<=max; top+=40){
      // instant, not smooth: a smooth scroll is why the single-sample check is flaky
      await evaluate(`(()=>{const p=document.querySelector('.ss-about-page');p.scrollTop=${top};})()`);
      await sleep(260);
      const boxes=JSON.parse(await evaluate(`JSON.stringify([...document.querySelectorAll('nav button')].map(b=>{const r=b.getBoundingClientRect();
        return {t:b.textContent.trim(),x:Math.round(r.left),y:Math.round(r.top),w:Math.round(r.width),h:Math.round(r.height),op:+getComputedStyle(b).opacity};}))`));
      const {data}=await send('Page.captureScreenshot',{format:'png'});
      await evaluate(`(async()=>{const img=new Image();await new Promise(r=>{img.onload=r;img.src='data:image/png;base64,${data}';});
        const c=document.createElement('canvas');c.width=img.width;c.height=img.height;c.getContext('2d').drawImage(img,0,0);
        window.__ctx=c.getContext('2d');window.__scale=img.width/innerWidth;return 1;})()`, true);
      for(const b of boxes){
        const r=JSON.parse(await evaluate(`(()=>{const s=window.__scale,ctx=window.__ctx;
          const d=ctx.getImageData(Math.round(${b.x}*s),Math.round(${b.y}*s),Math.round(${b.w}*s),Math.round(${b.h}*s)).data;
          const L=[];for(let i=0;i<d.length;i+=4)L.push([d[i],d[i+1],d[i+2]]);
          L.sort((p,q)=>(p[0]+p[1]+p[2])-(q[0]+q[1]+q[2]));
          return JSON.stringify({dark:L[Math.round(L.length*0.06)],light:L[Math.round(L.length*0.94)],mid:L[Math.round(L.length*0.5)]});})()`));
        const cr=ratio(lum(...r.light),lum(...r.dark)); n++;
        if(cr<4.5){ fails++; if(cr<worst.cr) worst={cr,top,t:b.t,ground:r.mid.join(',')}; }
      }
    }
    console.log(`  ${fails}/${n} samples under 4.5:1` + (fails?`   worst ${worst.cr.toFixed(2)}:1 on ${worst.t} at scrollTop ${worst.top}, ground ${worst.ground}`:'   all clear'));
  }
}, URL);
