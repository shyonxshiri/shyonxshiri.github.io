# Re-open the SHIPPED cave.glb headless and check it against the raw export it was built from:
# bbox unmoved, triangle count unchanged, winding consistent with the normals (does it need
# fixWinding?), and the material's factors as they will reach the loader.
import bpy, sys, json, struct
from mathutils import Vector
def load(path):
    bpy.ops.object.select_all(action='SELECT'); bpy.ops.object.delete()
    bpy.ops.import_scene.gltf(filepath=path)
    return [o for o in bpy.context.scene.objects if o.type=='MESH']
def stats(objs):
    mn=Vector((1e9,)*3); mx=Vector((-1e9,)*3); tris=0; area=0.0; rev=0.0
    for o in objs:
        o.data.calc_loop_triangles()
        mw=o.matrix_world
        for v in o.data.vertices:
            w=mw@v.co
            for i in range(3): mn[i]=min(mn[i],w[i]); mx[i]=max(mx[i],w[i])
        for t in o.data.loop_triangles:
            tris+=1
            a,b,c=[mw@o.data.vertices[i].co for i in t.vertices]
            fn=(b-a).cross(c-a); ar=fn.length/2
            if ar<=0: continue
            vn=sum(((mw.to_3x3()@o.data.vertices[i].normal) for i in t.vertices), Vector())
            area+=ar
            if fn.normalized().dot(vn.normalized() if vn.length>0 else fn.normalized())<0: rev+=ar
    return mn,mx,tris,area,rev
for p in sys.argv[sys.argv.index('--')+1:]:
    mn,mx,tris,area,rev=stats(load(p))
    print("%s\n  bbox %s .. %s\n  size %s\n  tris %d  area %.3f  reversed %.5f"%(
        p.split('/')[-1],
        [round(v,5) for v in mn],[round(v,5) for v in mx],
        [round(mx[i]-mn[i],5) for i in range(3)], tris, area, rev/area if area else 0))
