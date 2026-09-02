# CLAUDE-hero.md — My Lego Super Hero: the suit, the cape and flight

> Split out of `CLAUDE.md` §5, which was 1091 lines and a third of it this subject.
> Same rules apply: durable facts, hard rules and the traps that have actually cost hours.
> NOT a changelog. Update in place.
> **No em dashes in copy.** Everything snaps to the stud grid, `PITCH = 0.36945`.

## The cape

**The cape.** A LEGO cape is one rigid moulded piece, so the cloth is done on the VERTICES, in
`buildCape` / `capeFrame`. The sheet swings about the hinge where it meets the collar by an angle
growing as `t^2` down the piece (so the top barely moves and the hem moves most, which is what a
hanging cloth does), with a wave travelling down it and a sideways flutter on top.

WHERE it points is not a number that grows with speed. It is solved from the real airflow: the
cape lies along GRAVITY PLUS DRAG in WORLD space, `CAPE_DRAG` 3.0 against `(v/FLY_SPD)^CAPE_POW`,
and that direction is then read back in the body's own frame as an angle off the body's DOWN.
`CAPE_POW` is 1.3 and NOT 2: a true square law is right in the air and dead on the ground, because
it is normalised against `FLY_SPD` 15 while a full run is 5, which is a ninth of the pull. 1.3
leaves the top of the range untouched (15/15 to any power is 1, so every flight state below is
exactly as measured) and gives the ground something. And the LEGS put a floor under it, `CAPE_KICK`
0.45 of the rearmost hip angle, because a leg swung back goes exactly where the cape hangs. That
floor is guarded on `kick > 0`: a bare `Math.max` against zero would also clamp away the NEGATIVE
half of the swing, and that half is load bearing.

    state                     cape swing        wave
                              before   now      before  now
    walking                    6 deg   18 deg   0.101   0.149
    running                   18 deg   36 deg   0.162   0.250
    leaping straight up        0 deg   19 deg   0.030   0.250
    landing beat               0 deg   14 deg   0.030   0.030
    flying forward, top speed -8 deg   -8 deg   0.162   0.250

On foot the wave also reads the FULL speed rather than the flat one, or a leap straight up is a
cape that does not move at all.
Growing a fixed lift off his back with speed is wrong in exactly the case that matters, because at
speed the body is pitched 79 degrees forward and "up off his back" IS straight up in the world: the
cape stood on end behind a figure lying flat. Solved from the airflow instead it comes out at 18
degrees below horizontal and BEHIND him at top speed, straight down at a hover (the aim cancels the
hover pitch exactly), 72 degrees down and behind at a run, and straight down while climbing. The
negative half of the swing is clamped short at -0.25 so the cape can never fold through his chest,
which is why a fast straight-down drop reads as the cape blown up behind him rather than hanging.

**The legs used to come out through it.** With the cape hanging straight down, which is what a
leap gives (going up, drag reinforces gravity), the split leap's 0.75 rad clears the fabric by only
0.066, and the wave eats that: at its forward extreme the boot is 0.077 THROUGH the back of the
cape. `CAPE_KICK` 0.45 of the leg's own angle leaves 0.10 to 0.24 of clearance across the whole
cycle, and is also just what a cape does when you kick into it.
Three things then make it safe, all measured off the piece and none assumed:

- **The axes are DERIVED.** `hero_suit.glb` came out of Blender Z-UP, so every mesh node carries a
  -90 degree X rotation and each geometry's local +Z is the figure's UP while its local +Y is the
  figure's BACK. Deforming on the raw local y and z swung the cape about an axis running through
  it sideways, which is what dragged the neck ring out of shape. `UP` and `BACK` are now read off
  the mesh's own matrix, so any re-export from either handedness lands the same.
- **The neck ring is PINNED.** It is what clips onto the torso and must not move by a vertex:
  measured, the ring sits in the top 1% of the height with an inner radius of 0.19026 about its own
  centre. Pinning the top 11% puts the boundary 0.12 clear below the ring's underside. Verified by
  transforming the real geometry through six states from a hang to a 2.5 rad overdrive: the inner
  radius stays 0.19026 to 0.00e+00 and every ring vertex moves exactly zero.
