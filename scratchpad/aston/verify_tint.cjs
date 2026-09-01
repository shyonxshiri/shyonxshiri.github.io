// Replay the shipped tintByBoxes centroid test against the REAL Aston geometry, with no browser.
// Coordinates are taken in the same frame the function uses: inv(sceneRoot.matrixWorld) * node.matrixWorld,
// which for this glb is just the node chain under the scene root.
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
function trs(nd){                       // node local matrix, column-major like three
  const m=[1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1];
  if(nd.matrix) return nd.matrix.slice();
  const t=nd.translation||[0,0,0], r=nd.rotation||[0,0,0,1], s=nd.scale||[1,1,1];
  const [x,y,z,w]=r, x2=x+x,y2=y+y,z2=z+z, xx=x*x2,xy=x*y2,xz=x*z2, yy=y*y2,yz=y*z2,zz=z*z2,
        wx=w*x2,wy=w*y2,wz=w*z2;
  m[0]=(1-(yy+zz))*s[0]; m[1]=(xy+wz)*s[0]; m[2]=(xz-wy)*s[0];
  m[4]=(xy-wz)*s[1];     m[5]=(1-(xx+zz))*s[1]; m[6]=(yz+wx)*s[1];
  m[8]=(xz+wy)*s[2];     m[9]=(yz-wx)*s[2]; m[10]=(1-(xx+yy))*s[2];
  m[12]=t[0]; m[13]=t[1]; m[14]=t[2];
  return m;
}
function mul(a,b){ const o=new Array(16);
  for(let c=0;c<4;c++) for(let r=0;r<4;r++){ let v=0;
    for(let k=0;k<4;k++) v+=a[k*4+r]*b[c*4+k]; o[c*4+r]=v; } return o; }
function apply(m,p){ return [ m[0]*p[0]+m[4]*p[1]+m[8]*p[2]+m[12],
                              m[1]*p[0]+m[5]*p[1]+m[9]*p[2]+m[13],
                              m[2]*p[0]+m[6]*p[1]+m[10]*p[2]+m[14] ]; }
const BOXES=[[22.60,27.65,0.08,1.02, 1.03, 1.75],
             [22.60,27.65,0.08,1.02,-1.75,-1.03]];
const scene=j.scenes[j.scene||0];
const stats={};
function walk(ni, M){
  const nd=j.nodes[ni]; const W=mul(M, trs(nd));
  if(nd.mesh!=null){
    for(const p of j.meshes[nd.mesh].primitives){
      const name=p.material!=null?j.materials[p.material].name:'(none)';
      const P=read(p.attributes.POSITION), I=p.indices!=null?read(p.indices):null;
      const tri=I?I.length/3:P.length/9;
      const st=stats[name]||(stats[name]={tri:0,hit:0,lo:[1e9,1e9,1e9],hi:[-1e9,-1e9,-1e9]});
      for(let t=0;t<tri;t++){
        const a=(I?I[t*3]:t*3)*3, bq=(I?I[t*3+1]:t*3+1)*3, c=(I?I[t*3+2]:t*3+2)*3;
        const cen=apply(W,[(P[a]+P[bq]+P[c])/3,(P[a+1]+P[bq+1]+P[c+1])/3,(P[a+2]+P[bq+2]+P[c+2])/3]);
        for(let k=0;k<3;k++){ if(cen[k]<st.lo[k]) st.lo[k]=cen[k]; if(cen[k]>st.hi[k]) st.hi[k]=cen[k]; }
        st.tri++;
        for(const q of BOXES) if(cen[0]>=q[0]&&cen[0]<=q[1]&&cen[1]>=q[2]&&cen[1]<=q[3]&&cen[2]>=q[4]&&cen[2]<=q[5]){ st.hit++; break; }
      }
    }
  }
  for(const c of (nd.children||[])) walk(c, W);
}
for(const r of scene.nodes) walk(r, [1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]);
for(const k of Object.keys(stats)){ const s=stats[k];
  console.log(k.padEnd(28), 'tris', String(s.tri).padStart(7), 'inBoxes', String(s.hit).padStart(6),
    ' centroid lo', s.lo.map(v=>v.toFixed(3)).join(','), ' hi', s.hi.map(v=>v.toFixed(3)).join(',')); }
