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
- **3D placements DONE (see section 11):** Porsche, skull, Tardis + blue crystal (NABU portal), all ruins flower petals removed, stairs-only climbing, figure legs/hair/brows polish, garage side strip removed. Exported: `porsche.glb`, `skull.glb`, `tardis.glb`, `crystal.glb`, re-exported `ruins.glb`, `hair.glb`, `figure.glb`. Committed + deployed in 3b9f302.
- **Empty/legacy blend objects:** `Lego ninjago - Techno Cole.` is an empty placeholder (no geometry). Roller coaster and a truck crane were deleted from the blend and the blend was saved.
- ~~`three.js` is loaded from CDN~~ FIXED 2026-08-26: three.min.js r128, GLTFLoader, DRACOLoader, and the Draco decoders are now vendored in `public/vendor/` and both `lego.html` and `studio.html` load them locally. No CDN dependency remains for the 3D pages (Google Fonts is still external).
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
9. **Run-down house placed** (`rundown_house.glb`, exported from the blend's "run-down LEGO house", 602 meshes joined + Draco, native 0.369 pitch so no rescale): sits directly on the north grass (NO grey pad, per user) at holder snap(10.3), y -0.15, snap(-12.93), rotY -PI/2 so the front door faces the walk. Pushed all the way back: back face z -17.39 vs plate rim -17.73, the closest stud-snapped spot with nothing hanging off the plate (one more stud would overhang 0.03). The two trees that stood there ([6.5,-14.5] and [13.5,-14.8]) and the [13,-13] flower pair were removed; treeOK() now excludes the house zone. Only a 6-stud grey path x 9.2..11.5, z -8.6..-2.4 branches off the walk and tucks under the front wall at the door. Collision via rasterizeSolid into new `rdhCells`, included in camCell() so the camera pulls in behind it. Verified: door on the path, walls block the player, nothing crosses the rim (checked with a grazing view), no console errors. Committed + deployed in 3b9f302.

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

**Homepage storyboard pass (2026-08-25, committed + deployed in 15dbfe8):** the homepage now scrolls. The naming is now **"Lego Realm"** (user says "My Lego Realm"; renamed from "My Space", see memory). Changes, all in `src/App.tsx` plus new assets:
- **Home is the ONLY scrollable page**: `HomePage` is a `.ss-home-scroll` container (overflow-y auto, hidden scrollbar); the hero is a 100dvh section and below it lives a storyboard telling the Lego Realm's story (what it is / why / how it was made) in 14 numbered "FR" frames with head strips + captions (`StoryFrame`, `StoryChapter` components; CSS `.ss-frame*`, `.ss-story-*` in GLOBAL_CSS).
- **Page-flip navigation is disabled on home** (wheel, touch, and arrow-key handlers all early-return when `page === "home"`), so scrolling browses the storyboard; other pages keep wheel/touch/key page navigation. Nav links and dots still switch pages from home.
- A **scroll cue** ("THE MAKING OF THE REALM" + bouncing chevron, `.ss-story-cue`) sits bottom-center of the hero and smooth-scrolls into the storyboard; a closing CTA at the end repeats the Enter My Lego Realm button (desktop) and a browse-the-work link.
- **Assets**: 14 curated stills in `public/assets/story/` (~6.8MB total, lazy-loaded): 7 in-engine 4K canvas exports from lego.html (midday overview, shop evening, lamp night, NABU crystal night, figure front/back, sunset wide) and 7 staged Blender screenshots (hair in edit mode, shop wireframe, mid-assembly figure, ruins, both houses, prop bench). Originals (PNG, 4K/retina) are in the session scratchpad. The Blender shop shots have the Central Perk sign hidden (copyright, matches the shipped glb whose sign frame is empty).
- Capture technique, for repeats: in-engine shots via `window.__FC` free-cam + `__D.time` + temporarily widened fog for wides, exported with `renderer.render` + `canvas.toDataURL` POSTed to a throwaway local file server; Blender shots staged via local view + hidden empties, screenshotted with `bpy.ops.screen.screenshot` (window screenshots via the MCP image transport were failing). Blender scene state was fully restored, blend NOT saved.
- `.claude/launch.json` gained a `dev-story` config (port 5223).
- Pre-existing, unrelated: `src/assetPreloader.ts:149` has a TS error under `tsc --noEmit`; Vite builds fine.

**LEGO rat by the ruins doorway (2026-08-25, committed + deployed in 15dbfe8):** the user added a "rat lego" mesh to the blend; exported it at NATIVE size (about 4.3 studs nose to tail, per user "the size i currently have is correct") to `public/assets/rat.glb` (single mesh, Draco, 25KB, selection-only export, blend untouched/unsaved). Placed via loadProp at pos [0.95,5.1], y -0.03 (stamped like the skull), rotY PI/2 so it lies ALONG the front wall on the right side of the ground doorway, mirroring the skull's spot on the left (doorway spans x -2.1..-0.2; rat spans x 0.32..1.89, tail toward the door, same clearance class as the skull's 0.37 gap). Not solid, like the skull. Verified in the dev server (dev-verify, port 5209): sits flat on the studs against the wall, no clipping, skull and rat flank the doorway symmetrically, no console errors. The small cream blob visible through the doorway is pre-existing ruins rubble, not the rat.