- **Every vertex has its own CEILING.** `amax[i]` is the angle at which that vertex would rise
  level with the hinge, precomputed once off the rest pose (one `atan2`, never per frame), and the
  swing saturates into it with a `tanh` rather than clamping, so the sheet still curves instead of
  flattening into a fan. Nothing can ever swing up past his shoulders and into the neck.

The HINGE is the sheet's own top row, found as the highest vertex that is not pinned and then the
centroid of the band just under it. A FIXED band below the pin line came back EMPTY on this piece
(it has a gap in y there), which put the hinge at the origin below the whole cape, made every
vertex read as above it, collapsed the per-vertex ceiling to its 0.05 floor and stopped the cape
moving at all. A derived boundary has to be able to find something. Normals are turned by the same
angle rather than recomputed, because `hero_cape` is unwelded and `computeVertexNormals()` would
flat-shade a piece that ships smooth. `__hero.cape().hole` reports the ring's rest radius against
its live one; they have to be the same number. The material is the one thing in the Realm `polish()` is
wrong for: its 0.38 roughness ceiling and 0.5 env make a cape read as sheet plastic, so it is
overridden to 0.94 / envBase 0.04 / DoubleSide (the inside shows the moment it lifts). Its own
`Black` material is used by nothing else, so no clone is needed. Live on `__hero.cape()`.

## The suit, the head and flight

**My Lego Super Hero.** The suit stands on DISPLAY in the mansion's upstairs room and **E** takes
it; from then on the figure has a second body. **THE PIRATE CHEST IS SCENERY** (user, 2026-09-02):
it was the unlock and the place you changed back, and both are gone, `chestAt` / `inspectChest` /
its E prompt / its touch button with them. The PROP stays exactly where it is, lid open and money
bricks in it, and `zap()` still crackles on the bridge approach (`ZAP_ZONE`), kept now as the
derelict's own noise rather than as a tell.
**PUTTING THE SUIT ON HANDS THE GHOST BODY BACK TO THE BONES**, and `ghostUnlocked` goes with it, so
the seated skeleton is once again the only place a ghost can be had. That is the shape of the thing:
a ghost is how you GET up to the suit, since the upstairs has no stairs and a civilian cannot fly,
so you give the shroud back at the moment you take the armour. `returnGhostBody()` does it and
`suitOn()` is the one door the suit goes on through (`takeSuit` and `wearOutfit('hero')` both route
through it), so the handback cannot be walked around. It is deliberately NOT symmetric: taking the
SUIT off with `T` leaves the suit yours, because its display is one-shot and there is nowhere to
fetch it from, while the bones sit in the cave and can always be gone back to. `hero_suit.glb` is the Mysterio minifig from the blend, everything below the neck
(torso, waist, arms, hands, legs, cape, back plate), `hero_hair.glb` is the Joker hairpiece
recoloured to the exact `baseColorFactor` the shipped `hair.glb` carries, and `hero_head.glb` is
his own head (below).

**His colours: an IRON MAN suit out of a Mysterio one.** The palette is baked into the suit's seven
TEXTURES (three 16x16 flat swatches for cape, arms and gloves, four 1024 detail maps for the trim,
the glass detail and the black print), so the recolour happens in the SHADER, via `onBeforeCompile`
on each material. That is a deliberate choice against the two alternatives: a pixel pass at load is
3.67M texels and most of a second of JavaScript, and editing the glb means a Blender round trip,
which RENAMES NODES, and `buildHero()` reads those names to find the torso, the arms and the cape.
In the shader it is a few ops per pixel, the asset is never touched, and the palette is a list of
hex values in the file, live on `__hero.colours()`.

Measured over those 3.67M texels: green 72.3%, black 6.7%, gold 5.9%, magenta 5.8%, and a light
blue at 1.07% that a 1.5% cut had missed entirely. Five keys, so ten unrolled pairs:

    #004022 green   -> #414952  dark steel      (the body)
    #D31593 magenta -> #C6CBD1  silver          (cape and trim)
    #D4B039 gold    -> #1B1D21  carbon black    (gloves and trim)
    #91C9D8 blue    -> #3FC8FF  electric blue, GLOWING
    #000000 print   -> unchanged
    head's #FAFAFA  -> #3FC8FF  the eyes, glowing with the suit

