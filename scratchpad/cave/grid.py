import gltf, numpy as np
js,bins=gltf.load('../../public/assets/ground_small.glb')
for i,w in gltf.nodes(js):
    n=js['nodes'][i]
    if 'mesh' not in n: continue
    W=np.array(w,dtype=np.float64).reshape(4,4).T
    p=js['meshes'][n['mesh']]['primitives'][0]
    P=np.array(gltf.acc(js,bins,p['attributes']['POSITION']),dtype=np.float64)
    Pw=(np.c_[P,np.ones(len(P))]@W.T)[:,:3]
    lo,hi=Pw.min(0),Pw.max(0)
sx=hi[0]-lo[0]; sz=hi[2]-lo[2]; TILE_BOT=lo[1]-hi[1]
X0,X1,Z0,Z1=-26.6,60.6,-31.0,28.4
NX=round((X1-X0)/sx); NZ=round((Z1-Z0)/sz); OX=(X0+X1)/2; OZ=(Z0+Z1)/2
print("sx %.8f sz %.8f TILE_BOT %.8f"%(sx,sz,TILE_BOT))
print("NX",NX,"NZ",NZ,"OX",OX,"OZ",OZ)
tcx=lambda i:(i-(NX-1)/2)*sx+OX
tcz=lambda j:(j-(NZ-1)/2)*sz+OZ
PITCH=0.36945
posX=134*PITCH; posZ=55*PITCH
print("cave pos %.5f %.5f"%(posX,posZ))
cx0,cx1=posX-3.14375,posX+3.14375
cz0,cz1=posZ-1.5755,posZ+1.5755
print("cave footprint x %.4f..%.4f  z %.4f..%.4f"%(cx0,cx1,cz0,cz1))
print("cave mouth clear x %.4f..%.4f"%(posX-1.5836,posX+1.5764))
for lbl,i0,i1,j0,j1 in [("trench",101,104,60,66),("chamber",99,106,67,70)]:
    x0,x1=tcx(i0)-sx/2,tcx(i1)+sx/2
    z0,z1=tcz(j0)-sz/2,tcz(j1)+sz/2
    print("%-8s i %d..%d j %d..%d  x %.4f..%.4f (%.3f)  z %.4f..%.4f (%.3f)"%(lbl,i0,i1,j0,j1,x0,x1,x1-x0,z0,z1,z1-z0))
for j in range(58,73):
    print("  row j=%d  z %.4f .. %.4f"%(j,tcz(j)-sz/2,tcz(j)+sz/2))
for i in range(97,109):
    print("  col i=%d  x %.4f .. %.4f"%(i,tcx(i)-sx/2,tcx(i)+sx/2))
