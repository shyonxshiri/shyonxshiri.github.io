# CLAUDE.md — Project Handoff & Context

> Authoritative context document for Claude Code sessions working on Shyon Shiri's
> portfolio. Written by verifying the actual repository (not just memory). Read this
> first, then inspect the files it points to before making changes.
>
> **This file is documentation only. It does not change site behavior.**

---

## 1. Project Overview

- **What it is:** The personal portfolio of **Shyon Shiri** — a designer & maker. Live at **https://www.shyonshiri.com** (also the GitHub Pages URL for repo `shyonxshiri/shyonxshiri.github.io`).
- **Purpose / audience:** Show a multidisciplinary body of work (3D design, motion graphics, UI/UX, fabrication, cinematography, code, a clothing brand) to recruiters, clients, and collaborators.
- **Two distinct parts:**
  1. **The main site** — a React single-page app (`src/App.tsx`) with Home / Work / About / Contact.
  2. **"My Space"** — a standalone, immersive 3D experience (vanilla Three.js in a static HTML file). There are two generations of this:
     - `public/studio.html` — the **older** 3D space (rigged "Soldier" character, mini-GTA style). **This is what the live homepage button currently opens.**
     - `public/lego.html` — the **new** LEGO brick-build "My Space" (the current active focus). **Not yet linked from the homepage and not yet committed to git.**
- **Design direction / visual identity:** Dark, minimal, editorial/Apple-like. Custom cursor, restrained motion, a custom display font (KiwiSoda) for headings. The 3D space aims for a moody, tactile LEGO world built from the user's own (non-copyright) Blender/Mecabricks assets.

---

## 2. Current Architecture

**Stack:** React 18 + TypeScript + Vite 7, Tailwind CSS 3, `framer-motion`, `lucide-react`. The 3D experiences are **vanilla Three.js r128** (loaded from CDN) inside standalone HTML files — they are NOT React.

**Key files & folders:**
- `src/App.tsx` — **the entire main site** (~1,793 lines, single file). No React Router; page switching is state-based (`useState<Page>`). Global CSS is a big injected string (`GLOBAL_CSS`) plus Tailwind.
- `src/main.tsx`, `src/index.css`, `src/App.css` — entry + base styles.
- `src/assetPreloader.ts`, `src/useAssetPreloader.ts` — asset preloading logic.
- `index.html` — Vite entry; contains SEO/OpenGraph meta, font preconnect, favicon.
- `public/` — static assets served at site root:
  - `lego.html` — new 3D "My Space" (LEGO). **Untracked.**
  - `studio.html` — older 3D space (linked from homepage). Modified/uncommitted.
  - `studio_classic.html` — an even older backup. Untracked.
  - `assets/` — ~53 media files (images, mp4s) for the site **plus** the `.glb` 3D models for `lego.html`. Many `.glb` files are **untracked**.
  - `fonts/KiwiSoda.ttf`, `favicon.svg`, `My Resume.pdf`, `CNAME`.
- `docs/` — **the build output that GitHub Pages serves** (see §8). Committed. Currently contains a build that includes `studio.html` but **not** `lego.html`.
- `vite.config.ts` — `outDir: "docs"`, manual vendor chunk, no-cache dev headers.
- `tailwind.config.js` — adds `KiwiSoda` heading font family + custom `scale` utilities.
- Root `*.md` / `*.txt` (COMPLETION_SUMMARY, TOUCH_IMPROVEMENTS_*, DEPLOYMENT_CHECKLIST, etc.) — **historical** auto-generated docs from early 2026 work. Informative but may be stale; **this CLAUDE.md supersedes them for current context.**

