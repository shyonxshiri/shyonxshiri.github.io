# skeleton.glb and ghost.glb.
#  · the skeleton keeps its SEVEN PARTS as separate named nodes, because the same file has to
#    serve both jobs: cloned whole it is the complete figure seated against the cave's back wall,
#    and cloned a node at a time it is the loose bones scattered round the clearing.
#  · both are centred on x/z and seated with their lowest point at y=0, so loadProp's own
#    centring is a no-op and a placement means what it says.
#  · the skeleton is rotated so it faces -Z, which is the way every other figure in the Realm
#    faces, instead of the +X its face print sits on.
import bpy, sys, math, os
from mathutils import Vector, Matrix
def load(src):
    bpy.ops.object.select_all(action='SELECT'); bpy.ops.object.delete()
    bpy.ops.import_scene.gltf(filepath=src)
    return [o for o in bpy.context.scene.objects if o.type=='MESH']
def bake(objs, yaw=0.0):
    R=Matrix.Rotation(yaw,4,'Z')
    for o in objs:
        o.data.transform(o.matrix_world)
        o.matrix_world=Matrix.Identity(4)
        o.data.transform(R)
    mn=Vector((1e9,)*3); mx=Vector((-1e9,)*3)
    for o in objs:
        for v in o.data.vertices:
            for i in range(3): mn[i]=min(mn[i],v.co[i]); mx[i]=max(mx[i],v.co[i])
    off=Vector((-(mn.x+mx.x)/2, -(mn.y+mx.y)/2, -mn.z))
    for o in objs: o.data.transform(Matrix.Translation(off))
    return mn+off, mx+off
def out(path, draco=True):
    bpy.ops.object.select_all(action='SELECT')
    bpy.ops.export_scene.gltf(filepath=path, export_format='GLB', use_selection=True,
        export_draco_mesh_compression_enable=draco, export_draco_mesh_compression_level=6,
        export_yup=True)
    return os.path.getsize(path)

B='/Users/shyonshiri/Desktop/my site/scratchpad/cave/'
A='/Users/shyonshiri/Desktop/my site/public/assets/'

# ── SKELETON. Blender is Z-up here; the face print sits on +X, so a -90 deg yaw turns it to -Y,
# which the glTF Y-up export writes out as -Z.
objs=load(B+'skeleton_raw.glb')
mn,mx=bake(objs, -math.pi/2)
print('SKELETON parts:', sorted(o.name for o in objs))
print('SKELETON blender bbox', [round(v,4) for v in mn], [round(v,4) for v in mx])
print('SKELETON gltf dims  x %.4f  y(height) %.4f  z %.4f'%(mx.x-mn.x, mx.z-mn.z, mx.y-mn.y))
tot=0
for o in objs: o.data.calc_loop_triangles(); tot+=len(o.data.loop_triangles)
print('SKELETON tris', tot, 'bytes', out(A+'skeleton.glb'))

# ── GHOST. Its shroud is a solid of revolution, so which way it faces barely reads; it is left
# on its own axes and only centred and seated.
objs=load(B+'ghost_raw.glb')
mn,mx=bake(objs, 0.0)
print('\nGHOST blender bbox', [round(v,4) for v in mn], [round(v,4) for v in mx])
print('GHOST gltf dims  x %.4f  y(height) %.4f  z %.4f'%(mx.x-mn.x, mx.z-mn.z, mx.y-mn.y))
tot=0
for o in objs: o.data.calc_loop_triangles(); tot+=len(o.data.loop_triangles)
print('GHOST tris', tot, 'bytes', out(A+'ghost.glb'))
