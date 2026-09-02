// For everything the enlarged bowl swallowed, find the nearest legal spot instead of guessing:
// trees need 3.6 of clearance from the rim (treeOK's own rule, now measured on the field rather
// than a rectangle) and 3.5 from every other tree; flowers only need to be out of the hollow.
const fs=require('fs'), src=fs.readFileSync('public/lego.html','utf8');
const wob=(x,z)=>0.55*Math.sin(x*0.42+z*0.17+1.7)+0.30*Math.sin(z*0.51-x*0.23+4.1)+0.15*Math.sin((x+z)*0.88+2.3);
const H=(x,z)=>Math.hypot(x-49.6,(z-29.6)*1.35)-(6.9+1.15*wob(x*0.34-4.2,z*0.34+2.8)+0.55*wob(x*0.87+1.9,z*0.87-6.1));
function arr(tag,stop){ const i=src.indexOf(tag), j=src.indexOf(stop,i+5);
  return [...src.slice(i,j).replace(/\/\/[^\n]*/g,'').matchAll(/\[\s*(-?[\d.]+)\s*,\s*(-?[\d.]+)/g)].map(m=>[+m[1],+m[2]]); }
const cand=arr('const cand=[','];');
const spots=arr('[39.3,-4.94,1]','];');
const BZ1=39.4, BX1=71.8;
function findTree(x0,z0){
  for(let r=1.0;r<14;r+=0.25){
    for(let a=0;a<64;a++){
      const th=a/64*2*Math.PI, x=x0+r*Math.cos(th), z=z0+r*Math.sin(th);
      if(z>BZ1-1||x>BX1-1) continue;
      if(H(x,z)<3.8) continue;
      let ok=true;
      for(const [a2,b2] of cand){ if(a2===x0&&b2===z0) continue; if(Math.hypot(x-a2,z-b2)<3.5){ok=false;break;} }
      if(!ok) continue;
      return [+x.toFixed(2),+z.toFixed(2),+H(x,z).toFixed(2),+r.toFixed(2)];   // NEAREST, so return, not break
    }
  }
  return null;
}
function findFlower(x0,z0){
  for(let r=0.5;r<10;r+=0.2){
    for(let a=0;a<48;a++){
      const th=a/48*2*Math.PI, x=x0+r*Math.cos(th), z=z0+r*Math.sin(th);
      if(z>BZ1-1) continue;
      if(H(x,z)<1.0) continue;
      return [+x.toFixed(2),+z.toFixed(2),+H(x,z).toFixed(2),+r.toFixed(2)];
    }
  }
  return null;
}
console.log('TREES needing a move (field < 3.6 of the rim):');
for(const [x,z] of cand){ const d=H(x,z); if(d>=3.6) continue;
  const n=findTree(x,z); console.log('  ['+x+','+z+']  field '+d.toFixed(2)+'  ->  '+(n?'['+n[0]+','+n[1]+']  field '+n[2]+'  moved '+n[3]:'NO SPOT')); }
console.log('\nFLOWERS inside the hollow:');
for(const [x,z] of spots){ const d=H(x,z); if(d>=0) continue;
  const n=findFlower(x,z); console.log('  ['+x+','+z+']  field '+d.toFixed(2)+'  ->  '+(n?'['+n[0]+','+n[1]+']  field '+n[2]:'NO SPOT')); }
