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

**The mansion's upstairs.** Reached by FLYING onto the balcony (parapet top 4.520, so the body
band clears it from feet 4.41) and walking in through its door, which is the gap in the wall at
x 50.4..51.5, z -5.1..-3.3, open from the floor to a header at 5.76. The floor is the upper plate
top 3.714 with stud tips at 3.782; the roof is 6.676 and the room's own headroom runs out around
5.9. Its walls, glass and parapet are `houseUpCells`, its floor is the mansion's `tight` heightmap
slice, and both are measured off the loaded model. It holds the SUIT on its display in the
north-east glass corner and, since 2026-09-02, the ELECTRIC PIANO against the far wall opposite
the archway. Nothing else about the mansion moved: the ground floor, the
driveway and both parked cars walk exactly as they did, which is why the heightmap slice is
3.70..3.90 and not the default band (the model's own plate tops sit at -0.06, a tenth below the
ground everything currently stands on).

**The electric piano is UPSTAIRS, across from the grey archway** (user, 2026-09-02). It stood in
the living room downstairs until then, against the wall the entrance porch is on the other side of;
it is now in the room off the balcony, against the far wall, facing back at the arch you come in
through. `piano.glb`, a LEGO keyboard on a brown stand.
Every bound is measured off the LOADED MODEL and not off the occupancy grid, which is quantised to
`OCS` and reads the same wall a tenth of a unit early: the room's east wall is `LegoWhite` brick
with its inner face at **x 56.4322**, and the ARCHWAY is the gap in the west wall at
**z -5.217..-3.104** (2.113, about 5.7 studs), so the doorway's middle is z -4.1605
(`scratchpad/room_probe3.cjs`, `room_probe5.cjs`).
**It is deliberately NOT at its own stud pitch, and both measurements that decide that were taken.**
Its lattice is **0.1855**, the nearest-neighbour distance over the stud centres on four separate
horizontal layers of the build (55, 49, 72 and 40 studs, all four returning the same number), which
makes it a 12x6 stud table carrying a 10x4 keyboard, 22 plates tall. Scaled to `PITCH` it is 2.742
tall with its playing surface at y 2.00 against a figure whose head tops out at 1.770: the keys
would sit above the minifig's head. At **1.0800247** it is 2.402 x 1.487 x 1.200 and the keys land
1.188 above his feet, chest height. Rendered its stud is 0.2003, 0.54 of `PITCH`; the cars already
render theirs at 0.78, so a prop carrying its own brick scale is the rule here rather than an
exception.
**THE SCALE IS UNCHANGED BY THE MOVE, AND THAT COSTS THE FLUSH BACK.** Downstairs 1.0800247 was
SOLVED rather than chosen: `loadProp` snaps the holder to the world stud grid, so at `pos` z
`-8*PITCH` the back face landed on the wall exactly when the depth was 1.19982, i.e. that scale on a
model 1.110919 deep. That constraint cannot be re-solved against this wall without giving up the
approved size (the grid stud nearest it is `151*PITCH` = 55.78695, where flushness would need scale
0.9597, an 11% shrink), so the SIZE wins: the piano stands **0.0454** off the brick, an eighth of a
stud and the closest the grid comes.
· `x` `151*PITCH` = **55.78695**, back face at 56.38686 against the wall's 56.4322.
· `z` `-11*PITCH` = **-4.06395**, the grid stud nearest the archway's centre, 0.097 off it. At 2.402
  wide it spans -5.265..-2.863 and reads across the whole doorway.
