# CLAUDE.md — Project Handoff & Context

> Authoritative context for Claude Code sessions on Shyon Shiri's portfolio.
> Read this first, then inspect the files it points to before changing anything.
> **Documentation only. It does not change site behavior.**
>
> This file is deliberately kept SHORT: durable facts, hard rules, current state, and the
> traps that have actually cost hours. It is NOT a changelog. Git history is the changelog
> (`git log --oneline`, and `git log -p <file>` for how a thing came to be). When you finish
> a pass, update the relevant section in place. Do not append a new dated entry.
>
> **TWO COMPANION FILES carry the per-asset detail that was crowding §5**, which is not loaded
> automatically the way this one is, so open them yourself when the work touches their subject:
> · `CLAUDE-cars.md` — the Porsche, Corvette, Countach and Aston: sizing, lens tiers, recolours.
> · `CLAUDE-hero.md` — the super hero suit, its shader recolour, the head, the cape, and flight.
> Between them they were 42% of §5. Everything else, including the cave, the ghost and the ground,
> is still here.

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
- `public/lego.html` — the Realm, one file. See §5, plus `CLAUDE-cars.md` and `CLAUDE-hero.md`.
- `public/vendor/` — three.min.js r128 (byte-identical to the npm `three@0.128.0` release),
  GLTFLoader, DRACOLoader, draco decoders, and `pp/` (post-processing passes lifted from the same
  release). Nothing external except Google Fonts.
- `public/assets/` — site media plus every `.glb`. `public/assets/story/` — storyboard stills.
- `docs/` — **the build output GitHub Pages serves.** Committed.
- `vite.config.ts` — `outDir: "docs"`. There is NO CI: `.github/workflows/deploy.ml` was misnamed
  (`.ml`, so GitHub never parsed it) AND pointed at `dist` rather than `docs`, so it could not have
  worked if it had. Deleted 2026-09-08. Deploying is the `npm run build` + commit in §4 and nothing
  else; if CI is ever wanted it has to be written fresh against `docs`.
- Root `*.md` / `*.txt` other than this file and the two companions: GONE. Sixteen auto-generated
  docs from early 2026 (the `TOUCH_*`, `*_SUMMARY`, `QUICK_*` family) were deleted 2026-09-08.
  They referenced only EACH OTHER, nothing live pointed at any of them, and this file had already
  demoted them to background. `README.md` is real and stays.

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
**The four cars → `CLAUDE-cars.md`.** The Porsche, the Corvette, the Countach and the Aston park
on the mansion's driveway and the car pad beside it. All four run ONE material standard
(`carStandard()`), all four are recoloured at load, and two of them are sized on their WHEEL rather
than their stud pitch. **Read that file before touching any of them**: the sizing, the lens tiers,
the per-car colour corrections and the winding/sRGB traps are all there, and every one of them has
already cost a session.

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
**The ghost.** `ghost.glb`, worn at the seated skeleton with E, and taken off there too.
**`T` DOES NOT CARRY IT** (user, 2026-09-09): the shroud went on and off the outfit ring for a day
and is off it again, so E at the bones is the only switch, both ways. `outfitRing()` no longer
pushes `'ghost'` and `cycleOutfit()` returns early on `ghostOn`, and the early return is not
optional: without it `indexOf('ghost')` is -1, the step lands on `r[0]`, and T would quietly take
the shroud off through the civilian branch. Touch's CHANGE button is gated on `!ghostOn` for the
same reason, since the ring can still be two long while the shroud is worn (the suit stays unlocked
once it is taken), and a lit button that `cycleOutfit` refuses is worse than no button.
`HINT_GHOST` names E at the bones where it used to name T, because the hint bar is the only place
the way back is written down while you are away from the cave, `#prompt` only says it once you are
standing there. Measured at **565px**, under `HINT_FLY`'s 620, so the bar's clip window is unmoved.
`scratchpad/verify_ghost_t.cjs` drives the real key handler with dispatched events rather than
calling `cycleOutfit()`, which is the only way to test a BINDING. It replaces the
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
`zone` predicate (the shop's whole grey pad prompts).
**THE MANSION PROMPTS AT ITS FRONT DOOR AND NOWHERE ELSE** (user, 2026-09-02). It carried
`cells: houseCells` with a 4.0 door radius, and `cellsNear` asks whether ANY of a structure's cells
is within about a unit, so `E` was offered anywhere you could touch the building: rasterized to a
plan the prompt covered the whole footprint and a ring right around it, x 44..58 by z -7.8..3.0, so
you could walk into the north flank, the back wall or the driveway and let yourself in through it
(`scratchpad/portal_zones.cjs`). The PORCH is measured rather than guessed: walking east from x 45
at every z, the only band that gets past the west face (47.67) runs **z -1.3..1.0** and reaches
**x 50.3**, the glass front door (`scratchpad/porch.cjs`). The zone is that corridor plus the
approach in front of it, `x 45.4..50.9, z -1.35..1.05`; `cells` is dropped and `doorR` neutralised
to 0.01 so the zone is the whole rule. **`door` is deliberately left where it was**: `portalAt` now
reads only its `y`, but `BUB_DOOR` measures the title bubble's arrival from that same point and
moving it would move that too.
The other two were checked and left alone: the SHOP keeps its whole-pad zone on purpose (a cafe
terrace you stand on), and the COTTAGE was already `cells: null` with a 2.6 door circle.
`scratchpad/verify_round.cjs` asserts the mansion prompts on the porch and the approach and is
silent on all four flanks and the driveway. E enters: 3rd→1st person glide, the real
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

**Status messages are in the MIDDLE of the screen, in `#toast`** (user, 2026-09-02). "Suit on",
"Ghost", "Find another way inside" and everything else `say()` and `heroMsg` carry used to be pushed
through `#prompt`, the pill at bottom 112, which is wrong twice over: it is where the eye is not
while you are looking at the world, and it made a STATUS line and a CONTROL prompt take turns in one
slot, so a message hid "Press E · Enter" for its whole duration and an approach then hid the
message. `#toast` is its own element with its own z-index, centred, 20px, and it fades and SCALES in
rather than cutting, which is most of what makes a brief thing register. It sits at `top: 36%` and
not 50% because the figure stands around the middle of the frame and a panel over his head reads as
a label on him. `#prompt` is left to the contextual affordances alone.
**Toned down once** (user, 2026-09-02: a little strong in size and opacity): 20px / `.82` fill /
16-30 padding read as a dialog rather than a passing line, and it is now 17px / `.62` / 13-24. It is
NOT taken to a whisper. The `blur(10)` stays, because that is what lets the fill come down and still
separate the text from a bright lawn; dropping the fill further without it is the "too glass" end.

**THE CONTACT PANEL IS DRAWN IN THE MAIN SITE'S LANGUAGE** (user, 2026-09-03). The Realm's
"contact page" is a PANEL in the About portal (the mansion), not a page: `ABOUT[2]` in
`lego.html`, whose face is `assets/contact_preview.jpg`. It used to be the Realm's own
dialect, a navy ground with a LEGO stud grid, Fredoka and the Realm's yellow. It is now
`ContactPage` from `src/App.tsx` redrawn value for value: the `#060606` ground, the blurred
Bebas ghost word, the two sky radial glows, "Let's Work." in Bebas at letter-spacing 5, the
italic Cormorant line, and the indexed list with its Space Mono numerals, Bebas labels,
Cormorant values and sky arrows on `rgba(245,242,237,.14)` hairlines.
Source is `scratchpad/contactcard/card.html`, rendered by `render.cjs` at the panel's own
**1400x1758** (2.15 : 2.70, the same as `resume_preview.jpg`). The renderer waits on
`document.fonts.ready` AND checks each family, because a shot taken early renders Bebas as a
fallback grotesk and the whole point of the card is lost.
**It is NOT a straight copy of the page's layout.** The page is a landscape viewport where a
vertically centred block fills the frame; at 1400x1758 the same block left the top and bottom
thirds empty and the type came out small on a panel read from across a room. So the heading
is set on TWO lines (which is what lets it run at 190px in a portrait column), the italic
line moves from beside the heading to under it (right aligned in this column it was a 340px
scrap in the corner), and the content is packed from 430px down rather than centred.
**THE FRAME IS PINNED to `#05131D`**, for the same reason About's is: run against this image
the shipped `strongColor()` returns **#14313e**, the blue glow averaged down to a murky teal.
LEGO Black is what the page itself is, and it matches About beside it. `c` went from the old
green `#2ee078` to `#38bdf8`, which is only the pre-load plastic but should still be the
site's accent. The desc is the page's own line, and it is kept in step with it BY HAND:
both now read "Open to freelance, collaborations & full-time roles." (user,
2026-09-09, who changed the Realm's copy to match the page's).
Verified IN ENGINE, not as a flat JPEG (`scratchpad/contactcard/realm_shot.cjs`): teleport to
the porch, `enterPortal('about')`, step the carousel, photograph the panel. Note the entry is
a rAF-driven camera animation and SwiftShader runs this scene at a few frames a second, so
the transition takes tens of seconds of wall clock and the script POLLS `mode` rather than
sleeping a fixed time. `enterPortal` and `nearPortal` are both global, so the portal can be
opened directly; a synthetic `keydown` for E did not take.

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

**THE SHOULDER TURNS ON ITS OWN PEG** (user, 2026-09-02: the arms pop out of their sockets slightly
when sprinting). The civilian pivot was pinned to the arm's top-BACK CORNER, `maxY-0.03` by
`minZ+0.05`, which is close enough to the hinge to hide inside a walk and wrong the moment the swing
opens up. The error is a CHORD, `2r sin(theta/2)`, so it grows with the angle: measured off the live
geometry the corner sits **0.119** from the arm's real socket axis (0.106 up, 0.056 back), carrying
the shoulder cap 0.019 at a walk's 0.161 rad and **0.063** at a sprint's 0.527 rad. `shoulder()` now
uses `armHinge()`, the function written for the SUIT's arms for exactly this reason, so both bodies
hang their arms on the peg; it falls back to the old corner if the slice comes back empty, so a
re-export cannot break the rig. Measured after: **0.0029** off the axis and **0.0015** carried at a
sprint, 42x better.
**AND THE SWING ANGLE IS COMPENSATED**, because moving the pivot down the arm shortens the lever the
hand hangs on and the same angle would have read as a visibly smaller swing. **Measure both levers
the same way**: a first pass compared a vertical-only drop against a real distance, got 1.31, and
over-swung by 12%. Pivot to the lowest point of the whole arm-and-hand group, the levers are 0.6588
from the old corner and 0.5626 from the peg, a ratio of 1.171, so `0.85 x 1.171 = 0.9955`; solving
the chord exactly (travel is `2L sin(theta/2)`, not linear in the angle) gives **1.0000**, so
`ARM_SWING` is 1 and the arms swing through the same angle as the legs. Live on `__hero.swing(v)`.
`scratchpad/verify_arm.cjs`.

**Foot speed: `WALK` 3.2, `RUN` 6.0.** `RUN` went 5.0 to 7.0 on 2026-09-01 (too slow) and back to
**6.0** on 2026-09-02 (too fast), which keeps most of the increase rather than reversing it. Two
things it does not disturb, which is what makes it safe to move alone: the limb swing is a RATIO,
`0.19+0.43*min(1, speed/RUN)`, so at a full sprint it is pinned at 0.62 whatever `RUN` is; and the
CADENCE runs off real speed rather than `RUN` (`phase += dt*(speed*1.9+3)`), so stride length looks
after itself, 2.70 units a cycle at 7.0 against 2.62 at 6.0. `FLY_SPD` is deliberately untouched:
flight normalises against itself, and the gap between having the suit and not widened from 2.14x to
2.50x. Live on `__hero.foot(walk, run)`.

**The figure.** Imported rigged `.glb`s (`figure.glb`, `hair.glb`, `legs.glb`), hip/shoulder
pivots driving a stiff minifig walk. The denim legs are fitted by MEASUREMENT against the old
pants' bounds and scaled uniformly from the feet so the waist tucks into the torso rim (a
non-uniform parent scale shears the hip-attached legs). Skin is a warm olive #C68B5E, matte,
low reflection; the face print is forced true black, roughness 0.65, envBase 0 so reflections can
never tint it. The shipped `hair.glb` is the DOC OCK piece (material `hair_docock`, baseColorFactor
`0.02732 / 0.01096 / 0.00518`), not the Bizarro one an older code comment still names.

