/* Asserts the About page's tool tile grid is gone (user, 2026-09-09), on every viewport the
   responsive audit uses, and that the copy it sat under is untouched. Reads the RENDERED page:
   the tiles were four <div>s of plain text, so a grep of the source cannot tell a deleted
   component from one that renders and is hidden. */
const {main}=require('./cdp.cjs');
const URL=process.argv[2]||'http://localhost:5199/';
const SIZES=[[1512,857],[1280,800],[1024,768],[834,1112],[768,1024],[430,932],[390,844],[844,390]];
let fail=0;
const ok=(c,m)=>{ console.log((c?'  ok   ':'  FAIL ')+m); if(!c) fail++; };
main(async ({evaluate,sleep,send})=>{
  for(const [w,h] of SIZES){
    await send('Emulation.setDeviceMetricsOverride',{width:w,height:h,deviceScaleFactor:2,mobile:w<=430});
    await send('Page.navigate',{url:URL});
    for(let i=0;i<80;i++){ if(await evaluate('!!document.querySelector("#root > *")')) break; await sleep(250); }
    await sleep(800);
    await evaluate(`(()=>{const t=[...document.querySelectorAll('button,a,[role=button]')].find(e=>e.textContent.trim().toLowerCase()==='about'); t&&t.click();})()`);
    await sleep(2400);
    const R=await evaluate(`(()=>{
      const txt=document.body.innerText;
      /* the four TILE labels, not the words themselves: "After Effects" and "Blender" also
         appear in Work's project descriptions, so this page is the only place to test. */
      const tiles=['Three.js','After Effects','Front end','Blender','React'].filter(s=>txt.includes(s));
      const col=document.querySelector('.ss-about-text-column');
      const p=[...document.querySelectorAll('.ss-about-page p')];
      return { bento: !!document.querySelector('.ss-bento'),
               tiles,
               paras: p.length,
               bay: /in the Bay Area/.test(txt),
               lego: /LEGO world running in this browser/.test(txt),
               h2: (document.querySelector('.ss-about-page h2')||{}).textContent||'',
               photo: !!document.querySelector('.ss-about-photo'),
               colOver: col? Math.max(0, col.scrollHeight - col.clientHeight) : -1,
               docOver: document.documentElement.scrollWidth - innerWidth };
    })()`);
    console.log(`${w}x${h}`);
    ok(R.bento===false, 'no .ss-bento element');
    ok(R.tiles.length===0, 'none of the tile labels in the text (found: '+JSON.stringify(R.tiles)+')');
    ok(R.paras===2, 'both paragraphs still render ('+R.paras+' of 2)');
    ok(R.bay && R.lego, 'the copy itself is untouched');
    ok(/About/i.test(R.h2), 'heading still renders ("'+R.h2+'")');
    ok(R.photo, 'portrait still renders');
    ok(R.colOver===0, 'text column does not overflow its own box ('+R.colOver+')');
    ok(R.docOver<=0, 'no sideways scroll ('+R.docOver+')');
  }
  console.log(fail? `\n${fail} FAILED` : '\nall passed');
}, URL);
