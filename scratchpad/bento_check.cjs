const fs=require('fs');
const {main}=require('./cdp.cjs');
const URL='http://localhost:5209/';
main(async ({evaluate,sleep,send})=>{
  for(const [w,h,name] of [[1512,857,'bento_desktop'],[1024,768,'bento_ipad'],[390,844,'bento_phone']]){
    await send('Emulation.setDeviceMetricsOverride',{width:w,height:h,deviceScaleFactor:2,mobile:w<=430});
    await send('Page.navigate',{url:URL});
    for(let i=0;i<80;i++){ if(await evaluate('!!document.querySelector("#root > *")')) break; await sleep(250); }
    await sleep(1200);
    const clicked = await evaluate(`(()=>{const t=[...document.querySelectorAll('button,a,[role=button]')].find(e=>(e.textContent||'').trim().toLowerCase()==='about'); if(!t) return 'NO ABOUT BTN'; t.click(); return 'ok';})()`);
    await sleep(2600);
    const info = await evaluate(`(()=>{
      const b=document.querySelector('.ss-bento');
      if(!b) return JSON.stringify({found:false, body:(document.body.innerText||'').slice(0,200)});
      const r=b.getBoundingClientRect();
      const tiles=[...b.children].map(t=>({t:t.innerText.replace(/\\n/g,' | '), r:JSON.parse(JSON.stringify(t.getBoundingClientRect()))}));
      const page=document.querySelector('.ss-about-page')||document.body;
      const txt=page.innerText;
      const count=(s)=>(txt.toLowerCase().split(s.toLowerCase()).length-1);
      return JSON.stringify({found:true, clicked:${JSON.stringify('x')}, box:{x:Math.round(r.x),y:Math.round(r.y),w:Math.round(r.width),h:Math.round(r.height)},
        tiles:tiles.map(t=>t.t+' @'+Math.round(t.r.x)+','+Math.round(t.r.y)+' '+Math.round(t.r.width)+'x'+Math.round(t.r.height)),
        runningInBrowser:count('running in this browser'), sanJose:count('san jose'), fifteenNine:count('15.9'), fullTime:count('full-time'),
        docScrollW:document.documentElement.scrollWidth, clientW:document.documentElement.clientWidth});
    })()`);
    console.log('\\n== '+name+' ('+w+'x'+h+') click='+clicked);
    console.log(JSON.stringify(JSON.parse(info),null,1));
    const {data}=await send('Page.captureScreenshot',{format:'png'});
    fs.writeFileSync('scratchpad/'+name+'.png',Buffer.from(data,'base64'));
  }
}, URL);
