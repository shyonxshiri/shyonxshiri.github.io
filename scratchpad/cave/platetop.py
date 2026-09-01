import gltf, numpy as np
js,bins=gltf.load('../../public/assets/ground_small.glb')
for i,w in gltf.nodes(js):
    n=js['nodes'][i]
    if 'mesh' not in n: continue
    W=np.array(w,dtype=np.float64).reshape(4,4).T
    p=js['meshes'][n['mesh']]['primitives'][0]
    P=np.array(gltf.acc(js,bins,p['attributes']['POSITION']),dtype=np.float64)
    idx=np.array(gltf.acc(js,bins,p['indices']),dtype=np.int64).ravel()
    Pw=(np.c_[P,np.ones(len(P))]@W.T)[:,:3]
lo,hi=Pw.min(0),Pw.max(0)
# page translate: centre x/z, top -> 0
Pw[:,0]-= (lo[0]+hi[0])/2; Pw[:,2]-=(lo[2]+hi[2])/2; Pw[:,1]-=hi[1]
T=Pw[idx].reshape(-1,3,3)
# ray down at (0,0)
best=None
for t in T:
    a,b,c=t[:,[0,2]]
    d=(b[1]-c[1])*(a[0]-c[0])+(c[0]-b[0])*(a[1]-c[1])
    if abs(d)<1e-12: continue
    l1=((b[1]-c[1])*(0-c[0])+(c[0]-b[0])*(0-c[1]))/d
    l2=((c[1]-a[1])*(0-c[0])+(a[0]-c[0])*(0-c[1]))/d
    l3=1-l1-l2
    if min(l1,l2,l3)<-1e-9: continue
    y=l1*t[0,1]+l2*t[1,1]+l3*t[2,1]
    if best is None or y>best: best=y
print("plateTop (raycast at tile centre) = %.6f"%best)
print("TILE_BOT = %.6f"%(lo[1]-hi[1]))
C=best-(lo[1]-hi[1])
print("COURSE (plate body) = %.6f"%C)
for n_ in (5,20):
    print("  %d courses = %.5f"%(n_, n_*C))
print("depth 20 courses %.5f ; cave height 3.4024 -> proud %.4f"%(20*C, 3.4024-20*C))
print("arch underside 1.90 above cave floor -> %.4f below lawn"%(20*C-1.90))