**Rat moved to the ruins' left side wall (2026-08-25, committed + deployed in 3b9f302):** the rat no longer flanks the front doorway. It now sits along the ruins' LEFT side wall when facing the ruin (the east flank, wall face x 1.62, which runs toward the back): loadProp pos [1.85,8.1], y -0.03, rotY PI, so the nose points south toward the sidewalk and the tail points toward the back of the ruin. Placement measured by raycast (side wall face x 1.62 spans z 6.5..12.5; rat flank 0.01 off the wall, footprint z 7.34..8.91, clear of the front corner column and on the flat grey pad). The skull is unchanged on the left of the doorway. Verified in the dev server (new `dev-rat` launch config, port 5241, added because 5209 was held by another session): seated on the studs, tail to the back, no clipping, no console errors.

**Cafe rooftop sign frame removed (2026-08-25, committed + deployed in 54c8583):** the empty white sign frame on top of the coffee shop (the leftover mount after the Central Perk sign was removed for copyright) is gone from `coffee_shop.glb`, including its flat white base rail on the roof (same footprint, world x -11.0..-7.86, z -12.28..-11.91). Removed via the usual glb round-trip in Blender (two passes: frame islands seeded above the roof studs, then the base plates; select_linked containment verified tight bboxes before each delete; temp import object removed after, blend untouched/unsaved). Shop bbox top is now the roofline (world y 3.47, was 4.96); shop recentering/placement and collision unaffected. Verified in the dev server (dev-verify, port 5209) from above and at player eye level, no console errors. Pre-edit backup: `coffee_shop_backup_with_frame.glb` in the session scratchpad.

