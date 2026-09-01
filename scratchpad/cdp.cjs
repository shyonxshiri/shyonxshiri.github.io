// Minimal CDP driver: launch headless Chrome with SwiftShader, attach, evaluate.
const {spawn}=require('child_process');
const CHROME='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const PORT=9333;

function sleep(ms){ return new Promise(r=>setTimeout(r,ms)); }

async function launch(){
  const p=spawn(CHROME,[
    '--headless=new','--remote-debugging-port='+PORT,
    '--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader',
    '--enable-webgl','--ignore-gpu-blocklist','--window-size=1280,800',
    '--no-first-run','--no-default-browser-check','--disable-dev-shm-usage',
    '--user-data-dir=/tmp/cdp-profile-'+PORT,'about:blank'
  ],{stdio:['ignore','pipe','pipe']});
  p.stderr.on('data',d=>{ const s=d.toString(); if(/ERROR|FATAL/.test(s)) process.stderr.write('[chrome] '+s); });
  for(let i=0;i<60;i++){ try{ const r=await fetch('http://127.0.0.1:'+PORT+'/json/version'); if(r.ok) return {proc:p, ver:await r.json()}; }catch(_){} await sleep(250); }
  throw new Error('chrome did not come up');
}

class CDP{
  constructor(ws){ this.ws=ws; this.id=0; this.pend=new Map(); this.evs=[];
    ws.addEventListener('message',ev=>{ const m=JSON.parse(ev.data);
      if(m.id&&this.pend.has(m.id)){ const {res,rej}=this.pend.get(m.id); this.pend.delete(m.id);
        m.error?rej(new Error(JSON.stringify(m.error))):res(m.result); }
      else this.evs.push(m); }); }
  send(method,params,sessionId){ const id=++this.id;
    return new Promise((res,rej)=>{ this.pend.set(id,{res,rej});
      this.ws.send(JSON.stringify({id,method,params:params||{},sessionId})); }); }
}

async function connect(url){ const ws=new WebSocket(url);
  await new Promise((r,j)=>{ ws.addEventListener('open',r); ws.addEventListener('error',j); });
  return new CDP(ws); }

async function main(script, url){
  const {proc,ver}=await launch();
  const b=await connect(ver.webSocketDebuggerUrl);
  const {targetId}=await b.send('Target.createTarget',{url:'about:blank'});
  const {sessionId}=await b.send('Target.attachToTarget',{targetId,flatten:true});
  const S=sessionId;
  await b.send('Runtime.enable',{},S);
  await b.send('Log.enable',{},S);
  const logs=[];
  b.evs.push=function(m){ Array.prototype.push.call(this,m);
    if(m.method==='Runtime.consoleAPICalled'){ const a=(m.params.args||[]).map(x=>x.value!==undefined?x.value:(x.description||'')); logs.push(m.params.type+': '+a.join(' ')); }
    if(m.method==='Runtime.exceptionThrown'){ logs.push('EXCEPTION: '+(m.params.exceptionDetails.exception&&m.params.exceptionDetails.exception.description||m.params.exceptionDetails.text)); }
  };
  await b.send('Page.enable',{},S);
  await b.send('Page.navigate',{url},S);
  const evaluate=async(expr,awaitP)=>{
    const r=await b.send('Runtime.evaluate',{expression:expr,returnByValue:true,awaitPromise:!!awaitP,timeout:180000},S);
    if(r.exceptionDetails) throw new Error(r.exceptionDetails.exception&&r.exceptionDetails.exception.description||r.exceptionDetails.text);
    return r.result.value; };
  const send=(m,p)=>b.send(m,p,S);
  try{ await script({evaluate,sleep,logs,send}); }
  finally{ try{proc.kill('SIGKILL');}catch(_){ } }
}
module.exports={main};
