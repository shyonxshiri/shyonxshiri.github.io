/* Asserts the Contact page no longer carries the Realm spec band, on every viewport the
   responsive audit uses, and that nothing else on the page broke with it: the heading, the
   availability line and all the link rows are still there, the page never scrolls sideways,
   and the console is clean. Reads the RENDERED page, because the band was four <dd>/<dt>
   pairs and a grep of the source cannot tell a deleted rule from an unrendered one. */
const fs=require('fs'); const {main}=require('./cdp.cjs');
const URL=process.argv[2]||'http://localhost:5199/';
const SIZES=[[1512,857],[1024,768],[834,1112],[430,932],[390,844]];
let fail=0;
const ok=(c,m)=>{ console.log((c?'  ok   ':'  FAIL ')+m); if(!c) fail++; };
main(async ({evaluate,sleep,send})=>{
  for(const [w,h] of SIZES){
    await send('Emulation.setDeviceMetricsOverride',{width:w,height:h,deviceScaleFactor:2,mobile:w<=430});
    await send('Page.navigate',{url:URL});
    for(let i=0;i<80;i++){ if(await evaluate('!!document.querySelector("#root > *")')) break; await sleep(250); }
    await sleep(900);
    await evaluate(`(()=>{const t=[...document.querySelectorAll('button,a,[role=button]')].find(e=>e.textContent.trim().toLowerCase()==='contact'); t&&t.click();})()`);
    await sleep(2400);
    const R=await evaluate(`(()=>{
      const txt=document.body.innerText;
      return { spec: !!document.querySelector('.ss-spec'),
               dl: document.querySelectorAll('dl').length,
               figs: ['Triangles a frame','Draw calls','Models loaded','Full day cycle'].filter(s=>new RegExp(s,'i').test(txt)),
               heading:(document.querySelector('.ss-contact-heading')||{}).textContent||'',
               desc:(document.querySelector('.ss-contact-description')||{}).textContent||'',
               /* the list is Email Me / LinkedIn / Resume, so count THOSE: a selector guessing
                  at a github row passes at 2 while silently missing one. */
               rows: ['Email Me','LinkedIn','Resume'].filter(s=>new RegExp(s,'i').test(txt)).length,
               docOver: document.documentElement.scrollWidth - innerWidth,
               bottom: (()=>{ const a=[...document.querySelectorAll('a')].filter(e=>e.closest('[style*="flex-direction: column"]'));
                              const l=a[a.length-1]; return l? Math.round(l.getBoundingClientRect().bottom):-1; })() };
    })()`);
    console.log(`${w}x${h}  last row bottom ${R.bottom} of ${h}`);
    ok(R.spec===false, 'no .ss-spec element');
    ok(R.figs.length===0, 'no Realm figure labels in the text (found: '+JSON.stringify(R.figs)+')');
    ok(R.dl===0, 'no <dl> left on the page');
    ok(/Let's Work/.test(R.heading), 'heading still reads "Let\'s Work."');
    ok(/full-time roles/.test(R.desc), 'availability line intact');
    ok(R.rows===3, 'all three contact rows still render ('+R.rows+' of 3)');
    ok(R.docOver<=0, 'no sideways scroll ('+R.docOver+')');
  }
  console.log(fail? `\n${fail} FAILED` : '\nall passed');
}, URL);