· `y` **3.6852**. The upper floor is built exactly as the ground floor is: plate top 3.7144, stud
  tips 3.7815, a 0.0671 stud, against -0.0640 and 0.0032 downstairs for the same 0.0672. Read by
  AREA and not by triangle count, which is what tells a plate top from a stud cap (the plate carries
  25.4 units of up-facing area against the studs' 6.4 while having far fewer triangles). 3.6852 is
  the stud tips less the same 0.0963 the approved downstairs seat used: a LEGO piece rests its
  underside on the plate and swallows the studs.
· `rotY` **-PI/2** carries the keys, which face the model's own +Z, round to world -X, so they look
  west through the archway and out at the balcony.
· **`solidHouseUp`, not `solid`.** `cfg.solid` rasterizes at GROUND body height, where this prop no
  longer exists, so it would have been walk-through up here AND would have gone on blocking the
  living room it left. `solidHouseUp` is the mansion's twin of `solidUp`: `houseUpCells` at
  `HU_Y0..HU_Y1`, `only`, so the hall underneath stays clear.
Headroom: 1.487 tall, topping out at 5.172 under a 6.17 ceiling.
Verified in engine, not by arithmetic (`scratchpad/verify_upstairs.cjs`): the holder's live
position, rotation and scale, its world box against all four walls and the ceiling, real floor under
all four corners, `stepBlocked` true upstairs and false in the hall, and its cells in `houseUpCells`.
**The export DROPS the floating headphones the build ships with**: four `MB_26` islands standing in
mid air 0.47 beside the table at y 0.285..0.595, with nowhere to be rested, since the keyboard
covers the table top to within a stud on every side. The rest is joined into one mesh per material:
9 draw calls, 59,712 triangles, 168KB Draco. It needs neither `fixWinding` (all 9 meshes score
0.00000 reversed) nor an sRGB conversion (`MB_1` is 0.9047, which read as LINEAR is sRGB 245, i.e.
LEGO White; read as sRGB it is 231, which is nothing). `scratchpad/piano/export_piano.py`.

**The cave clearing.** `cave.glb`, a LEGO rock cave sunk into a dished stone clearing north of
the car pad, with a skeleton seated inside it and loose bones scattered round. No portal: it is
where you become the GHOST (§ below). The ground here is built FROM the cave and not the other way
round, which is the one idea the whole area rests on: cave.glb is a single material, sRGB
**#494848**, so the lawn gives way to STONE and the hollow reads as that stone dishing rather than
as a hole cut in grass. Three earlier cuts read as a T-shaped trench, then a swimming pool, then a
rock sitting on the floor like an ornament; the notes below are what each one cost.
**The hollow is a signed distance FIELD, not rectangles.** `hollow(x,z)` is a wobbled ellipse
(`BOWL_X/Z/R/ZS`) built from the same `wob`/`bank`/`rrect` every grey pad uses. It was two
axis-aligned rects on straight tile indices, on the theory that a dig has straight sides; nothing
else in this world has a straight edge, so that was the one thing that read as machined, and from
above two rects meeting at right angles are a T.
**`TSTEP` (1.40) IS A WALKABILITY CONSTRAINT, NOT A LOOK.** Depth is `floor(d/TSTEP)` terraces of
`PIT_RISE` (2) courses, so the terrace index may change by at most ONE between neighbouring tiles
or the step doubles to 0.567 and goes over `LOWSTEP` 0.35, silently unwalkable. The field's
gradient is at most the ellipse's 1.35 plus ~0.39 from the wob terms, so a tile crossing moves `d`
by at most 1.29; 1.40 keeps that under one terrace. An earlier cut wrote depth smoothly in z, put
two terraces inside one tile row, and the grid skipped one. **Terraced this finely the hollow needs
NO stair zone**: you walk in and out from any direction, and the cave's was deleted.
**The back POCKET** (`POCK_*`) drops another 8 courses so the cave is sunk rather than standing on
the floor. It is graded along z, one terrace per tile row, and it must START where the bowl is
already at full depth: begun earlier its own mouth is a 0.85 cliff and the cave cannot be walked
into at all. `POCK_IN` keeps it inside the rim so its walls never fall from open lawn. Verified by
flood-filling the tile grid from outside, crossing only where the drop is within `LOWSTEP`: all 30
cave-floor tiles reachable.
**The plate's north edge was pushed out 10 tiles for it, and THE COUNT MUST BE EVEN.** `tcz(j)` is
`(j-(NZ-1)/2)*sz+OZ`, so adding k tiles moves `(NZ-1)/2` and `OZ` by half each and they cancel:
every existing tile keeps its world position. But the far land's stud bump is phase locked through
`OZ` (`studTex.offset`, `fr((OZ+FAR_H-c0z)/sz)`), which moves by k/2, so an ODD k slips that
texture half a stud against the real grid across the entire map. Nothing here would catch it.
**The far-land punch is a HAND TRANSLITERATION of `hollow()` into GLSL and the two must move
together.** The sheet is one 1600-unit plane that would otherwise floor the hollow in green; it is
punched by `discard`, and the test SNAPS TO THE TILE first, because plates are laid per tile and a
per-pixel test discards under the outer sliver of any lawn tile whose centre is outside. A mismatch
shows as green through the floor or a hairline of void along the lip.
`scratchpad/verify_hollow.cjs` samples both over ~600k points and asserts zero sign disagreements;
it has already caught one constant rounded to 14.2167 against 14.21665.
**The apron does NOT go to the mosaic.** Everywhere else a tile a grey boundary crosses is relaid
as four 1x1s so the edge steps stud by stud. Against the cave's dark stone every 1x1 that stayed
green read as a grass chip on rock, scattered through the clearing. A tile the apron touches at all
is laid whole in stone, and `surfaceAt` samples the TILE the same way or a footstep disagrees with
what you are standing on. The apron is a BAND off `hollow()` (`APRON_W`), not its own disc: it was
a separate circle on a different centre and z-scale, so its width ran from six units to nothing.
**The back wall** closes cave.glb's rear archway, which was open to the lawn beyond. 84 of the
world's own plates in the cave's colour, tapered at the top to the arch's own silhouette. The
opening (x 48.35..50.66, floor to y ~0.6) was measured off an elevation of the model,
`scratchpad/cave/backwall.py`, not eyeballed.
**The bones.** `skeleton.glb` is ONE file doing two jobs, which is why its seven parts keep their
names: cloned whole it is the figure seated against that wall, a node at a time it is the loose
bones. It is 7.8247 tall and **faces +Z**, which is the opposite of what the export's own rotation
suggests (the yaw lands the face print on Blender -Y, and Y-up writes that as +Z) — the face
print's bbox is the thing that settles it. `SKEL_S` is the figure's height over the skeleton's.
**EVERY LOOSE PIECE IS SEATED ON ITS OWN BBOX, measured AFTER the lay rotation.** A cloned part
carries the place it held in the assembled figure (a skull's geometry is at y 5.54..7.83), so
without this a skull hangs a body's height in the air and a leg is buried. Each is solid, at its
OWN height band and not the walk's 0.30..1.5, which measured from y 0 would miss a floor 2 units
down. None sits in the walk-in corridor (`|x-49.6| < 1.35` past z 25): a solid bone dead centre is
an obstacle on the one line everyone walks.
**The ghost.** `ghost.glb`, worn at the seated skeleton with E and rotated with T. It replaces the
figure ENTIRELY rather than below the neck like the suit, so it needs no collar fit: a ghost has no
head of its own to keep. What is CUT is read off the geometry, not a name list: anything whose top
is under `GHOST_CUT` (legs, hips, stud caps) and the SOLID-BLACK head block. The torso, arms and
hands STAY — stripping every non-milky piece leaves a sheet, not a ghost.
**Its transparency is set by hand** because every material in the file ships alpha 1: the blend
mode is Blender's HASHED, which glTF cannot express, exactly as the Aston's glass does, so
`polish()` leaves it opaque. `GHOST_OP` 0.30. `depthWrite` stays ON: it is one closed shroud, so
its own back faces are all it can z-fight with.
**It hangs off `player`, not `figBody`**, because figBody carries the walk (waddle and footfall
bob) and a floating thing must not inherit those. Its height is eased toward the root's
(`GHOST_GLIDE`) so terraces pass under it instead of being stepped up. It makes no footsteps, does
not jump, is exempt from the step rules, and `stepOne` returns early for it so nothing solid stops
it but the ground.

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
**A PANEL'S FRAME COLOUR CAN BE PINNED**, with `frame` on the project entry, and the About one is
(user, 2026-09-02). By default `texPanels` gives the frame the cover's STRONGEST colour, which is
the right answer for a poster and the wrong one for a PORTRAIT: measured by running the shipped
`strongColor` against the real files, `Shyon_About.png` returns **#3f1e11**, i.e. hair and skin, so
the About panel wore a brown border, while the other two ABOUT covers give #9e9e9e and #22262e.
`frame` is set in `buildPanels` and makes `texPanels` skip `strongColor` for that panel.
**IT HAS TO BE `convertSRGBToLinear()`d**, and this bit on the first attempt: r128's `Color.set()`
takes a hex STRING as a linear value and the renderer encodes to sRGB on the way out, so real LEGO
Black #05131D handed over raw rendered as a dark STEEL BLUE, (39,76,94), and shipped a blue border
instead of a black one. `strongColor` already ends in `convertSRGBToLinear()` for the same reason.
The About panel's own title is **"About Me"**, renamed from "Who I Am" in the same pass.

**Title bubbles.** LEGO speech bubbles (`speech_bubble.glb`) that build themselves course by
course as you approach, print their label letter by letter, and dismantle when you leave, with
brick snap sounds. `BUB_SPOTS` entries take `pos / yaw / sw / scale / lines / text / rect / near /
far / maxY / once / arrive`. Portal signs trigger on distance to the structure's `rect` (so the
distance is the same from every direction), and only when you are OUTSIDE the footprint, LOOKING at
the sign (`bubFacing`), and haven't already arrived once (`used`, re-arms past `far`). The spawn
greeting is a one-time point-triggered sign on the opening sightline.
**The greeting's COPY is Shyon's own and its odd spacing is deliberate.** It reads "Welcome to my
Lego Realm ! Walk up to any of the structures to learn more about me and what I do. Feel free to
browse around as you'd like, you never know what you may find." **The space before the exclamation
mark is his**: it was "corrected" once as a typo and asked straight back, so leave it alone. The
line also carries the only nudge anywhere on screen toward the things that are not structures, the
chest and the crystal.
**`lines` is 5 and that is a MEASUREMENT.** `bubbleTex` starts at `(H-40)/(lines*1.22)` px and
shrinks by 4 until the text fits, so more lines does not mean smaller type, it means a lower
starting point the copy no longer has to be shrunk away from. Replayed against the real Fredoka
metrics this text draws at 24px on 3 lines, 32px on 4, **39px on 5**, and back down to 32 and 28 on
6 and 7, so 5 is the largest it can be drawn and its block is 238px of the canvas's 275, filling
the panel instead of leaving it half empty. Re-run `scratchpad/bub_fit.cjs` if the copy changes:
the optimum is not monotonic and cannot be guessed.
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
The two AMBIENCE beds were first balanced offline by MODELLING the Web Audio biquads in Node
(`scratchpad/chain.js`, the spec's own RBJ coefficients, and note Q is in dB for LP/HP and a plain
Q for bandpass). The wind is highpassed at 150 (the sub-bass hum is what read as "low static") and
gusted by TWO LFOs at unrelated rates so the trough reaches near silence instead of sitting on a
floor, and the river's distance curve is ONE fall bent by a 0.75 power out to 30 units (the old one
multiplied two linear falls and so halved the sound by 8 units out). All of that still stands.
**THE LEVELS THAT MODEL PRODUCED DID NOT, AND THE MIX WAS RE-DONE AGAINST THE REAL RENDERER**
(2026-09-01). `scratchpad/audio_levels.cjs` renders the SHIPPED graph in an
`OfflineAudioContext` and compares mean power at the destination, and it disagreed with the Node
model outright: a grass footstep came out at 1.08x the wind bed, and the river AT THE BANK at
0.94x, so the loudest thing in the Realm was the one sound that never stops and standing in the
water was quieter than the air. An older note here claimed the river ran 2.0x the wind; it did not,
and that figure was the model's, not the renderer's. **Model the chain to get the SHAPE, render it
to get the LEVEL.** `MASTER_VOL` 0.75 and `SFX_VOL` 1.35 lift everything, every wind gain is the
old one x0.62 (both LFO depths scaled by the same factor, so the gust shape and its near-silent
trough are untouched), and the river's three bands are x1.30. Net: the wind is about 3dB quieter in
absolute terms and everything else 4dB louder, the stream now runs about 4x the wind at the bank
and still over 2x from ten units away. Live on `__D.audio.mix(master, sfx, windMul)`, where the
wind argument is a MULTIPLIER because the bed is a midpoint plus two gust depths and all three have
to move together. Re-run `audio_levels.cjs` after touching any level.

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

