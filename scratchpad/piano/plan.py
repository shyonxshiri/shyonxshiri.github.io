import bpy, sys, math
from mathutils import Vector
bpy.ops.object.select_all(action='SELECT'); bpy.ops.object.delete()
bpy.ops.import_scene.gltf(filepath='/Users/shyonshiri/Desktop/my site/public/assets/modern_house.glb')

# glTF import into Blender rotates +90 about X (Y-up -> Z-up). Undo to get raw glTF model coords.
# blender (bx,by,bz) == gltf (bx, bz, -by)
def toworld(bx,by,bz):
    mx,my,mz = bx, bz, -by
    return (50.2622-(mz+0.9403245), my-0.210029, 0.20165+(mx+6.5308495))

mats={}
tris=[]
for o in bpy.context.scene.objects:
    if o.type!='MESH': continue
    me=o.data
    me.calc_loop_triangles()
    mw=o.matrix_world
    for lt in me.loop_triangles:
        nm = me.materials[lt.material_index].name if me.materials and lt.material_index < len(me.materials) else '?'
        vs=[toworld(*(mw @ me.vertices[i].co)) for i in lt.vertices]
        tris.append((nm,vs))
        mats[nm]=mats.get(nm,0)+1
print('MATS', sorted(mats.items(), key=lambda t:-t[1]))
mn=[1e9]*3; mx=[-1e9]*3
for nm,vs in tris:
    for v in vs:
        for k in range(3):
            mn[k]=min(mn[k],v[k]); mx[k]=max(mx[k],v[k])
print('WORLD BBOX', [round(v,4) for v in mn], [round(v,4) for v in mx])
import pickle
pickle.dump(tris, open('/Users/shyonshiri/Desktop/my site/scratchpad/piano/house_tris.pkl','wb'))
print('saved', len(tris))
