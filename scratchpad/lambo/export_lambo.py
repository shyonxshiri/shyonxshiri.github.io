# Export the LEGO Lamborghini Countach from the SAVED blend to public/assets/lamborghini.glb.
# Run headless (--background --factory-startup) on the saved file and NEVER save: this touches
# neither the user's live Blender session nor the .blend on disk.
#
# What it does, and why each step is here:
#   1. Splits the four wheel-rim tiles onto their OWN material clone, so the Realm can make them
#      gold without touching the 13 other parts that share the same 2048 texture atlas.
#   2. Gives the windscreen a REAL alpha. Its see-through comes from a transmission map, which
#      glTF -> three r128 does not carry, so exported untouched it is an opaque white slab.
#   3. Rotates the car so its nose runs down -X, derived from the light lenses, not hardcoded.
#   4. Flattens and joins by material: 254 objects -> one mesh per material, which is what took
#      the Corvette from 558 draw calls to 21.
import bpy, math, sys, json, os
from mathutils import Vector, Matrix

argv = sys.argv[sys.argv.index('--') + 1:] if '--' in sys.argv else []
OUT   = argv[0] if argv else '/Users/shyonshiri/Desktop/my site/public/assets/lamborghini.glb'
DRACO = (argv[1] != 'nodraco') if len(argv) > 1 else True
LOG   = argv[2] if len(argv) > 2 else '/dev/null'
ROOT  = 'Lego Lamborghini Countach'
log   = {}

root = bpy.data.objects[ROOT]
meshes = []
def walk(ob):
    if ob.type == 'MESH': meshes.append(ob)
    for c in ob.children: walk(c)
walk(root)
log['meshes_in'] = len(meshes)

# ── 1. rim tiles onto their own material ──────────────────────────────────────
rims = [ob for ob in meshes if ob.name.startswith('6376730 - Flat Tile 2x2, Round')]
assert len(rims) == 4, 'expected 4 rim tiles, got %d' % len(rims)
rimmat = bpy.data.materials['Texture'].copy()
rimmat.name = 'Texture_Rim'
for ob in rims: ob.material_slots[0].material = rimmat
log['rims'] = [ob.name for ob in rims]

# ── 1b. the PRINTED panels get an atlas composited over black ─────────────────
# 13 of the 254 parts draw off the shared atlas, and they are the nose, the front fenders, the
# sills and a rear quarter: white bricks carrying printed grilles, the Countach lettering, the
# Lamborghini shield and a flag. A material colour cannot black those out without multiplying the
# prints away with them, so the atlas itself is rebuilt by recolour_atlas.py as the same decals
# printed on a black brick. The RIM and the WINDSCREEN keep the ORIGINAL atlas, which is why the
# rim was split onto its own material above and why this runs after that copy.
here = os.path.dirname(os.path.abspath(__file__))
timg = bpy.data.images.load(os.path.join(here, 'atlas_black.png'))
timg.name = 'Texture_black'
timg.colorspace_settings.name = 'sRGB'
timg.pack()
texmat = bpy.data.materials['Texture']
swapped = 0
for n in texmat.node_tree.nodes:
    if n.type == 'TEX_IMAGE':
        n.image = timg; swapped += 1
assert swapped == 1, 'expected one image node on Texture, found %d' % swapped
log['atlas_swapped'] = timg.name

# ── 2. windscreen: constant alpha + BLEND so it exports as real glass ─────────
ws = bpy.data.materials['Lego_Windshield']
bsdf = next(n for n in ws.node_tree.nodes if n.type == 'BSDF_PRINCIPLED')
for l in list(bsdf.inputs['Alpha'].links): ws.node_tree.links.remove(l)
bsdf.inputs['Alpha'].default_value = 0.25   # the value this model's own trans bricks carry
ws.blend_method = 'BLEND'
# Transmission is what actually made this piece see-through in Blender, and three r128 has no
# KHR_materials_transmission, so exporting it only ships a dead extension plus a 28KB map that
# nothing reads. The alpha above replaces it; cut the link so neither is written.
for l in list(bsdf.inputs['Transmission Weight'].links if 'Transmission Weight' in bsdf.inputs
              else bsdf.inputs['Transmission'].links):
    ws.node_tree.links.remove(l)
# Its base texture is a BYTE-IDENTICAL copy of the shared atlas (same sha1, 682KB), so point the
# node at the one datablock and the exporter writes the image once instead of twice.
atlas = bpy.data.images['Texture_baseColor.png']
for n in ws.node_tree.nodes:
    if n.type == 'TEX_IMAGE' and n.image and n.image.name.startswith('Lego_Windshield_baseColor'):
        n.image = atlas

