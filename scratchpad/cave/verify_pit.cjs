// Replays the SHIPPED pit against the running Realm: the hole's geometry, the four steps, the
// walls from both sides, the cave's seating and its arch, and the flowers/trees round it.
const {main}=require('./../cdp.cjs');
main(async ({evaluate,sleep,logs})=>{
  for(let i=0;i<240;i++){ if(await evaluate('!!(window.__pit && window.__cave)')) break; await sleep(500); }
  const err=logs.filter(l=>/EXCEPTION|error:/i.test(l));
  if(err.length) console.log('CONSOLE PROBLEMS:\n  '+err.join('\n  ')+'\n');
  await evaluate('__D.renderer.setSize(64,64,false); __D.scene.visible=false; 1');   // frames cost nothing with nothing to draw; the walk math is unaffected
  let fails=0; const ok=(n,c,x)=>{ if(!c){fails++;console.log('  FAIL  '+n+(x?'   '+x:''));} else console.log('  pass  '+n+(x?'   '+x:'')); };
  const num=v=>+(v).toFixed(4);

  const P=await evaluate('__pit'), C=await evaluate('({box:{min:__cave.box.min,max:__cave.box.max},floor:__cave.floor,depth:__cave.depth,proud:__cave.proud,cells:__cave.cells,pos:__cave.holder.position,scale:__cave.holder.scale.x,rot:__cave.holder.rotation.y})');
  console.log('PIT  trench x %s..%s  z %s..%s', ...P.tr.map(num));
  console.log('     chamber x %s..%s  z %s..%s', ...P.ch.map(num));
  console.log('     course %s  courses %d  floor %s  depth %s', num(P.course), P.courses, num(P.floor), num(-P.floor));
  console.log('     steps  %s', P.step.map(s=>'z<'+num(s[0])+' -> '+num(s[1])).join('   '));
  console.log('     pieces  %d floor plates, %d wall plates', P.floors, P.walls);
  console.log('CAVE pos %s,%s  y %s  scale %s  rotY %s', num(C.pos.x), num(C.pos.z), num(C.pos.y), num(C.scale), num(C.rot));
  console.log('     box x %s..%s  y %s..%s  z %s..%s\n',
    num(C.box.min.x),num(C.box.max.x),num(C.box.min.y),num(C.box.max.y),num(C.box.min.z),num(C.box.max.z));

  console.log('1. the hole and its steps');
  ok('four risers, each 5 courses', Math.abs(P.step[0][1]+5*P.course)<1e-9 && Math.abs(P.step[1][1]+10*P.course)<1e-9
      && Math.abs(P.step[2][1]+15*P.course)<1e-9 && Math.abs(P.floor+20*P.course)<1e-9,
      'rise='+num(5*P.course));
  const g=async(x,z)=>evaluate(`+__D.ground(${x},${z}).toFixed(5)`);
  const cx=(P.tr[0]+P.tr[1])/2;
  const probes=[[cx,13.10,0],[cx,13.90,-5],[cx,14.60,-5],[cx,15.30,-10],[cx,16.10,-10],
                [cx,16.80,-15],[cx,17.60,-15],[cx,18.30,-20],[cx,19.00,-20],[cx,21.00,-20],[cx,22.60,0]];
  for(const [x,z,k] of probes){ const y=await g(x,z);
    ok('ground at z '+z+' is '+(k?k+' courses down':'the lawn'), Math.abs(y-k*P.course)<1e-4, 'y='+y); }
  ok('lawn just west of the trench', Math.abs(await g(P.tr[0]-0.2, 15.5))<1e-9);
  ok('lawn just west of the chamber', Math.abs(await g(P.ch[0]-0.2, 20.0))<1e-9);
  ok('chamber floor beside the cave', Math.abs(await g(P.ch[0]+0.1, 20.0)-P.floor)<1e-4);

  console.log('\n2. the cave is seated on the pit floor and stands at scale 1');
  ok('scale is exactly 1', C.scale===1);
  ok('base plate stud tips ON the pit floor', Math.abs(C.pos.y+0.197-P.floor)<1e-9, 'y='+num(C.pos.y)+'  floor='+num(P.floor));
  ok('mouth faces -Z (rotY -PI/2)', Math.abs(C.rot+Math.PI/2)<1e-9);
  ok('cave is 6.287 wide across the trench', Math.abs((C.box.max.x-C.box.min.x)-6.2875)<0.01, 'w='+num(C.box.max.x-C.box.min.x));
  ok('cave is 3.151 deep along the trench', Math.abs((C.box.max.z-C.box.min.z)-3.1510)<0.01, 'd='+num(C.box.max.z-C.box.min.z));
  ok('its rock brow stands under half a unit proud of the lawn', C.proud>0.2 && C.proud<0.5, 'proud='+num(C.proud));
  ok('its mouth face is level with the chamber lip', Math.abs(C.box.min.z-P.ch[2])<0.10, 'mouth z='+num(C.box.min.z)+'  chamber z0='+num(P.ch[2]));
  ok('its flanks reach past the chamber walls (no slot beside it)', C.box.min.x<P.ch[0]+0.001 && C.box.max.x>P.ch[1]-0.001,
      'cave x '+num(C.box.min.x)+'..'+num(C.box.max.x)+'  chamber '+num(P.ch[0])+'..'+num(P.ch[1]));
  ok('its back reaches past the chamber wall (no slot behind it)', C.box.max.z>P.ch[3]-0.001,
      'cave back '+num(C.box.max.z)+'  chamber z1='+num(P.ch[3]));

  console.log('\n3. the walls, from both sides');
  const step=async(x,z,py)=>evaluate(`(()=>{ __D.tp(${x},${z}); __D.player.position.y=${py}; return __D.stepped(${x},${z}); })()`);
  // standing on the pit floor, everything outside the hole is a wall
  for(const [x,z,lbl] of [[P.tr[0]-0.3,15.5,'west of the trench'],[P.tr[1]+0.3,15.5,'east of the trench'],
                          [P.ch[0]-0.3,20.0,'west of the chamber'],[P.ch[1]+0.3,20.0,'east of the chamber'],
                          [cx,P.ch[3]+0.3,'north of the chamber']])
    ok('from the floor, '+lbl+' is a wall', await step(x,z,P.floor)===true);
  // from the lawn the same cells are ordinary grass
  for(const [x,z,lbl] of [[P.tr[0]-0.3,15.5,'west of the trench'],[P.ch[1]+0.3,20.0,'east of the chamber']])
    ok('from the lawn, '+lbl+' is walkable', await step(x,z,0)===false);
  // the four steps, climbed
  ok('step 1 -> lawn climbs out (stair zone)', await step(cx,13.20,-5*P.course)===false);
  ok('step 2 -> step 1 climbs', await step(cx,14.60,-10*P.course)===false);
  ok('step 3 -> step 2 climbs', await step(cx,16.10,-15*P.course)===false);
  ok('floor -> step 3 climbs', await step(cx,17.60,P.floor)===false);
  ok('the trench IS a stair zone', await evaluate(`__D.ground(${cx},15.5)<0`)===true);
  // and the same climb OUTSIDE a stair zone is refused: the chamber's own north wall
  ok('you cannot climb the chamber wall out onto the lawn', await step(cx,P.ch[3]+0.3,P.floor)===true);

  console.log('\n4. the cave is solid rock and a walkable interior');
  const inside=async(x,z)=>evaluate(`(()=>{ __D.player.position.y=${P.floor}; return __D.stepped(${x},${z}); })()`);
  ok('the cave mouth is open', await inside(C.pos.x, C.box.min.z+0.5)===false);
  ok('the tunnel centre is open', await inside(C.pos.x, C.pos.z)===false);
  ok('its west flank is rock', await inside(C.box.min.x+0.35, C.pos.z)===true);
  ok('its east flank is rock', await inside(C.box.max.x-0.35, C.pos.z)===true);

  console.log('\n5. the walk itself: down the trench and back');
  const walkY=await evaluate(`(()=>{ __D.tp(${cx},12.5); __D.player.position.y=0; const out=[];
     for(let s=0;s<8;s++){ __D.tp(${cx},12.5+s*1.1); for(let i=0;i<70;i++) __D.step(0.016);
       out.push([+(12.5+s*1.1).toFixed(2), +__D.player.position.y.toFixed(3)]); } return out; })()`);
  console.log('   ' + walkY.map(r=>'z'+r[0]+' y'+r[1]).join('  '));
  ok('he ends up on the pit floor', Math.abs(walkY[walkY.length-1][1]-P.floor)<0.02, 'y='+walkY[walkY.length-1][1]);
  ok('he never stands above the lawn on the way', walkY.every(r=>r[1]<=0.001));
  ok('the descent is monotonic', walkY.every((r,i)=>i===0||r[1]<=walkY[i-1][1]+1e-6));

  console.log('\n6. what is left round the hole');
  // distance to the HOLE, which is the union of the two rects, not to their bounding box: the
  // box would call a flower standing on plain lawn beside the trench "0 away".
  const near=await evaluate(`(()=>{ const P=__pit;
      const dr=(r,p)=>Math.hypot(Math.max(0,r[0]-p[0],p[0]-r[1]), Math.max(0,r[2]-p[1],p[1]-r[3]));
      const d=(p)=>Math.min(dr(P.tr,p), dr(P.ch,p));
      return { flowers:(window.__flowerSpots||[]).map(p=>[p[0],p[1],+d(p).toFixed(2)]).filter(p=>p[2]<8).sort((a,b)=>a[2]-b[2]),
               trees:(window.__treeSpots||[]).map(p=>[p[0],p[1],+d(p).toFixed(2)]).filter(p=>p[2]<12).sort((a,b)=>a[2]-b[2]),
               inHole:(window.__flowerSpots||[]).filter(p=>__D.ground(p[0],p[1])<0).length }; })()`);
  console.log('   flowers within 8 of the hole:', JSON.stringify(near.flowers));
  console.log('   trees within 12 of the hole:  ', JSON.stringify(near.trees));
  ok('no flower stands in the hole', near.inHole===0, 'in hole='+near.inHole);
  ok('at most two flowers within 3 of the lip', near.flowers.filter(f=>f[2]<3).length<=2,
      'n='+near.flowers.filter(f=>f[2]<3).length);
  ok('no tree trunk within 6 of the lip', near.trees.every(t=>t[2]>=6),
      'nearest='+(near.trees[0]?near.trees[0][2]:'none'));
  ok('a canopy (2.61) cannot reach the lip', near.trees.every(t=>t[2]>=2.61+0.6),
      'nearest='+(near.trees[0]?near.trees[0][2]:'none'));

  console.log('\n'+(fails? fails+' FAILURES':'all assertions passed'));
}, 'http://localhost:5199/lego.html');
