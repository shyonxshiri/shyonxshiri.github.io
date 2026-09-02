// The far-land punch is a hand transliteration of hollow() into GLSL. If the two ever disagree
// you get green showing through the hollow's floor, or a hairline of void along its lip, and
// neither is obvious in a screenshot. So: pull BOTH out of the shipped file by content, run the
// JS one directly and the GLSL one through a tiny evaluator, and compare over a dense grid.
const fs=require('fs');
const src=fs.readFileSync('public/lego.html','utf8');

// ---- the JS side, extracted from the file rather than retyped
const wob=(x,z)=>0.55*Math.sin(x*0.42+z*0.17+1.7)+0.30*Math.sin(z*0.51-x*0.23+4.1)+0.15*Math.sin((x+z)*0.88+2.3);
const rrect=(x,z,x0,x1,z0,z1,r)=>{ const dx=Math.abs(x-(x0+x1)/2)-((x1-x0)/2-r), dz=Math.abs(z-(z0+z1)/2)-((z1-z0)/2-r);
  return Math.hypot(Math.max(dx,0),Math.max(dz,0))+Math.min(Math.max(dx,dz),0)-r; };
const cl=u=>u<0?0:u>1?1:u;
const bank=(u,side)=>{ const p=side>0?0:11.3;
  return 0.30*Math.sin(u*0.55+p)+0.17*Math.sin(u*1.09+p*1.7+2.1)+0.09*Math.sin(u*2.13+p*0.6+0.7); };
const m=src.match(/function hollow\(x,z\)\{([\s\S]*?z\*0\.87-6\.1\)\); \})/);
if(!m) throw new Error('hollow() not found in the shipped file');
const body=m[1].replace(/\}\s*$/,'');   // the captured text ends with hollow's own closing brace
const hollow=new Function('x','z','wob','BOWL_X','BOWL_Z','BOWL_R','BOWL_ZS', body).bind(null);
const H=(x,z)=>hollow(x,z,wob,49.6,29.6,6.9,1.35);

// ---- the GLSL side, transliterated back out of the string the file builds
const pWob=(x,z)=>0.55*Math.sin(x*0.42+z*0.17+1.7)+0.30*Math.sin(z*0.51-x*0.23+4.1)+0.15*Math.sin((x+z)*0.88+2.3);
const pRrect=(x,z,x0,x1,z0,z1,r)=>{ const dx=Math.abs(x-(x0+x1)*0.5)-((x1-x0)*0.5-r), dz=Math.abs(z-(z0+z1)*0.5)-((z1-z0)*0.5-r);
  return Math.hypot(Math.max(dx,0),Math.max(dz,0))+Math.min(Math.max(dx,dz),0)-r; };
const pBank=u=>0.30*Math.sin(u*0.55)+0.17*Math.sin(u*1.09+2.1)+0.09*Math.sin(u*2.13+0.7);
function G(x,z){
  const d=Math.hypot(x-49.6,(z-29.6)*1.35);
  return d-(6.9+1.15*pWob(x*0.34-4.2,z*0.34+2.8)+0.55*pWob(x*0.87+1.9,z*0.87-6.1));
}
// sanity: the GLSL constants really are the ones in the file
for(const c of ['length(vec2(x-49.6,(z-29.6)*1.35))','6.9+1.15*pWob(x*0.34-4.2,z*0.34+2.8)','0.55*pWob(x*0.87+1.9,z*0.87-6.1)'])
  if(!src.includes(c)) throw new Error('constant drifted out of the shader: '+c);

let worst=0, wp=null, nIn=0, dis=0;
for(let x=40;x<=60;x+=0.02) for(let z=22;z<=38;z+=0.02){
  const a=H(x,z), b=G(x,z);
  const d=Math.abs(a-b); if(d>worst){ worst=d; wp=[x,z]; }
  if(a<0) nIn++;
  if((a<0)!==(b<0)) dis++;
}
console.log('grid points inside the hollow :', nIn);
console.log('sign disagreements JS vs GLSL :', dis);
console.log('worst |JS - GLSL|             :', worst.toExponential(3), 'at', wp&&wp.map(v=>+v.toFixed(2)));
console.log(dis===0 && worst<1e-9 ? 'PASS: the shader punches exactly the hollow' : '*** MISMATCH ***');

