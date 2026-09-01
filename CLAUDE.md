# CLAUDE.md — Project Handoff & Context

> Authoritative context for Claude Code sessions on Shyon Shiri's portfolio.
> Read this first, then inspect the files it points to before changing anything.
> **Documentation only. It does not change site behavior.**
>
> This file is deliberately kept SHORT: durable facts, hard rules, current state, and the
> traps that have actually cost hours. It is NOT a changelog. Git history is the changelog
> (`git log --oneline`, and `git log -p <file>` for how a thing came to be). When you finish
> a pass, update the relevant section in place. Do not append a new dated entry.

---

## 1. What this is

The personal portfolio of **Shyon Shiri**, designer & maker. Live at **https://www.shyonshiri.com**
(GitHub Pages, repo `shyonxshiri/shyonxshiri.github.io`). Two parts:

1. **The main site** — a React SPA (`src/App.tsx`): Home / Work / About / Contact.
2. **The Lego Realm** (`public/lego.html`) — a walkable LEGO world in vanilla Three.js, linked
   from the end of the homepage storyboard. **This is live and public**, so edits to it are
   edits to the public site.

Older generations, kept but not linked: `public/studio.html`, `public/studio_classic.html`.

Design direction: dark, minimal, editorial. Custom cursor, restrained motion, KiwiSoda display
font. The Realm is a moody, tactile LEGO world built entirely from Shyon's own Blender assets.

---

## 2. Architecture

**Stack:** React 18 + TypeScript + Vite 7, Tailwind 3, framer-motion, lucide-react. The Realm is
**vanilla Three.js r128, vendored** (no CDN, no React).

- `src/App.tsx` — the ENTIRE main site, one file. No router; `useState<Page>` switches pages.
  Global CSS is an injected string (`GLOBAL_CSS`) plus Tailwind. Contains `PROJECTS` (all Work
  data), `Cursor`, `HomePage` + the storyboard (`StoryChapter` / `StoryFrame`), `WorkPage`
  (coverflow + `WorkParticles` + `WORK_BG_THEME`), `WorkModal`, `MediaViewer`.
- `public/lego.html` — the Realm, one file, ~3.2k lines. See §5.
- `public/vendor/` — three.min.js r128 (byte-identical to the npm `three@0.128.0` release),
  GLTFLoader, DRACOLoader, draco decoders, and `pp/` (post-processing passes lifted from the same
  release). Nothing external except Google Fonts.
- `public/assets/` — site media plus every `.glb`. `public/assets/story/` — storyboard stills.
- `docs/` — **the build output GitHub Pages serves.** Committed.
- `vite.config.ts` — `outDir: "docs"`. `.github/workflows/deploy.ml` is misnamed and references
  `dist`; it never runs. Ignore it.
- Root `*.md` / `*.txt` other than this file are historical auto-generated docs from early 2026.
  Background only.

---

## 3. Hard rules

1. **Never use em dashes in copy.** Periods and commas. (Durable, repeatedly reinforced.)
2. **The 3D space is the "Lego Realm"** ("My Lego Realm"). Never "the studio" or "3D space".
   Descriptive copy must NOT lean on the name; state what it is (an interactive real-time 3D
   environment, Blender to browser). See the `site-copy-tone` memory.
3. **Everything in the Realm snaps to the stud grid**, `PITCH = 0.36945`. Pieces pop into place.
4. **No copyrighted characters or proprietary designs** in the shipped build.
5. **Always start a dev server and give Shyon the localhost URL** when you change the site.
   The in-app preview pane has **no WebGL at all** (see §7), so he is the only one who can
   actually look at the Realm.
6. **Verify before you claim.** Read the file before describing it. Measure, don't eyeball.
   Report failures honestly.
7. **Targeted changes for targeted requests.** Don't refactor finished code that wasn't asked
   about. Prefer editing over rewriting. Once a look is approved, lock it.
8. **Confirm before big or irreversible moves**: committing/pushing, deleting blend geometry,
   reshaping an approved look, switching what the homepage links to.
9. **Deploy only when asked** (§4).

---

## 4. Develop & deploy

```bash
npm install && npm run dev        # Vite, port 5173; the Realm at /lego.html
```

Use the Browser pane's `preview_start` with a config from `.claude/launch.json`, never Bash.
There are ~20 named port configs because concurrent sessions hold them; **only about five servers
run at once**, so pick a free one or add a config.

Build → `docs/`. Deploy:

```bash
npm run build && git add <changed source> docs && git commit && git push
```

`npm run deploy` exists but stages **only `docs`**, which leaves the source change uncommitted and
lets `public/` and `docs/` drift. Stage both.

Hosting: GitHub Pages serving `docs/` on `main`, custom domain via `CNAME`. No backend, no auth,
no env vars, no secrets.

---

## 5. The Lego Realm — systems

One file, `public/lego.html`. The pieces worth knowing before touching anything:

**World & ground.** Plate X 0 -26.6..60.6, Z -31..28.4 (with an `OZ` centre offset the tile grid,
farLand and the bump phase all take), `APRON` 28 rings of real tiles past it (20.7 units, raised
from 18 rings for flight), player bounds BX0 -30 / BX1 64 / BZ0 -35 / BZ1 32. `farLand` is a
1600-unit bump-mapped sheet at `plateTop-0.018` carrying a stud bump map phase-locked to the real
grid. `HILLS`, `FAR_TREES` (100 trees) and `TRIM_TREES` (52, the ring between the bounds and the
apron edge), all frustum-culled, sit beyond the bounds. Fog `Fog(0x0c1120, 34, 76)`, tuned so every structure is at
least partly readable from spawn.

**Grey vs green.** `onPad` / `onWalk` / `ruinsPath` / `rdPath` / `mansionDrive` / `onHousePlate`
decide each tile. Edges are organic: `wob(x,z)` (position-based) plus `bank(u,side)` (per-side, so
one edge swells while the other pulls in), `rrect` for rounded rects, `fringe` for the shop pad
(which may only GROW, its walls sit within 0.07 of the rect). Boundary tiles are relaid as four
1x1 pieces so outlines step stud by stud. Gravel bits scatter on grey cells.

**Grass detail.** The greys get their texture from bits scattered ON TOP; the green gets its from
the GROUND ITSELF, so nothing new stands proud of the surface. Every green piece takes an instance
colour from `GRASS`, six real LEGO greens written as hex and divided by matGreen's own LegoGreen
(an instance colour multiplies), biased by `shade(x,z)` so the darks gather into drifts. Inside a
`wear(x,z)` drift a tile is RELAID, not decorated: one smooth 2x2 tile, or four 1x1 cells mixing
smooth tiles, 1x2 tiles across a row and studded plates. A smooth top is `plateTop`, the LEGO
truth, so the figure stands a stud proud crossing one. About a quarter of the lawn is relaid, and
since a smooth 2x2 is 12 triangles against the studded plate's 348 that is what pays for the wider
apron (ground went 5.72M to 6.23M triangles for 32% more tiles).

**Greenery tones.** The lawn's per-piece greens are now the pattern for everything green, and
each one varies the unit that is really ONE MOULDED PIECE.
· *Trees.* `TREE_MATS` still varies tree against tree; `buildLeafVariants()` varies leaf against
leaf inside a tree. tree.glb has no piece list and neither end of its topology gives one: welding
the coincident verts merges a whole leaf tier into one island (the pieces are snapped together),
and not welding leaves 5951 fragments, 2817 of them single triangles, which is a stud's cap cut off
from its own wall. So a piece is rebuilt geometrically: raw islands, then CLUMPED by centroid
within `H*0.0353` (about half a stud), which gathers a stud, its wall and the plate under it into
one unit. 5951 islands become 612 clumps, each taking one flat tone from `LEAF_TONES` (a per-clump
roll biased by a smooth drift, exactly as `grassTone` picks a tile). Red is left alone because the
leaf's own red channel is 0. Three colour attributes are built over the SHARED position/normal/
index buffers, so it costs three float arrays and no geometry; a tree draws one of the three
against one of the five materials. Verified twice before it shipped: rendered in headless Blender,
then the SHIPPED source re-run in Node against the real geometry (scratchpad `tree_blob.py`,
`verify_leaf.js`) for 5951/612 and a trunk left untouched.
· *Flower stalks.* One green per PLANT (the stalk kit is one piece), from the lawn's own six
greens, biased by `shadeF`, which is `shade()` to the same frequencies and phases, so a plant in a
dark drift of grass is dark with it. The heads are untouched.
· *River plants.* One green per clump, from a family divided out of the MOC's own dark green,
biased by the plant's reach across the channel: deep mid-stream, lighter at the banks. The
instanced copies take a CLONE of that material, because the bridge's own clumps still draw through
the plain one and r128 keys the compiled program per material.
Both instanced sets draw their tone from their OWN rng stream: borrowing a draw from `prng` or the
reed scatter's `rng` would reshuffle every petal or move every clump.

