/* Does the Realm's asset viewer still cut the bottom off a long caption?
   #viewer .card is a flex ITEM in a column flex container. Before the fix it had no
   max-height and flex-shrink:1, so a short window did not make it overflow, it made it
   SHRINK below its content and clip the caption under overflow:hidden, silently.
   The fix is flex-shrink:0 (keep the real height, let the VIEWER scroll) plus
   `justify-content:safe center`, without which an overflowing flex item spills both ways
   and its TOP becomes unreachable: that would swap a clipped bottom for a lost top.
   This pulls the REAL rules out of public/lego.html and drives both versions, so it
   tests what ships rather than a copy of it.
   Usage: node scratchpad/capfit.cjs */
const {main}=require('./cdp.cjs');
const fs=require('fs'), path=require('path');
const OUT=path.join(require('os').tmpdir(),'capfit.html');
const src=fs.readFileSync(path.join(__dirname,'..','public','lego.html'),'utf8');

// the shipped #viewer block, located by content so a line-number drift cannot break it
const a=src.indexOf('#viewer{position:fixed');
const b=src.indexOf('#viewer .x{');
if(a<0||b<0) throw new Error('could not locate the #viewer rules');
const CSS_NEW=src.slice(a, b).replace(/^\s*\/\*[\s\S]*?\*\/\s*$/gm,'');
// the same rules as they were before the fix
const CSS_OLD=CSS_NEW
  .replace('justify-content:safe center;','')
  .replace('overflow-y:auto;','')
  .replace('flex-shrink:0;','');

const DESC="I'm a graphic designer and developer in the Bay Area, with a BA in Graphic Design from San Jose State, 2025. I take a project from identity through to a deployed site, so design, front end, and deployment are one job rather than three handoffs. I also evaluate multimodal AI systems against rubrics, writing the corrected ground truth where models fail.";

const page=(css)=>`<!doctype html><html><head><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fredoka:wght@400;600&family=Nunito:wght@400;500;800&display=swap">
<style>*{margin:0;padding:0;box-sizing:border-box}html,body{height:100%}body{font-family:'Nunito',sans-serif;background:#0b0e14}
${css}
#viewer{display:flex}</style></head><body>
<div id="viewer" class="on"><div class="card"><div class="mwrap"><div class="media"></div></div>
<div class="cap"><div>About &middot; About Me</div><div class="s" style="display:none"></div><div class="d" id="d">${DESC}</div></div></div></div>
</body></html>`;

const PROBE=`(()=>{
  const v=document.getElementById('viewer'), c=v.querySelector('.card'), d=document.getElementById('d');
  const nat=c.scrollHeight;
  v.scrollTop=0;
  const topGap=Math.round(c.getBoundingClientRect().top - v.getBoundingClientRect().top);
  v.scrollTop=v.scrollHeight;
  const botGap=Math.round(v.getBoundingClientRect().bottom - c.getBoundingClientRect().bottom);
  v.scrollTop=0;
  const cr=c.getBoundingClientRect(), dr=d.getBoundingClientRect();
  return JSON.stringify({
    cardH:Math.round(cr.height),
    shrunk:Math.round(nat-cr.height),
    clipped:Math.max(0, Math.round(dr.bottom-cr.bottom)),
    topReach:topGap, botReach:botGap,
    scrolls:v.scrollHeight>v.clientHeight, vh:innerHeight });
})()`;

main(async ({evaluate, sleep, send})=>{
  let pass=0, fail=0;
  const ok=(c,m)=>{ c?(pass++,console.log('    ok   '+m)):(fail++,console.log('    FAIL '+m)); };
  for(const [label,css] of [['BEFORE (shipped rules minus the fix)',CSS_OLD],['AFTER  (the shipped rules)',CSS_NEW]]){
    fs.writeFileSync(OUT, page(css));
    await send('Page.navigate',{url:'file://'+OUT});
    await sleep(1500);
    await evaluate('document.fonts.ready.then(()=>1)', true);
    console.log('\n'+label);
    for(const h of [1000, 760, 700, 660]){
      await send('Emulation.setDeviceMetricsOverride',{width:1280,height:h,deviceScaleFactor:1,mobile:false});
      await sleep(350);
      const r=JSON.parse(await evaluate(PROBE));
      console.log('  viewport '+String(h).padEnd(5)+' card '+String(r.cardH).padEnd(4)
        +' shrunk-by '+String(r.shrunk).padEnd(4)+' caption-cut '+String(r.clipped).padEnd(4)
        +(r.scrolls?' scrolls':' fits'));
      if(label.startsWith('AFTER')){
        ok(r.clipped===0, h+'px: no caption is cut off');
        ok(r.shrunk<=0,   h+'px: the card keeps its real height');
        ok(r.topReach>=0, h+'px: the top of the card is reachable (gap '+r.topReach+')');
        ok(r.botReach>=0, h+'px: the bottom of the card is reachable (gap '+r.botReach+')');
        if(h===1000) ok(!r.scrolls, h+'px: still fits with no scrollbar, so tall windows are unchanged');
      }
    }
  }
  console.log('\n'+pass+' passed, '+fail+' failed');
  process.exitCode=fail?1:0;
}, 'about:blank');
