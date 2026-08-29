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

**Mansion-front stray green cells filled (2026-08-26, NOT committed or deployed):** the 4 leftover green 2x2 cells in the grey in front of the mansion are now grey: the 3-tile L just north of the driveway by the Porsche (cells (21.1,1.11), (21.1,1.85), (20.3,1.85)) and the single green gap in the walk row by the door path (cell (21.1,-1.11)). Fixed with one new `onPad` rect in lego.html: `x>19.9 && x<21.7 && z>-1.5 && z<2.0`, the corner pocket between the sidewalk polyline, the driveway rect, and the mansion pad that none of the existing rules reached. The z>-1.5 edge deliberately excludes the z=-1.85 cell row so the lawn strip between the walk and the door path stays green. Debug technique for tile work: replicate onPad/onWalk in the console and print an ASCII grid of cell centers (`#` grey `.` green) to identify exact cells before editing. Verified after a fresh reload (dev-shine, port 5321): pocket fully grey top-down and from the user's camera angle, lawn boundary staircase untouched, no console errors. The green staircase tip at (16.6,4.8) by the driveway's SW corner is pre-existing lawn boundary, connected to the lawn, left alone.

**Hero button removed + storyboard reshoot (2026-08-26, NOT yet committed or deployed):** per user request the hero "Enter My Lego Realm" button is GONE from the homepage; the ONLY entrance is the CTA at the end of the storyboard. New copy direction (saved to memory `site-copy-tone`): descriptive copy must NOT call the space by name ("childish and unprofessional"); it states what it is (an interactive real time 3D environment, Blender to browser). Hero paragraph, intro/chapter bodies, and FR 03 caption rewritten accordingly; the name survives only on the bottom button label. The 7 Blender storyboard frames (FR 07-13) were RESHOT, each in a different Blender workspace/tool, per user request for tool variety: FR 07 skull in UV Editing (unwrap over its baseColor texture), FR 08 coffee shop taken apart in object mode (roof + top wall course lifted in world space; the above-roof Central Perk sign cluster hidden for the shot), FR 09 hair in Sculpt Mode under a matcap, FR 10 figure exploded (hair/head/torso/arms separated; the blend's figure has NO leg meshes, the legs empties are placeholders, which the caption turns into the real story of runtime hip binding), FR 11 ruins in Edit Mode with the upper storey face-selected, FR 12 modern house in the Shading workspace with the Black_tinted_glass Principled nodes, FR 13 cottage in an Eevee rendered viewport. New files `story_blender_{skull_uv,shop_assembly,hair_sculpt,figure_exploded,ruins_edit,house_nodes,cottage_render}.jpg` replace the 7 old `story_blender_*.jpg` (deleted, recoverable from git). Blender state was fully restored (transforms, sun, names, modes, workspaces); copyrighted object names (Jesse Pinkman, Bizarro Superboy, Tardis, etc.) were temporarily renamed neutral for the shots because the outliner is visible in screenshots, then restored; blend NOT saved. Technique notes: `bpy.ops.screen.screenshot` with a window temp_override captures the whole UI at retina res; object `location` edits on Mecabricks imports are useless (parent scale 0.0127), move via `matrix_world.translation`; `view3d.localview(frame_selected=True)` + setting `region_3d.view_rotation/location/distance` frames shots; PMREM/`view_all` in the shader editor needs its own area override. Verified in the dev server (dev-rim, port 5307): hero, all 7 new frames, bottom CTA, no console errors; `tsc --noEmit` clean. FR 14 was then also replaced per user request: a drone-style in-engine aerial of the whole town at sunset (`story_aerial_sunset.jpg`, replaces `story_figure_back.jpg`, deleted/git-recoverable). Captured from lego.html in the pane via `__FC` free-cam (eye [10,27,46], look [3,1,-11]), `__D.time=0.515` (just past the evening keyframe), fog temporarily widened to 42/115 in-page for the wide, exported with an in-page `__cap(w,h)` helper (renderer.setSize + toDataURL POSTed to a throwaway local receiver on 127.0.0.1:8766; pane devicePixelRatio doubles the export, 3840 requested = 7680 actual).

**2x CONSTRUCTION LAYOUT + RIVER + BRIDGE (2026-08-26, NOT committed or deployed):** per user request the whole world was expanded: every structure moved to TWICE its old stud-snapped distance from the world origin (deltas, all multiples of PITCH: shop -9.975/-12.561, ruins -1.108/+9.975, mansion +26.231/0, run-down house +10.345/-12.931), and EVERYTHING attached moved by its structure's delta (pads, door paths, lamps, portals' door/eye/look/exit, skull, rat, tardis+crystal, chest, Porsche + its silver-rim x threshold 22.4->48.63, STAIR_ZONES, ruins doorway teleport zones/targets). New holders: shop (snap(-19.95),-0.12,snap(-25.12)), ruins (snap(-2.2),-0.5,snap(19.95)), mansion (snap(50.2)+2.0025,-0.15,snap(0)), rdh (snap(20.7),-0.15,snap(-25.86)). Plate now X0 -26.6, X1 60.6, Z0 -31, Z1 28.4 with an OZ center offset (the tile grid, farLand position, AND the farLand bump-phase formula all take OZ now); APRON 20->12; bounds BX0 -30, BX1 64, BZ0 -35, BZ1 32 (BZ split into BZ0/BZ1, clamp updated); fog 15/32 -> 18/40 ("widen a bit", user choice); HILLS and FAR_TREES pushed to >=28 past the new bounds; sidewalk polyline redrawn for the new anchors; trees (75 planted: inner scatter + border ring w/ corner pockets) and all flower arrays (120 plants) re-laid and verified by in-page raycast audit (only offender fixed; temp `window.__flowerSpots`/`__treeSpots` debug hooks added, strip with __D).
**River + bridge:** the user added a LEGO bridge MOC to the blend ("Lego Bridge (MOC)", 69 meshes: brown arch + 3 blue 8-wide water plates + green bank bushes). Its stud pitch measures 0.35666 (NOT 0.25 or 0.369), so `BRIDGE_SCALE=PITCH/0.35666` registers it with the grid. Exported `bridge.glb` (1.4MB) and `water_plate.glb` (one 8x16 blue plate, 277KB), blend untouched. The river is an 8-stud-wide blue-plate stream: `riverAt()` (RV_Z -12.192, RV_X 8.867, RV_HW 1.478) runs east-west across the run-down house's path, bends north at RV_X and exits through the border tree line, making the bridge the ONLY way to the house's quadrant. Water cells are filled into solidCells only (camera ignores them); the bridge loads via loadProp (new `scale` cfg option) at [20.69,-12.19], y -0.22 (water plate tops flush with the tile plate top), rotY PI/2 (exported plate/water long axis is z), solid + buildHeightmap for the climbable deck (a bridge STAIR_ZONE covers it); its water plates get `userData.noHM` (a new buildHeightmap skip flag) so water is never walkable. Extension water: cloned 8x16 plates tiled at 16-stud pitch (west 1, east 7, north 5, exact seam gaps, no overlaps) + two flat far-water planes carrying each open end into the fog. VERIFIED (dev-bridge, port 5361): walk-across test (deck y up to 1.4, lands at the house door), water blocks entry at the bank (stops z -10.29 from south), all 4 portal prompts, ruins teleporter, night/midday looks, seamless horizon on both rims, zero console errors. NOTE: another session's GRAVEL PROTOTYPE blocks (grey tile tone variation + gravel_bits.glb scatter) live inside the ground loader and were preserved; their drive/rdpath rects were re-derived here (drive x 43.58..47.93 z 2.0..6.4; rdpath x 19.55..21.84 z -21.6..-4.0). Frame cost is now ~19.8M tris (trees dominate, as before); fine on desktop, watch mobile.

**Portal menu spacing + boxless titles + cover-matched frames (2026-08-26, NOT committed or deployed):** the portal carousels felt cramped, so in lego.html: `PGAP` 3.55 -> 4.4 (~1.7 units of air between the 2.67-wide frames; `panMax` and the arrow-key step scale off PGAP automatically), the panel group is raised `group.position.y=0.8` so the caption strips clear the bottom UI, and `#prompt` moved bottom 74px -> 112px so the prompt pill, the WASD hint bar, and the captions no longer stack tight. Second pass, per user: (1) the navy caption BOX is gone; captions are now boxless white text (labelTex grew a no-bg mode: soft black shadow + double fill so it reads over any blurred backdrop); (2) every panel's LEGO frame is recolored at texture-load time to the STRONGEST color of its own cover image via a new `strongColor(img)` helper next to texPanels (40x40 downsample, 6 hue sectors x 2 lightness bands, saturation^2-weighted so e.g. dark denim beats a larger area of near-black; near-grey/white/black pixels skipped; monochrome fallback = image average; HSL clamped s<=0.85, l 0.16..0.62 so studs still shade; converted sRGB->linear). The per-panel frame material rides in `g.userData.frameMat`; imageless panels (Resume, Contact) keep their original `p.c` color. (3) the navy backing box no longer shows as an inner blue trim: the media plane is now full-bleed W x Hh (was W-0.14 with a 0.07 navy rim) and the cover-fit aspect constant updated to 2.15/2.7. Verified in the dev server (new `dev-carousel` launch config, port 5381) in the NABU and Creative menus, including browsing the 12-panel Creative row to both ends: Studio Photography's frame is now dark navy (was yellow), Airpod Case dark purple, HMI Sensor blue, NABU 2025 khaki, no console errors.

**LEGO-exact flowers: one size, stud-lattice snap, stamped, +65 plants (2026-08-26, NOT committed or deployed):** the whole flowers loader in lego.html was rewritten around a new plant(px,pz,rot,between). (1) ONE size for every flower: all per-cluster base scales and the per-member 0.85..1.15 multiplier are gone; every plant is K=1.05, measured so the base's bottom socket (inner r ~0.1075 at scale 1, from the stem mesh's bottom-rim vertex ring) pops onto a stud (r 0.1133, measured off ground_small.glb) like the real piece. (2) Real stud-lattice placement: a grid replica (GSX 0.738544, GSZ 0.739792 — the tile glb is slightly RECTANGULAR, not square; GOX 17, GOZ -1.3; studs at tile center ±0.1839) snaps each plant to the nearest FREE spot, ON a stud or BETWEEN four studs (tile center; the round base wedges in like a real 1x1 round piece), ~1/3 between via (i+j)%3===2, deduped by a taken-set over the 3x3 tile neighbourhood. (3) STAMPED: recentering is now on the SOCKET AXIS (bottom-rim centroid; the old leafy-bbox centering put the socket ~0.07 off axis) and every plant seats at PLATE_TOP -0.0673 so the stud is inside the socket, instead of floating at stud-tip y 0. (4) PETAL_COLORS palette hook: with 2+ hex entries every plant clones its petal material (/pink/i) and cycles the list (regMat'd so the day cycle drives it); with 0..1 entries nothing is cloned. Palette left EMPTY pending the user's color picks (candidates in the comment). (5) 65 new plants in 26 `fresh` clusters spread over the whole map, spots generated + vetted live in-page (center+0.9-offset raycasts all on __matGreen; >=1.8 from old flowers, >=1.5 from trunks, >=2.2 from lamps, prop bboxes +0.8, >=6.5 pairwise). solidifyDisc is a flat r=0.30 per plant now (sizes are uniform). Total 185 plants; audit after reload: 185 raycasts all green, 121 on-stud + 64 between + 0 misaligned (<0.002). Verified visually (dev-flowers, port 5277): base flush on the plate top with the stud swallowed, between-stud plants centered in their 4-stud pocket, night pass clean, zero console errors. NOTE: cluster arrays are now [x,z,count] (the old scale entry was dropped).

**Fog pushed back + background woodland + spawn-area greenery (2026-08-26, NOT committed or deployed):** three changes in lego.html, all per user request.
1. **Fog 18/40 -> 28/62** (`scene.fog`, line ~125). Nothing fogs at all inside 28 units, so the border tree line, the neighbouring structures and the river read fully clear from mid-map and the world feels deep instead of closed in. This supersedes the earlier "closed-in fog" (15/32) and the 2x-layout 18/40 values.
2. **BACKGROUND WOODLAND: 92 new trees in `FAR_TREES`** (tree loader), in a seeded band 2..30 units past the walk bounds (BX0 -30, BX1 64, BZ0 -35, BZ1 32) on all four sides, so the pushed-back fog reveals a forest instead of empty ground. Generated offline (seeded scatter, min 4-6 spacing, cleared of the HILLS radii+4, the 8 original giant far trees +7, and the river's north exit channel +2.4 half-width); scale 1.0..1.9. `FAR_TREES` entries gained a 5th field, the base sink: 0.05 for the ones still standing on real apron tiles (x -36.2..70.2, z -40.6..38.0), 0.12 beyond that on the far-land sheet (the old 8 entries carry 0.12 explicitly; the loader still defaults to 0.12). These clones are **frustum-culled** (`o.frustumCulled=true`), unlike every other model in the page, so only the ones actually in view cost anything: tree.glb is 79,376 tris each, and the whole pass took the midday frame from ~19.8M to 21.8M tris / 983 draw calls. No collision, no shadow casting, all outside the player bounds.
3. **Spawn area greenery**: the lawns either side of the spawn walk were bare. 9 trees appended to `cand` and 26 flower plants in 10 `spawnArea` clusters appended to the flowers loader. Every spot was generated against an offline replica of the page's own onPad/onWalk/riverAt math (scratchpad `map.js` + `vet.js`): trunks >=2.2 clear of every grey tile and the river (two spots were then moved out to >=3.6 so their canopies don't reach across the walk), flower centers >=1.5 clear plus a per-member check, >=3.5 tree-to-tree, >=1.8 from the older flowers, >=1.6 tree-to-flower. Re-verified IN-PAGE by raycasting all 26 plants (center + 0.3 offsets) and all 9 trunks (center + 1.2 offsets) onto the ground InstancedMeshes: 0 hits on grey. NO pathway tiles were added; greenery only, per user spec.
Totals now: 84 planted trees + 100 far trees, 211 flower plants. Verified in the dev server (new `dev-fog` launch config, port 5401) at midday and night from the spawn (both directions), the west/east rims at eye level, north along the river, mid-map looking east toward the mansion, and top-down over spawn: woodland layers into the fog with no plate edge or seam anywhere, paths stay clear, no console errors. Verification technique: `__R.render` was wrapped in-page to force a hand-placed camera (`window.__view(eye,look,fov)`) so screenshots could be framed without fighting the rAF loop; nothing of that is in the source. Watch out: teleporting to rim coordinates usually lands inside a canopy now.

**NEW MANSION SWAPPED IN (2026-08-26, NOT committed or deployed):** the user rebuilt the mansion
in the blend and it replaced the shipped model. The new `Modern Lego House` keeps its OWN ground
plate layer (door path, driveway, patio, interior wood/dark-grey floor) and deliberately leaves
gaps in it so the world's greenery reaches the walls; the grey doorway-path pieces are the user's
and must not be removed or painted over. Export: the 618 mansion meshes were duplicated, parent-
cleared, joined, transform-applied and exported selection-only with Draco to
`public/assets/modern_house.glb` (388k faces / 2.4MB, was 561k / 3.1MB; the old glb also had the
yard grass, dirt beds, flowers, LegoGlass and Rubber, all absent now). Blend untouched and NOT
saved; the temp join object was deleted. Pre-swap backup: `modern_house_backup_prev.glb` in the
session scratchpad. Changes in lego.html:
1. **Holder re-derived, not patched.** The loader auto-recenters on the glb bbox and the new
   bbox reaches 3.9 units further west (the path plates), so the old `snap(50.2)+2.0025` chain was
   thrown away and the position solved backwards from where the walls must land:
   `houseHolder.position.set(50.2622, -0.215, 0.20165)`. Verified in-page: the LegoWhite bbox is
   x 47.717..57.187, z -6.755..7.158, its exact pre-swap spot. The y seats the model's plate layer
   FLUSH with the ground tiles (its stud tips land at y -0.004 vs the tiles' 0), so the mansion's
   plates and the world's grass read as one ground, not a raised terrace.
2. **`onHousePlate()` + `HP_ROWS` mask** (next to `onPad` in the ground loader): a 38x38 one-char-
   per-stud footprint of the model's plate layer, measured off the model in Blender, origin
   HP_X0 43.3286 / HP_Z0 -6.7546 (rows run +x, columns run +z). The three old mansion `onPad` rects
   (mansion pad, driveway, corner pocket) are GONE; the mask replaces them.
3. **Recessed under-layer.** Tiles whose center is on the mask go into a new `under` field drawn at
   y -0.10 (`field()` gained a y parameter) instead of the grey/green fields. They must not sit at
   normal height: the tile studs (tips y 0) would poke through the model's plate body (top -0.071),
   the old green-studs-through-the-grey bug. They must not simply be dropped either: this tile grid
   and the model's stud grid are a QUARTER STUD out of phase (~0.09 on both axes, checked
   numerically), so plate edges land mid-tile and dropping the tile left holes down to the far land.
4. `treeOK`'s mansion exclusion widened x>46 -> x>42.8 to cover the new door-path plates. The grass
   colour sync comment was corrected: the model has no green material now, so the grass keeps its
   own LegoGreen constant.
The Porsche was NOT touched (still `pos:[46.83,4.4]`, silver-rim x threshold 48.63) and it still
parks on the model's driveway plate. VERIFIED in the dev server (dev-mansion, 5291) at midday,
morning and full night: ground continuous with no lip or seam, the greenery gap between the door
path and the driveway reads as grass at the same height as the plates, grass reaches every wall,
About portal prompt + enter + panels + Esc all work, walls/Porsche still solid and the paths
walkable, no flower or tree lands on the mansion's plates (audited all 205 flowers / 83 trees
against the mask), 19.9M tris (unchanged), zero console errors.
STILL OPEN: the greenery gaps are plain grass; no flowers or bushes are planted in them yet.

