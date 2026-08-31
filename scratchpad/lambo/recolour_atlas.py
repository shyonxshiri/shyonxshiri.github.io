# Rebuild the shared texture atlas as if every decal had been printed on a BLACK brick instead of
# a white one, so the printed panels can go black with the rest of the bodywork without losing the
# prints that are not black themselves (the gold Lamborghini shield, the red flag).
#
# The rule is one line of compositing, not a palette snap. Every texel on this atlas is a decal
# laid over the white brick: p = a*C + (1-a)*W. Re-laying the same decal over B gives
# p' = p - (1-a)*(W-B), and the coverage is estimated as a = 1 - min(R,G,B), which is exact at both
# ends (pure white is a=0 and goes to B; a fully black print is a=1 and does not move) and
# continuous in between, so the antialiased border of every print rolls smoothly onto the new
# black instead of leaving a light halo, which is what a threshold or a nearest-key snap would do.
# Done in sRGB space deliberately: the atlas's antialiasing was authored there, so that is where
# undoing it is correct.
from PIL import Image
import numpy as np, sys

SRC, DST = sys.argv[1], sys.argv[2]
BLACK = np.array([5, 19, 29], dtype=np.float32) / 255.0    # LEGO Black #05131D

im = Image.open(SRC)
has_a = im.mode in ('RGBA', 'LA') or 'transparency' in im.info
im = im.convert('RGBA' if has_a else 'RGB')
arr = np.asarray(im).astype(np.float32) / 255.0
rgb = arr[..., :3]

a = 1.0 - rgb.min(axis=2)                       # decal coverage
out = rgb - (1.0 - a)[..., None] * (1.0 - BLACK)[None, None, :]
np.clip(out, 0.0, 1.0, out)

res = arr.copy(); res[..., :3] = out
Image.fromarray((res * 255.0 + 0.5).astype(np.uint8), im.mode).save(DST, optimize=True)

# verify the three cases that matter, on the real pixels
chk = np.asarray(Image.open(DST).convert('RGB')).astype(np.int16)
src = np.asarray(im.convert('RGB')).astype(np.int16)
white = (src.min(axis=2) >= 255)
print('pure-white texels %.2f%% -> %s' % (100*white.mean(), np.unique(chk[white].reshape(-1,3), axis=0)[:3].tolist()))
dark = (src.max(axis=2) <= 12)
print('near-black texels %.2f%% -> max drift %d' % (100*dark.mean(), int(np.abs(chk[dark]-src[dark]).max()) if dark.any() else 0))
sat = (src.max(axis=2) - src.min(axis=2)) >= 60
print('saturated texels  %.2f%% -> mean before %s after %s'
      % (100*sat.mean(), src[sat].mean(axis=0).round(1).tolist(), chk[sat].mean(axis=0).round(1).tolist()))
