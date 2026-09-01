import numpy as np
occ=np.load('occ.npy'); lo=np.load('vox_lo.npy'); R=float(np.load('vox_R.npy')[0])
nx,ny,nz=occ.shape
top=np.full((nx,nz),np.nan)
for xi in range(nx):
    for zi in range(nz):
        c=np.flatnonzero(occ[xi,:,zi])
        if len(c): top[xi,zi]=lo[1]+c[-1]*R
print("model x %.3f..%.3f  y %.3f..%.3f  z %.3f..%.3f"%(lo[0],lo[0]+nx*R,lo[1],lo[1]+ny*R,lo[2],lo[2]+nz*R))
def ch(v):
    if not np.isfinite(v): return ' '
    return "0123456789ABCD"[min(13,int((v-lo[1])/0.28))]
print("\nHEIGHT MAP (rows = x low->high i.e. MOUTH at top; cols = z)  digit = height/0.28")
for xi in range(0,nx,2):
    print("  x=%6.2f %s"%(lo[0]+xi*R,"".join(ch(top[xi,zi]) for zi in range(0,nz,2))))
# how much sticks above a given sink
for d in [2.0,2.2,2.36,2.6,3.0]:
    m=np.isfinite(top)
    proud=top[m]-(0.073+d)      # cave bottom is 0.073; ground at bottom+d
    a=(proud>0).mean()
    print("sink %.2f: %.1f%% of footprint proud, max proud %.3f"%(d,100*a,max(0,proud.max())))
