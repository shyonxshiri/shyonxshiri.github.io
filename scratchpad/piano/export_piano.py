# Builds public/assets/piano.glb from the raw selection export.
#   - drops the FLOATING HEADPHONES (four MB_26 islands standing in mid air beside the
#     table; the table top is covered by the keyboard, so there is nowhere to rest them)
#   - joins the 10 objects into one mesh per material
#   - leaves the axes alone: the build already comes out axis aligned with the KEYS facing
#     glTF +Z, so loadProp's Box3 is honest and the facing is one rotY in the loader.
import bpy, sys, math
from mathutils import Vector
SRC='/Users/shyonshiri/Desktop/my site/scratchpad/piano/raw.glb'
OUT='/Users/shyonshiri/Desktop/my site/public/assets/piano.glb'
bpy.ops.object.select_all(action='SELECT'); bpy.ops.object.delete()
bpy.ops.import_scene.gltf(filepath=SRC)
# blender bx = gltf x. The headphones are the only geometry past gltf x 3.9.
CUT=3.90
import bmesh
removed=0
for o in [o for o in bpy.context.scene.objects if o.type=='MESH']:
    me=o.data
    bm=bmesh.new(); bm.from_mesh(me)
    bm.faces.ensure_lookup_table()
    kill=[f for f in bm.faces if all((o.matrix_world @ v.co).x >= CUT for v in f.verts)]
    if kill:
        removed+=len(kill)
        bmesh.ops.delete(bm, geom=kill, context='FACES')
    bm.to_mesh(me); bm.free()
    me.update()
print('faces removed', removed)
# drop now-empty meshes
for o in [o for o in bpy.context.scene.objects if o.type=='MESH' and len(o.data.polygons)==0]:
    bpy.data.objects.remove(o, do_unlink=True)
# purge loose verts
for o in [o for o in bpy.context.scene.objects if o.type=='MESH']:
    bm=bmesh.new(); bm.from_mesh(o.data)
    loose=[v for v in bm.verts if not v.link_faces]
    bmesh.ops.delete(bm, geom=loose, context='VERTS')
    bm.to_mesh(o.data); bm.free()

# join per material
groups={}
for o in [o for o in bpy.context.scene.objects if o.type=='MESH']:
    key=o.data.materials[0].name if o.data.materials else '?'
    groups.setdefault(key,[]).append(o)
for key,objs in groups.items():
    if len(objs)<2: continue
    bpy.ops.object.select_all(action='DESELECT')
    for o in objs: o.select_set(True)
    bpy.context.view_layer.objects.active=objs[0]
    bpy.ops.object.join()

meshes=[o for o in bpy.context.scene.objects if o.type=='MESH']
mn=Vector((1e9,)*3); mx=Vector((-1e9,)*3)
tot=0
for o in meshes:
    o.data.calc_loop_triangles(); tot+=len(o.data.loop_triangles)
    for c in o.bound_box:
        w=o.matrix_world @ Vector(c)
        for i in range(3): mn[i]=min(mn[i],w[i]); mx[i]=max(mx[i],w[i])
print('MESHES', len(meshes), 'TRIS', tot)
print('BLENDER BBOX', [round(v,5) for v in mn], [round(v,5) for v in mx])
# gltf coords: gx=bx, gy=bz, gz=-by
print('GLTF  min', [round(mn.x,5), round(mn.z,5), round(-mx.y,5)])
print('GLTF  max', [round(mx.x,5), round(mx.z,5), round(-mn.y,5)])
print('GLTF dims', [round(mx.x-mn.x,5), round(mx.z-mn.z,5), round(mx.y-mn.y,5)])
bpy.ops.object.select_all(action='SELECT')
bpy.ops.export_scene.gltf(filepath=OUT, export_format='GLB', use_selection=True,
                          export_draco_mesh_compression_enable=True,
                          export_draco_mesh_compression_level=6, export_yup=True)
print('done')
