const fs=require('fs');
const {main}=require('./cdp.cjs');
const URL='http://localhost:5209/';
const SIZES=[[390,844,'stack_iphone'],[430,932,'stack_iphone_max'],[768,1024,'stack_ipad_p'],[1024,768,'stack_ipad_l'],[1512,857,'stack_desktop']];
main(async ({evaluate,sleep,send})=>{
  for(const [w,h,name] of SIZES){
    await send('Emulation.setDeviceMetricsOverride',{width:w,height:h,deviceScaleFactor:2,mobile:w<=430});
    await send('Page.navigate',{url:URL});
    for(let i=0;i<80;i++){ if(await evaluate('!!document.querySelector("#root > *")')) break; await sleep(250); }
    await sleep(1200);
    await evaluate(`(()=>{const t=[...document.querySelectorAll('button,a,[role=button]')].find(e=>(e.textContent||'').trim().toLowerCase()==='about'); t&&t.click();})()`);
    await sleep(2600);
    const info=await evaluate(`(()=>{
      const R=e=>{const r=e.getBoundingClientRect();return{x:Math.round(r.x),y:Math.round(r.y),w:Math.round(r.width),h:Math.round(r.height)};};
      const page=document.querySelector('.ss-about-page');
      const col=document.querySelector('.ss-about-text-column');
      const photo=document.querySelector('.ss-about-photo-col');
      const ps=[...document.querySelectorAll('.ss-about-page p')];
      const h2=document.querySelector('.ss-about-page h2');
      const sub=document.querySelector('.ss-about-subtitle');
      const bento=document.querySelector('.ss-bento');
      const cs=e=>getComputedStyle(e);
      return JSON.stringify({
        photo:R(photo), col:R(col), h2:{...R(h2),fs:cs(h2).fontSize},
        sub:{fs:cs(sub).fontSize},
        paras:ps.map(e=>({w:R(e).w,fs:cs(e).fontSize,lh:cs(e).lineHeight})),
        bento:{...R(bento),cols:cs(bento).gridTemplateColumns},
        bentoTiles:[...bento.children].map(t=>t.innerText.replace(/\\n/g,'/')+' '+R(t).w+'x'+R(t).h+'@'+R(t).x+','+R(t).y),
        pageOverflowY:cs(page).overflowY,
        scrollH:page.scrollHeight, clientH:page.clientHeight,
        canScroll:page.scrollHeight>page.clientHeight+1,
        docScrollW:document.documentElement.scrollWidth, clientW:document.documentElement.clientWidth
      });
    })()`);
    console.log('\n== '+name+' ('+w+'x'+h+')');
    console.log(JSON.stringify(JSON.parse(info),null,1));
    const {data}=await send('Page.captureScreenshot',{format:'png'});
    fs.writeFileSync('scratchpad/'+name+'.png',Buffer.from(data,'base64'));
  }
}, URL);
