import math, random
def wob(x,z): return 0.55*math.sin(x*0.42+z*0.17+1.7)+0.30*math.sin(z*0.51-x*0.23+4.1)+0.15*math.sin((x+z)*0.88+2.3)
def H(x,z):
    return math.hypot(x-49.6,(z-29.6)*1.35)-(6.9+1.15*wob(x*0.34-4.2,z*0.34+2.8)+0.55*wob(x*0.87+1.9,z*0.87-6.1))
CORR=1.35
random.seed(4711)
picks=[]; tries=0
while len(picks)<22 and tries<60000:
    tries+=1
    x=random.uniform(43.5,55.7); z=random.uniform(24.5,33.6)
    if H(x,z)>-0.7: continue
    if abs(x-49.6)<CORR and z>25.0: continue
    if math.hypot(x-49.51,z-33.17)<1.9: continue
    if any(math.hypot(x-a,z-b)<1.25 for a,b in picks): continue
    picks.append((round(x,2),round(z,2)))
PARTS=[["body_white_0","lag_left_white_0"],["head_white_0","face_black_0"],["hand_right_white_0"],
       ["lag_right_white_0"],["hand_left_white_0"],["body_white_0"],["lag_left_white_0"],
       ["body_white_0","lag_right_white_0","lag_left_white_0"],["head_white_0","face_black_0"],
       ["hand_left_white_0","hand_right_white_0"]]
out=[]
for i,(x,z) in enumerate(sorted(picks,key=lambda p:p[1])):
    parts=PARTS[i%len(PARTS)]
    yaw=round(random.uniform(0,6.28),2)
    tilt=round(random.choice([0,0,0,0.25,-0.2]),2)
    q=",".join("'"+p+"'" for p in parts)
    out.append("        [%.2f,%.2f, %.2f, %.2f, %s]," % (x,z,yaw,tilt,q))
print("\n".join(out))
print()
print("count", len(picks), " nearest to the axis among z>25:",
      round(min(abs(x-49.6) for x,z in picks if z>25),2))
print("all inside the bowl:", all(H(x,z)<=-0.7 for x,z in picks))