**Site improvements pass (2026-08-26, committed + deployed in 3b9f302):**
1. **Media compression**: the 5 heavy Work-page videos re-encoded to web H.264 (crf 23, faststart, aac 128k): NABU_SALE_AD 52→12.7MB, NABU_PUFFER_AD 41→6.8MB (both were HEVC, which Firefox cannot play, now fixed), New_LED_Box 33→10.2MB and New_Radar_Sensor 18→4.6MB (4K→1080 portrait, 30fps), Nabu_Poster_Banner 8.6→1.1MB. All 27 images >800KB downscaled to max 2560px and recompressed (JPEG q80; PNGs resized only, kept when the resize did not shrink them). A few "jpg" files were internally PNG/HEIC and are now true JPEGs. `public/assets` went 268MB→110MB. Filenames unchanged, no code edits needed. Originals backed up in the session scratchpad `media_originals/` and recoverable from git. Broken_NPC.MP4 and Blender_Case_Video.mp4 left alone (already efficient). Verified: all recompressed files decode in-browser with correct dimensions/durations.
2. **Mobile touch controls in lego.html**: coarse-pointer devices (body.touch, gated by `IS_TOUCH`) get a virtual analog joystick (bottom-left, run at >0.86 deflection), a JUMP button (bottom-right), a contextual ENTER pill (appears near portals, calls enterPortal), and a BACK pill (menu mode, calls exitPortal/closeViewer). The keyboard hint bar is hidden on touch and the controls card rows swap to touch instructions; prompt strings drop the "Press E"/"Esc" phrasing on touch. Canvas look-drag now tracks its touch identifier so the joystick finger cannot steal the camera; joystick feeds ix/iz analog in frame(). Verified via `__D.step()` frame pumping in the dev server (walk 13.1u/3s, jump 0.53, ENTER→menu→BACK cycle, zero console errors).
3. **Vendored three.js** (see §7): `public/vendor/` (three.min.js 603KB, GLTFLoader, DRACOLoader, draco/ decoders ~1MB); lego.html + studio.html point at /vendor/. Both verified loading locally.
4. **lego.html loader progress bar**: yellow bar + percent under BUILDING…, driven by `THREE.DefaultLoadingManager.onProgress` (item counts, monotonic display). Plus real head metadata: title "My Lego Realm · Shyon Shiri", meta description, OpenGraph tags (og:image = story_world_midday.jpg), favicon.
5. **Code health**: fixed the pre-existing TS error in src/assetPreloader.ts:149 (instanceof HTMLVideoElement narrowing); `tsc --noEmit` is now clean. Added a prefers-reduced-motion block to GLOBAL_CSS in App.tsx. New debug hook `__D.step(dt)` (manual frame pump for headless verification, strip with the rest of `__D`).
6. NOT done (needs user input): portal discoverability markers (would change the approved look) and any PNG→JPEG conversions that would rename files.

**50 more flowers (2026-08-26, committed + deployed in 3b9f302):** 50 new flower plants in 23 clusters added to lego.html via a new `more` array right after the existing `extra` array (same plant()/solidifyDisc path, [x,z,count,scale] entries, counts sum exactly 50). Spots were generated offline (seeded jittered grid, script in the session scratchpad as gen_flowers.js) against replicas of the page's own onPad/onWalk math plus the building/tree/lamp/old-flower exclusion zones, then verified IN-PAGE by raycasting every planted member (center + 4 petal-radius offsets) down onto the ground InstancedMeshes and checking the hit material is `__matGreen`: 50 planted, 0 grey hits. One generated spot ([18.8,5.5]) intersected the Porsche's real bbox (its nose reaches x 17.89, outside the mansion exclusion rect) and was moved to [18.5,7.6]; re-verified with a bbox+0.5 margin check. No console errors. New `dev-flowers` launch config (port 5277; 5209/5241/5261 were held by other sessions). Lesson: the mansion exclusion rect does NOT cover the Porsche; check `window.__props.porsche`'s bbox for placements near x 17.9..23.5, z 3.3..5.6.

**Border tree line (2026-08-26, committed + deployed in 3b9f302):** the user found the borders/corners of the grass too empty, so 39 new trees were appended to the `cand` list in lego.html: a ring along the plate rim plus a band just past it on the walkable apron (the apron tiles are real ground, player bounds reach them), corner pockets on both sides of each corner, and 5 inner-edge fill-ins ([17.9,16.9],[23.9,-16.6],[31.6,-16.6],[28.6,-8.9],[-11.6,7.9]). To let the tighter tree line plant, `treeOK`'s spacing constant was lowered 5.5 -> 3.5 (the original 16 candidates are processed first and are mutually >5.5 apart, so they are unaffected). Spots generated offline (gen_border_trees.js in the session scratchpad, same replica-math approach as the flowers) with: trunks >=1.2 clear of grey, >=1.6 from every flower cluster (old + the new 50), >=2.0 from lamps, >=4.0 from the original trees, >=3.6 pairwise, apron picks capped at 4.2 past the rim so they stay on solid apron tiles. Verified in the dev server (dev-flowers, port 5277): top-down shows every edge/corner treed, eye-level views from the lawn and corners read as a natural LEGO tree line, no console errors.

