# Build public/assets/cave.glb from the raw selection-only export of `Cave_Lego`.
#
# The cave lives ONLY in the live Blender session (like garden.glb and aston.glb before it),
# so it was pulled out of that session selection-only, with the user's selection saved and
# restored, into scratchpad/cave/raw.glb. Everything after that happens HEADLESS, on that
# file, so the join below never touches the session or the blend.
#
# The build ships 43 separate meshes on ONE material (Scene_-_Root, a flat dark grey, metalness
# 1, which polish() zeroes on load). Joining them is the whole optimisation: 43 draw calls to 1.
#
#   blender --background --factory-startup --python export_cave.py -- <raw.glb> <out.glb>
import bpy, sys, os
argv = sys.argv[sys.argv.index('--')+1:]
src, out = argv[0], argv[1]

bpy.ops.object.select_all(action='SELECT'); bpy.ops.object.delete()
bpy.ops.import_scene.gltf(filepath=src)
meshes = [o for o in bpy.context.scene.objects if o.type == 'MESH']
print('imported meshes', len(meshes))

# one material here, but group anyway so a re-export with more still lands one mesh per material
groups = {}
for o in meshes:
    key = o.data.materials[0].name if o.data.materials else '(none)'
    groups.setdefault(key, []).append(o)

joined = []
for key, objs in groups.items():
    bpy.ops.object.select_all(action='DESELECT')
    for o in objs: o.select_set(True)
    bpy.context.view_layer.objects.active = objs[0]
    if len(objs) > 1: bpy.ops.object.join()
    j = bpy.context.view_layer.objects.active
    j.name = 'cave_' + key
    joined.append(j)
    print('joined', key, len(objs), '->', len(j.data.polygons), 'faces')

bpy.ops.object.select_all(action='DESELECT')
for o in joined: o.select_set(True)
bpy.context.view_layer.objects.active = joined[0]
bpy.ops.export_scene.gltf(filepath=out, export_format='GLB', use_selection=True,
                          export_apply=True, export_yup=True,
                          export_draco_mesh_compression_enable=True,
                          export_draco_mesh_compression_level=6)
print('wrote', out, os.path.getsize(out), 'bytes')
