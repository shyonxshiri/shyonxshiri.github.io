# Renders the Personal Projects card exactly as it ships.
# Values lifted from src/App.tsx: card 380x502, radius 22, brightness .95,
# gradient rgba(6,6,6,.92) 0% -> .4 42% -> 0 78%, padding 24/22,
# tag 12px ls1.5 #38bdf8 uppercase, title 24px w600 #fff, "View ->" 13px.
import os, sys, json
from PIL import Image, ImageDraw, ImageEnhance, ImageFont

SRC = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "assets-original", "3D_Models_Cover_Pic.jpg")
FIGBB = (964, 548, 1678, 1794)          # measured figure bounding box, source px
AR = 380/502.0
K  = 2                                   # render at 2x

def font(sz, bold=False):
    for p in ("/System/Library/Fonts/SFNS.ttf","/System/Library/Fonts/Helvetica.ttc"):
        try: return ImageFont.truetype(p, sz, index=(2 if bold and p.endswith("ttc") else 0))
        except Exception: pass
    return ImageFont.load_default()

def rounded(im, r):
    m = Image.new("L", im.size, 0)
    ImageDraw.Draw(m).rounded_rectangle([0,0,im.size[0]-1,im.size[1]-1], r, fill=255)
    out = Image.new("RGBA", im.size, (0,0,0,0)); out.paste(im, (0,0), m); return out

def box_for(zoom, dx, dy, anchor):
    im = Image.open(SRC); W,H = im.size
    h = min(H, W/AR)/zoom; w = h*AR
    cx = (FIGBB[0]+FIGBB[2])/2 + dx
    cy = (H - h/2) if anchor=="bottom" else ((FIGBB[1]+FIGBB[3])/2 + dy)
    if anchor=="bottom": cy += dy
    cx = max(w/2, min(W-w/2, cx)); cy = max(h/2, min(H-h/2, cy))
    return tuple(round(v) for v in (cx-w/2, cy-h/2, cx+w/2, cy+h/2))

def card(box, gradient=True, marks=False):
    im = Image.open(SRC).convert("RGB")
    CW,CH = 380*K, 502*K
    c = im.crop(box).resize((CW,CH), Image.LANCZOS)
    c = ImageEnhance.Brightness(c).enhance(0.95)          # the card's filter
    c = c.convert("RGBA")
    if marks:                                             # figure bbox, mapped into the card
        s = CW/(box[2]-box[0]); d = ImageDraw.Draw(c)
        d.rectangle([(FIGBB[0]-box[0])*s,(FIGBB[1]-box[1])*s,
                     (FIGBB[2]-box[0])*s,(FIGBB[3]-box[1])*s], outline=(255,80,80,255), width=2)
    if gradient:
        g = Image.new("RGBA",(CW,CH),(0,0,0,0)); d = ImageDraw.Draw(g)
        for y in range(CH):
            t = 1 - y/CH                                  # gradient runs "to top"
            a = 0 if t>=0.78 else int(255*(0.4+(0.92-0.4)*(1-t/0.42))) if t<0.42 else int(255*0.4*((0.78-t)/0.36))
            d.line([(0,y),(CW,y)], fill=(6,6,6,min(255,max(0,a))))
        c = Image.alpha_composite(c, g)
    d = ImageDraw.Draw(c)
    tag = "DESIGN, 3D & CRAFT"; x = 22*K; y = CH-24*K
    ft, fb, fv = font(12*K), font(24*K, True), font(13*K)
    d.text((x, y-24*K-6*K-12*K), " ".join(tag), font=ft, fill=(56,189,248,255))
    d.text((x, y-24*K), "Personal Projects", font=fb, fill=(255,255,255,255))
    d.text((CW-22*K-d.textlength("View →", font=fv), y-20*K), "View →", font=fv, fill=(255,255,255,255))
    return rounded(c, 22*K)

def sheet(items, path):
    ims = [card(b, g, m) for b,_,g,m in items]
    CW,CH = ims[0].size; pad,top = 22,30
    sh = Image.new("RGB",(pad+(CW+pad)*len(ims), top+CH+pad),(10,10,12)); dd = ImageDraw.Draw(sh)
    f = font(22)
    for i,(im,(b,l,_,_)) in enumerate(zip(ims,items)):
        x = pad+(CW+pad)*i; sh.paste(im,(x,top),im); dd.text((x,6), l, font=f, fill=(230,230,235))
    sh.save(path); print("->", path, sh.size)

if __name__ == "__main__":
    cfg = json.loads(sys.argv[1]); sheet(cfg["items"], cfg["out"])