Each pixel is remapped ALONG the segment between the two keys it sits between, never snapped to the
nearest, or every trim edge goes jagged. The same interpolation gives the GLOW its weight free, so
the blue fades across its own antialiased border. Verified against the real textures: every key hits
its target exactly and glow is 1.00 on the two intended colours and 0.00 everywhere else. The glow
is added to `totalEmissiveRadiance` at `<emissivemap_fragment>` at `GLOW_AMT` 3.4, which clears the
pipeline's 1.7 linear bloom threshold so it actually blooms, and being emissive it does not dim with
the day cycle.

The GLSL is deliberately PRIMITIVE: no loop, no uniform array indexed by a variable, no comma
operator. GLSL ES 1.00 only allows a constant-index-expression into a uniform array, so indexing one
with a function parameter fails to compile on WebGL1, which is the path touch and `#nopipe` take.
**It is the one thing in the Realm that cannot be verified without a GPU** (the pane has no WebGL and
there is no glslang on the machine): if it ever fails to compile the symptom is a black suit and a
console error, and `#noshade` skips the whole injection.

`polish()` gives every LEGO material metalness 0 and a 0.38 roughness ceiling, which is right for ABS
and wrong for armour, so the plate takes metalness 0.90 / roughness 0.34 / envBase 1.30. Not a full
1.0: at metalness 1 the diffuse is gone entirely and a dark steel plate reads as a black hole between
highlights. The CAPE is the exception, 0.50 / 0.70 / 0.35, because it still has to read as fabric.
Live on `__hero.metal()`.

**Putting it on sounds like armour.** `suitOnSfx()`: seven plates landing and ACCELERATING (0.055s
apart, closing by 0.86 each time, so it reads as a sequence completing rather than a rattle), each a
broadband clack plus two inharmonic partials, which is what separates struck metal from a wooden
knock; a servo sawtooth sweeping up under them and stopping when they stop; then two detuned sines
for the reactor, arriving last and staying. 6.7x a footstep in mean power over 1.16s, peak 0.200,
which puts it just above a landing and well under the chest's arc at 22.5.

**The hero's head.** Cut from a Hulk head in the live blend and RECOLOURED off its 512 texture
rather than tinted at runtime: the base green became the figure's own skin `#C68B5E`, the black
print stayed, a dark green print went to black. Every pixel is remapped ALONG the segment between
the two key colours it sits between, never snapped to the nearest, which is what keeps the eye and
mouth edges clean.
Three traps, all of which bite again on any re-export. **WELD BEFORE YOU SMOOTH**: the Sketchfab
source ships unwelded, 2225 vertices over 506 distinct positions, so nearly every triangle is its
own island and `shade_smooth` at any angle does nothing at all. **Write creases onto
`edge.use_edge_sharp`**, not `shade_smooth_by_angle`, whose modifier the glTF export does not carry
(60 degrees; the dihedral distribution is bimodal, so anything from 40 to 60 picks the same 192
edges). **Do NOT add it to `civMeshes`**, which is the MEASURING set the suit's collar is sized
against: a head in there drags that collar up to the crown. `headSet` is tagged `civPart` directly
and `wearHero` reads tags off a live traverse, so tagging is all that is needed.
It is fitted into the CIVILIAN HEAD'S OWN BOX, uniform scale to its height then seated so the necks
coincide, so neither the collar nor the hairpiece seat has to be re-solved. It lands 5% narrower,
which is the safe direction: the hairpiece sits marginally loose rather than clipping.

