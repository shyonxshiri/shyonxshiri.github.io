# Flower sites for the strip between the car pad and the cave bowl, at THE SAME DENSITY as the
# rest of the map rather than at one picked by eye. Measured off the shipped SPOTS array: the
# map's median nearest-neighbour spacing is 3.77 and its plants-per-site mix is 128/182/90 for
# 1/2/3. The first cut of this put 46 sites in here at a median spacing of 1.26, three times the
# rest of the world, and it read as a flowerbed rather than as lawn.
import math, random, re, io
S=io.open('/Users/shyonshiri/Desktop/my site/public/lego.html',encoding='utf-8').read()
i=S.index('[39.3,-4.94,1]'); j=S.index('];', i)
seg=re.sub(r'//[^\n]*','',S[i-6000:j])
EX=[(float(a),float(b)) for a,b,c in re.findall(r'\[\s*(-?[\d.]+)\s*,\s*(-?[\d.]+)\s*,\s*(\d)\s*\]',seg)]
EX=[p for p in EX if not (42.6<=p[0]<=57.6 and 12.4<=p[1]<=22.6)]      # drop the overdone strip
def wob(x,z): return 0.55*math.sin(x*0.42+z*0.17+1.7)+0.30*math.sin(z*0.51-x*0.23+4.1)+0.15*math.sin((x+z)*0.88+2.3)
def H(x,z): return math.hypot(x-49.6,(z-29.6)*1.35)-(6.9+1.15*wob(x*0.34-4.2,z*0.34+2.8)+0.55*wob(x*0.87+1.9,z*0.87-6.1))
def carPad(x,z): return 43.15<x<57.37 and 6.10<z<11.9745
TREES=[(58.6,23.5),(60.0,28.5),(42.0,19.4),(40.3,24.0),(38.35,26.98),(56.8,19.9),
       (37.83,31.29),(39.7,34.02),(50.36,37.73),(58.79,33.59),(41.6,31.7),(57.2,32.0)]
SPACING=3.3                       # lands the median on the map's own 3.77
random.seed(20260901)
out=[]
tries=0
while len(out)<13 and tries<400000:
    tries+=1
    x=random.uniform(42.8,57.4); z=random.uniform(12.6,22.4)
    if carPad(x,z) or carPad(x,z-0.7): continue
    if H(x,z)<1.3: continue
    if any(math.hypot(x-a,z-b)<2.4 for a,b in TREES): continue
    if any(math.hypot(x-a,z-b)<SPACING for a,b in EX): continue
    if any(math.hypot(x-a,z-b)<SPACING for a,b,_ in out): continue
    out.append((round(x,2),round(z,2),random.choices([1,2,3],weights=[128,182,90])[0]))
print(''.join('      [%.2f,%.2f,%d],\n'%p for p in sorted(out,key=lambda p:p[1])), end='')
import sys
d=[min(math.hypot(x-a,z-b) for a,b in EX+[(q[0],q[1]) for q in out if (q[0],q[1])!=(x,z)]) for x,z,_ in out]
d.sort()
print('\ncount %d   median spacing %.2f   min %.2f   (map median 3.77)'%(len(out),d[len(d)//2],d[0]), file=sys.stderr)
