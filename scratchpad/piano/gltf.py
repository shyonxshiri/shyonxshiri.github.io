import json, struct, sys, math

def load(path):
    d=open(path,'rb').read()
    assert d[:4]==b'glTF'
    ln=struct.unpack('<I', d[12:16])[0]
    js=json.loads(d[20:20+ln])
    off=20+ln
    bins=b''
    while off < len(d):
        cl,ct=struct.unpack('<II', d[off:off+8])
        if ct==0x004E4942: bins=d[off+8:off+8+cl]
        off+=8+cl
    return js, bins

CT={5120:('b',1),5121:('B',1),5122:('h',2),5123:('H',2),5125:('I',4),5126:('f',4)}
NC={'SCALAR':1,'VEC2':2,'VEC3':3,'VEC4':4,'MAT4':16}

def acc(js,bins,i):
    a=js['accessors'][i]
    bv=js['bufferViews'][a['bufferView']]
    fmt,sz=CT[a['componentType']]; nc=NC[a['type']]
    base=bv.get('byteOffset',0)+a.get('byteOffset',0)
    stride=bv.get('byteStride') or sz*nc
    out=[]
    for k in range(a['count']):
        o=base+k*stride
        out.append(struct.unpack_from('<'+fmt*nc, bins, o))
    return out

def mul(m,v):
    x,y,z=v
    return (m[0]*x+m[4]*y+m[8]*z+m[12],
            m[1]*x+m[5]*y+m[9]*z+m[13],
            m[2]*x+m[6]*y+m[10]*z+m[14])

def matmul(a,b):
    r=[0.0]*16
    for c in range(4):
        for rr in range(4):
            r[c*4+rr]=sum(a[k*4+rr]*b[c*4+k] for k in range(4))
    return r

def trs(n):
    if 'matrix' in n: return list(n['matrix'])
    t=n.get('translation',[0,0,0]); q=n.get('rotation',[0,0,0,1]); s=n.get('scale',[1,1,1])
    x,y,z,w=q
    m=[1-2*(y*y+z*z),2*(x*y+z*w),2*(x*z-y*w),0,
       2*(x*y-z*w),1-2*(x*x+z*z),2*(y*z+x*w),0,
       2*(x*z+y*w),2*(y*z-x*w),1-2*(x*x+y*y),0,
       0,0,0,1]
    for c in range(3):
        for rr in range(3): m[c*4+rr]*=s[c]
    m[12],m[13],m[14]=t
    return m

def nodes(js):
    """yield (nodeIndex, worldMatrix)"""
    out=[]
    def rec(i, par):
        n=js['nodes'][i]
        w=matmul(par, trs(n))
        out.append((i,w))
        for c in n.get('children',[]): rec(c,w)
    ident=[1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1]
    for s in js['scenes'][js.get('scene',0)]['nodes']: rec(s, ident)
    return out
