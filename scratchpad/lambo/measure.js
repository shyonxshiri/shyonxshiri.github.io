// Measure a non-Draco glb: per-material world AABBs + overall, with node transforms applied.
const fs=require('fs');
const file=process.argv[2];
const b=fs.readFileSync(file);
const jlen=b.readUInt32LE(12);
const j=JSON.parse(b.slice(20,20+jlen).toString('utf8'));
let off=20+jlen; const blen=b.readUInt32LE(off); const bin=b.slice(off+8,off+8+blen);
function acc(i){
  const a=j.accessors[i], bv=j.bufferViews[a.bufferView];
  const start=(bv.byteOffset||0)+(a.byteOffset||0);
  const n=a.count, comp={5126:4}[a.componentType];
  if(!comp) throw new Error('componentType '+a.componentType);
  const stride=bv.byteStride||12;
  const out=new Float32Array(n*3);
  for(let k=0;k<n;k++){const o=start+k*stride;
    out[k*3]=bin.readFloatLE(o); out[k*3+1]=bin.readFloatLE(o+4); out[k*3+2]=bin.readFloatLE(o+8);}
  return out;
}
function mul(a,c){const r=new Array(16);for(let i=0;i<4;i++)for(let jj=0;jj<4;jj++){let s=0;for(let k=0;k<4;k++)s+=a[k*4+jj]*c[i*4+k];r[i*4+jj]=s;}return r;}
function trs(n){
  if(n.matrix) return n.matrix.slice();
  const t=n.translation||[0,0,0], q=n.rotation||[0,0,0,1], s=n.scale||[1,1,1];
  const [x,y,z,w]=q; const x2=x+x,y2=y+y,z2=z+z;
  const xx=x*x2,xy=x*y2,xz=x*z2,yy=y*y2,yz=y*z2,zz=z*z2,wx=w*x2,wy=w*y2,wz=w*z2;
  return [(1-(yy+zz))*s[0],(xy+wz)*s[0],(xz-wy)*s[0],0,
          (xy-wz)*s[1],(1-(xx+zz))*s[1],(yz+wx)*s[1],0,
          (xz+wy)*s[2],(yz-wx)*s[2],(1-(xx+yy))*s[2],0,
          t[0],t[1],t[2],1];
}
const boxes={}; const all=[1e9,1e9,1e9,-1e9,-1e9,-1e9];
function visit(ni,parent){
  const n=j.nodes[ni]; const m=mul(parent,trs(n));
  if(n.mesh!=null){
    for(const p of j.meshes[n.mesh].primitives){
      const name=p.material!=null?j.materials[p.material].name:'(none)';
      const P=acc(p.attributes.POSITION);
      let bx=boxes[name]||(boxes[name]=[1e9,1e9,1e9,-1e9,-1e9,-1e9,0]);
      for(let k=0;k<P.length;k+=3){
        const x=P[k],y=P[k+1],z=P[k+2];
        const wx=m[0]*x+m[4]*y+m[8]*z+m[12];
        const wy=m[1]*x+m[5]*y+m[9]*z+m[13];
        const wz=m[2]*x+m[6]*y+m[10]*z+m[14];
        const v=[wx,wy,wz];
        for(let i=0;i<3;i++){ if(v[i]<bx[i])bx[i]=v[i]; if(v[i]>bx[3+i])bx[3+i]=v[i];
          if(v[i]<all[i])all[i]=v[i]; if(v[i]>all[3+i])all[3+i]=v[i]; }
      }
      bx[6]+=P.length/3;
    }
  }
  for(const c of n.children||[]) visit(c,m);
}
const I=[1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1];
for(const s of j.scenes[j.scene||0].nodes) visit(s,I);
const f=v=>+v.toFixed(4);
console.log('OVERALL  min',all.slice(0,3).map(f),'max',all.slice(3).map(f));
console.log('DIMS     x',f(all[3]-all[0]),'y',f(all[4]-all[1]),'z',f(all[5]-all[2]));
console.log('');
for(const k of Object.keys(boxes).sort()){const x=boxes[k];
  console.log(k.padEnd(28),'verts',String(x[6]).padStart(7),
    'x',f(x[0]),'..',f(x[3]),' y',f(x[1]),'..',f(x[4]),' z',f(x[2]),'..',f(x[5]));}
