# Original, uncropped source art

Full resolution originals of images that ship CROPPED in `public/assets`. The framing of
those files is baked in rather than expressed as CSS, so a reframe has to start here.

This directory sits OUTSIDE `public/`, so Vite never copies it into `docs/` and none of it
is served by the site. It costs repo size and nothing else.

## 3D_Models_Cover_Pic.jpg

2560x2000. The Personal Projects cover on the Work page.

What ships is 1262x1667, cropped to the card's own aspect so `object-fit: cover` trims
nothing and the framing cannot drift at any card size. `objectPosition` was dropped from
the `creative-projects` entry in `src/App.tsx` in the same pass and falls back to `center`.

The shipped crop is NOT a pure crop of this file. To lift the figure clear of the caption
the bare floor strip below y 1800 was stretched from 200px to 260px, then the result cropped
at (631, 393) to (1893, 2060). The feet end at y 1794, so everything above 1800 is untouched
photograph. Reproduce with `scratchpad/card.py`, which renders the real card at 2x.

This file is also recoverable from history at `9c4e45b:public/assets/3D_Models_Cover_Pic.jpg`,
verified byte-identical (sha256 78408dbb…dceb9). It is kept here so a reframe does not depend
on anyone knowing that.
