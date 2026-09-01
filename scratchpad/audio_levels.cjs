// Renders the Realm's SHIPPED audio graph in a real OfflineAudioContext (headless Chrome) and
// reports MEAN POWER for each layer. No GPU and no audio hardware needed.
// The levels are pulled OUT OF lego.html by content (scratchpad/audio_cfg.json, written by
// audio_cfg.py) so this can never grade a set of numbers the file does not actually ship.
const {main}=require('./cdp.cjs');
const NEW=require('./audio_cfg.json');
// what shipped before 2026-09-01, for the side by side
const OLD={master:0.65,sfx:1,windLP:420,windQ:0.7,windG:0.055,windHP:150,
  wA:[0.043,0.030,0.140], wB:[0.017,0.028], riv:[0.185,0.130,0.072],
  leaf:[2400,1.6,0.012,0.067,0.008,0.024]};

const PAGE = C => `(async ()=>{
  const C=${JSON.stringify(C)};
  const FS=48000, SEC=12;
  function noiseBufFor(ctx,sec,seed){ const n=Math.floor(ctx.sampleRate*sec);
    const b=ctx.createBuffer(1,n,ctx.sampleRate); const d=b.getChannelData(0);
    let s=seed||12345; for(let i=0;i<n;i++){ s=(s*1664525+1013904223)>>>0; d[i]=(s/2147483648)-1; }
    return b; }
  function noiseLoop(ctx,loopBuf,type,freq,q,gain,dest,hp){
    const src=ctx.createBufferSource(); src.buffer=loopBuf; src.loop=true;
    const f=ctx.createBiquadFilter(); f.type=type; f.frequency.value=freq; if(q!=null) f.Q.value=q;
    const g=ctx.createGain(); g.gain.value=gain;
    let tail=src.connect(f);
    if(hp){ const h=ctx.createBiquadFilter(); h.type='highpass'; h.frequency.value=hp; h.Q.value=0.7; tail=tail.connect(h); }
    tail.connect(g).connect(dest); src.start(); return {src,filter:f,gain:g}; }
  function lfoAdd(ctx,rate,depth,target){ const o=ctx.createOscillator(); o.frequency.value=rate;
    const g=ctx.createGain(); g.gain.value=depth; o.connect(g).connect(target); o.start(); return o; }
  function lfo(ctx,rate,lo,hi,target){ target.value=(hi+lo)/2; return lfoAdd(ctx,rate,(hi-lo)/2,target); }
  const meanPower = buf => { const d=buf.getChannelData(0); let s=0;
    for(let i=0;i<d.length;i++) s+=d[i]*d[i]; return s/d.length; };
  const peak = buf => { const d=buf.getChannelData(0); let m=0;
    for(let i=0;i<d.length;i++) m=Math.max(m,Math.abs(d[i])); return m; };

  async function render(build, sec){
    const ctx=new OfflineAudioContext(1, FS*sec, FS);
    const loopBuf=noiseBufFor(ctx,2.0,12345), noiseBuf=noiseBufFor(ctx,0.12,999);
    const master=ctx.createGain(); master.gain.value=C.master; master.connect(ctx.destination);
    const ambBus=ctx.createGain(); ambBus.gain.value=1; ambBus.connect(master);
    const sfxBus=ctx.createGain(); sfxBus.gain.value=C.sfx; sfxBus.connect(master);
    build({ctx,loopBuf,noiseBuf,ambBus,sfxBus});
    return await ctx.startRendering();
  }

  const buildWind = ({ctx,loopBuf,ambBus}) => {
    const wind=noiseLoop(ctx,loopBuf,'lowpass',C.windLP,C.windQ,C.windG,ambBus,C.windHP);
    lfo(ctx,C.wA[0],C.wA[1],C.wA[2],wind.gain.gain); lfoAdd(ctx,C.wB[0],C.wB[1],wind.gain.gain);
    lfo(ctx,0.031,260,620,wind.filter.frequency);
  };
  const buildLeaves = ({ctx,loopBuf,ambBus}) => {
    const l=noiseLoop(ctx,loopBuf,'bandpass',C.leaf[0],C.leaf[1],C.leaf[2],ambBus);
    lfo(ctx,C.leaf[3],C.leaf[4],C.leaf[5],l.gain.gain);
  };
  const buildRiver = v => ({ctx,loopBuf,ambBus}) => {
    const rSwell=ctx.createGain(); rSwell.gain.value=1; rSwell.connect(ambBus);
    lfo(ctx,0.09,0.78,1.0,rSwell.gain);
    const river=noiseLoop(ctx,loopBuf,'lowpass',300,0.8,v*C.riv[0],rSwell);
    const rMid=noiseLoop(ctx,loopBuf,'bandpass',520,2.6,v*C.riv[1],rSwell);
    const rTop=noiseLoop(ctx,loopBuf,'bandpass',1050,3.1,v*C.riv[2],rSwell);
    lfo(ctx,0.074,215,360,river.filter.frequency);
    lfo(ctx,0.096,430,640,rMid.filter.frequency);
    lfo(ctx,0.137,880,1360,rTop.filter.frequency);
    lfoAdd(ctx,0.31,0.16,rSwell.gain);
  };
  const buildStep = surf => ({ctx,noiseBuf,sfxBus}) => {
    const R=()=>0.5;
    const grain=(t,vol,f,q,dur)=>{ const src=ctx.createBufferSource(); src.buffer=noiseBuf;
      const bp=ctx.createBiquadFilter(); bp.type='bandpass'; bp.frequency.value=f; bp.Q.value=q;
      const g=ctx.createGain(); g.gain.setValueAtTime(vol,t); g.gain.exponentialRampToValueAtTime(0.0005,t+dur);
      src.connect(bp).connect(g).connect(sfxBus); src.start(t); src.stop(t+dur+0.02); };
    const t=0, vol=0.15+Math.min(0.1,5*0.015);
    if(surf==='green'){
      grain(t, vol*0.5, 1500+R()*700, 0.7, 0.075);
      grain(t+0.012, vol*0.28, 3400+R()*1200, 0.5, 0.05);
      const o=ctx.createOscillator(); o.type='sine';
      o.frequency.setValueAtTime(150+R()*25,t); o.frequency.exponentialRampToValueAtTime(95,t+0.06);
      const gb=ctx.createGain(); gb.gain.setValueAtTime(vol*0.35,t); gb.gain.exponentialRampToValueAtTime(0.0004,t+0.07);
      o.connect(gb).connect(sfxBus); o.start(t); o.stop(t+0.09);
    } else {
      grain(t, vol*0.85, 2100+R()*600, 1.2, 0.035);
      for(let i=0;i<4;i++) grain(t+0.008+R()*0.05, vol*(0.10+R()*0.22), 2600+R()*2600, 3+R()*4, 0.018+R()*0.022);
      const o=ctx.createOscillator(); o.type='triangle';
      o.frequency.setValueAtTime(235+R()*35,t); o.frequency.exponentialRampToValueAtTime(150,t+0.05);
      const gb=ctx.createGain(); gb.gain.setValueAtTime(vol*0.7,t); gb.gain.exponentialRampToValueAtTime(0.0005,t+0.075);
      o.connect(gb).connect(sfxBus); o.start(t); o.stop(t+0.09);
    }
  };
  // BIRDSONG, on the ambience bus at the level audioFrame passes in daylight
  const buildBird = ({ctx,ambBus}) => {
    const out=ctx.createGain(); out.gain.value=0.030; out.connect(ambBus);
    const base=3000, n=4;
    for(let i=0;i<n;i++){ const t=i*0.115, d=0.08;
      const o=ctx.createOscillator(); o.type='sine';
      const f=base*(1+i*0.06);
      o.frequency.setValueAtTime(f,t); o.frequency.exponentialRampToValueAtTime(f*1.5,t+d);
      const g=ctx.createGain(); g.gain.setValueAtTime(0.0004,t);
      g.gain.exponentialRampToValueAtTime(1,t+0.012); g.gain.exponentialRampToValueAtTime(0.0004,t+d);
      o.connect(g).connect(out); o.start(t); o.stop(t+d+0.02); }
  };

  const out={};
  for(const [k,b] of [['wind',buildWind],['leaves',buildLeaves]]){
    const r=await render(b,SEC); out[k]={mean:meanPower(r),peak:peak(r)}; }
  const fall=(d,near,far)=>d<=near?1:d>=far?0:(1-(d-near)/(far-near));
  for(const d of [2.5,6,10,15,20,25]){ const v=Math.pow(fall(d,2.5,30),0.75);
    const r=await render(buildRiver(v),SEC); out['river@'+d]={mean:meanPower(r),peak:peak(r)}; }
  for(const s of ['green','grey']){ const r=await render(buildStep(s),0.12);
    const d=r.getChannelData(0); let sum=0; const n=Math.floor(FS*0.09);
    for(let i=0;i<n;i++) sum+=d[i]*d[i];
    out['step_'+s]={mean:sum/n,peak:peak(r)}; }
  { const r=await render(buildBird,0.6); const d=r.getChannelData(0); let sum=0; const n=Math.floor(FS*0.47);
    for(let i=0;i<n;i++) sum+=d[i]*d[i]; out.bird={mean:sum/n,peak:peak(r)}; }
  return out;
})()`;

main(async ({evaluate})=>{
  const a=await evaluate(PAGE(OLD),true);
  const b=await evaluate(PAGE(NEW),true);
  const e=x=>x.toExponential(2);
  console.log('\nMEAN POWER at the destination, and each layer against the WIND BED.');
  console.log('OLD = what shipped before 2026-09-01.  NEW = what lego.html carries now.\n');
  console.log('  layer          OLD mean    x wind    NEW mean    x wind     absolute move');
  for(const k of Object.keys(a)){
    const dB = 10*Math.log10(b[k].mean/a[k].mean);
    console.log('  '+k.padEnd(13),
      e(a[k].mean).padStart(9), (a[k].mean/a.wind.mean).toFixed(2).padStart(7)+'x',
      e(b[k].mean).padStart(11), (b[k].mean/b.wind.mean).toFixed(2).padStart(7)+'x',
      (dB>=0?'+':'')+dB.toFixed(1)+' dB');
  }
  const pk = o => Math.max(...Object.values(o).map(x=>x.peak));
  console.log('\n  loudest peak sample  OLD '+pk(a).toFixed(3)+'   NEW '+pk(b).toFixed(3)+'   (1.000 clips)');
}, 'about:blank');