**ONE controls bar, and it is `.hint`.** `#prompt` sits at bottom 112 and `.hint` at bottom 24, so
any `say()` full of key names stacks a second controls centre above the one already there. Both the
take-off line and the chest's unlock line used to do it. Everything the suit adds is now listed on
the permanent line instead, which has four states because what the keys do changes: `HINT_WALK`
(locked), `HINT_SUITOFF` (unlocked, adds `T` for the suit), `HINT_SUIT` (worn, adds `F` to fly and
`T` to change) and `HINT_FLY`. `syncPowerHUD` picks between them on the state transitions rather
than per frame, off `flying` / `heroOn` / `heroUnlocked`.
**`HINT_SUIT` NAMES `F`, AND FOR A WHILE IT DID NOT** (user, 2026-09-01). It read "`Space` jump to
fly", which named the wrong key twice over: `Space` on its own is the hop, it takes a DOUBLE tap of
it to launch, and `F` is the actual toggle. So the one permanent controls line advertised no
working way to LEAVE the ground while advertising "`F` to land" the moment you were up, which is
the one asymmetry a controls bar must not have. It now reads `Space` hop / `F` to fly and mirrors
`HINT_FLY`: the same key leaves the ground and returns to it.
All four end in `R` leave, and the measured widths at 12.5px are **534 / 554 / 555 / 620**, so
`white-space:nowrap` clips below a 620px window. `HINT_FLY` is the binding one and naming `F` on
the ground did not move it (`HINT_SUIT` went 557 to 555, it got no wider). Re-measure in the page
rather than counting characters if a line is ever edited: `scratchpad/verify_final.cjs` sets each
one on the real element and reads `scrollWidth`. `say()` is for STATUS now
("Suit unlocked", "Suit on"), never for controls. The one exception is TOUCH, where `.hint` is
`display:none` and those lines are the only guidance a phone gets.
**TOUCH CHANGES OUTFIT ON THE ACT BUTTON** (user, 2026-09-02). It has no `T` key and no pill, and
it used to change back at the chest, so when the chest went quiet a phone had no way to change at
all once the suit was on: the display the suit came off is one-shot and the bones only ever offer
the ghost. `#btnAct` is touch's `E` and is now its `T` as well. Its contextual jobs OUTRANK the
change (`ENTER` at a portal, `TAKE` at the suit, `RISE`/`RETURN` at the bones), and when none of
them is in reach it reads **CHANGE** and calls `cycleOutfit()`. It is gated on `outfitRing().length
> 1`, so a cold load with nothing unlocked shows no button, exactly as before.
It says CHANGE rather than naming the next body, for two reasons: that is the word the keyboard's
own hint line already uses for `T`, so both surfaces say the same thing; and the civilian body has
never had a name in the Realm, so "suit off" would be wrong coming off the ghost. What you turned
into is reported by `say()`, exactly as it is for `T`.
**The CONTROLS card names it, and that needed an APPEND.** The card ships seven `.row` divs for the
keyboard and `touchRows` is eight now; the old code only rewrote rows that already existed, which
would have dropped the outfit row and shifted Sound and Leave up a line. Verified in a real
touch-emulated Chrome (`scratchpad/verify_touch_act.cjs`, 13 assertions): note the page has to be
RELOADED under the emulation, because `IS_TOUCH` is read once at load from `(pointer:coarse)` /
`ontouchstart`.

