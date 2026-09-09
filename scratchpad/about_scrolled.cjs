const fs=require('fs');
const {main}=require('./cdp.cjs');
const URL='http://localhost:5209/';
main(async ({evaluate,sleep,send,logs})=>{
  for(const [w,h,name] of [[390,844,'scrolled_iphone'],[768,1024,'scrolled_ipad_p']]){
    await send('Emulation.setDeviceMetricsOverride',{width:w,height:h,deviceScaleFactor:2,mobile:w<=430});
    await send('Page.navigate',{url:URL});
    for(let i=0;i<80;i++){ if(await evaluate('!!document.querySelector("#root > *")')) break; await sleep(250); }
    await sleep(1200);
    await evaluate(`[...document.querySelectorAll('button,a')].find(e=>/^about$/i.test((e.textContent||'').trim()))?.click()`);
    await sleep(2600);
    await evaluate(`(()=>{const p=document.querySelector('.ss-about-page'); p.scrollTop=p.scrollHeight;})()`);
    await sleep(900);
    console.log(name, await evaluate(`(()=>{const p=document.querySelector('.ss-about-page');const b=document.querySelector('.ss-bento').getBoundingClientRect();
      return JSON.stringify({scrollTop:Math.round(p.scrollTop),scrollH:p.scrollHeight,clientH:p.clientHeight,bentoBottom:Math.round(b.bottom),viewportH:${h},bentoFullyVisible:b.bottom<=${h}&&b.top>=0});})()`));
    const {data}=await send('Page.captureScreenshot',{format:'png'});
    fs.writeFileSync('scratchpad/'+name+'.png',Buffer.from(data,'base64'));
  }
  console.log('console errors:', logs.filter(l=>/^error|EXCEPTION/i.test(l)).length);
}, URL);