**ORGANIC RIVER SHORELINE + reeds down the whole run (2026-08-26, NOT committed or deployed):** the river read as a blue rectangle painted on the grass (two straight 8-stud channels meeting at a hard right angle), so it was rebuilt as a LEGO body of water. All in lego.html, no asset changes.
1. **Chamfered, wandering centerline**: `RV_LINE` is a 4-point polyline (north end -> `RV_CH`=1.848 chamfer at the bend -> east end) with cumulative arc lengths `RV_S`; `riverProj(x,z)` returns [distance, arc length, side] and `riverPoint(s,side)` the reverse. `riverHW(s,side)` wanders the half width by a fixed sum of three sines (phase 11.3 apart per bank so the two banks never mirror), giving 0.5 to 5.4 studs beyond the core. `riverAt` = inside `RV_CORE` OR within `RV_HW` OR within the wandering half width, with the fringe eased to zero across the bridge corridor (`RV_BR` 18.3..22.4, 2.6-unit smoothstep, so the span still reaches both banks) and again where the run leaves the plate (x>52 fading by 62, z<-28 fading by -38, so the far-water strips still line up). Deterministic: no randomness, identical every load.
2. **`RV_CORE` is load-bearing**: the rectangles the big plates actually cover ([13.302,69.45,-13.668,-10.716] bridge+east, [7.391,10.343,-43.24,-13.676] north). `riverAt` returns true inside them unconditionally, so a plate can never end up sitting on dry land. If the water plate `spots` list ever changes, RE-DERIVE THESE.
3. **The old west-stretch plate (`[10.34,RV_Z]`) was REMOVED** on purpose: a 16x8 rectangle across the bend is exactly what made the corner square. That span is now mosaic, which can round it stud by stud.
4. **SHORELINE MOSAIC** (ground loader, right after `plateTop`): the tile loop now counts how many of each 2x2 tile's 4 stud cells the water reaches and pushes ANY tile the water touches to `shore` instead of emitting a grass/grey tile. Each shore tile is relaid as four 1x1 pieces on the stud lattice: water cells are procedural boxes + stud cylinders in `matWater` (#2653a7, roughness 0.12, envBase 1.4, matching MB23), land cells the same in `matBank` (shares `matGreen`'s Color INSTANCE so the mansion grass sync recolors it). Cells already covered by `RV_CORE` are skipped; a cell straddling a plate edge is CLIPPED by `clipOut()` to the largest rectangle outside it and extended `CEPS`=0.006 under the plate, and keeps its stud ONLY if it still owns its own center (otherwise it would plant a stud on top of the plate's own studs). Water tops sit at `plateTop-0.008` so clipped edges tuck beneath the big plates. Result: no overlap and no gap along the whole run. Counts: 965 water cells, 325 bank cells, 1060 studs, all instanced.
   **Why the mosaic water is studded, not smooth tiles**: the first pass left clipped cells studless, which produced a flat studless band with a dead straight inner edge running the length of both banks. Studding them fixed it. The big plates' own stud grid is offset ~0.21 in z from the tile grid (a pre-existing misalignment, same reason there was always a thin strip between grass tiles and water plates), but with the clip rule above the rows read as continuous.
5. **Collision**: `fillSolidRect` is gone. Solid water cells are now sampled analytically at `OCS` resolution over the river's whole reach (x RV_X-5..76, z -46..RV_Z+5, ~109k samples at load, a few ms). Verified by ASCII cross sections at x 12/26/40/56 and z -20/-30: solid band across the water, both banks free.
6. **BANK PLANTS repeated down the whole river** (bridge `onload`): the MOC's 6 MB28 reed clumps have their geometry lifted in world space, recentered on their own base, and instanced at irregular arc-length intervals (0.85+rng*1.0) alternating banks. Placement BISECTS along the bank normal using `riverAt` itself to find where the water actually reaches (riverHW alone is wrong: it ignores the bridge/edge tapers and the mosaic's stud quantization), skips spots where the fringe is under 0.55, then seats the clump at 15..60% into the shallows. Skips the bridge span (it has its own) and anything past x 64 / z -36. 30 reeds, all verified over water by raycast. Debug handle `window.__reeds`.
7. **Knock-on fix**: the widened north bank swallowed the `more` flower cluster at [35.6,-9.8], moved to [35.9,-8.6] (vetted by raycast). CAUTION, a bug I introduced and caught: appending a `//` comment to the END of a flower array line commented out the remaining entries on that line and silently dropped 6 plants. Array-line comments must go on their OWN line. Audit after the fix: 211 flowers, 0 over water; 83 trees, 0 in water.
Verified in the dev server (dev-flowers, port 5277) at midday and full night, from the bend, both banks, the east and north tapers, and a top-down close-up of the plate/mosaic stud seam. Walk tests via `__D.step` frame pumping: the bridge still carries the player across (rises to deck y 1.35, lands in the house quadrant at z -21.3) and the water still blocks at every other approach. Zero console errors.

**PLANTED BRIDGE swapped in (2026-08-26, NOT committed or deployed):** the user rebuilt "Lego Bridge (MOC)" in the blend with far more greenery, and it replaces the old `bridge.glb`. Re-exported selection-only with Draco straight from the in-memory object (93 meshes, 1.42MB -> 1.78MB); the blend was NOT saved and the selection state was restored (it was empty, and the file has been dirty/unsaved since Aug 25, so DO NOT save it casually). Pre-swap backup: `bridge_backup_6plants.glb` in the session scratchpad. Contents now: MB23 water x5, MB28 plant clumps x26 (was 6), MB308 x48, MB192 x12, plus a new MB154 red flower x2. Each plant is its own Part.### empty with one mesh, so the river reed instancing picks all 26 up as separate kits automatically.
1. **SCALE CHANGED**: the new export's stud pitch measures 0.3513, not the old 0.35666 (1.5% smaller), so `BRIDGE_SCALE` is now `PITCH/0.3513`. Measured off the glb, not guessed: water plate 2.8104 across its 8 studs, deck 2.1069 across its 6. Re-measure on any future re-export.
2. **THE TRAP, and it bit**: `BRIDGE_SCALE` was ALSO scaling the cloned `water_plate.glb` river plates. That asset was cut from the FIRST bridge export and keeps the 0.35666 pitch, so the new scale stretched every river plate to 8.11 studs, pushed them ~0.02 past the channel edge and overlapped all six 16-stud seams. Fixed with a separate `WATER_SCALE=PITCH/0.35666` local to the water plate loader. Verified after: plates back to 2.9518 wide (8 studs), seam gaps 0.003..0.004, z -13.668..-10.716. **Never share a scale constant between two assets exported at different times.**
3. **Placement is unchanged** because the new model's bbox proportions match: loadProp recenters on the bbox, and the water's model-x center still coincides with the overall center. Verified in world space: water x 13.293..28.086 / z -13.670..-10.714 (old 13.302..28.076 / -13.668..-10.716), deck 19.211..21.427 / -15.519..-8.864 (old 19.213..21.426 / -15.515..-8.869). `RV_CORE[0][0]` nudged 13.302 -> 13.29 to match.
4. **The new reeds reach onto BOTH BANKS** (world z -15.149..-9.235 vs the water's -13.670..-10.714), straight across the path corridor, where the old ones only overhung by 0.3. Left solid they would have walled off the approach to the deck. `rasterizeSolid` gained a `userData.noSolid` skip (mirroring buildHeightmap's `noHM`), the bridge dropped `solid:true` and now calls `rasterizeSolid(holder)` from its own onload AFTER flagging every MB28/MB154 mesh `noSolid`+`noHM`. Consistent with the river reeds, which never had collision.
Verified in the dev server (dev-flowers, port 5277): crossing works both ways (deck y 1.35, lands at z -21.34), the path corridor is open on both banks, water still blocks elsewhere (stops at z -9.82 from x 30), 30 reeds drawn from 26 kits all sit over water, 211 flowers and 83 trees still clear, zero console errors.

**CRITICAL (2026-08-26): `My Lego World .blend` had been DELETED.** The Desktop blend was found in the iCloud Trash (`~/Library/Mobile Documents/.Trash/`) during this session and the latest save (Aug 25 01:06, 76.9MB) was copied back to `~/Desktop/My Lego World .blend` (Trash copies left in place). All asset work depends on this file and it is not in git; the user should back it up.

**EXTRA SHOTS IN THE PORTAL VIEWER (2026-08-26, NOT committed or deployed):** several assets were
photographed more than once and only one shot was ever wired up. The Lego Realm viewer now carries a
shot set per asset. In `public/lego.html`: project entries take an optional `extras:[{img,label}]`
list plus an optional `mainLabel`; `shotsOf(p)` builds the set (main media first, extras after),
`renderShot()` draws the current one, `stepShot(d)` walks it, and `openViewer` builds the caption
before rendering so the new `.cap .s` counter line ("Front · 2 / 4") exists. Navigation: ‹ › buttons
(`#viewer .nav`, inside a new `.mwrap` wrapper around `.media`, shown only when a set has more than
one shot), left/right arrow keys while the viewer is open (added ahead of the menu-pan branch in the
keydown handler), and a horizontal swipe on the media wrap for touch (ignores touches that start on
the VIDEO element so the player's own controls still work). Switching shots pauses and unloads any
playing video (`stopShot`, shared with closeViewer).
Sets added: HMI Sensor System and Custom RGB Controller (demo video + front + back + the pair shot),
Moskowite Corner (concept + existing site), NABU 2026 Teaser (teaser + puffer front + puffer back).
Three assets that were sitting unused in `public/assets` are what filled these: `Programming_Cover_Pic.jpg`
(the radar box and the RGB controller side by side, left over from a deleted Programming category),
`6AFD11B6-801A-4367-9DAC-43899A3456E8.jpg` (copied to `NABU_Puffer_Front.jpg`), and
`New_NABU_Site_Cover_Card.jpg`, whose pixels are stored sideways; it was rotated upright into
`NABU_Puffer_Back.jpg` with `ffmpeg -noautorotate -i in.jpg -vf transpose=2` (WITHOUT `-noautorotate`
ffmpeg auto-rotates the input first and the transpose cancels out, and `sips -r` only writes an
orientation tag that the browser ignored, both leaving the file landscape; verify with the img's
naturalWidth in-page, not with sips).
The same extras were also orphaned on the MAIN SITE, so `src/App.tsx` was brought in line: the
MediaViewer no longer suppresses the related-item arrows for HMI Sensor System and Custom RGB
Controller (that hard-coded title exclusion made the four hidden radar/RGB photos unreachable), every
hidden extra now links back to its parent and across to its sibling, and the three previously unused
files are new hidden items (Hardware Builds Together, NABU Puffer Front, NABU Puffer Back).
Verified in the dev server (new `dev-work` launch config, port 5421): main site Work page opens the
arrow links and the new pair shot; in the Realm, all four portals reached with `__D.tp` + a synthetic
E keydown + `__D.step` frame pumping, HMI 4/4, RGB 4/4, Moskowite 2/2, NABU teaser 3/3, single-shot
assets show no arrows and no counter line, `tsc --noEmit` clean, zero console errors. Verification
note: dispatching a synthetic keydown WITHOUT a matching keyup leaves that key held in `keys{}` and
the figure walks off on its own.

**SPAWN LAWNS CLEARED + STRAIGHT GRAVEL PATH TO THE RUINS (2026-08-27, NOT committed or deployed):**
per user request the trees crowding the spawn are gone and a dead-straight gravel path now runs from
directly behind the spawn point up to the ruins doorway. All in `public/lego.html`, no asset changes.
1. **9 spawn-area trees removed**: the `[-8.5,2.22] ... [9.61,6.65]` block appended to `cand` in the
   earlier spawn-greenery pass was deleted (the comment block is kept, marked deliberately empty, so
   a future session does not re-plant them by accident). Planted trees 83 -> 74. The spawn-area
   FLOWERS were kept; only trees were removed, per the request. One of them ([-4.06,6.28]) stood in
   the new path's corridor, so this had to happen first either way.
2. **`ruinsPath(x,z)`** added next to `onPad` in the ground loader and OR'd into `onPad`, so the strip
   lays grey tiles: `x>-3.6 && x<-1.5 && z>-2.6 && z<12.7`. Bounds were derived, not guessed. The
   doorway opening was measured off the model by raycasting +z at y 0.8 across x: the ruins front wall
   face is at **z 16.027** and its door gap spans **x -3.325..-1.415**. The tile grid's columns near
   there are -3.31 / -2.571 / -1.833 (tile sx 0.738544), so three columns = a 6-stud path spanning
   x -3.679..-1.464, bracketing the doorway. The z range deliberately overlaps both ends: the spawn
   walk covers z -4.478..-1.522 at this x (the spawn point itself is -4.43/-3.33, so the path starts
   immediately behind it), and the ruins' own grey pad already starts at z 12.68, so the path merges
   into both with no seam and the final stretch to the door is the pad. 6 studs matches the run-down
   house path, not the 8-stud main sidewalk, so it reads as a side path.
3. **Gravel**: `ruinsPath` was added to the gravel-scatter test in GRAVEL PROTOTYPE part 2
   (`onWalk||drive||rdpath||ruinsPath`), so the new strip gets the same 1x1 plates/tiles/pebble domes
   as the rest of the walk. 58 gravel instances land on it.
4. **Flower knock-on**: the `spawnArea` cluster `[-2.59,3.33]` sat in the corridor and moved to
   `[-5.91,2.59]` (vetted by raycast). Nothing else needed moving: a full audit after the change
   raycast all 211 flower plants (center + 0.3 offsets) and all 74 trunks (center + 1.2 offsets)
   against the ground InstancedMeshes; 0 trunks on grey, and the only flower offsets touching grey
   are 4 pre-existing grazes against the ruins pad edge and the run-down house path, all with their
   centers on green and none anywhere near the new path.
Verified in the dev server (new `dev-path` launch config, port 5461) at midday and full night from
the spawn, from the path looking at the doorway, and from an elevated view down the whole run: the
strip is one continuous grey channel from the walk to the pad with no gap, it lines up with the arch,
the spawn lawns read clean with their flowers intact, `__D.blocked()` is clear along the entire
centerline, and a held-W walk test from the path start carried the figure straight through the door
(the ground doorway teleporter fired, landing on the balcony at -1.71/3.11/16.37). Zero console errors.
Debug technique worth repeating: an ASCII map of the ground built by raycasting tile centers and
testing `hit.object.material === window.__matGreen` shows the exact grey/green cells before and after
a path edit.

**BRIDGE PLANTS REPEATED THROUGH ALL THE WATER (2026-08-27, NOT committed or deployed):** the green
LEGO plants that ship with the bridge MOC (the MB28 kits: 10 tall reed clumps, 12 small flat pads,
4 wider pads) now cover the WHOLE river, mid-channel as well as the banks, instead of the old
30-instance bank-only sprinkle. In `public/lego.html`, the bridge `onload` block (was "BANK PLANTS",
now "WATER PLANTS"): kits carry a footprint radius `r`; placement walks the centerline at
`s += 0.6..1.1` and, on BOTH sides of every step, bisects with `riverAt` to find where the water
really reaches, then lays a band of `round(lo/1.05)` plants from the centerline out to that edge with
per-slot jitter. Three filters: `wet(x,z)` (riverAt at the point plus a quarter stud out on each
axis, so nothing lands on the shoreline mosaic's ragged edge cells or the grass), a spatial-hash
`fits()` spacing test at `(r1+r2)*0.8` (they may crowd like the MOC's own, never grow through each
other), and the skip box `x 13.4..27.0, z -15.6..-9.2` over the bridge's own stretch. The old
`x>64 || z<-36` cut was moved out to `x>69.4 || z<-42.8` so the planting now ends exactly where the
studded water plates end, not 5 units short of the rim where the stop was visible. 175 plants, same
seed (90210), same y -0.22 as the MOC seats them (bases on the riverbed, poking up through the
plates), still scenery only (no collision, no heightmap, no camera effect). Verified in the dev
server (new `dev-water` launch config, port 5481): raycast audit of all 175 shows every one over
water (167 straight onto the blue plates, 8 onto other plant geometry with water underneath, 0 on
grass), views at midday and full night from the bridge, both banks, the bend, the north stretch to
its far end, the east stretch out past the rim, and the real third-person camera; 22.4M tris /
1032 draw calls (the plants ride in 26 instanced meshes, one per kit), zero console errors.
Verification quirk: a hand-placed snapshot camera built from `renderer.getSize()` gets aspect NaN
when the preview pane is hidden and renders sky only. Hardcode 16/9.

**ORGANIC GRAVEL: shaped edges + a 1x1 boundary mosaic (2026-08-27, NOT committed or deployed):**
the greys got the same treatment the river got, per user request. All in `public/lego.html`'s ground
loader, no asset changes.
1. **`wob(x,z)`** (a fixed sum of three sines, deterministic) and **`rrect()`** (rounded-rectangle
   distance) sit next to `onPad`. How far each region may wander depends on what stands on it:
   the SHOP PAD only ever GROWS (the shop's bbox is within 0.07 of the old rect, so an inward
   wander would show grass under its walls) via `fringe()` = 0.36..0.81 outward, and the 0.36 floor
   always clears the 1.1 corner radius (a rounded corner cuts in at most 0.293r), so the old rect
   is never eaten into; the RUINS PAD has 1.2..2.3 of margin to the structure, so it wanders
   +/-0.5 over a heavy 1.8 corner radius; the two narrow paths (`ruinsPath`, the new `rdPath`)
   wander +/-0.26, TAPERED back to their exact rect wherever something must line up (the ruins
   doorway, the bridge deck corridor, the walk junctions); the SIDEWALK's half width breathes
   +/-0.42. `ruinsPath` now runs to z 13.6 (was 12.7) so it still overlaps the ruins pad where
   that pad's rim pulls back.
2. **GRAVEL EDGE MOSAIC**: the tile loop now classifies each 2x2 tile by its 4 STUD CELLS, not its
   center. All-grey and all-green tiles are unchanged; a tile the boundary runs through goes to
   `edge` and is relaid as four 1x1 pieces (box + stud, same body/stud heights as the tiles) in a
   new block right after the shoreline mosaic, so the gravel's outline steps stud by stud. Grey
   cells carry the walk's `TILE_TONES` variation (plate and stud tinted together). 335 edge tiles,
   1340 cells.
3. **Gravel bits** (`gravel_bits.glb`) now scatter on the mosaic's grey cells too (`gCells`), so
   the bits run right out to the ragged edge instead of stopping at the last full tile; the bits'
   duplicated `rdpath` rect is gone, it calls the shaped `rdPath` now.
Knock-on: one flower member at (3.34,10.91) fell under the sidewalk's new wander, so that cluster
moved [3.5,10.7] -> [3.5,10.0]. Verified in the dev server (dev-water, port 5481) at midday from
above and at eye level over the spawn walk, the shop pad, the ruins pad + its path, the bridge
approach and the mansion junction: edges read hand-laid, no pinch breaks the walk, no grass shows
under the shop, collision/heightmaps untouched; raycast audit of all 241 flowers and 73 trees shows
every one still on grass; zero console errors.

**BRIDGE-ENTRANCE TREE REMOVED, FLOWERS IN ITS PLACE (2026-08-27, NOT committed or deployed):** the
tree at `[24,-7]` (the only planted tree in that whole quadrant, standing right at the bridge
entrance in the figure's line of sight from the spawn) is out of `cand`, and 30 plants in 12
clusters (`bridgeArea`, appended after `spawnArea` in the flowers loader) fill the two grass pockets
either side of the path down to the bridge, between the sidewalk and the river. Spots were generated
AND vetted live in-page against the newly wandering gravel: center plus six 0.65..0.9 offsets all
raycast onto grass, >=1.9 from the older flowers, >=1.6 from every remaining trunk, >=2.05 pairwise.
73 trees / 241 flowers now, all audited on grass, zero console errors. NEXT UP (user): petal colour
development and variation (`PETAL_COLORS` in the flowers loader is still empty, which keeps every
petal the stock pink).

**PETALS REBUILT: one head per stem, one flat color each (2026-08-27, NOT committed or deployed):**
an intermediate pass colored the three petal ISLANDS of the model's petal mesh separately, which
produced multicolored stacks; the user pointed out that those three heads are all jammed onto ONE
stem in flowers.glb (measured in plant space: three interpenetrating islands at x -0.42..-0.49,
z 0, y 0.60..0.92) and asked for that head placement to be REPEATED on the plant's other stems,
each head a single flat color, KEEPING the model's own style. Final shape of it, in the
`public/lego.html` flowers loader:
1. **The plant has FOUR stems**, arcing out at -x / +z / +x / -z (measured off the green mesh's
   islands: centers +/-0.46 at the tip, tops y 0.844, 90 degrees apart and identical), so a head
   sitting on one stem lands exactly on another when rotated about the plant's own Y axis.
   Placement is just `plantMatrix * rotY(k*90deg)`; nothing is re-oriented or re-styled.
2. **The model's own petal mesh is REMOVED from every plant** (`petalProto` match, detached in
   `plant()`), and its BIGGEST island is lifted out once as a kit geometry in plant space (the same
   socket-recenter + K scale `plant()` applies), re-indexed into `petalGeo`. The two smaller
   islands are the duplicate heads and are dropped.
3. **The ONE correction to the authored placement**: with the stack reduced to a single head, the
   stalk's tip showed through the head's hole. That hole runs right THROUGH the plate (the real
   piece is hollow underneath and swallows the stud) and is far wider than the stalk (hole r ~0.08
   vs tip r ~0.055), so merely clearing the top face was not enough: at 0.010 of clearance the tip
   still read as poking out. The kit is lifted along its OWN normal until the tip meets the plate's
   UNDERSIDE at the hole, 8mm of stalk left inside it, the way the real plate sits on a stud
   (measured lift 0.0803; verified on all four stems: the stalk ends 0.064..0.068 below the top
   face and 0.005..0.008 up inside the hole). Tilt, spot on the stalk and look are untouched.
   The head's normal is taken from its BIGGEST FACES (area-weighted, sign-aligned, turned upward):
   averaging up-ish VERTEX normals is off by tens of degrees because of the rim and petal edges,
   and an early attempt that rotated the head onto the stem axis using that bad normal skewered
   the flowers.
4. **Every head in the world rides in ONE InstancedMesh** (`window.__petals`, 604 instances, added
   after all the cluster loops), material `petalMat` = the model's petal material cloned to white
   and regMat'd at 0.5, so the day cycle still drives its sheen and each head takes a per-INSTANCE
   flat color. Draw calls went DOWN (1072 -> 830): each plant lost its petal mesh and the world
   gained one instanced draw.
5. **Counts and colors**: `PETAL_N` weights how many stems flower (1/2/3/4 at 20/30/30/20; measured
   over 241 plants: 56/61/70/54, 604 heads). Each head independently picks a hue and one of FIVE
   shades of it (`PETAL_HUES`, reds/blues/yellows deep to light), so a red head can sit next to a
   blue and a yellow on the same plant, and no head is ever multi-colored.
Verified in the dev server (dev-water, port 5481) at midday and full night, close up on a 4-head
plant from above, at head height and from a low angle, plus wide over the bridge meadow: heads keep
the model's tilt, no stalk tip shows above any petal, 20.3M tris / 830 draw calls, zero console
errors. NOTE for future checks: "no green above the head's top plane" is NOT the right test, the
hole is wide enough that a flush tip still reads as poking; test against the plate's underside.

**FLOWERS RE-LAID: one even scatter over the whole map (2026-08-27, NOT committed or deployed):**
the flowers had grown out of seven hand-written cluster lists stacked up over as many sessions
(`pairs`, `extra`, `more`, `ruinsBack`, `fresh`, `spawnArea`, `bridgeArea`), so the map read as
knots of flowers with bare acres between them. All seven are GONE, replaced by a single generated
`SPOTS` list in the `public/lego.html` flowers loader: 243 sites / 461 plants (was 241 plants).
1. **Generation**: stratified (jittered-grid) sampling, one candidate per 4.4-unit cell, up to 12
   tries per cell, minimum 3.2 between sites. The grid is what guarantees no bald region; the
   minimum distance is what stops clumps. Cluster size 1..3, its members at the same 0.74 offsets
   the old lists used.
2. **Vetting** ran in-page against REPLICAS of the loader's own ground math (onPad / onWalk /
   riverAt / onHousePlate, built on the shared module-scope wob / rrect / fringe / shopPad, so the
   replica and the tiles cannot drift), cross-checked against raycasts of the real ground (278
   samples, 6 disagreements, all of them the replica being conservative). Each site needed: centre
   plus a 0.62 ring on grass, every cluster member's own spot on grass, >=1.8 from a tree trunk,
   >=2.2 from a lamp, 2.4 from the spawn point, 0.8 past every prop bbox, 0.7 past every structure.
   Coverage over 2176 grass samples: nearest flower 1.84 at the median, 4.66 at p99, 6.55 worst
   (a gap inside the mansion courtyard). Post-load audit: all 461 plants raycast onto grass, 0 on
   grey or water.
3. **A plant is no longer a model clone.** The stalks are one shared geometry (same model, same K,
   only spot and facing vary), so `plant()` now just records a Matrix4 and the whole meadow draws
   as ONE InstancedMesh (`window.__stems`), exactly as the heads already do (`window.__petals`).
   Two draw calls for every flower on the map: 461 plants + 1142 heads now cost FEWER calls than
   241 plants did before (645 vs 830), and load does 0 model clones instead of hundreds.
   `petalProto` and `nPlanted` went with the clone path.
Verified in the dev server (dev-water, port 5481) at midday and full night, from an elevated survey
of the whole map, over the river/bridge quarter, and at eye level on the spawn lawn: flowers reach
every open patch with no clump and no bare acre, none on any path, 22.8M tris / 645 draw calls,
zero console errors. Re-run the generator if the paths, river, trees or structures move.

**MANSION GROUND: the green seam was the FAR LAND, not the model's size (2026-08-27, NOT committed
or deployed):** the user reported the mansion ground still wrong and suspected the model had been
imported at the wrong size. It has not: measured off the loaded glb, the model's stud radius is
0.1134 against the world's 0.1133 (median over 1302 studs, 0.1% out), it carries rotY exactly -PI/2,
and rasterising every triangle below y 0.03 into a stud grid reproduces `HP_ROWS` almost cell for
cell (1 mask-only cell, 25 real-only, all of them low wall/eave overhangs at the edges). The mask and
the model agree. Two real defects, both fixed in `public/lego.html`:
1. **The FAR LAND sheet was winning the depth test in the mansion's plate-edge slivers.** Measured
   heights: code tile top `plateTop` -0.0673, the model's plate top -0.0711, far land was
   plateTop-0.010 = -0.0773, and the recessed plate-edge filler cells (`HPY`) were plateTop-0.020
   = -0.0873, i.e. UNDER the far land. This tile grid and the model's are a quarter stud out of
   phase, so every boundary cell shows a 0.05..0.09-wide sliver of itself, and in that sliver the
   far land drew instead of the filler: a green hairline running right around the mansion's whole
   plate layer, which is what read as a gap in the ground. Fixed by opening the gap from both ends:
   far land to plateTop-0.018 and `HPY` to plateTop-0.012, so the filler now sits 0.006 above the
   far land and 0.008 below the model's plate (the model still wins the surface everywhere).
   Verified by raycast across the seam at x 47.5..47.95: the sliver now returns the grey filler at
   -0.0793, not the far land. The far land drop is invisible: the apron edge is ~9 units past the
   furthest the player can walk, and a south-rim view over the apron shows the same seamless
   handoff into the bump-mapped sheet as before. LESSON: any code ground drawn below plateTop-0.01
   is behind the far land, so recessing a cell "out of the way" hides it and shows green instead.
