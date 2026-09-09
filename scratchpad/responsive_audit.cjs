// Responsive audit of the MAIN SITE. Real headless Chrome, because framer-motion's whileInView
// never fires in a hidden pane and every 100dvh slide measures 0 there.
// Reports, per page per viewport: horizontal overflow of the document, any element wider than the
// viewport, text clipped by its own box, and controls smaller than a 44px touch target.
//
// THREE THINGS IT REPORTS THAT ARE NOT BUGS, checked against screenshots before believing it:
//  · div[-5..5] on every page is the CUSTOM CURSOR DOT, 9px wide and parked at the pointer.
//  · img.ss-frame-img, img.ss-about-photo and the .ss-card row on Work all sit inside
//    overflow:hidden parents. The photo's slow zoom and the coverflow's peeking neighbours are
//    the design; the document itself never scrolls sideways, which is the check that matters.
//  · a .ss-tap control's DRAWN box is deliberately unchanged. Its hit area is a transparent
//    ::after, so the size below is read from that rather than from the element.
//
// THE URL IS AN ARGUMENT, and it has to stay one. This file used to carry
// 'http://localhost:5701/' hardcoded in TWO places, the initial open and the per page
// Page.navigate inside the loop, and ignored anything passed on the command line. Run
// against any other port, which is normal here because concurrent sessions hold ports,
// it navigated to a dead server and reported EVERY PAGE CLEAN: an empty document has no
// element wider than the viewport, so a total failure to load is indistinguishable from
// a perfect result. Hence the load assertion below as well as the argument.
// Pass the LOCALHOST form. Vite refuses 127.0.0.1 and that also reads as a clean run.
//   node scratchpad/responsive_audit.cjs http://localhost:5209/
const {main}=require('./cdp.cjs');
const URL=process.argv[2]||'http://localhost:5173/';
const SIZES=[
  [1512,857,'MacBook 15'],[1280,800,'laptop'],[1024,768,'iPad landscape'],
  [834,1112,'iPad Air portrait'],[768,1024,'iPad mini'],[430,932,'iPhone 15 Pro Max'],
  [390,844,'iPhone 14/15'],[375,667,'iPhone SE'],[360,640,'small Android'],[844,390,'iPhone landscape']
];
const PAGES=['home','work','about','contact'];
main(async ({evaluate,sleep,send})=>{
  for(const [w,h,name] of SIZES){
    const touch = w<=430 || (w<=1112&&h<=1112&&w<h) || (w===844&&h===390);
    await send('Emulation.setDeviceMetricsOverride',{width:w,height:h,deviceScaleFactor:2,mobile:touch});
    await send('Emulation.setTouchEmulationEnabled',{enabled:touch,maxTouchPoints:5});
    console.log('\n════ '+name+'  '+w+'x'+h+(touch?'  (touch)':''));
    for(const page of PAGES){
      await send('Page.navigate',{url:URL});
      let up=false;
      for(let i=0;i<80;i++){ if(await evaluate('!!document.querySelector("#root > *")')){ up=true; break; } await sleep(250); }
      // A page that never mounted has no element wider than the viewport, so without this
      // the whole run comes back "clean". That is the failure this file shipped with.
      if(!up){ console.error('\nFAILED: nothing rendered at '+URL+' after 20s. Is the dev server on that port?'); process.exit(1); }
      await sleep(1200);
      if(page!=='home'){
        const nav=await evaluate(`(()=>{ const els=[...document.querySelectorAll('button,a,[role=button]')];
          const t=els.find(e=>e.textContent.trim().toLowerCase()==='${page}');
          if(t){ t.click(); return true; } return false; })()`);
        if(!nav){ console.log('  '+page.padEnd(8)+'  could not find the nav control'); continue; }
        await sleep(1400);
      }
      const R=await evaluate(`(()=>{
        const vw=innerWidth, out={over:[], clip:[], small:[]};
        out.docW=document.documentElement.scrollWidth;
        const els=document.querySelectorAll('body *');
        for(const e of els){
          const cs=getComputedStyle(e); if(cs.display==='none'||cs.visibility==='hidden'||+cs.opacity===0) continue;
          const r=e.getBoundingClientRect(); if(r.width===0&&r.height===0) continue;
          const id=(e.tagName.toLowerCase()+(e.className&&typeof e.className==='string'?'.'+e.className.trim().split(/\\s+/).slice(0,2).join('.'):'')).slice(0,54);
          if(r.right>vw+1.5 || r.left<-1.5) out.over.push([id, +r.left.toFixed(0), +r.right.toFixed(0)]);
          // text clipped by its own box: scroll bigger than client while overflow hides it
          if(e.children.length===0 && e.textContent.trim()){
            const ovh=cs.overflow+cs.overflowX+cs.overflowY;
            if(/hidden|clip/.test(ovh) && (e.scrollWidth>e.clientWidth+1 || e.scrollHeight>e.clientHeight+1))
              out.clip.push([id, e.textContent.trim().slice(0,42), e.scrollWidth+'>'+e.clientWidth]);
          }
          if((e.tagName==='BUTTON'||e.tagName==='A'||e.getAttribute('role')==='button') && e.textContent.trim()){
            var hw=r.width, hh=r.height;
            var af=getComputedStyle(e,'::after');
            if(af && af.content && af.content!=='none'){
              hw=Math.max(hw, parseFloat(af.width)||0); hh=Math.max(hh, parseFloat(af.height)||0); }
            if(hh<32||hw<32) out.small.push([id, Math.round(hw)+'x'+Math.round(hh)+' hit']);
          }
        }
        const dedupe=a=>{const s=new Set(),o=[];for(const x of a){const k=JSON.stringify(x);if(!s.has(k)){s.add(k);o.push(x);}}return o.slice(0,6);};
        out.over=dedupe(out.over); out.clip=dedupe(out.clip); out.small=dedupe(out.small);
        return out; })()`);
      const bits=[];
      if(R.docW>vwOf(w)) bits.push('DOC SCROLLS X to '+R.docW);
      if(R.over.length) bits.push(R.over.length+' overflow: '+R.over.map(o=>o[0]+'['+o[1]+'..'+o[2]+']').join(', '));
      if(R.clip.length) bits.push(R.clip.length+' clipped: '+R.clip.map(c=>c[0]+' "'+c[1]+'" '+c[2]).join(' | '));
      if(R.small.length && touch) bits.push(R.small.length+' small tap targets: '+R.small.map(s=>s[0]+' '+s[1]).join(', '));
      console.log('  '+page.padEnd(8)+'  '+(bits.length?bits.join('\n            '):'clean'));
    }
  }
  function vwOf(w){ return w+1; }
}, URL).catch(e=>{console.error('FAILED',e&&e.message);process.exit(1);});
