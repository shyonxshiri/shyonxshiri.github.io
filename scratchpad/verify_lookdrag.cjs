// Replays the SHIPPED look-drag block (extracted from public/lego.html by content, not by line
// number) against the gestures that freeze a pan. No WebGL, no three.js: this is the input state
// machine alone, which is all these fixes touch.
//
// The headline case is 1: steering on clientX, a pan is bounded by the physical screen, and the
// camera stops dead while the hand is still moving. Everything else guards a gesture being taken
// away from the page.
const fs=require('fs'), vm=require('vm');
const SHIPPED=fs.readFileSync(__dirname+'/shipped_drag.js','utf8');
const SCREEN=1512;                       // a 1512-wide window; the cursor cannot leave it

function makeWorld(opt){
  opt=opt||{};
  const W={ handlers:{}, canvasHandlers:{}, docHandlers:{}, captured:null, prevented:[], pending:[],
            lockRequests:0, autoGrant:opt.autoGrant!==false };
  const canvas={
    addEventListener:(t,f)=>{ (W.canvasHandlers[t]=W.canvasHandlers[t]||[]).push(f); },
    setPointerCapture:id=>{ W.captured=id; },
    releasePointerCapture:id=>{ if(W.captured!==id) throw new Error('not captured'); W.captured=null;
      W.pending.push(['canvas','lostpointercapture',{pointerId:id}]); },
    requestPointerLock:()=>{ W.lockRequests++;
      if(W.autoGrant){ W.doc.pointerLockElement=canvas; W.pending.push(['doc','pointerlockchange',{}]); }
      else W.pending.push(['doc','pointerlockerror',{}]);
      return undefined; },   // the old, non-promise form
  };
  const doc={ pointerLockElement:null,
    addEventListener:(t,f)=>{ (W.docHandlers[t]=W.docHandlers[t]||[]).push(f); },
    exitPointerLock:()=>{ doc.pointerLockElement=null; W.pending.push(['doc','pointerlockchange',{}]); } };
  W.doc=doc;
  const env={
    canvas, document:doc, window:{PointerEvent:opt.noPE?undefined:function(){}},
    addEventListener:(t,f)=>{ (W.handlers[t]=W.handlers[t]||[]).push(f); },
    mode:'hub', viewerOpen:false, fading:false, camAnim:null,
    camYaw:0, camPitch:0.24, menuPan:0, SENS:0.0065, flying:false, audioStarted:false,
    clampPan:v=>Math.max(-5,Math.min(5,v)),
    clampPitch:v=>Math.max(env.flying?-0.85:0.06, Math.min(1.2,v)),
    pitchSens:()=>env.SENS*(env.flying?1.8:1),
    initAudio:()=>{ env.audioStarted=true; }, Math, console,
  };
  // A real shared context, so the block's assignments to camYaw/menuPan land on env and later
  // changes to env.mode are seen by it.
  const ctx=vm.createContext(env);
  vm.runInContext(SHIPPED, ctx, {filename:'shipped_drag.js'});
  W.state=vm.runInContext('({get drag(){return drag},get mdrag(){return mdrag},get dragPid(){return dragPid},'
    +'get lockPending(){return lockPending},get reanchor(){return reanchor},get mMoved(){return mMoved}})', ctx);
  W.env=env; W.canvas=canvas;
  const run=(where,type,ev)=>{
    const bag = where==='canvas'?W.canvasHandlers : where==='doc'?W.docHandlers : W.handlers;
    for(const f of (bag[type]||[])) f(ev);
  };
  W.fire=(where,type,ev)=>{
    ev=Object.assign({type,preventDefault(){W.prevented.push(type);},pointerType:'mouse',buttons:1,
                      clientX:0,clientY:0,movementX:0,movementY:0},ev);
    const n=((where==='canvas'?W.canvasHandlers:where==='doc'?W.docHandlers:W.handlers)[type]||[]).length;
    run(where,type,ev);
    while(W.pending.length){ const [w,t,e]=W.pending.shift(); run(w,t,Object.assign({type:t,preventDefault(){}},e)); }
    return n;
  };
  // THE HAND moves by dx; the CURSOR follows it but cannot leave the screen. movementX always
  // carries the true hand movement, clientX carries where the cursor actually ended up. That gap
  // is the whole bug.
  W.cursor=756;
  W.hand=(dx,dy)=>{ const want=W.cursor+dx, got=Math.max(0,Math.min(SCREEN-1,want)); W.cursor=got;
    return W.fire('window','pointermove',{clientX:got,clientY:400,movementX:dx,movementY:dy||0}); };
  return W;
}