Nothing about either piece is hardcoded to a size. The suit is fitted by MEASUREMENT in
`buildHero()`: scaled COLLAR to COLLAR (`collarY()`, the top of everything within 55% of a body's
widest radius) against the civilian body, then seated so its neck stud lands under the head that is
staying on. Do NOT size it stud to stud: the suit's neck stud is 0.274 of its torso and the
figure's neck post only 0.160, so matching those leaves the collar 0.039 low and the bare tan neck
shows as a gap under the chin. Collar anchoring puts the suit's collar at 1.3617 against a head
bottom of 1.3647, which is the civilian figure's own neckline to within 0.003. Its LEGS are
`attach()`ed to the SAME `hipL/hipR` pivots the walk already drives, so the waddle and the split
jump pose carry over free. Its ARMS get their own, `hShL/hShR`, and the distinction matters: the
civilian shoulder pivot is pinned at the top EDGE of the civilian arm, which is right for a quarter
radian of walk swing and wrong for the flight raise's 2.14, where the whole shoulder cap swings
0.175 clear of the torso and the arms visibly leave their sockets. `armHinge()` reads the shoulder
peg off each suit arm instead (the peg is the only thing reaching the innermost tenth of the piece,
so the centre of what that slice spans in y and z IS the axis; stable to 0.011 over slice fractions
from 6% to 20%) and the pivot goes on that. It sits 0.0995 from the civilian one, hence the visible
break. `hShL/hShR` copy `shL/shR` every frame, so there is still one place the arm pose is decided.
Left and right come from where each piece actually sits, never from the exported name. Three traps are handled explicitly and will bite again if the fit is
rewritten: the civilian HAIRPIECE is above the neck and must be excluded from the height the suit
is sized against; the hip/shoulder pivots are live, so the fit zeroes them and restores them around
the measurement or a mid-stride load puts the feet underground; and the hide list must be captured
BEFORE the rig runs, because `attach()` reparents the limbs off `heroSuit` (see §7). Wearing and
removing the suit is driven by `userData.heroPart` / `userData.civPart` read from a live traverse
of `figBody`, never from the capture-time arrays, so no later reparenting can strand a piece.

The hairpiece is seated off the head's stud in `seatHeroHair()`, from constants measured off the
piece itself (cavity axis `(0.0210, 0.0071)`, radius `0.2191`, ceiling `y 2.0530`), dropped by
`HH_DROP` 0.052, which is the figure's measured STUD HEIGHT (its head shell tops out at y 1.770 and
the stud runs on to 1.822). A hairpiece rests its cavity ceiling on the DOME and swallows the stud,
so seating that ceiling at the stud top instead leaves the whole piece riding a stud high. The full
stud height then seats it too DEEP and buries the brows, so the shipped value is 0.025, half way.
Lower value = the hair sits higher. The spin comes from `HH_NAPE`, also measured: for each bearing
take the lowest point of the outer shell (r > 1.15*cavR, excluding the cavity wall); a hairpiece is
cut high at the forehead and hangs low at the nape, and this piece's nape and its furthest reach
both sit at +90 degrees. Nothing about the orientation depends on a runtime inference any more. Measure a
cavity from INWARD-FACING faces about the cavity axis, never from a min-radius scan: this piece has
locks hanging near the axis that read as a 0.139 socket and give a hairpiece 2.5x too big. The
civilian piece measures 0.2202 the same way, i.e. the two are the same standard head socket to
within half a percent, so the hero piece takes the civilian's already-approved scale times that
ratio, then `HH_TRIM` 0.97 to taste (0.94 read a little small). The sweep runs down the piece's own
+X and is spun to the BACK, which the suit's own cape identifies at runtime. `HH_SIDE` 0.008 then
slides the seated piece across the head, applied AFTER the spin so it is a slide and not a swing
about the cavity axis: the figure faces +Z in model space (its cape sits at -Z, which is what
`backSign` records), so +X is the character's LEFT, i.e. your right while you look at its face.
0.008 against a head radius of about 0.28 is a ~3% shift. Live on `__hero.side()`.

