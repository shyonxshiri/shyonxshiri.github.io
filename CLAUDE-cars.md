# CLAUDE-cars.md — the four cars

> Split out of `CLAUDE.md` §5, which was 1091 lines and a third of it per-asset detail.
> Same rules apply: durable facts, hard rules and the traps that have actually cost hours.
> NOT a changelog. Update in place.
> **No em dashes in copy.** Everything snaps to the stud grid, `PITCH = 0.36945`.

**ALL FOUR CARS RUN ONE MATERIAL STANDARD** (`CAR_ABS` / `CAR_LENS` / `carStandard()`, above
`loadProp`), because they came from three export paths on three different finishes and read as
different toys in one driveway. Measured off the shipped files: Porsche 0.600 and Corvette 0.664
roughness, both capped by `polish()` to 0.38; Countach bodywork 0.100 KEPT while its own dark grey
and its tyres cap to 0.38; Aston bodywork 0.0734 KEPT while everything else on that car caps to
0.38. `polish()` cannot fix this because it only pulls roughness DOWN to a ceiling and these files
disagree below it, so the cars are PINNED here instead: bodywork, trim and tyres all take
**roughness 0.22, metalness 0, envBase 0.62**. The Aston's split is what actually read as flat, a
near-mirror shell with dull sills and dull wheels around it.
`carStandard(model, lensMap)` is called FIRST in each car's `onload`; the rims, the tyre tints and
every `tintByBoxes` clone are deliberate departures and land on top of it (rims tag themselves
`userData.carTier='rim'` so the live dial leaves them alone). **A TYRE TIER IS NOT REACHABLE**: only
the Countach ships a tyre-only material, the other three share it with the bumpers and every black
trim brick, so a rubber tier would exist on one car in four.
The LENS tiers are red / amber / clear / glass. A lamp is DoubleSide (a small trans brick drawn
FrontSide barely draws at all: on the Countach, taking the clear lens 0.40 to 1.00 moved it seven
levels of sRGB while DoubleSide TRIPLED the drawn area, 7,345 px to 21,669); a WINDOW stays
FrontSide, because both faces blending compound toward white, and keeps its own moulded opacity
(Porsche smoke 0.70, Corvette 0.50, Countach 0.25). Lamps come off the mirror at roughness 0.30 /
envBase 0.32, or a curved trans-red piece reflects the sky and reads white; the clear lens keeps
the full 0.08 gloss.
**COLOUR IS PART OF THE TIER**, and it had to be. The three builds disagreed wildly on trans-red:
Aston 1.000/0.000/0.000 linear, Countach 0.479/0.020/0.000, Porsche 0.333/0.000/0.005, and measured
AS RENDERED from behind each parked car that was Aston sRGB (201,68,47), Porsche (138,28,31) and
Countach (50,32,38), which is not a red lamp, it is a dark grey one. All three now take real LEGO
Trans-Red #C91A09 (amber #F08F1C, clear #FCFCFC).
**AND THE RED AND AMBER TIERS GLOW A LITTLE**, `em` 0.45, which is the one addition rather than a
repair. Trans-Red is 0.578 linear against the Aston's clipped 1.000, so putting all three on the
honest colour DIMMED the one car whose tail already read right, (201,68,47) to (173,53,41). The
glow is an emissive of the lens's own hue, taken off the colour AFTER it is set so the two cannot
drift; it puts the Aston back to (189,63,45) and carries the Porsche to (185,41,16) rather than
special-casing one car. 0.45 x 0.578 = 0.26 linear, well under the pipeline's 1.7 bloom threshold,
so a lamp lifts and never blooms, and `applyTOD` touches only `envMapIntensity` and the crystal's
`emissiveIntensity`, so **the tail lamps stay lit at night**. That is deliberate. Live on
`__cars.abs(rough, env)`, `__cars.lens(tier, op, rough, env)`, `__cars.glow(amount)` and
`__cars.report()`.
The Countach's two tail lamps are 1x1 CONES and stay the dimmest of the three whatever the material
says, (61,36,42): that is how few pixels two cones cover on a black car, not a finish.