**My Lego Super Hero → `CLAUDE-hero.md`.** The suit stands on display in the mansion's upstairs
room; taking it is the unlock, `T` takes the suit on and off, `F` flies. The suit, its shader recolour, the
head, the cape and the whole of flight (steering, speed, pose, take-off, landing, the high hop)
live in that file. **Read it before touching the suit, the cape or flight**: nothing about the fit
is hardcoded, it is all measured against the civilian body at load, and the flight pose in
particular is a set of rules each of which fixes a visible snap.

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
All of them end in `R` leave, and the measured widths at 12.5px are **534 / 554 / 555 / 620**,
plus `HINT_GHOST` at **565** since it started naming E at the bones instead of T, so
`white-space:nowrap` clips below a 620px window. `HINT_FLY` is the binding one and naming `F` on
the ground did not move it (`HINT_SUIT` went 557 to 555, it got no wider). Re-measure in the page
rather than counting characters if a line is ever edited: `scratchpad/verify_final.cjs` sets each
one on the real element and reads `scrollWidth`. `say()` is for STATUS now
("Suit unlocked", "Suit on"), never for controls. The one exception is TOUCH, where `.hint` is
`display:none` and those lines are the only guidance a phone gets.
**TOUCH CHANGES OUTFIT ON THE ACT BUTTON** (user, 2026-09-02). It has no `T` key and no pill, and
it used to change back at the chest, so when the chest went quiet a phone had no way to change at
all once the suit was on: the display the suit came off is one-shot. `#btnAct` is touch's `E` and is
now its `T` as well. Its contextual jobs OUTRANK the change (`ENTER` at a portal, `TAKE` at the
suit, `RISE`/`RETURN` at the bones), and when none of them is in reach it reads **CHANGE** and calls
`cycleOutfit()`. It is gated on `!ghostOn && outfitRing().length > 1`, so a cold load with nothing
unlocked shows no button and neither does a worn shroud, which T no longer touches either.
It says CHANGE rather than naming the next body, for two reasons: that is the word the keyboard's
own hint line already uses for `T`, so both surfaces say the same thing; and the civilian body has
never had a name in the Realm. What you turned into is reported by `say()`, exactly as it is for
`T`.
**The CONTROLS card names it, and that needed an APPEND.** The card ships seven `.row` divs for the
keyboard and `touchRows` is eight now; the old code only rewrote rows that already existed, which
would have dropped the outfit row and shifted Sound and Leave up a line. Verified in a real
touch-emulated Chrome (`scratchpad/verify_touch_act.cjs`, 13 assertions): note the page has to be
RELOADED under the emulation, because `IS_TOUCH` is read once at load from `(pointer:coarse)` /
`ontouchstart`.

**Flight.** `F` toggles it (or a double tap of Space, guarded on `e.repeat` because a held hop fires
keydown 30 times a second), and `T` swaps the SUIT (never the ghost, see above). There are NO HUD pills left: both the yellow FLY and
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