let fails=0;
const ok=(n,c,x)=>{ if(!c){fails++;console.log('  FAIL  '+n+(x?'  '+x:''));} else console.log('  pass  '+n+(x?'  '+x:'')); };
const DEG=r=>(r*180/Math.PI).toFixed(0)+'deg';

console.log('\n1. THE BUG: a long pan runs the cursor into the edge of the screen');
console.log('   (the hand keeps moving right in 40 steps of 60px = 2400px of real travel)');
{ // first, what the OLD clientX-only steering could do: the lock is refused, so the shipped code
  // falls back to exactly the path that shipped before.
  const W=makeWorld({autoGrant:false});
  W.fire('canvas','pointerdown',{pointerId:7,clientX:756,clientY:400});
  for(let i=0;i<40;i++) W.hand(60);
  const bounded=Math.abs(W.env.camYaw);
  ok('with no lock the pan is bounded by the screen', bounded<5.0, 'turned '+DEG(bounded)+' and then stopped');
  ok('cursor is pinned against the bezel', W.cursor===SCREEN-1, 'clientX='+W.cursor);

  const V=makeWorld();          // and with the lock granted, same hand movement
  V.fire('canvas','pointerdown',{pointerId:7,clientX:756,clientY:400});
  ok('lock was requested on pointerdown', V.lockRequests===1);
  ok('lock is held', V.doc.pointerLockElement===V.canvas);
  for(let i=0;i<40;i++) V.hand(60);
  const free=Math.abs(V.env.camYaw);
  ok('locked, the pan is unbounded', Math.abs(free-2400*0.0065)<1e-9, 'turned '+DEG(free)+' from the same hand movement');
  ok('and it is '+ (free/bounded).toFixed(1)+'x further than the screen allowed', free>bounded*3);
  V.fire('window','pointerup',{pointerId:7,buttons:0});
  ok('lock handed straight back on release', V.doc.pointerLockElement===null);
}

console.log('\n2. the lock must not eat the drag when it engages');
{ const W=makeWorld();
  W.fire('canvas','pointerdown',{pointerId:7,clientX:100,clientY:100});
  W.canvas.releasePointerCapture(7); W.fire('canvas','lostpointercapture',{pointerId:7});
  ok('drag survives losing the capture to the lock', W.state.drag===true);
  W.hand(50);
  ok('and still pans', Math.abs(W.env.camYaw-(-50*0.0065))<1e-9, 'camYaw='+W.env.camYaw.toFixed(4));
}

console.log('\n3. the lock ending mid-drag must not snap the camera');
{ const W=makeWorld();
  W.fire('canvas','pointerdown',{pointerId:7,clientX:100,clientY:400});
  W.hand(40); const before=W.env.camYaw;
  W.doc.exitPointerLock(); W.fire('doc','pointerlockchange',{});      // Esc, say
  ok('re-anchor is armed', W.state.reanchor===true);
  W.fire('window','pointermove',{clientX:1400,clientY:400,movementX:1300});  // cursor reappears far away
  ok('the jump is absorbed, not panned', W.env.camYaw===before, 'camYaw='+W.env.camYaw.toFixed(4));
  W.fire('window','pointermove',{clientX:1450,clientY:400,movementX:50});
  ok('and clientX steering resumes cleanly', Math.abs(W.env.camYaw-(before-50*0.0065))<1e-9);
}

console.log('\n4. a refused lock falls back to what shipped before');
{ const W=makeWorld({autoGrant:false});
  W.fire('canvas','pointerdown',{pointerId:7,clientX:100,clientY:100});
  ok('lock was asked for and refused', W.lockRequests===1 && W.doc.pointerLockElement===null);
  ok('lockPending cleared by the error', W.state.lockPending===false);
  ok('capture still held as the fallback', W.captured===7);
  W.hand(60);
  ok('camera still pans on clientX', W.env.camYaw!==0);
  W.fire('window','pointerup',{pointerId:7,buttons:0});
  ok('released', W.state.drag===false && W.captured===null);
}