**Seamless horizon pass (2026-08-26, committed + deployed in 3b9f302):** the visible plate-edge cutoff (apron tiles ending in a step down to the bald farLand sheet, in plain view because the walk bounds sit on the apron and fog starts at 21) is fixed in lego.html with three changes. (1) `farLand` now sits FLUSH with the tiles' plate-top surface (measured at load by raycasting a probe tile, fallback -0.083; plane at plateTop-0.01 so no z-fighting) and carries a procedural 128px canvas stud BUMP map: one texture cell = one 2x2 tile (4 studs, 0.6-pitch diameter, faint tile-seam border), RepeatWrapping at 360/sx, max anisotropy, offset phase-locked to the real tile grid via a tile-center calculation, bumpScale 0.05. Mipmaps fade the studs naturally with distance; verified stud tops y 0, plate top ~-0.067, farLand -0.0773 (probed through a tile crack). (2) `APRON` 8→20 so real studded tiles cover ~11 units past the walk bounds; the handoff to the bump-mapped sheet is invisible from anywhere standable. Instances ~9.3k (+4k vs APRON=8, comparable to the old APRON=16 build). (3) Horizon scenery: 12 terraced hills (stacked shrinking CylinderGeometry tiers, 1.32 = 3 bricks per tier, flatShading, LegoGreen tinted 0.85..1.05, stud-snapped centers, every surface >=18 units from the walk bounds so they sit deep in the fog ramp) in a `HILLS` array right after farLand in the ground loader, plus 8 giant far trees (`FAR_TREES` in the tree loader, 1.7..2.1x scale clones, castShadow off, base sunk 0.12, no collision, unreachable). Verified in the dev server (new `dev-rim` launch config, port 5307) at midday/evening/night from south, west, north rims and the SE corner: no edge, ledge, or seam anywhere; hills and giant trees read as fogged silhouettes; no stray night specular; no console errors. Watch out: the border tree line sits ON the rim, so teleporting a camera to rim coordinates often lands inside a canopy.

**Closed-in fog + ruins-back flower band (2026-08-26, committed + deployed in 3b9f302):** per user request the fog is now Fog(0x0c1120, 15, 32) (was 21..42; first tuned to 13/28, then pushed slightly back to 15/32 on user request), so from mid-map the border tree line (~21+ away) is the last readable layer and nothing past it is visible (no far land, hills, or horizon; the distant hills/giant trees from the seamless-horizon pass now only ghost into view near the rim, accepted). A 9-cluster/22-plant flower band (`ruinsBack` array in the flowers loader, [x,z,count,scale]) fills the grass strip between the ruins pad (ends z 17.2) and the south border trees (z ~20.6..21.1), every center >=1.7 from the nearest trunk; all 9 verified planted by raycast and visually (purple clusters along the strip). Verified at fog 15/32 from spawn: ruins clear, the tree line a soft fading layer with only a hint of apron past the trunks, nothing beyond, no console errors. NEXT UP (user): petal color development and variation for the flowers.
(RESOLVED) A mid-flight state of the concurrent shine session rendered the whole scene black at load; its finished pass fixed that. Re-verified after their completion: page loads and renders correctly with the env active, fog 15/32, no console errors.

**Reflections + real glass pass (2026-08-26, committed + deployed in 3b9f302):** the user found the space bland, wanted every LEGO surface more reflective and the glass objects (NABU crystal, Porsche headlights/windshield, etc.) clear instead of faded. All in lego.html:
1. **Scene-wide environment map**: a 512x256 equirect canvas sky (gradient + hot sun blob + cool fill blob) PMREM-filtered and set as `scene.environment`. IMPORTANT: `PMREMGenerator.fromScene()` is BROKEN in the vendored three.min.js r128 (renders every material black, no console error); `fromEquirectangular()` works and is what ships. Reflection strength is day-cycle-driven: a new `env` value per TIMES keyframe (0.8/0.95/0.65/0.15), applied every frame in applyTOD as `envMapIntensity = userData.envBase * env(t)` over the `ALL_MATS` registry, so nothing glints with a daytime sky at night.
2. **`polish(o)` helper** (replaces the old per-loader metalness/roughness lines in EVERY model loader): plastic gets metalness 0 + roughness capped 0.38 + envBase 0.5; materials detected as glass (`transparent`, `opacity<1`, or /trans|glass/i name — catches Porsche MB40/41/111, shop TRANS-*, mansion LegoGlass/Black_tinted_glass) get roughness capped 0.08 + envBase 2.0. Ground plates rough 0.55 / envBase 0.35; far land + hills envBase 0.25; `plastic()` helper registers at 0.5.
3. **NABU crystal is now real glass**: deep blue body 0x0a2496, roughness 0.05, transparent opacity 0.85 with `depthWrite:true` (KEY: the stacked inner facet shells alpha-compound to white without it), envBase 0.7, emissive 0x0828f0 (deeper than the old 0x1e50ff, which washes to pastel under ACES) with intensity driven by applyTOD via `crystalMat`: 0.35 by day (glass reads), ~1.15 electric-blue beacon at full night. The crystal's blue PointLight stays 2.2 as approved. Its lightness comes from sky transmission, so do not lower its opacity to "deepen" it.
4. Debug handle `window.__R` (renderer) added, strip with the rest of `__D`. `.claude/launch.json` gained `dev-shine` (port 5321).
Verified in the dev server at midday/evening/night: Porsche headlights + windshield read as clear glass with hot speculars, shop interior visible through its front pane, crystal deep blue glass by day and glowing blue at night, studs catch lamp glints at evening, colors stay saturated (the first tuning at envBase 0.85 washed the whole scene pale; 0.5 is the balance), no console errors.

