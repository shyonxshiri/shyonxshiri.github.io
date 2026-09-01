# Join the 1969 Aston Martin DBS by material and write public/assets/aston.glb.
# The raw glb comes OUT of the live Blender session (the car is not in the saved blend), exported
# selection-only with the user's selection saved and restored; this pass never touches that session.
# The car is already axis-aligned with its nose down -x (front lamps at min x, tail lights at max x,
# wheels symmetric to 0.0002 in y), so unlike the Countach there is nothing to rotate here.
# loadProp does the centring, so this only joins: 36 objects -> one mesh per material.
import bpy, sys, os, json
from mathutils import Vector

argv = sys.argv[sys.argv.index('--')+1:]
SRC, OUT = argv[0], argv[1]
DRACO = (len(argv) < 3 or argv[2] != 'nodraco')

for ob in list(bpy.data.objects): bpy.data.objects.remove(ob, do_unlink=True)
bpy.ops.import_scene.gltf(filepath=SRC)
meshes=[o for o in bpy.data.objects if o.type=='MESH']
log={'in_meshes':len(meshes)}

# FLATTEN. Clearing a parent keeps the LOCAL matrix, so the world transform has to be stamped back
# or the join comes out at the parent's scale.
for ob in meshes:
    mw=ob.matrix_world.copy()
    ob.parent=None
    ob.matrix_world=mw
bpy.context.view_layer.update()
for ob in list(bpy.data.objects):
    if ob.type!='MESH': bpy.data.objects.remove(ob, do_unlink=True)

bpy.ops.object.select_all(action='DESELECT')
for ob in meshes: ob.select_set(True)
bpy.context.view_layer.objects.active=meshes[0]
bpy.ops.object.transform_apply(location=True, rotation=True, scale=True)

# JOIN BY MATERIAL
groups={}
for ob in meshes:
    k=ob.material_slots[0].material.name if ob.material_slots and ob.material_slots[0].material else '(none)'
    groups.setdefault(k, []).append(ob)
kept=[]
for k, obs in groups.items():
    bpy.ops.object.select_all(action='DESELECT')
    for o in obs: o.select_set(True)
    bpy.context.view_layer.objects.active=obs[0]
    if len(obs)>1: bpy.ops.object.join()
    j=bpy.context.view_layer.objects.active
    j.name=k
    kept.append(j)
log['groups']={k: len(v) for k,v in groups.items()}
log['out_meshes']=len(kept)

# STRIP THE ORPHAN MAPS. Glass.001 is the front lamp panel, 4,608 triangles, and it carries a
# 2048 normal map and a 2048 metallicRoughness map: 3.65MB, 55% of the whole file. polish() forces
# metalness 0 and roughness 0.08 on anything it calls glass, so the metallicRoughness map is dead
# before it is read, and a normal map on a lens is noise. Removing both takes the glb from 6.70MB
# to whatever prints below, and changes nothing that survives to the screen.
stripped=[]
for mat in bpy.data.materials:
    if not mat.use_nodes: continue
    for nd in [n for n in mat.node_tree.nodes if n.type in ('TEX_IMAGE','NORMAL_MAP','SEPARATE_COLOR','MATH')]:
        stripped.append(mat.name+'/'+nd.name); mat.node_tree.nodes.remove(nd)
log['stripped_nodes']=stripped

lo=Vector((1e9,)*3); hi=Vector((-1e9,)*3)
for ob in kept:
    for v in ob.data.vertices:
        w=ob.matrix_world @ v.co
        for i in range(3):
            lo[i]=min(lo[i],w[i]); hi[i]=max(hi[i],w[i])
log['bbox']=[[round(v,6) for v in lo],[round(v,6) for v in hi]]
log['dims']=[round(hi[i]-lo[i],6) for i in range(3)]
log['tris']=sum(sum(len(p.vertices)-2 for p in o.data.polygons) for o in kept)

bpy.ops.object.select_all(action='SELECT')
bpy.ops.export_scene.gltf(filepath=OUT, export_format='GLB', use_selection=True,
                          export_apply=False, export_yup=True,
                          export_draco_mesh_compression_enable=DRACO,
                          export_draco_mesh_compression_level=6)
log['bytes']=os.path.getsize(OUT)
print('ASTONLOG '+json.dumps(log))
