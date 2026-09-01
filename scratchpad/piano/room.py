import bpy, sys, math, os
from mathutils import Vector, Matrix
S=[float(a) for a in sys.argv[sys.argv.index('--')+1:]]
bpy.ops.object.select_all(action='SELECT'); bpy.ops.object.delete()

def world_xform(objs):
    """glTF-import Blender coords -> Realm world coords, as a Blender-space matrix.
       gltf (gx,gy,gz) from blender (bx,by,bz): gx=bx, gy=bz, gz=-by
       worldX = 50.2622-(gz+0.9403245); worldY = gy-0.210029; worldZ = 0.20165+(gx+6.5308495)
       Render in Realm coords but Z-up for Blender: put worldY on blender Z, worldX on X, worldZ on Y."""
    for o in objs:
        me=o.data
        for v in me.vertices:
            b=o.matrix_world @ v.co
            gx,gy,gz = b.x, b.z, -b.y
            wx = 50.2622-(gz+0.9403245); wy = gy-0.210029; wz = 0.20165+(gx+6.5308495)
            v.co = Vector((wx, wz, wy))
        o.matrix_world = Matrix.Identity(4)
        me.update()

bpy.ops.import_scene.gltf(filepath='/Users/shyonshiri/Desktop/my site/public/assets/modern_house.glb')
house=[o for o in bpy.context.scene.objects if o.type=='MESH']
world_xform(house)

WALLZ=-2.3557; CX=49.9163
PIANO='/Users/shyonshiri/Desktop/my site/public/assets/piano.glb'
labels=[]
for i,s in enumerate(S):
    before=set(bpy.context.scene.objects)
    bpy.ops.import_scene.gltf(filepath=PIANO)
    new=[o for o in bpy.context.scene.objects if o.type=='MESH' and o not in before]
    # local gltf -> realm-oriented axes, keys face gltf +Z which we want at world -Z
    mn=Vector((1e9,)*3); mx=Vector((-1e9,)*3)
    for o in new:
        for c in o.bound_box:
            w=o.matrix_world @ Vector(c)
            for k in range(3): mn[k]=min(mn[k],w[k]); mx[k]=max(mx[k],w[k])
    # blender-import: bx=gx, by=-gz, bz=gy.  keys face gltf +Z = blender -Y
    ctr=(mn+mx)/2
    d=(mx.y-mn.y)*s   # depth along world z
    w_=(mx.x-mn.x)*s
    zc = -8*0.36945
    xoff = 135*0.36945
    BASE = -0.0931
    for o in new:
        me=o.data
        for v in me.vertices:
            b=o.matrix_world @ v.co
            lx=(b.x-ctr.x)*s; ly=(b.y-ctr.y)*s; lz=(b.z-mn.z)*s
            # rotate 180 about up so keys (blender -Y) face world -Z... blender -Y maps to world -z already
            # world x <- lx, world z <- ly, world y <- lz
            v.co = Vector((xoff+lx, zc+ly, BASE+lz))
        o.matrix_world=Matrix.Identity(4); me.update()
    labels.append((s, round(w_,3), round((mx.z-mn.z)*s,3), round(d,3)))
print('SCALES (s, width, height, depth):', labels)

# minifig reference: 1.77 tall, 0.55 wide, 0.4 deep, standing in front of the piano
bpy.ops.mesh.primitive_cube_add(size=1, location=(CX+2.35, WALLZ-1.15, 1.77/2))
ref=bpy.context.object; ref.scale=(0.55,0.40,1.77)
m=bpy.data.materials.new('ref'); m.use_nodes=True
m.node_tree.nodes['Principled BSDF'].inputs[0].default_value=(0.55,0.08,0.06,1)
ref.data.materials.append(m)

import bmesh
for o in house:
    bm=bmesh.new(); bm.from_mesh(o.data)
    bm.faces.ensure_lookup_table()
    kill=[f for f in bm.faces if min(v.co.z for v in f.verts) > 2.55]
    if kill: bmesh.ops.delete(bm, geom=kill, context='FACES')
    bm.to_mesh(o.data); bm.free(); o.data.update()

scn=bpy.context.scene
scn.render.engine='BLENDER_EEVEE'
scn.render.resolution_x=980; scn.render.resolution_y=640
w=bpy.data.worlds.new('w'); scn.world=w; w.use_nodes=True
w.node_tree.nodes['Background'].inputs[0].default_value=(0.45,0.5,0.58,1)
w.node_tree.nodes['Background'].inputs[1].default_value=2.0
cam_d=bpy.data.cameras.new('c'); cam=bpy.data.objects.new('c',cam_d); scn.collection.objects.link(cam); scn.camera=cam
li=bpy.data.lights.new('l','SUN'); li.energy=3.5
lo=bpy.data.objects.new('l',li); scn.collection.objects.link(lo); lo.rotation_euler=(math.radians(50),0,math.radians(150))
li2=bpy.data.lights.new('p','AREA'); li2.energy=900; li2.size=6
lo2=bpy.data.objects.new('p',li2); scn.collection.objects.link(lo2); lo2.location=(52,-4.5,3.2)
shots={
 'aerial':((54.6,-9.6,5.4),(49.6,-3.2,0.9)),
 'inside':((50.2,-5.85,1.35),(49.92,-2.4,0.95)),
 'corner':((53.2,-5.9,1.55),(49.4,-2.5,0.95)),
 'feet':((49.30,-4.30,0.22),(48.90,-3.20,0.02)),
 'feet2':((51.20,-4.10,0.30),(50.80,-3.25,0.03)),
}
out=sys.argv[sys.argv.index('--')-0]  # unused
for nm,(loc,tgt) in shots.items():
    cam_d.lens=48 if nm.startswith('feet') else 20
    cam.location=Vector(loc)
    cam.rotation_euler=(Vector(tgt)-Vector(loc)).normalized().to_track_quat('-Z','Z').to_euler()
    scn.render.filepath='/Users/shyonshiri/Desktop/my site/scratchpad/piano/room/%s_%s.png'%(nm, '_'.join('%.2f'%x for x in S))
    bpy.ops.render.render(write_still=True)
print('done')