**Flight steering.** The mouse flies it, and in the air the PITCH pulls 1.8x harder
(`PITCH_FLY_SENS`, live on `__hero.look()`). That is a consequence, not a preference: on foot the
pitch runs 0.06 to 1.2, which is 1.14 rad and 175 pixels of drag at `SENS`; opening the range to
-0.85 in flight means the same 175 pixels buy barely half the sky, so the aim goes heavy exactly
where it is doing the steering. 1.8 is the ratio of the two ranges, so a full sweep costs the same
drag in both. Pitch only: yaw's range never changed. On foot the camera may only look DOWN (`camPitch`
0.06..1.2) and that clamp is exactly why aiming upward was impossible; in the air `clampPitch`
opens the range to `PITCH_UP` -0.85, and that negative half is what the mouse climbs with. The
forward axis then tilts with the camera (`fV` scaled by `cos(camPitch)`, vertical `-sin`), so W
flies where you are LOOKING; strafe stays level so sideways input never fights the aim. A 0.10 rad
dead zone around level stops the resting aim of +0.06 from sinking you the whole time you think
you are flying straight. The torso is aimed down the FLIGHT PATH, not along the ground speed: the
lean flattens with `spd3` (speed through the air, since a vertical climb barely moves you in x/z)
and the climb angle then tips it back up or further over on a dive, clamped to [-0.6, 2.1]. A
camera aimed upward sits BELOW the player (`cy = player.y + 0.6 + camDist*sin(camPitch)`), and in
flight that is most of the time, so it is held off the ground the same way the figure is, by
`camFloorY()`. The old guard asked `surfaceBelow()` and SKIPPED the clamp when that came back null,
which over open ground is almost everywhere: `floorH` only holds cells some loader rasterized and
the tile plate is not one of them. That is exactly why the walk falls back to 0 for its own floor,
and the camera now falls back the same way. It was not a near miss. At the default `camDist` 8.45
and a full up-aim the camera was under the plate for any player height below 6.25, by 4.25 at y=2;
zoomed out to 16 it went under below y=11.92, by nearly 11 units at y=2. The clamp is applied to the
TARGET and then again to the EASED position, because the camera only closes a fifth of the gap each
frame and on a fast low pass it lags under the plate on its own account.

**Speed and take-off.** `FLY_SPD` 15.0 against a 5.0 run, `FLY_CLIMB` 6.5. Everything that reads
speed normalises against `FLY_SPD` (the body pitch, the arm raise, the cape), so those two numbers
are the only ones to touch, live on `__hero.speed()`. Flight also builds and sheds speed on a
slower ease than the walk (5.5 against 12): at 15 units an instant top speed reads as a teleport,
and the ramp is most of what makes it feel like thrust. The VERTICAL is eased TWICE, through
`climbIn` and then `velY`. A key is a step function and a single exponential on a step is at its
steepest the instant it starts, so Space put the climb rate most of the way there inside three
frames: two eases in series start at zero slope, and that is the difference between a swell and a
jerk. Both rates come off `FLY_EASE` 2.8, live on `__hero.ease()`.

**The flight POSE, which is where the jitter was.** Four rules, each fixing a snap you can see.
The lean flattens with FORWARD speed, not airspeed: a body lies flat because it is travelling
forwards, and drifting straight up or down is no reason to lie down. The climb angle is WEIGHTED BY
AIRSPEED (squared) rather than gated, because `asin(velY/spd3)` is exactly +-90 degrees for ANY
purely vertical movement however gentle (`velY` IS the whole of `spd3`), so the old `spd3 > 0.6`
guard cut 90 degrees to zero in ONE FRAME the moment a drift died; hovering swung the pose 154.7
degrees against 12.0 once the term fades in instead. The FLARE is eased fast-down slow-up, because
the floor it measures is a raycast that steps a whole storey when a roof slides under it. `poseVY`
eases `velY` for the same reason: raw, a tap of Space whips the torso 40 degrees in three frames.
**The walk's BOB is faded out in the air and a HOVER FLOAT replaces it**, and the difference is the
point: the float fades with SPEED, not with flight, because he is holding himself up rather than
standing on anything. 0.07 either way at 0.28 Hz at a standstill, squared against `HOVER_REF` 2.5
so it is gone by 2.5 units a second. Travel does not bounce; a hover breathes. Live on
`__hero.hover()`.
**Take-off is a 0.13s COIL then one hard pop** (`TAKE_POP` 11). Without the coil a launch is an
elevator, because the flare holds the flight silhouette off until he is 1.25 up. The coil is the
LANDING crouch exactly, the only crouch a rigid-legged minifig has. The launch pose is gated on
`agl/0.12` so it is never at full strength with his feet still down, and pressing F again during
the coil zeroes `takeT` or it plays out on the ground. Live on `__hero.take()`.