**Flight.** `F` toggles it (or a double tap of Space, guarded on `e.repeat` because a held hop fires
keydown 30 times a second), and `T` swaps the outfit. There are NO HUD pills left: both the yellow FLY and
the SUIT pill were removed at Shyon's request (with them went the whole `.pw` class), so the hint
line under the canvas is the only place any of it is named. That line has three versions picked by `syncPowerHUD` on the state transitions
rather than per frame: `HINT_WALK`, `HINT_SUIT` (which adds `F` to fly, on the ground and only
there) and `HINT_FLY`. TOUCH has no F key and no pill,
so on touch alone the JUMP pad is the take-off, and it reads JUMP / FLY / UP. In the air, Space climbs, Shift drops,
letting go coasts to a hover, and the stick steers relative to the camera as it does on foot.
`solidCells` is rasterized at BODY height (0.30..1.5) alone, so it says nothing useful the moment
you leave the ground: flight collision instead uses `roofY`, the four big structures' real roof
heights measured by the loaders that rasterize them, and a structure blocks only BELOW its roof.
Everything smaller (trees, props, the river) is simply flown past. Roofs are NOT in the walkable
heightmap, so a hover over a building settles at `roof + FLY_CLEAR` and the landing only commits
over real ground. The unlock is deliberately NOT persisted: the suit has to be found again every
visit, so it can never be an option on a cold load.

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
**The cursor is a LITTLE GLASS BUBBLE** (`#cur`), 9px and round, riding the pointer with no easing.
It began as the main site's own circle dot (`#ss-cursor-dot` in `src/App.tsx`), which itself
REVERSED an earlier decision (user, 2026-08-31): two stand-ins, a four-tick cross and then a LEGO
stud, were built and removed with the note "don't rebuild it". The solid white fill then went to
glass at Shyon's request (2026-09-01), and it is three things rather than one. The middle is EMPTY,
so the world really shows through it. A thin lit WALL is drawn just inside the rim by a second
radial gradient, which is the glass having thickness. And one small hard SPECULAR sits up and to
the left, which is the only thing that says "sphere" rather than "ring" at nine pixels.
**The 1px rim is load bearing, not decoration.** The contrast argument below says the dot's own
contrast is `|255-B|` and fails only at the bright end, so an empty middle has to be paid for at
the edge. A BORDERLESS version, with the wall drawn entirely by gradient, was built and rejected
for exactly that: it read softer magnified and at actual size all but vanished on the concrete and
on a black car, two of the five surfaces the pointer crosses most. Candidates were rendered at 16x
and at 9px over sky, grass, concrete, black car and a pale cover before one was picked
(`scratchpad/cursor/bubble.html`). `box-sizing` comes from the `*` reset, which is what lets the
rim be a real border without growing the dot past 9px or pulling it off the pointer.
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