**The two cars are matched by BRICK SCALE, not by the world grid.** Both are Mecabricks MOCs with a
measurable lattice: the Porsche's is 0.349795 (parts at 0.34662 / 0.69640 / 1.04781 / 1.39605 /
1.74594 / 2.09582 for 1..6 studs), the Corvette's 0.326147 (0.64828 / 0.97441 / 1.30057 for 2..4).
The Porsche's approved `targetLen` 5.6 over its 6.750582 length renders its studs at 0.29018, only
0.785 of `PITCH`, so scaling the Corvette by `PITCH/0.326147` DID put it on the grid and that is
precisely what made it wrong: 6.564 x 2.595 x 2.065 against the Porsche's 5.600 x 2.303 x 1.617,
27% bigger everywhere. It is now `targetLen` 5.1653 (0.29018 / 0.326147 = 0.88971), landing
5.165 x 2.042 x 1.625, so the two roofs line up and it reads as the shorter build it is (17.8
stud-pitches to the Porsche's 19.3). Re-measure BOTH pitches after any re-export.
**The third car is a BLACK Countach with gold rims**, `lamborghini.glb`, on the second car pad at
`pos [46.92,9.04]`, `rotY` 0, `targetLen` **5.3298**, nose down -x like the other two.
**It is sized on its WHEEL, not on its stud pitch**, and the two are different answers. Tyres are
measured IN THE LIVE SCENE (world units are the only frame two cars compare in) by the tangent
circle a tread must satisfy about its contact patch, `R = (dx^2+h^2)/2h`, taking the mode: it agrees
across all four wheels of a car to four decimals. Porsche **0.83292**, Corvette **1.11762**,
Countach 0.87823 before this pass. In each car's own rendered studs that is 2.902 / 3.852 / 3.027,
i.e. about 23.2, 30.8 and 24.2mm of real LEGO, and the Corvette landing on the real 30.4mm LEGO
wheel to 1.3% is what proves the method. The Corvette is left alone: it IS built on a bigger tyre.
Two errors had put the Countach 5.4% over the Porsche's wheel and they compounded.
· **The Porsche's live scale is 0.820558, not 5.6/6.750582 = 0.829556.** `loadProp` takes its box
  AFTER the holder rotation, and the Porsche carries `rotY` -0.015, so `targetLen` divides by the
  ROTATED box (6.82461). Its rendered stud is 0.287027, not the 0.29018 the file used to claim.
  **Anything solving a scale off another prop must read that prop's LIVE `holder.scale`.**
· The other 4.3% is real: **the two builds are on different tyres**, 23.2mm against 24.2mm, so
  matching the stud and matching the wheel cannot both be had.
The wheel wins, because a stud is read against the studs on the SAME car while a wheel is read
against the car parked a body's width away. 0.83292 / 1.037251 raw = 0.803008, so
6.637295 x 0.803008 is `targetLen` 5.3298, landing 5.330 x 2.521 x 1.619 against the Porsche's live
body 5.539 x 2.278 x 1.600 (the Porsche's own Box3 reads 5.600 x 2.330 only because of that yaw).
Measured back in engine: all four Countach tyres 0.83256..0.83303 against the Porsche's 0.832920,
0.016% apart. It is now the SHORTER car, which is right, and still the wider; its glasshouse tops
out at 1.512 and only the REAR WING reaches 1.619, 0.019 proud of the Porsche's roofline.
Its pitch is still 0.342724 (this build NAMES its parts, so the lattice is fitted rather than
inferred: dim = N*p over every Plate / Flat Tile / Brick carrying its own stud count, across
N = 1,2,3,4,6 with 88 inliers, and the 3.7675 wheelbase checks it at 11 pitches to 0.07%), it is
simply no longer what the scale is solved on. Rendered it is 0.275210, 4.1% under the Porsche's.
Parked x 44.255..49.585 against the Porsche's 44.120..49.720, z 7.606..10.127, 2.01 clear of the
Porsche's flank. The nose sits 0.135 behind the Porsche's and stays there: `holder.position` runs
through `snap()`, so `pos` x moves only in whole stud pitches and 46.92 is already the nearest.
**Its light lenses are on the shared standard above**, six pieces: four `Lego_Transparent_White` at
the nose (`6220959` Brick 1x1 outboard plus `6252041` Plate 1x1 inboard per lamp, laid flush into
the nose deck as closed pop-up covers) and two `Lego_Transparent_Red` `6337596` Cone 1x1 at the
tail. `Lego_Transparent_Brown` is the side and rear GLASS, measured (x 0.354..1.975, reaching
y 1.633), so it takes the window tier and keeps 0.25, and so does the windscreen.
**The Porsche could never be matched on alpha, because it has a REFLECTOR behind its lens and
this car does not.** 78.8% of the Porsche lens's outward area lands on `MB309`, a 0.617 light grey
plate; 100% of the Countach's lands on the printed nose panel, which its black repaint took to
#05131D. So copying the Porsche's alpha numbers failed, and the tier is built out of DoubleSide and
colour instead. Winding, normals and the matrix determinant were all checked first and are clean,
so none of them is the explanation.
`scratchpad/lambo/export_lambo.py` axis-aligns and centres it (the nose is DERIVED from the light
lenses, clear at one end and red at the other, not hardcoded), splits the four wheel-rim tiles onto
their own material clone `Texture_Rim`, and joins the 254 named parts into one mesh per material:
14 draw calls, 2.4MB Draco. The colours are done in the LOADER so they stay tunable, and three of
them are not what they look like.
· **The model's own `Lego_Black` is NOT black.** It ships as linear 0.00857 / 0.00030 / 0.01600,
  i.e. sRGB (23, 1, 34), a dark PURPLE with more blue than red and no green. Painting the white
  with it, which is the read-it-from-the-model rule the Corvette uses, gave a violet car, so
  `Lego_White`, `346001_-_Plate_1x8_01__0` and `Lego_Black` itself all take real LEGO Black
  #05131D. `Lego_Black__Wheels` is left alone: a genuinely neutral near-black, correct for tyres.
· **A third of the white bodywork is a TEXTURE, not a colour.** 13 parts (nose, front fenders,
  sills, a rear quarter) draw off a shared 2048 atlas of decals printed on white, and no material
  colour can black those out without multiplying the prints away with them. The atlas is rebuilt by
  `recolour_atlas.py` as the same decals printed on a BLACK brick, in one line of compositing:
  `p' = p - (1-a)*(W-B)` with `a = 1 - min(R,G,B)`. Exact at both ends (pure white goes to B, a
  black print does not move) and continuous between, so every print's antialiased border rolls onto
  the new black instead of leaving the halo a threshold or a nearest-key snap would. The gold
  Lamborghini shield and the red flag survive; black-on-white grille prints do not, which is also
  what a real black printed brick does. THAT SCRIPT'S BLACK AND `lego.html`'S ARE THE SAME #05131D
  AND MUST MOVE TOGETHER. The rim and the windscreen keep the ORIGINAL atlas, which is the whole
  reason the rim needed its own material.
· **The windscreen's transparency was a TRANSMISSION MAP.** Its base alpha is 1.0 across every one
  of its UVs, and three r128 has no `KHR_materials_transmission`, so exported untouched it is an
  opaque white slab. The export gives it alphaMode BLEND at 0.25, the alpha this model's own trans
  bricks carry, and `polish()` then catches it on `m.transparent` and puts it on the ordinary LEGO
  glass path with every other window in the Realm.
The rims take gold's REFLECTANCE, not a gold swatch. Above metalness 0.9 the colour stops being a
diffuse tint and becomes F0, so the value is gold's measured linear 1.00 / 0.71 / 0.29 (`0xFFB54A`
set RAW, as the Porsche's rim silver is), metalness 0.90, roughness 0.15, envBase 1.15. `#D4AF37`
read as linear is 0.83 / 0.69 / 0.22, only 1.21 red over green against gold's 1.41, and rendered a
pale khaki. The gold multiplies the rim's own map, so the printed spokes stay dark rather than being
painted flat. Verified without a GPU: all 14 primitives are wound WITH their normals (0.00000
reversed over 474.55 units of area, so no `fixWinding`, the opposite of the Corvette) and the
baseColorFactors are already LINEAR (so no sRGB conversion, also the opposite of the Corvette).
The mansion's own materials name its parts: `Wood_ish_thing` #795500 is the wood floor,
`Dark_grey` the pavement, and `phong11` #65491A the one piece of furniture, an 8x4 stud brown
table on the ground floor (x 49.86..52.82, z -6.01..-4.52, plate top y 0.6336, stud tops y 0.7276).

**The fourth car is a 1969 ASTON MARTIN DBS**, `aston.glb`, third in the car pad's lane, parked
nose on to the Countach's tail. `pos [53.94,9.04]`, `rotY` 0, `targetLen` **5.8703**.
**Sized on its WHEEL like the Countach**, and the ratio is taken with ONE piece of code run over
both cars in the same frame so it cannot inherit either one's fitting choices: tyre radius from the
tangent circle a tread must satisfy about its contact patch, `R = (dx^2+h^2)/2h`, mode over the
tread. Countach **0.516**, Aston **0.548**, each agreeing across all four of its own wheels. That
code was validated on the Countach before it was trusted: it recovers the 3.768 wheelbase already
measured for that car, and puts its tyre at 24.1mm of real LEGO against the 24.2 already written
down. So `scale = 0.803008 * 0.516/0.548 = 0.756126` and `targetLen = 7.763952 * 0.756126 = 5.8703`,
landing 5.870 x 2.574 x 1.665 (live scale 0.756097). Cross-checked against the real cars, which is
the point of matching on the wheel: this makes the DBS 6.0% longer than the Porsche's live body,
and a real DBS is 6.8% longer than a real 911. It is the longest car in the Realm and its roofline
sits within 0.05 of the other three.
Nothing needed rotating: it came out of Blender already axis aligned with its nose down -x (front
lamp panel at min x, tail lights at max x, wheels symmetric in y to 0.0002), so `targetLen` divides
by an honest x extent rather than a yawed box. Winding is clean (0.00000 reversed over 664.71 units
of area across all 11 primitives) and its baseColorFactors come from Blender's own exporter, which
writes linear, so it needs neither `fixWinding` nor an sRGB conversion.
Parked x 51.005..56.875, z 7.580..10.154: 1.42 of clear pavement to the Countach's tail (the
Porsche and Corvette leave 1.26) and 0.50 to the car pad's east edge.
**NOTHING IN THE EXPORT IS TRANSPARENT AND FOUR OF ITS MATERIALS HAVE TO BE.** Read out of the
source node trees, not guessed: every Principled alpha is 1.0 and no material carries a transmission
weight, so the see-through is only Blender's HASHED blend mode, which glTF cannot express, and all
four ship alphaMode OPAQUE. `polish()` does catch them, because its glassy test reads the material
NAME and all four say trans or glass, but it only flips `transparent` when opacity is already under
1, so they arrive with the finish and no alpha. All four therefore need an EXPLICIT opacity from the
shared standard, which is why this is the one car whose glasshouse cannot use the window tier's
"keep what was moulded": there is no moulding to keep, so `Transparent_Glass` is given 0.25 by hand.
`TRANS-RED` and `TRANS-ORANGE` take the red and amber lamp tiers, `Glass.001` (the front lamp panel)
the clear tier. Live on `__aston.lens(tail, head)` / `__aston.tail(rough, env)`, or across all four
cars on `__cars`.
**GUNMETAL BODY AND BLACK WHEELS** (user, 2026-08-31). `SOLID-DARK_RED` is the ONLY red bodywork
material, checked rather than assumed: of the eleven, exactly three are red-dominant and the other
two are `TRANS-RED`, the tail lamp lens, which has to stay red, and `Transparent_Glass`, the
glasshouse. So one assignment covers every red exterior piece, the way `MB106` does on the Porsche.
**#4E565C**, converted, because this model's factors are already linear. It was picked by rendering
four candidates in engine, not by eye: `#2C3539` and `#3A4247` read as near-black and lose the car
against the Countach parked in front of it, `#646C73` reads as plain Light Bluish Gray and sinks
into the pad's concrete.
**The wheel is TWO materials.** `METAL-SILVER` is the four wire spoke centres and
`PEARL-FLAT_SILVER` is the four rim faces, which read as a white ring around them. Both go to real
LEGO Black #05131D and the Porsche's rim metal comes OFF: 0.85 metalness is right for chrome and
wrong here, because above 0.9 the colour stops being a tint and becomes reflectance, so a black
metal wheel is a dark mirror rather than a black wheel. Plain ABS at 0.30 roughness keeps the
spokes reading as spokes. `PEARL-FLAT_SILVER` cannot go whole, because a FIFTH object shares it: a
1,152-triangle trim piece on the body centreline that stays silver. The export joined all five into
one mesh, so `tintByBoxes` picks the four rim faces out against boxes measured off the source (they
are the only PEARL geometry outboard of |z| 1.0, and they sit low while the trim sits high and dead
centre). **It must hit exactly 24,384 of that material's 25,536 triangles, 4 x 6,096**, and that is
asserted in the loader and confirmed twice: by replaying the box test against the real geometry in
Node (`scratchpad/aston/verify_tint.cjs`) and by the guard staying silent in engine.
`SOLID-BLACK` also ships metalness 1; the shared standard zeroes it with everything else, because it
is tyres and black bricks and a metal tyre is a Mecabricks artefact rather than a decision.
**SIX OF ITS COLOURS WERE UNAUTHORED OR DEFAULTED, AND THAT, NOT THE FINISH, IS WHAT READ AS FLAT**
(user, 2026-08-31). Read off the shipped file and now all corrected in the loader:
`SOLID-BLACK.005` was `[0,0,0]`, PURE black, and it is the biggest material on the car at 180,304
triangles (tyres, bumpers, every black trim brick); a pure black diffuse term returns nothing at
all, so the piece was lit by its specular alone, which is as flat as a surface can be made.
`SOLID-TAN.002`, `SOLID-DARK_BLUISH_GRAY.002` and `PEARL-FLAT_SILVER` all sat at Blender's default
`[0.800, 0.800, 0.800]`, never authored, rendering as a near-white #E7E7E7 slab with no colour in
it. `SOLID-LIGHT_BLUISH_GRAY.004` was a dead neutral #808080, well off the LEGO colour it is named
for. `Transparent_Glass` was `[1.000, 0.525, 0.602]`, a PINK windscreen, and `TRANS-ORANGE`
`[0.840, 1.000, 0.000]`, a chartreuse that rendered the outer tail lamps YELLOW rather than amber.
They now take real LEGO Black #05131D, Tan #E4CD9E, Dark Bluish Gray #6C6E68, Flat Silver #898788,
Light Bluish Gray #A0A5A9, trans-clear #FCFCFC and Trans-Orange #F08F1C, all converted (this
model's factors are already linear). `PEARL-FLAT_SILVER` is set on the BASE material, which is the
centreline trim piece; the four rim faces are cut out of it by `tintByBoxes` afterwards and go
black, so that clone starts from a real silver rather than from the default grey.
The export (`scratchpad/aston/export_aston.py`) joins 36 objects into one mesh per material, 11
draw calls and 338,552 triangles, and STRIPS the two orphan 2048 maps `Glass.001` carried: a normal
map and a metallicRoughness map on a 4,608-triangle lens, 3.65MB of a 6.70MB file, with the
metallicRoughness one dead on arrival since `polish()` overrides both channels. 3.04MB shipped.

## Settled car knowledge, moved out of CLAUDE.md §8

These were filed under Open work but none of them is open: they are the per-car defects
already found and fixed, kept because each one will look like a new mystery next time.

- **`corvette.glb` is wound BACKWARDS against its own normals** on twelve of its twenty-one
  meshes, and those twelve carry 340.7 of the model's 344.5 units of surface area (98.9% of
  everything visible). The normals are the correct outward ones; the triangles are reversed. Three
  lights a DoubleSide surface as `normal * faceDirection`, so it negates the normal on every
  back-facing triangle: the sun's N.L went to zero over the whole car, the environment was sampled
  through an inward reflection, and it rendered on ambient alone, flat and pale, whatever its
  material settings said. It also culled the windscreen, since polish() puts glass on FrontSide and
  FrontSide was the buried half. `fixWinding()` (defined above `loadProp`) votes the sign of
  `(winding face normal . summed vertex normal)` per geometry and reverses the losers. The vote is
  not close: the twelve score 0.998 to 1.000 reversed, the nine sound ones 0.000 to 0.007, and
  every mesh in `porsche.glb` scores 0.000, so it is a no-op on a sound asset. **Judge this class
  of defect by AREA, not triangle count**: the nine sound meshes hold 1.4M of the model's 1.71M
  triangles but under 1% of its area, because they are the stud-logo micro-geometry buried inside
  the bricks. `scratchpad/verify.js` extracts the shipped function and grades it against a
  Draco-free re-export; it needs no WebGL.
