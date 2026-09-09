# Original, uncropped source art

Full resolution originals of images that ship CROPPED in `public/assets`. The framing of
those files is baked in rather than expressed as CSS, so a reframe has to start here.

This directory sits OUTSIDE `public/`, so Vite never copies it into `docs/` and none of it
is served by the site. It costs repo size and nothing else.

## 3D_Models_Cover_Pic.jpg

2560x2000. The Personal Projects cover on the Work page.

What ships is 1262x1667, cropped to the card's aspect at its FULL height, where `object-fit:
cover` trims nothing. That is not every card size, which is the trap below. `objectPosition` on the `creative-projects`
entry in `src/App.tsx` is `50% 37%`, and the Y is load bearing.

Cropping the file to the card's aspect removed all the vertical slack, and the card is not
always that aspect: `cardH` is `min(cardW*1.32, innerHeight*0.56)`, so under a 896px viewport
it is SHORTER, the crop turns vertical and centred, and it clipped the figure's head. 37% is
solved rather than chosen: it is the single value keeping the whole figure in frame down to a
670px viewport, where the visible band equals the figure's height exactly and nothing fits.
X is permanently inert, since the card's aspect can never exceed the file's.

The original was landscape against a portrait card, so it only ever cropped horizontally and
had this problem in neither direction. Any future reframe to the card's aspect inherits it.

The shipped crop is NOT a pure crop of this file. To lift the figure clear of the caption
the bare floor strip below y 1800 was stretched from 200px to 260px, then the result cropped
at (631, 393) to (1893, 2060). The feet end at y 1794, so everything above 1800 is untouched
photograph. Reproduce with `scratchpad/card.py`, which renders the real card at 2x.

This file is also recoverable from history at `9c4e45b:public/assets/3D_Models_Cover_Pic.jpg`,
verified byte-identical (sha256 78408dbb…dceb9). It is kept here so a reframe does not depend
on anyone knowing that.