**Tan skin + warmer daylight (2026-08-26, committed + deployed in 3b9f302):** the figure's face/hands read pale after the shine pass. In lego.html: (1) the figure loader now overrides every /TAN-SKIN/ material (head + both hands share SOLID-TAN-SKIN in figure.glb): color #DDB184 (sRGB, converted to linear; deeper than the baked #E8C99F), roughness 0.55 (matte, kills the waxy sheen polish()'s 0.38 cap gave it), userData.envBase 0.25 (reflections cannot wash it pale). The glb itself is untouched. Follow-up in the same loader block: the face print (SOLID-BLACK-FACE on sym_11002, eyes + mouth) was already true black (#010101, no texture map, NOT a png) but polish()'s gloss + envBase 0.5 made it mirror the blue sky and read blue-grey; it is now forced 0x000000, roughness 0.65, envBase 0.0 (matte printed ink, immune to reflections and light tint, so it stays black in every light; the eye whites are a separate material, untouched). (2) Daylight warmed: TIMES morning sun 0xffd996->0xffcf83 and hs 0x9dc6ff->0xb3ccec; midday sun 0xffe3a6->0xffd88a and hs 0x8fbfff->0xa8c6e9; the AmbientLight base color 0xffffff->0xffedcf (warm white; night runs amb at 0.11 so the tint barely registers there). Evening/night palettes untouched. Verified in the dev server at midday, morning, and evening (mansion/Porsche vantage matching the user's report): skin reads tan in all three, no white glow on the hands, daylight has a yellow cast instead of clinical white, no console errors.

**Mansion front yard cleanup, single-layer ground (2026-08-26, committed + deployed in 3b9f302):** the mansion's own landscaping layer was removed from `modern_house.glb` so there is only ONE ground layer around the whole building (the glb's plates used to float ~0.13 above the code tiles, which is why green studs poked through the grey by the front). Deleted from the glb (headless Blender CLI round-trip, `--background --factory-startup`, user's blend untouched; scripts + pre-edit backup `modern_house_backup_with_yard.glb` in the session scratchpad): the west front-yard grass plate, the grey door-path and driveway plates, BOTH brown dirt beds (the one along the white front wall and the one by the Porsche), all yard flowers (purple mesh deleted entirely; red/yellow only below y 2.5 so the balcony planters survive), the courtyard bushes, and follow-up passes for cut-plane slivers (wall-plastered flower fragments cut to x<21.55 in the north wall band z -6.9..-1.5). A thin grey sill sliver (x 21.35..21.48) was deliberately kept at the door threshold as a step. Faces 632k->561k, file 3.75->3.1MB. In lego.html: new onPad rect `x>17.35 && x<21.7 && z>2.0 && z<6.4` paints the driveway grey in the code ground (the ex-bed near the Porsche now reads grey; the ex-bed at the white wall reads green, per user spec). CRITICAL LESSON: the house loader auto-recenters on the model bbox; deleting the west yard shrank the bbox and slid the whole building 2.002 west. Fixed with `houseHolder.position.set(snap(24)+2.0025, ...)`; verified the LegoWhite bbox is back to exactly x [21.480, 30.950] (pre-edit values). ANY future geometry deletion that changes a glb's outer bbox needs the same compensation on its holder. Verified in the dev server (new `dev-mansion` config, port 5291): yard clean at high/eye level, wall faces clean, door path single-layer, collision re-rasters correctly (ex-bed strips walkable, walls/Porsche still solid, garage doorway open), no console errors. Verification tip: a concurrent session's in-progress PMREM env work can render all materials black in a freshly reloaded dev tab; `__D.scene.environment=null` restores normal lighting for screenshots. Follow-up (same day): a floating yellow petal head survived at (22.7, y 0.6..0.8, z 1.93..2.07), by the house/driveway corner near the Porsche, because its stem straddled the z 2.05 boundary between the two cut regions; removed in a fifth pass (214 faces, house_edit5.py in the scratchpad). Remaining low flower geometry in the glb is interior pot decor behind the windows (x>21.5), intentional. Lesson: after region-boundary cuts, scan for surviving fragment clusters PER MATERIAL with a live vertex sweep, not just raycasts, since floating heads are easy to miss from above.

**Waist seam closed (2026-08-26, committed + deployed in 3b9f302):** the thin see-through gap between the torso's bottom rim and the denim legs' top edge is fixed in the lego.html legs loader. Cause: the denim's hidden inner plug is proportionally taller than the old Jesse pants', so the bbox-height fit left the denim's EXTERIOR shoulder 0.016 below the torso rim (rim y 0.6614, shoulder was 0.6457 in figBody space). Fix, after the existing seat: measure the torso rim (Base1349 bbox min y) and the waist band's exterior shoulder (front-face vertices of the TOPMOST legs mesh, z > its own bbox max - 0.01; the plug is recessed in z and the feet stick out further, so a whole-assembly z filter grabs a FOOT vertex and explodes the scale), then scale the legs UNIFORMLY from the feet so the shoulder tucks 0.006 up into the rim, and re-seat x/z/y (k ~1.0335; y-only scale is NOT safe, hip attach() decomposes world matrices and a non-uniform parent scale shears the reattached legs). Verified in a shared dev tab (port 5321): shoulder 0.6674 vs rim 0.6614, feet at exactly y 0, band stays body-bound, legs hip-attached, walk cycle swings, seam closed front/low-front/back, no console errors.

**Porsche silver wheel rims (2026-08-26, committed + deployed in 3b9f302):** the white wheel-rim rings on the orange Porsche are now metallic silver, per user request, via an `onload` on the porsche `loadProp` call in lego.html (the glb is untouched). The rim material is **MB309** (#9d9d9d, renders white under daylight), but MB309 also paints the rear lower trim bar and exhaust-area bits at the car's tail; the onload therefore clones the material as `MB309-silver` and assigns it ONLY to MB309 meshes whose world bbox center x < 22.4 (the 10 wheel/axle meshes at x 19.3..22.0; the rear bits sit at x 22.7..23.0 and keep the stock grey). Silver spec: color 0x969ba3, metalness 0.85, roughness 0.2, `regMat(rim, 0.9)` so envBase 0.9 (vs 0.5 plastic) makes the rims slightly more reflective than the bodywork while the day cycle still dims the reflections at night. The x threshold is world-space and tied to the car's parking spot (holder snap(20.6)); if the Porsche ever moves, re-derive it. Verified on a fresh load in the dev server (dev-shine, port 5321): rims metallic silver with a bright reflective arc at midday, muted with only a soft lamp catch at full night (`__D.time=0.75`), rear trim bar unchanged grey, no console errors. Verification quirk hit twice this session: a manually created snapshot camera renders only sky/black until you set `cam.aspect=innerWidth/innerHeight; cam.updateProjectionMatrix()` after the pane settles.

Note: since `lego.html` is now the public My Space and is still WIP, be mindful that changes here affect the live site — deploy (`npm run deploy` or build+commit+push `docs/`) only when the user asks.