2. **The channel beside the Porsche is paved.** `modern_house.glb`'s plate layer leaves a 4-stud gap
   open between the door path and the driveway (mask columns 22..25), which grassed a strip of lawn
   straight through the middle of the mansion's pavement where the Porsche parks. New
   `mansionDrive(x,z)` next to `onHousePlate`, OR'd into `onPad` and into the gravel `gritty` test,
   paves it: x 43.15..49.46, z 1.11..3.11. Straight edges, no `wob` wander, because both long sides
   butt against a dead-straight plate edge. The rect deliberately overruns ~2/3 stud INTO the mask on
   every side: those cells still give way to the model (studless, recessed), and painting them grey
   makes the phase sliver read as pavement instead of lawn. The west end runs into the sidewalk,
   which is more than a stud wider than x 43.15 all down this stretch. THE LAWN ON THE OTHER SIDE OF
   THE PATH, in front of the window, is deliberately left as grass.
Verified in a shared dev tab (port 5501; five servers were held by other sessions) at midday and
night from the user's own vantage, top-down over the whole front, close-up on both seams, in front of
the window, and over the south apron: pavement continuous from the walk through the channel to the
driveway, no green hairline anywhere on the mansion's plate perimeter, lawn and flowers intact, the
About prompt still fires, zero console errors. Verification technique: an in-page `__view(eye,look,
fov)` wrapper on `renderer.render` plus `__D.step(1/60)` pumping (nothing of it is in the source),
and reading the top raycast hit's INSTANCE colour to tell matGrey from matGreen from the far land.
Watch out: the title-bubble build animation (white fill, black outline, `__lamp_tmp` delivery brick)
floats over this area and looks like a hole in screenshots; hide anything matching /lamp_tmp|Buble/
before judging the ground.


Note: since `lego.html` is now the public My Space and is still WIP, be mindful that changes here affect the live site — deploy (`npm run deploy` or build+commit+push `docs/`) only when the user asks.

**FOG PUSHED BACK FOR SPAWN VISIBILITY (2026-08-27, NOT committed or deployed):** `scene.fog` in
lego.html (line ~137) is now `Fog(0x0c1120, 34, 76)` (was 28/62). Reason: from the spawn point
(-4.81, -1.38) the mansion's near face sits ~52 units away, so at far 62 it was ~79% fogged and
barely readable; the user wanted at least a bit of every structure visible from spawn. At 34/76 the
mansion reads clearly (~41% fog), and the shop (~28), run-down house (~35) and ruins (~24) are
essentially clear. Verified in the dev server (new `dev-fog2` launch config, port 5441) at midday and
full night, looking from spawn toward all four structures, plus an elevated west-facing survey: the
background woodland still layers into the haze with no plate edge, seam or void anywhere, zero
console errors. Note: the run-down house is partly hidden from spawn by TREES, not fog.
Verification technique reused: `__D.step(1/60)` frame pumping plus an in-page `__view(eye,look,fov)`
helper that wraps `renderer.render` with a hand-placed camera (nothing of it is in the source). The
third-person camera at spawn sits inside a tree trunk, so use the hand-placed camera, and tp the
figure away first or the eye ends up inside its head. `__D.tp` takes (x, z), not (x, y, z).

**COFFEE SHOP PORTAL: THE WHOLE GREY PAD PROMPTS (2026-08-27, NOT committed or deployed):** the
"Press E · Enter" prompt used to fire only within `2*PITCH+PRAD` (~0.9) of the shop's SOLID cells
(walls, counter, pole) or 2.0 of the door point, so the open front patio and most of the grey ring
around the building were dead: you could stand on the shop's own ground and get nothing. Now the
grey pad ITSELF is the trigger. In `public/lego.html`:
1. **`wob`, `rrect`, `cl`, `fringe` hoisted out of the ground loader** to module scope (just above
   `const gltf = new THREE.GLTFLoader()`), plus a new `shopPad(x,z,m)` = the coffee shop's pad
   predicate (`rrect(x,z,-23.48,-16.38,-30.17,-19.96,1.1) < fringe(x,z)+(m||0)`). `onPad`'s shop
   branch now calls `shopPad(x,z)`, so the tiles and the trigger are laid from ONE outline and can
   never drift apart. The four locals were deleted from the loader; `ruinsPath`/`rdPath`/`onPad`
   pick them up from the outer scope unchanged.
2. **`PORTALS.professional` gained `zone:(x,z)=>shopPad(x,z,0.2)`**, and `portalAt` tests
   `P.zone && P.zone(px,pz)` before the old cells/door checks (after the existing y-gate, so the
   floor rule still holds). The 0.2 margin exists because tiles are classified per STUD CELL: a cell
   whose center is just inside the boundary still draws a 1x1 piece reaching ~0.185 further out, so
   without it the outermost half-stud of visible grey would not prompt.
   The pad rect encloses the shop's whole footprint (bbox x -23.41..-16.49, z -30.08..-20.17), so
   this covers the patio, the ring of grey around the walls, and the wandering gravel fringe,
   ending where the grass and the sidewalk begin.
Verified in a shared dev tab (port 5501; all 5 server slots were held by other chats, so no new
launch config was started, though `dev-portal`/5541 was added to `.claude/launch.json`): an ASCII
`portalAt` map over x -26..-13.5 / z -32..-17 shows the whole pad returning `professional` and
nothing outside it; probes at the patio center, both front grey corners, the pad's north rim, the
west strip and the back all prompt; the sidewalk gravel, the grass, and mid-map do not; E still
enters the menu and Esc still exits to (-19.95,-18.56), which is OUTSIDE the zone so there is no
re-prompt loop; creative/about/nabu unaffected; zero console errors. New debug hooks
`__D.portalAt` and `__D.shopPad` (strip with the rest of `__D`).

**TITLE BUBBLES: LEGO speech bubbles that build themselves as you walk up (2026-08-27, NOT committed
or deployed):** the user added a "Lego Speech Bubble 01" MOC to the blend and asked for it to be the
title display for the structures, built by a pop-up animation that only runs once the player is near.
Exported `public/assets/speech_bubble.glb` (the fill + outline meshes, Draco, 4KB, selection-only from
temp duplicates; blend untouched and NOT saved). EXPORT TRAP hit once: the meshes are parented to an
empty with scale 0.00732, and `obj.parent=None` KEEPS the local matrix, so clearing the parent before
stamping `matrix_world` back on is the only order that comes out at world size (the first export was
136.6x too big, 432 units tall).
In `public/lego.html`, a new TITLE BUBBLES block right before the portal DOM lookups, plus
`updateBubbles(dt)` called from frame() next to `ruinsDoorTeleport()`:
1. **Proximity + build**: each bubble carries a progress `p` that runs 0 -> 1 over BUB_BUILD (1.35s)
   while the player is inside BUB_NEAR (28) and back to 0 past BUB_FAR (33), so it dismantles in
   reverse when you leave. The shell reveal is a **moving clip plane** (`renderer.localClippingEnabled`
   is switched on here; each bubble clones its two materials so it gets its own `THREE.Plane`), stepped
   into BUB_COURSES (6) discrete courses so it stacks up like brick rows instead of sliding; each new
   course lands with a squash (`pop`) and is delivered by a small 2x1 brick that arcs up and vanishes
   as the course appears. Then the title **prints letter by letter** onto the white fill.
2. **Title canvas** (`bubbleTex`): letters are laid out ONCE at their final x positions and drawn
   n-at-a-time, so the text prints in place instead of sliding as it grows. The layout is deferred to
   the first draw and refuses to run until `document.fonts.check` says Fredoka is really loaded
   (fallback metrics would misplace every letter); `draw()` returns false in that case and
   updateBubbles retries next frame.
3. **Placement is driven by what the camera can SEE, not by the rooflines.** The third-person camera
   looks slightly down: measured by projecting test points, the top of the frame at distance d sits at
   world height ~2.52 + 0.19*d, so a sign over a 6.6-high roof is off-screen by the time you are close
   enough to read it. Only the low coffee shop wears its bubble over the roof; the three tall
   structures wear theirs OUT FRONT of the entrance with the tail pointing at the door. Spots are
   `[x, bottom y, z, base yaw, swing limit]`: professional [-19.95,3.70,-24.60,0,3.2] (free swing),
   creative [19.90,3.00,-18.60,0,0.62], about [44.60,3.00,0.20,-PI/2,0.62],
   nabu [-2.37,3.00,11.60,PI,0.62]. The billboard is yaw-only (the tail always points down) and the
   front-mounted ones are CLAMPED to +/-35 deg off their base facing, so the far edge (half width
   2.73 * sin35 = 1.56) can never sweep into the wall behind them. Base yaw must face the approach:
   getting nabu's wrong (0 instead of PI) showed the blank BACK of the sign.
4. **The portal prompt no longer carries the name**: it is now just "Press E · Enter" ("Enter" on
   touch), per the user, because the title lives on the bubble.
Verified in a dev server (port 5501, shared with another session; five servers were already running so
no new one could start) at midday and full night: all four bubbles build, print their real portal
label, idle-bob, and dismantle when you walk away; framed and legible from ~28 down to ~18 units at
every structure (closer than that they ride up out of frame, which is inherent to a sign above a
door); prompt reads "Press E · Enter"; 20.2M tris / 1076 draw calls (+~44 calls, negligible); zero
console errors. New debug hook `window.__bub` (strip with the rest of `__D`). New `dev-bubble` launch
config (port 5521). CAUTION: another session was editing `public/lego.html` and CLAUDE.md at the same
time, so every edit here was made as an anchored string replace, never a rewrite.

**TITLE BUBBLES, second pass (2026-08-27, NOT committed or deployed):** per the user, in `lego.html`:
1. **NABU moved onto the balcony**: spot is now `pos:[0.30,4.80,14.60]` with a FREE swing (sw 3.2),
   hovering over the ruins balcony just clear of the crystal (top 4.6). Free swing because it is read
   both from the ground walk-up and from the balcony itself, and a clamped facing showed its blank
   back from one of the two. Verified clear: the nearest thing tall enough to hit (the upper storey at
   5.8, z 17.5) is 3.0 away versus the 2.73 half width.
2. **Bubbles now PITCH down toward the camera.** `holder.rotation.order='YXZ'` (yaw first, so the
   pitch tilts about the sign's own x axis, not the world's), and each frame the tilt eases toward
   `clamp(elevation angle to the camera * 0.9, 0, BUB_TILT=0.75)`. Low signs barely move (0.1 rad);
   the balcony one leans ~0.66 rad when you stand under it, so it shows its face instead of its edge.
3. **SPAWN GREETING bubble.** A fifth, non-portal entry (`spawn`) carrying its own `text`, 12 units
   down the starting sightline at `pos:[-11.40,1.10,-13.09]`, scale 1.4, 3 lines. It keys off the
   SPAWN POINT (`at:[-4.43,-3.325]`, near 6 / far 10), not off itself, so walking away dismantles it
   before you reach it, and it holds at 0 until `entered` (set when the controls card's Enter is
   clicked) so the user actually watches it build. Ground under its whole span is clear sidewalk
   (raycast checked). Current copy: "Hello! Walk up to any of the structures to learn more about me.
   Keep your eyes peeled, you never know what you may find." The user is choosing final wording and
   wants an easter egg behind it (the money bricks in the pirate chest behind the run-down house are
   the candidate).
4. **BUB_SPOTS entries are objects now** (`{pos, yaw, sw, scale?, lines?, text?, at?, near?, far?,
   gate?}`), so any bubble can carry its own size, copy, trigger and facing.
