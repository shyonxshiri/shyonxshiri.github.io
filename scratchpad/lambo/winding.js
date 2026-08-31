// Grade each primitive the way fixWinding() does: vote the sign of
// (winding face normal . summed vertex normal), weighted by triangle AREA, not count.
// A score near 1 means the triangles are reversed against their own normals.
const fs=require('fs');
const b=fs.readFileSync(process.argv[2]);
const jlen=b.readUInt32LE(12);
const j=JSON.parse(b.slice(20,20+jlen).toString('utf8'));
let off=20+jlen; const blen=b.readUInt32LE(off); const bin=b.slice(off+8,off+8+blen);
function read(i){
  const a=j.accessors[i], bv=j.bufferViews[a.bufferView];
  const start=(bv.byteOffset||0)+(a.byteOffset||0), n=a.count;
  const nc={SCALAR:1,VEC2:2,VEC3:3,VEC4:4}[a.type];
  const rd={5126:[4,o=>bin.readFloatLE(o)],5125:[4,o=>bin.readUInt32LE(o)],
            5123:[2,o=>bin.readUInt16LE(o)],5121:[1,o=>bin.readUInt8(o)]}[a.componentType];
  const [cs,f]=rd; const stride=bv.byteStride||cs*nc;
  const out=new Float64Array(n*nc);
  for(let k=0;k<n;k++) for(let c=0;c<nc;c++) out[k*nc+c]=f(start+k*stride+c*cs);
  return out;
}
let totA=0, totRev=0;
for(const mesh of j.meshes) for(const p of mesh.primitives){
  const name=p.material!=null?j.materials[p.material].name:'(none)';
  const P=read(p.attributes.POSITION), N=read(p.attributes.NORMAL), I=read(p.indices);
  let area=0, rev=0;
  for(let t=0;t<I.length;t+=3){
    const a=I[t]*3,c=I[t+1]*3,d=I[t+2]*3;
    const e1=[P[c]-P[a],P[c+1]-P[a+1],P[c+2]-P[a+2]];
    const e2=[P[d]-P[a],P[d+1]-P[a+1],P[d+2]-P[a+2]];
    const fn=[e1[1]*e2[2]-e1[2]*e2[1], e1[2]*e2[0]-e1[0]*e2[2], e1[0]*e2[1]-e1[1]*e2[0]];
    const A=Math.hypot(fn[0],fn[1],fn[2])/2; if(A<=0) continue;
    const vn=[N[a]+N[c]+N[d],N[a+1]+N[c+1]+N[d+1],N[a+2]+N[c+2]+N[d+2]];
    const dot=fn[0]*vn[0]+fn[1]*vn[1]+fn[2]*vn[2];
    area+=A; if(dot<0) rev+=A;
  }
  totA+=area; totRev+=rev;
  console.log(name.padEnd(28),'area',area.toFixed(3).padStart(9),'reversed',(rev/area).toFixed(4));
}
console.log('\nTOTAL area',totA.toFixed(2),' reversed fraction',(totRev/totA).toFixed(5));