- **The Corvette's cabin trim is tinted at load, by MEASURED boxes.** Its interior is red but two
  families of piece did not match: the LIGHT_BLUISH_GRAY ones that read as silver (seat-top block,
  floor plates, both sills, firewall, rear plate) and the BLACK ones (the six door-card panels
  walling the cabin, and the 1x1 tiles across the cabin floor). `CABIN_TINT` in the corvette's
  `onload` recolours both to the model's own `SOLID-RED`. The STEERING WHEEL is the one black island
  in the cabin that is meant to be black; the boxes are shaped to leave it out.
  **Select cabin pieces from INSIDE the cabin, not by what shows from outside.** The first pass
  asked "is it visible through the glass from out there", which finds the pieces you notice from
  across the street and misses the ones you only see with your head at the windscreen, because a
  thin exposed edge deep in the cabin escapes to open sky in almost no direction. The working method
  scatters 200 points through the cabin void (clear of geometry and in line of sight of the centre),
  casts 1800 rays from each, and takes every surface hit FIRST. That found six more grey pieces than
  the outside-in test did, and it is what identified the door cards.
  **Run the outside check DIRECTLY, not by counting ray escapes.** Escape counting over-reports: a
  ray can leave through the windscreen APERTURE without ever crossing the glass polygon, and is then
  scored as an open-air leak (it reported 117 phantom leaks on the door cards). The real test puts
  900 eye points on a dome around the car, sight-lines 1400 points on the tinted surface from each,
  and asks what each line hits FIRST. **This build DOES have open side windows** (an earlier note
  here said otherwise, concluded from the greys alone, which sit low enough to be hidden); the door
  cards reach the sill and show through the side opening, which is allowed along with the
  windscreen. Nothing else shows: verified by rendering the tinted car from eye level all round.
  **Some cabin surfaces belong to pieces that are half outdoors, and those get a bounded SLICE.**
  The chassis plate is one island running the length of the car; its top face shows through the two
  fore-aft seams either side of the centre floor, which read as a black strip down each side of the
  footwell. The floor box therefore reaches down to y 0.20 to take it, but is fenced: x 10.15..11.45
  keeps it inside the sills, and it stops at z 1.62 instead of following the seam to the back of the
  cabin, because the last 0.2 of that seam has a sight line to open air at eye level through the
  rear wheel arch. The plate's underside is untested on purpose (the car is parked and there is no
  view from beneath it). The two rear side panels behind the door cards are left BLACK for the same
  class of reason and could not be fenced: their outer faces ARE the car's exterior flank, and their
  cabin-facing halves leak red through the side vent at eye level.
  Keep the material filters narrow. `/^SOLID-LIGHT_BLUISH_GRAY/`: widening it makes the firewall and
  rear-plate boxes swallow buried white pieces nothing ever sees.
  The boxes live in the MODEL's local frame (the glTF scene space), so the holder, `targetLen` and
  the bbox recentre cannot move them; Blender reads that frame as `(x, -z, y)`.
  `scratchpad/verify_tint.js` runs the shipped block against the real geometry in the real vendored
  three.js, on a rotated and scaled holder, and asserts the same 237,902 triangles.