5. **Text is pure black (#000000)** and `bubbleTex(text, maxLines)` now WORD WRAPS: it picks the
   largest font that fits the message in `maxLines`, lays every character at its final x/y once, and
   prints them n-at-a-time (wrapped spaces still count as characters so the reveal paces evenly).
   Text plane is 3.6 x 1.3 on a 760x275 canvas.
STILL OPEN (user's next steps): final wording for the greeting, the easter egg it hints at, and
reworking the mansion + run-down house bubbles. Known limit, by design: a sign above a door leaves
the frame as you walk right up to it (the camera looks down; the top of the frame at distance d is
around world height 2.52 + 0.19*d), so these read during the approach, roughly 28 down to 18 units.

**MANSION GROUND FIXED: the plate mask is now per stud cell (2026-08-27, NOT committed or deployed):**
the user reported greenery where it should not be and studs overlapping/glitching on the mansion's
door path and driveway. Cause, confirmed by raycast: `onHousePlate()` was tested only at each 2x2
tile's CENTER, and the gravel edge mosaic and the gravel-bit scatter did not test it at all. This
tile grid and the model's plate grid are a quarter stud out of phase (measured: 0.111 in x, 0.085 in
z), so every mask boundary cuts through tiles: whole green and grey tiles, their studs, and 1x1
mosaic pieces were left standing ON TOP of the mansion's own plates (code tile top -0.067 vs plate
top -0.071, code stud tips y 0 vs the model's 0.004..0.007, hence the doubled studs and the green
speckle). The mask itself was NOT wrong: a cell-by-cell raycast of all 38x38 mask cells against the
model matches '#' for '#' everywhere except rows 33/35 inside the house, where the ray grazes a
plate bevel 0.078..0.083 down (hidden under the roof, ignored). All in `public/lego.html`:
1. **Per-cell classification.** The tile loop now evaluates `onHousePlate` for each of the tile's 4
   stud cells alongside the grey test. Any tile with 1..4 cells on the mask goes to the mosaic, so
   only the cells the mansion actually floors give way. The `under` array and its
   `field(under,matGrey,true,-0.10)` recessed-tile pass are GONE (that whole-tile recess is what the
   mosaic now does per cell).
2. **Plate-covered cells are studless and dropped 0.02** (`HPY=plateTop-0.02`), and keep their own
   colour (grass stays green, gravel stays grey). Studless because studs are exactly what poked
   through; dropped so the model's plate always wins the surface; drawn rather than skipped because
   of the phase offset, so the leftover sliver reads as ground meeting the plate edge instead of a
   hole down to the far land. 1048 such cells.
3. **Gravel bits keep a stud's clearance** (`nearHouse()` = onHousePlate at the point and at
   +/-PITCH/2 on both axes): a bit is up to a stud wide, so sitting on the last free cell it still
   overhung the plate. The 1x2 "duo" is placed half a stud off its cell, so its shifted position is
   tested too and it falls back to a 1x1 when the far stud would reach the plate.
4. **TRAP, cost a render-loop crash:** three r128 keys the compiled program per MATERIAL, so an
   InstancedMesh that shares `matGrey` but sets no instance colours renders against a shader that
   expects `instanceColor` and throws "Cannot read properties of null (reading
   'isInterleavedBufferAttribute')" every frame. `matGrey` is only ever instanced WITH colours;
   `matGreen` only ever without. The grey filler now takes a TILE_TONES colour like the rest.
VERIFIED in a shared dev tab (port 5501; five servers were already held by other sessions, so
`dev-portal`/5541 stayed unused): over all 1444 mask cells, 1072 carry a plate and code ground is on
top of ZERO of them outside the two interior bevel rows (max 0.016 proud, under the roof); 1849
samples across and around the footprint find no hole; 300 stepped frames with no console error (the
pane's console buffer keeps stale errors across reloads, so this was checked against a logged
marker); the About portal still prompts and enters. Screenshots at midday and full night from the
user's own angle, at eye level by the Porsche, and top-down: the path and driveway read as one clean
grey, the gravel steps into the grass stud by stud, no doubled studs anywhere. The grass CHANNELS
between the door path and the driveway remain: they are gaps the user left in the model's own plate
layer and the mask matches them exactly, so they are intended, not a bug.

**SPAWN MOVED, OPENING SHOT, ONE-TIME GREETING, LATER SHOP SIGN (2026-08-27, NOT committed or
deployed):** all in `public/lego.html`, all from the user standing where they wanted the game to
open and saying "make this the spawn".
1. **Spawn** is now `snap(-2.61)/snap(-2.65)` = (-2.586, -2.586), the gravel junction where the
   spawn walk meets the ruins path, and `player.rotation.y` is seeded to PI so the figure starts
   facing away from the camera instead of easing round over the first fifth of a second.
