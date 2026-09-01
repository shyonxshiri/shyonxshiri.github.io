# Replays the SHIPPED loadProp config against the real piano.glb, pulled out of lego.html by
# content rather than by line number, and checks it against the mansion's measured geometry.
import bpy, re, io, math, pickle, os
from mathutils import Vector

src=io.open('/Users/shyonshiri/Desktop/my site/public/lego.html',encoding='utf-8').read()
m=re.search(r"loadProp\('\./assets/piano\.glb',\s*\{(.*?)\}\);", src, re.S)
cfg=m.group(1)
def num(k):
    mm=re.search(k+r"\s*:\s*(-?[\d.]+)", cfg)
    return float(mm.group(1))
posx,posz=[float(v) for v in re.search(r"pos:\[(-?[\d.]+),(-?[\d.]+)\]",cfg).groups()]
cy=num('y'); scale=num('scale')
rotY=math.pi if 'rotY:Math.PI' in cfg and 'PI/' not in cfg.split('rotY:')[1][:12] else 0.0
solid='solid:true' in cfg
print('CFG from file: pos=(%.5f,%.5f) y=%.4f scale=%.7f rotY=%.5f solid=%s'%(posx,posz,cy,scale,rotY,solid))

PITCH=0.36945
snap=lambda v: round(v/PITCH)*PITCH
hx, hz = snap(posx), snap(posz)
print('snapped holder pos: x=%.6f (%.3f pitches)  z=%.6f (%.3f pitches)'%(hx,hx/PITCH,hz,hz/PITCH))

bpy.ops.object.select_all(action='SELECT'); bpy.ops.object.delete()
bpy.ops.import_scene.gltf(filepath='/Users/shyonshiri/Desktop/my site/public/assets/piano.glb')
meshes=[o for o in bpy.context.scene.objects if o.type=='MESH']
# collect gltf-space verts:  gx=bx, gy=bz, gz=-by
P=[]
for o in meshes:
    mw=o.matrix_world
    for v in o.data.vertices:
        b=mw @ v.co
        P.append((b.x, b.z, -b.y))
mn=[min(q[k] for q in P) for k in range(3)]
mx=[max(q[k] for q in P) for k in range(3)]
print('model bbox', [round(v,6) for v in mn], [round(v,6) for v in mx])

# loadProp: centre x/z on bbox, seat base at 0, then holder.rotation.y, then holder.scale, then pos
cx=(mn[0]+mx[0])/2; cz=(mn[2]+mx[2])/2
c,s_=math.cos(rotY), math.sin(rotY)
W=[]
for (gx,gy,gz) in P:
    lx=gx-cx; ly=gy-mn[1]; lz=gz-cz
    rx = lx*c + lz*s_
    rz = -lx*s_ + lz*c
    W.append((hx + rx*scale, cy + ly*scale, hz + rz*scale))
wmn=[min(q[k] for q in W) for k in range(3)]
wmx=[max(q[k] for q in W) for k in range(3)]
print('WORLD bbox  x %.4f..%.4f   y %.4f..%.4f   z %.4f..%.4f'%(wmn[0],wmx[0],wmn[1],wmx[1],wmn[2],wmx[2]))
print('            w %.4f  h %.4f  d %.4f'%(wmx[0]-wmn[0], wmx[1]-wmn[1], wmx[2]-wmn[2]))
WALL=-2.35569
print('back face vs wall face : %.5f  (gap %.5f, + = clear of wall)'%(wmx[2], WALL-wmx[2]))
print('west clear  %.4f   east clear %.4f  (wall run 48.4585..51.3740)'%(wmn[0]-48.4585, 51.3740-wmx[0]))
print('base y %.4f vs floor plate top -0.0931 ; ceiling underside 2.6456, headroom %.4f'%(wmn[1], 2.6456-wmx[1]))

# keys: the WHITE keybed is MB_1. where does it end up, and which way does it face?
kp=[]
for o in meshes:
    if not o.data.materials or o.data.materials[0].name!='MB_1': continue
    mw=o.matrix_world
    for v in o.data.vertices:
        b=mw@v.co; gx,gy,gz=b.x,b.z,-b.y
        lx=gx-cx; ly=gy-mn[1]; lz=gz-cz
        kp.append((hx+(lx*c+lz*s_)*scale, cy+ly*scale, hz+(-lx*s_+lz*c)*scale))
kmn=[min(q[k] for q in kp) for k in range(3)]; kmx=[max(q[k] for q in kp) for k in range(3)]
print('white keybed world: x %.3f..%.3f  y %.3f..%.3f  z %.3f..%.3f  (room is z < %.3f)'%(
      kmn[0],kmx[0],kmn[1],kmx[1],kmn[2],kmx[2],WALL))
print('  keys face the ROOM' if (kmn[2]+kmx[2])/2 < (wmn[2]+wmx[2])/2 else '  *** KEYS FACE THE WALL ***')

# overlap with the mansion
tris=pickle.load(open('/Users/shyonshiri/Desktop/my site/scratchpad/piano/house_tris.pkl','rb'))
hit={}
for nm,vs in tris:
    for v in vs:
        if (wmn[0]-0.001<=v[0]<=wmx[0]+0.001 and wmn[1]-0.001<=v[1]<=wmx[1]+0.001
            and wmn[2]-0.001<=v[2]<=wmx[2]+0.001):
            hit[nm]=hit.get(nm,0)+1
print('mansion vertices inside the piano box:', hit if hit else 'NONE')