- **Both cars are recoloured at load, and `tintByBoxes()` (above `loadProp`) is the shared machine
  for the parts of it that are not whole-material.** Both builds are joined by material, so an
  interior piece is not its own mesh: the helper picks triangles by centroid against MEASURED boxes
  in the MODEL's own local frame, reorders them into one contiguous run and draws the mesh as two
  material groups. Boxes survive the holder, `targetLen` and the bbox recentre. Blender reads that
  frame as `(x, -z, y)`. Groups are `{re, boxes, wholeBoxes, color, plastic}`; `plastic` forces
  metalness 0 on the clone, which the Porsche's cabin floor needs because it may clone the metallic
  silver rim material. **`wholeBoxes` tests the MESH's own centre and takes the mesh entire**, and
  it exists for the one case a per-triangle box cannot reach: the Porsche's dash block and the
  steering wheel mounted into it overlap along all three axes, so no box holds one without cutting
  the other. Their centres are 0.27 apart, which is all the separation needed, and that is measured
  off the geometry rather than read off the exported mesh names. When this was factored out of the Corvette's inline copy, `scratchpad/verify_tint.js`
  re-ran the shipped code against the real geometry and returned the same 237,902 triangles, so the
  refactor is proven, not assumed.
- **The Porsche is WINE RED with a PEANUT-BUTTER interior, and the asset is orange with a brown
  one.**
  `MB106` is the whole body and nothing else (35.4% of the model's area, every visible orange
  panel), so it is one material assignment. The target colours are NOT in this model, unlike the
  Corvette's white and red, so they are written down: LEGO Dark Red `#720E0F` and LEGO Medium Nougat
  `#AA7D55`, each `convertSRGBToLinear()`d by hand because **porsche.glb's factors are already
  linear** (the opposite of the Corvette, see below). The interior was found the same inside-out
  way and splits three ways: `MB192.001`, the brown door cards and seat backs, is used nowhere else
  so it is recoloured whole; `material_6` (the seat), `MB309` (the cabin floor) and `MB26.001` (the
  four wall panels and the footwell lip) are all used outside the cabin too, so they get boxes.
  Only the STEERING WHEEL stays black, the same call as the Corvette's; the two side boxes clear it
  without being cut around, since it sits between them at z 1.697..2.180. The block it mounts into
  is tinted with the rest of the interior, and it is the sole user of `wholeBoxes`: a 0.18-tall
  slice holds the block's centre and clears the wheel's, and it is the only mesh in the model whose
  centre lands in it. That block is seen 56,754 times through the openings and never in open air.
  **A gap in the `MB309` floor box is a CHROME gap, not a grey one.** The rim override runs first
  and clones every MB309 mesh forward of world x 48.63 to metallic silver, and the cabin floor is
  one of them, so anything the box misses reads as bright chrome in the Realm. An earlier box
  stopped 0.26 short of the plate's right edge and left exactly that. Headless renders will NOT
  show this class of bug, because they do not apply the override.
  **`MB26.001`'s boxes are bounded slices and the bound that matters is the SILL.** The sills are
  separate MB26.001 pieces running out to the car's flank at y 0.412..0.550, and they ARE seen from
  outside; the right box stops at z 2.78 for that reason alone, because at 2.85 it caught the sill
  and put 25 sight lines of interior colour on the flank.
  **This build DOES have open side windows, and the aperture list has to say so.** Counting only
  the windscreen called 1,356 sight lines to the door tops a leak. With all three openings allowed,
  the wall panels give 125,974 through the openings and 8 into open air; `MB192.001` gives 19 out of
  1.26M and the seat and floor 5 between them, all single grazing hits.
  `MB24` is the one other orange-ish material and is deliberately untouched: it is Bright Light
  Orange, not Orange, and its only sight lines are 45 grazing ones from BELOW the horizon, under
  the rear bumper of a car parked on a plate.