2. **Opening camera**: `camYaw 0.62 -> 0`, `camPitch 0.2 -> 0.24`, `camDist 5.0 -> 8.45` (read off
   the user's own camera, which is why they are not round numbers). The view now runs due -z
   straight down the path.
3. **Greeting bubble** moved to the middle of that sightline, `pos [-2.59, 1.00, -14.59]`, `yaw 0`
   (rotY 0 faces +z, back toward the player), `at` follows the new spawn. Text enlarged per the
   user: `scale 1.4 -> 1.7` and `lines 3 -> 4`. WIDTH, not the line cap, is what limits the font
   (`bubbleTex` shrinks until the message fits in `lines` lines of a 760x275 canvas), so ALLOWING
   an extra line grows the type about 30% on its own; the scale adds ~20% on top. The sign then
   had to drop from y 1.85 to 1.00: at 1.85 its top corner projected to NDC 1.006, just past the
   top of the frame. Technique: project candidate world points with the live camera rather than
   guessing from the old "top of frame = 2.52 + 0.19d" rule, which was measured for the OLD camera
   and no longer holds.
4. **The greeting is now a ONE-TIME sign** (`once:true` in BUB_SPOTS, `built`/`done` on the bubble
   record, `bubInView()` next to updateBubbles). Once it has fully built, walking out of range OR
   turning the camera off it (its face point projected outside NDC +/-1.15) breaks it apart and
   sets `done`, which pins its direction at -1 for the rest of the session. It only comes back on a
   page reload. `built` is only set at p>=1, so a build interrupted half way can still be seen later.
5. **The coffee shop sign fires much later**: `at:[-22.536,-18.103]` (the shop's street lamp, stud
   snapped) with `near 9, far 12.5`, instead of keying off itself at the default 28/33. Verified by
   stepping the player down the approach: off at 16 / 12.8 / 9.6 from the lamp, built at 7.2 and in.
   IT CANNOT FIRE ANY LATER AND STILL BE READ. The camera looks down, so a sign standing over the
   shop's 3.47 roof rides off the top of the frame as you close in: measured NDC for its top edge is
   0.87 at 12.8 from the lamp, 0.93 at 9.6, 1.00 at 6.4, 1.17 at the lamp itself. Lowering it in
   place is not possible (the roof is at 3.47 and the sign's base is 3.70), moving it back over the
   roof barely helps (1.03 even at the far end of the shop), and keeping it framed at the lamp would
   need scale ~0.6. The area just north of the shop's front face (x -23.5..-16.4, z -20.1..-18.6,
   y 0.6..7) IS clear if a future pass wants to hang it out front at head height instead. Also
   checked: the OLD camera was worse here (NDC 1.42 at the lamp), so this is not a regression from
   the new opening shot.
Verified in a shared dev tab (port 5501): greeting builds centred in the opening shot and reads at
the new size; walking away and looking away both retire it and it does not return; the shop sign is
absent on the long approach and builds fully framed as the lamp comes up; creative/about/nabu
untouched at 28/33; no console errors after a logged marker. Verification notes: the third-person
camera EASES to its target (`lerp 0.2` per frame), so after `__D.tp` you must step ~50 frames before
projecting anything, or the numbers are nonsense; and the camera passes straight through tree
canopies (camCell ignores trees), so a screenshot taken from the lamp is often a faceful of leaves.

**HAIR SMOOTHED, SQUARES GONE (2026-08-27, NOT committed or deployed):** the figure's hairpiece showed
hard rectangular patches across the crown. Cause, measured in Blender: `public/assets/hair.glb` carried
8255 vertices for only 4136 triangles (every face corner split) plus BAKED CUSTOM SPLIT NORMALS, so the
renderer was drawing the model's authored faceted normals no matter what the loader did. The earlier
"exported smooth-shaded (split normals cleared)" note was about the blend object; the shipped glb still
had them. Fix, via a headless round trip (`/Applications/Blender.app/Contents/MacOS/Blender --background
--factory-startup`, user's blend never opened): import, merge by distance at bbox_diag * 1e-4
(8255 -> 2102 verts, poly count unchanged at 4136, so nothing was over-welded), clear custom split
normals, shade smooth every face, clear all sharp edge flags, re-export GLB with Draco level 6.
File 50.8KB -> 15.2KB. World bbox is IDENTICAL before and after (the loader's head-fit math is untouched),
material `mbo68726.001` and its dark brown (#060201 in-engine) survive, triangle count in-engine is still
4136. No geometry was added: the squares were shading, not silhouette, so no subdivision was needed.
Pre-edit backup: `hair_backup_before_smooth.glb` in the session scratchpad, plus before/after Blender
renders. Verified in a shared dev tab (port 5501; five servers were held by other chats so no new one
could start) at midday from behind, straight down onto the crown (the user's own angle), from the front,
and at full night from the side: completely smooth, the strand grooves and the fringe silhouette are
intact, hair still seats correctly on the head, zero console errors.

**BUBBLE PLACEMENT + TIMING PASS (2026-08-27, NOT committed or deployed):** the user wanted each
structure's sign centred on its entrance and firing much later. In `public/lego.html`'s BUB_SPOTS:
- **nabu** `[0.30,4.80,14.60]` -> `[-2.37,3.05,15.40]`, `near 11, far 14.5`. Centred on the ruins
  doorway (gap x -3.325..-1.415, centre -2.37) and seated on the balcony floor that overhangs it
  (top y 3.0, measured by raycast; nothing else stands at that x until z 24.11). Fires at 11 out,
  which is z 4.4, a little over 40% up the straight path.
- **about** `[44.60,3.00,0.20]` -> `[45.90,3.00,0.00]`, `near 11, far 14.5`. Pushed back toward the
  house and centred on the doorway, which spans z -1..1 (measured: the ray at head height passes
  through to x 50.62 for |z|<=1 and hits wall at 47.72 for |z|>=2). The +/-35 deg swing reaches
  x 47.26, still clear of the wall. 11 out puts the player about 8 short of the mansion lamp.
- **creative** `[19.90,3.00,-18.60]` -> `[20.69,3.60,-20.25]`, `near 11.5, far 15`. Centred on the
  door and firing as you step onto the bridge (its deck starts at z -8.864, 11.39 from the sign).
  It hangs in FRONT of the house, above the porch roof (3.12 at z -21.5), not over the main roof:
  the user chose the trigger when told the two could not both be had. y 3.60 is the highest it can
  sit and still frame whole from the bridge's first step.
**THE CONSTRAINT, measured, that shapes all of this:** the third-person camera pitches down 0.24,
so a sign leaves the top of the frame as you approach, and how far back you must be scales with how
high it sits. Projected NDC for each sign's top edge: a base at y 3.0-3.2 clears the frame from
about 11 out (0.98 at 11, 1.09 at 8.7); a base at 6.5 over the run-down house's roof needs about 24
(1.22 at 11, 1.08 at 20, 0.99 at 24). So the creative sign could not both float above
the roof and fire from the bridge: at 11 out its base can be no higher than 4.4, which is inside
that roof. Asked to choose, the user kept the late trigger, so the sign hangs in front of the house
instead. Shrinking it was not an option either: it would need scale ~0.6, and the text plane is then
2.16 wide at 19 units away, roughly 6px per character.
ONE MORE THING THAT CHANGES THE MATH: the player's own height feeds the camera height, so standing
on the raised bridge deck (y 1.35 at the midpoint) frames a high sign BETTER than standing at the
deck's ground-level first step. The creative sign's top edge is at NDC 0.98 from the first step and
0.84 from the midpoint. Always measure from the spot the trigger actually fires at.
VERIFICATION NOTES, both of which cost time here: (1) `camDist`/`camPitch` drift during a session
(the wheel handler, portal exits), and `__D` exposes them as SETTERS ONLY, so ALWAYS re-assert
`__D.dist=8.45; __D.pitch=0.24` before measuring framing, or the camera sits 2.3 back instead of 8.2
and every projection is wrong. (2) The camera EASES to its target (`lerp 0.2`), so step 60-90 frames
after `__D.tp` before projecting. Verified with screenshots at midday: NABU centred over the arch,
About centred on the doorway with the lamp coming up, Creative centred over the roof.

**FLOWER HEADS RESTORED TO THE MODEL'S OWN PIECE STACK (2026-08-27, NOT committed or deployed):**
the user reported a hollow ring in the middle of every flower. Cause: the petal-rebuild pass kept
only the BIGGEST island of `flowers.glb`'s pink mesh, on the theory that the other two were
duplicate heads stacked on the same stem. They are not. Measured in Blender (headless import of the
shipped glb, union-find over welded verts, per material slot): the pink primitive is exactly three
islands and they are ONE composite head, three LEGO pieces seated on the -x stem: the 456-tri petal
plate (z 0.762..1.027), a 120-tri piece under it (z 0.717..0.947), and the 132-tri centre stud
(z 0.847..1.026) that plugs the plate's hole. Dropping the last two is what left the gap. The green
primitive is separate (base, 4 arcing stems, on-axis pieces) and was never involved.
Fix in the `public/lego.html` flowers loader: the kit is now the WHOLE pink mesh, transformed into
plant space exactly as before (`applyMatrix4(matrixWorld)`, socket to the origin, uniform K), with
NO island filtering and NO lift. The lift correction went with it: it existed only because the
reduced single-plate head let the stalk tip show through its hole, and the model's own stack covers
that tip as authored. Everything else is untouched, so all the color work stands: `PETAL_HUES`
(5 shades each of red/blue/yellow), `PETAL_N` (1..4 stems flower), one flat per-instance color per
head, one InstancedMesh (`window.__petals`, 1142 heads).
Verified in the dev server (dev-water, port 5481, reused; five servers were already running): kit
geometry is 708 tris / 1712 verts, the three islands intact; head centre sits at world y 0.694 with
the plant seated at PLATE_TOP, which is exactly the model's authored 0.761 above its own base; and
an A/B against an untouched `flowers.glb` loaded in-page beside a live plant shows the same plate,
ring and centre from the same framing. Close-ups from above and at head height, plus a walk-level
meadow view, show solid centres and the colour variation intact; +288k tris (21.5M total), zero
console errors. LESSON: before treating co-located islands as duplicates, check them per material
slot in Blender at a fine weld tolerance. The JS union-find in the old pass welded at 1/2000, which
is coarse enough to fuse touching parts and made a three-PIECE assembly look like three copies.

**PORTAL CAROUSELS: open on a project, a different one each visit, drag on every row (2026-08-27,
NOT committed or deployed):** three fixes in `public/lego.html`, all in the menu carousel.
1. **`panMax` gate `n>3` -> `n>1`.** Panels sit at `(i-(n-1)/2)*PGAP`, so `(n-1)/2*PGAP` is exactly
   the travel that brings the first or last panel to the middle. Short rows (About, 3 items) had
   panMax 0, which made `clampPan` pin every drag/scroll/arrow to 0, so the row could not be moved
   at all. Any row of 2+ is now browsable, and the "Drag or scroll to browse" hint follows since it
   keys off `panMax>0`.
2. **New `openPan(P)`, called from `enterPortal` in place of `menuPan=menuPanCur=0`.** Pan 0 falls
   BETWEEN two panels on every even-length row (Professional 6, Creative 12), which is why menus
   were opening on empty space. It now centres a real panel.
3. **A different project each visit**: `openPan` picks a random index, re-rolling while it equals
   `P.lastOpen` (stored per portal), so a structure never greets you with the same project twice
   running. Every index is reachable because its `bx` is within `panMax` by construction.
Verified in a shared dev tab (port 5501): About shows the browse hint and drags (Resume -> Contact);
three consecutive visits to the coffee shop opened centred on Morning Star Dr Flyer, Colleen Dr
Flyer and Everly Care Home. No console errors. NOT changed: a drag still releases wherever you let
go rather than snapping to the nearest panel, since the ask was about the state a menu OPENS in.
Test-harness note: `Escape` then `__D.tp` then a synthetic `e` only re-enters if you pump ~240
frames after Escape (the exit tween has to finish and clear `fading`) and stand well inside the
zone: (-19.95,-19) is on the shop pad's wandering fringe and often does not prompt, (-19.95,-22)
always does. Pumping too few frames silently leaves you in the old menu and looks like the random
pick repeated.

**RENDER PIPELINE: ambient occlusion, bloom, AgX grade (2026-08-27, NOT committed or deployed):**
the user asked whether the Realm could look the way Blender's rendered viewport does. It rendered
straight to the canvas through ACES with no post FX at all, so the two things Blender gets for free
were missing: contact darkening in every crevice, and a view transform that holds saturated colour.
Both are now in `public/lego.html`, in a `PIPE` block right after the env-map setup.
1. **New vendored files** in `public/vendor/pp/`: `Pass.js`, `CopyShader.js`,
   `LuminosityHighPassShader.js`, `UnrealBloomPass.js`, `SMAAShader.js`, `SMAAPass.js`, lifted from
   the official three r128 tarball (`npm pack three@0.128.0`). The shipped `public/vendor/three.min.js`
   was verified BYTE-IDENTICAL to that release (sha256 match), so the example passes are guaranteed
   compatible. Six new `<script>` tags after DRACOLoader.
2. **One geometry pass, same as before.** `EffectComposer` is NOT used: the passes are driven by hand
   so the AO can read the depth texture the main pass already writes. Order: scene -> linear HDR
   target (with a `DepthTexture`) -> AO (half res) -> depth-aware blur x2 -> multiply into HDR ->
   bloom (adds in place) -> AgX grade -> SMAA -> screen.
   **Do NOT swap in the stock `SAOPass`/`SSAOPass`**: both re-render the whole scene into their own
   beauty target, which at ~20M tris doubles the frame.
3. **The AO is ours** (Alchemy/SAO style): a 12-tap spiral in a world-space radius, normals rebuilt
   from depth by taking, per axis, whichever neighbour is nearer (LEGO is flat planes and cylinders,
   so depth-derived normals are effectively exact and no normal prepass is needed). The per-sample
   term is CLAMPED to 1 (`min(...,1.0)`); unbounded, a neighbour a hair above the surface returns a
   huge value and the pixel crushes to black, which is what made the first version swing between
   invisible and solid black. Defaults radius 0.9, bias 0.02, intensity 4.0, strength 1.0.
4. **AgX replaces ACES** (Blender's transform since 4.0), implemented in the final grade pass, with an
   ASC-CDL style look (`slope`/`offset`/`power`) applied on the LOG-encoded value, which is where
   Blender applies its own looks. Base AgX is deliberately flat and lands about a stop under ACES, so
   a `gain` (1.45) sits on top of the day cycle's exposure; `renderer.toneMappingExposure` is still
   driven by `applyTOD`, the grade pass just reads it, so the day cycle needed NO changes.
   Defaults: gain 1.45, power 1.12, saturation 1.25, vignette 0.16.
5. **Bloom threshold is in LINEAR HDR.** A sunlit brick sits near 1.0, so the first try at 0.92 hazed
   the entire image (it read as "blown out"; measured, it was actually darker everywhere). 1.7 with
   strength 0.22 blooms only lamps, the crystal and speculars. The vendored pass allocates 8-bit
   mips, which clips exactly what we want to bloom, so they are re-typed to `HalfFloatType` after
   construction.
6. **The sky dome is now converted sRGB->linear in applyTOD** when the pipeline is on. The dome is a
   raw `ShaderMaterial`, so it never got the tonemapping/encoding chunks and was written literally,
   while `fog.color` was always treated as linear. Converting it makes the dome and the fog agree for
   the first time.
7. **The portal menu keeps the old path** (direct to screen, ACES, transparent over the blurred
   backdrop), so its approved look is untouched; `renderer.toneMapping` is switched only on mode
   change, not per frame. The portal backdrop SNAPSHOT now calls `PIPE.render()` so the blurred
   backdrop is the graded image.
8. **Touch and non-WebGL2 get the old path unchanged** (`PIPE` is null; the HDR buffers alone are
   ~130MB at 2x dpr). Verified by actually running it, not assumed: `#nopipe` on the URL forces
   `PIPE` null, which is also a live kill switch if the pipeline misbehaves on some GPU.
9. **`setSize()` reads `renderer.getDrawingBufferSize()`, never `innerWidth`** — a page that loads in
   a hidden tab reports 0 and would allocate 1x1 buffers that never recover. This is the same
   hidden-pane trap that has bitten several previous sessions.
**PERFORMANCE (measured properly; an earlier note in this file claimed a net win, which was WRONG,
it generalised from one lucky camera position).** GPU time via `EXT_disjoint_timer_query_webgl2` at
1920x1080. Whole-frame A/B across four viewpoints puts the pipeline between +1.0 and +4.4ms, but
whole-frame numbers drift a lot run to run (the same view read 18.0 and 22.4ms on two runs), so trust
the STAGE breakdown instead, taken with all five configs interleaved every frame for 20 rounds
(quartiles tight, mansion view): old direct path 22.00ms, scene->HDR + AgX only 16.44 (**5.6ms
CHEAPER**, because the old path pays MSAA (`antialias:true`) on a 20M-tri geometry pass and a plain
render target does not), +AO 16.85 (**+0.41**), +SMAA 17.02 (**+0.17**), +bloom 20.58 (**+3.56**).
So: AO and SMAA are nearly free, dropping MSAA pays for most of the rest, and BLOOM IS THE ONE REAL
COST. Net is roughly break-even, call it -1.5 to +4ms depending on view. Bloom runs at HALF
resolution for this reason (full res measured ~4.2ms; half is cheaper and visually identical, since
bloom is a wide soft glow). `__D.pipe.useBloom=false` is the lever if frames are ever tight.
CAUTION when re-measuring: warm BOTH shader variants first, because switching `renderer.toneMapping`
between the two paths recompiles every material the first time and an un-warmed run reads backwards.
Debug handles on `window.__D.pipe` (strip with the rest of `__D`): `bypass` (old ACES path, for
A/B), `debugAO` (raw AO buffer to screen), `useAO`/`useBloom`/`useSMAA`, `ao`/`grade` uniforms,
`aoStrength`. Verified in a shared dev tab (port 5501; five servers were held by other chats, so
`dev-render`/5561 in `.claude/launch.json` went unused): all four times of day, wide and macro,
coffee shop, mansion glass + Porsche, crystal at night, portal enter/browse/exit, resize at five
sizes and both pixel ratios, the forced-fallback path, `tsc --noEmit` clean, zero console errors and
no GL errors. STILL OPEN: mobile gets none of this yet (would need on-device testing), and the
22-28ms baseline is dominated by tree geometry (`tree.glb` is 79k tris each), which is where any
further frame budget lives.

**AO GRAIN FIXED: the projected sample disc was never clamped (2026-08-27, NOT committed or
deployed):** the user reported the render looking "really grainy and low quality", with blotchy
mottling all over the figure's torso, arms and hands in a close-up at a portal. Not a tuning issue,
a real bug in the AO shader in `public/lego.html`. A world-space radius projects LARGER the nearer
the surface is (`rUV = P[i][i]*radius*0.5/-P.z`), and the third-person camera auto-pulls-in against
walls and portals, so at 1.53 units from the camera the 0.9-unit disc covered **63% of the screen
height** (measured in-page, not estimated). Sixteen samples scattered that wide land on unrelated
geometry, and the blur kernel (~14 full-res px) cannot touch a pattern varying over ~700px, so it
reads as grain. Three changes:
1. **`rUV` is now clamped**: `rUV *= clamp(rUV.y, minR, maxR)/rUV.y`, new uniforms `maxR` 0.075 and
   `minR` 0.004 (fractions of screen HEIGHT; the scale is applied to both axes so the aspect ratio of
   the disc is preserved). The ceiling is the fix; the floor keeps distant AO from falling under a
   texel. THIS IS THE ACTUAL FIX, the other two are polish.
2. **Interleaved gradient noise** (`ign()`) replaces the `fract(sin(dot(...)))` hash for the
   per-pixel spiral rotation. IGN varies smoothly across a small neighbourhood, so the bilateral
   blur cancels it instead of smearing it.
3. `SAMPLES` 12 -> 16, and the blur widened (7 taps at 2 texels -> 9 taps at 3, sigma to match).
Verified at an identical PINNED camera (`__FC`) with `maxR` toggled between 999 and 0.075: unclamped,
the ground studs are a washed blotchy grey haze with no seam definition; clamped, the studs have
clean defined occlusion, the brick seams read, and the counter gets a real contact shadow. Also
re-checked at normal play distance, at the shop at night (lamp glow intact through the half-res
bloom), and the close-up that triggered the report, which is now smooth. Zero GL errors.
MEASUREMENT WARNING for future sessions: a "mean absolute difference between adjacent pixels" metric
does NOT distinguish AO noise from legitimate AO detail. It read HIGHER after the fix (0.458 vs
0.271 on the AO buffer) because tighter AO produces sharper real occlusion at geometric features.
Compare screenshots at a pinned camera instead.

**CANVAS NOW SIZED BY CSS, NOT BY THREE'S INLINE PX (2026-08-27, NOT committed or deployed):** the
user reported a constant, slightly transparent black band across the BOTTOM of the view, one thick
line with a thinner one below it. NOT REPRODUCED here despite a long hunt, so this is a
hypothesis-driven fix, not a confirmed one. What was ruled out at this window size, all measured in
page: no DOM overlay at the bottom (the touch controls are `display:none` on desktop and there is no
bottom gradient anywhere in the CSS); alpha is 255 on every row, so it is not a transparency hole;
no dark rows at the bottom edge of the render (checked the last 26 rows and a magnified 10x crop of
the bottom 40 device rows); no crisp row dips anywhere in the frame; not an odd/even half-resolution
rounding problem (tested 1200x800, 1200x801, 1201x801, 1200x799); and `WebGLRenderTarget.setSize()`
NOT resizing an attached `depthTexture` is a real gap in r128, but `setupDepthTexture` detects the
mismatch and fixes it, so that is not it either.
THE REMAINING SUSPECT, and the reason for the change: `canvas{position:fixed;inset:0}` carried NO
width/height in CSS, so the canvas layout box came entirely from the inline `style.width/height` in
px that `renderer.setSize()` writes. The page background behind it is `#12151c`, a dark near-black.
So any moment the canvas box is even slightly shorter than the viewport (a resize race, a
viewport change that does not fire `resize`, fractional dpr) shows a strip of dark page background
pinned to the bottom edge, which is exactly the reported symptom. Fixed by giving the canvas
`width:100%;height:100%` in CSS and calling `renderer.setSize(innerWidth,innerHeight,false)` in both
places (startup and the resize handler) so `updateStyle` is off and CSS owns the layout box while
three only sizes the drawing buffer. Verified: with the drawing buffer deliberately set 40 device
rows short, the canvas box still measures a full 0 gap on bottom and right (under the old code that
same mismatch would have exposed a 20 CSS px strip); render is unchanged at the correct size.
If the band survives this, it is NOT the canvas box, and the next things to check are whether it
also appears with `__D.pipe.bypass=true` (which would make it pre-existing and unrelated to the
render pipeline) and the user's exact window size / devicePixelRatio.

**TITLE BUBBLES TRIGGER ON THE BUILDING, NOT ON A POINT (2026-08-27, NOT committed or deployed):**
the user asked for the NABU sign to initiate at the same distance from every direction, and for the
same to apply to the other structures. Each portal bubble in `public/lego.html`'s `BUB_SPOTS` now
carries a `rect:[x0,x1,z0,z1]`, the structure's own footprint, and `updateBubbles` measures the
distance to that rect (0 anywhere inside it) instead of to a single point; `at` still works and the
spawn greeting still uses it.
1. **The rects are MEASURED, not guessed**: the world bbox of every vertex of each holder above
   y 0.3 (so ground plates, pads and the mansion's own plate layer are excluded and only the
   building counts). Values: shop [-23.41,-16.49,-30.08,-20.17], run-down house
   [16.28,25.09,-30.32,-21.40], mansion [47.67,57.19,-6.76,7.16], ruins [-7.20,2.76,13.90,26.00]
   (the ruins is 10 wide and 12 deep, and its balcony overhangs the doorway to z 13.90).
2. **What was wrong**: a point trigger is direction-independent only about that point, and every
   sign hangs at one end of its building (the shop's keyed off its street lamp, further off still).
   Scanning 16 approach directions, the OLD trigger fired anywhere from 0.07 to 9.49 units out from
   the ruins' walls depending on which way you came (0 to 10.68 shop, 0 to 12.76 mansion, 0.55 to
   12.64 run-down house): from the sides and the back you were pressed against the building before
   anything happened. The same scan now reads 9.48..9.50 / 10.68..10.70 / 12.79..12.80 /
   12.58..12.60 (the 0.02 spread is the scan step).
3. **near/far were re-derived so the FRONT approach fires exactly where it used to**, because those
   distances were tuned against what the camera can frame: professional 10.7/14.2 (was 9/12.5 from
   the lamp), creative 12.6/16.1 (was 11.5/15), about 12.8/16.3 (was 11/14.5), nabu 9.5/13 (was
   11/14.5). They differ per structure because the signs sit at different heights and the buildings
   are different depths, NOT because the trigger is direction-dependent. Hysteresis band kept at 3.5.
Verified in a shared dev tab (port 5501; five servers were held by other chats): the 16-direction
scan above; boundary probes just inside/outside each front trigger (off then on, all four); side
and back probes now building at the same distance out; the NABU sign framed and legible on the
front path (top edge NDC 0.87) and on the west flank, where before there was nothing; the shop sign
building from its east flank; the spawn greeting untouched on a fresh load; zero console errors.
KNOWN AND ACCEPTED: the creative and about signs are wall-mounted with a +/-35 deg swing, so
approaching from behind their building the sign builds out of sight and is already up when you come
round. The professional and nabu signs swing freely and turn to face you from any side.
Verification notes that cost time: `__D.tp(x,z)` plus `__D.step(1/60)` pumping is the harness, but
~400 stepped frames per probe times a dozen probes times ~20M tris will time the JS bridge out at
30s, so batch 3-4 probes per call at ~110 frames each; and the third-person camera sits at +z of
the player at yaw 0, so a north-facing approach needs yaw PI, an east-facing one yaw PI/2. The
camera lands inside a tree canopy at most rim and flank coordinates.

**LOOK DIALLED TO 80% + GLASS FIXED PROPERLY (2026-08-27, NOT committed or deployed):** per the
user, back the render look off from 100% and put the quality into the assets instead, glass in
particular. Both in `public/lego.html`.
1. **Master dial.** A `FULL` table holds the 100% values (ao 1.0, bloom 0.22, vignette 0.16, power
   1.12, saturation 1.25) and `setAmount(a)` lerps every one of them from neutral (a=0 is plain AgX,
   no AO/bloom/vignette/contrast look) up to FULL. ONE knob, so the look stays balanced instead of
   drifting as individual values get poked. `gain` is deliberately NOT scaled with it: that is the
   exposure calibration that stops AgX sitting a stop under ACES, so it only moves 1.45 -> 1.36 to
   hold brightness steady as `power` eases off. Default is now **`PIPE.amount=0.8`**, set right
   after `PIPE.setSize()`; `alloc()` re-applies it because bloom is constructed there.
   `window.__D.pipe.amount` is the live knob. Mean frame luma: 130.2 at 1.0, 137.9 at 0.8, 162.3 at
   0, old ACES path 154.6.
2. **THE GLASS PROBLEM WAS NEVER IN THE BLEND.** All 7 window/vehicle glass materials (shop
   TRANS-CLEAR/TRANS-TRANSLUCENT_LIGHT_BLUE x2, mansion Black_tinted_glass, Porsche MB40/MB41/MB111)
   were `side: DoubleSide` with `depthWrite:false`. A LEGO glass brick is a SOLID piece, so both its
   front and back faces were alpha blended in arbitrary order: two layers of ~50% alpha compound
   toward white, which is exactly why every window read as a milky slab you could not see through.
   `polish()`'s glass branch now sets **`m.side=THREE.FrontSide`** (one layer per brick) and drops
   the reflection from **envBase 2.0 -> 0.85** (at 2.0 they mirrored the crude painted-canvas sky
   hard enough to wash out by themselves). Verified: the shop interior (counter, shelves) is visible
   through the front windows again, the mansion's upper storey and balcony rail read as real glass
   with the interior floor and ceiling studs showing through, the Porsche windscreen reads as glass.
   NOT a Blender edit and no asset was re-exported; the geometry was always fine.
   **FrontSide does NOT cull anything**, checked from inside the shop looking out: the panes are
   solid bricks, not single planes, so a front face always faces the viewer.
   **The NABU crystal is pinned to DoubleSide in its own block** (`o.material.side=THREE.DoubleSide`)
   because it CLONES its material after `polish()` has run and would otherwise inherit FrontSide;
   its approved stacked-facet look needs both faces and its envBase stays 0.7. Re-checked at night,
   unchanged.
Verified after a fresh reload: all 7 glass materials report Front/0.85 and the crystal Double/0.7,
all four times of day, a full portal enter/exit round trip, zero console errors, no GL errors, no
context loss.

**NABU + ABOUT SIGNS RAISED (2026-08-27, NOT committed or deployed):** the user said both sat too
low. They did: their tails were buried in the structure behind them (the NABU one in the ruins'
upper storey, the About one on the mansion roofline), so they read as resting on the building
instead of floating over the entrance. In `public/lego.html`'s `BUB_SPOTS`: nabu y 3.05 -> 4.25
(shell now spans 4.20..8.14), about y 3.00 -> 4.20 (4.27..8.21).
**THE LIFT HAD TO BE PAID FOR.** The third-person camera sits at y 2.61 and pitches down 0.24, so at
their trigger points both signs were ALREADY at the top of the frame (top edge NDC 0.973 nabu, 0.954
about) and there was no free headroom at all: measured, every 0.4 of lift costs about 1.5 units of
extra standoff. Offered the choice of a full lift with a later build, a full lift with a ~15% smaller
sign, or a half lift, the user picked the full lift with the later build. So the triggers moved out
to where each sign gets back the SAME framing margin it had before: nabu near 9.5 -> 14.2 (top NDC
0.973 at the peak of the idle bob, matching the old 0.973), about 12.8 -> 18.0 (0.953, matching the
old 0.954). Hysteresis band still 3.5, so far 17.7 and 21.5. The other two signs were not mentioned
and were not touched (professional 10.7, creative 12.6).
Measurement method, worth reusing: build the sign, take `Box3.setFromObject(holder)` for its REAL
top (the analytic guess of `y + 2.129*sc + 0.65*sc` is 0.3 short, and the idle bob adds up to 0.09
more, which is the difference between uncut and cut), then project that point through a CLONE of the
live camera translated along the approach axis. The clone is exact here because the ground on both
approaches is flat, and it samples a dozen standoffs without stepping 200 frames each. To make a
sign build at a distance for measuring, mutate `window.__bub[i].near` directly, it is the live record.
KNOWN, pre-existing, and improved but not removed: the NABU sign swings freely (sw 3.2), and the
ruins has geometry from z 17.43 up to y 6.58 inside its 2.73 half-width sweep, so at about 90 deg of
swing the sign's far edge passes into the upper storey. The lift moves more of the sign above that
6.58, so there is less of it than before. Clamping the swing to fix it outright would need sw ~0.84,
which would stop it turning to face you from the sides, so it was left alone.
Verified in a shared dev tab (port 5501): both signs framed whole at their new triggers, midday and
full night, NABU floating over the arch with its tail in clear air and About above the roofline;
build/dismantle still fires at the same distance from every direction; professional, creative and the
spawn greeting unchanged; zero console errors.

**GRAVEL OVERLAP GLITCH FIXED + ORGANIC PATH EDGES AND CORNERS (2026-08-28, NOT committed or
deployed):** the user sent a screenshot of pale shimmering slivers scattered over the greys and asked
for the gravel paths to get the same shaped edges and corners the river got. Both in
`public/lego.html`, no asset changes.
1. **THE GLITCH WAS THE 1x2 GRAVEL TILE.** The scatter walks a list of stud cells and gives each one
   at most one bit, but the `duo` (1x2) covers TWO cells and nothing stopped the second cell from
   also getting its own bit. Two flat pieces then shared a top face at exactly `plateTop` and
   z-fought, which is what read as torn white shards. Audited before the fix: 59 overlapping cells
   out of 1280, EVERY one involving a duo. The scatter now keeps a `taken` set and a `free` set of
   all gravel studs: a cell already reserved is skipped, and a duo is laid only when its far cell is
   a free gravel stud (so it also can no longer hang off the path onto the grass or reach the
   mansion's plates, which the old `nearHouse` test only half covered). After: 1445 cells, 0
   overlaps. Audit snippet worth keeping: walk `window.__gravel.spots`, expand index 2 into its two
   cells by its rotation, and count key collisions on a half-PITCH lattice.
2. **`bank(u, side)`**, hoisted to module scope next to `wob`: a fixed sum of three sines with the
   two sides 11.3 apart in phase (the same trick `riverHW` uses), amplitude `BANK_A` 0.56. This is
   the thing `wob` alone cannot do: wob is a function of POSITION, so it moves both edges of a path
   together and the ribbon just breathes at an even width. Per-side phases let one edge swell while
   the other pulls in, which is what reads as hand-laid gravel.
3. **The sidewalk is now measured per side along its ARC.** `onWalk` computes t, the perpendicular
   offset and the side sign per segment and compares against `HALFW+WBASE+bank(arcLen, side)`
   (`WBASE` 0.26), so the half width runs 6.4 to 12.4 studs across, 9.5 on average against the old
   flat 8. Cumulative segment lengths are precomputed in `SWC`/`SWL`. Cheap because the loop skips
   the wander entirely outside `[HW_LO, HW_HI]`.
4. **CORNER LOBES**: a bend used to be nothing but two capsules overlapping, which turns a perfect
   arc. Every SW vertex now carries its own disc whose radius varies with the angle around it
   (`CR + 0.34*sin(3a+2.1i) + 0.20*sin(2a-1.3i)`), so junctions widen out irregularly.
5. **`ruinsPath` / `rdPath`** take the same per-side wander (`t*(0.22+0.6*bank(z*1.3, side))`,
   -0.12 to +0.56, so 5.4 to 9 studs across). Their end tapers are untouched, so the ruins doorway,
   the bridge deck corridor and the walk junctions still line up exactly.
6. **Knock-on, audited and fixed**: the wider greys swallowed 20 flower plants (3 with their centre
   on gravel). 18 clusters in `SPOTS` were moved by an in-page search that raycasts the REAL ground
   (centre + a 10-point 0.75 ring must all return matGreen or the bank material) and keeps >=1.9
   from every trunk and >=1.6 from every other plant. After reload: 461 plants, 0 centres on grey,
   3 edge grazes (was 20), 73 trees, 0 on grey.
Verified in the dev server (dev-bubble, port 5521): the shards are gone from the spawn junction shot
the user sent, path edges step stud by stud with irregular corners, no pinch breaks the walk (the
minimum half width is 1.18, both edges cannot pinch at once), zero console errors. Audit technique
that cost time to get right: `scene.children.filter(o=>o.isInstancedMesh).slice(0,12)` is the ground
set (2 tile fields, 4 shoreline meshes, 4 gravel-edge meshes, the mansion filler, the mansion green
cells); indexing `scene.children` directly grabs lights and gets every answer wrong.

**"WHAT IT IS" HERO RESHOT, FR 01 DROPPED (2026-08-28, NOT committed or deployed):** the user said
the storyboard's What-it-is photo showed the baseplate corners in the distance and left the run-down
house barely noticeable, and that FR 01 was redundant next to it.
1. **BOTH DEFECTS HAD ONE CAUSE.** The old `story_aerial_sunset.jpg` was shot from OUTSIDE the map
   with the fog temporarily widened to 42/115 so the wide would read. That is exactly what exposed
   the rim on the horizon, and it put every building far enough away to be a smudge. Trying to fix
   it by tightening the fog instead just turns the whole frame to milk: the evening fog COLOUR is a
   bright pink-grey, so at sunset anything past ~20 units washes out.
2. **FIRST ATTEMPT WAS WRONG AND WAS REJECTED.** Four low, close drone shots of the cottage were
   offered and the chosen one installed; the user came back with "these shots are too close, the
   angle and shot was okay, I wanted the camera position to stay the same but pushed forward just
   a bit and pointed slightly downward". The ask was the SAME wide aerial, dollied in. Lesson: when
   the complaint is about what is visible IN a shot, change the camera by the amount asked for, do
   not re-compose the shot.
3. **The delivered shot** is `public/assets/story/story_aerial_town.jpg` (2400x1350, 506KB):
   eye [11.868, 22.290, 31.089], yaw 5 deg toward +x from -z, pitch 34 deg down, vfov 58,
   `__D.time=0.515` (sunset), fog TEMPORARILY widened to 42/115 for the shot only. That is
   `eye [11,29,41]` at the same yaw/pitch dollied 12 units forward along its own axis; the user
   picked the closest of 6 / 9 / 12. Ruins bottom-left foreground, coffee shop left, cottage
   centre, mansion right, no plate corner, no sky band. 12 is the PRACTICAL LIMIT at fov 58: past
   it the ruins drops out of the bottom-left and the mansion is cut on the right, because the two
   sit 55 units apart. Closer than that needs a wider lens, not more distance.
   `src/App.tsx` chapter 01 points at it with a new alt.
   The old recipe's `__FC` eye [10,27,46] look [3,1,-11] does NOT reproduce the previous
   `story_aerial_sunset.jpg` on the current map (solving the camera back from that picture puts it
   at roughly (-38,35,100), well outside the plate). Do not trust those numbers.
4. **FR 01 removed** (`story_world_midday.jpg`) and the remaining frames renumbered FR 01..FR 13.
   The FILE stays: `public/lego.html` still uses it as the og:image.
5. STILL OPEN: `story_aerial_sunset.jpg` is used TWICE, and the second use (the closing "Live build"
   frame, now FR 13) still carries the old shot with the same visible rim and tiny cottage.
Capture recipe, simpler than the old one: the pane's drawing buffer is already 2560x1440, so no
resizing is needed. Wrap `renderer.render` to substitute a hand-placed camera ONLY when the camera
passed in is `__D.camera` (substituting unconditionally also hijacks the post-processing passes'
ortho camera and renders black), then `__D.step(1/60)` and `canvas.toDataURL('image/jpeg',0.93)`
POSTed as text/plain to a throwaway python receiver on 127.0.0.1:8766 (text/plain dodges the CORS
preflight). Nothing of this is in the source.

**SOUND: ambience, surface footsteps, and place-bound emitters (2026-08-28, NOT committed or
deployed):** the user asked for birds/trees/wind, gravel footsteps, concrete on the walk and grass
on the grass, gentle river noise that swells as you approach and fades as you leave, and the
run-down house creaking now and then (no sounds for the other three structures yet). All in
`public/lego.html`, in an AUDIO block that replaces the old plastic-tick footstep code.
1. **EVERYTHING IS SYNTHESISED with the Web Audio API. No sound files ship.** Nothing to license,
   nothing to download on top of an already asset heavy page, no CDN, and filtered noise plus a few
   oscillators sits in the right toy-plastic register anyway. If real recordings are ever wanted,
   this is the layer to swap.
2. **Buses**: `master` (0.65) -> `ambBus` (wind, birds, river, creaks) and `sfxBus` (footsteps).
   `initAudio()` still runs off the first gesture (Enter, key, pointer or touch) because of the
   autoplay policy. The context suspends on `visibilitychange` so a hidden tab costs nothing.
3. **Ambience**: a lowpassed noise bed whose gain and cutoff both drift on slow LFOs (wind), plus a
   quiet bandpassed hiss (leaves). Measured at the spawn with everything else silent: mean RMS
   0.009, peak 0.016, so it sits well under the footsteps.
   **Birds** are a run of 2-5 whistled notes, each a quick pitch sweep, randomly panned, every 3.5
   to 10 seconds, and their level is multiplied by daylight taken from `dayT`, so they stop at night.
4. **Footsteps follow the SURFACE.** The ground loader hands out a module-scope `surfaceAt(x,z)`
   built from its own `riverAt`/`onPad`/`onWalk`, so the sound can never disagree with the tile
   underfoot (verified: spawn 'grey', the lawn 'green', the bridge deck 'water').
   · grey = a hard tap plus 3-5 loose grains skittering after it (that scatter is what makes it read
     as gravel rather than a click) over the minifig's hollow ABS knock.
   · green = no click and no knock at all, just a short broadband swish and a soft low thump.
   · water = the bridge deck, the only place you stand over water: a hollow plank knock.
   Isolated measurements (ambience disconnected, tap on `sfxBus`) confirm the contrast: gravel
   150-700Hz -51.0dB / 2.6-9kHz -70.3dB, peak 0.054; grass -61.9 / -68.3, peak 0.037. Gravel is
   11dB heavier in the low end, grass is brighter and quieter.
5. **Place-bound emitters, both distance-faded from the PLAYER** (not the camera, so swinging the
   view around does not change what you hear):
   · RIVER: two noise layers through a shared swell gain, distance from `riverProj()`. Silent past
     26 units, ramping to a maximum of 0.24 with your feet in the shallows. Measured 0 at the far
     west, 0.068 at the spawn (16 out), 0.238 at the bank; the bed goes 0.009 -> 0.026 mean RMS as
     you walk up, about +5dB, which is present without being loud.
   · RUN-DOWN HOUSE: a wood creak every 7-17 seconds, scaled by distance to the house's own
     footprint rect, full at the walls and nothing past 24. Measured volume factor 0.98 at the wall,
     0.74 at the bridge, 0.47 mid-path, 0.12 at the sidewalk junction, 0 at the spawn. The creak is
     stick-slip: a high-Q band sweeping DOWN while its level stutters, over a low body tone; energy
     sits at 60-420Hz with nothing above 2.6kHz.
6. **A sound toggle** sits next to Leave the Realm in a new `#topright` flex row (the two are laid
   out by flex specifically so the button cannot collide with that link whatever width the font
   gives it; the first attempt hard-coded `right:158px` and overlapped by 2px). State persists in
   `localStorage['realm.sound']`. The ambience also ducks to 0.35 inside a portal menu.
**THE BUG THIS SHIPPED WITH FOR TEN MINUTES, worth remembering: an LFO connected to an AudioParam
ADDS to whatever that param holds, it does not replace it.** The river's shimmer layer had
`lfo(0.17, 0.0, 1.0, gain.gain)` on the same param the distance code writes, so the LFO's own
midpoint (0.5) became a floor the fade could never get under and the whole bed measured mean RMS
0.12, roughly ten times too loud. Swells now live on their own gain node upstream of the gain the
distance code drives.
Verified in the dev server (dev-bubble, port 5521) with an AnalyserNode tapped onto the buses: the
context runs at 48kHz, all the numbers above, the toggle mutes to exactly 0 and back, and a walk
across gravel, grass, the bridge and up to the run-down house logs no console error after a marker.
**NOT verifiable headlessly: whether any of it actually SOUNDS good.** Levels and character are the
user's call; `__D.audio` exposes `{ctx, master, ambBus, sfxBus, river, tick, creak, bird}` for
tuning, and `__D.surfaceAt(x,z)` reports the ground under a spot (strip both with the rest of `__D`).

**THE BASEPLATE BORDER, PROPERLY FIXED, AND ALL 7 IN-ENGINE STORYBOARD FRAMES RESHOT
(2026-08-28, NOT committed or deployed):** the user rejected the previous set: the border of the
base ground was still visible in both aerials, and the set had two coffee shop frames and none of
the run-down house. THREE separate defects were making that border, all now fixed in
`public/lego.html`. All were found by rendering and measuring pixels, not by eye.
1. **The far land read as a different SURFACE.** `farMat` had roughness 1 against the plates' 0.55
   and envMapIntensity 0.25 against 0.35, and the AO pass darkens the crevice round every real stud
   while a bump map gets none. Fixed with matching roughness/reflection, `FAR_TINT=0.94` for the
   missing AO, and a `uGraze` term in an `onBeforeCompile`. The tint alone was NOT enough because
   the mismatch is VIEW DEPENDENT: flat-on the two matched, but at a grazing angle the real tiles
   show the shadowed SIDES of their studs while the sheet stays flat, so it measured 19 luminance
   levels too bright. The shader darkens the sheet toward `uGraze` (0.68) by `pow(NdotV, 8)` on the
   GEOMETRIC normal. Measured after: within +/-3 levels of 150 at four times of day, five view
   angles and two different seams, against 19 before.
2. **The far land plane ENDED.** It was 360 units square, so it ran out ~180 from the map centre and
   from any elevated camera you saw two straight edges meeting at a CORNER with sky above them.
   That corner is what the user kept pointing at. `FAR_SIZE` is now 1600 (the bump repeat and the
   phase-lock offset both derive from it), so the nearest edge is 700+ units from anywhere a camera
   goes, past the main camera's own far plane of 200 and far past fog saturation.
3. **The sky dome and the fog did not agree, and the dome was in the wrong place.** Three things:
   · `bottomColor` was `fog.color.convertSRGBToLinear()` while fogged geometry uses `fog.color`
     raw as linear, so the sky was darker than fully fogged ground by construction. The TOP still
     converts (that is the approved sky depth); the BOTTOM must not.
   · The dome sat at the world origin AND its shader used WORLD position, so a camera 34 units up
     put the true horizon at h~0.27, a quarter of the way up the gradient. It now rides with the
     camera (`skyFollow(camera)` in frame(), and the capture harness does the same) and the vertex
     shader passes OBJECT space, so h depends only on view direction. Either fix alone does
     nothing: world position folds the camera height back in even when the dome is moved.
   · New `hzn` uniform (0.10) holds pure fog colour for a few degrees above the horizon before the
     gradient starts, so ground and sky meet with no step.
   Sphere segments 24x16 -> 64x40 as well, or the gradient facets visibly at the horizon.
   MEASURED: a deliberately punishing test (camera 34 up, 16 degrees of pitch, horizon dead centre)
   went from a 21-level step at the horizon to no detectable edge at all; the strongest row-to-row
   jump in the frame is now the tree line, which is real.
   NOTE: this was visible IN GAMEPLAY too, not just in screenshots.
**The 7 frames** (`f_*.jpg` in the session scratchpad, 2560x1440) and their cameras, all with
`window.__bub` hidden (a title bubble drifted into an early test frame):
 · aerial_town (chapter 01)  eye [11.868,22.290,31.089] yaw 5 pitch 34 fov 58, time 0.515
 · aerial_sunset (FR 13)     eye [46,24,26] yaw -38 pitch 32 fov 56, time 0.515
 · sunset (FR 05)            eye [6,5.2,-6] look [24,1.5,-22] fov 54, time 0.515
 · shop_evening (FR 03)      eye [-15.6,2.9,-14.2] look [-20.3,1.6,-21.0] fov 42, time 0.55
 · lamp_night (FR 02)        eye [38.4,3.0,4.6] look [45.6,2.5,-2.4] fov 48, time 0.75
 · crystal_night (FR 04)     eye [0.74,5.5,11.4] look [0.74,5.1,15.5] fov 34, time 0.78
 · figure_front (FR 01)      eye [-1.3,1.55,-6.2] look [-2.586,0.72,-2.586] fov 32, time 0.36
**Coverage was rebalanced on the user's note**: the first pass had the coffee shop twice (night
lamp and dusk) and no run-down house. The night frame now uses the MANSION lamp and the dusk frame
is the run-down cottage with the bridge, so shop, mansion, cottage, ruins and the figure each
appear exactly once plus the two aerials.
All shot at the game's REAL fog (34/76), never the widened fog the old set used: that widening is
what put the horizon in frame in the first place.

**THE 7 FRAMES INSTALLED + CHAPTER 01 RELAID AS A HERO (2026-08-28, NOT committed or deployed):**
the user approved the second pass ("these are great") and asked for the opening chapter to be laid
out the way the deleted FR 01 was: title and description, then the enlarged still below, then
everything else.
1. **Installed** all 7 reshoots at 2400x1350 (ffmpeg `-q:v 4`, 186-436KB each) over
   `story_aerial_town / figure_front / lamp_night / shop_evening / crystal_night / sunset /
   aerial_sunset`. The 7 Blender frames are untouched. `story_world_midday.jpg` stays on disk
   because `public/lego.html` still uses it as its og:image.
2. **`StoryChapter` gained a `hero` mode** (plus `heroLabel`): with it the still is NOT the right
   hand column of `ss-chapter-split` but a full-width `figure.ss-frame` UNDER the text, carrying
   the same head strip the numbered frames use ("Overview" / "In engine") and no caption, since
   the chapter body sits directly above it. New `.ss-chapter-hero{margin:40px 0 0}`. Chapter 01
   passes `hero`; the split layout stays available and is unused for now. Body measure widened
   660 -> 720 for the full-width column.
3. **Captions corrected for what the frames now show**: FR 02 is the modern house after dark (was
   the coffee shop, which the user pointed out gave the set two shop frames), FR 05 is the run down
   cottage and the river crossing at dusk, FR 13 drops "the full town" since the new aerial is a
   three-quarter view. Chapter alt text updated to name what is actually in the shot.
Verified in the dev server (dev-bubble, port 5521): the opener reads kicker, title, body, then the
aerial full width in the frame panel; the numbered frames below all load the new stills; `tsc
--noEmit` clean. Note when checking the storyboard headlessly: every frame is a framer-motion
`whileInView`, so a plain `scrollTop` jump often lands past the trigger and leaves the block
invisible. Scroll well past it, dispatch a `scroll` event, then scroll back.

**[SUPERSEDED, REVERTED] HOMEPAGE STORYBOARD SNAP DECK (2026-08-28):** the user asked for
the Lego Realm storyboard to become discrete sections, each holding a fixed position with a fixed
animation into it. Confirmed the three choices with them first: SNAP DECK (not sticky pinning, not
a fixed stage), the CURRENT grouping kept as it is, and NO added chrome (no dots, rail, progress
bar or frame counter). All in `src/App.tsx`.
1. **12 sections**: the hero, then the 11 blocks exactly as they already were, so pairs stay paired
   and the closing chapter keeps its frame and button row together. Each is a `<section
   className="ss-snap">`; nothing about the composition or order changed.
2. **The mechanic is native CSS scroll snap**, not JS: `.ss-home-scroll` gets
   `scroll-snap-type: y mandatory`, each section `min-height:100dvh`, flex-centred,
   `scroll-snap-align:start` and `scroll-snap-stop:always` (so a fast flick still lands on the very
   next section instead of skipping three). No wheel or touch handlers were added, which matters
   because home deliberately early-returns from the page-flip handlers and that is untouched.
3. **THE ONE REAL CONFLICT, and how it was resolved.** "One screen per section" and "keep the
   layout" cannot both hold literally: measured at 1280x720, chapter 01 plus its hero still was
   1.54 viewports and FR 05 / FR 06 sat at 0.99-1.01 with no room for padding. Grouping and
   composition were kept; what gives is (a) the chapters' 13-15vh page-flow padding, which is dead
   weight once a block is centred on its own screen (`.ss-chapter-pad`, zeroed inside the deck),
   and (b) a ceiling on the stills so a block always fits the screen it owns. The ceiling is a
   WIDTH cap derived from the height left over, since the frames are 16:9:
   `max-width: min(1180px, calc((90vh - Npx) * 1.777))` with N per case (124 for a solo frame,
   368 for the chapter hero which carries text above it, 404 for the closing section which carries
   text AND the button row). After: all 12 sections measure exactly one viewport at 1440x900.
4. **The animation replays.** Both `StoryChapter` and `StoryFrame` went from
   `viewport={{once:true}}` with different offsets (26 and 30) to one shared
   `initial={{opacity:0,y:34}}`, `viewport={{once:false, amount:0.3}}`, so every section performs
   the SAME arrival move every time it comes back into place rather than fading once and never
   again.
5. **Fallback**: the whole deck lives inside `@media (min-height:760px) and (min-width:761px)`.
   Below that (short windows, phones) snapping is off, `min-height` is gone and the page flows
   exactly as it did before, so a section can never be taller than a screen it is locked to.
   Verified at 375x812: `scroll-snap-type: none`, normal flow, scrollHeight 7985.
Verified in the dev server (port 5521) at 1440x900: 12 sections, all exactly 900px, none
overflowing, snap type `y mandatory`, and chapter 01 / FR 05 / FR 06 / the closing CTA each
composed correctly on their own screen; `tsc --noEmit` clean.
VERIFICATION TRAP worth remembering: the browser pane throttles rAF, so a framer-motion entrance
animation freezes part way and the section screenshots as BLACK even though nothing is wrong.
Inject `.ss-snap *{opacity:1 !important; transform:none !important}` as a temporary stylesheet to
pin the motion at its end state for screenshots, then remove it. Nothing of that is in the source.

**THE SNAP DECK WAS THE WRONG READ: REVERTED, STAGGERED ENTRANCES ADDED INSTEAD (2026-08-28, NOT
committed or deployed):** the user's "fixed position and fixed animation into that position" meant
ANIMATION, not pinning. Their correction: "the layout isn't what we are changing, we are simply
adding animation to how all of the information in that specific sections comes together", text
sliding in, photos fading in, "very live here but not intense". So the deck from the entry above
is gone and the storyboard is back to the flowing layout it had.
1. **Fully reverted**: all 12 `<section className="ss-snap">` wrappers removed, the hero div back
   to its own markup, the entire deck CSS block deleted, `ss-chapter-pad` / `ss-cta-row` /
   `ss-snap-cta` gone. `grep -c 'ss-snap'` is 0. The chapter 01 HERO layout (title + description,
   enlarged still below) is NOT part of that revert: the user asked for it separately and it
   stands.
2. **Entrances are now variant-driven and staggered**, so a block assembles instead of arriving as
   one slab. Four shared variants above `StoryFrame` (`sbGroup` / `sbSlide` / `sbRise` / `sbShot`):
   the parent carries `sbGroup` with `staggerChildren:0.11, delayChildren:0.04`, and each part
   names what it does. Order in a chapter: kicker slides in from the left, heading rises, body
   rises, still fades while settling out of scale 1.035. In a frame: head strip slides, still
   fades/settles, caption rises. Travel is short (16-22px), the ease is the file's usual
   [0.16,1,0.3,1], durations 0.6-0.95: live, not busy. Back to `viewport={{once:true}}` (the deck
   had briefly made them replay on every pass, which is wrong for a flowing page).
3. **`.ss-frame` gained `overflow:hidden`** and the image sits in a `.ss-frame-shot` wrapper, so
   the head strip can slide in from outside the panel and the still can settle out of scale
   without either spilling past the border.
4. **Reduced motion**: framer-motion writes INLINE transforms, which the existing
   `prefers-reduced-motion` block cannot reach, so the storyboard container took a `.ss-story`
   class and that block now pins `.ss-story, .ss-story *` at `opacity:1; transform:none`.
Verified in the dev server (port 5521) at 1440x900: no `ss-snap` anywhere, snap type `none`, the
13 blocks flowing as before, and the stagger caught mid-flight both places (chapter: kicker at
0.271 opacity while heading, body and still were still 0; frame: head strip at 0.241 while its
still and caption were 0). `tsc --noEmit` clean.
VERIFICATION TECHNIQUE, since the pane throttles rAF and a framer-motion entrance otherwise freezes
part way and screenshots black: each `computer screenshot` forces one composite, so alternating
screenshot / read-opacity STEPS THROUGH the animation frame by frame, which is what caught the
stagger above. Nothing of that is in the source.

**PART-BUILT BLENDER FRAMES, GENTLER RIVER, SIGN + BRICK SOUNDS, CATEGORY RENAME (2026-08-28, NOT
committed or deployed):**
1. **THE FOUR STRUCTURE FRAMES RESHOT PART BUILT.** The user wanted them to look genuinely mid
   build, with the constraint "you can't just delete random vertices" and "nothing mismatching or
   overlapping". Confirmed first: the 4 structures only (skull/hair/figure untouched), built up to
   a course, each at a different stage. METHOD, which is what makes it safe: hide WHOLE BRICKS,
   never cut geometry, and only hide a brick whose BOTTOM is at or above the cut. That rule is
   downward closed, so everything still visible has its support below it and no course below the
   cut can be left with a hole. Shop / mansion / cottage are thousands of separate brick OBJECTS
   (1360 / 618 / 602 meshes), so it is a `hide_set` by world-space bbox minimum. The ruins is a
   single 278k-vert joined mesh, so there it is done per ISLAND: a union-find over the edges finds
   56,244 islands whose largest are 270 verts spanning 0.44 in Z, which is exactly one brick
   course, confirming the islands ARE the bricks; islands whose min Z is above the cut get hidden
   in Edit Mode. Cuts: shop 1.6 of 3.44, ruins 2.0 of 5.59, mansion 4.0 of 6.89, cottage 3.62 of
   6.79. Modes kept as they were: shop object mode, ruins Edit Mode (the top built course selected
   as the one going on next), mansion Shading workspace with the Black_tinted_glass node tree,
   cottage Eevee rendered viewport. Captions rewritten to describe the part-built state.
   BLENDER GOTCHAS worth keeping: (a) `bpy.ops.screen.screenshot` is still the only capture that
   works, the MCP image transport errors out; (b) the viewport does NOT redraw before the
   screenshot, so `wm.redraw_timer(type='DRAW_WIN_SWAP')` first or you photograph the previous
   framing (cost two wasted shots); (c) LOCAL VIEW EXCLUDES LIGHTS, so a temporary sun added for
   the rendered shot lit nothing until `sun.local_view_set(space, True)`; (d) setting
   `window.workspace` does not take effect within the same script, and `temp_override` with an
   area from a workspace that is not the window's current screen throws "Area not found in
   screen", so switch workspace in one call and act in the next; (e) the Sketchfab addon's
   sidebar was open in the viewport and had to be closed (`show_region_ui=False`).
   Blender was fully restored afterwards (nothing hidden, 15 copyright-risky object names renamed
   for the shots and put back, temp sun deleted, world strength restored, local views exited,
   object mode, nothing selected). The blend was NOT saved.
2. **THE RIVER WAS STATIC, now a gentle stream.** The user: "too strong, too spikey, very rash and
   doesn't actually sound like water... at full volume the water sounds very much like static."
   Cause: a very wide bandpass (Q 0.55) PLUS a 2.1kHz highpass layer, and wide-band noise with
   energy in the sibilance range is the definition of static. Rebuilt as three NARROW low bands
   (lowpass 300 body, bandpass 520 Q2.6 burble, bandpass 1050 Q3.1 ripples), each drifting on its
   own slow LFO, and the highpass shimmer layer deleted outright. Peak gains 0.24+0.02 -> 0.075 +
   0.055 + 0.030. MEASURED at the bank against the bed alone: the river now adds +7.4dB in the
   700-1800Hz band but only +1.1dB above 3kHz, where before its character was broadband; mean RMS
   at full closeness 0.0257 -> 0.0223.
3. **NABU sign**: raised 4.25 -> 5.05, which as always costs standoff (the camera pitches down), so
   near went 14.2 -> 18.3, measured as where the taller sign gets back its old framing margin (top
   edge NDC 0.965). New `maxY` field on a bubble: above that player height the sign breaks apart
   and stays down. NABU uses 1.6, which sits between the ground approach (y ~0) and the balcony
   floor (y 3.0), so taking the doorway teleporter upstairs retires the sign. Verified: at y 3.11
   the bubble is p=0 and invisible.
4. **BRICK SOUNDS on the signs.** New `brickSnap(vol, up)`: a hard click of shell on shell plus the
   hollow knock of a stud seating, the knock falling as a course goes on and rising as one comes
   off, with a drier click coming apart. Fired from the course-change branch in `updateBubbles`, so
   it tracks the existing build/dismantle animation exactly, at a volume scaled by the same
   distance falloff the rest of the audio uses. Verified: assembling caught on the sfx bus (peak
   0.0122); DISMANTLING had to be verified by counting `createOscillator` calls (5 snaps over the
   course sequence 6,5,4,3,2,1) because `__D.step` pumping collapses all five into one burst that
   is rendered and gone before a real-time analyser interval can sample it.
5. **"Creative Projects" renamed to "Personal Projects"** everywhere it appears as a TITLE:
   `src/App.tsx` (the PROJECTS entry and the chapter 01 body), `public/lego.html` (the portal
   label), `public/studio.html` (prompt label, category title, ring label) and
   `public/studio_classic.html`. The internal id `creative-projects` is NOT renamed: it keys the
   work-page theme map, the modal layout branches and the portal lookups, and it is never shown.

**AUDIO PASS 2: AUDIBLE BRICK SNAPS, BIRD CURVE, DOOR SOUNDS, CONTROLS HEADING (2026-08-28, NOT
committed or deployed):**
1. **The brick snaps existed but were inaudible.** They ran at 0.075 scaled by the full distance
   falloff, which put them five to seven times UNDER a footstep by the time a sign was at its
   trigger distance. Now 0.20 with the falloff floored at 0.55 (`0.55+0.45*fall(...)`), so a sign
   never snaps out of earshot, and the sound itself is chunkier: shell-on-shell click, a mid body
   clack, the hollow stud knock, plus a low sine seating under it.
2. **Birds hold, then die down from sunset.** The old curve was a cosine peaking at midday, so it
   was already down to 0.28 BY sunset and had been fading all afternoon. Now piecewise: 1.0 through
   dayT 0.50 (the evening keyframe, i.e. sunset), smoothstep to 0 across 0.50..0.70, silent to
   0.93, back up by first light. Verified across the cycle: 1.0 at morning/midday/late afternoon
   and at sunset, 0.84 / 0.50 / 0.16 through dusk, 0 at night, 0.20 at first light.
3. **Door sounds on entry**, wired into `enterPortal`: `doorbell()` for the coffee shop (two struck
   notes, each a sine with the classic 2.76x inharmonic bell partial and a long tail) and
   `doorOpen()` for the run-down house (latch letting go, then a stick-slip hinge creak over the
   low weight of the door swinging). The mansion and the ruins get nothing, per the user.
4. **HOW THE LEVELS WERE BALANCED, and the trap.** Peak sampling through an AnalyserNode polled on
   a timer MISSES short transients and reads long sounds fine, so it says a 0.1s footstep is
   quieter than a 1.8s bell that is actually far louder. Acting on that reading once put the
   doorbell at 21x a footstep. The right instrument is a ScriptProcessor on the sfx bus summing
   EVERY sample, compared as MEAN POWER (energy over the sound's own duration). Footstep = 21.2.
   Every deliberate foreground event is tuned to roughly 3.5-4.4x that: brickSnap(0.20) 3.55x,
   doorbell(0.17) 3.95x, doorOpen(0.135) 4.35x. Note the gains inside `doorOpen` look enormous
   (14) because a high-Q bandpass passes almost none of a noise source's energy; do not "fix" them
   by eye. `__D.audio` now also exposes `brickSnap`, `doorbell`, `doorOpen` for tuning.
5. **Controls card**: the "LEGO REALM" heading is gone and "CONTROLS" takes its place at the same
   34px Fredoka size and inherited cream colour; the small yellow `.sub` line and its CSS rule are
   removed and the h2 carries the 27px bottom margin that line used to provide.
Verified in the dev server (port 5521): real E presses at both doors fire their sound in play, the
wooden door measured at 22.16 energy from one press; no console error after a logged marker.

**RUINS: UPPER ROOM REMOVED + VINES TRANSPLANTED BACK FROM GIT (2026-08-28, NOT committed or
deployed):** the user wanted the greenery restored (past passes had stripped it) and, separately,
the second floor's walls gone so the top reads flat. Both done in one rebuild of
`public/assets/ruins.glb`. Pre-edit backup: `ruins/current_backup.glb` in the session scratchpad,
and the file was unmodified from git `0dcf428`, so it is recoverable from there too.
1. **THE DONOR IS GIT, NOT THE BLEND.** `git log` on the asset gives two revisions: `696cac4`
   (3.66MB, before any of the removal passes) and `0dcf428` (1.19MB, what we shipped). The old one
   is the SAME LINEAGE, so its coordinate space is provably identical: two materials untouched by
   every past edit (`LegoWhite` 7,656 tris, `phong2` 22,704) have bit-identical bounding boxes in
   both files. Going to the blend instead would have meant solving a transform, and CLAUDE.md
   already records that the blend's raw ruins objects do NOT match the shipped derivative.
2. **What had actually been lost**: greenery went 229,388 -> 40,112 tris, i.e. 82% of it, and the
   surviving 40k no longer reached below z 1.53 or past x +/-3.5 (the donor reaches z -0.21 and
   x +/-5.5). The stone was nearly untouched by comparison: 8,742 tris, exactly the 4 columns.
3. **THE UPPER ROOM.** A plan of the deck (max stone height per 0.22 cell) shows a rectangular room
   of tall walls with an arched doorway, and a low balustrade round the deck's outer rim. A
   height-based rule is WRONG here: it keeps the walls' own bottom course, leaving a stub outline.
   The cut is by FOOTPRINT: bricks whose bottom is above the deck (z>=2.82) AND whose centre is
   inside x[-2.45,2.45], y[-21.60,-15.25]. That is 6,613 bricks / 33,428 faces. The balustrade (497
   bricks) and the deck itself are untouched, per the user's choice. Verified before cutting by
   rendering the model with the doomed bricks in red and the kept ones in blue.
4. **ONE RULE RESTORES THE GREENERY AND HANDLES EVERY EXCLUSION**: keep a donor green face only if
   surviving stone sits within 0.40 horizontally and 0.30 vertically of it. Vines hug stone so they
   come back; the ground-level plant and flower mats sit on open floor with nothing beside them at
   their own height, so they drop (the user asked for the floor plants and flowers to stay out);
   and vines on the 4 removed columns and on the now-removed upper walls drop automatically because
   their stone no longer exists. The two balcony flower plants are excluded by an explicit box
   (they were pulled for the Tardis and crystal, and their stems would grow through the props).
   Result: 97,767 green faces kept of 229,388, against 40,112 before.
   **Island logic does NOT work on this asset**: the donor is unwelded, 114,310 islands for 229,388
   faces, nearly every triangle pair its own island (same symptom hair.glb had). Weld first if
   islands are ever needed here.
5. Final: 176,045 tris, 1.59MB (was 1.19MB).
VERIFIED in the dev server (port 5521) after installing: the top is flat with the balustrade and
the vines climb all four columns; the ground doorway teleporter still fires and lands on the
balcony at (-1.71, 3.33, 16.2), matching its documented spot; the NABU portal still triggers at the
crystal; the deck is walkable end to end at y 3.21..3.54 with no holes or blocking; zero console
errors after a logged marker. Renders of the before/after and the red/blue cut preview are in the
scratchpad (`old_wide.png`, `new_wide.png`, `wallpreview2.png`).

**RUINS: TELEPORTER OFF, BACK RAILING MIRRORED, UPPER-LEVEL COLLISION (2026-08-28, NOT committed
or deployed):**
1. **Doorway teleporter disabled**, so the stairs are the only way up and the climb can be judged
   on its own: `const RUINS_TP=false` guards `ruinsDoorTeleport()` in `public/lego.html`. Zones and
   targets are untouched; flip it back to true to restore. Verified the staircase carries the
   player up unaided: from (-1.8, 18.2) at y 0, holding W reaches y 3.34 by z 20.74.
2. **The back balcony railing is the front one mirrored.** The doorway end carried a full 219-brick
   balustrade and the far end had nothing but the tail ends of the two side runs. The front railing
   was duplicated and mirrored about the deck's own y centre (-19.435, from a deck spanning
   -23.86..-15.01 in model space), which lands it exactly on the matching blocks. A negative scale
   flips winding, so the transform is applied and every face normal flipped back. The 374 faces
   already standing in the target band were cleared first so the two ends match instead of
   overlapping at the corners. `ruins.glb` 178,299 tris / 1.62MB.
3. **UPPER-LEVEL COLLISION, a real gap this exposed.** `solidCells` is a single 2D grid built only
   from geometry at GROUND body height (`OY_LO=0.30, OY_HI=1.5`). That is what lets you walk the
   balcony at all (the cells under you are solid from the walls below, and the heightmap gives you
   a surface), but it also means NOTHING standing on the balcony is solid: before this the railing
   was scenery you walked straight through and off the edge. Raising OY_HI globally is not an
   option, because the grid is 2D and an upper storey would then block the ground floor beneath it.
   Added `ruinsUpCells`, a second grid rasterized from the ruins at BALCONY body height, consulted
   in `stepOne` only while `player.y > UP_FROM` (2.40). `rasterizeSolid` gained `ylo/yhi/only`
   parameters; `only` keeps those cells out of the ground grid.
   **The band must be MEASURED, not converted from model space.** The deck surface sits at world
   y 3.30..3.34 (the player stands at 3.343) and the railing runs to about 4.7. A first attempt at
   3.30 swallowed the deck itself and froze the player where they stood. `UP_Y0=3.62` clears the
   deck's stud tops and still catches the whole railing. 1,087 cells.
4. **Solidity audit of all four structures** (bin every vertex at body height into the collision
   grid, then ask whether that cell is solid): coffee shop 110/110, mansion 334/336, ruins 309/310,
   run-down house 215/216. Every miss is a doorway or a wall-edge cell, i.e. an intended opening.
   Walk tests at the balcony confirm all four railings now stop the player (back 24.86, front
   14.98, both sides at the central opening's edge).
   **KNOWN AND INTENDED**: the deck has two openings, at x -3.0..-1.5 / z 20.8..23.6 and
   x 0.9..1.8 / z 20.0..23.6. Those are the two stairwells. You can walk into them and drop, which
   is how you get back down; blocking them would break the stairs.
Verified in the dev server (port 5521), zero console errors after a logged marker.

**PODIUM + CRYSTAL MOVED TO THE OPPOSITE BALCONY CORNER (2026-08-28, NOT committed or deployed):**
with the upper room gone the deck is one open terrace and the Tardis/crystal read as left over in
the corner a wall used to box in, so per the user they moved to the DIAGONALLY opposite corner and
the NABU title bubble deliberately stayed where it was, over the front arch.
- Derived, not guessed: an ASCII map of `ruinsUpCells` (the new balcony barrier grid) puts the
  deck at x -3.6..2.4, z 14.4..25.4, so its centre is (-0.6, 19.9). The old spot was (0.74, 15.52),
  just inside the FRONT railing; its diagonal mirror is (-1.94, 24.28), just inside the BACK one.
  That is clear of both stairwell openings, which end at z 23.6. `loadProp` stud-snaps it to
  (-1.85, 24.38); the podium then spans x -2.71..-0.98, z 23.52..25.25, y 2.97..4.87 with the
  crystal on top at 4.87..5.37.
- `PORTALS.nabu` moved with it: door (-1.94, 3.2, 24.28), look the same point at 5.12, exit
  (-0.94, 3.2, 22.88) on the strip between the two stairwells. The eye is now (-1.94, 4.75, 22.63),
  INSIDE the deck looking back at the crystal; the old eye stood outside the front railing, which
  would have put the camera beyond the back rail here, and the deck side is the side you arrive
  from anyway.
Verified in the dev server (port 5521): the portal triggers across the new corner and at NEITHER
the old spot nor mid-deck, and still not from the ground directly below (the balcony y-gate holds);
a full E-enter / browse / Q-exit round trip works and returns the player to the balcony at
(-1.9, 3.34, 23.6); the podium clears the back railing with no clipping; the NABU bubble is
untouched at (-2.37, 5.05, 15.40); zero console errors.

**DOORWAY STUBS REMOVED + PODIUM MADE SOLID + MOVED TO THE REAL CORNER (2026-08-28, NOT committed
or deployed):** the user reported the podium/crystal were not solid and that two brick pieces from
the old doorway were still standing on the balcony. Both were real, and fixing the second exposed a
mistake in the podium's placement.
1. **The two stubs** were the bottom course of the upper room's doorway walls, at world
   x -5.13..-3.06 and -1.29..0.68, z 17.44..18.43, y 3.34..3.81. The wall cut missed them because
   it worked on ISLANDS and these pieces are geometrically CONNECTED down into the deck plate, so
   the island's zmin fell below the deck threshold and the whole island was skipped. Removed by
   FACE CENTRE instead: faces inside their two measured boxes whose centre is above model z 2.78
   (world 3.389, just over the deck's stud tops), so the deck itself is untouched. 96 faces.
   `ruins.glb` 178,203 tris / 1.61MB. Backup `ruins_prestub.glb` in the scratchpad.
   **World <-> model mapping, verified against two known features and worth keeping:**
   `world_x = -1.3*bx - 2.1407`, `world_z = 1.3*by + 45.1743`, `world_y = 1.3*bz - 0.225`
   (holder at -2.2167/-0.5/19.9503 rotY PI, child `ruins` at -0.076/0.275/-25.224 scale 1.3, and
   the gltf axis swap three_y=blender_z, three_z=-blender_y).
2. **The podium was walk-through** because `cfg.solid` calls `rasterizeSolid(holder)` at GROUND
   body height (0.30..1.5), where a prop standing on the balcony does not exist. New `cfg.solidUp`
   rasterizes into `ruinsUpCells` at balcony height instead, and only there. `tardis` uses it.
   Verified: blocked from east (stops x -3.9) and south (z 23.1), open deck still walkable.
3. **The corner was WRONG and is now right.** The first move used a deck centre of (-0.6,19.9)
   taken from a raycast scan that started at x -3.6 and so MISSED THE DECK'S WEST HALF. The deck
   actually spans x -7.05..2.56, z 14.16..25.66, centre (-2.245,19.91), so the true diagonal mirror
   of the old spot (0.74,15.52) is (-5.23,24.30), not (-1.94,24.28). The wrong spot also overhung
   the stairwell opening (which reaches x -1.38, z 23.65): a fine raycast map showed no deck under
   its south-west corner. At the correct corner all four corners and the centre have deck beneath.
   `PORTALS.nabu` follows: door (-5.17,3.2,24.38), eye (-5.17,4.75,22.20), look the door point at
   5.12, exit (-5.17,3.2,22.40).
   LESSON: never derive a centre from a scan whose bounds you chose before measuring the object.
Verified in the dev server: stub vertices remaining 0; portal fires at the new corner and not at
the old one; full E-enter / browse / Q-exit round trip returns the player to the balcony at
(-5.17,3.34,23.0); zero console errors.

**TITLE BUBBLES: APPROACH-ONLY TRIGGER (2026-08-28, NOT committed or deployed):** per the user a
portal sign is for the WALK UP to a structure, nothing else. In `updateBubbles`, a bubble with a
`rect` (the four portal signs) is now gated on three things beyond distance:
1. **Outside the footprint.** `inside` is `d < 0.01`, i.e. actually within the structure's rect,
   not merely near its border. Inside, the sign never builds. This is what the user hit most on
   the NABU one: the ruins is 10 x 12, so wandering under the balcony or standing on the deck kept
   re-raising it.
2. **Looking at it.** New `bubFacing(B)` projects a point LOW on the shell (`y + 1.0*sc`) and
   requires `z<1` and `|ndc.x|<1.0`: in front of the camera and horizontally on screen. Low on the
   shell because a tall sign rides near the top of the frame at close range and that must not read
   as looking away; horizontal only for the same reason. Standing inside the radius facing the
   other way leaves it down, and walking BACKWARDS into a structure never raises it, because the
   test is on the camera, not on the direction of travel.
3. **Arrive once.** Reaching the structure (inside the rect, or within `BUB_DOOR`=3.2 of that
   portal's `door`) breaks the sign apart and sets `B.used`, which holds it down. It re-arms only
   when you get back out past `far`, so drifting a few units back from the door does not re-raise
   it; you have to leave and approach again.
The spawn greeting is untouched: it has no `rect`, so it keeps the old point-radius rule and its
`once` retirement.
VERIFIED in the dev server, per structure: mansion full cycle (approach facing -> builds; at the
door -> apart with used=true; back in range -> stays down; out past far -> re-armed; approach again
-> builds); shop and cottage both build facing and stay down facing away at the same spot; shop
inside its footprint -> down; NABU approaching facing -> builds, same spot facing away -> down,
inside the ruins footprint -> down, standing on the balcony -> down; walking backwards into the
mansion with the camera facing away leaves it down at 17.4 out, where facing it builds. Spawn
greeting still builds on a fresh load. Zero console errors.

**RUINS GREENERY REBUILT WHOLE-PIECE + MANSION LIT FROM INSIDE + PERSIAN SKIN TONE (2026-08-28,
NOT committed or deployed):**
1. **The leftover plant fragments were my own bug.** The greenery transplant kept donor faces
   within 0.40/0.30 of surviving stone, applied PER FACE, which sliced straight through plants:
   the half near stone survived and the rest vanished, leaving flat leaves floating free and stems
   cut off. Rebuilt so the unit of decision is a WHOLE PIECE and nothing can be cut:
   weld the donor greenery (`remove_doubles` at 0.002, since the glb ships unwelded), take
   connected components (799 islands, each one LEGO piece), and keep or drop each island entire on
   a MAJORITY vote of the same hug test (>=55% of its faces with stone within 0.40 horizontally and
   0.30 vertically). 276 islands kept, 523 dropped, 98,832 faces. A vine hugs stone at its own
   height along its length and passes; a plant standing on the floor has the floor below it but
   nothing beside it and fails as a whole, which is what keeps the floor plants out.
   **Do NOT cluster islands into "plants" first**: merging islands whose boxes are within 0.06
   collapsed all 799 into 12 blobs and made the decision meaningless. After the weld, one island
   is already one piece, and that is the right granularity.
   `ruins.glb` 166,984 -> 179,268 tris, 1.14MB. Backup `ruins_prewhole.glb` in the scratchpad.
2. **The mansion's street lamp is gone** (removed from the lamppost `spots` list, which is now the
   shop only) and the house lights itself, one lamp per floor, both driven by the same day-cycle
   `lamp` value: they are pushed into `lampNodes` with `bulb:null` and their own multiplier `k`,
   and `applyTOD` now tolerates a bulbless entry.
   **The spots are MEASURED room centres**: a grid was probed through the loaded model requiring a
   ceiling above, a floor below, and a wall in all four horizontal directions, then ranked by
   clearance. Ground floor (52.4, 1.80, -2.8) has 3.2 clear on every side; upper floor
   (54.0, 5.00, -2.0) has 2.44. Floors measured at y 0 and 3.78, ceiling 3.25, roof 6.25.
   Range is deliberately short (6.5 and 5.8) and they cast NO shadows: a point-light shadow is six
   renders of a 20M-triangle scene, and without shadows a long range would throw light through the
   walls onto the ground outside. Wall exteriors stay dark regardless, because their normals face
   away from the lamp, so what reads from outside is the spill through the windows and the door.
   Debug handle `window.__houseLights`.
3. **Skin tone**: the figure is meant to look like Shyon, who is Persian, so the /TAN-SKIN/
   override is now a warmer olive mid tone, #C68B5E (was #DDB184), roughness 0.58, envBase 0.22.
   Matte and barely reflective for the same reason as before: gloss reads waxy and reflections
   wash a mid tone pale.
Verified in the dev server: the ruins reads clean from the front, the east corner and a wide view
with intact vines and no floating fragments; the mansion glows from inside at night with the lamp
gone and goes dark by day; the figure's skin reads warm at midday. Zero console errors.

**EASTER EGG, PART 1: THE CHEST'S ELECTRIC ARC (2026-08-28, NOT committed or deployed):** the first
piece of the four-arm Easter egg. Something in the pirate chest behind the run-down house is still
live, and its only tell is a sound. New `zap()` in the AUDIO block: three or four crackling bursts
over half a second (highpassed noise snap + two detuned squares with the pitch jittering) under a
low sawtooth thrum through a lowpass. Measured at 1.4x a footstep's mean power (vol 0.185) so it
reads as a cue without startling.
**It only ever fires on the approach in front of the run-down house**, across the bridge:
`ZAP_ZONE=[16.6,25.4,-21.6,-15.2]`, derived from the bridge deck ending at z -15.52 and the house's
front wall at z -21.40. The countdown (`zapTimer`) runs all the time but only FIRES when you are in
the zone and in hub mode; miss the window and it retries in 7s rather than making you wait another
two minutes, then resets to 105-135s once it plays.
Chest is at (19.95, -0.03, -28.08); run-down house footprint x 16.28..25.10, z -30.32..-21.40.
Verified in the dev server by counting sawtooth oscillators (only `zap` makes one): 1 zap after
~52s standing in the zone, then 0 more across ~28s outside it spanning several retry windows; zone
predicate true in front of the house and false inside it, on the bridge, and away to the west.
`__D.audio.zap` exposed for tuning.
STILL TO BUILD (the rest of the egg, in the user's design): "Press E · Inspect" on the chest; on
inspect the player reloads at the spawn point transformed, four tentacles as legs and arms, same
WASD; can climb ON TOP of structures; trees block and cannot be climbed; plants stay passable; jump
squashes all four tentacles then leaps, not too high.

**EASTER EGG, PART 2: THE TENTACLE RIG EXPORTED (2026-08-28, NOT committed or deployed):** the user
added a "Doctor Ocktopus ( Lego )" figure to the blend (empty root, 430 descendants, at world
6.114/-7.163/0, root scale 0.45136) and wants its four arms as a toggleable player mode.
**How the rig is actually built**, which is what makes the creep-out feasible: each of the four
tentacles is a 41-bone chain (`GLTF_created_4..7`) with **40 discrete segment meshes**, one bound
per bone, 360 verts each, all sharing `Material.001`; a 3-bone claw armature (`GLTF_created_0..3`)
sits at each tip. All four chain roots are at the same point, the figure's origin. There is also a
`FinishedRig_431` control hierarchy (MasterBone, Torso Rock, torso pivots, arm IK, pivot locks) and
four IK Target empties, but the segment-per-bone layout means the chains can be driven directly in
JS: pose bone i and everything below it follows, so "creeping out of the back" is a growth
parameter that reveals and uncurls the chain rather than a baked clip.
Exported `public/assets/tentacles.glb`: the 8 armatures, their 164 skinned meshes and the parent
empties that carry the 10x and 1.93x scales, selection-only, `export_skins=True`, NO Draco (Draco
can mangle joint indices on skinned meshes). Round-trip verified headlessly: 172 meshes, all 8
armatures with the right bone counts, 105,616 tris / 60,642 verts, one material, 164 skinned.
3.35MB uncompressed, which is 0.5% of the ~20M-tri frame. The blend was NOT saved and the selection
was restored (it was empty); note the blend has been dirty since the user added the figure.
STILL TO BUILD: the "Press E · Inspect" prompt on the chest at (19.95,-0.03,-28.08); the toggle
between minifig and tentacle mode with a key on the controls card; the per-tentacle creep-out
emergence from the player's back; walk and the squash-then-leap jump; and the movement rules
(climb onto structures, trees block and cannot be climbed, plants stay passable).

**TENTACLE MOUNT FIXED: square on the torso back, Blender length, tips restored (2026-08-28, NOT
committed or deployed):** the user reported the four arms growing out of the NECK, at the wrong
size, with no pointed tips, when they should form a square on the torso back at their Blender
proportions. Four separate defects, all in `public/lego.html`, all found by measuring rather than
by eye (the preview pane's WebGL context is dead, so nothing here is visually verified).
1. **THE NECK.** All four chains share a root JOINT at the figure's origin, but each arm actually
   begins at its **bone1**, and those four sit in a square whose centre is **1.078 ABOVE that
   shared root**. Shifting the rig by the ROOT therefore floated the square a whole 1.078 up the
   body, which is exactly the neck. The shift is now by the SQUARE'S CENTRE:
   `root.position.set(-6.152, -1.079, -6.999)`. Socket offsets in three-space, measured off the
   rig: (-0.088,1.176,-0.201) (-0.103,0.971,-0.205) (0.180,0.973,-0.123) (0.172,1.186,-0.125),
   a square 0.283 wide x 0.215 tall centred (0.038,1.079,-0.164).
2. **THE MISSING TIPS were a coil I introduced.** The update added `bend=0.055` rad at EVERY joint,
   and over 40 joints that is 2.2 radians (126 deg) of extra curl, folding the last third of each
   arm back into itself. It also rotated bone1 by a hand-made `spread` angle that fought the rig's
   own splay. Both are gone: the rest pose is now copied verbatim and the only addition is a 0.004
   rad idle breath, so the arms keep the shape and length they have in Blender. Ruled out first,
   by inspection: the glb is sound (164 meshes, all skinned, all with JOINTS_0, 8 skins) and
   `frustumCulled` was already false.
3. **THE CLAWS ARE NOT THE TIPS.** The four 3-bone armatures (GLTF_created_0..3) are the harness
   CLAMPS that bolt the arms to the back: their meshes sit at the base in a wide square sharing the
   arm sockets' centre, they have no parent or constraint linking them to the arms, and the
   `chain.length>10` filter excluded them entirely, so they sat on the back fully formed while the
   arms were still retracted. They are now collected into `tentClaws` and seated over the first
   third of the growth.
4. **SIZE, and the yaw that had to be paid for.** `tentHolder` was 0.30 by eye; it is now
   `figH/DOCOCK_H` = 1.6462/1.91 = **0.862**, which preserves the arms' Blender proportion exactly
   (reach 4.663 = 2.44x their own figure's height; in game 4.019 = 2.44x the minifig's, ~10.9
   studs). Mounted on the TORSO (`Base.1349`, model-local x -0.299..0.323, y 0.837..1.558,
   z 0.920..1.245) rather than the head or the whole bbox, found by geometry with the name only as
   a hint so a re-export cannot silently break it. The authored square is NOT flat, it carries a
   slight yaw, so two sockets sit ~0.04 deeper than the other two and at a flat standoff they were
   buried INSIDE the torso; the standoff is now measured from the rig's own deepest socket
   (`tentFrontZ`), which puts all four at z 0.837..0.907 against a back face of 0.9195.
**HOW FRONT AND BACK WERE ESTABLISHED** (headless Blender on the shipped `figure.glb`, three axes):
whole figure x -0.512..0.534, y 0.176..1.822, z 0.870..1.525, height **1.6462**; head
(`Inner-Node-jesse_dot_io-7`) y 1.365..1.822; the FACE print `sym_11.002` sits at the head's MAX z,
so **+z is the front and the back is -z**. The tentacles extend along +y_blender, which converts to
-z in three, i.e. straight out of the back, so no extra rotation is needed. Square top y 1.290
clears the head (1.365) by 0.074. Mounting is deferred to `mountTentacles()`, called from
`updateTentacles`, so it never depends on whether the rig or the figure finishes loading first.
NOT VERIFIED VISUALLY: `getContext('webgl')` fails in the preview pane even on a fresh tab, so this
pass is measured only. `window.__tent.info` reports the figure height, the scale and the mount it
resolved; **T** toggles the arms.

**TENTACLES POSED: THE EXPORT HAS NO SHAPE IN IT (2026-08-28, NOT committed or deployed):** the user
sent a screenshot of four straight metallic corkscrew rods sticking out of the figure at a shallow
downward angle, running through the ground. That is not a bug in the mount, it is the asset: read
straight out of `tentacles.glb` (a proper GLB parse, node hierarchy and world matrices, i.e. exactly
what three.js consumes), every segment bone 2..40 carries local translation **(0, 0.2464, 0) and
IDENTITY rotation**, so all four arms are **perfectly straight** (straightness 1.000, arc == chord ==
4.337 in root space) and aimed within a few degrees of each other along -z with elevations
+4.8/+10.9/-16.1/-5.1 deg. The curved Doc Ock shape in Blender comes from the rig's IK/control
hierarchy (Torso/BodyControlBoneIK/IK targets), which glTF does NOT bake; the export is the bind
pose. So "keep the Blender shape" was impossible: there is no shape to keep, and the curve has to be
built at runtime. The chain is ideal for it (uniform straight segments, local +Y axis), because a
CONSTANT rotation at every joint bends a uniform chain into a true circular arc.
1. **Aim**: bone1's local rotation is replaced outright by one that points the arm out of its own
   corner of the back square. Which corner an arm belongs to is derived from its socket's offset
   from the four-socket centroid (`a.sx`, `a.sy`), never from skin order in the file.
2. **Bend plane**: the per-joint rotation is about local X, and bone1 is ROLLED about the aim until
   local X lands on `normalize(cross(aim, UP))`, a horizontal axis. Without that roll the arms
   corkscrew sideways instead of arcing in the vertical plane they point along.
   `roll = atan2(-w . Z0, w . X0)` where X0/Z0 are the aligned frame's axes.
3. **The bend SIGN is load bearing**: -1 curls the tips down and puts the lowest joint at y -0.95,
   i.e. through the floor (this is what the screenshot shows); +1 arcs them up over the figure.
   `TENT_BEND=1`.
4. **Final pose**, chosen by sweeping aim and arc offline against the real chain: upper pair
   aim (0.90, 0.55, -0.55) arc 1.30 rad, lower pair aim (0.72, 0.16, -0.75) arc 1.10 rad.
   Verified in figBody space (feet 0, head top 1.65): sockets symmetric at
   LB(-0.121,0.929) RB(+0.123,0.931) RT(+0.116,1.115) LT(-0.108,1.106); tips upper (+/-1.34, 4.29,
   -1.05), lower (+/-1.98, 3.26, -2.25); peak 4.29, LOWEST JOINT 0.93 so nothing reaches the ground;
   no tip crosses to the opposite side. Arms are 3.74 units = **2.27x the figure's height**, ~10.1
   studs, which is the Blender proportion the user asked for and is why they tower overhead.
**HOW THIS WAS VERIFIED WITHOUT WEBGL** (the pane's context is dead, `getContext('webgl')` fails on a
fresh tab): a standalone GLB parser plus a reimplementation of the SAME quaternion math and forward
kinematics in Python (`scratchpad/glb.py`, `verify_pose.py`), run over the real chain and pushed
through the holder transform (scale 0.862, mount, model centring) into figBody space. That gives real
joint coordinates to check ground clearance, symmetry and crossing against, and is how the bend sign
and the arc values were picked. Reusable: `python3 verify_pose.py <bendsign>`.
