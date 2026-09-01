import numpy as np
T=np.load('tris.npy')
n=np.cross(T[:,1]-T[:,0], T[:,2]-T[:,0])
ln=np.linalg.norm(n,axis=1); ok=ln>1e-12
n=n[ok]/ln[ok,None]; Tk=T[ok]
up = n[:,1]>0.999
C=Tk[up].mean(1)
print("up-facing tris",up.sum())
ys=np.round(C[:,1],3)
lev,cnt=np.unique(ys,return_counts=True)
top=lev[np.argsort(-cnt)][:12]
print("levels(y,count):",[(float(l),int(cnt[list(lev).index(l)])) for l in sorted(top)])
# cluster stud tops: for each busy level, cluster x/z
from collections import defaultdict
allc=[]
for L in top:
    m=np.abs(C[:,1]-L)<1e-3
    P=C[m][:,[0,2]]
    if len(P)<3: continue
    # simple grid clustering at 0.05
    key=np.round(P/0.06).astype(int)
    d=defaultdict(list)
    for k,p in zip(map(tuple,key),P): d[k].append(p)
    # merge by union-find on 8-neighbours
    parent={k:k for k in d}
    def find(a):
        while parent[a]!=a: parent[a]=parent[parent[a]]; a=parent[a]
        return a
    for k in d:
        for dx in(-1,0,1):
            for dz in(-1,0,1):
                k2=(k[0]+dx,k[1]+dz)
                if k2 in parent:
                    a,b=find(k),find(k2)
                    if a!=b: parent[a]=b
    grp=defaultdict(list)
    for k,v in d.items(): grp[find(k)].extend(v)
    cents=np.array([np.mean(v,0) for v in grp.values()])
    sizes=np.array([len(v) for v in grp.values()])
    small=cents[sizes<=40]
    if len(small)>=4: allc.append((L,small))
for L,cents in allc[:6]:
    D=np.linalg.norm(cents[:,None,:]-cents[None,:,:],axis=2)
    np.fill_diagonal(D,1e9)
    nn=D.min(1)
    print(f"level y={L:.3f}  clusters={len(cents)}  nn median={np.median(nn):.5f} min={nn.min():.5f}")