- **The Corvette is WHITE in the Realm, and the asset is yellow.** Every `/^SOLID-YELLOW/` material
  takes the model's own `SOLID-WHITE` colour at load, the same read-it-from-the-model rule the cabin
  trim uses for red, so it is the real LEGO White this build already contains. Catch BOTH yellow
  materials: the body is `SOLID-YELLOW.001` and the LEGO wordmark on every one of its studs is
  `SOLID-YELLOW_0`, a separate 345k-triangle mesh that would otherwise stay yellow on a white car.
  It runs after the sRGB conversion below, so it copies a colour already in linear space. Nothing
  visible is lost to the merge: the yellow was 339 islands and all of it bodywork, and the model's
  pre-existing SOLID-WHITE pieces are all buried structure (inside the sills and wheel arches,
  behind the nose and tail), none of it reachable from outside or from the cabin.
  `scratchpad/verify_body.js` runs the shipped block against the real materials and asserts both
  yellows land on white with no other material moved off its own conversion. Compare colours as
  FLOATS there: the first version of that check round-tripped through `getHexString()` and the
  8-bit rounding, amplified by the sRGB curve, reported nine materials as drifting when none had.
- **`corvette.glb`'s baseColorFactors are raw sRGB, not linear**, which glTF requires and which
  `porsche.glb` from the same source gets right (MB24 is the linear form of LEGO Yellow #FAC80A;
  SOLID-YELLOW is #F1CC36 divided by 255). Left alone it rendered pale and flat: SOLID-BLACK
  displayed as #224B5D slate and SOLID-BLUE as #009BE0 sky. Its `onload` now runs
  `convertSRGBToLinear()` once per unique material. If the model is ever re-exported, check the
  factors before assuming the conversion is still wanted.
- **The Corvette is the heaviest single prop in the Realm**: 1.71M triangles, 3.9MB as shipped,
  against the Porsche's 197k and 1.2MB. It is a Mecabricks build, so the cost is per-brick detail
  (a 4x4 plate alone is 4,543 triangles), not model size. Exporting it joined by material took it
  from 558 draw calls to 21 and from 6.2MB to 3.9MB, which is where the cheap wins ended. Cutting
  it further means dropping stud-logo geometry or culling bricks buried inside the shell, not a
  decimate, which would round off every stud. Untouched so far because it was not asked for.
