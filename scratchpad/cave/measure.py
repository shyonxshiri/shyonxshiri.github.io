import gltf, numpy as np, json
js,bins = gltf.load('raw.glb')
tris=[]; per=[]
for i,w in gltf.nodes(js):
    n=js['nodes'][i]
    if 'mesh' not in n: continue
    W=np.array(w,dtype=np.float64).reshape(4,4).T   # column-major -> 4x4
    for p in js['meshes'][n['mesh']]['primitives']:
        P=np.array(gltf.acc(js,bins,p['attributes']['POSITION']),dtype=np.float64)
        idx=np.array(gltf.acc(js,bins,p['indices']),dtype=np.int64).ravel()
        Ph=np.c_[P, np.ones(len(P))]
        Pw=(Ph @ W.T)[:,:3]
        t=Pw[idx].reshape(-1,3,3)
        tris.append(t)
        per.append((js['meshes'][n['mesh']].get('name','?'), Pw.min(0), Pw.max(0), len(idx)//3))
T=np.concatenate(tris)
V=T.reshape(-1,3)
print("meshes",len(per),"tris",len(T))
print("bbox lo", np.round(V.min(0),4), "hi", np.round(V.max(0),4))
print("size", np.round(V.max(0)-V.min(0),4))
np.save('tris.npy', T)
per.sort(key=lambda r:-r[3])
for nm,lo,hi,nt in per[:12]:
    print(f"{nm:16s} {nt:7d}  lo {np.round(lo,3)} hi {np.round(hi,3)}")
