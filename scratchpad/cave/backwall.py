import bpy, math, sys
from mathutils import Vector
bpy.ops.object.select_all(action='SELECT'); bpy.ops.object.delete()
bpy.ops.import_scene.gltf(filepath='/Users/shyonshiri/Desktop/my site/public/assets/cave.glb')
objs=[o for o in bpy.context.scene.objects if o.type=='MESH']
# blender gltf-import: bx=gx, by=-gz, bz=gy  ->  gltf (x,y,z) = (bx, bz, -by)
V=[]
for o in objs:
    mw=o.matrix_world
    for v in o.data.vertices:
        b=mw @ v.co
        V.append((b.x, b.z, -b.y))
mn=[min(p[k] for p in V) for k in range(3)]
mx=[max(p[k] for p in V) for k in range(3)]
print('MODEL bbox', [round(v,4) for v in mn], [round(v,4) for v in mx])
# loadProp: centre x/z on bbox, seat base at 0, then rotY, then holder position, scale 1
cx=(mn[0]+mx[0])/2; cz=(mn[2]+mx[2])/2
P=0.36945
HX=round(134*P/P)*P; HZ=round(88*P/P)*P
HY=-14*0.1417476385831833-0.197
rot=-math.pi/2; c=math.cos(rot); s=math.sin(rot)
W=[]
for (x,y,z) in V:
    lx=x-cx; ly=y-mn[1]; lz=z-cz
    W.append((HX + lx*c + lz*s, HY + ly, HZ - lx*s + lz*c))
wmn=[min(p[k] for p in W) for k in range(3)]
wmx=[max(p[k] for p in W) for k in range(3)]
print('WORLD bbox x %.3f..%.3f  y %.3f..%.3f  z %.3f..%.3f'%(wmn[0],wmx[0],wmn[1],wmx[1],wmn[2],wmx[2]))
print('pocket floor y = %.4f'%(-14*0.1417476385831833))
# elevation of the BACK: looking north, occupancy in x-y for the last 0.9 of z
BZ=wmx[2]-0.95
C=0.0924
import collections
occ=set()
for (x,y,z) in W:
    if z>=BZ: occ.add((int(x/C), int(y/C)))
xs=[k[0] for k in occ]; ys=[k[1] for k in occ]
print('\nBACK ELEVATION (z >= %.2f). # = rock, . = open. horizontal x, vertical y (up).'%BZ)
for j in range(max(ys), min(ys)-1, -1):
    row=''.join('#' if (i,j) in occ else '.' for i in range(min(xs), max(xs)+1))
    print('  y %6.2f  %s'%(j*C, row))
print('  x from %.2f to %.2f'%(min(xs)*C, max(xs)*C))