**Main-site structure (components in `src/App.tsx`):**
- `PROJECTS` (data array, line ~39) — the three Work categories and every media item.
- `PAGE_ORDER = ["home","work","about","contact"]`.
- `Cursor` — custom cursor (mix-blend-mode difference so it's visible on any background).
- `NavLink`, `HomePage`, `WorkParticles` (canvas particle background behind the Work page), `WorkPage` (with `WORK_BG_THEME` per category), `AboutPage`, `ContactPage`.
- `WorkModal` (per-project gallery, flex-column masonry), `StudioAssetCard`, `ModalTile`, `MediaViewer` (full-screen image/video viewer).

---

## 3. Design System

- **Typography:** Headings use **KiwiSoda** (local `public/fonts/KiwiSoda.ttf`, wired via Tailwind `font-heading`). Body uses system/sans stacks. The 3D space uses Google Fonts **Bebas Neue** + **Space Mono**.
- **Colors:** Dark theme; `theme-color` `#060606`. The 3D space uses a night-blue base and per-time-of-day palettes.
- **Work-page theming:** `WORK_BG_THEME` maps each category to a base/emit color for the particle background and adaptive text color:
  - Creative → green on dark, Professional → grey on white, NABU → blue on dark.
- **Cursor:** custom, `mix-blend-mode: difference`.
- **Motion:** `framer-motion` for page/element transitions; the Work carousel is a coverflow. Keep motion subtle.
- **Responsive:** `isMobile` checks drive layout/copy differences (e.g., the homepage hides the "step into My Space" line on mobile). Lots of prior work on mobile touch targets (see historical TOUCH_* docs).
- **Recurring rules:** no em dashes in any copy (see §5/§10); the 3D space is always called **"My Space"**.

---

## 4. Pages and Sections

**Main site (all complete and live):**
- **Home** — intro headline + description + nav buttons; a button **"Enter My Space →"** that currently links to `/studio.html` (line ~893 in App.tsx).
- **Work** — the core. Three categories from `PROJECTS`: **Creative Projects**, **Professional Services**, **NABU**. Presented as a coverflow carousel of cover cards; clicking a card opens `WorkModal` (a masonry gallery of that project's `media[]`); clicking an item opens `MediaViewer`. `hidden: true` items are gallery-only extras surfaced via `relatedItems`.
- **About** — bio page.
- **Contact** — contact links.

**3D "My Space" — `public/lego.html` (active WIP, NOT yet linked/committed):**
- A walkable LEGO world built from the user's real Blender assets (see §6). Loads: `coffee_shop.glb`, `figure.glb` (player), `hair.glb`, `flowers.glb`, `ground_small.glb`, `lamppost.glb`, `modern_house.glb`, `ruins.glb`, `tree.glb`.
- **Portals** map buildings → site categories: **coffee shop → Professional Services**, **ruins → Creative Projects**, **modern house → About**. Entering a building glides 3rd→1st person, snapshots + blurs the real interior as a backdrop, and floats LEGO-framed project panels (`PORTALS` object).
- `public/studio.html` — older generation, still the live one. Keep working unless told to switch the homepage to `lego.html`.

---

## 5. Important Decisions

**Naming / copy**
- The 3D space is **always** "My Space" (never "the studio" / "3D space") in user-facing text.
- **Never use em dashes** in copy. Use periods/commas. (Durable, repeatedly reinforced.)

**LEGO world (lego.html)**
- Built to look like an original LEGO build using the user's own Blender/Mecabricks assets — **no copyrighted characters or proprietary designs** in the final public build (a Central Perk sign and stray customer/mannequin figures have been flagged for removal for this reason).
- **Everything snaps to the LEGO stud grid** (`PITCH = 0.36945`); pieces "pop into place." This is a hard rule for all structures/props.
- **Once a look is approved it should be locked** so later drastic changes don't alter it.
- Collision is **per-geometry, not bounding-box**: only the actual bricks/walls are solid; you can walk open patios and right up to walls/doors (occupancy grid sampled at body height + a ruins heightmap for stair-climbing).
- Movement is deliberately **stiff, minifig-style** (walk/run/jump), not "crazy."

**Rejected / superseded approaches**
- Procedural stick-figure and primitive-only characters were abandoned in favor of real rigged/imported `.glb` models.
- The green "pedestal room" gallery interior was replaced by the first-person blurred-interior + framed-panels showcase.
- The big 4×8 ground plate (`ground_tile.glb`) was replaced by fine 2×2 tiling (`ground_small.glb`) for precise borders/paths.
- A "free mouse-look" (move mouse without dragging) was tried and reverted back to **drag-to-look** (higher sensitivity) at the user's request.

**Things to preserve / not redesign**
- The completed main-site sections (Home/Work/About/Contact) — targeted changes only.
- Approved 3D elements (figure scale/socket rig, ground plate + stud pitch, lighting/day cycle, shop/house scale & placement, control panel).

---

## 6. Current Functionality

**Main site:** custom cursor; Work-page canvas particle background; coverflow carousel; project modals with masonry galleries; full-screen media viewer (images + video); framer-motion transitions; responsive/mobile touch handling.

**3D My Space (`lego.html`):**
- Opens with a **control panel overlay** ("MY SPACE · Controls", Enter button) shown first.
- Walk (WASD/arrows), run (Shift), jump (Space), **drag to look** (mouse/touch).
- **Rotating day cycle**: a continuous 7-minute loop (`CYCLE_SECS=420`, phase `dayT`, random phase on load) smoothstep-interpolates between the `TIMES` keyframes (morning/midday/evening/night), driving sky, fog, sun color/intensity, hemi/ambient, exposure, rim, sun offset, and lamp brightness every frame via `applyTOD()`. At full night the sun is intensity 0 and the rim is 0.10 so no stray specular pool shows on the ground (user-reported bug, fixed); lights fade in/out smoothly, never snap. Debug: `window.__D.time` gets/sets the phase (0.75 = full night).
- **Lampposts**: unlit in daylight, brighter as day recedes (point light + bulb color re-driven live by the cycle via `lampNodes`); 2×2 base; stud-snapped.
- **Solids/collision** via `rasterizeSolid` occupancy grid (buildings, trees, ruins). Camera auto-pulls-in when a **big building** blocks the view (small props like trees/flowers are ignored, via `camCell`).
- **Ruins stair-climbing** via `buildHeightmap` (player Y follows walkable surfaces; falls off edges).
- **Portals**: proximity prompt ("Press E · Enter …"), 3rd→1st transition, blurred interior snapshot backdrop, clickable LEGO-framed project panels, Esc to exit.
- Plastic footstep audio + a walk cycle (alternating legs + counter-swinging arms on hip/shoulder pivots).
- **Assets are exported from Blender** via the Blender MCP connector from `~/Desktop/My Lego World .blend`, then merged + Draco-compressed for the web.

---

## 7. Known Problems / Unfinished Work

- **`lego.html` is now the live My Space** — the homepage button (`src/App.tsx` ~line 893) opens `/lego.html`, and it's committed + deployed. Because it's live *and* still WIP, treat edits here as changes to the public site.
- **Legs + hair swap are DONE** (Bizarro Superboy hair + denim legs, walk-animated). No longer an issue.
- **Everything is committed/tracked now** (`lego.html`, the `.glb` assets, `CLAUDE.md`). It was all untracked before commit `696cac4`.
- **3D placements DONE (see section 11):** Porsche, skull, Tardis + blue crystal (NABU portal), all ruins flower petals removed, stairs-only climbing, figure legs/hair/brows polish, garage side strip removed. Exported: `porsche.glb`, `skull.glb`, `tardis.glb`, `crystal.glb`, re-exported `ruins.glb`, `hair.glb`, `figure.glb`. Not yet committed or deployed.
- **Empty/legacy blend objects:** `Lego ninjago - Techno Cole.` is an empty placeholder (no geometry). Roller coaster and a truck crane were deleted from the blend and the blend was saved.
- **`three.js` is loaded from CDN** (cdnjs r128 + unpkg GLTFLoader/DRACOLoader + gstatic Draco decoder) — an external network dependency for `lego.html`.
- **`.github/workflows/deploy.ml` is misnamed** (`.ml`, not `.yml`) so GitHub Actions does not run it, and it references `dist` (Vite outputs `docs`). Deployment actually happens via the `npm run deploy` script → `docs/` (see §8). Do not rely on the Actions workflow.
- The many root `*.md`/`*.txt` docs are historical; treat as background, not current truth.
- **Preview-pane caveat:** when verifying `lego.html` in a headless/hidden browser tab, `requestAnimationFrame` can pause and console buffers can show stale errors across reloads — verify with screenshots + fresh state, not buffered logs.

---

## 8. Development & Deployment

- **Run locally:** `npm install` then `npm run dev` (Vite dev server, default port **5173**). The 3D pages are at `http://localhost:5173/lego.html` and `/studio.html`.
- **Build:** `npm run build` → outputs to **`docs/`** (`vite.config.ts` `outDir: "docs"`). `public/*` is copied into `docs/` on build.
- **Deploy:** `npm run deploy` = `vite build && git add docs && git commit -m "Deploy update" && git push`. **GitHub Pages serves the `docs/` folder on `main`.**
- **Hosting/domain:** GitHub Pages, repo `shyonxshiri/shyonxshiri.github.io`, custom domain **www.shyonshiri.com** (`CNAME` in both root-copied locations).
- **External services:** Google Fonts + jsdelivr/cdnjs/unpkg/gstatic CDNs (for the 3D pages). No backend, no auth, no env vars, no secrets in the repo. (Do not add secrets to this file.)
- **Do not run interactive git rebase/`-i` flows.** Commit/push only when the user asks.

---

## 9. Git / Repository Information

- **Branch:** `main` (only branch). Remote `origin` → `github.com/shyonxshiri/shyonxshiri.github.io`.
- **Deploy branch = source branch:** `main` holds both source and the built `docs/`.
- **Major structural context:** the site began as a heavily-documented React build (the early-2026 `*.md` docs); recent work added the two 3D "My Space" experiences as standalone HTML in `public/`.
- **Before modifying the repo, understand:** a large amount of current work (all of `lego.html` + its `.glb` assets) is **untracked** and will be lost on a hard checkout/clean. Commit deliberately and only when asked.
- **Blender source (external to repo):** `~/Desktop/My Lego World .blend`, edited through the **Blender MCP connector**. `.glb` assets in `public/assets/` are exported from it (merged + Draco). Keep the connector connected when doing asset work.
- **Persistent memory:** durable preferences live in `~/.claude/projects/-Users-shyonshiri-Desktop-my-site/memory/` (no em dashes; "My Space" naming; stud-grid alignment; low-poly/LEGO rebuild notes). Honor them.

---

## 10. Rules for Future Claude Sessions

1. **Verify before you claim.** Read the actual file/code before describing or editing it; report failures honestly (don't say "done" if unverified).
2. **Targeted changes for targeted requests.** Don't refactor or redesign nearby/finished code that wasn't asked about.
3. **Check for existing implementations first** before writing a replacement; prefer editing over rewriting.
4. **Preserve existing functionality.** Especially the completed main-site sections and any approved 3D elements — don't regress them.
5. **No em dashes, ever, in copy.** Periods/commas instead.
6. **Call the 3D space "My Space."**
7. **Everything in the LEGO world snaps to the stud grid** (`PITCH = 0.36945`).
8. **Confirm before big/irreversible moves:** switching the homepage link to `lego.html`, deleting blend geometry, committing/pushing, or reshaping an approved look. Ask when a placement spec is ambiguous rather than guessing.
9. **Don't modify the website when the task is documentation/context only.**
10. **When approved, lock the look** (note it here and/or in memory) so future changes don't disturb it.
11. **Deploy only via `npm run deploy` (to `docs/`)** and only when asked; ignore the broken Actions workflow.

---

## 11. Current State (most recent)

Active work is on **`public/lego.html`** — the LEGO brick-build "My Space." The world currently has: a stud-matched fine 2×2 ground (green grass base + grey sidewalks/pads), a coffee shop (→ Professional Services), a modern house (→ About), a decorative ruins (→ Creative Projects, with a climbable-stairs heightmap), scattered stud-snapped trees (varied) and flowers, two day/night-reactive lampposts by the sidewalks (shop + mansion; the mid-path one by the run-down house was removed), a rotating 7-minute day/night cycle (random phase on load, smooth interpolation, sun fully off at night), a control-panel intro overlay, drag-to-look with camera auto-pull-in, per-geometry collision, and the first-person blurred-interior project-panel portals.

**Just completed + DEPLOYED (commit `696cac4`, pushed to `main`, live):**
- Player figure finished: **Bizarro Superboy hair + denim legs** swapped in. The legs are bound to the `hipL`/`hipR` hip pivots so the walk animation swings them (verified). `legs.glb` is in use.
- **Homepage "Enter My Space" now opens `/lego.html`** (switched from `/studio.html`). The new LEGO world is the live My Space.
- `lego.html`, all `.glb` assets, and this `CLAUDE.md` are now **committed and tracked** (they were untracked before). `docs/` was rebuilt and pushed.

**Prop placements + big polish pass DONE (committed + deployed in 0dcf428):**
1. **Porsche 912** (`porsche.glb`, targetLen 4.5) on the driveway at (22, 4.7), nose out (-x), in front of the existing orange car. A `loadProp()` helper in lego.html loads all new props (stud-snapped holders, recenter, target-size).
2. **Skull** (`skull.glb`) left of the ruins doorway at (-2.7, 5.1), rotY PI so the face points out, targetH 0.46 = exactly the figure's head height, base sunk 0.03 (stamped).
3. **Tardis** (`tardis.glb`, targetH 1.9) stamped into the ruins balcony at (2.4, y 3.02, 5.2) with the **rock crystal** (`crystal.glb`) on top, recolored deep blue + emissive, slow idle spin. The Tardis renders white/colorless (its source materials carry no base color); user approved the look.
4. **Ruins re-exported** (`ruins.glb`, via round-trip import of the glb into Blender, NOT from the raw blend objects, which do not match the shipped derivative): ALL colored flower petals removed (red, purple, pink); green stems/vines kept per user choice. The two red balcony flower plants (petals AND stems) fully removed where the Tardis now stands.
5. **NABU portal**: the blue crystal is the NABU portal (4th portal). PORTALS entries now carry door.y; portalAt() y-gates so portals only trigger on their own floor; exitPortal() honors exit.y (NABU exits onto the balcony).
6. **Stairs-only climbing**: MAXSTEP 1.55 now applies only inside STAIR_ZONES (the ruins' two real staircases, ground->balcony winding run at x -2..0.6, z 9.2..12.9 and balcony->top at z 13.7..15.8); elsewhere LOWSTEP 0.35 (under one brick 0.44) so rubble/walls can't be walked up. Deliberate jumps can still mount single bricks.
7. **Figure**: the denim legs are now fitted by MEASUREMENT, not constants: the legs loader measures the old Jesse pants' bounds (legs + hip block, spanning y 0..0.84 with feet on the ground) before hiding them, then scales and seats the denim into exactly that box. Same size and function as the old pants, only the look changed. Still hip-bound and walk-animated (WAIST_CUT at 66% of the pants height keeps the waist band on the body). **Outfit recolored (user spec):** pants KEEP their blue denim but the printed chains are silver instead of gold and the belt is black with a silver buckle (pixel-edited the legs.glb baseColor textures in Blender: gold->silver, red-brown->black, denim untouched; rebuilt from the git HEAD legs.glb after an earlier all-black pass was reverted); jacket grey and shirt white (material copies SOLID-GREY-JACKET on torso+arms, SOLID-WHITE-SHIRT on sym_59, so the face decal's shared black is untouched); skin slightly more tan, #E8C99F via a SOLID-TAN-SKIN copy on both hands + head only; the face print (eyes + mouth, sym_11.002) got a SOLID-BLACK-FACE copy in true black because the original shared "black" was blue-tinted; hair darkened to #2E1B10. `hair.glb` re-exported smooth-shaded (split normals cleared) and dark brown #4A2E1D; the color override in lego.html removed. `figure.glb` re-exported with dark brown eyebrows (#3A2418, new material on sym_88); rig node names verified intact.
8. **Ground**: the grey pad strip along the garage's west side removed (mansion pad now starts x>21.7; a driveway lane x 16.5..21.7, z 3.3..6.2 keeps the Porsche's lane connected to the walk).
9. **Run-down house placed** (`rundown_house.glb`, exported from the blend's "run-down LEGO house", 602 meshes joined + Draco, native 0.369 pitch so no rescale): sits directly on the north grass (NO grey pad, per user) at holder snap(10.3), y -0.15, snap(-12.93), rotY -PI/2 so the front door faces the walk. Pushed all the way back: back face z -17.39 vs plate rim -17.73, the closest stud-snapped spot with nothing hanging off the plate (one more stud would overhang 0.03). The two trees that stood there ([6.5,-14.5] and [13.5,-14.8]) and the [13,-13] flower pair were removed; treeOK() now excludes the house zone. Only a 6-stud grey path x 9.2..11.5, z -8.6..-2.4 branches off the walk and tucks under the front wall at the door. Collision via rasterizeSolid into new `rdhCells`, included in camCell() so the camera pulls in behind it. Verified: door on the path, walls block the player, nothing crosses the rim (checked with a grazing view), no console errors. NOT committed or deployed.

**Ruins column trim (committed + deployed in 0dcf428):** the 4 secondary support columns (the ones sitting one module inward from each corner column, at local x ±3.2) were removed from `ruins.glb` via the usual glb round-trip in Blender (islands fully inside each column footprint deleted, plus the green vine bits that wrapped only those columns and would have floated). The 4 corner columns, all doorway/arch vines, and the vines hanging from the balcony rims are untouched. Verified in-game (dev server): only corner columns remain, collision re-rasterizes automatically, no console errors. Pre-edit glb backed up in the session scratchpad as `ruins_backup_8cols.glb`.

**Balcony plant removed (committed + deployed in 0dcf428):** the leftover LEGO plant (green pot + tall grass-blade tufts) on the ruins balcony ledge corner next to the Tardis/crystal was removed from `ruins.glb`. Note: another concurrent session had re-exported `ruins.glb` (leaf/vine reduction pass, file went to 1.44MB), so this edit was made on a FRESH re-import of the current glb, not a stale copy; the column removal survived inside it. The chunky corner vine branches below the ledge and all doorway vines are untouched. Each grass blade is a single long triangle, so it was removed by face-center zone (corner box above ledge top z 3.42), not island containment. Verified in-game: ledge corner clean, no console errors. Pre-edit backup: `ruins_backup_before_plant_removal.glb` in the session scratchpad. WARNING: two sessions were editing `ruins.glb` this evening; always re-import the current file before exporting.

**Doorway teleport, lamppost, crystal glow (committed + deployed in 0dcf428):** the ruins doorway teleporter no longer fades to black, it instantly moves the figure and snaps the camera (doTeleport in lego.html; the #fade element/CSS remain but nothing uses them now). The mid-path lamppost by the run-down house was removed from the lamppost spots list (shop + mansion lamps remain, still day/night reactive). The NABU crystal glow was strengthened: emissive 0x1e50ff at intensity 1.1 (kept below white-clip so it stays blue at night) plus a new electric blue PointLight (0x3b82f6, 2.2, dist 8) at mid-crystal height inside the crystal holder. All verified in-game at midday and night, no console errors.

**Pirate chest + money bricks (committed + deployed in 0dcf428):** exported `pirate_chest.glb` (chest body + coin pile, lid open) and `money_brick.glb` from the blend (temp joined duplicates, blend untouched/unsaved) and placed the chest behind the run-down house via loadProp at pos [9.6,-15.03], y -0.03 (stamped), rotY PI, native scale (~4.5 studs wide). The house's REAR WALL PLANE is at z -14.57 for x 8.6..10.35 (measured by raycast; the -17.39 bbox rear is the dead tree/rubble, and east of x~10.9 the rear facade is broken/protruding), so the chest snaps to z -15.147 with its open lid leaning against the bricks. Two money bricks at NATIVE blend size (0.51 x 0.25 x 0.10) hang inside the chest holder, deliberately tilted and crossed on each other on the coin pile (rotations on all 3 axes, NOT stud-snapped, per user spec); loader recenters the slab so rotations pivot through its center, second brick is a clone(true). Debug handle: `window.__money`. Verified at midday from front/side: lid against wall, no clipping, money visible in the open chest, no console errors.

**Still open:**
- ~~Real project media/content in the portal panels~~ DONE (see the "Real portal content" pass below).
- lego.html still has the temporary debug hooks (`window.__D`, `window.__FC` free-cam, `window.__props`) used for placement tuning; strip before a final deploy if desired.
- The scattered `flowers.glb` garden pairs around the map are separate from the ruins set. The [8,3] pair beside the ruins was touching the sidewalk edge and has been moved back onto the grass at [8.2,1.8] (see the greenery pass below).
- The .blend was NOT saved this session (all exports done from in-memory edits or glb round-trips; an undo in Blender mid-session rolled back some in-memory edits, so treat the blend on disk as the original).

**Greenery pass (committed + deployed in 0dcf428):** 3 new trees added to empty grass (SE corner [24.3,15.3], south-central [2.6,-11.5], and the grass pocket between the walk and the run-down house lawn [15.6,-5.4]) via the existing `cand` list, so `treeOK()` still validates zones/spacing and they get the usual trunk collision. Flowers reworked: the pair at [8,3] beside the ruins was clipping the sidewalk edge and moved back to [8.2,1.8] fully on grass; 5 new scattered clusters added with count/facing/size variation ([2,-6.5], [12.4,2.0], [-12,6.2], [20.3,10.2], [25.8,-9.8]). ALL flower clusters (old pairs + new) are now solid via a new `solidifyDisc()` helper: a small disc proportionate to each cluster's own footprint (r clamped 0.18..0.45), added ONLY to `solidCells`, never to the building cell sets, so `camCell()`/camera behavior is completely untouched. Verified top-down in the dev server: nothing overlaps or hovers over any grey sidewalk/pad, everything on open grass with margins, no console errors; `__D.blocked()` (a temporary debug accessor added to the existing `window.__D` block, strip with the rest) confirms every cluster center and new trunk is solid while the surrounding grass/walk stays open. `.claude/launch.json` gained a `dev-verify` config (port 5209) because other sessions held 5173/5199.

**Real portal content (committed + deployed in 0dcf428):** all four portals now show the real site projects instead of placeholder tiles. The CREATIVE/PROFESSIONAL/ABOUT/NABU arrays in lego.html mirror the non-hidden items of `PROJECTS` in src/App.tsx (title, cover/poster `img`, `video` src where applicable, year, desc, and `links` for minasech.net, everlycarehome.com, the Resume PDF, and Contact email/LinkedIn). Panels get their cover image texture LAZILY on the first E-press at each structure (`texPanels()`, cover-fit crop onto the 2.01x2.56 plane); imageless panels (Resume, Contact) show their title on the colored tile. The click viewer now shows the real media: `<video controls autoplay>` for videos (paused + unloaded on close), `<img>` for images, plus title · year, description, and link buttons in the caption (new `#viewer .cap .d` / `a` CSS). Because Creative has 12 items, the menu is now a browsable carousel: drag, scroll wheel, or arrow keys pan the row (`menuPan`/`clampPan`, per-portal `panMax`, only active when >4 items); panels arc around the current pan position; a drag release is not counted as a panel click (`mMoved` guard). Also fixed a real pre-existing bug found while verifying: `menuCam.aspect` was set once at load and never on resize, so a window resized (or loaded hidden, aspect NaN) rendered an empty menu; the resize handler now updates menuCam too and enterPortal refreshes it. Verified in the dev server: all four menus render their real covers (Professional 6, Creative 12 + browse to both ends, About photo/Resume/Contact, NABU 5), image viewer (Luning flyer), video viewer (Broken NPC plays), Contact links present, no console errors. Note for headless verification: the hidden preview pane throttles rAF AND setTimeout (~1s), so portal glides take ~25s real time there; a paced MessageChannel rAF shim was used in-page for testing only (an UNpaced shim floods the GPU and loses the WebGL context). Nothing of the shim is in the source.

**Endless-land rim (committed + deployed in 0dcf428):** the plate no longer ends in a visible drop-to-void. In the ground loader: (1) an APRON of 16 extra rings of the same instanced green 2x2 tiles continues past the old rim on all sides (studs stay continuous where the player can see them up close); (2) a 360x360 `farLand` plane sits at y -0.02 under/past the tiles, sharing `matGreen`'s Color INSTANCE (so the mansion grass sync recolors it too), reaching well beyond the fog's full-opacity distance (fog 18..46) from anywhere standable. Result: from every rim/corner and from the ruins top, at all times of day, the horizon is solid ground fading into fog; no edge, seam, or void is visible. Player bounds (BX0/BX1/BZ) unchanged, so the walkable area is exactly as before; camera code untouched. Cost: ~4.7k extra tile instances (~1.6M tris) in the same single instanced draw call. Verified via dev server screenshots at midday/evening/night from south rim, SE corner diagonal, elevated ruins-top view, and the real third-person camera; no console errors.

Note: since `lego.html` is now the public My Space and is still WIP, be mindful that changes here affect the live site — deploy (`npm run deploy` or build+commit+push `docs/`) only when the user asks.