**THE UPSTAIRS IS THIRD PERSON, AND WHAT IT IS FOR IS A GHOST** (user, 2026-09-02). Crossing the
grey archway off the balcony used to move the camera into the figure's own head. That is gone
outright: `houseRoomCells`, `fpAmt`, `fpOn`, `FP_EYE`, `FP_RATE`, `inRoom()`, the loader pass that
built the room-cell set, and the camera's whole position-and-aim blend. The camera trails him up
there exactly as it does everywhere else, at the flat `lerp 0.2`.
Note what that restores rather than adds: there is no camera collision upstairs at all (`camCell`
only runs below y 1.5), so the third-person camera up there sits outside the building looking
through its walls, which is what it did before first person was built.
**The look-up range is now the GHOST's, not the room's.** `lookUp()` is `flying || ghostOn` and it
gates both `clampPitch`'s `PITCH_UP` and `pitchSens`'s `PITCH_FLY_SENS` (a range that has nearly
doubled must not cost twice the drag for the same sweep), and it gates off the ease-back that pulls
the aim down to 0.06 on foot. A body whose entire vertical is Space and Shift has to be able to see
where it is going; a walker still may only ever look down.
**AND THE GHOST'S GROUNDED CLIMB IS BOUNDED, WHICH IT WAS NOT.** `stepOne` lets a ghost through
every barrier, and the height half of the walk used to hand it `climb = 1e9`. `surfaceBelow` takes
the HIGHEST surface up to its limit, so an unbounded limit does not mean "the ground under it", it
means "the highest floor anywhere in this cell": measured before the change, a ghost that drifted
into the mansion's ground floor was SNAPPED to 3.782, the upper storey, instantly and from any
direction, and could not be downstairs at all. It is `MAXSTEP` (1.55) now, the largest single step
the Realm has and well under a storey (the mansion's upper floor is 3.78 over its hall, the ruins'
deck 3.33 over its floor), so every terrace, kerb and stair tread still passes under it and no floor
above it ever reaches down. Nothing became unreachable: going UP is Space, which is what the
ghost's vertical is for, and a rise from the hall lands it on the upper floor at 3.782 on the way
through. Verified in engine (`scratchpad/verify_upstairs.cjs`): 0 on the hall floor, the lawn and
the driveway, 3.782 after a held Space, and the aim really reaching `camPitch` -0.7.

