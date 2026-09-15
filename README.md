# Shyon Shiri portfolio

Personal portfolio at https://www.shyonshiri.com. React 18, TypeScript and Vite, with a separate Three.js Lego Realm. GitHub Pages serves the committed `docs/` directory from `main`.

## Preview and validation

```sh
npm ci
npm run dev -- --host 127.0.0.1 --port 5173
npm run check
npm run build
```

Preview: http://127.0.0.1:5173/. The check command validates TypeScript and local image, model, script and résumé references. The build regenerates `docs/`; edit source files, never generated files in `docs/`.

## Where to make updates

- `src/App.tsx`: navigation, Home, Work, Contact, project data and media viewer. Add portfolio work in `PROJECTS`.
- `src/components/SelectedWork.tsx`: the three homepage project previews.
- `src/components/AboutPage.tsx` and `.css`: biography and portrait layout.
- `src/index.css`: shared base styles. Most page styles remain in `GLOBAL_CSS` in App.tsx.
- `public/assets/`: current images, videos and 3D models. Keep full-resolution project media; use smaller preview variants where appropriate.
- `public/lego.html`: desktop Lego Realm. `realm-support.js` protects unsupported devices; `realm-unsupported.html` provides a lightweight fallback.
- `scripts/check-assets.mjs`: asset-reference validation. Add explicitly generated filename patterns to its small dynamic-reference list when introducing new patterns.

## Publish an approved site update

Review the changes first, then run `npm run deploy`. It checks the source, builds the site, stages `src/`, `public/`, `docs/` and `index.html`, commits and pushes. If you changed configuration, documentation or scripts, stage those specific files before running deploy. Confirm that GitHub Pages is serving the new JavaScript filename from `docs/index.html` before considering publication complete.

Do not commit secrets, generated diagnostics or unrelated files. Keep the source and production build in the same commit.

## Final maintenance baseline

The approved visual design and copy should remain unchanged unless requested. Test Home, Work, About and Contact on narrow phones, phone landscape, tablets and desktop before publishing. Check project galleries, media playback, close controls, keyboard focus and reduced motion. The full 3D Realm is intentionally limited to supported computers; the portfolio remains available on phones.

Seven original PNG assets were replaced by pixel-identical lossless WebP copies. Everly's homepage preview has smaller responsive variants; its full image remains available in the project viewer. The original portraits remain intact, with a mild display-time sharpening filter. About includes its full-resolution source for high-density screens.

## Desktop archive

Retired pages, unused media, original PNG files and past development scripts were moved to:

`/Users/shyonshiri/Desktop/Shyon Website Archive - 2026-09-14`

The archive contains `README.txt` and `FILE-MANIFEST.json` with paths, sizes and checksums. Nothing was permanently deleted. Historic references to `scratchpad/` in the project handoff documents now refer to this archive; restore a script to its original project-relative location before running it. Keep `AGENTS.md`, `CLAUDE.md` and the car/hero companion documents for maintenance context.