**Coming down.** Two separate mechanisms, and the first is not cosmetic. `figBody` turns about the
figure's FEET, so a flight pitch past 90 degrees puts the head below the ground the feet stand on.
A held Shift descent is exactly that: no forward speed means a -90 climb angle, the pitch pins at
its 2.1 rad ceiling, and the suit's lowest vertex sits 0.72 BELOW its own feet (0.14 at the 1.38
travelling pitch, 0.04 even at 0.6). Nothing was wrong with the collision, the root never left the
surface. So the flight silhouette is scaled by a FLARE, `agl/FLY_FLARE` (1.25) off the floor the
flight is resolved against (the roof, when hovering over one), and he is upright before his feet
arrive. Then a LANDING beat, `LAND_T` 0.52, strength from the impact speed: torso 15 degrees
forward, both legs trailing at 31 and 23 degrees, arms swept back, `LAND_DUCK` 0.012 the only
downward move. Both legs trail rather than one striding forward because a forward lean pushes
anything AHEAD of the ankle through the plate; and the angles are large deliberately, since a rigid
minifig leg lifts its ankle by 0.57(1-cos) while dropping its 0.165 toe by 0.165 sin, so the boot
bottoms out around a QUARTER radian and clears either side of it. Verified by transforming the real
leg geometry: the lowest vertex at the deepest frame is +0.0155 (suit) / +0.0082 (civilian), against
+0.044 for a full running stride. The beat also fires when `F` lands you from a height, so a fall
out of flight is never the one arrival with no landing. All of it is live on `__hero.flare()` and
`__hero.land(secs,pitch,duck,leg,arm)`.

**The high hop.** Space stays the hop it always was and only goes higher in the suit: `HERO_LEAP`
9.5 against the civilian 4.4, and since gravity is 16 the peak is `v*v/32`, so 2.82 units against
0.61, about seven and a half studs. The split leap pose and the landing beat both already existed
and both carry over, the beat off its own `heroLeapt` flag so an ordinary hop in civilian clothes
still lands the way it always did. It borrows `launchSfx` at 0.6 and WITHOUT the rising sweep, which
belongs to leaving: a hop comes back down, so it gets the scuff and the thump only. Collision is
unchanged, so it cannot clear a wall: `solidCells` is a 2D grid sampled at body height and blocks at
every altitude. Live on `__hero.leap()`.

**Take-off levels the aim, and landing waits.** Two things that together made flight unusable, and
neither is obvious from the code. On foot the camera may only ever look DOWN, so `camPitch` is
resting somewhere around 0.24 when he leaves the ground, and "W flies where you look" then means W
flies into the plate: measured, 2.09 units a second of sink, and from a launch apex of about 1.5
that is back on the ground in 0.71s. On top of that a landing COMMITTED on any floor contact. Held
W from a standing take-off: apex 2.07, landed again at 1.97s, which is the whole of flying. So the
launch now eases the aim to level while `takeT` runs (gently, at 4, and it stands down entirely
while `drag` is true so it can never fight a hand on the mouse), and a landing needs a DELIBERATE
arrival: Shift answers immediately, otherwise his feet have to stay down for `GROUND_HOLD` 0.45,
which also means a low pass can skim. Same simulated input after both: apex 3.22 and still flying.
Levelling the aim is the load-bearing half. The hold alone only moved the landing from 1.97s to
2.42s. Live on `__hero.hold()`.

## Open, moved out of CLAUDE.md §8

- **The suit is a licensed costume.** `hero_suit.glb` is a Mysterio minifig and `hero_hair.glb` a
  Joker hairpiece, both from a Sketchfab import, which sits against the "no copyrighted characters"
  rule in §3. Shipped at Shyon's explicit request; flagged here so it is a decision, not a slip.