# ── 3. face the nose down -X, derived from the lenses ─────────────────────────
def centroid(matname):
    pts = []
    for ob in meshes:
        m = ob.material_slots[0].material
        if m and m.name == matname:
            mw = ob.matrix_world
            pts += [mw @ v.co for v in ob.data.vertices]
    return sum(pts, Vector()) / len(pts)
head = centroid('Lego_Transparent_White')   # clear headlight lenses, at the front
tail = centroid('Lego_Transparent_Red')     # red tail cones, at the back
nose = (head - tail); nose.z = 0; nose.normalize()
yaw  = math.atan2(nose.y, nose.x)
delta = math.pi - yaw                       # carry the nose onto Blender -X, i.e. glTF -X
# The rotation is applied to the MESH MATRICES, not to the root empty. Setting the empty's
# rotation_euler does nothing here: in a headless open this object's collection is not evaluated,
# so the children's matrix_world never refreshes and the whole car exports at its original 69.96
# degree angle. Multiplying each world matrix by Rz needs no depsgraph and cannot go stale.
ROT = Matrix.Rotation(delta, 4, 'Z')
log['yaw_before_deg'] = round(math.degrees(yaw), 4)
log['rot_applied_deg'] = round(math.degrees(delta), 4)

# ── 4. flatten: single-user, unparent keeping the world matrix, apply, join ───
# CLEARING A PARENT KEEPS THE LOCAL MATRIX, so the world matrix is stamped back by hand.
for ob in bpy.data.objects: ob.select_set(False)
scene_coll = bpy.context.scene.collection
for ob in meshes:
    ob.hide_viewport = False
    try: ob.hide_set(False)
    except Exception: pass
    mw = ROT @ ob.matrix_world.copy()
    ob.parent = None
    ob.matrix_world = mw
    if ob.name not in scene_coll.objects:
        for c in list(ob.users_collection): c.objects.unlink(ob)
        scene_coll.objects.link(ob)
    ob.select_set(True)
bpy.context.view_layer.objects.active = meshes[0]
bpy.ops.object.make_single_user(object=True, obdata=True)
bpy.ops.object.transform_apply(location=True, rotation=True, scale=True)

# centre X/Y on the bbox, seat Z min at 0 (Blender is Z-up; glTF turns this into Y-up)
allv = [ob.matrix_world @ v.co for ob in meshes for v in ob.data.vertices]
mn = Vector((min(v[i] for v in allv) for i in range(3)))
mx = Vector((max(v[i] for v in allv) for i in range(3)))
off = Vector(((mn.x + mx.x) / 2, (mn.y + mx.y) / 2, mn.z))
for ob in meshes: ob.location -= off
bpy.context.view_layer.update()
log['dims_blender'] = [round(mx[i] - mn[i], 5) for i in range(3)]
def cen2(matname):
    pts = []
    for ob in meshes:
        m = ob.material_slots[0].material
        if m and m.name == matname:
            pts += [ob.matrix_world @ v.co for v in ob.data.vertices]
    return sum(pts, Vector()) / len(pts)
n2 = cen2('Lego_Transparent_White') - cen2('Lego_Transparent_Red'); n2.z = 0; n2.normalize()
log['nose_after'] = [round(v, 5) for v in n2]
log['yaw_after_deg'] = round(math.degrees(math.atan2(n2.y, n2.x)), 4)
assert abs(abs(log['yaw_after_deg']) - 180.0) < 0.5, 'nose did not land on -X: %s' % log['yaw_after_deg']

groups = {}
for ob in meshes:
    groups.setdefault(ob.material_slots[0].material.name, []).append(ob)
joined = []
for name, obs in groups.items():
    for o in bpy.data.objects: o.select_set(False)
    for o in obs: o.select_set(True)
    bpy.context.view_layer.objects.active = obs[0]
    if len(obs) > 1: bpy.ops.object.join()
    obs[0].name = 'lambo_' + name
    joined.append(obs[0])
log['materials'] = {k: len(v) for k, v in sorted(groups.items())}
log['draw_calls'] = len(joined)

# ── export ────────────────────────────────────────────────────────────────────
for o in bpy.data.objects: o.select_set(False)
for o in joined: o.select_set(True)
bpy.context.view_layer.objects.active = joined[0]

kw = dict(filepath=OUT, export_format='GLB', use_selection=True, export_apply=True,
          export_yup=True, export_draco_mesh_compression_enable=DRACO,
          export_draco_mesh_compression_level=6)
props = bpy.ops.export_scene.gltf.get_rna_type().properties.keys()
kw = {k: v for k, v in kw.items() if k in props or k == 'filepath'}
log['export_kwargs'] = sorted(kw.keys())
bpy.ops.export_scene.gltf(**kw)

log['out'] = OUT
log['bytes'] = os.path.getsize(OUT)
open(LOG, 'w').write(json.dumps(log, indent=1))
print('LAMBO_JSON ' + json.dumps(log))