// ── the SHAPE, per tile, exactly as the plates are laid. This is the thing the note was about:
// two axis-aligned rectangles meeting at right angles read as a T from above.
const P=0.36945, sx=2*P, sz=2*P, NX=118, NZ=80, OX=17.0, OZ=-1.3;
const tcx=i=>(i-(NX-1)/2)*sx+OX, tcz=j=>(j-(NZ-1)/2)*sz+OZ;
const PIT_N=6, PIT_RISE=2;
const TSTEP=1.40, POCK_X=49.6, POCK_HW=2.6, POCK_Z0=27.9, POCK_DZ=0.7389, POCK_N=14, POCK_IN=0.9;
function pocket(x,z){ const hw=POCK_HW+0.42*wob(x*0.80+2.2,z*0.80-3.3);
  if(Math.abs(x-POCK_X)>hw || z<POCK_Z0) return 0;
  if(H(x,z) > -POCK_IN) return 0;
  return Math.min(POCK_N, PIT_N+PIT_RISE*(Math.floor((z-POCK_Z0)/POCK_DZ)+1)); }
function courses(x,z){ const d=-H(x,z); if(d<=0) return 0;
  const bowl=PIT_RISE*Math.min(PIT_N/PIT_RISE, Math.floor(d/TSTEP)+1);
  return Math.max(bowl, pocket(x,z)); }
const GLY=' 123456789abcdefghij';
console.log('\nTHE HOLLOW, one character per 2x2 tile. digit = terraces down (c = floor, 24 courses).');
console.log('north is DOWN the page; the cave stands at the bottom.\n');
let jm=null;
for(let j=bjOf(22.5); j<=bjOf(37.0); j++){
  let row='';
  for(let i=biOf(41.0); i<=biOf(58.5); i++){ const L=courses(tcx(i),tcz(j)); row += L?GLY[L/PIT_RISE]:'.'; }
  console.log('  z '+tcz(j).toFixed(1).padStart(5)+'  '+row);
}
function biOf(x){ return Math.round((x-OX)/sx+(NX-1)/2); }
function bjOf(z){ return Math.round((z-OZ)/sz+(NZ-1)/2); }

// ── CAN YOU ACTUALLY WALK IN? Counting steep pairs is the wrong test now that the pocket has
// deliberate cliffs on its flanks: what matters is whether a route exists from the open lawn all
// the way down to the cave's floor, using only steps the walk allows. So: flood fill the tile
// grid from outside, crossing between tiles only where the drop is within LOWSTEP, and ask
// whether the cave's own floor tiles were reached.
const LOWSTEP=0.35, COURSE=0.1417476385831833;
{
  const I0=biOf(38), I1=biOf(62), J0=bjOf(20), J1=bjOf(38);
  const key=(i,j)=>i+'|'+j, seen=new Set(), q=[[I0,J0]];
  seen.add(key(I0,J0));
  while(q.length){
    const [i,j]=q.pop();
    for(const [di,dj] of [[1,0],[-1,0],[0,1],[0,-1]]){
      const ni=i+di, nj=j+dj; if(ni<I0||ni>I1||nj<J0||nj>J1) continue;
      const k=key(ni,nj); if(seen.has(k)) continue;
      const a=courses(tcx(i),tcz(j)), b=courses(tcx(ni),tcz(nj));
      if(Math.abs(a-b)*COURSE>LOWSTEP) continue;
      seen.add(k); q.push([ni,nj]);
    }
  }
  let floorTiles=0, reached=0;
  for(let i=I0;i<=I1;i++) for(let j=J0;j<=J1;j++){
    if(courses(tcx(i),tcz(j))!==POCK_N) continue;
    floorTiles++; if(seen.has(key(i,j))) reached++;
  }
  console.log('\ncave-floor tiles: '+floorTiles+'   reachable on foot from the open lawn: '+reached);
  console.log(reached>0 && reached===floorTiles ? 'PASS: the whole cave floor is walkable from outside'
            : reached>0 ? 'PARTIAL: '+(floorTiles-reached)+' floor tiles are cut off'
            : '*** FAIL: the cave cannot be walked into ***');
}