console.log('\n5. the menu never locks: its panels are really clicked');
{ const W=makeWorld(); W.env.mode='menu';
  W.fire('canvas','pointerdown',{pointerId:7,clientX:100,clientY:100});
  ok('mdrag armed, drag not', W.state.mdrag===true && W.state.drag===false);
  ok('no lock requested', W.lockRequests===0 && W.doc.pointerLockElement===null);
  W.fire('window','pointermove',{clientX:150,clientY:100});
  ok('row panned', Math.abs(W.env.menuPan-(-50*0.011))<1e-9, 'menuPan='+W.env.menuPan.toFixed(4));
  ok('camera untouched', W.env.camYaw===0);
  ok('mMoved fed the click test', W.state.mMoved===50);
}

console.log('\n6. the gesture being taken away (the earlier pass, still holding)');
{ let W=makeWorld();
  W.fire('canvas','pointerdown',{pointerId:7,clientX:100,clientY:100});
  ok('contextmenu prevented', W.fire('canvas','contextmenu',{})===1 && W.prevented.includes('contextmenu'));
  W.hand(60); ok('right-click does not stop the pan', W.env.camYaw!==0);

  W=makeWorld(); ok('dragstart prevented', W.fire('canvas','dragstart',{})===1 && W.prevented.includes('dragstart'));
  ok('mousedown prevented', W.fire('canvas','mousedown',{})===1 && W.prevented.includes('mousedown'));

  W=makeWorld();
  W.fire('canvas','pointerdown',{pointerId:7,clientX:100,clientY:100});
  W.fire('window','blur',{});
  ok('blur does not kill a live drag', W.state.drag===true);
  W.hand(60); ok('and it still pans after a blur', W.env.camYaw!==0);

  W=makeWorld({autoGrant:false});     // unlocked, so the buttons backstop is the one in play
  W.fire('canvas','pointerdown',{pointerId:7,clientX:100,clientY:100});
  W.hand(60); const y=W.env.camYaw;
  W.fire('window','pointermove',{clientX:900,clientY:100,buttons:0});
  ok('a release that reached nobody clears the drag', W.state.drag===false);
  ok('without lurching', W.env.camYaw===y);

  W=makeWorld(); W.fire('canvas','pointerdown',{pointerId:7,clientX:100,clientY:100});
  W.fire('window','pointercancel',{pointerId:7});
  ok('pointercancel releases everything', W.state.drag===false && W.captured===null && W.doc.pointerLockElement===null);
}

console.log('\n7. touch is left alone by the mouse path');
{ const W=makeWorld();
  W.fire('canvas','pointerdown',{pointerId:3,pointerType:'touch',clientX:10,clientY:10});
  ok('touch arms nothing and never locks', W.state.drag===false && W.captured===null && W.lockRequests===0);
  W.fire('window','pointermove',{pointerType:'touch',clientX:200,clientY:200,buttons:0});
  ok('touch moves no camera', W.env.camYaw===0);
}

console.log('\n8. a browser with no Pointer Events still looks around');
{ const W=makeWorld({noPE:true});
  W.fire('canvas','mousedown',{clientX:100,clientY:100});
  ok('mousedown fallback arms the drag', W.state.drag===true);
  W.fire('window','pointermove',{clientX:160,clientY:100});
  ok('and it pans', Math.abs(W.env.camYaw-(-60*0.0065))<1e-9);
  W.fire('window','mouseup',{});
  ok('mouseup releases it', W.state.drag===false);
}

console.log('\n9. the anchor stays current under a scripted camera move, and flight opens the pitch');
{ const W=makeWorld();
  W.fire('canvas','pointerdown',{pointerId:7,clientX:100,clientY:400});
  W.env.camAnim={}; W.hand(300); W.hand(300);
  ok('camera did not move during the tween', W.env.camYaw===0);
  W.env.camAnim=null; W.hand(10);
  ok('and resumes without a snap', Math.abs(W.env.camYaw-(-10*0.0065))<1e-9, 'camYaw='+W.env.camYaw.toFixed(4));

  const V=makeWorld(); V.env.flying=true;
  V.fire('canvas','pointerdown',{pointerId:7,clientX:100,clientY:400});
  V.hand(0,-200);
  ok('flight aims above the horizon', V.env.camPitch<0, 'camPitch='+V.env.camPitch.toFixed(4));
  ok('and clamps at PITCH_UP', V.env.camPitch>=-0.85);
}

console.log(fails? '\n'+fails+' FAILED\n' : '\nall assertions passed\n');
process.exit(fails?1:0);