**THE THREE CHAPTER SLIDES ARE THREE DIFFERENT KINDS OF SCREEN** (user, 2026-09-09: "the
layout is still so similar ??????"). **THE REPETITION WAS THE BAND, AND TWO PASSES WERE
SPENT ON THE WRONG HALF OF THE SCREEN.** All three chapters carried the identical
`.ss-chapter-head`: the same two-line blue title in the same corner with the same
paragraph beside it, filling the top third of three consecutive slides. Rearranging the
CONTENT under that band could never fix it. Deck rule: no two slides in a row share a
measure, and three did.
Each now has a structure the others do not, and none reuses a treatment already on the
site (the opener and closer are type on a full-bleed picture; About is a 50/50 split):
· **What it is** CENTRED. Narrow header centred over the full-width map. The only centred
  screen on the site.
· **Why I made it** A SIDE RAIL. Title, copy and caption stacked in a 300px column, the
  picture taking the rest of the width and height.
· **How I made it** INVERTED. `.ss-slide-shop .ss-slide-inner` becomes a flex column and
  the band takes `order: 2`, so the contact sheet leads and the title sits small at the
  foot beside the running caption. **The JSX order is NOT changed**, deliberately: source
  order is the reading order a screen reader and a keyboard get, and the caption only
  makes sense after its grid.
Measured after: titles at 64 / 46 / 36px, at 39% / 0% / 0% from the left and 11% / 34% /
69% down. The SIZE differences are structural, not decoration: a title at 46px in a 300px
rail reads as a different kind of heading from one at 64px centred.
**All three collapse to the stacked band below 1100px**, because that is the arrangement
that fits a 700px viewport under mandatory snapping. An earlier attempt dropped the `pair`
prop to stack the chapter and took 1024x700 to **793px inside a 700px viewport**, which is
a snap point whose bottom cannot be reached. The prop stays; the stacking is CSS at the
same breakpoint.
**AND THE INVERTED SLIDE FOUND A REAL BUG IN THE SCROLL-DRIVEN COPY.** `useRiseProgress`
ramped between two fixed marks on the SCREEN (0 below 92%, 1 at 58%), which silently
assumed every paragraph sits in the upper half of its slide. True while all three shared a
band; false the moment they did not. On the inverted slide the copy sits 71% down, so it
could never reach the 58% mark and its last two lines stayed permanently half lit. It
measures against THE ELEMENT'S OWN HEIGHT now: 0 as its top touches the bottom of the
screen, 1 once it has risen by its own height, wherever on the slide that is.
`scratchpad/lit2.cjs` asserts all three fully light when settled AND still run backwards.

**THE PLATE IS SIZED BY ASPECT, NOT BY WIDTH** (user, 2026-09-09: the figure screenshot is
too thin). `story_figure_front.jpg` is 2400x1350, so 16:9. It was rendered full bleed at
36vh, about 1560x414 or **3.63:1**, so `object-fit: cover` discarded **51% of the image's
height** and cut a standing figure off at the waist. Capping the width and raising the
height brings it to about 1.85:1 and the discard to a few percent. Three arrangements were
tried; the middle one (copy left, picture right) was rejected on sight for being smaller
AND for being the About page's layout. See the notes in `.ss-quiet`.

**THE GRADIENT TITLE WAS CLIPPING ITS OWN DESCENDERS** (user, 2026-09-09: the Y is cut off
at the bottom). `.ss-story-kicker .ss-w` paints its glyphs with a background CLIPPED TO
TEXT, so paint exists only inside the element's own box. The span is an inline-block, so
that box is its line box, and `.ss-chapter-head` sets `line-height: 0.92`: at 96px that is
an 88px box holding a face whose descenders reach past 100px, so the tail of the y in
"Why" simply was not painted. `padding-bottom: .16em` grows the PAINT box and an equal
negative margin takes it back out of LAYOUT, so the two lines still close up. In em, not
px: the size is a clamp from 36 to 96. **Any future background-clip:text on a tight line
needs the same pair.**

**THE MAP CARD DROPPED ITS BLUE CATEGORY LINE** (user, 2026-09-09). The card opens from a
pin that already shows the category as its own label, so printing it again three pixels
above the structure's name was the same word twice in one glance in the loudest colour on
the page. `cat` STAYS in `REALM_MAP`: it feeds `.ss-map-tag` and half the pin's
`aria-label`. The rule went with the markup, per the dead-CSS trap in section 7.

**`scratchpad/no_backticks.cjs` EXISTS BECAUSE THIS FILE'S OLDEST TRAP KEPT WINNING.** One
backtick anywhere inside `GLOBAL_CSS` ends the template literal and breaks the file with
syntax errors far from the edit. It happened **six times in the 2026-09-09 pass alone**,
every time inside a CSS comment naming a property or a file in backticks out of markdown
habit. tsc catches it but points at where the resulting garbage stops parsing, not at the
backtick. The script names the exact line. **Run it before tsc after touching GLOBAL_CSS.**

**THE APPLE PASS, ROUND TWO: ONE FAMILY, A FROSTED NAV, AND FOUR PIECES OF DEAD SPACE
FILLED** (user, 2026-09-09). The round-one pass shipped a font change that could not be
seen and a modal expand that was pulled the next day. What was wrong with it is worth
keeping: `-apple-system` only ever reaches UNSTYLED text, and almost nothing on this site
is unstyled, so naming SF in the base stack changed nothing visible. The site's four
faces had to go for the type to change at all.
**ONE FAMILY, EVERYWHERE.** `--sf` replaces Bebas Neue (display headings), Space Grotesk
(kickers), Space Mono (every small label) and Cormorant Garamond (body copy). Apple runs
one family and distinguishes by SIZE, WEIGHT and TRACKING alone. Inter is the only face
still downloaded, as the licensed fallback off Apple hardware; SF Pro may not be
self-hosted as a webfont, but naming it so the OS serves its own copy is fine.
**IT IS NOT A FIND AND REPLACE, because the old faces had opposite metrics.** Bebas is
condensed caps with no descenders and positive tracking; SF is none of those. 200px of SF
on the hero's 0.86 line put "Shyon" into "Shiri", so the ceiling came to 148 and the
tracking flipped to -0.035em, which is Apple's own signature on a large headline. Small
labels went from Space Mono 400 at 2px tracking to SF 590/600 at 0.06em, because 2px on a
10px SF label reads as spaced-out caps rather than as a label. Body went from a 20px serif
at 1.75 to 17px at 1.55. Years and numerals took `tabular-nums`, which is what the
monospace was really being used for.
`scratchpad/verify_type.cjs` was rewritten around this: it sweeps every element on all
four pages and asserts not one of the four old faces survives, plus that the hero tracks
NEGATIVE, which is the tell that a rule was folded to the new family without being
re-tuned for it.
**THE STEPPED REVEAL IS GONE** ("i still have that glitch effect style for pictures that
load in"). See the note on `shotReveal`: `stepEase` quantized four animations into held
jumps, and the WIPE went with the stepping, not just the stepping.
**THE NAV HAS NO GROUND AT ALL. THE LINKS FLOAT ON THE PAGE** (user, 2026-09-09).
There is no bar, no fill, no blur, no hairline and no shadow, and the `scrolled` /
`frosted` state that used to switch a bar on past the top of Home is gone with them, as is
the `ss-nav-light` rule that thickened it on the stacked About. **What the bar was doing is
now done by the GLYPHS**, see the halo below. Note the `nav` element is `pointer-events:
none` with the `ul` taking it back: it is a full-width fixed box with nothing drawn in most
of it, and the deck underneath is scrolled and dragged.
The history below is kept because its reasoning still applies to anything that tries to
derive a bar from what sits behind it.
**IT WAS A FROSTED BAR FOR ONE DAY.** That deleted `mix-blend-mode: difference`, About's
wide-layout special case, AND the opener's hand-solved nav band, all three of which existed
only because the nav had no ground of its own and had to be derived from whatever pixel sat
behind it.
· **The dim opacity is 0.72 and it is MEASURED.** 0.58 was inherited from the blend era
  and failed: on the real composited frame the three dim items ran 4.38 to 4.40 over the
  opener and **3.87 to 3.98 on About's cream**, against a 4.5:1 bar. At 0.72 the worst
  case anywhere is 5.72:1.
· **THE HALO IS WHAT THE BAR USED TO BE, and it is the whole of the current answer.**
  With nothing behind the nav, a glyph is legible only against whatever pixel happens to be
  under it, and this site has four different grounds up there: a black portrait, a pale
  aerial, a cream copy column and, stacked, a photograph of dark hair and a black jacket.
  So each item carries a `text-shadow` in the OPPOSITE tone to its own type, dark under the
  white, light under About's near-black.
  **A HALO IS TIGHT AND DENSE, NEVER WIDE AND SOFT, and that is the whole tuning lesson.**
  It was one 12px haze first, then a 34px cloud on top of it, and going wider stopped paying:
  the cloud scored no better, and at 4x it read as a smudge round each word. Brightness
  concentrated at the LETTER EDGE is what both the eye and the metric are reading, so the
  shipped stacks are three and four passes of 2 to 10px at alpha .95 to 1, with nothing
  past 20. Measured, on the two grounds that fail bare: the opener's dim items went 4.18
  (a fail) to 5.09 on the soft version to **6.98** on the tight one, and the stacked About's
  jacket went 3.00 to 4.40 on a wide white cloud to **5.86** on a tight one.
  **The dim opacity came up 0.72 -> 0.86** with the fill it was measured against gone.
· **THE PHONE FAILURE WAS FOUND BY SCANNING THE SCROLL, AND ONE SAMPLE HID IT.** On the
  stacked About the photograph scrolls UNDER a nav that draws nothing, so the ground below a
  glyph runs the whole way from cream to a black jacket as you read, and
  `nav_contrast_mobile.cjs` samples two fixed positions. It passed at 4.66 while the true
  minimum was **3.00:1** at 430, at a scroll position it never landed on. Anything that
  scrolls under the bar-less nav has to be swept, not sampled: `scratchpad/about_scan.cjs`
  walks scrollTop 0..1100 at 390 / 430 / 768 and reports the minimum, and
  `scratchpad/phone_live.cjs` does every page and every deck slide at 390 and 430 (it takes
  a URL, so it runs against the LIVE site as well as localhost).
  Current worst cases, all measured: **6.98:1** at 1512 (the opener), **6.65:1** across the
  phone sweep, **5.86:1** over the About jacket, 41/41 on the narrow About suite.
· **`scratchpad/nav_contrast.cjs` was rewritten and the OLD METHOD IS THE LESSON.** It
  modelled the opener's veil gradient by hand and sampled the raw image under it, which
  was right while the picture was what carried the type. It is meaningless against a
  translucent bar with a backdrop blur: what sits behind a glyph is the bar's fill over a
  BLURRED photograph, and neither the gradient formula nor the source image describes
  that. It screenshots the page and reads real pixels now, on all four pages.
· **AND THEN THE BAR WAS TAKEN OUT ALTOGETHER** (user, 2026-09-09, twice in one pass:
  first that the frosted bar read flat and coloured rather than transparent, then that he
  would rather not have the header space at all). It was made glass on the way past, and
  that step is worth keeping because it is the general lesson: a flat `rgba(6,6,6,.62)`
  over `blur(20px)` is not glass, because 62% of one colour IS the bar and the blur only
  softens the last third of it. Glass came from dropping the fill to about a third and
  moving the contrast it was carrying INTO THE BACKDROP, `brightness()` in the filter
  darkening (or, on About's cream, lifting) what is behind rather than covering it, so the
  backdrop's own variation survives at scale. **None of that is in the file any more.**
**THE DEAD SPACE WAS MEASURED BEFORE ANYTHING WAS BUILT**, off 1512x900 captures: Contact
26% empty below the last row, About 21% under the copy, Work 17% under the cards. The
spec band (`REALM_FIGS`, the closer's own figures, so the two cannot drift) filled
Contact's; the bento fills About's.
**THE SPEC BAND IS GONE FROM CONTACT** (user, 2026-09-09, asking why the Realm's full day
cycle was on the contact page). It was the right answer to the wrong question. Filling
measured dead space is a LAYOUT reason, and a number needs an EDITORIAL one. On the closer
the four figures sit on an aerial of the town, on a slide about building it, so they have a
subject; on Contact they sat under an email address with nothing on the page naming the
Realm, so "7 MIN / FULL DAY CYCLE" was a statistic about nothing. Note this is the same
judgement the bento pass made one screen away, and it should have been made here at the same
time: About gave up `Running in this browser / 15.9M` for putting one number on a third page,
and Contact was explicitly excused on the grounds that it had space to fill.
`SpecBand`, `CountUp` (its only user) and the whole `.ss-spec` rule went with it.
`REALM_FIGS` STAYS and now has exactly one reader, the closer, which is where the comment on
it always said it belonged. **The 26% is open again and nothing should be invented to refill
it**, which is the rule the bento pass ended on and the one this reverses a violation of.
`scratchpad/spec_gone.cjs` asserts, at five viewports, that no `.ss-spec`, no `<dl>` and none
of the four figure labels survive on Contact while the heading, the availability line and all
three link rows do. Note its own trap, hit on the first run: an assertion counting the link
rows by guessing at `mailto` / `linkedin` / `github` selectors PASSED at 2 of an expected 3,
because the third row is a resume PDF and there is no github row at all. It counts the three
real labels now.
**AND THE BENTO IS THE TOOLS AND NOTHING ELSE** (user, 2026-09-09: most of this is not needed
on About, and the page said "running in this browser" twice). It shipped as eight tiles and
four of them were restatement, three word for word. `Based in / San Jose, California` and
`Degree / BA 2025` are both in the FIRST SENTENCE of the paragraph directly above them
("in the Bay Area", "a BA in Graphic Design from San Jose State, 2025"). `Open to / Full-time`
is the Contact page's availability line, which is the page an availability claim belongs on.
And `Running in this browser / 15.9M` repeated the closing words of paragraph two on top of
itself while putting the figure on its THIRD page: `SpecBand` on Contact and the deck's closer
both drew it from `REALM_FIGS`, and one number on three pages means less on each. About gives
it up; the closer earns it (it is the payoff of a slide about the build). Contact was excused
here on the grounds that nothing else filled its last quarter, and that excuse did not survive
the day: see the spec band note above.
What is left, Blender / Three.js / React / After Effects, is the only fact set on the page that
no paragraph here states and no other page duplicates. Tiles are equal now (all `b-wide`, so
2 x 2 at 480px and one column under 900) because four peers ARE equal; the unevenness the old
note defended was the 15.9M tile, and `.v.big` / `.b-tall` were deleted with it.
Measured after, on the rendered page rather than the source (`scratchpad/bento_check.cjs`, three
viewports): "running in this browser" 2 -> 1, "san jose" 2 -> 1, "15.9" and "full-time" gone
from About, no sideways scroll. The block is 145px against the old 220, so a little of the
21% opens back up. Nothing was invented to refill it: naming a tool he does not use to pad a
grid is the failure mode this whole edit is against.
**AND THE DECK'S COPY IS SCROLL DRIVEN, WHICH THE SNAP MAKES POSSIBLE RATHER THAN
IMPOSSIBLE.** The deck is snap locked, so there is no scrolling WITHIN a slide to scrub
against, which is what made scroll-scrubbing look inapplicable here. But a snap ANIMATES
the scroll position over a few hundred milliseconds, so an element's distance up the
viewport is a real, continuous, reversible signal during exactly the moment a slide
arrives. `useRiseProgress` reads that; `LitWords` ramps the copy against it. Verified to
run BACKWARDS, which is the whole point: 0.78 settled, 0.22 scrolled away, 0.78 on return
(`scratchpad/lit.cjs`).
· **It listens on the HOME SCROLLER, not on window.** The pages are `position:absolute;
  inset:0` and scroll inside their own element, so window scroll events never fire.
· **`LitWords` separates words with a PLAIN SPACE, and this is the exact inverse of the
  rule that governs `Words`.** There the spans are inline-BLOCK, so a line may break
  between two boxes whatever is inside them, and the trailing space must be U+00A0 or it
  collapses at the end of its box. `LitWords` spans are plain INLINE, so an NBSP between
  words means the paragraph never wraps and runs off the slide. Copying the NBSP across
  was caught by the nine-size fit check, not by eye.
· It ramps COLOUR, not opacity: two deck slides are photographs, and fading text against
  a picture is not the same effect as bringing it up out of the page's grey.
**WHAT WAS PROPOSED AND REJECTED: a horizontal rail for Work** (user, 2026-09-09: "i dont
like the selected work nine pieces"). It listed nine top-level projects, but Work has
THREE categories and those nine were media items INSIDE them, so the demo flattened the
site's own information architecture to look full. **Work's coverflow is untouched and its
17% is still open.** Do not re-propose anything for that page without first deciding
whether the three categories or their contents are the top level.

**THE WORK MODAL LIFTS. A CARD-TO-PANEL MORPH WAS BUILT, SHIPPED AND PULLED**
(built 2026-09-08 on a request for Apple's motion feel, pulled 2026-09-09 on
"it looks a little funny, im not a fan"). Worth keeping because the reason it failed is
geometric and will apply to any second attempt.
It was a hand-rolled FLIP: the panel started on the clicked card's rect carrying a
`cloneNode(true)` of it, and the two crossfaded as the panel expanded into place. It
worked, and it was verified: first frame 380x501 against a card of 380x501, centres 0px
apart, at 390 / 834 / 1512. It still looked wrong.
**THE CARD IS PORTRAIT AND THE PANEL IS LANDSCAPE, so the travel between them is a
NON-UNIFORM scale**: 380/1080 = 0.35 across against roughly 501/700 = 0.72 down. Anything
carried along that path is stretched wide through the whole middle of the move. Fading
the clone out over the first half hides some of that and not enough of it.
So this is not a tuning problem. A morph needs the two boxes to share an aspect, which
means growing the panel from a CROP of the card rather than from the card, and that is a
redesign of the panel rather than a transition. **Do not re-attempt the FLIP without
solving that first.** What stands is the plain lift the modal always had, `opacity` plus
`scale 0.96`, now on the site's one ease.
Two things went with it and are not coming back on their own: `CardOrigin`, and
`openProject`, which existed only to capture the rect and the clone at the click.
**THE PAGE CROSSFADE STAYS, AND IT FIXED A REAL DEFECT.** `AnimatePresence mode="wait"`
unmounted the outgoing page in full before mounting the incoming one, so every navigation
went through a beat of bare root background: a black flash between pages. All four page
roots are already `position:absolute; inset:0`, so they overlap with no layout change at
all and `mode` is simply dropped.
· **Opacity is LINEAR on both sides on purpose.** Two opaque layers crossfading on an
  eased curve are not inverses of each other, so their combined coverage dips in the
  middle and the root shows through as a grey wash.
· **The scale only ever shrinks TOWARD 1, never below it.** A page under 1 reveals its
  own edges, and About is cream on a dark root, so that reads as a hairline frame. 1.012
  settling to 1 over-covers throughout.
**Inter is now actually DOWNLOADED.** It was third in the base stack at `html` and never
fetched, so `-apple-system` gave real San Francisco on Apple hardware and Segoe UI or
Roboto everywhere else. Note the licensing, since it is the only real line here: SF Pro
may not be self-hosted as a webfont (Apple's licence covers building for Apple platforms),
but naming it in a stack so the OS serves its own font is fine, which is what the site
already did. Inter is the SIL OFL near-clone that closes the gap off Apple hardware.
**The page crossfade and the modal both opt out of reduced motion in JS, through the
module-level `REDUCE`,** because framer writes inline transforms that the
`transition-duration` rules in GLOBAL_CSS cannot reach. Same reason the storyboard
carries its own pin.
`scratchpad/verify_motion.cjs` covers all of it, including an assertion that the modal
never travels, which is what will catch a FLIP if one is ever reintroduced.
**NOT done, and deliberately: the deck is still scroll-TRIGGERED, not scroll-SCRUBBED.**
Slide elements fire once on entry and play out; Apple's track the scroll position and
scrub both ways. That is the biggest remaining difference in feel and it reshapes an
approved layout, so it wants its own pass.

**THERE IS NOW ONE EASE ON THE SITE AND IT IS APPLE'S** (user, 2026-09-08, asked for it
across the whole site in the same pass). `--ease-out` WAS `cubic-bezier(0.16,1,0.3,1)`,
an expo-style curve that spends most of its travel in the first fifth of its duration:
measured, that one is 27% of the way home at 10% of the time against the new one's 17.6%.
Front-loading that hard reads as SNAP, and snap is the opposite of weight. It is
`cubic-bezier(0.32,0.72,0,1)` now.
**The token was never the whole story, and changing it alone would have left the site
half-retuned.** The old curve was also written out BY HAND in six CSS declarations that
never referenced the token (`.ss-scell`'s three transitions, its thumbnail zoom, the Work
progress bar's inline `width`, and the carousel dots) and as a bare framer-motion array
in **12** places, plus `SB_EASE` (the whole storyboard) and `NAME_EASE` (the hero name).
All of them now resolve to one source: `var(--ease-out)` in CSS, `APPLE_EASE` in JS, with
`SB_EASE` and `NAME_EASE` aliased to it. Grep for the literal after any easing work.
**Two curves are deliberately NOT folded in.** The map pin's pulse
(`cubic-bezier(.2,.7,.3,1)`) is an infinite loop rather than an arrival, and `stepEase(n)`
is a STEPPED function, not a curve at all: it is what makes the storyboard's pictures
build course by course, and an ease would destroy it.
**`NAME_EASE` was the one real risk and it was measured, not assumed.** The hero name's
letters drive keyframes whose OVERSHOOT is in the keyframes rather than the easing, on
purpose: a springy curve overshoots every property it drives, which on `filter` means a
negative blur (invalid, so the letter flickers) and on `opacity` a value over 1 that
clamps and flattens the fade. `APPLE_EASE` never leaves 0..1 (its y control points are
0.72 and 0), so the knock still lands only on `y` and `scale`.
`scratchpad/verify_heroname.cjs` passes 14/14 after the change, including that the
letters still reach different opacities mid-entrance, i.e. they really stagger.
**`scratchpad/verify_ease.cjs` is the coverage check** and it reads the COMPUTED
timing function off live elements rather than grepping the source, because two of the
six folded-in copies live in inline `style` props where a `var()` has to resolve against
`:root` at computed-style time. It also sweeps every element in the document and asserts
none still carries the old curve. Re-run it after any easing work.
**THE HERO NAME IS BEBAS NEUE AND IT BUILDS ITSELF, LETTER BY LETTER** (user, 2026-09-03: he
asked for a cooler font and an animation, suggesting "spell out or fall into place"). It was one
`h1` reading `Shyon<br />Shiri` in the base SF Pro at weight 700, fading up 40px as a single block,
and it was the only big display heading on the site never given a face of its own.
**The face is the one the site already owned.** About's and Contact's display headings are Bebas
Neue, so the name was the odd one out rather than the standard; using it costs no extra download
(`index.html` already fetches it) and makes the three biggest pieces of type on the site one voice.
It is CONDENSED CAPS and has to be set as one: positive tracking (0.012em, since a condensed face
runs its letters together at the negative tracking the old sans wanted), `line-height` 0.86 (caps
have no descenders, so this closes the two lines into one block), and a bigger size, because the
same point size in a condensed face covers far less width. The ceiling went 160 to 200 and the vw
term 10 to 12.5. Anton, Syne, Instrument Serif and Space Grotesk were built and shown alongside it.
**The animation is the REALM'S OWN VOCABULARY, not a generic entrance.** Each letter drops in from
above its line, overshoots by a hair and settles back, staggered left to right the way a course is
laid. Everything in the Realm snaps to the stud grid and pops into place, and the title bubbles over
the buildings already assemble course by course and print their label letter by letter, so the
homepage now opens with the gesture the world runs on. `HeroName`, `nameStagger`, `nameChar`.
**THE OVERSHOOT IS IN THE KEYFRAMES, NOT THE EASING, and that is the trap.** A springy
cubic-bezier overshoots every property it drives, which on `filter` means a NEGATIVE blur (invalid,
so the letter flickers) and on `opacity` a value over 1 that clamps and flattens the fade. `y` and
`scale` are driven past their targets explicitly on a plain ease instead, so the knock lands on the
two properties that should have it and the other two stay monotonic.
**`y` IS IN `em`, NEVER PIXELS.** The size is a `clamp()` resolving 58px to 200px across the range,
so a fixed drop is most of a letter's height on a phone and a third of one on a wide desktop.
**Accessibility:** split into spans the name reads as ten separate letters, so the `h1` carries
`aria-label="Shyon Shiri"` and the letters are `aria-hidden`. There is NO `text-transform`: Bebas
draws caps on its own, so the DOM text stays "Shyon Shiri" for screen readers and SEO. Reduced
motion pins it finished in `GLOBAL_CSS`, alongside the storyboard's own pin, because framer-motion
writes inline transforms the duration rules cannot reach, and the letters ARE the name.
Verified in real headless Chrome, not the pane, which pins every framer-motion entrance at `hidden`
(§7): `scratchpad/verify_heroname.cjs` (14 assertions, including that mid-entrance the letters sit
at different opacities, i.e. they really stagger), `heroname_sizes.cjs` (six viewports: fits, clears
the paragraph, no sideways scroll), `heroname_rm.cjs` (reduced motion). `verify_type.cjs`'s home
`h1` expectation was updated from SF to `.ss-hero-name` / Bebas Neue.

**The homepage is a DECK** (user, 2026-09-01, and this REVERSES the earlier revert of exactly this:
a snap deck was built once and pulled because the ask then was animation and not pinning. It has now
been asked for. Do not undo it on the strength of that old note). It is **6 slides** and each holds
the full viewport and snap-stops there: the hero, the full bleed OPENER, the interactive TOWN MAP, the quiet WHY chapter, the WORKSHOP
contact sheet, and the full bleed CLOSER carrying the measured figures and the door. 13 stills:
6 in-engine frames shot at the game's REAL fog and 7 staged Blender frames showing the structures
part-built, `verify_deck.cjs` walks all 6.

`Slide` is the ONE thing on the storyboard that watches the viewport. Everything under it declares
`variants` and nothing else, so a slide arrives as a sequence (rule, then heading a word at a time,
then body, then the frame chrome, then the picture, then the caption) rather than as several blocks
that happen to be near each other. Variant inheritance is React CONTEXT, so the plain grid `div`
between a slide and its two frames does not break the chain. `once` is deliberately unset: the slide
you left is fully off screen, so coming back replays it. Chapter kickers, body copy and the CTA head
are split per word by `Words`; the photos keep their per-chapter signatures (establish / unfold /
blinds in 01, slideL in 02, the stepped `courses` clip through all of 03, push in 04).
**THE DECK OPENS ON THE WORLD, FULL BLEED** (user, 2026-09-03: "who is coming to my website
and intrigued to learn about my lego world when this is the opener"). The first screen past
the hero was a chapter header reading "01 · What it is" over a contents line over two
bordered panels a third of the screen tall, one of them a figure standing in a rubble field.
That is a filing card, and nobody walks into a world because a heading announced that a
section was about to describe one. Slide `open` is now `story_aerial_town.jpg`, shot in
engine and sitting unused: the whole town at once, the river, all four structures, the real
fog, edge to edge, with the name and one line on it. The other unused still,
`story_world_midday.jpg`, was checked and rejected: it is an old flat Blender render with
mint trees and no atmosphere, nothing like the Realm now. It stays on disk as the og:image.
**The bleed uses CANCELLING MARGINS, never `100vw`.** The slide sits in `.ss-story`, padding
`0 8vw`, so a content box is `client - 16vw` and `-8vw` either side widens it to exactly
`client`: the vw terms cancel whatever the window or the scrollbar. `100vw` does NOT cancel,
because vw counts a scrollbar the scroller's client width does not, which is up to 15px of
horizontal overflow. Measured at three sizes: slide left 0, slide width == client width,
zero overflow on both the scroller and the document. The type is put back on the deck's own
1180 column by the inner, so the title starts on the left edge every chapter below it does.
**The veil is a footing for the words, not a filter over the world.** A first pass ramped
.72 left to right over the full height on top of a bottom ramp reaching 58% up, and between
them they greyed the picture, which is the one thing this slide may not do. The top 55% is
untouched now; a bottom band carries the type and a soft ellipse sits under the corner the
words are in.
**AND THE NAV NEEDED ITS OWN BAND, WHOSE DEPTH IS SOLVED.** This is the only slide whose top
is not black. The nav is `#f5f2ed` at opacity 1 for the current page and **.55** for the
other three, so everywhere else the dim state runs 5.8:1; over this picture it measured
**2.4:1**. Sampled through a canvas, the world under the nav is a flat 170,140,140 and its
brightest pixel is 172,142,142, so there is no worst case hiding anywhere. A first fix at
.62 falling to .24 by 6% also missed, because the nav sits at **4.0% to 5.9%** of the slide
and the ramp had collapsed before it got there. The band now holds .82 to .76 across the top
7% and is gone by 24%, which measures **13.5:1 active and 5.1:1 dim**.
`scratchpad/nav_contrast.cjs` measures it; do not tune this gradient by eye.
**The opener keeps its height when the rest of the deck stands down.** The stand down exists
because a chapter band and a two up frame row cannot share a narrow screen; one picture and
two lines can. Collapsed with the rest it became a 270px strip with the title under the nav.

**THE DECK IS 6 SLIDES AND EACH ONE IS A DIFFERENT KIND OF SCREEN** (user, 2026-09-03, who
asked for the structure to be redesigned from scratch: "the layout structure seems to prevent
this page from looking how i imagine"). It was eight near identical screens, each a block of
type over two bordered rectangles, and the same treatment was given to a sunset over the town
and to a screenshot of a Blender node graph. The organising idea now is that the 13 stills
are TWO SPECIES and the page says so:
· **The world**, the in-engine frames. Full bleed, type on the picture, no chrome at all.
  That is `open` and `close`, and the map between them.
· **The workshop**, the Blender captures. Small, gridded, monospaced, dimmed except the one
  you are on. Evidence, and it looks like evidence.
The sequence is hero → opener → town map → why (the quiet one) → workshop → the door.
Every still is still on the page and `story_world_midday.jpg` is still the only one unused.

**THE WORKSHOP IS ONE CONTACT SHEET, NOT THREE SLIDES.** All seven Blender captures on one
screen, four across and two rows. **The seven captions are not lost, they are MOVED**: one
line under the grid that answers to whichever cell you are on, so seven captions cost the
height of one and the sheet stays dense enough to read as a sheet. That line is ALWAYS
present, holding the first cell's caption at rest, because revealing it only on hover made
the whole grid jump every time the pointer crossed a cell.
**Cell HEIGHT is driven by vh and the picture is cropped to it.** The sheet shares a snap
locked screen with a chapter band, and an `aspect-ratio` would make its height a function of
the window's WIDTH, which is the one thing that cannot be traded against the band above it.

**THE CLOSER IS THE OPENER'S TWIN**, the same full bleed treatment on the other aerial, so
the deck ends where it began with the way in on it. Two things it needed that the opener did
not:
· **It has to sit OUTSIDE the 1180 column.** Cancelling `.ss-story`'s `0 8vw` is not enough
  from inside that wrapper, because the wrapper has its own centring margin: measured, the
  slide came out 1422 wide starting at x 45, with black bars either side. The opener escapes
  this by being a direct child of `.ss-story`, and the closer now is too.
· **A DEEPER VEIL.** Its block carries the four figures as well as a title, so it starts at
  **52.8%** of the slide against the opener's ~72%, which is above everything the shared ramp
  was tuned for: TRIANGLES A FRAME and FULL DAY CYCLE sat on open meadow and could not be
  read. The closer's own ramp holds .74 at 48% and its figure labels come up from .52 to .72.
**The figures are real and measured**: 15.9M triangles a frame and 689 draw calls counted in
the live page by `scratchpad/realm_cost.cjs`, 35 glb files with them, 7 minutes is
`CYCLE_SECS`. Do not add one that is not in the docs.

**WHAT THE RESTRUCTURE KILLED.** `StoryFrame` and its whole frame chrome (border, head strip,
caption box), `.ss-frame*`, `.ss-eyebrow`, `.ss-slide-solo`, `.ss-split-row`, the `.ss-row-l`
/ `.ss-row-r` measure rhythm, `sbSweep`, and five of the seven photo entrances
(`shotEstablish` / `Unfold` / `Blinds` / `SlideL` / `SlideR` / `Push`) with the `SHOTS` map.
**`shotCourses` is the house style now** (user chose "everything builds"): the held five step
bottom to top reveal is what every picture on the deck does, because it is how a LEGO build
goes on. `Plate` is the borderless still that replaced `StoryFrame`, and its crop window is
set to `50% 24%` rather than centre: the plate is far wider than it is tall and centred it
took the top off the figure's head.

**THE TOWN IS A MAP, AND IT REPLACED TWO SLIDES****THE TOWN IS A MAP, AND IT REPLACED TWO SLIDES** (user, 2026-09-03, who asked for the
structure to be redesigned from scratch and picked this element to build first). Slide `map`
takes the place of what were the "What it is" chapter (over the figure and the night house)
and a "Portals" frame row (the shop and the crystal). The copy on that chapter was already
describing a legend, four structures and the category of work each one stands for, and the
deck opens on an aerial with all four in it, so the shot comes back close with the buildings
pinned on it. `REALM_MAP` carries the four: shop → Professional Services, cottage → Personal
Projects, mansion → About, ruins → NABU, each with the in-engine still those two slides were
showing anyway. `story_aerial_town.jpg` is the ONLY aerial with all four in frame;
`story_aerial_sunset.jpg` has no coffee shop in it and cannot be substituted.
**THE PINS ARE IN IMAGE SPACE.** `fit` measures the CONTAINED box the picture really
occupies inside the stage and the pins are positioned in that, so they cannot drift off a
building when the stage's aspect stops matching the picture's. `contain` and not `cover` for
the same reason: the mansion sits at 93.5% of the frame's width and any horizontal crop takes
it. Coordinates were read off the RENDERED map and corrected once (the shop was 2.8% out).
**The centring is passed as motion's `x`/`y`, never as a CSS transform.** `sbPin` animates
`scale` and framer-motion writes the whole `transform` inline, so a `translate(-50%, -50%)`
in the stylesheet is overwritten the moment the variant runs: measured, every stud landed
22px down and right of its building and the mansion's ran off the picture entirely.
**A pin is a 44px BUTTON with the label hung outside it.** In flow the label is part of the
button's width, so `-50%` centres the stud PLUS the label on the point. And it is a button,
not a hover: hover opens the card on a mouse, but click and focus open it too, because a
phone has no hover and neither does a keyboard.
**The card is a SIBLING of the stage, not a child.** The stage is aspect locked, so anything
inside it is stuck over the map: at 390 the map is 328 wide and a card on it covered more
than half the town. Outside, the same element overlays the map on a wide window and drops to
a block underneath on a narrow one, where the map goes full bleed on the story's own
cancelling gutters.
**The pins pulse, and that is an affordance and not decoration.** Four small blue dots on a
photograph read as part of the photograph. The four rings are offset in time so they read as
four things rather than one blink, and the ring stops on the pin you are on.
Verified in engine: all four pins on the image and on their buildings at 1512, 1024 and 390,
the card opening from a click, zero console errors (`scratchpad/map_shot.cjs`,
`map_mobile.cjs`).

**A CHAPTER IS A TITLE AND A PARAGRAPH. NOTHING ELSE** (user, 2026-09-03: "why is the chapter
number even here, why is it not just a title", and he did not like it stating "two frames").
Three things carrying no information are gone: the `01`–`04` numbering, which numbered four
sections already told apart by their titles; the blue rule it hung off, decoration on
decoration once the number left; and `.ss-chapter-meta`, "TWO FRAMES · FR 05 – 06", a shot
list telling the visitor how many pictures were coming in the private vocabulary of whoever
assembled the page. **The FR numbers on the frames went with them**: their only job was to
key into that contents line, so "FR 05" then referenced nothing. The head strip keeps the
half that is real information, which is what the picture is OF.
**THE TITLE IS BIG ENOUGH TO OWN ITS COLUMN, AND IT IS FILLED WITH A GRADIENT** (user,
2026-09-03: "can you add some styling to the blue titles or something, why is it just
sitting in an open black space if it doesnt even need that space"). At 52px on one line it
was a 225px object in a 505px column with 90px of black over and under it. It is 96px on
TWO lines now, a block about 380 by 180, so it fills the column across and stands as tall as
the copy it is centred against: the space stops reading as empty because something is in it.
**The two lines are set by hand and must stay that way.** `Words` takes a `\n` as a hard
break (a real `<br>` between two runs of word spans, so the stagger runs through it) and the
kickers carry "What\nit is", "Why I\nmade it", "How I\nmade it". Left to wrap on the column
a display title breaks where the column runs out, which at this size is always "Why I made"
/ "it", stranding the object on a line of its own.
The fill ramps light at the cap height to a deeper blue at the baseline, with a faint bloom
of its own colour over the whole title. The bloom is not invented for it: the deck rail's
active tick already glows in this blue and the Realm's crystal is an emissive material.
**The gradient sits on the WORD SPANS, not the paragraph**: each span is a transformed
inline-block, and a background clipped to text on the parent has to survive every one of
those transforms. Every span shares one line box height, so no word is a different blue.

**`Words` ends each span with a NON-BREAKING space (U+00A0), and it is load bearing.** A word
is an inline-block and an ordinary trailing space inside one is collapsed away at the end of
the box. Retyped as a plain " " while editing the function, every paragraph on the homepage
rendered as one unbroken run, "Theenvironmentisasmalltown". It is a real character in the
source, not an escape, so it does not survive being retyped from a screen.

**The band is `align-items: center`, and that is what let the third element go.** A one line
title beside a five line paragraph leaves its column two thirds empty, and top aligned that
empty runs along the BOTTOM of the title, which is a hole; split evenly it is air. The
contents line had been propping that hole up. The pictures took the freed height back, 34vh
to 38vh.

**No two slides in a row share a MEASURE.** Six of the seven frame rows were 1fr 1fr, so the
deck was the same two rectangles over and over: equal / lead-left / lead-right / equal /
lead-right / lead-left now (`.ss-row-l` / `.ss-row-r`, 1.2fr against 0.8fr), and the short
frame drops to the row's baseline instead of stretching to it. It costs NO height, which is
why it is the lever: the stills are capped in vh and cropped with `object-fit`, so a wider
column is a wider crop, not a taller picture. Their narrow-stack override must sit AFTER
them in the sheet, not with the other 760px rules: same specificity, and the later rule wins
whether or not the earlier is in a media query. The three slides that are frames alone carry
an `.ss-eyebrow` so they are anchored rather than floating mid screen.

**THE BAND HAS TO BE ABLE TO GIVE WAY, and fixing that fixed a failure that PRE-DATES all of
this.** Three of the nine sizes `verify_deck_sizes.cjs` drives were already over their own
viewport (1280x720 by 71px, 1366x768 by 40, 1024x700 by 151), which under mandatory snapping
is a slide whose bottom cannot be reached. The band is the tallest thing on the deck and the
copy is what makes it tall, so the body's size lives in `.ss-chapter-body` and not inline (an
inline style beats a stylesheet) and clamps to 14.4px at the narrow end, resolving to the
same 16px it always was at 1333px and over; the gutters and the band's gaps went vh-based
with it, and `@media (max-height: 760px)` alone trims the chapter stills. All nine pass.

**Mandatory snapping is only honest while a slide FITS**, and nothing guarantees that on its own:
the stills are 16/9 and 4/3 mixed and the two-up rows stack under 760px. So the media carries a vh
cap (cropping at the cap, hence `object-fit`), `.ss-slide` CLIPS (the watermark numeral is laid out
from the copy's midpoint and is meant to bleed, which otherwise put 36px of scrollable slide under a
snap point), and the whole mechanism stands down to free scrolling under 860px wide or 620px tall.
`scratchpad/verify_deck_sizes.cjs` measures the real content against the slide box at nine window
sizes and is the check that this still holds; `verify_deck.cjs` walks every slide and asserts
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

**WHO GETS INTO THE REALM, AND WHO IS TOLD ABOUT IT** (user, 2026-09-02). One rule in one file,
`public/realm-support.js`, loaded as a plain script by BOTH `index.html` and `lego.html`, because
the Realm is vanilla and cannot import from the React bundle. `window.__realmSupported()` returns
`{ok, why}` and `__realmSupportMessage()` the line to show.
**THE COST IS THE REASON, and it is measured, not assumed** (`scratchpad/realm_cost.cjs`, run in
the live page): one frame is **15,894,880 triangles across 689 draw calls**, and the scene holds
**197MB of geometry buffers plus 86MB of textures, about 283MB** of GPU-side data, after a 38.4MB
download of 35 `.glb` files. iOS Safari reclaims a tab well below that, so on a phone the Realm does
not run slowly, it reloads. Making it genuinely mobile is a scene-budget project (the Corvette alone
is 1.71M triangles), not a settings change.
Tested in order: `webgl` (a context must really initialise), `gpu` (`MAX_TEXTURE_SIZE` >= 4096),
`memory` (`navigator.deviceMemory` < 4, where the browser answers at all), `touch` (a device whose
PRIMARY pointer is a finger, which is the memory test for the browsers that will not answer one).
The probe RELEASES its context with `WEBGL_lose_context`: a browser allows only a handful and drops
the oldest, so a probe that holds one open costs the Realm the context it is about to ask for.
**IT DOES NOT READ `innerWidth`, AND THAT IS THE POINT.** The old gate was
`window.innerWidth <= 640` in `src/App.tsx`, which asked the wrong question twice: it hid the Realm
from a desktop browser dragged narrow, where it runs perfectly, and it passed any wide-screened
tablet. Capability belongs to the DEVICE, so the answer is read once and never recomputed on resize.
It FAILS OPEN in `src/App.tsx` (a missing script shows the way in) because `lego.html` carries the
same gate and turns away anything it should; failing closed would hide the Realm from every desktop
over one missing file.
**`lego.html` REDIRECTS rather than loading.** Its check sits ABOVE the vendor scripts, where none
of them has been fetched yet, and sends an unsupported device to `public/realm-unsupported.html`
with `location.replace` (not `href`, so Back returns to the site rather than bouncing). Verified:
0 heavy requests on a phone.
**AND NOBODY IS INVITED THROUGH A DOOR THAT WILL NOT OPEN.** Where the device fails, the homepage's
"Enter My Lego Realm" button is replaced by a DESKTOP ONLY line carrying the real reason, chapter
04's kicker becomes "The finished build" instead of "Try it", and its body drops "Walk it yourself".
The storyboard itself is untouched: the Realm is still discussed and still has its pages.
**The hero's full sentence is back on every device.** Its tail (", or scroll down for the
interactive 3D environment built into it") used to be cut to a full stop under 640px, so a phone was
never told the Realm existed. Reading about it was never the thing that needed gating.
`scratchpad/verify_gate.cjs` drives desktop and phone and asserts all of the above, 14 assertions.

**Touch targets are an OVERLAY, `.ss-tap`.** Measured across ten viewports, the nav buttons render
17px tall and the page dots 10px, against Apple's 44px minimum. Growing them would redraw the
design, so the hit area is a transparent `::after` laid over the element and layout, spacing and
drawn size are all untouched; its width is `max(100%, 44px)` so a wide control keeps its own width
and only a narrow one is padded out. It needs `position: relative` on whatever wears it. The scroll
cue gets real padding instead, being a lone glyph. The one control left under 44px is the "here"
link inside the hero sentence, deliberately: WCAG exempts a target inline in a sentence, and giving
it a 44px box would overlap the lines above and below.

**ABOUT'S NAV FOLLOWS THE PHOTO'S CROP, NOT THE PAGE.** It is painted solid black on a `normal`
blend at 1024 and up, which is right for what the WIDE layout puts behind it: the photo column
starts at 50% and the nav lands on the pale studio wall. The photo is `object-fit: cover`, so
narrowing crops it to the dark hair and jacket, and there black on black was invisible: at 768 and
390, WORK / ABOUT / CONTACT all but disappeared. Under 1024 it joins every other page on
`difference`. **Do not "simplify" this to `difference` everywhere:** difference CANCELS toward mid
grey (the same trap the Realm's cursor documents, exact at 127.5) and the studio wall's vignette
behind the wide nav sits in that zone, which measured CONTACT at about 2.3:1 against the approved
black's 8.6:1. About also does not DIM its inactive items, which is contrast and not colour: 0.55 of
the near-black the blend produces on a light page reads as a washed-out grey.
**ALL OF THE ABOVE IS SUPERSEDED**, and is kept because the reasoning still applies to anything
that tries to derive a bar from what is behind it. The Apple round-two pass gave the nav its own
ground (a frosted translucent bar, `lightPage` picking a cream fill on About and a dark one
everywhere else), which deleted the solid-black paint, the `difference` blend and About's
wide-layout special case together. The "known and not fixed" mid-grey failure went with them.

**AND THE ABOUT PAGE STACKS UNDER 768** (user, 2026-09-09: fix the About page layout on mobile).
The grid was a flat `1fr 1fr` at EVERY width, so the copy column is half the window less its own
`8vw + 60px` gutters. Measured at 390 that is **172px**: the two paragraphs, the h2 and the bento
were all rendering into about 25 characters a line. Three separate media blocks had answered that
by shrinking the words, 15px at 768, then 13px on a 1.4 line at 640, with the eyebrow taken down to
**6px** and the h2 to 42. **That is not a fix. A narrow measure is not made readable by setting it
smaller.** All three blocks are deleted rather than re-tuned.
Stacked, the portrait takes the top and the copy runs the full width under it, bounded by the 480px
`maxWidth` the paragraphs already carry: the measure goes **172 -> 342** at 390 and the body goes
back to the same **17px** the desktop page sets. PHOTO FIRST, by grid `order` and not by moving it
in the DOM, so the source order stays the wide layout's reading order.
· **The page has to be able to SCROLL, and this half would have failed silently.** Every page root
  here is `position:absolute; inset:0; overflow:hidden`, which is right while the layout is two
  full-height columns and truncates the moment it is not: stacked content taller than the viewport
  is not scrolled to, it is CUT OFF. So the root takes `overflow-y:auto`, the grid gives up
  `height:100%` for a `min-height`, and the text column gives up both its `overflow:hidden` and its
  `justify-content:center`. All four are INLINE styles, hence the `!important`.
· **The crop is solved, not guessed.** The source is 2184x3298 and `object-fit: cover` on a
  landscape box is WIDTH bound, so the face sits at a fixed 131px from the top of the picture
  whatever height the box is given: it cannot be pushed further down by making the photo taller.
  At the old `center 10%` that put his EYES at 108px under a nav whose bottom edge is **101px**,
  i.e. behind the glass. `center 0%` is the only value that clears it, and 46vh is the height that
  then holds his whole head and shoulders.
· **The nav had to thicken, and this is the old mid-grey trap arriving from the other direction.**
  The bar runs in its LIGHT mode on About because About is a cream page, which the wide layout
  guarantees by putting the copy column under the nav at every width. Stacked it does not: the
  photograph is the top of the page and the whole thing scrolls under a fixed bar, so dark type on
  a .50 white glass ended up over a black jacket. Measured on the composited frame, 3 of 16 samples
  failed, HOME and WORK at 430 scrolled (**4.09** and **3.45**) and HOME at 768 scrolled (3.56),
  all three over grounds of about 120,115,113. The fill goes to .90/.84 on `nav.ss-nav-light` under
  768 and every sample passes, worst case **6.58:1**. It stays glass: the blur and the saturation
  boost are untouched and the top of the hair still reads through it.
  The class exists because the fill has to answer to the VIEWPORT, and a width read in JS at render
  time does not survive a resize. The same bug was live in the text column's padding, an inline
  `window.innerWidth <= 640` ternary evaluated once at mount; it is a stylesheet rule now.
  **SUPERSEDED the same day: the bar is gone and `nav.ss-nav-light` with it.** The stacked
  About's jacket is now carried by the light halo on the type instead, re-measured over the
  same sweep at 41/41. The mid-grey trap this bullet documents is still the reason that
  sweep exists, so keep running it.
· **The bento is held at four tracks here**, overriding the 900px rule that takes it to two: with
  every tile spanning two tracks, two tracks is one tile per row and four tall boxes down a phone.
· **THE LANDSCAPE PHONE IS THE SECOND QUERY, and it was clipping worse than the portrait one.**
  A turned phone is WIDER than 768, so it misses a width-only breakpoint entirely, while being far
  too short for a full-height column. Measured before the change, the copy overran its own box by
  **230px at 844x390** and 140 at 932x430, with the bento's bottom edge 198px past the column at the
  first of them, all of it invisible: the column is `overflow:hidden` and the page above it did not
  scroll. The trigger is `(max-width: 1100px) and (max-height: 620px)` alongside the 768 one, where
  620 is the same short-screen height the homepage deck already stands down at and the 1100 keeps it
  off a laptop. The photo's `min-height` came 300 -> 220 for the same reason, since 300 is most of a
  390-tall screen. All three landscape sizes now report 0 over and a scrollable page.
Verified in real headless Chrome at 390 / 430 / 768 / 844x390 / 932x430 / 1024 / 1512: `scratchpad/about_stack.cjs`
(geometry, computed sizes, scrollability, no sideways scroll), `about_scrolled.cjs` (the bento is
reachable and fully visible, zero console errors) and `nav_contrast_mobile.cjs`, which is
`nav_contrast.cjs` retargeted at the narrow About and samples the bar both at rest and scrolled.
1024 and 1512 are byte for byte what they were.
`scratchpad/about_docw.cjs` is the one to re-run after any About layout work: it drives all TEN of
the responsive audit's viewports and asserts two things per size, that the document never scrolls
sideways and that the text column's content never exceeds its own box, i.e. that nothing is being
silently cut. All ten clean. The full `responsive_audit.cjs` reports About at only its two
documented non-bugs, the cursor dot and the photo's zoom inside its `overflow:hidden` parent.
**`responsive_audit.cjs` USED TO REPORT A DEAD SERVER AS A CLEAN SITE, and that is fixed**
(2026-09-09). It carried `http://localhost:5701/` hardcoded in TWO places, the initial open and
the per-page `Page.navigate` inside its own loop, and ignored the URL it was passed. Since there
are ~20 named port configs here precisely because concurrent sessions hold ports, running it on
any other one navigated to nothing. **An empty document has no element wider than the viewport,
so a total failure to load is indistinguishable from a perfect result**: every page came back
"clean" and the run exited 0. The URL is `process.argv[2]` now, defaulting to 5173, and the mount
wait ASSERTS rather than falling through, so nothing rendered after 20s prints the URL it tried
and exits 1. Both halves were checked: 5701 fails with exit 1, 5209 audits the real site.
That failure mode is the general lesson, not the specific port. **A checker whose subject is
missing must fail, never pass.** The same trap is already recorded for the Vite dev server
refusing `127.0.0.1` (every DOM assertion fails and it reads as the change under test having
broken the page) and for a work-modal assertion passing on an empty string when the modal did
not open.

**Reading the responsive audit** (`scratchpad/responsive_audit.cjs`, ten viewports x four pages).
Three things it reports are NOT bugs and were checked against screenshots before being believed:
`div[-5..5]` on every page is the custom cursor dot; `img.ss-frame-img`, `img.ss-about-photo` and
Work's `.ss-card` row all sit inside `overflow:hidden` parents (the photo's slow zoom and the
coverflow's peeking neighbours are the design); and a `.ss-tap` control's DRAWN box is deliberately
unchanged. The check that matters is that the DOCUMENT never scrolls sideways, and it does not, at
any of the ten sizes.

**THE CHAPTER BAND'S TWO HEADLINE RULES WERE ORPHANED FOR THREE COMMITS, AND ARE FIXED** (2026-09-08).
`1e47206` restructured the deck: `StoryChapter`'s `pair` branch stopped emitting
`<div className="ss-chapter-pair">` and started emitting `.ss-chapter-head`. The same commit ADDED
the two rules that were the point of that redesign, and wrote both against the class it had just
stopped rendering: `.ss-chapter-pair .ss-story-kicker` (the 96px two-line gradient title) and
`.ss-chapter-pair .ss-chapter-body` (the `clamp(14.4px, 1.2vw, 16px)` narrow-end body). Neither
had ever applied. Measured in real headless Chrome before the fix, the title fell back to the base
`.ss-story-kicker` at **61.99 / 52.48 / 41.98px** at 1512 / 1280 / 1024 against the intended
**96 / 81.92 / 65.54**, with `line-height` 1.02 instead of 0.92, and the body sat at a flat **16px**
at every width, which is exactly the value this file records as the deck's one snap-locking failure.
Both selectors now name `.ss-chapter-head`. Note the MAP slide is unaffected by design:
`.ss-slide-map .ss-story-kicker` is the same specificity and comes later in the sheet, so its
`clamp(32px, 4.2vw, 64px)` still wins there (measured 63.5px).
**The lesson is the trap, not the instance: renaming a class means grepping the sheet for every rule
that NAMES it, not just the JSX.** A CSS rule whose selector matches nothing fails silently in both
directions, and neither tsc nor eslint can see it. `scratchpad/deadcss.cjs` lists every `ss-*`
class defined in `GLOBAL_CSS` that no `className` ever carries; it found these two plus 16 rules
that really were dead. Re-run it after any rename.

**THE EM DASH RULE WAS BEING BROKEN BY THE SITE ITSELF, IN 17 PLACES** (2026-09-09). Rule 1 of
this file is the oldest and most reinforced rule the project has, and it had never been enforced
on the copy that ships. `src/App.tsx` carried twelve project TITLES built around one
(`Radar — Front View`, `UI/UX — minasech.net`, `Real Estate Marketing — Luning Dr`,
`Compass × Real Estate Experts — Morning Star Dr`, `Moskowite Corner — Concept Visualization`
and their pairs), `index.html` four more in the `<title>`, the description and both social
titles, and `realm-unsupported.html` one. `public/lego.html`'s visible copy was already clean:
its 36 are all in comments.
**THE REPLACEMENTS WERE NOT INVENTED, THEY WERE TAKEN FROM THE REALM**, which already ships the
same items under shorter names, so the fix closed a cross-surface naming drift at the same time:
`UI/UX, minasech.net`, `Luning Dr Flyer`, `Colleen Dr Flyer`, `Morning Star Dr Flyer`. Where a
title is a base plus a qualifier the connector is now a COMMA everywhere, which is the connector
`UI/UX, minasech.net` already used: `Radar, Front View`, `RGB Box, Back View`,
`Moskowite Corner, Concept Visualization`. Dropping "Compass ×" loses nothing, the description
already says the flyer is co-branded with Compass.
**A TITLE IS A FOREIGN KEY HERE.** `relatedItems` holds title STRINGS and `MediaViewer` resolves
them with `find(m => m.title === relatedTitle)`, so a rename that misses one entry is a dead
button, not a type error: `tsc` cannot see it and neither can eslint. All 32 references were
re-pointed and are asserted to resolve.
The head's separator is `·`, matching `lego.html`'s own `My Lego Realm · Shyon Shiri`.

**AND THREE THINGS WERE CALLED THREE THINGS EACH.**
· **NABU** was a `Clothing Brand` on the Work card, a `streetwear brand` in the modal and a
  `clothing label` on the town map. STREETWEAR wins, because the modal's line is the only one of
  the three that says anything (it carries the Persian and Assyrian heritage).
· **The role noun.** The meta description said "graphic designer and maker" while About says
  "graphic designer and developer". The meta is PROSE and now matches About. `Designer & Maker`
  is deliberately KEPT in the `<title>`, both social titles and the About eyebrow: that is a
  TAGLINE, a different register from a sentence, and it is already consistent across all four
  places it appears. Do not "unify" the two, they are not the same string doing the same job.
· **The availability line** was written twice, `...collaborations & full-time roles.` on the
  Contact page against `...collaborations, and full-time roles.` in the Realm's Contact panel.
  The AMPERSAND form wins and it is not a coin toss: `assets/contact_preview.jpg`, the image
  the panel is drawn on, was rendered from `scratchpad/contactcard/card.html`, which carries the
  ampersand. The panel's own `desc` was disagreeing with the picture above it.
**`scratchpad/verify_copy.cjs` is the check**, 35 assertions in real headless Chrome, and it
reads the RENDERED page rather than grepping the source: no em dash survives in `body.innerText`
on any of the four pages, in any of the three Work modals, in the media viewer, in the town map's
cards, or in the head's own tags. Two traps it is built around. A modal that silently fails to
open makes every "no em dash" assertion under it pass on an EMPTY STRING, so each one first
asserts the modal really opened and has content. And the related-item buttons are
`text-transform: uppercase`, so `innerText` gives them back capitalised and any assertion on
their text has to be case insensitive.
**AND THE MIRRORED HALF WAS DONE IN BOTH FILES AT ONCE** (2026-09-09). A project's title and
description are ONE asset described twice, in `PROJECTS` in `src/App.tsx` and in the CREATIVE /
PROFESSIONAL / NABU arrays in `public/lego.html`. Fixing either side alone re-opens the drift the
em dash pass had just closed, so all 28 edits were applied to both, each one asserting its expected
hit count in each file so a miss aborts the run instead of half-applying it
(`scratchpad/copypass.py`).
**THREE DESCRIPTIONS WERE NOT VAGUE, THEY WERE WRONG, and that was only found by OPENING THE
ASSETS.** Do not rewrite a caption from the caption. `Studio Photography` ("Studio photography
focused on composition and lighting") is a cropped apparel shot carrying a hand drawn *shiri*
wordmark, so it is `Shiri Wordmark` now. The two cases shared one sentence word for word, and
"designed to resemble liquid metal" describes an intention: both finished pieces are organic
printed lattices, blue on the phone and purple on a sleeve that wraps an AirPods Pro case, doing
different jobs. `Campaign Project` is a spec print ad for a fictional shaver brand with the product
name in the artwork, so it is `Ultron Shaver Campaign`.
`Rendered 3D Model` became `Creature Head Sculpt`: nine other items are also rendered 3D models.
**IT IS STILL NOT NAMED**, and that is deliberate, matching the description's own "movie
creature": hard rule 4 keeps licensed characters out of the shipped build and the copy holds the
same line. `Hardware Builds Together` (a title that read like a filename) became `Radar and RGB
Controller`, which is SEVEN edits, not one, because six `relatedItems` entries point at it by
string. `Custom Airpod Case` became `Custom AirPods Case`, which is how Apple writes it.
**HYPHENATION: the hyphen goes on a compound MODIFIER and nowhere else.** `3D-printed enclosure`
but "then 3D printed and finished by hand" (a verb phrase, left open); `front-end engineering` but
About's "design, front end, and deployment" (a noun, left open). `real-time`, `hard-surface`,
`stop-motion`, `Self-directed`, `Full-stack` and `LEGO-inspired` all took one. Note `Full stack`
was on the town map while `Full-stack` was two screens away in the Work descriptions.
**CHECKED ON BOTH SURFACES, NOT ONE.** `verify_copy.cjs` is 43 assertions in real headless Chrome
on the React side, and `scratchpad/realm_copy.cjs` walks all 12 panels of the Realm's Personal
Projects portal by index and reads each caption, 9 assertions, because a Realm panel is a 3D
TEXTURE and its caption is the only readable surface. A drift check now compares every `desc` in
the two files: 23 of 26 are byte identical and the only three that differ are the Realm-only
panels (About Me, Resume, Contact). Re-run it after any copy edit.
**A TRAP THIS PASS HIT: `lego.html`'s data arrays are SINGLE quoted and `src/App.tsx`'s are DOUBLE
quoted.** "A movie creature's head" is fine in the React file and terminates the string in the
Realm, breaking a 582KB file with a syntax error nowhere near the edit. Parse-check with
`new Function()` over each inline block after touching that data.

**THE LAST THREE, AND ONE OF THEM WAS NOT A COPY BUG** (2026-09-09).
· **The deck rail invited the visitor it had just turned away.** The closing slide swaps its own
  title to "The finished build" when the device cannot run the Realm, but `Slide`'s `label` was a
  hardcoded "Try it", so the tick above it still said Try it. It follows `realm.ok` now. Note WHERE
  this showed: the rail is `display:none` under 860px wide, so a phone never saw it. It needed a
  WIDE window that still failed the gate, which the check reproduces by emulating touch at 1280x800
  (`pointer:coarse`, so the real probe returns `why:'touch'`) rather than by emulating a phone.
· **`"testing"` was the fallback of the Work modal's descriptor ternary**, one added project id
  away from rendering to a visitor. It is `""` now.
· **THE TWO NABU YEARS ARE NOT WRONG AND WERE LEFT ALONE.** `NABU 2023 Spring Collection` displays
  2022 and `NABU 2026 Teaser` displays 2025, which reads on screen as each title contradicting its
  own date. Both are almost certainly right: a spring collection is shot the autumn before and a
  teaser runs ahead of the drop it teases. So the DATA is untouched and the DESCRIPTION carries the
  relationship ("Shot in 2022 for the 2023 spring collection", "Cut in 2025 to trail the 2026
  puffer jacket collection"), which is where it belongs and which also makes the pairing legible
  enough that a real typo would now be obvious. Changing the years instead would have destroyed
  true information to tidy a presentation problem.
  Note the descriptions live in the MEDIA VIEWER, not the modal grid, so that is the surface to
  check: it is also the only place the title and the year label sit next to each other, i.e. where
  the contradiction was actually visible. `scratchpad/verify_last3.cjs`, 17 assertions.

**AND THE VIEWER USED TO CLIP ITS OWN CAPTION, SILENTLY. FIXED** (2026-09-09, found while
measuring the About panel). `#viewer .card` is a flex ITEM in a column flex container with no
max-height, so on a short window it did not overflow, it SHRANK below its own content and cut the
bottom off the description under its own `overflow:hidden`. No scrollbar, no ellipsis, nothing to
say text was missing. Measured before the fix: the About panel lost **13px of copy at a 700px
viewport and 53px at 660px**, which a 1280x800 laptop reaches once browser chrome is taken off,
and it hit every long desc in every portal rather than just that one.
**`flex-shrink:0` is the fix and `justify-content:safe center` is what makes it usable.** Keeping
the card's real height and letting the VIEWER scroll is only half of it: with plain
`justify-content:center` an overflowing flex item spills equally in BOTH directions and its TOP is
unreachable however you scroll, so shrink-to-fit alone would have traded a clipped bottom for a
lost top. `safe` falls back to flex-start exactly when the content overflows and not before. Both
are declared in the rule on purpose, so a browser that does not know `safe` drops that one
declaration and keeps plain centring, which is today's behaviour, rather than losing the centring.
Measured after, against the SHIPPED rules pulled out of the file rather than a copy of them
(`scratchpad/capfit.cjs`, 17 assertions, and it drives the before and after side by side): the
card holds 650px at every height, nothing is cut, and both ends stay reachable with the
container's own 40px padding intact at each. Tall windows are untouched, still centred with no
scrollbar. Confirmed IN ENGINE at a 660px window too (`scratchpad/about_panel.cjs`).

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

- **`http://127.0.0.1` IS REFUSED BY THE VITE DEV SERVER, `localhost` is not.** Several
  of the verification scripts default to a 127.0.0.1 URL and a run against one comes back
  with every DOM assertion failing and `found:false`, which looks exactly like the change
  under test having broken the page. The tell is `document.body.innerText` reading "This
  site can't be reached". Pass the localhost form explicitly.

- **POLLING AN ANIMATION OVER CDP STARVES IT, and the result looks exactly like a bug.**
  Sampling a framer-motion animation with a loop of `Runtime.evaluate` calls froze the
  work modal's ghost at opacity 0.61 for 30 consecutive samples, and it completed the
  instant the loop stopped. Record the frames IN THE PAGE with a `requestAnimationFrame`
  collector and read the array once at the end. Note headless SwiftShader runs this site
  at 6 to 8 fps, so such a recording is coarse: assert the FIRST and LAST frames and the
  shape between them, never the sample count.
- **Stacked layers composite as `1-(1-a)(1-b)`, not `max(a,b)`.** A crossfade metric
  written with `max` reported the work modal's worst coverage as 0.58 when it was 0.61,
  and would have hidden a real gap of the same size.

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
- **Mobile gets no render pipeline** (the HDR buffers alone are ~130MB at 2x dpr) and has not been
  tested on a device. Frame cost is ~20-22M tris, dominated by `tree.glb` at 79k tris each; that is
  where any further budget lives.
- **Debug hooks** (§5) are still in the shipped file. Reviewed 2026-09-08 and deliberately kept:
  they are ~60 `window.__*` handles, several read by other shipped code (`__hero` reads `roofY`)
  and most of the verification scripts this file cites drive them. Stripping them is a real edit to
  a 582KB live file, so it wants its own pass, not a cleanup sweep.
- **`public/studio.html` and `public/studio_classic.html` are still deployed and still unlinked**
  (193KB of HTML, plus `character.glb` at 2.1MB which ONLY they load). Nothing on the site points
  at either. They are the two older generations of the 3D space and were kept on purpose, so they
  were left alone in the 2026-09-08 cleanup; deleting all three files is a 2.3MB saving whenever
  Shyon decides the old generations are no longer wanted.
- **Tailwind emits nothing but its preflight.** All 87 `className` tokens in `src/App.tsx` are
  `ss-*`; there is not one utility class anywhere in the app. So `@tailwind components` and
  `@tailwind utilities` in `src/index.css` contribute zero bytes, `tailwind.config.js`s
  `scale` and `fontFamily` extensions generate utilities nobody uses, and the whole toolchain
  is being carried for `@tailwind base`, the reset. Dropping it is a real change (preflight sets
  `img{display:block}` among others and the approved look may rest on it), so it was flagged
  rather than done.
- **`@types/react` and `@types/react-dom` are v19 against React 18.** It typechecks clean today,
  so nothing was touched, but the types describe a different React than the one that ships.
- **`.git` is 459MB** against a 124MB `public` and a 140MB `docs`. Every build rewrites `docs`
  and the assets are committed twice, once as source and once as output, so the history carries
  many copies of the same multi-megabyte binaries. `git gc --aggressive` reclaims some without
  touching history; anything more is a rewrite and needs asking.
- **`scratchpad/` output is gitignored now, its scripts are not.** 250MB of renders, screenshots,
  voxel caches and audio dumps were deleted 2026-09-08 and the patterns that produce them added to
  `.gitignore`; all 190 `.cjs` / `.py` scripts and the five `*_raw.glb` pre-edit backups stayed.
  The directory went 260MB to 9MB. Note gitignore does NOT untrack, so the 39 tracked scripts are
  unaffected.
- The Realm's og:image still points at `story_world_midday.jpg`, which is why that file stays on
  disk although the storyboard no longer uses it.
