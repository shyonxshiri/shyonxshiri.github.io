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
- **Random day cycle** each load (`TOD` from a `TIMES` table): morning/midday/evening/night set sky, fog, sun color/intensity, hemi/ambient, exposure, rim, and lamp brightness.
- **Lampposts**: unlit in daylight, brighter as day recedes; 2×2 base; stud-snapped.
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
- **Pending 3D placements (user gave specs):** Porsche 912 on the driveway (facing out); a skull left of the ruins doorway against the wall on a stud; the Tardis stamped into the ruins balcony (where the lower balcony flower is) with the rock crystal on its top stud; remove the two red-topped balcony flowers. Assets confirmed present in the blend: `Porche 912E`, `Lego Tardis Exterior`, `LEGO Rock Crystal`, `LEGO Skull / Head skeleton low poly`, `LEGO Bizarro Superboy`.
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

Active work is on **`public/lego.html`** — the LEGO brick-build "My Space." The world currently has: a stud-matched fine 2×2 ground (green grass base + grey sidewalks/pads), a coffee shop (→ Professional Services), a modern house (→ About), a decorative ruins (→ Creative Projects, with a climbable-stairs heightmap), scattered stud-snapped trees (varied) and flowers, three day/night-reactive lampposts by the sidewalks, a random day cycle, a control-panel intro overlay, drag-to-look with camera auto-pull-in, per-geometry collision, and the first-person blurred-interior project-panel portals.

**Just completed + DEPLOYED (commit `696cac4`, pushed to `main`, live):**
- Player figure finished: **Bizarro Superboy hair + denim legs** swapped in. The legs are bound to the `hipL`/`hipR` hip pivots so the walk animation swings them (verified). `legs.glb` is in use.
- **Homepage "Enter My Space" now opens `/lego.html`** (switched from `/studio.html`). The new LEGO world is the live My Space.
- `lego.html`, all `.glb` assets, and this `CLAUDE.md` are now **committed and tracked** (they were untracked before). `docs/` was rebuilt and pushed.

**Immediate next steps (specs already provided by the user, NOT yet done):**
1. Place **Porsche 912** (`Porche 912E`) on the driveway (in front of the existing car, facing out / back to garage).
2. Place the **skull** (`LEGO Skull / Head skeleton low poly`) on the ground to the left of the ruins doorway, against the wall, on a stud.
3. Place the **Tardis** (`Lego Tardis Exterior`) stamped into the ruins balcony (lower flower spot) with the **rock crystal** (`LEGO Rock Crystal`) on its top stud; **remove the two red-topped balcony flowers.**
4. Ongoing polish: real project media/content in the portal panels (currently placeholder), removing any remaining stray non-original figures, and general look tuning.

Note: since `lego.html` is now the public My Space and is still WIP, be mindful that changes here affect the live site — deploy (`npm run deploy` or build+commit+push `docs/`) only when the user asks.