**Debug hooks**, all temporary, strip before a final polish deploy. URL hashes (no console needed,
which is what makes them usable in Safari): `#nopipe` forces the old direct path, `#noao` / `#nobloom`
/ `#nosmaa` switch off one pipeline stage each, `#noshade` skips the suit's colour remap. Objects: `window.__D` (`time`, `tp(x,z)`,
`step(dt)`, `blocked`, `portalAt`, `shopPad`, `surfaceAt`, `audio`, `pipe`, `scene`, `camera`, and
`yaw`/`pitch`/`lookLocked`, which READ back as well as set, and `cursorBlend`), `__FC` free-cam, `__R`, `__props`, `__bub`, `__petals`, `__stems`, `__gravel`, `__reeds`,
`__money`, `__houseLights`, `__matGreen`, `__lambo` (`lens`), and `__hero` (`wear`, `fly`, `drop`, `trim`, `spin`,
`nudge`, `lock`, `roofs`, `fit`, `hair`, `flare`, `ease`, `land`, `take`, `speed`, `cape`,
`sockets`, `head`, `leap`, `colours`, `metal`, `skin`, `hover`, `sway`, `palette`).
The hero's dials are LIVE: `drop/trim/spin` re-seat the
hairpiece without a reload, which is the only way to tune a piece the pane cannot render.

---

## 6. Current state (2026-09-02)

`docs/` is the build output and IS current: everything below is committed and live on
shyonshiri.com. Build and deploy when Shyon asks (§4), staging BOTH the source and `docs`.

The Realm currently has: the four structures and four portals above, the walled garden out in the woods
behind the mansion (lawn inside and out, no paving, a dirt track in), a bridge over an organic
river, 73 planted trees + 100 background + 52 outer-trim trees (five leaf-tone material variants
handed out per tree, times three per-piece leaf-colour variants), 804 flower plants in two blocks,
interior + outer band (`PETAL_HUES` gives each head one flat colour from 5 shades of
red/blue/yellow, `PETAL_N` decides how many of a plant's 4 stems flower, and the stalk takes one
green of its own), organic gravel paths, props (wine-red Porsche with silver rims and a peanut-butter interior, the white Corvette C7 Z06
parked behind it on the mansion driveway, a black Lamborghini Countach with gold rims on the second
car pad beside them and a red 1969 Aston Martin DBS parked nose on to its tail, an electric
piano upstairs in the mansion facing the balcony archway, the CAVE CLEARING north of the car pad
(a terraced stone bowl with the cave sunk in a back pocket, a seated skeleton and 22 loose bones,
and the GHOST behind it), skull, rat,
Tardis + NABU crystal, pirate chest + money bricks), the day cycle, the render pipeline, the sound layer, the
title bubbles, mobile touch controls (joystick + jump + contextual pills), and My Lego Super Hero,
taken off its display in the mansion's upstairs (suit swap + flight). Flight collision is now
per-geometry in three dimensions (§5), and the mansion's upstairs is a real room you can fly into
and walk around, third person like everywhere else.

**The homepage is a DECK** (user, 2026-09-01, and this REVERSES the earlier revert of exactly this:
a snap deck was built once and pulled because the ask then was animation and not pinning. It has now
been asked for. Do not undo it on the strength of that old note). A hero, then a 13-frame storyboard
of how the Realm was made, cut into 12 slides that each hold the full viewport and snap-stop there:
hero, four chapters (two of them sharing their screen with their one still), six frame rows and a
closing CTA. Stills are 7 in-engine frames shot at the game's REAL fog and 7 staged Blender frames
showing the structures part-built.

`Slide` is the ONE thing on the storyboard that watches the viewport. Everything under it declares
`variants` and nothing else, so a slide arrives as a sequence (rule, then heading a word at a time,
then body, then the frame chrome, then the picture, then the caption) rather than as several blocks
that happen to be near each other. Variant inheritance is React CONTEXT, so the plain grid `div`
between a slide and its two frames does not break the chain. `once` is deliberately unset: the slide
you left is fully off screen, so coming back replays it. Chapter kickers, body copy and the CTA head
are split per word by `Words`; the photos keep their per-chapter signatures (establish / unfold /
blinds in 01, slideL in 02, the stepped `courses` clip through all of 03, push in 04).
**Mandatory snapping is only honest while a slide FITS**, and nothing guarantees that on its own:
the stills are 16/9 and 4/3 mixed and the two-up rows stack under 760px. So the media carries a vh
cap (cropping at the cap, hence `object-fit`), `.ss-slide` CLIPS (the watermark numeral is laid out
from the copy's midpoint and is meant to bleed, which otherwise put 36px of scrollable slide under a
snap point), and the whole mechanism stands down to free scrolling under 860px wide or 620px tall.
`scratchpad/verify_deck_sizes.cjs` measures the real content against the slide box at nine window
sizes and is the check that this still holds; `verify_deck.cjs` walks all 12 slides and asserts
every part reaches its finished state.
`DeckRail` is the fixed tick rail and the `07 / 12` counter. It reads the slides out of the DOM
(`data-slide` / `data-label`), so adding a slide adds a tick and nothing has to be kept in step, and
it picks the active one with a rootMargin that collapses the viewport to its own middle band, which
is what makes EXACTLY ONE slide qualify: a threshold would not, since during a snap two 100dvh
slides are partly on screen at once.

**The chapter kicker is SPACE GROTESK** (user, 2026-09-01), not Bebas Neue, and the swap is not the
face alone: Bebas is condensed and caps only, so at the same size a normal-width grotesk in mixed
case runs about 1.6x the line length and wrapped every kicker. The size comes down, the tracking
goes negative, and the uppercase transform comes off. It needs `!important` for the reason below.
The scroll cue under the hero is now the ARROW ALONE; its "The 3D environment" label was removed.

