  let drag=false,lx=0,ly=0,mdrag=false,mMoved=0,dragPid=null,lockPending=false,reanchor=false;
  const pt=e=>{const t=(e.touches&&e.touches[0])||e;return{x:t.clientX,y:t.clientY};};
  const looking=()=>document.pointerLockElement===canvas;
  const grabLock=()=>{ if(!canvas.requestPointerLock||looking()) return; lockPending=true;
    try{ const r=canvas.requestPointerLock(); if(r&&r.catch) r.catch(()=>{lockPending=false;}); }
    catch(_){ lockPending=false; } };
  const startLook=e=>{ const p=pt(e); lx=p.x; ly=p.y; reanchor=false;
    if(mode==='hub') drag=true; else if(mode==='menu'&&!viewerOpen){ mdrag=true; mMoved=0; } };
  const endLook=()=>{ drag=false; mdrag=false; lockPending=false;
    if(dragPid!==null){ const id=dragPid; dragPid=null; try{ canvas.releasePointerCapture(id); }catch(_){} }
    if(looking()&&document.exitPointerLock) document.exitPointerLock(); };
  document.addEventListener('pointerlockchange',()=>{ lockPending=false; reanchor=true; });
  document.addEventListener('pointerlockerror',()=>{ lockPending=false; });
  // Pointer events drive the drag. mousedown is kept for its preventDefault, and arms the drag
  // only on a browser too old to have them (nothing that can run this Realm is, but a camera that
  // never moves at all is the worst possible failure, so the fallback costs one flag).
  const HAS_PE = !!window.PointerEvent;
  canvas.addEventListener('mousedown',e=>{ e.preventDefault(); if(!HAS_PE){ startLook(e); initAudio(); } });
  canvas.addEventListener('dragstart',e=>e.preventDefault());
  canvas.addEventListener('contextmenu',e=>e.preventDefault());
  canvas.addEventListener('pointerdown',e=>{ if(e.pointerType==='touch') return;   // touch runs its own look-drag below, keyed on lookId
    startLook(e);
    try{ canvas.setPointerCapture(e.pointerId); dragPid=e.pointerId; }catch(_){}
    if(drag) grabLock();   // hub only, and pointerdown is the user gesture a lock has to be asked for on
    initAudio(); });       // last, so nothing about starting the audio context can stop a drag arming
  addEventListener('pointermove',e=>{ if(e.pointerType==='touch') return; const p=pt(e); const lk=looking();
    if(!lk && reanchor){ lx=p.x; ly=p.y; reanchor=false; return; }   // first move after a lock ends: re-seat, never pan
    if(!lk && (drag||mdrag) && e.buttons===0){ endLook(); lx=p.x; ly=p.y; return; }
    const dx = lk ? (e.movementX||0) : (p.x-lx), dy = lk ? (e.movementY||0) : (p.y-ly);
    if(mdrag&&mode==='menu'){ mMoved+=Math.abs(dx); menuPan=clampPan(menuPan-dx*0.011); lx=p.x; ly=p.y; return; }
    // The anchor is kept current even on the frames the camera is NOT being driven. Returning
    // without it leaves lx/ly wherever the pointer was when a fade or a scripted camera move
    // began, and the drag that resumes afterwards snaps by the whole distance travelled since.
    if(!drag||mode!=='hub'||fading||camAnim){ lx=p.x; ly=p.y; return; }
    camYaw-=dx*SENS; camPitch=clampPitch(camPitch+dy*pitchSens()); lx=p.x; ly=p.y; });
  addEventListener('pointerup',e=>{ if(e.pointerType!=='touch') endLook(); });
  addEventListener('pointercancel',e=>{ if(e.pointerType!=='touch') endLook(); });
  canvas.addEventListener('lostpointercapture',e=>{ if(dragPid!==e.pointerId) return; dragPid=null;
    if(looking()||lockPending) return;   // the lock took the gesture over; the drag lives on
    drag=false; mdrag=false; });
  addEventListener('mouseup',()=>{ if(!HAS_PE) endLook(); });
  addEventListener('blur',()=>{ if(dragPid===null){ drag=false; mdrag=false; } });