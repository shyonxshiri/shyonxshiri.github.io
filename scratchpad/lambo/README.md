# lamborghini.glb — how it is built

Unlike the other verify scripts CLAUDE.md names, these two are BUILD INPUTS: without them
`public/assets/lamborghini.glb` cannot be regenerated. The car itself lives in the blend as
`Lego Lamborghini Countach`.

    # 1. the printed atlas, rebuilt as decals printed on a BLACK brick (only if the source changes)
    python3 recolour_atlas.py atlas_source.png atlas_black.png

    # 2. the asset. Headless, on the SAVED blend, and it never saves.
    /Applications/Blender.app/Contents/MacOS/Blender --background --factory-startup \
      "$HOME/Desktop/3D Models /My Lego World .blend" --python export_lambo.py -- \
      "<repo>/public/assets/lamborghini.glb" draco ./log.json

The source atlas is not kept here: it is the untouched `Texture_baseColor` image, extractable from
any build of the glb (see `measure.js` for the glb chunk parsing). `atlas_black.png` IS kept, so
step 1 is only needed if the model's texture is re-exported. The black baked into it is #05131D and MUST match `lego.html`'s.

Verification, neither needing a GPU:

    node measure.js lambo_raw.glb    # per-material world AABBs; run on a `nodraco` export
    node winding.js lambo_raw.glb    # area-weighted winding vote, the fixWinding() test

The live check is headless Chrome with SwiftShader against a dev server (see the
`realm-headless-webgl-verify` memory). Note Vite binds IPv6-only, so use `localhost`, never
`127.0.0.1`, which is refused.