**Naming trap:** the Work category displays as "Personal Projects" but its internal id is still
`creative-projects`, which keys the theme map, modal branches and portal lookups. Never rename the id.

---

## 7. Traps that have cost real time

**Verification**
- **The in-app preview pane keeps `document.visibilityState === 'hidden'`, and framer-motion's
  `whileInView` never fires there.** Every storyboard element sits pinned at its `hidden` variant,
  so the page reads as a black screen with empty frames and NOTHING about the entrances can be
  judged from it. `window.innerHeight` is 0 there too until `resize_window` is called, which makes
  every `100dvh` slide measure 0. Verify the homepage in real headless Chrome instead
  (`scratchpad/cdp.cjs` + `verify_deck.cjs`), where `visibilityState` is `visible`.
- **THE TYPE CASCADE IS FIXED AND NO FONT RULE CARRIES `!important` ANY MORE** (user, 2026-09-01).
  The APPLE-STYLE PASS used to set `font-family` on `*` with `!important`, which is two bugs: an
  `!important` in a stylesheet beats an INLINE style, so every `fontFamily` written in a `style={{}}`
  prop in `src/App.tsx` was dead and rendered as SF Pro; and a universal selector beats INHERITANCE,
  so even a rule that won on a parent could not reach its children. It is now declared on `html`,
  with `button, input, select, textarea, optgroup { font-family: inherit }` for the one thing the
  `*` was really buying. **Write a new face as an ordinary rule. Do not reach for `!important`.**
  Two things fell out of it and both are decisions:
  · The Apple pass also forced `.ss-contact-heading` / `.ss-about-page h2` to `-0.02em` and weight
    700. That was tuned for SF Pro and is wrong for the Bebas Neue those headings were always
    written in: a condensed caps face needs POSITIVE tracking (they carry their own, 4px and 5px)
    and Bebas ships one weight. The rule is gone.
  · The app root `div` set `'Cormorant Garamond'` inline as the site's BASE face, dead for as long
    as the `*` stood over it. Reviving it would have turned every unstyled run serif in one go (the
    hero name, the storyboard captions, the Work header), so it was removed and the base is left to
    `html`. Put it back on that div to make the whole site serif again; that is the one line.
  What came back: Space Mono on every small label (nav, frame head strips, years, kickers, `× CLOSE`),
  Bebas Neue on the About and Contact display headings, Cormorant Garamond where a paragraph asks
  for it by name (About body, Contact tagline and values, the Work modal's description).
  `scratchpad/verify_type.cjs` asserts the face that renders is the face the file asks for, on the
  page each element lives on, and that zero `font-family` rules are still `!important`.
- **`GLOBAL_CSS` is a TEMPLATE LITERAL, so one backtick in a CSS comment ends the string** and
  breaks the file with syntax errors far from the edit. Same trap the shaders in `lego.html` carry.
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

- **A CAMERA THAT FREEZES MID-PAN IS USUALLY THE PAN RUNNING OUT OF SCREEN**, and that was the one
  actually being hit. Steering on `clientX` means the yaw is bounded by the physical edge of the
  display: at `SENS` 0.0065 a full turn is `2*PI/0.0065` = **967 pixels of cursor travel**, so from
  the middle of a 1512-wide window there is only about **280 degrees** of turn in a single drag
  before the cursor is pinned against the bezel, `clientX` stops changing, and the camera stops
  while the hand keeps moving. Let go, re-grab, and it works again, which is exactly what it looks
  like: an intermittent lock-up.
  **POINTER LOCK WAS THE FIX AND IT HAS BEEN REMOVED. DO NOT PUT IT BACK.** It shipped, taken on
  every `pointerdown`, and it cost more than it bought (user, 2026-09-01). A pointer lock is the one
  thing that makes a browser announce that the pointer is hidden, so that banner appeared on the
  press and went away on the release of EVERY CLICK. Worse, on Chrome the announcement CHANGES
  `innerHeight`, which fires `resize`, which reallocates the whole render pipeline: that is where
  the **BLACK LINES** came from, a stack of them across the middle of the frame and a few above the
  controls, appearing the moment you clicked and never while you only hovered. Removing the lock
  removed them, confirmed by Shyon on the live site. Note what that means: the trigger is gone, the
  underlying fragility on `resize` is a separate thing (see the next entry).
  **Deferring the lock to the moment a drag nears the edge was built and REJECTED**, so do not
  reach for that either. A lock needs transient user activation; a `mousedown` grants about five
  seconds of it and a `mousemove` does NOT renew it, so a slow deliberate pan is refused and
  silently falls back to the bounded pan. Measured in real Chrome with dispatched input
  (`scratchpad/lock_why.cjs`): the request fires, `pointerlockerror` comes back, and the pan stops
  dead at **237.6 degrees**, which is exactly the screen-edge bound.
  **`EDGE_PAN` is what solves the range now**, and it asks the browser for nothing. While a drag is
  live and the pointer is inside `EDGE_W` (34px) of a side, the yaw keeps turning that way at up to
  `EDGE_RATE` (2.6 rad/s), ramped by how far into the margin it has pushed. It is spent in the
  **FRAME LOOP**, not in `pointermove`, and that is the whole trick: a cursor pinned against the
  bezel stops firing move events at all, so the frames that need this are exactly the frames with no
  pointer input in them. Measured: **624.6 degrees** against the old 238, the extra turn happening
  on frames with nothing dispatched, and it stops the moment the button comes up
  (`scratchpad/verify_final.cjs`).
  `looking()` and the `movementX` branch are still in the file and are now unreachable, kept only so
  a lock arriving from anywhere else would still behave. Nothing calls `requestPointerLock`.
- **THE BLACK LINES ARE THE AO PASS'S TEXEL, and the pointer lock was never the cause** (fixed
  2026-09-02). A stack of thin dark rows over any flat surface, ~6px apart at dpr 2, strongest on
  near ground. `aoMat.uniforms.texel` was set to `1/w,1/h`, the FULL-res texel, on a pass that
  renders at HALF res, and `texel` is exactly what `normalAt` steps by to take its depth
  neighbours: the gradient was sampled half an AO texel either side, which with a nearest-filtered
  depth texture lands back on the SAME texel for some rows and the next one for others. The delta
  collapses to zero, `axis()` flips to the other side, and the derived normal alternates row by
  row, straight into the occlusion. `ign()` compounded it: its input reaches ~101 at the bottom of
  a 2880x1540 buffer, where a float's ulp has grown enough that the per-pixel rotation stops
  varying between neighbouring rows, so the noise stripes too. Both are fixed (`1/hw,1/hh`, and
  `mod(gl_FragCoord.xy,64.0)`).
  **IT IS BROWSER DEPENDENT, WHICH IS WHY IT WAS MISATTRIBUTED.** Chrome's sampling phase hides
  it; Safari's does not. The earlier session removed the pointer lock, Shyon confirmed on Chrome
  that the lines were gone, and the note here said the lock was the cause. It was not: the lock's
  resize simply changed the buffer size, and the stripe pattern with it.
  **HOW IT WAS FINALLY MEASURED, since the pane has no WebGL and Safari cannot be driven** (its
  WebDriver needs a password, and screen recording was not granted): a COPY of `lego.html` in
  `public/` with a harness appended that clicks Enter, pins the hour and the camera, walks
  `__D.pipe`'s stage flags, and posts `canvas.toDataURL()` to a tiny Node server in the scratchpad
  (`scratchpad/shotserver.cjs`), opened with `open -a Safari`. `scratchpad/linescan.cjs` and
  `stripe_metric.cjs` then score the frames (vertical autocorrelation at the stripe period,
  normalised): AO buffer 18.79 before, 0.39 after; the finished frame 0.37 to 0.01, which is the
  level with AO switched off entirely. **Delete the copies from `public/` afterwards. They are
  served publicly.**
  Two theories were killed on the way and should not be re-run: it is not the AO border band (that
  is the top and bottom EDGE rows, the wrong place), and it is not a stale `depthTexture` (r128's
  `setupDepthTexture` re-syncs its dimensions to the target on bind, read out of the vendored
  build).

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