**River.** `riverAt` / `riverProj` / `riverPoint` / `riverHW` over a 4-point chamfered centerline
with a sine-wandering width; `RV_CORE` are the rectangles the big water plates actually cover and
must be re-derived if the plate list changes. Shoreline is the same 1x1 mosaic. The bridge is the
only crossing. 175 MOC plant kits are instanced through the whole channel.

**Structures and their portals.** Coffee shop → **Professional Services**; run-down cottage →
**Personal Projects**; modern house (mansion) → **About**; the blue crystal on the ruins balcony →
**NABU**. The ruins itself has no ground-floor portal: you climb its stairs to reach the crystal
(the doorway teleporter that used to shortcut that climb is disabled behind `RUINS_TP=false`;
its zones and targets are intact if it is ever wanted back).
The ruins' GREENERY is now vines on the four corner COLUMNS and nothing else: the columns are the
only stone with `|x| >= 2.8` between the ground and the deck, and a welded green island is kept
only if over half its faces sit within 1.0 of a column axis AND it reaches `z >= 1.2`. That second
test is what clears the plants at the column bases; the first clears the floor clutter, the loose
leaves on the wall ledges and the rings draped along the deck rim. The ruins is placed by BBOX and
its greenery used to hang past the stone on three sides, so trimming a vine SLID the whole building
(0.11 x, 0.10 z, 0.25 down). The loader now centres on `RU_BOX`, the box the placement was solved
against, not on the live one, so any later greenery edit lands the stone in the same spot.
Holders: shop `(snap(-19.95),-0.12,snap(-25.12))`, ruins `(snap(-2.2),-0.5,snap(19.95))`,
mansion `(50.2622,-0.215,0.20165)`, cottage `(snap(20.7),-0.15,snap(-25.86))`.
Measured footprints (used by the title bubbles): shop `[-23.41,-16.49,-30.08,-20.17]`, cottage
`[16.28,25.09,-30.32,-21.40]`, mansion `[47.67,57.19,-6.76,7.16]`, ruins `[-7.20,2.76,13.90,26.00]`.
The mansion's north flank is an OPEN DRIVEWAY, and it is where both cars park. Its plate lane runs
x 43.33..57.20 at z 2.46..7.15, clear to the ground and to the sky for its whole length, so the
Porsche takes the mouth (x 44.11..49.73) and the Corvette the slot behind it (x 50.99..56.15),
leaving 1.26 between the bumpers and 1.05 to the pavement's east edge. It used to be a CARPORT:
roofed from x 50.61 with its lowest beam at y 2.86, and walled along the outer long side from
z 6.40 to 7.158. Both the roof slab and that wall were cut OUT of `modern_house.glb` (569 islands,
37,476 of its 388,128 triangles, 2.42MB to 1.99MB), leaving the pavement, the cars, the house and
its north wall untouched. The cut is islands-not-planes for a reason: the roof is laid in the same
courses as the wall it butts against, so a y or z plane through the junction cuts bricks in half,
while the welded islands separate cleanly (everything LegoWhite with island centroid z > 2.10 is
carport, and nothing left behind reaches past z 2.041, the house's own north face). The wall behind
it was already a finished exterior wall, unbroken ground to roofline across the whole span, and the
pavement runs unbroken under where the wall stood, so nothing had to be filled in.
`MH_BOX` now pins the centring for the same reason `RU_BOX` does on the ruins: that outer wall WAS
the model's z max, so on the live box this cut would have walked the whole mansion 0.003 north.
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
**The Porsche could never be matched on alpha, because it has a REFLECTOR and this car does not.**
Ray-cast through `MB40` and 78.8% of its outward area lands on `MB309`, a 0.617 light grey plate
right behind the lens; 100% of the Countach's clear lens lands on the printed nose panel, which
this build's own black repaint took to #05131D. That is why copying the Porsche's numbers failed
and why the tier had to be built out of DoubleSide and colour rather than alpha. Winding, normals
and the world matrix determinant were all checked first and all three are clean (reversed fraction
0.00000, outward normals on all 254 parts, determinant +0.518).
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

**The mansion's upstairs.** Reached by FLYING onto the balcony (parapet top 4.520, so the body
band clears it from feet 4.41) and walking in through its door, which is the gap in the wall at
x 50.4..51.5, z -5.1..-3.3, open from the floor to a header at 5.76. The floor is the upper plate
top 3.714 with stud tips at 3.782; the roof is 6.676 and the room's own headroom runs out around
5.9. Its walls, glass and parapet are `houseUpCells`, its floor is the mansion's `tight` heightmap
slice, and both are measured off the loaded model. The room is EMPTY on purpose, it is where
Shyon is going to put something. Nothing else about the mansion moved: the ground floor, the
driveway and both parked cars walk exactly as they did, which is why the heightmap slice is
3.70..3.90 and not the default band (the model's own plate tops sit at -0.06, a tenth below the
ground everything currently stands on).

**The electric piano in the living room.** `piano.glb`, a LEGO keyboard on a brown stand, back
against the wall the entrance porch is on the other side of, the one under the black canopy roof
where the door and the walkway are. That wall runs x 47.678..51.374 along the north edge of the
room and its living-room face is `z -2.35569`; the big west window (z -6.011..-2.344, y
0.737..2.511) dies straight into it, so the piano stands just past the glass. Between the west
wall's inner face (x 48.4585) and the wall's own east end there are 2.916 units to stand against.
**It is deliberately NOT at its own stud pitch, and both measurements that decide that were taken.**
Its lattice is **0.1855**, the nearest-neighbour distance over the stud centres on four separate
horizontal layers of the build (55, 49, 72 and 40 studs, all four returning the same number), which
makes it a 12x6 stud table carrying a 10x4 keyboard, 22 plates tall. Scaled to `PITCH` that is 4.433
wide against 2.916 of wall, so it does not fit the wall it was asked to stand on, and 2.742 tall
with its playing surface at y 2.00 against a figure whose head tops out at 1.770: the keys would sit
above the minifig's head. At **1.0800247** it is 2.402 x 1.487 x 1.200, the keys land at y 1.188,
chest height on the figure, and 0.22 of wall is clear at one end and 0.30 at the other. Rendered its
stud is 0.2003, 0.54 of `PITCH`; the cars already render theirs at 0.78, so a prop carrying its own
brick scale is the rule here rather than an exception.
**That exact scale is SOLVED, not chosen.** `loadProp` snaps the holder to the world stud grid,
which quantises z by a whole `PITCH`, and the mansion's own brick grid is a fraction of a stud out
of phase with it, so "back flush against the wall" is not a position that can be typed in. At
`pos` z `-8*PITCH` = -2.9556 the back face lands on the wall face exactly when the depth is
2*(2.9556-2.35569) = 1.19982, which on a model 1.110919 deep is 1.0800247. The scale is the free
variable and the flush back is the constraint. x is `135*PITCH` = 49.87575, the grid stud nearest
the middle of the wall run. `y` is the floor's PLATE TOP, **-0.0931**, not its stud tips at 0.0032,
for the same reason the garden's fence is seated on `plateTop`: a LEGO piece rests its underside on
the plate and swallows the studs. `rotY` PI turns the keys, which face the model's own +Z, round to
-Z and into the room. `solid` rasterizes it from its real triangles so you walk into the table
rather than through it; it stays out of `camCell`, being furniture and not a building.
Verified by replaying the SHIPPED config against the real geometry (`scratchpad/piano/verify.py`,
which pulls the config out of `lego.html` by content): back face gap 0.00000, all 81 mansion wall
vertices inside the piano's box sitting exactly on the wall plane and nothing intruding, base
exactly on the floor plate top, 1.252 of headroom under the 2.6456 ceiling, keys facing the room.
**The export DROPS the floating headphones the build ships with**: four `MB_26` islands standing in
mid air 0.47 beside the table at y 0.285..0.595, with nowhere to be rested, since the keyboard
covers the table top to within a stud on every side. The rest is joined into one mesh per material:
9 draw calls, 59,712 triangles, 168KB Draco. It needs neither `fixWinding` (all 9 meshes score
0.00000 reversed) nor an sRGB conversion (`MB_1` is 0.9047, which read as LINEAR is sRGB 245, i.e.
LEGO White; read as sRGB it is 231, which is nothing). `scratchpad/piano/export_piano.py`.

