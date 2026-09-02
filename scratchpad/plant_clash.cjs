// Which planted things now clash with the moved hollow, and what would treeOK say about them.
const fs=require('fs'), src=fs.readFileSync('public/lego.html','utf8');
const wob=(x,z)=>0.55*Math.sin(x*0.42+z*0.17+1.7)+0.30*Math.sin(z*0.51-x*0.23+4.1)+0.15*Math.sin((x+z)*0.88+2.3);
const rrect=(x,z,x0,x1,z0,z1,r)=>{const dx=Math.abs(x-(x0+x1)/2)-((x1-x0)/2-r),dz=Math.abs(z-(z0+z1)/2)-((z1-z0)/2-r);
  return Math.hypot(Math.max(dx,0),Math.max(dz,0))+Math.min(Math.max(dx,dz),0)-r;};
const cl=u=>u<0?0:u>1?1:u;
const bank=(u,s)=>{const p=s>0?0:11.3;return 0.30*Math.sin(u*0.55+p)+0.17*Math.sin(u*1.09+p*1.7+2.1)+0.09*Math.sin(u*2.13+p*0.6+0.7);};
function H(x,z){
  const d=Math.hypot(x-49.6,(z-29.6)*1.35);
  return d-(6.9+1.15*wob(x*0.34-4.2,z*0.34+2.8)+0.55*wob(x*0.87+1.9,z*0.87-6.1));
}
function arr(tag,stop){ const i=src.index?0:src.indexOf(tag); const j=src.indexOf(stop,i+5);
  const body=src.slice(i,j).replace(/\/\/[^\n]*/g,'');
  return [...body.matchAll(/\[\s*(-?[\d.]+)\s*,\s*(-?[\d.]+)/g)].map(m=>[+m[1],+m[2]]); }
const KEEP=[38.5,60.7,22.4,36.8], Z1=35.789;   // bowl bbox + 3.6
function report(name, pts){
  const bad=[];
  for(const [x,z] of pts){
    const d=H(x,z);
    const inKeep = x>KEEP[0]&&x<KEEP[1]&&z>KEEP[2]&&z<KEEP[3];
    if(d<0) bad.push(['IN THE HOLLOW', x,z,d]);
    else if(inKeep) bad.push(['inside treeOK keep-out', x,z,d]);
    else if(d<1.6) bad.push(['closer than 1.6 to the lip', x,z,d]);
  }
  console.log('\n'+name+': '+pts.length+' entries, '+bad.length+' need attention');
  for(const [why,x,z,d] of bad) console.log('   ('+x+', '+z+')  field '+d.toFixed(2)+'   '+why);
}
report('planted trees (cand)', arr('const cand=[','];'));
report('flower sites (SPOTS)', arr('[39.3,-4.94,1]','];'));
const far=arr('const FAR_TREES=[','const TRIM_TREES=['), trim=arr('const TRIM_TREES=[','[].concat(FAR_TREES');
console.log('\nBACKGROUND trees that the extended plate (Z1 '+Z1+') now puts ON the lawn:');
for(const [n,L] of [['FAR',far],['TRIM',trim]])
  for(const [x,z] of L) if(z<Z1 && z>26 && x>36 && x<62)
    console.log('   '+n+' ('+x+', '+z+')   field '+H(x,z).toFixed(2)+(H(x,z)<0?'   *** IN THE HOLLOW ***':''));