- **`garden.glb`, `aston.glb`, `ghost.glb` and `skeleton.glb` are IN the saved blend** as of
  2026-09-02. All four were exported selection-only from a LIVE session that was already dirty, so
  for a while the shipped glb was the only copy of each and a headless open of the saved file could
  not see them. That is no longer true: the blend was saved on request and a separate headless open
  confirms `LEGO Garden Wizard`, the Aston, `LEGO Ghost (gen002)` and `Lego skeleton` are all in
  it. Keep the pattern in mind rather than the specific warning: an export taken out of a dirty
  session exists only in `public/assets` until someone saves.
- **The garden has never been SEEN in engine.** Placement, orientation, scale, the ground and the
  collision were all verified by measurement and by headless renders (§5), because the pane has no
  WebGL. It has now been pushed out once already (front 60.089 -> 61.937, `BX1` 66 -> 67.7) after
  Shyon said it read far too close to the house, and the concrete apron an earlier pass ringed it
  with was removed at the same time. It cannot go much further east without moving trees: 67.7 is
  0.26 off the nearest trunk.
- **The piano upstairs has now been rendered but not PLAYED IN.** Its 2026-09-02 move was verified
  in engine against the loaded model and photographed in headless SwiftShader
  (`scratchpad/up_arch.png`, `up_ghost.png`), which is further than the downstairs placement ever
  got, but Shyon's eyes are still the check. The scale is a judgement made against the figure's own
  height: at true stud pitch the keys sit over a minifig's head. `Lego Electric Piano` IS in the
  saved blend (unlike `garden.glb` and `aston.glb`), and its FLOATING HEADPHONES are cut from the
  shipped glb.
- **The mansion's upstairs holds the suit's display and the piano**, and nothing else. It is one
  room plus the balcony, floor 3.714 to 3.782, walls to about 5.9, ceiling 6.17, entered through
  the balcony door (§5). Reaching it needs the ghost (Space) or the suit (flight): there are no
  stairs, by design.
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