**The walled garden.** `garden.glb`, a fenced LEGO garden standing out in the woods behind the
mansion, entered through its brick archway. No portal, no interior: it is scenery you can walk
into. Holder `(69.08715, -0.1354, 0.7389)`, `rotY` +PI/2, `scale` PITCH/**0.38245**, its OWN
measured stud pitch (stud centres 1.1474 apart across three studs, 1.5297 across four, agreeing to
0.0001). The archway opens down the model's own **-Z**, identified by rendering the piece from six
sides, and +PI/2 carries that onto world -X, i.e. back toward the house.
**It stands on GRASS. There is no paving of any kind around it** (an earlier pass ringed it with a
ruins-style concrete apron; that was removed at Shyon's request, so `gardenPad` is gone).
`y` therefore seats the fence's bottom on the plate SURFACE (`plateTop`, -0.083) rather than on the
stud tips, and that is load bearing: the grass detail pass relays about a quarter of the lawn as
SMOOTH tiles whose top is a full stud lower than the studded plates around them, so a fence seated
on stud tips would show a 0.083 gap under itself wherever it crossed one. It is also what a LEGO
piece does, resting its rim on the plate top and swallowing the studs. The 0.0524 in the offset is
measured: the lowest thing in the glb is a plant at 1.2112 and the lowest brick at 1.2654.
It ships **no floor**, so the ground under it is the world's own lawn, and every bound is measured
off the glb then carried through the holder transform (`worldX = 69.08715 + s*(mz - 8.4834)`,
`worldZ = 0.7389 - s*(mx - 7.64085)`): outer footprint `GD` `[66.001, 72.174, -2.508, 3.985]`, the
fence's inner face `GDI` `[66.437, 71.740, -1.786, 3.657]`, archway opening z -0.736..0.772 (1.508,
4 studs). `gardenTrack` returns false inside `GDI`, so the lawn inside stays pure grass and the
dirt stops dead in the gate.
**The second car pad.** `carPad` duplicates the driveway's concrete on the cars' LEFT, which is the
side on your RIGHT standing in front of them: both cars point their noses down -x, so the car's own
left and your right are the same side, +z, away from the house. x 43.15..57.37, z 6.10..11.9745,
and the Lamborghini parks on it. z0 has moved twice, 7.03 to 6.30 to 6.10; the code comment on
`carPad` carries the measurement for each move.
The mansion's plate ends at z 7.2845, so the 0.25 overrun INTO it is the same trick `mansionDrive`
uses, turning the quarter-stud the two grids are out of phase by from a green hairline into
pavement. Dead straight and carrying no gravel bits, so it reads as the concrete the cars already
stand on rather than as another gravel walk.
**Trees and flowers were thinned round the house** at Shyon's request: planted trees `(58,-8)` and
`(56,10)` are gone, and 12 flower sites with them, the ones standing on the new concrete, on the
dirt track, or inside ~3 of the mansion's own walls. The nearest flower to the house is now 4.05
away (it was 0.76). `SPOTS` is 407 sites, `cand` 78, `FAR_TREES` 97, `TRIM_TREES` 50.

**The dirt is the grey plates recoloured, not a new material.** Targets are converted to linear and
divided by `matGrey`'s own colour (a flat 0.0757, zero textures in the glb, so multipliers up to
4.4 have nothing to blow out), exactly as `GRASS` divides by matGreen; `wear()` drifts them.
`walkTone` draws from `rngT` for EVERY grey tile whether it ends up dirt or not, or the stream
advances differently and the tone of every grey tile after it reshuffles across the map. The
track's gravel bits are a SECOND scatter pass on their own `rngX`, deliberately not folded into
`gritty`, for the same reason. The track itself is one straight rounded rect due east into the
arch, 4 studs at the rect and about 6 where the wander runs, tapered flat at both ends so the
start stays exactly on the rect: it begins 4.5 studs clear of the mansion's east face and that gap
can never be eaten into.
**How far out it stands, and what had to move for it.** Its front is 8.79 behind the mansion's east
face (57.212). It was moved out twice on Shyon's word (2.88 -> 4.72 -> 8.79), and getting past 4.72
meant the treeline had to move with it. **`BX1` went 64 -> 66 -> 67.7 -> 71.8.** Canopies are not
the limit and must not be treated as one: measured off `tree.glb` at the site's own scale
(s = 5.2/height = 1.00413) a tree is only 0.46 to 0.63 in radius up to y 1.0 and spreads to 2.61
only above y 1.5, so leaves pass over your head and walking under them is being in the woods.
TRUNKS are the limit. Five background trees whose trunks fell inside the new band were pulled
(FAR `(68.72,24.01)`, `(69.83,-8.50)`, `(71.30,16.26)`; TRIM `(69.83,1.85)`, `(70.56,-16.63)`) and
FAR `(75.74,4.43)` was nudged to `(76.60,4.90)` because its canopy grazed the lawn by 0.02. What is
left starts at x 72.78, so the wood still stands right behind the garden.
**Nothing stands in its grass, only round it.** Two planted candidates used to land INSIDE the
fence. `treeOK` now refuses the whole `GDI` box grown by **3.6**, the widest canopy a planted tree
can have (2.608 at the 1.36 top of its own random scale range), plus the dirt track and the second
car pad. Every surviving tree was then checked against that radius by hand.
Verified without WebGL: the shipped predicates extracted and rasterized to an ASCII plan, the
placement re-derived independently (agreeing with the shipped constants to 0.0006), the piece
placed against the mansion in headless Blender and rendered with the nearest tree, and
`rasterizeSolid` replayed at OCS 0.16 / y 0.30..1.5 to confirm the arch is walkable and all four
fence runs and both piers block. The glb needs neither `fixWinding` (all 11 meshes score
+0.89..+0.999) nor an sRGB conversion (its LegoGreen is already 0.0529/0.266/0.0775, the linear
value matGreen is set to).

**Collision is per-geometry, not bounding box.** `rasterizeSolid` fills an occupancy grid
(`solidCells` and per-structure sets) from real triangles at body height, so you can walk open
patios and right up to walls. `camCell` is a separate set of only BIG buildings, so the camera
pulls in behind walls but ignores trees and props. `buildHeightmap` gives climbable surfaces;
`userData.noHM` / `noSolid` opt geometry out. **The grid is 2D**, so an upper storey needs its own:
`ruinsUpCells` is rasterized at balcony height and consulted only above `UP_FROM` 2.40, band from
`UP_Y0` 3.62 (which clears the deck's stud tops), and `houseUpCells` does the same for the
mansion's upstairs (`HU_Y0` 4.02 to `HU_Y1` 5.25, above `HU_FROM` 3.30, which has to clear a hero
leap from the ground floor). `MAXSTEP` 1.55 applies only inside `STAIR_ZONES`;
elsewhere `LOWSTEP` 0.35 so rubble can't be walked up.
`buildHeightmap(root, ylo, yhi, tight)` takes a band and a dilation flag. The default 1-cell
dilation closes detection gaps and costs about half a unit of PHANTOM FLOOR past every raised edge
(the dilated cell, plus the 3x3 `surfaceBelow` scans, plus the cell's own width). Past a railing
you can only reach from inside that is invisible; past one you can FLY to the outside of it is a
figure standing in mid air off the side of a building, so the mansion's upper floor is built
`tight`. Verified: zero holes over 1919 probes of the whole upstairs, surface 3.767..3.796.

**Flight collision is a VOXEL COLUMN, not a roof height.** It used to be one number per building,
its bbox top, with every cell of that building blocking everything below it. Over the mansion's
balcony that put an invisible wall 2.9 units above a parapet whose top you can see, and there was
no way into anything. The four big structures now fill `voxCells` (cell to a bitmask of 0.30 slabs
from `VOX_Y0` -1.0, 30 of them, so up to 8.0, clearing the mansion's 6.68 roof) and `topCells` (the
column's exact top), from the same triangles `rasterizeSolid` already transforms, on its `vox`
argument: one pass, 47ms on the mansion's 350k triangles, measured. `flyBlocked` tests the hero's
own body band (the same 0.30..1.5 the walk uses) against the column, so he clears a parapet by
clearing THE PARAPET and can be inside a building at a height its walls do not reach. Props still
do not block a flying hero, and neither does the bridge.
Three things a per-cell ceiling then needs, and each was a real hole found by replaying the shipped
code against the real geometry:
· The floor is a THREE-WAY choice, not `roof + FLY_CLEAR`. No column, or a walkable surface right
  at the column's top (a balcony deck, the upper floor): stand on it and a landing may commit.
  Above the top with nothing to stand on: hover `FLY_CLEAR` over it, a roof is not a floor. BELOW
  the top, i.e. inside the volume, having come in through a door: the heightmap surface under him,
  floored by `voxFloor` so he cannot sink into what he is over.
· A DESCENT is not swept. Without `voxFloor` he could clear a parapet fairly, hover over its head
  and then sink straight down through it onto the deck at its foot.
· A CLIMB is not swept either, so a climb that would put his body inside real geometry is stopped
  dead (guarded on not being blocked already, or a hover that ends up overlapping something has no
  way out at all). This is what stops him rising through the upstairs floor from the hall below.
And a landing now also needs `!stepBlocked` at the spot: the floor is resolved per point and the
walk is not swept, so a descent that ends with his body overlapping a parapet or a tree trunk used
to put him down wedged, unable to move on any axis with nothing but F to get out.
`roofY` / `noteRoof` are still measured but only `__hero.roofs` reads them.

**Day cycle.** `CYCLE_SECS` 420, random phase on load, `applyTOD()` smoothsteps the `TIMES`
keyframes every frame: sky, fog, sun, hemi/ambient, exposure, rim, lamp brightness, `env`
(reflection strength), crystal emissive. Sun is fully off at night. `__D.time` gets/sets phase
(0.75 = full night).

**Render pipeline** (`PIPE`, WebGL2 desktop only; `#nopipe` forces the old path, touch never gets
it). One geometry pass into a linear HDR target, then hand-driven AO → bloom → AgX grade → SMAA.
Not `EffectComposer`, and **not the stock SAO/SSAO passes**, which re-render the whole 20M-tri
scene. `PIPE.amount` (default **0.8**) is the single master dial: `setAmount` lerps AO, bloom,
vignette, power and saturation from neutral to the `FULL` table. Bloom threshold is in LINEAR HDR
(1.7) and bloom is the one real cost (~3.5ms); AO and SMAA are nearly free, and dropping MSAA pays
for most of it. The portal menu deliberately keeps the old direct/ACES path.

**Portals.** `PORTALS` (professional / creative / about / nabu) carry `label`, `projects`, door /
eye / look / exit points with y-gates so a portal only fires on its own floor, `cells` and/or a
`zone` predicate (the shop's whole grey pad prompts). E enters: 3rd→1st person glide, the real
interior is snapshotted and blurred as a backdrop, and LEGO-framed panels float in a separate
`menuScene`. The panel rows are browsable carousels (drag / wheel / arrows); `openPan` centres a
RANDOM real panel on entry, never repeating the last one. Panels carry the real project media
mirrored from `PROJECTS` in `src/App.tsx`, with `extras` shot sets stepped by ‹ ›, arrow keys or
swipe. Q leaves.
**Each panel wears its project's NAME on a caption under the frame**, and that is a REVERSAL: the
captions shipped, were dropped in `cc38584`, and were asked for back (user, 2026-08-31). They have
to be their own plane, because the media plane is FULL BLEED (`texPanels` swaps the whole cover
image onto it, so a title drawn there would be painted over on load) and the frame either side of
it is bare plastic. `labelTex` with no `bg` paints the text TWICE through a soft drop shadow, which
is what lets white read over a pale cover and over the blurred interior behind the row. The row's
`group.position.y` of 0.8 exists for these: it lifts the captions clear of `#prompt` and `.hint`.

**Title bubbles.** LEGO speech bubbles (`speech_bubble.glb`) that build themselves course by
course as you approach, print their label letter by letter, and dismantle when you leave, with
brick snap sounds. `BUB_SPOTS` entries take `pos / yaw / sw / scale / lines / text / rect / near /
far / maxY / once / arrive`. Portal signs trigger on distance to the structure's `rect` (so the
distance is the same from every direction), and only when you are OUTSIDE the footprint, LOOKING at
the sign (`bubFacing`), and haven't already arrived once (`used`, re-arms past `far`). The spawn
greeting is a one-time point-triggered sign on the opening sightline.
**Arriving is a RING round the footprint, not just the door.** `BUB_DOOR` 3.2 about the portal's
door point is the right test for a building you walk straight up to and the wrong one for a building
with a forecourt. Standing among the three parked cars you are a car's length from the mansion's
north flank and still 7.6 from its door, so `used` never got set: the sign stayed ARMED, and every
swing of the camera off it broke it apart while every swing back built it again. `arrive` is that
missing ring, and only `about` carries one, 7.0, measured off the shipped ground predicates (the
driveway lane's west end is 4.34 out from the rect and the car pad's far corner 6.60, the worst
point on either slab). Replayed against the real coordinates, 6.7 seconds of loitering by the
Lamborghini with the camera swinging went from 12 rebuilds to 0, and every one of 5043 sampled
points on the driveway, the car pad and the Lamborghini's own footprint now reads as arrived.

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

**The legs used to come out through it.** Measured against the real geometry: with the cape hanging
straight down, which is exactly what a leap gives (going up, drag reinforces gravity), the split
leap's 0.75 rad clears the fabric by only 0.066, and the wave then eats that. At the wave's forward
extreme the boot is 0.077 THROUGH the back of the cape. `CAPE_KICK` 0.45 of the leg's own angle
leaves 0.10 to 0.24 of clearance across the whole wave cycle. It is also just what a cape does when
you kick into it.

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

**Audio.** Everything is SYNTHESISED with the Web Audio API; no sound files ship. `master` →
`ambBus` (wind, birds, river, cottage creaks, chest zap) + `sfxBus` (footsteps, brick snaps, doors).
Footsteps read the ground through `surfaceAt(x,z)`, which the ground loader builds from its own
predicates, so the sound can never disagree with the tile. Emitters fade on distance from the
PLAYER, not the camera. Toggle persists in `localStorage['realm.sound']`.
Measured in an `OfflineAudioContext` against a grass footstep (mean power per second): gravel
footstep 2.1x, the landing's two boots 6.2x on grass and 10.7x on gravel, `launchSfx` 5.3x, the
chest's `zap` 18.1x. The take-off therefore sits with the landing and well under the one-off story
beat, which is where a repeatable foreground event belongs.
**Levels are balanced by MEAN POWER** (a ScriptProcessor summing every sample over the sound's own
duration), never by polling an AnalyserNode's peak, which misses short transients: a footstep is
21.2, and every deliberate foreground event sits at 3.5-4.4x that.
The two AMBIENCE beds were balanced the same way but offline, by modelling the Web Audio biquads
in Node (`scratchpad/chain.js`, the spec's own RBJ coefficients, and note Q is in dB for LP/HP and
a plain Q for bandpass). That is what showed the wind bed was the loudest thing in the world by 2x
and the river the quietest: standing IN the water was 0.47x the wind, six units off 0.30x. The wind
is now 9.2 against the river's 19.6 at the bank, it is highpassed at 150 (the sub-bass hum is what
read as "low static"), and it is gusted by TWO LFOs at unrelated rates so the trough reaches near
silence instead of sitting on a floor. The river's distance curve is ONE fall bent by a 0.75 power
out to 30 units; the old one multiplied two linear falls and so halved the sound by 8 units out.

**The face print.** The printed eyes, mouth and brows (`SOLID-BLACK-FACE`, `SOLID-DARK_BROWN-BROWS`)
are moved DOWN the head by `FACE_DROP` 0.025 in `shrinkFacePrint()`, so the hairpiece stops
crowding the brows. `FACE_PRINT` stays 1.00: shrinking the print was tried and rejected. Both dials
are live (`__face.drop()`, `__face.set()`). The head brick is untouched, so nothing that measures
the head moves.

Neither can be a group transform, and neither can hold the radius. The head is not a plain
cylinder: its profile flares over the bottom 0.03 and wanders by about 0.003 further up, so a print
that slid down holding its radius drifts -0.0035 to +0.0061 off the face, sinking in places and
floating in others. A 0.90 group SCALE is worse: it pulls the print toward its own centre, where
the head bulges forward, sinking 118 of the print's 125 vertices by up to 0.0068. So the transform
runs PER VERTEX against a sampled radius-against-height profile of the shell: each point records
how far off that profile it started, and keeps exactly that offset at whatever height it lands on.
Verified to 0.00e+00 error at every drop from 0 to 0.05. Geometries are cloned first, never
written through.

**The figure.** Imported rigged `.glb`s (`figure.glb`, `hair.glb`, `legs.glb`), hip/shoulder
pivots driving a stiff minifig walk. The denim legs are fitted by MEASUREMENT against the old
pants' bounds and scaled uniformly from the feet so the waist tucks into the torso rim (a
non-uniform parent scale shears the hip-attached legs). Skin is a warm olive #C68B5E, matte,
low reflection; the face print is forced true black, roughness 0.65, envBase 0 so reflections can
never tint it. The shipped `hair.glb` is the DOC OCK piece (material `hair_docock`, baseColorFactor
`0.02732 / 0.01096 / 0.00518`), not the Bizarro one an older code comment still names.

**My Lego Super Hero.** The pirate chest behind the cottage is the unlock. `zap()` still crackles
on the bridge approach (`ZAP_ZONE`); **E** at the chest opens it, and from then on the figure has a
second body. `hero_suit.glb` is the Mysterio minifig from the blend, everything below the neck
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

**The hero's head.** Cut from a Hulk head in the live blend (`Object_7.001`, 2206 verts, one 512
texture), and RECOLOURED off that texture rather than tinted at runtime: 92.9% of it was the base
green, which became the figure's own skin `#C68B5E`, 3.5% was the black print, which stayed, 1.1%
was a dark green print, which went to black, and 0.65% was near-white, kept. The other 267 colours
are antialiasing, so every pixel is remapped ALONG the segment between the two key colours it sits
between rather than snapped to the nearest one, which is what keeps the eye and mouth edges clean
(max residual to a segment, 0.048 linear). It is WELDED before it is smoothed: the Sketchfab source
ships unwelded, 2225 vertices over only 506 distinct positions, so nearly every triangle is its own
island and shading it smooth does nothing at all, whatever angle is set. Merging by distance takes
it to 506 verts, 1512 edges and ZERO boundary edges, a closed manifold, with the bounding box
unmoved to five decimals and the print's 436 distinct UVs intact. The creases are then written onto
the EDGES (`edge.use_edge_sharp`), not left to `shade_smooth_by_angle`, whose modifier the glTF
export did not carry through. 60 degrees, because the dihedral distribution is bimodal: the same
192 edges of 1512 exceed 40 and 60, so anything between those thresholds is the same answer and the
higher one is safely clear of curvature. Shipped: 770 vertices, 314 positions fully smooth and 192
carrying a real crease. The piece is fitted INTO
THE CIVILIAN HEAD'S OWN BOX: uniform scale to that head's height, then centred and seated so the
necks coincide. Nothing else is re-solved, because the suit's collar and the hairpiece's seat were
both measured against the civilian head and the box they measured is unchanged. At matching height
it comes out 5% narrower (0.4029 against 0.4244) with a stud radius within 3%, which is the safe
direction: the hairpiece sits marginally loose rather than clipping. It is deliberately NOT added
to `civMeshes`, which is the MEASURING set (a head inside it drags the collar the suit is sized
against up to the crown); `headSet` is tagged `civPart` directly instead, and `wearHero` reads
tags off a live traverse, so tagging is all that is needed.

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

**And two things about how the flight POSE is measured, which is where the real jitter was.** The
lean flattens with FORWARD speed, not airspeed: a body lies flat because it is travelling forwards,
and drifting straight up or down is not a reason to lie down. And the climb angle is WEIGHTED BY
AIRSPEED (squared), because `asin(velY/spd3)` is exactly +-90 degrees for ANY purely vertical
movement however gentle, since `velY` IS the whole of `spd3`. The old `spd3 > 0.6` guard then cut
those 90 degrees to zero the moment the drift died, which is a ninety degree snap of the torso in
ONE FRAME. Measured over a second of Shift and then a second of Space, hovering: the pose swung
154.7 degrees with a worst frame of 90.6. Fading the term in with airspeed instead of gating it,
the same input gives 12.0 degrees and a worst frame of 0.26. The FLARE is eased too, fast down and
slow up, because the floor it measures against is a raycast that steps a whole storey between
frames when a roof slides underneath. That lag costs 0.0224 of ground clearance at worst, less than
the 0.022 a running stride already puts the boot through. `poseVY` is the same idea for
the look of it, because on the raw `velY` a tap of Space whips the torso through 40 degrees in
three frames and that whip is most of what reads as jerky. The walk's own BOB is faded out in the
air: its rise and fall is a footfall and there are no footfalls up there, so carried into flight it
read as the figure bouncing along an invisible floor. What replaces it is a HOVER FLOAT, and the
difference is the whole point: it fades with SPEED, not with flight. He is holding himself up
rather than standing on anything, so at a standstill he drifts 0.07 either way at 0.28 Hz, and the
term is squared against `HOVER_REF` 2.5 so it is at 36% by one unit a second of airspeed and gone
by two and a half. Travel does not bounce; a hover breathes. The flare keeps it honest near the
ground, since `fp` is 0 at floor level and the dip half of the cycle can never reach through. Live
on `__hero.hover()`. Take-off is a 0.13s COIL then one hard pop
(`TAKE_POP` 11). Without the coil a launch is an elevator, because the flare below holds the flight
silhouette off until he is 1.25 up, so the first quarter second was a figure standing bolt upright
and rising. The coil is the LANDING crouch exactly, which is the only crouch a rigid-legged minifig
has; the launch then throws the chest back 0.30, snaps the legs together and puts the arms at the
flight kick, decaying as the flare brings the real pose in behind it. The launch pose is gated on
`agl/0.12` so it can never be at full strength while his feet are still on the plate (the back lean
costs the heels 0.068, against the 0.18 the pop has already lifted him). Pressing F again during
the coil zeroes `takeT`, or the launch pose would play out on the ground. Live on `__hero.take()`.

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

**ONE controls bar, and it is `.hint`.** `#prompt` sits at bottom 112 and `.hint` at bottom 24, so
any `say()` full of key names stacks a second controls centre above the one already there. Both the
take-off line and the chest's unlock line used to do it. Everything the suit adds is now listed on
the permanent line instead, which has four states because what the keys do changes: `HINT_WALK`
(locked), `HINT_SUITOFF` (unlocked, adds `T` for the suit), `HINT_SUIT` (worn, adds `F` to fly and
`T` to change) and `HINT_FLY`. `syncPowerHUD` picks between them on the state transitions rather
than per frame, off `flying` / `heroOn` / `heroUnlocked`. All four now end in `R` leave, which
took the measured widths at 12.5px from 460 / 481 / 481 / 547 to 536 / 556 / 557 / 622, so
`white-space:nowrap` clips below a 622px window against the 547 that shipped before. `say()` is for STATUS now
("Suit unlocked", "Suit on"), never for controls. The one exception is TOUCH, where `.hint` is
`display:none` and those lines are the only guidance a phone gets. Touch also has no `T` key and no
pill any more, so on a phone the suit is changed back at the CHEST, which already offers it.

**Flight.** `F` toggles it (or a double tap of Space, guarded on `e.repeat` because a held hop fires
keydown 30 times a second), and `T` swaps the outfit. There are NO HUD pills left: both the yellow FLY and
the SUIT pill were removed at Shyon's request (with them went the whole `.pw` class), so the hint
line under the canvas is the only place any of it is named. That line has three versions picked by `syncPowerHUD` on the state transitions
rather than per frame: `HINT_WALK`, `HINT_SUIT` (which adds `F` to fly, on the ground and only
there) and `HINT_FLY`. The unlock line at the chest names `F` too. TOUCH has no F key and no pill,
so on touch alone the JUMP pad is the take-off, and it reads JUMP / FLY / UP. In the air, Space climbs, Shift drops,
letting go coasts to a hover, and the stick steers relative to the camera as it does on foot.
`solidCells` is rasterized at BODY height (0.30..1.5) alone, so it says nothing useful the moment
you leave the ground: flight collision instead uses `roofY`, the four big structures' real roof
heights measured by the loaders that rasterize them, and a structure blocks only BELOW its roof.
Everything smaller (trees, props, the river) is simply flown past. Roofs are NOT in the walkable
heightmap, so a hover over a building settles at `roof + FLY_CLEAR` and the landing only commits
over real ground. The unlock is deliberately NOT persisted: the chest has to be found again every
visit, so the suit can never be an option on a cold load.

The arms lead the flight and answer to SPEED, not to being airborne: `flyArmKick` throws them up on
take-off and decays over about a second, after which `speed/(FLY_SPD*0.5)` holds them up while he is
travelling and drops them to his sides as he slows to a hover (`FLY_ARM_UP` / `FLY_ARM_REST`, both
live on `__hero.arm`). **Shoulder pitch sign:** a shoulder `rotation.x` of x swings the hanging arm
to `(y,z) = (-cos x, -sin x)` in body space, so POSITIVE x carries the arm BACKWARD and negative
carries it FORWARD. The walk's own comments read the other way round and are not to be trusted.
`FLY_ARM_UP` is -2.90 and `FLY_PITCH_DIVE` 1.38 rad (79 degrees, almost flat). Neither arm state
runs to the full raise: `FLY_ARM_KICK` 0.55 and `FLY_ARM_TRAVEL` 0.72 cap them, which against the
TORSO (the frame you actually read the pose in, since fully down is -78.5 and fully up +76.2, so
halfway is -1.2) puts take-off at +6.5 degrees and travelling at +32.8. Note this is measured on the
torso, not the horizon: with the body pitched 79 degrees the travelling arms sit 46 degrees below
the horizon, so raise `FLY_ARM_TRAVEL` if they ever read as drooping. `__hero.pitch(hover, dive)`
tunes the lean, `__hero.armAmt(kick, travel)` the two caps. The bottom hint line swaps with the mode, because it is the only place Shift
is ever explained: run on the ground, descend only once flying.

**The pointer, and the two keys that replaced the buttons.** `#c` is `cursor:none`: the mouse only
ever DRAGS out in the world, so the arrow is noise. `enterPortal` puts it back (`'default'`) and
`exitPortal` takes it away again, because the portal panels are really clicked.
**The cursor is the MAIN SITE'S OWN CIRCLE DOT** (`#cur`, mirroring `#ss-cursor-dot` in
`src/App.tsx`): 9px, round, white, riding the pointer with no easing. This REVERSES an earlier
decision (user, 2026-08-31). Two stand-ins, a four-tick cross and then a LEGO stud, were built and
removed at Shyon's request with the note "don't rebuild it"; he has since asked for the main site's
dot specifically, which is a different thing from either.
**One property of it had to change, and the reason is measured.** The main site paints the dot with
`mix-blend-mode:difference`, which over a backdrop B composites to `B + a*(255-2B)` and so CANCELS
EXACTLY at B=127.5. Over the Realm that value is the driveway and the car pads, which is the surface
the pointer spends the most time over: measured, the difference dot reads dLum 136 on the sky, 146
in the fog, 146 on a black car and **1.0 on mid grey**, i.e. it disappears completely exactly where
the four cars are parked. Painted normally its own contrast is `|255-B|`, which fails only at the
bright end, and a 1.4px dark `drop-shadow` carries precisely that end, so the worst case is the
crossover at B=127.5 where BOTH read 127.5. `__D.cursorBlend(true)` switches to the pure main-site
version for comparison. It is shown only over the CANVAS and only in hub mode (`e.target===canvas`
is the whole test, because the canvas sits under everything, so no list of HUD elements has to be
kept in sync), and it hides for the whole of a POINTER LOCK, since `clientX` is frozen throughout
one and the dot would otherwise sit stranded where the pan began.
Any bordered ring, if one is ever tried again, needs `box-sizing:border-box`, or
the 1px border makes a 15px ring 17px on screen and a -7.5 margin misses the pointer by a pixel. Only the CANVAS
carries the rule, so every HUD element keeps its own cursor. The top-right cluster (`Leave the
Realm`, the sound button) is then `body:not(.touch) #topright{display:none}` at Shyon's request:
aiming a hidden pointer at a button is the wrong shape. On a keyboard **`R` leaves** (same `/` the
link carried, and it works from inside a portal too) and **`M` mutes** through `toggleSnd()`, which
the button also calls; with no icon on screen the state is reported by `say()`. TOUCH keeps both
buttons, and `touchRows` names them in the CONTROLS card, which gained a row for each.
Note `R` sits a finger away from `WASD` and the hero unlock is not persisted, so a stray press
costs the suit.

**First person in the mansion's upstairs.** Step through the grey archway off the balcony and the
camera moves into his head (user, 2026-08-31). The archway is identified rather than assumed: the
geometry bordering the opening is the mansion's own `Dark_grey` `#4d4d4d`, and it is the ONLY way
between the balcony and the room.
**The trigger is THE ROOM, not the doorway.** `houseRoomCells` is every upper-floor cell with a ROOF
over it, which is exactly what tells the room apart from the open balcony it opens onto, so crossing
the arch IS the trigger, from any direction and at any angle, and there is no threshold to get
caught straddling. It is built at load off the loaded model's own box (`surfaceBelow` in 3.5..4.0
for the upper floor, `ceilUnder` over 6.0 for a roof: under the mansion's roof the flight column
tops out at 6.7 and over the balcony at the 4.5 parapet), so no coordinate needs maintaining and it
re-derives itself if the model ever moves. 2296 cells, against the 1444 the ASCII plan reports,
because the plan skips WALL cells before testing for a roof and the build does not, which is
harmless: a cell under a wall has a floor and a roof like any other and you can never stand in one.
The height gate `player.y > HU_FROM` (3.30) is what keeps the GROUND floor in third person, since
the room's floor is 3.714 and downstairs he stands at 0.
`FP_EYE` is 1.43 and is MEASURED, not guessed: the printed face (`SOLID-BLACK-FACE`) spans y
1.3184..1.4593 above the player root with the brows at 1.4501..1.4936 over it, and 1.43 is also dead
centre of the head brick (1.193..1.653).
**The blend is of the WHOLE solution, position and aim together, and not `camDist` wound down to
zero**: at zero the orbit collapses onto the player and `camLook` sits on top of the camera's own
position, which is not a direction at all. The aim runs OPPOSITE the orbit arm, because that is
where the third-person camera was already looking, from behind him and through him. The floor clamp
stays on the ORBIT solution alone, since an eye belongs at the head rather than pushed up off the
ground the way a trailing camera has to be. And **the follow ease goes rigid with it**
(`0.2 + 0.8*fpAmt`): closing a fifth of the gap per frame is what gives the third-person camera its
weight and is precisely what makes a first-person view swim, the head lagging the body it is bolted
to. The body is hidden over `fpAmt > 0.6`, in hub mode only, because `enterPortal`/`exitPortal` own
that flag either side of it.
**The pitch range opens exactly as flight's does**, and needs flight's sensitivity with it: indoors
you have to be able to look up, and a range that has nearly doubled would otherwise cost twice the
drag for the same sweep. The ease-back that pulls the aim down to 0.06 on foot is gated off while
first person holds that range open, or the camera sags to the floor every time you stop dragging.
Measured in engine: `fpAmt` 0 on the balcony and 1 in the room, the camera exactly at the player in
x/z and at `player.y + 1.43`, the ground floor still third person, the arch crossing at x 50.6, a
ramp that is monotonic and reaches 90% in 0.45s, and the view direction really pointing up at
`camPitch` -0.7 (`scratchpad/verify_fp.cjs`, 26 assertions). The transition does sweep the camera
through the wall on the way in, which reads as a push-in and is ~0.45s; note there is no camera
collision upstairs at all (`camCell` only runs below y 1.5), so the third-person camera up there was
already outside the building looking through its walls, and this removes that rather than adding it.

**Debug hooks**, all temporary, strip before a final polish deploy. URL hashes (no console needed,
which is what makes them usable in Safari): `#nopipe` forces the old direct path, `#noao` / `#nobloom`
/ `#nosmaa` switch off one pipeline stage each, `#noshade` skips the suit's colour remap. Objects: `window.__D` (`time`, `tp(x,z)`,
`step(dt)`, `blocked`, `portalAt`, `shopPad`, `surfaceAt`, `audio`, `pipe`, `scene`, `camera`, and
`yaw`/`pitch`/`lookLocked`/`fp`, which READ back as well as set, and `cursorBlend`), `__FC` free-cam, `__R`, `__props`, `__bub`, `__petals`, `__stems`, `__gravel`, `__reeds`,
`__money`, `__houseLights`, `__matGreen`, `__lambo` (`lens`), and `__hero` (`wear`, `fly`, `drop`, `trim`, `spin`,
`nudge`, `lock`, `roofs`, `fit`, `hair`, `flare`, `ease`, `land`, `take`, `speed`, `cape`,
`sockets`, `head`, `leap`, `colours`, `metal`, `skin`, `hover`, `sway`, `palette`).
The hero's dials are LIVE: `drop/trim/spin` re-seat the
hairpiece without a reload, which is the only way to tune a piece the pane cannot render.

---

## 6. Current state (2026-08-30)

`docs/` is the build output and is NOT current: the super hero, the tentacle removal and the
walled garden live in `public/` + `src/` only. Build and deploy when Shyon asks (§4).

The Realm currently has: the four structures and four portals above, the walled garden out in the woods
behind the mansion (lawn inside and out, no paving, a dirt track in), a bridge over an organic
river, 73 planted trees + 100 background + 52 outer-trim trees (five leaf-tone material variants
handed out per tree, times three per-piece leaf-colour variants), 804 flower plants in two blocks,
interior + outer band (`PETAL_HUES` gives each head one flat colour from 5 shades of
red/blue/yellow, `PETAL_N` decides how many of a plant's 4 stems flower, and the stalk takes one
green of its own), organic gravel paths, props (wine-red Porsche with silver rims and a peanut-butter interior, the white Corvette C7 Z06
parked behind it on the mansion driveway, a black Lamborghini Countach with gold rims on the second
car pad beside them and a red 1969 Aston Martin DBS parked nose on to its tail, an electric
piano against the living room's north wall, skull, rat,
Tardis + NABU crystal, pirate chest + money bricks), the day cycle, the render pipeline, the sound layer, the
title bubbles, mobile touch controls (joystick + jump + contextual pills), and My Lego Super Hero
behind the pirate chest (suit swap + flight). Flight collision is now per-geometry in three
dimensions (§5), and the mansion's upstairs is a real room you can fly into and walk around.

The homepage scrolls: a hero, then a 13-frame storyboard of how the Realm was made, in a flowing
layout with staggered variant-driven entrances (kicker slides, heading and body rise, stills fade
out of a slight scale). A snap-deck version of this was built and **reverted** — the ask was
animation, not pinning; don't rebuild it. Stills are 7 in-engine frames shot at the game's REAL fog
and 7 staged Blender frames showing the structures part-built.

**Naming trap:** the Work category displays as "Personal Projects" but its internal id is still
`creative-projects`, which keys the theme map, modal branches and portal lookups. Never rename the id.

---

## 7. Traps that have cost real time

**Verification**
- **The in-app preview pane has NO WebGL** (`getContext('webgl')` returns null for webgl, webgl2
  and experimental-webgl). `lego.html` cannot be seen there at all. Run a dev server for Shyon.
- When WebGL did work, the hidden pane throttled rAF AND setTimeout, so use `__D.step(dt)` frame
  pumping rather than waiting. An UNpaced rAF shim floods the GPU and loses the context.
- The camera EASES (`lerp 0.2`), so step 60-90 frames after `__D.tp` before measuring or
  projecting. `__D` exposes `dist`/`pitch` as SETTERS ONLY, and they drift during a session, so
  re-assert `__D.dist=8.45; __D.pitch=0.24` before any framing measurement.
- A hand-placed snapshot camera renders sky-only unless you set `aspect` and
  `updateProjectionMatrix()`; when the pane is hidden `renderer.getSize()` gives NaN, so hardcode.
- `scene.children.filter(o=>o.isInstancedMesh)` is the ground set. Indexing `scene.children`
  directly grabs lights and makes every answer wrong.
- Ground audits work by raycasting a point and comparing the hit material to `window.__matGreen`.
  An ASCII map of cell centres is the fastest way to see a tile edit before and after.
- The camera passes through tree canopies, and the border tree line sits on the rim, so a camera
  teleported to rim coordinates is usually inside a canopy.
- Dispatching a synthetic keydown with no matching keyup leaves the key held and the figure walks off.

**Three.js r128 (the vendored build)**
- `PMREMGenerator.fromScene()` renders every material BLACK with no error. Use `fromEquirectangular()`.
- Three keys the compiled program per MATERIAL: an InstancedMesh that shares a material but sets no
  instance colours throws every frame. `matGrey` AND `matGreen` are now both always instanced WITH
  colours (the grass detail pass converted the green field, both mosaics and the mansion's green
  filler together, which is the only way to add them); `matBank` likewise. The `probe` mesh shares
  matGreen but is never added to the scene, so it does not count.
- **`attach()` REPARENTS, so any list of meshes captured after rigging is missing the ones the rig
  moved.** The hero's arms, hands and legs go onto the hip/shoulder pivots and stop being
  descendants of `heroSuit`; a `heroSuit.traverse()` taken afterwards silently omitted exactly
  those six, and they stayed visible through the civilian body. Capture BEFORE rigging, and drive
  visibility off a `userData` tag read from a live traverse rather than off a captured array.
  `scratchpad/hero/test_swap.js` replays this against the real vendored three.js and shows the two
  orders side by side; it needs no WebGL.
- `WebGLRenderTarget.setSize()` does not resize an attached `depthTexture`.
- `renderer.setSize(w,h,false)` + CSS `width/height:100%` on the canvas: let CSS own the layout box.
  Size from `getDrawingBufferSize()`, never `innerWidth`, which is 0 in a hidden tab.
- Any code ground drawn below `plateTop-0.01` is BEHIND the far land, so "recessing a cell out of
  the way" hides it and shows green instead.
- LEGO glass must be `FrontSide`: a solid brick's front and back faces both alpha-blended compound
  toward white, which is what made every window a milky slab.
- **A depth-derived normal goes NaN on the AO buffer's border row.** The offset sample clamps back
  onto the pixel, so that side's delta is exactly 0, and since no depth difference is smaller than
  0 the zero side wins for every pixel on the row: `cross` returns zero and `normalize` divides by
  it. The NaN survives the depth-aware blur (one NaN tap NaNs the whole sum) and clamps to black in
  AgX, drawing a dark band along the top and bottom of the frame. Fixed by never picking a collapsed
  axis and by treating off-buffer disc samples as unoccluded. Any depth-reconstruction shader added
  later needs the same two guards.
- **Backticks inside a GLSL comment terminate the shader's JS template literal.** The file's shaders
  are template strings, so a comment like `` `abs(x)` `` breaks the whole script with a syntax error
  far from the edit. Parse-check with `node -e` after editing a shader.

**Assets and Blender**
- **The blend is `~/Desktop/3D Models /My Lego World .blend`** (note the space before the slash,
  and the space before `.blend`), is NOT in git, and was once recovered from the iCloud Trash.
  Do not save it casually. Back it up. Export from a HEADLESS Blender opened on the SAVED file and
  never save: that touches neither the user's live session nor the blend.
- Loaders auto-recenter on the glb bbox, so **any geometry deletion that changes a model's outer
  bbox slides the whole building** and needs holder compensation. Solve the holder backwards from
  where the walls must land, then verify a known material's bbox is unchanged.
- **Never share a scale constant between two assets exported at different times.** `bridge.glb` is
  `PITCH/0.3513`, `water_plate.glb` (cut from an older export) is `PITCH/0.35666`. Re-measure the
  stud pitch off any re-export.
- Always re-import the CURRENT shipped glb before editing it; other sessions edit these files too.
  Keep a pre-edit backup in the scratchpad.
- Mecabricks glbs ship UNWELDED (nearly one island per triangle), so island/connected-component
  logic needs `remove_doubles` first. And before treating co-located islands as duplicates, check
  per material slot: the flower head is three PIECES, not three copies, and dropping two of them
  left a hole.
- Clearing a parent KEEPS the local matrix. Stamp `matrix_world` back after clearing, or the export
  comes out at the parent's scale (once by 136x).
- **Setting a PARENT's rotation can silently do nothing in a headless open.** `root.rotation_euler`
  plus `view_layer.update()` never reached the Lamborghini's children: their `matrix_world` stayed
  at the original orientation, so the car exported at its old 69.96 degree angle and the only tell
  was an axis-aligned bbox that did not match the measured length. Multiply each mesh's OWN
  `matrix_world` by the rotation instead. It needs no depsgraph and cannot go stale. Then assert
  the result off the flattened geometry rather than trusting the operation.
- Do not Draco-compress skinned meshes; it can mangle joint indices.
- **A Sketchfab or Mecabricks glb ships UNWELDED, and that silently defeats smooth shading.**
  Every triangle is its own island, so there are no shared edges for a normal to be averaged
  across and `shade_smooth` at any angle changes nothing. Merge by distance FIRST, then smooth.
  The tell is the vertex count against the count of distinct POSITIONS.
- **`shade_smooth_by_angle` adds a modifier the glTF export may not carry.** Write the creases onto
  `edge.use_edge_sharp` instead, and confirm by re-reading the finished glb: count how many
  positions carry more than one normal. Zero everywhere means nothing was creased; one normal per
  face means nothing was smoothed.
- **A glb's geometry-local axes are NOT the figure's.** A Blender export leaves each mesh NODE
  carrying the Z-up to Y-up rotation, so inside `geometry.attributes.position` the up axis is
  local +Z and back is local +Y. Anything that deforms vertices, or reasons about height or
  facing in geometry space, has to derive its frame from the mesh's own matrix. Reading the raw
  local y as height is silently wrong and looks like the model tearing itself apart.
- **`im.pixels` are LINEAR, and this export path writes them out untransformed.** Recolouring a
  packed texture and exporting gave a PNG holding the linear values as bytes. Encode back to sRGB
  by hand and tag the image `Non-Color`. Verify by extracting the PNG from the finished glb and
  reading its actual pixel values; do not assume the round trip.
- The glTF export bakes only the BIND pose. The tentacle chains export perfectly straight; their
  Doc Ock curve comes from IK the export does not carry, so the shape has to be built at runtime.
- Headless Blender (`--background --factory-startup`) is the safe way to edit a shipped glb without
  touching the user's session or blend.
- Blender UI capture: `bpy.ops.screen.screenshot` is the only thing that works (the MCP image
  transport errors); call `wm.redraw_timer(DRAW_WIN_SWAP)` first or you photograph the old framing;
  local view EXCLUDES lights; switching workspace only takes effect on the NEXT call.

**Geometry and placement**
- **`targetLen` is NOT `len/rawLen` when the prop is rotated.** `loadProp` takes its `Box3` AFTER
  the holder's `rotation.y` is applied, so a yawed prop divides by the ROTATED, larger box and its
  live scale is smaller than the arithmetic suggests. The Porsche's `rotY` -0.015 makes its real
  scale 0.820558 against a computed 0.829556, its body 5.539 long against the 5.600 `targetLen`
  reads, and its rendered stud 0.287027 against a claimed 0.29018. Anything that sizes one prop
  against another must read the other's LIVE `holder.scale` from the running scene, never re-derive
  it from the config. This silently mis-sized the Countach by 1.1% before anyone looked at it.
- **Compare two props in WORLD units, in the live scene, not in either model's own frame.** A
  measurement taken off a Blender import is in raw model units and has to survive `targetLen`, the
  bbox recentre and the holder to mean anything. The Corvette's tyre measured 1.2418 in Blender and
  1.2562 in engine, 1.2% apart, purely from how the fit was bounded; the engine number is the one
  that is on screen.
- Never derive a centre from a scan whose bounds you chose before measuring the object.
- **A pivot that is only slightly wrong is invisible until the rotation gets big.** Borrowing one
  limb's pivot for another limb's piece hides inside a walk cycle and falls apart at a flight pose:
  the error is a chord, `2r sin(theta/2)`, so 0.10 of pivot offset is 0.02 at a quarter radian and
  0.175 at 2.14. Give an imported piece a pivot measured off ITS OWN geometry.
- **The figure's body pitch turns about its FEET.** Any lean past 90 degrees puts the head below the
  ground plane, and even a modest lean sinks whatever is FORWARD of the ankle. A pose that has to
  work near the ground is checked by transforming the real vertices, not by eye.
- `figure.glb` is DRACO-compressed and a plain Python glTF parser cannot read it; the rest of the
  figure's pieces are not. Headless Blender imports either (`bpy.ops.import_scene.gltf`), and the
  axis conversion back to three's space is `three = (bx, bz, -by)`.
- The third-person camera pitches DOWN, so a sign leaves the top of the frame as you approach, and
  how far back the trigger must sit scales with how high the sign hangs. Measure by projecting the
  sign's REAL `Box3` top (plus the idle bob) through a clone of the live camera, from the exact
  spot the trigger fires at. Standing on the raised bridge deck frames a high sign better.
- Appending a `//` comment to the END of a data-array line comments out the rest of that line and
  silently drops entries. Comments go on their own line.
- After region-boundary cuts, sweep for surviving fragments per material with a vertex sweep, not
  raycasts from above.

---

## 8. Open work

- **`garden.glb` is NOT in the saved blend.** It was exported from the LIVE Blender session, where
  `LEGO Garden Wizard` had been added but not saved (the session was dirty; the export touched
  only the selection, which was restored). So `public/assets/garden.glb` is currently the ONLY
  copy outside that session. If the blend is re-saved it should pick the object up; until then,
  do not assume a headless open of the saved file can see it.
- **`aston.glb` is NOT in the saved blend.** `Lego car (1969 Aston Martin DBS)` was added to the
  LIVE Blender session and the session was still dirty when it was exported, exactly as `garden.glb`
  was. The export was taken selection-only out of the running session with the user's selection
  saved and restored and nothing else touched (`is_dirty` was true before and after), so
  `public/assets/aston.glb` is currently the only copy outside that session. It will be picked up
  by the next save of the blend; until then a headless open of the saved file cannot see it.
  Two of its material colours are import defects, shipped as-is on request (see §5).
- **The garden has never been SEEN in engine.** Placement, orientation, scale, the ground and the
  collision were all verified by measurement and by headless renders (§5), because the pane has no
  WebGL. It has now been pushed out once already (front 60.089 -> 61.937, `BX1` 66 -> 67.7) after
  Shyon said it read far too close to the house, and the concrete apron an earlier pass ringed it
  with was removed at the same time. It cannot go much further east without moving trees: 67.7 is
  0.26 off the nearest trunk.
- **The super hero has never been SEEN.** The suit fit, the hairpiece seat and the flight rules
  were all verified by measurement (headless Blender against the real GLBs, plus a standalone GLB
  parser in a session scratchpad), because the pane has no WebGL. Shyon's eyes are the only
  check left. `__hero.drop/.trim/.spin/.nudge/.arm/.grow` exist so both fits and the flight arm
  pose can be dialled live.
- **The piano has never been SEEN in engine.** Its size, placement, facing and clearances were all
  verified by measurement and by headless Blender renders (§5), because the pane has no WebGL. The
  scale in particular is a judgement made against the figure's own height and the wall's own length:
  at true stud pitch the build does not fit either. `Lego Electric Piano` IS in the saved blend
  (unlike `garden.glb` and `aston.glb`), and its FLOATING HEADPHONES are cut from the shipped glb.
- **The mansion's upstairs is empty**, and deliberately so: Shyon asked for it to be solid and
  enterable because he wants to put something in there. It is one room plus the balcony, floor
  3.714 to 3.782, walls to about 5.9, entered through the balcony door (§5).
- **A hero LEAP upstairs still pokes through the ceiling.** Space clears 2.82 in the suit and the
  room has about 2.1 of headroom. The jump arc is gravity, not the flight solver, so the climb
  guard does not see it. Nothing was done about it because nothing was asked; it needs the same
  body-band test on the upward half of the jump.
- **Rooftop landing is deliberately not built.** A flying hero hovers above a building rather than
  standing on it, because roofs are not in the walkable heightmap and raising that cap changes
  ground walking. If standing on roofs is wanted it needs a roof surface set that `surfaceBelow`
  and `stepOne` consult only above the structures, not a wider heightmap.
- **The suit is a licensed costume.** `hero_suit.glb` is a Mysterio minifig and `hero_hair.glb` a
  Joker hairpiece, both from a Sketchfab import, which sits against the "no copyrighted characters"
  rule in §3. Shipped at Shyon's explicit request; flagged here so it is a decision, not a slip.
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
- **A CAMERA THAT FREEZES MID-PAN IS USUALLY THE PAN RUNNING OUT OF SCREEN**, and that was the one
  actually being hit. Steering on `clientX` means the yaw is bounded by the physical edge of the
  display: at `SENS` 0.0065 a full turn is `2*PI/0.0065` = **967 pixels of cursor travel**, so from
  the middle of a 1512-wide window there is only about **280 degrees** of turn in a single drag
  before the cursor is pinned against the bezel, `clientX` stops changing, and the camera stops
  while the hand keeps moving. Let go, re-grab, and it works again, which is exactly what it looks
  like: an intermittent lock-up. **POINTER LOCK is the fix and the only one.** It is taken on
  `pointerdown` for the duration of the drag and handed straight back on release, and the deltas
  then arrive as `movementX`/`movementY`, the same CSS pixels with the same OS acceleration, so the
  feel is unchanged. **Hub mode only**: the portal panels are really CLICKED, so the menu keeps a
  real visible pointer and stays on `clientX`. Every step can fail (no support, denied, a
  rate-limited re-lock) and every failure falls back to the `clientX` path, so a refusal costs the
  unbounded pan and never the pan itself. Measured in real Chrome over WebGL with dispatched input
  (`scratchpad/probe5.cjs` style): a drag turned **894 degrees** where the window edge alone allowed
  238, and three drags back to back with no pause were all granted, so the re-lock rate limit is
  not in play.
  **The second half of it is the gesture being taken away from the page**, which is a different
  failure with four independent guards, none subsuming another. `preventDefault` on `mousedown` and
  on `dragstart`, plus `user-select`/`user-drag:none` in the CSS, stop the BROWSER starting a text
  selection across the HUD or a native drag of the canvas as an image; `contextmenu` is suppressed
  on the canvas, because a right-click or a ctrl-click part way through a pan opens the OS menu,
  which holds the pointer until dismissed and which `preventDefault` on `mousedown` does NOT cover,
  being its own event; `setPointerCapture` covers the gap before a lock engages and the whole drag
  when a lock is refused, since **without a capture the gesture belongs to whatever the pointer is
  over**; and `pointercancel` / `lostpointercapture` plus `e.buttons===0` on a move are the releases
  for a gesture that ends with no `pointerup`.
  **Two traps a rewrite will hit.** Entering a lock can fire `lostpointercapture`, and clearing the
  drag there kills the pan at the instant the lock takes over, so that handler stands down while a
  lock is held or pending. And `clientX` is FROZEN throughout a lock, so the frame a lock ENDS on
  carries a client position that may be half a screen from `lx`: `reanchor` re-seats the anchor on
  the first unlocked move instead of applying that jump as a pan.
  **`blur` is deliberately not a release** while a capture is held: a window can lose focus for
  reasons other than the user letting go, and killing the drag there froze pans still under the
  hand. The `pointerup` or the `pointercancel` is still coming.
  One older latch is unchanged and still load bearing: the early return for `fading`/`camAnim` keeps
  `lx`/`ly` current, or the drag that resumes afterwards snaps by the whole distance travelled
  meanwhile. Verified two ways, both without a GPU for the logic and with one for the lock: the
  SHIPPED block extracted by content and replayed in a real shared `vm` context over nine gesture
  families (`scratchpad/verify_lookdrag.cjs`), including the screen-edge pan, which reproduces the
  bug at 281 degrees against 894 with the lock; and in headless Chrome over SwiftShader with real
  dispatched input for the lock itself.
  **Two things that were measured and are NOT the cause**, so they need not be re-investigated:
  lazy shader compilation (`renderer.compile()` at spawn adds only 5 programs to the 44 already
  linked, against 228 distinct materials) and an exception killing the render loop (`loop()`
  schedules its `requestAnimationFrame` BEFORE calling `frame()`, so a throw costs one frame, not
  the loop).
- **The mansion's plate does NOT end at z 7.2845 all the way along.** That is true only of mask row
  e, x 50.72..57.37. Across rows a to d the mask reads '.' at gi 36 AND 37, so the model's plate
  stops at z 6.545 and leaves 0.74 of open ground that the code ground grassed: a green strip 7.4
  long lying against the driveway exactly where the Porsche parks. `carPad`'s z0 went 7.03 -> 6.30
  -> 6.10 to cover it and then the stud-centre seam behind it (see the code comment). A second seam ran down the plate's WEST edge: every pad along that stretch overruns
  to x 43.15, but between the drive channel (z<3.11) and the car pad (z>6.30) nothing did, leaving
  a half-stud of grass for three units across the driveway mouth. `plateEdge` is that same overrun,
  and it is deliberately kept OUT of `gritty` so it does not gravel against the smooth slab.
  Both were found by rasterizing the shipped predicates to an ASCII plan (`scratchpad/plan.js`,
  which pulls `onHousePlate` / `mansionDrive` / `carPad` / `plateEdge` / `onWalk` straight out of
  the file by content, not by line number), never by eye.
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
- **Mobile gets no render pipeline** (the HDR buffers alone are ~130MB at 2x dpr) and has not been
  tested on a device. Frame cost is ~20-22M tris, dominated by `tree.glb` at 79k tris each; that is
  where any further budget lives.
- **Debug hooks** (§5) are still in the shipped file.
- The Realm's og:image still points at `story_world_midday.jpg`, which is why that file stays on
  disk although the storyboard no longer uses it.
