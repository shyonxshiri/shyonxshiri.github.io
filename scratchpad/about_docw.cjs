const {main}=require('./cdp.cjs');
const URL='http://localhost:5209/';
const S=[[1512,857],[1280,800],[1024,768],[834,1112],[768,1024],[430,932],[390,844],[375,667],[360,640],[844,390]];
main(async ({evaluate,sleep,send})=>{
  let bad=0;
  for(const [w,h] of S){
    await send('Emulation.setDeviceMetricsOverride',{width:w,height:h,deviceScaleFactor:2,mobile:w<=430});
    await send('Page.navigate',{url:URL});
    for(let i=0;i<80;i++){ if(await evaluate('!!document.querySelector("#root > *")')) break; await sleep(250); }
    await sleep(1000);
    await evaluate(`[...document.querySelectorAll('button,a')].find(e=>/^about$/i.test((e.textContent||'').trim()))?.click()`);
    await sleep(2200);
    const r=JSON.parse(await evaluate(`(()=>{const c=document.querySelector('.ss-about-text-column');
      return JSON.stringify({doc:document.documentElement.scrollWidth,cw:document.documentElement.clientWidth,
        colClip:c.scrollHeight-Math.round(c.getBoundingClientRect().height)});})()`));
    const sideways=r.doc>r.cw, clipped=r.colClip>1;
    if(sideways||clipped) bad++;
    console.log(`${String(w+'x'+h).padEnd(10)} doc ${r.doc}/${r.cw} ${sideways?'SIDEWAYS SCROLL':'ok'}   column over by ${r.colClip} ${clipped?'CLIPPED':'ok'}`);
  }
  console.log(bad?`\n${bad} size(s) failed`:'\nall 10 sizes clean');
  process.exitCode=bad?1:0;
}, URL);
