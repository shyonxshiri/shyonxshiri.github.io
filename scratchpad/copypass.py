# -*- coding: utf-8 -*-
"""The mirrored copy pass. Every edit is applied to BOTH src/App.tsx and
public/lego.html wherever the string lives in each, because a project's title and
description are the same asset described twice and fixing one side alone re-opens
the drift the em dash pass just closed.
Each entry declares how many hits it EXPECTS in each file; a mismatch aborts the
whole run rather than half-applying it."""
import io, sys

APP='src/App.tsx'; LEGO='public/lego.html'
files={APP: io.open(APP,encoding='utf-8').read(), LEGO: io.open(LEGO,encoding='utf-8').read()}
orig=dict(files)
log=[]

def sub(old, new, app=None, lego=None, note=''):
    """app/lego = expected occurrence count in that file, None = don't touch it."""
    for path, want in ((APP,app),(LEGO,lego)):
        if want is None: continue
        got=files[path].count(old)
        if got!=want:
            sys.exit('ABORT: %r expected %d in %s, found %d' % (old[:60], want, path, got))
        files[path]=files[path].replace(old,new)
    log.append(note or old[:52])

# ── 1. TITLES THAT WERE CATEGORIES, NOT NAMES ────────────────────────────────
# Checked against the actual asset in every case; three of these descriptions
# were not merely vague, they were describing the wrong thing.
sub("Rendered 3D Model", "Creature Head Sculpt", app=1, lego=1)
sub("Movie character modeled, textured, and rendered in Blender.",
    "A movie creature's head, sculpted and rendered in Blender. A wet, high gloss skin shader over the sculpt, lit with a single key against black.",
    app=1, lego=1)

sub("Campaign Project", "Ultron Shaver Campaign", app=1, lego=1)
sub("Conceptual brand advertisement built around scenic composition.",
    "A spec print advertisement for a fictional shaver brand. The rotary shaver is lit as the hero and its shadow runs back to the bloodied cartridge razor it replaces.",
    app=1, lego=1)

sub("Hardware Builds Together", "Radar and RGB Controller", app=7, lego=0)  # 1 title + 6 relatedItems refs
sub("The radar module and the RGB controller side by side. Each enclosure was modeled around its own board, display, and controls, then 3D printed and finished by hand.",
    "Both enclosures side by side. Each was modeled around its own board, display and controls, then 3D printed and finished by hand.",
    app=1, lego=0)

# ── 2. APPLE WRITES IT AirPods ───────────────────────────────────────────────
sub("Custom Airpod Case", "Custom AirPods Case", app=2, lego=1)   # title + 1 relatedItems ref

# ── 3. DESCRIPTIONS THAT ONLY RESTATED THEIR TITLE ───────────────────────────
# The two cases shared one sentence word for word, and "liquid metal" describes
# an intention rather than the object: both finished pieces are organic printed
# lattices, in different colours, doing different jobs.
sub("Finalized rendition of the iPhone case prototype, designed to resemble liquid metal.",
    "The finished case, printed in a metallic blue. An organic lattice replaces the flat back, its apertures shaped around the camera array and the side buttons.",
    app=1, lego=1)
sub("Finalized rendition of the Airpod case prototype, designed to resemble liquid metal.",
    "The finished sleeve, printed in purple. The same melted lattice wraps an AirPods Pro case, left open at the status light and along the hinge.",
    app=1, lego=1)

sub("Studio Photography", "Shiri Wordmark", app=1, lego=1)
sub("Studio photography focused on composition and lighting.",
    "A hand drawn wordmark set over a cropped apparel shot, chains and acid washed corduroy, framed close so the type sits on the garment rather than beside it.",
    app=1, lego=1)

sub("Studio portrait shot with controlled lighting.",
    "Caught mid laugh on a gelled teal backdrop, with the background light hot behind the head so the subject separates from it.",
    app=1, lego=1)

sub("Animated and assembled collection of images created in Adobe After Effects.",
    "A mock retro driving game, animated and cut together in Adobe After Effects from pixel art frames of a neon city at night.",
    app=1, lego=1)

sub("Portrait photography for the NABU 2023 spring collection.",
    "Two looks on a white cyclorama: the graphic tees worn over the Persian rug trousers, with the raw fringed seams left showing down the leg.",
    app=1, lego=1)
sub("Promotional video for the NABU 2025 summer collection.",
    "Promotional video for the summer drop, camp collar shirts and rug pattern shorts, shot as a flat lay on white.",
    app=1, lego=1)

# ── 4. HYPHENATION: a compound MODIFIER before a noun takes the hyphen; the same
#       words as a plain noun do not. "then 3D printed and finished by hand" is a
#       verb phrase and stays open, and About's "design, front end, and deployment"
#       is a noun and stays open. Everything below is a modifier.
sub("3D printed enclosure with LCD and speaker.", "3D-printed enclosure with LCD and speaker.", app=1, lego=1)
sub("3D printed geometric casing housing the microcontroller.", "3D-printed geometric casing housing the microcontroller.", app=1, lego=1)
sub("3D printed shell with the addressable LED strip", "3D-printed shell with the addressable LED strip", app=1, lego=0)
sub("all set into a 3D printed shell.", "all set into a 3D-printed shell.", app=1, lego=0)
sub("3D printed hardware enclosures", "3D-printed hardware enclosures", app=1, lego=0)
sub("An interactive real time 3D environment", "An interactive real-time 3D environment", app=1, lego=0)
sub("real time rendering and collision in the browser", "real-time rendering and collision in the browser", app=1, lego=0)
sub("hard surface modeling and UV work", "hard-surface modeling and UV work", app=1, lego=0)
sub("the front end engineering that ties the two together", "the front-end engineering that ties the two together", app=1, lego=0)
sub("stop motion films built from LEGO", "stop-motion films built from LEGO", app=1, lego=0)
sub("Self directed work.", "Self-directed work.", app=1, lego=0)
sub("Full stack websites", "Full-stack websites", app=1, lego=0)
sub("a LEGO inspired baseplate", "a LEGO-inspired baseplate", app=1, lego=0)

for p in (APP,LEGO):
    if files[p]!=orig[p]:
        io.open(p,'w',encoding='utf-8').write(files[p])
print('applied %d edits across both files' % len(log))
