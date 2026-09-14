import { useEffect, useLayoutEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import AboutPage from "./components/AboutPage";
import SelectedWork from "./components/SelectedWork";

/* ─────────────────────────────────────────────────────────────
   TYPES
───────────────────────────────────────────────────────────── */
type Page = "home" | "work" | "about" | "contact";

type MediaItem = {
  type: "image" | "video";
  src: string;
  poster?: string;
  title?: string;
  desc?: string;
  year?: number;
  link?: string;
  wide?: boolean;
  objectPosition?: string;
  scale?: number;
  removeBackground?: boolean;
  relatedItems?: string[];
  hidden?: boolean;
  aspectRatio?: string;
};

type Project = {
  id: string;
  title: string;
  tag: string;
  img: string;
  size: "tall" | "wide" | "sq";
  objectPosition?: string;
  media: MediaItem[];
};

/* ─────────────────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────────────────── */
const PROJECTS: Project[] = [
  {
    id: "creative-projects",
    title: "Personal Projects",
    tag: "Design, 3D & Craft",
    img: "/assets/3D_Models_Cover_Pic.jpg",
    size: "tall",
    // The file is cropped to the card's own aspect, so `cover` never trims the sides.
    // But cardH is min(cardW*1.32, innerHeight*0.56): under a 896px viewport the card is
    // SHORTER than that aspect and the crop turns vertical, centred, which clipped the
    // skeleton's head. 37% is the one value that keeps the whole figure in frame all the
    // way down to a 670px viewport, where the visible band equals the figure's height and
    // nothing can fit. X is inert: the card can never be taller than the file.
    objectPosition: "50% 37%",
    media: [
      { type: "video", src: "/assets/Broken_NPC.MP4", poster: "/assets/Broken_NPC.jpg", title: "The Broken NPC", year: 2024, desc: "A detailed 3D scene depicting in-game rendering errors from GTA San Andreas, created entirely using Blender.", aspectRatio: "16/9", relatedItems: [] },
      { type: "video", src: "/assets/Blender_Case_Video.mp4", poster: "/assets/Blender_Case.jpg", title: "Apple Accessory Prototypes", year: 2024, desc: "3D designed Apple product case prototypes developed using Blender.", aspectRatio: "16/9", relatedItems: ["Custom AirPods Case", "Custom Phone Case"] },
      { type: "video", src: "/assets/Shiri_Video_Game.mp4", poster: "/assets/Shiri_VIdeo_Game.jpg", title: "Retro Driving Animation", year: 2024, desc: "A mock retro driving game, animated and cut together in Adobe After Effects from pixel art frames of a neon city at night.", aspectRatio: "16/9" },
      { type: "image", src: "/assets/Venom.PNG", title: "Creature Head Sculpt", year: 2024, desc: "A movie creature's head, sculpted and rendered in Blender. A wet, high gloss skin shader over the sculpt, lit with a single key against black.", aspectRatio: "16/9" },
      { type: "image", src: "/assets/My_Case.jpg", title: "Custom Phone Case", year: 2025, desc: "The finished case, printed in a metallic blue. An organic lattice replaces the flat back, its apertures shaped around the camera array and the side buttons.", aspectRatio: "5/6", relatedItems: ["Apple Accessory Prototypes"] },
      { type: "image", src: "/assets/Airpod_Case.JPG", title: "Custom AirPods Case", year: 2026, desc: "The finished sleeve, printed in purple. The same melted lattice wraps an AirPods Pro case, left open at the status light and along the hinge.", aspectRatio: "4/5", relatedItems: ["Apple Accessory Prototypes"] },
      { type: "image", src: "/assets/New_Radar_Sensor_front.jpg", title: "Radar, Front View", year: 2024, desc: "Front of the radar enclosure. Paired ultrasonic transducers, a 16x2 character LCD, and a recessed speaker cone, all set into a 3D-printed shell.", aspectRatio: "4/3", hidden: true, relatedItems: ["Radar, Back View", "Radar and RGB Controller", "HMI Sensor System"] },
      { type: "image", src: "/assets/New_Radar_Sensor_Back.jpg", title: "Radar, Back View", year: 2024, desc: "Back of the radar enclosure, showing the access panel, wiring routing, and the power and control cutouts.", aspectRatio: "4/3", hidden: true, relatedItems: ["Radar, Front View", "Radar and RGB Controller", "HMI Sensor System"] },
      { type: "image", src: "/assets/New_LED_Box_Front.jpg", title: "RGB Box, Front View", year: 2024, desc: "Front of the RGB controller. A faceted 3D-printed shell with the addressable LED strip seated in a chamfered channel.", aspectRatio: "4/3", hidden: true, relatedItems: ["RGB Box, Back View", "Radar and RGB Controller", "Custom RGB Controller"] },
      { type: "image", src: "/assets/New_LED_Box_Back.jpg", title: "RGB Box, Back View", year: 2024, desc: "Back of the RGB controller, with the potentiometer, mode button, and toggle switch mounted through the top panel.", aspectRatio: "4/3", hidden: true, relatedItems: ["RGB Box, Front View", "Radar and RGB Controller", "Custom RGB Controller"] },
      { type: "image", src: "/assets/Programming_Cover_Pic.jpg", title: "Radar and RGB Controller", year: 2024, desc: "Both enclosures side by side. Each was modeled around its own board, display and controls, then 3D printed and finished by hand.", aspectRatio: "4/3", hidden: true, relatedItems: ["HMI Sensor System", "Custom RGB Controller"] },
      { type: "image", src: "/assets/Max_Pic.JPG", title: "Candid Studio Portrait", year: 2024, desc: "Caught mid laugh on a gelled teal backdrop, with the background light hot behind the head so the subject separates from it.", aspectRatio: "2/3" },
      { type: "image", src: "/assets/Photography_1.jpg", title: "Shiri Wordmark", year: 2024, desc: "A hand drawn wordmark set over a cropped apparel shot, chains and acid washed corduroy, framed close so the type sits on the garment rather than beside it.", aspectRatio: "1/1" },
      { type: "video", src: "/assets/New_Radar_Sensor.mp4", poster: "/assets/New_Radar_Sensor_front.jpg", title: "HMI Sensor System", year: 2024, desc: "Interactive radar module converting ultrasonic data into real-time feedback. Custom 3D-printed enclosure with LCD and speaker.", aspectRatio: "4/3", relatedItems: ["Radar, Front View", "Radar, Back View", "Radar and RGB Controller"] },
      { type: "video", src: "/assets/New_LED_Box.mp4", poster: "/assets/New_LED_Box_Front.jpg", title: "Custom RGB Controller", year: 2024, desc: "A working LED controller with physical controls and a custom 3D-printed enclosure for the microcontroller.", aspectRatio: "4/3", relatedItems: ["RGB Box, Front View", "RGB Box, Back View", "Radar and RGB Controller"] },
      { type: "image", src: "/assets/Shyon_Sculpture.jpg", title: "Product, not Consumer", year: 2024, desc: "Hand-fabricated steel sculpture referencing consumer tech culture, welded, ground, sanded and finished.", aspectRatio: "5/4" },
      { type: "image", src: "/assets/Adverstisement_Project.jpg", title: "Ultron Shaver Campaign", year: 2024, desc: "A spec print advertisement for a fictional shaver brand. The rotary shaver is lit as the hero and its shadow runs back to the bloodied cartridge razor it replaces.", aspectRatio: "16/9" },
    ],
  },
  {
    id: "professional-services",
    title: "Professional Services",
    tag: "Web & Design",
    img: "/assets/Everly_Cover_Image.png",
    size: "wide",
    media: [
      { type: "image", src: "/assets/Mina_Website.png", title: "UI/UX, minasech.net", year: 2025, desc: "Website design and React development, with a responsive interface.", link: "https://minasech.net", wide: true, aspectRatio: "16/9" },
      { type: "image", src: "/assets/Everly_Cover_Image.png", title: "Everly Care Home", year: 2026, desc: "Brand identity, responsive website design, development, and deployment for a senior care community.", link: "https://everlycarehome.com", wide: true, aspectRatio: "16/9" },
      { type: "image", src: "/assets/RealEstate_Luning_Flyer.jpg", title: "Luning Dr Flyer", year: 2022, desc: "Property marketing flyer designed for Real Estate Experts, pairing a hero listing photo with clean typographic hierarchy, a status badge, and agent branding.", aspectRatio: "3/4" },
      { type: "image", src: "/assets/RealEstate_Colleen_Flyer.jpg", title: "Colleen Dr Flyer", year: 2022, desc: "A dual-agent listing flyer combining property details, brand elements, and paired agent headshots in a balanced square format.", aspectRatio: "1/1" },
      { type: "image", src: "/assets/RealEstate_MorningStar_Flyer.png", title: "Morning Star Dr Flyer", year: 2022, desc: "A listing announcement co-branded with Compass, combining pricing, property specifications, and sales highlights.", aspectRatio: "4/5" },
      { type: "image", src: "/assets/RealEstate_MoskowiteCorner_Concept.jpg", title: "Moskowite Corner, Concept Visualization", year: 2026, desc: "An AI-generated concept visualization for a real estate redevelopment study at Moskowite Corner, CA. It shows a closed gas station lot rebuilt as a fuel and retail stop, modeled from aerial references for a developer evaluating the property.", aspectRatio: "5/3", relatedItems: ["Moskowite Corner, Existing Site"] },
      { type: "image", src: "/assets/RealEstate_MoskowiteCorner_Before.png", title: "Moskowite Corner, Existing Site", year: 2026, desc: "The existing site before redevelopment. A closed 1.26 acre gas station lot with parking and an office building.", aspectRatio: "16/9", hidden: true, relatedItems: ["Moskowite Corner, Concept Visualization"] },
    ],
  },
  {
    id: "nabu",
    title: "NABU",
    tag: "Streetwear Brand",
    img: "/assets/New_NABU_Cover_Card.png",
    size: "tall",
    media: [
      { type: "video", src: "/assets/Nabu_Poster_Banner.mp4", poster: "/assets/Nabu_Poster_Banner.jpg", title: "NABU Promotional Video", year: 2023, desc: "Promotional video for NABU clothing, animated in Adobe After Effects.", wide: true },
      { type: "video", src: "/assets/NABU_PUFFER_AD.mp4", poster: "/assets/NABU_Puffer_AD.jpg", title: "NABU 2026 Teaser", year: 2025, desc: "A teaser edited in 2025 for the 2026 puffer jacket collection.", relatedItems: ["NABU Puffer Front", "NABU Puffer Back"] },
      { type: "video", src: "/assets/NABU_SALE_AD.mp4", poster: "/assets/NABU_SALE_AD.jpg", title: "NABU 2025 Summer Collection", year: 2025, desc: "Promotional video for the summer drop, camp collar shirts and rug pattern shorts, shot as a flat lay on white." },
      { type: "image", src: "/assets/Stevie_Pic.JPG", title: "NABU 2023 Spring Collection", year: 2022, desc: "Shot in 2022 for the 2023 spring collection. Two looks on a white cyclorama, the graphic tees worn over the Persian rug trousers, with the raw fringed seams left showing down the leg." },
      { type: "image", src: "/assets/NABU_Puffer_Front.jpg", title: "NABU Puffer Front", year: 2025, desc: "Studio still from the puffer collection shoot. Woven bandana panelling across the body, sleeves, and hood, shot on a white cyclorama.", aspectRatio: "9/16", hidden: true, relatedItems: ["NABU Puffer Back", "NABU 2026 Teaser"] },
      { type: "image", src: "/assets/NABU_Puffer_Back.jpg", title: "NABU Puffer Back", year: 2025, desc: "Back of the same puffer, showing how the bandana medallion is centered and mirrored across the shoulders and hem.", aspectRatio: "2/3", hidden: true, relatedItems: ["NABU Puffer Front", "NABU 2026 Teaser"] },
      { type: "image", src: "/assets/Digital_Media_Cover.jpg", title: "NABU 2024 Rerelease Promotion", year: 2024, desc: "Promotional campaign for the 2024 rerelease of NABU's Persian rug pants.", aspectRatio: "3/4" },
    ],
  },
];

const PAGE_ORDER: Page[] = ["home", "work", "about", "contact"];

/* ─────────────────────────────────────────────────────────────
   GLOBAL STYLES (injected once)
───────────────────────────────────────────────────────────── */
const GLOBAL_CSS = `
  :root {
    --black: #060606;
    --white: #f5f2ed;
    --cream: #ede8e0;
    --sky: #38bdf8;
    --cyan: #22d3ee;
    --accent: #ff4d1c;
    --mid: #8a8a8a;
    /* THE SITE'S ONE EASE. It was cubic-bezier(0.16,1,0.3,1), an expo-style curve that
       spends most of its travel in the first fifth of its duration: measured, that one
       is 27% of the way home at 10% of the time against this one's 17.6%. Front-loading
       that hard reads as SNAP, and snap is the opposite of what weight feels like. This
       is Apple's curve: gentler off the mark, and a long glide into the stop.
       Every transition in the sheet references the token, and the JS side is APPLE_EASE,
       which carries the same four numbers for framer-motion. There is no second ease.
       Two curves in the file are deliberately NOT this and must not be folded in:
       the map pin's pulse, which is an infinite loop rather than an arrival.
       NOTE this comment carries no backticks on purpose: GLOBAL_CSS is a template
       literal, so one backtick anywhere in here ends the string. */
    --ease-out: cubic-bezier(0.32,0.72,0,1);
    /* ONE FAMILY, EVERYWHERE (user, 2026-09-09: "i dont see any apple style font usage
       like anywhere on the actual site", and it should read as "some off part of the
       official apple website"). It was FOUR faces: Bebas Neue on the display headings,
       Space Grotesk on the kickers, Space Mono on every small label and Cormorant
       Garamond on the body copy. Apple runs one family and distinguishes by SIZE,
       WEIGHT and TRACKING alone, so that is what this is.
       The -apple-system keyword resolves to the real San Francisco on Apple hardware,
       served by the OS. SF Pro may NOT be self-hosted as a webfont (Apple's licence covers
       building for Apple platforms), so Inter is the SIL OFL near-clone that carries
       the same shape everywhere else, and it is the one face still downloaded. */
    --sf: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text",
          "Inter", system-ui, "Segoe UI", Roboto, sans-serif;
  }

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  html, body {
    width: 100%; height: 100%;
    overflow: hidden;
    background: var(--black);
    color: var(--white);
    -webkit-font-smoothing: antialiased;
  }

  /* ── THE POINTER ───────────────────────────────────────────────────────────────────
     cursor is an INHERITED property, so hiding it is one declaration on html plus an
     explicit inherit on the few elements the UA sheet gives a cursor of their own. It
     was a star rule carrying !important, which is the same anti-pattern the type cascade
     already documents: a universal selector beats INHERITANCE, and an !important in a
     stylesheet beats an inline style, so nothing downstream could ever put the pointer
     back. Two rules were silently dead because of it, and one of them mattered. */
  html { cursor: none; }
  a, button, input, textarea, select, label, summary, [role="button"] { cursor: inherit; }

  /* THE POINTER IS HIDDEN FOR A MOUSE, NOT FOR A NARROW WINDOW. This used to ride the
     768px and 640px layout breakpoints, which asks the wrong question exactly as the old
     innerWidth gate on the Realm did: a desktop browser dragged under 768 got the dot
     hidden by the media query AND the native arrow suppressed by the star rule above, so
     it had NO POINTER AT ALL. Measured before the fix at 760 / 700 / 640 / 500. A finger
     is a property of the DEVICE, so ask about the device. */
  @media (hover: none), (pointer: coarse) {
    html { cursor: auto; }
    #ss-cursor-dot { display: none !important; }
  }

  /* A picture is natively draggable, and an HTML5 drag is the one state where the browser
     draws its OWN cursor over the page and ignores cursor:none entirely: the arrow comes
     back, with a translucent ghost of the image under it, until the button is released.
     The Work coverflow is dragged across card artwork, so that was the most-used gesture
     on the site. dragstart is cancelled in JS as well, which is what covers Firefox. */
  img, video { -webkit-user-drag: none; user-drag: none; }

  html::-webkit-scrollbar,
  body::-webkit-scrollbar,
  div::-webkit-scrollbar { display: none; }
  html, body { scrollbar-width: none; -ms-overflow-style: none; }

  /* noise overlay */
  body::after {
    content: '';
    position: fixed; inset: 0;
    pointer-events: none; z-index: 99998;
    opacity: 0.032;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    background-size: 180px;
  }

  @media (max-width: 768px) {
    body::after { display: none; }
  }

  /* ─ MOBILE RESPONSIVE (iPhone 17e & similar - max 640px) ─ */
  @media (max-width: 640px) {
    /* Navigation */
    nav ul { gap: 16px !important; }
    nav { padding-left: max(16px, calc(16px + env(safe-area-inset-left))) !important; padding-right: max(16px, calc(16px + env(safe-area-inset-right))) !important; }

    /* Work Page - Cards. The floor comes down with the card itself (360 -> 330 wide),
       or a short phone draws a card taller than the desktop proportion. */
    .ss-card { min-height: 385px !important; }

    /* Contact Page */
    .ss-contact-heading { font-size: clamp(32px, 6vw, 64px) !important; }
    .ss-contact-description { font-size: clamp(12px, 1.5vw, 14px) !important; }
  }

  /* ── THE CURSOR IS THE PLAIN WHITE DOT AGAIN ────────────────────────────────────────
     Reverted at Shyon's request (2026-09-10). It wore the Realm's glass bubble for a day,
     ported across on 2026-09-09; the Realm still wears that shape, this surface goes back
     to the solid difference dot it had before.
     WHAT COMES BACK WITH IT is the mix-blend-mode: difference trade, and it is accepted
     rather than overlooked. Over a backdrop B a difference dot composites to B + a*(255-2B),
     so it INVERTS (magenta over the green card artwork, cyan over the studio wall) and it
     cancels exactly at B=127.5, measured at 26.8 dLum over the Work card art against 200+
     on the flat page grounds. Work is the one page made entirely of mid-tone imagery, so
     that is where it is thinnest. Do not "fix" this by adding a rim or a shadow: a
     difference dot with either is neither thing. Put the bubble back instead, it is in
     the Realm and in git.
     NONE OF THE FOUR DEFECTS THAT PASS FIXED COMES BACK, because not one of them was the
     dot's appearance: the pointer is still gated on (hover: none) rather than on a width
     breakpoint, images and video still refuse a native HTML5 drag, the transition is still
     held behind .ss-cursor-ready so the injected sheet cannot animate the first paint, and
     the dot is still revealed by real movement rather than parking in the top left corner
     of a fresh load. */
  #ss-cursor-dot {
    position: fixed; top: 0; left: 0; z-index: 99999;
    width: 9px; height: 9px;
    background: #ffffff;
    border-radius: 50%;
    pointer-events: none;
    transform: translate(-50%,-50%);
    opacity: 0;   /* shown on the first real pointer move, see the Cursor component */
    mix-blend-mode: difference; /* always contrasts, on white or on dark */
  }
  /* THE TRANSITION IS HELD BACK UNTIL AFTER THE FIRST PAINT, and that is not a nicety.
     This whole sheet is injected by a useEffect, so it lands AFTER the dot has already
     rendered at the UA default opacity of 1: with the transition declared in the rule
     above, the arrival of opacity:0 was ANIMATED, and the dot faded out of the top left
     corner over .18s on every single load. Measured at 0.739 opacity a second after a
     settled load, with no pointer event having fired at all. The class is added on the
     frame after mount, so the first application of opacity:0 snaps and everything after
     it eases. The Realm has no such rule because its CSS is a style block in the head,
     parsed before its cursor element exists. */
  #ss-cursor-dot.ss-cursor-ready { transition: opacity .18s ease; }
  /* NO HOVER RULE, and that is the revert too: the prior pointer did not react to what it
     was over. useCursorHover still puts .ss-hover on the body (it always did, and nothing
     styled it then either), so a hover state is one rule away if it is ever wanted. A
     scale on a difference dot is the one thing not to reach for: 2.2x of pure inversion
     is a blob rather than a pointer. */

  /* modal / viewer scrollbar hide */
  .ss-modal-grid { scrollbar-width: none; }
  .ss-modal-grid::-webkit-scrollbar { display: none; }

  /* scroll hint arrow (mobile) */
  @keyframes ss-arrow-bounce {
    0%,100% { transform: translateY(0); opacity: 1; }
    50%      { transform: translateY(8px); opacity: .3; }
  }

  /* drag hint arrow */
  @keyframes ss-drift {
    0%,100% { transform: translateX(0); }
    50%      { transform: translateX(8px); }
  }
  .ss-drift { animation: ss-drift 2s ease-in-out infinite; }

  /* contact btn fill */
  .ss-contact-btn {
    position: relative; overflow: hidden;
    transition: color .4s ease, border-color .4s ease;
  }
  .ss-contact-btn::before {
    content: '';
    position: absolute; inset: 0;
    background: var(--sky);
    transform: translateX(-105%);
    transition: transform .5s var(--ease-out);
    z-index: 0;
  }
  .ss-contact-btn:hover { color: var(--black) !important; border-color: var(--sky) !important; }
  .ss-contact-btn:hover::before { transform: translateX(0); }
  .ss-contact-btn > * { position: relative; z-index: 1; }
  .ss-contact-btn span { position: relative; z-index: 1; }

  /* tile hover scale */
  .ss-tile img, .ss-tile video {
    transform: scale(1.06);
    transition: transform .6s var(--ease-out);
  }
  .ss-tile:hover img, .ss-tile:hover video { transform: scale(1); }

  /* hero bg */
  .ss-hero-bg {
    transform: scale(1.06);
    transition: transform 8s ease;
  }
  .ss-hero-bg-active { transform: scale(1) !important; }

  /* ── THE NAME ──
     Bebas Neue, which is the face the About and Contact display headings were always
     written in, so the name stops being the one big piece of type on the site still
     falling through to Apple's system font. It is a CONDENSED CAPS face and has to be
     set as one: positive tracking (a condensed face runs its letters together at
     negative), a line height under 1 (caps have no descenders to leave room for, so
     0.86 closes the two lines into one block), and a larger size than the old sans
     needed, because the same point size in a condensed face covers far less width.
     One weight ships, so no font-weight is stated. NO !important anywhere: see the
     type cascade note further down, where the universal selector that used to make
     one necessary was removed. */
  .ss-hero-name {
    font-family: var(--sf);
    font-weight: 700;
    line-height: 1.02;
    letter-spacing: -0.035em;
    color: var(--white);
  }
  /* Each letter is its own inline-block so it can be transformed on its own; without
     this the spans are inline boxes and every transform is silently dropped. */
  .ss-hero-name .ss-hero-ch { display: inline-block; will-change: transform, opacity, filter; }
  .ss-hero-name .ss-hero-line { display: block; white-space: nowrap; }
  .ss-home-hero { min-height: 620px; }
  .ss-hero-intro { max-width: 570px; }
  .ss-hero-kicker {
    display: flex; align-items: center; gap: 12px;
    margin-bottom: 22px; color: rgba(245,242,237,.82);
    font-size: 12px; font-weight: 600; letter-spacing: .16em;
    text-transform: uppercase;
  }
  .ss-hero-kicker::before {
    content: ''; width: 27px; height: 1px; background: var(--sky);
  }
  .ss-hero-description {
    margin-top: 24px; max-width: 435px; font-size: 16px; line-height: 1.55;
    color: rgba(245,242,237,.82);
  }
  .ss-hero-actions { display: flex; align-items: center; flex-wrap: wrap; gap: 8px 22px; margin-top: 24px; }
  .ss-hero-actions button {
    min-height: 46px; font-size: 13px; font-weight: 600;
    transition: background .22s var(--ease-out), color .22s var(--ease-out), transform .22s var(--ease-out);
  }
  .ss-hero-primary { background: var(--white); color: #060606; padding: 0 23px; border: 0; border-radius: 999px; }
  /* The legacy button reset clears backgrounds and focus with !important. */
  #root .ss-hero-primary { background: var(--white) !important; }
  .ss-hero-secondary { background: none; color: var(--white); padding: 0 2px; border: 0; text-decoration: underline; text-underline-offset: 5px; text-decoration-color: rgba(245,242,237,.35); }
  .ss-hero-primary:hover { background: #dbeef5; transform: translateY(-2px); }
  #root .ss-hero-primary:hover { background: #dbeef5 !important; }
  .ss-hero-secondary:hover { color: var(--sky); }
  .ss-hero-actions button:focus-visible, .ss-story-cue:focus-visible { outline: 2px solid var(--sky); outline-offset: 5px; }
  #root button:focus-visible { outline: 2px solid var(--sky) !important; outline-offset: 5px; }
  .ss-contact-entry:hover, .ss-contact-entry:focus-visible { background: rgba(56,189,248,.06); }
  @media (max-width: 640px) {
    .ss-home-hero { min-height: 560px; }
    .ss-hero-kicker { margin-bottom: 16px; font-size: 10px; }
    .ss-hero-description { margin-top: 18px; }
    .ss-hero-actions { gap: 4px 16px; margin-top: 18px; }
  }

  /* ── Lego Realm storyboard (home page scroll) ── */
  .ss-home-scroll {
    overflow-y: auto; overflow-x: hidden;
    scrollbar-width: none; -ms-overflow-style: none;
    overscroll-behavior: contain;
  }
  .ss-home-scroll::-webkit-scrollbar { display: none; }
  /* ── A FINGER-SIZED TAP TARGET THAT MOVES NOTHING (user, 2026-09-02).
     The site's controls are drawn as small type: measured across ten viewports,
     the nav buttons render 17px tall and the page dots 10px, against Apple's
     44px minimum, so on touch they are all but unhittable. Growing them would
     redraw the design, so the HIT AREA is a transparent ::after laid over the
     element instead: layout, spacing and the drawn size are all untouched.
     width is max(100%,44px) rather than 44px so a WIDE control keeps its own
     width and only a narrow one is padded out. Needs position:relative on the
     element it is used on. */
  .ss-tap { position: relative; }
  .ss-tap::after {
    content: ''; position: absolute; left: 50%; top: 50%;
    transform: translate(-50%, -50%);
    width: max(100%, 44px); height: 44px;
  }
  .ss-story-cue {
    position: absolute; left: 50%; bottom: max(22px, calc(22px + env(safe-area-inset-bottom)));
    transform: translateX(-50%);
    display: flex; flex-direction: column; align-items: center; gap: 8px;
    background: none; border: none; color: var(--white);
    opacity: .78; transition: opacity .3s ease;
    z-index: 12;
    /* the arrow itself draws 11x15; this is the part a thumb has to find */
    padding: 15px 22px;
  }
  .ss-story-cue:hover { opacity: 1; }
  .ss-story-cue .ss-cue-arrow {
    font-size: 15px; line-height: 1;
    animation: ss-cue-drop 1.9s ease-in-out infinite;
  }
  @keyframes ss-cue-drop {
    0%, 100% { transform: translateY(0); opacity: .9; }
    55% { transform: translateY(7px); opacity: .45; }
  }
  /* The chapter heading, in SPACE GROTESK (user, 2026-09-01, replacing Bebas Neue).
     A grotesk with engineered, slightly odd letterforms, which is the right voice for
     copy about a thing that was built rather than styled, and it sits naturally beside
     the mono head strips on the frames below.
     It is NOT a swap of the face alone: Bebas is condensed and caps only, so at the
     same size a normal-width grotesk in mixed case runs roughly 1.6x the line length
     and would have wrapped every kicker. The size comes down accordingly, the tracking
     goes NEGATIVE (Bebas needed +0.04em to breathe, Grotesk needs pulling in), and the
     uppercase transform comes off so the kickers read as written.
     Deliberately still the question ("What it is"), never an answer, so the body below
     is what actually tells you anything. */
  .ss-story-kicker {
    font-family: var(--sf);
    font-size: clamp(34px, 4.1vw, 62px);
    font-weight: 700;
    line-height: 1.02; letter-spacing: -0.022em; text-transform: none;
    color: var(--sky);
  }
  /* the kicker's own words fly up one at a time, so it needs a per word box to turn in */
  /* THE TITLE IS FILLED WITH A GRADIENT, NOT A FLAT BLUE (user, 2026-09-03: "can you add
     some styling to the blue titles"). One sky blue at this size is a large flat area of a
     single value, which on black reads as unlit. The ramp runs light at the cap height to a
     deeper blue at the baseline, which is the direction light falls, and the whole title
     then carries a faint bloom of its own colour. That bloom is not invented for this: the
     deck rail's active tick already glows in exactly this blue, and the Realm's own crystal
     is an emissive material, so a lit heading is the page agreeing with what it is about.
     The gradient sits on the WORD SPANS and not on the paragraph. Each span is a transformed
     inline-block, and a background clipped to text on the parent has to survive every one of
     those transforms; per word it cannot be broken by them. Every span shares one line box
     height, so the ramp is identical across a line and no word is a different blue. */
  .ss-story-kicker .ss-w {
    display: inline-block; transform-origin: 50% 100%;
    background-image: linear-gradient(180deg, #a9e2fd 0%, #3fc0f8 48%, #0b86c9 100%);
    -webkit-background-clip: text; background-clip: text;
    color: transparent;
    /* THE DESCENDER WAS BEING CUT OFF, and background-clip is why (user, 2026-09-09: the
       Y is cut off at the bottom). The glyph is painted by a background CLIPPED to the
       text, so paint exists only inside the element's own box. This span is an
       inline-block, so that box is its line box, and .ss-chapter-head sets line-height
       0.92: at 96px that is an 88px box holding a face whose descenders reach past 100px.
       Everything below the box simply is not painted, so the tail of the y in "Why"
       vanished while the rest of the word looked fine.
       The padding grows the PAINT box and the negative margin takes the same amount back
       out of layout, so the descender is drawn and the two lines close up exactly as
       before. It has to be in em, not px: the size is a clamp running 36 to 96. */
    padding-bottom: 0.16em;
    margin-bottom: -0.16em;
  }
  .ss-story-kicker { filter: drop-shadow(0 0 26px rgba(56,189,248,.20)); }

  /* ── THE DECK ─────────────────────────────────────────────────────────────────────
     The storyboard is a DECK (user, 2026-09-01). Every chapter and every frame row
     holds the full viewport and locks there until you scroll past it, so a block is
     never read half arrived: you land on it, it stages itself in, and only then does
     the next one come. This deliberately REVERSES the earlier revert of a snap deck.
     Mandatory snapping is only honest while a slide is guaranteed to FIT ON ONE
     SCREEN, and nothing here guarantees that on its own: a two up frame row stacks
     to one column under 760px, and the stills are 16/9 and 4/3 mixed. So the media
     carries a vh cap (cropping at the cap rather than distorting, hence object-fit)
     and the whole mechanism stands down to free scrolling on a narrow or a short
     window, where the cap would have to eat most of the picture to fit. */
  .ss-home-scroll { scroll-snap-type: y proximity; }
  .ss-snap { scroll-snap-align: start; scroll-snap-stop: always; }
  .ss-slide {
    position: relative;
    min-height: 100dvh;
    display: flex; flex-direction: column; justify-content: center;
    /* The gutters are vh based because the CONTENT is: the stills are capped in vh, so
       on a short window the padding has to give way with them or the slide stops fitting
       and a mandatory snap point traps you above its own bottom. */
    padding: clamp(58px, 8.6vh, 92px) 0 clamp(54px, 8.2vh, 88px);
    /* Clipped so an entrance that begins outside the box (the head strip's wipe, a still
       driving in from the left) can never add scrollable height under that snap point.
       Nothing real is ever clipped by this: scratchpad/verify_deck_sizes.cjs measures the
       actual content against the slide box at nine window sizes. */
    overflow: hidden;
  }
  .ss-slide-inner { position: relative; z-index: 1; width: 100%; }
  /* A CHAPTER IS A TITLE AND A PARAGRAPH. NOTHING ELSE (user, 2026-09-03: "why is the
     chapter number even here, why is it not just a title", and he did not like it stating
     "two frames"). Three things were carrying no information and have gone:
     · ".ss-chapter-num" / ".ss-chapter-ghost", the 01 to 04 numbering. It numbered four
       sections that are already told apart by their titles, and a reader counting chapters
       is a reader who has stopped reading.
     · ".ss-chapter-rule", the blue dash it hung off. With nothing to anchor it was
       decoration on decoration.
     · ".ss-chapter-meta", "TWO FRAMES · FR 05 – 06". That is a shot list. It told the
       visitor how many pictures were about to appear, which they can see, in the private
       vocabulary of the person who assembled the page.
     The FR numbers on the frames themselves went with them: their only job was to key into
     that contents line, so with it gone "FR 05" referenced nothing. The frames keep the
     half of the strip that is real information, which is what the picture is OF. */
  /* two frames on one screen read as a pair when they end on the same line */
  /* a lone still is narrowed rather than cropped: at the full 1180 a 16/9 shot is 663
     tall and the vh cap would have to eat into it on any normal window. */
  /* ── CHAPTER + TWO STILLS ON ONE SCREEN. The deck's rule since it was cut from 12
     slides to 7 (user, 2026-09-01): a blue kicker is never on screen without at least
     two frames beside it. That means a chapter header and a two-up frame row have to
     share one 100dvh slide, so the header becomes a BAND (kicker left, body right,
     aligned on their baselines) instead of a column, and the stills give up some of
     their height cap. 34vh against the 43vh a frame row gets when it has the screen to
     itself: two captions and a head strip still have to fit under them. */
  /* THE BAND IS THREE PARTS ON TWO ROWS, AND THE TOP ROW SPANS BOTH COLUMNS. That span is
     what puts the title and the body copy on ONE LINE with no magic number holding them
     there: the number and its rule take a row of their own, and the two columns under it
     start together at whatever the clamped type resolves to on this window.
     What it replaces is what the layout was really being blamed for. The band was two
     columns aligned on "end" with the rule stacked ABOVE them, so the rule sat at the top
     of the block while the kicker, bottom aligned against a paragraph three times its
     height, hung 130px below it with nothing in between: a chapter opened on an orphaned
     blue dash over a void. The contents line landed under the BODY on the right, where it
     labelled the paragraph instead of the chapter it belongs to. */
  .ss-chapter-head {
    display: grid;
    grid-template-columns: minmax(0, .78fr) minmax(0, 1.22fr);
    column-gap: clamp(34px, 4.4vw, 58px);
    /* CENTRE, and this is the whole reason the band can be two things and not three. A one
       line title beside a five line paragraph leaves a column two thirds empty, and top
       aligned that empty runs along the BOTTOM of the title, which is a hole. Split evenly
       above and below it, the same emptiness is air: the title sits on the paragraph's
       middle and the band reads as balanced rather than as unfinished. It is what the
       contents line was really propping up. */
    align-items: center;
  }
  /* A measure, not a column width: the body is set to read, and the column it sits in is
     wider than a comfortable line at the top of the clamp.
     THE SIZE IS SET HERE AND NOT INLINE, and that is what makes it able to give way. A
     chapter band is the tallest thing on the deck and the copy is what makes it tall: at
     a flat 16px the body ran to 8 lines on a 1024 wide window and the slide finished 53px
     past a viewport it is snap-locked to, which is the one failure the deck may not have.
     Falling to 14.4px at the narrow end costs nothing anyone reads and buys most of that
     back. At 1333px and over it resolves to the same 16px it always was. */
  .ss-chapter-body {
    max-width: 58ch;
    font-size: 16px; line-height: 1.62; color: rgba(245,242,237,.78);
  }
  .ss-chapter-head .ss-chapter-body { font-size: clamp(14.4px, 1.2vw, 16px); }
  /* the chapter that does NOT share its band with a frame row (04, which sits beside a
     single still) keeps the plain stack, and its parts are simply spaced. */
  .ss-chapter-stack .ss-story-kicker { margin-bottom: 22px; font-size: clamp(34px, 5vw, 76px); }
  .ss-chapter-stack .ss-chapter-body { max-width: 44ch; font-size: 18px; }
  /* IT HAS TO BE BIG ENOUGH TO OWN THE COLUMN IT SITS IN (user, 2026-09-03: "why is it just
     sitting in an open black space if it doesnt even need that space"). At 52px on one line
     the title was a 225px object in a 505px column with 90px of black above and below it,
     which is not a heading beside a paragraph, it is a heading lost next to one. At 96px on
     two deliberate lines the block is about 380 by 180, so it fills its column across and
     stands as tall as the copy it is centred against: the space stops being empty because
     something is finally in it. Its two lines are set by hand in the kicker text, never by
     letting the column wrap it. */
  .ss-chapter-head .ss-story-kicker {
    font-size: clamp(36px, 6.4vw, 96px);
    line-height: 0.92; letter-spacing: -0.035em;
  }
  /* the header lost the number, the rule and the contents line, so the pictures take the
     height back: 34vh to 38vh, about 34px more picture on a laptop. */
  /* A short window is where a chapter band and a frame row stop fitting together, and the
     picture is the only part of a slide that can give height back without anything being
     cut. Nothing above 760px tall is touched, so the approved framing on a laptop and up
     is exactly what it was. */
  @media (max-width: 900px) {
    .ss-chapter-head { grid-template-columns: 1fr; row-gap: 20px; }
  }

  /* ── THE OPENER ───────────────────────────────────────────────────────────────────
     THE FIRST THING PAST THE HERO IS THE WORLD, FULL BLEED (user, 2026-09-03: "who is
     coming to my website and intrigued to learn about my lego world when this is the
     opener"). It was a chapter header reading "01 · What it is" over a contents line over
     two bordered panels about a third of the screen tall, one of a figure standing in a
     rubble field. That is a filing card. Nobody walks into a world because a heading told
     them a section was about to describe one.
     So the deck now opens on story_aerial_town.jpg, which was shot in engine and sitting
     unused: the whole town at once, the river, all four structures, the real fog. It runs
     edge to edge and the type sits on it. The other unused still, story_world_midday.jpg,
     was considered and is not usable: it is an old flat Blender render with mint coloured
     trees and no atmosphere, and it is nothing like what the Realm looks like now. It stays
     on disk only because it is still the Realm's og:image.
     THE BLEED IS DONE WITH CANCELLING MARGINS, NOT 100vw, and that is deliberate. The
     slide sits inside ".ss-story", whose padding is "0 8vw", so a content box of width W is
     "client - 16vw" and "-8vw" either side widens the slide to exactly "client" again: the
     two vw terms cancel, whatever the window and whatever the scrollbar. "width: 100vw"
     does NOT cancel, because vw counts the scrollbar the scroller's client width does not,
     which is up to 15px of horizontal overflow on any machine that draws one. The slide
     then clips the picture at the viewport edge with the "overflow: hidden" it already has,
     so nothing inside needs a viewport unit at all. The type is brought back onto the
     deck's own 1180 column by the inner. */
  .ss-slide-open {
    justify-content: flex-end;
    padding-bottom: clamp(46px, 7vh, 76px);
    margin-left: -8vw; margin-right: -8vw;
  }
  /* static, so the picture's "inset: 0" resolves against the SLIDE and covers all of it.
     The inner is pushed to the foot of the slide by "flex-end", and an absolute child of it
     would have covered the words alone. */
  .ss-slide-open .ss-slide-inner {
    position: static;
    max-width: calc(1180px + 16vw); margin: 0 auto; padding: 0 8vw;
  }
  .ss-open-bg { position: absolute; inset: 0; z-index: 0; overflow: hidden; }
  .ss-open-img {
    position: absolute; inset: 0;
    width: 100%; height: 100%; object-fit: cover;
    will-change: transform;
  }
  /* THE VEIL IS A FOOTING FOR THE WORDS, NOT A FILTER OVER THE WORLD. The first attempt
     was a full height left to right ramp at .72 on top of a bottom ramp reaching 58% up
     the frame, and between them they greyed the whole picture: the point of the slide is
     that the place looks worth walking into, and a scrim over the whole of it is the one
     thing that guarantees it does not. The world's own fog is already low contrast, so it
     has no contrast to spare.
     So the top 55% is left completely alone, the bottom band carries the type, and a soft
     ellipse in the corner the words actually occupy does the rest. Radial and not a second
     linear ramp, because the words are a block in one corner and not a stripe across the
     frame. */
  .ss-open-veil {
    position: absolute; inset: 0;
    background:
      linear-gradient(to top, rgba(6,6,6,.94) 0%, rgba(6,6,6,.78) 14%, rgba(6,6,6,.3) 32%, rgba(6,6,6,0) 48%),
      radial-gradient(105% 78% at 4% 104%, rgba(6,6,6,.62) 0%, rgba(6,6,6,.22) 45%, rgba(6,6,6,0) 72%);
    /* THE BAND UNDER THE NAV IS GONE, AND THE FROSTED NAV IS WHY. It was a solved
       gradient, .82 falling to .76 across the top 7%: this is the only slide on the deck
       whose top is not black, the world under the nav sampled a flat 170,140,140, and the
       nav's dim items measured 2.4:1 against it, so the PICTURE had to be darkened to
       carry type that had no ground of its own.
       The bar brings its own ground now, so darkening the photograph to serve it is
       paying twice, and stacked the two put a heavy black stripe across the top of the
       one full bleed image on the deck. Contrast is now measured against the bar's own
       fill; see the note on the nav itself. */
  }
  .ss-open-copy { position: relative; z-index: 1; max-width: 760px; }
  .ss-open-title {
    font-family: var(--sf);
    font-size: clamp(42px, 6.6vw, 96px);
    font-weight: 700; line-height: 0.98; letter-spacing: -0.035em;
    color: var(--white);
  }
  .ss-open-title .ss-w { display: inline-block; transform-origin: 50% 100%; }
  .ss-open-line {
    margin-top: clamp(16px, 2.4vh, 26px);
    max-width: 54ch;
    font-size: clamp(15px, 1.35vw, 19px); line-height: 1.55;
    color: rgba(245,242,237,.82);
  }

  /* ── THE TOWN MAP ─────────────────────────────────────────────────────────────────
     Type column left, one interactive object right. Deliberately NOT full bleed like the
     opener: the opener already spent that shot on drama, and this is the same shot doing
     the opposite job. A legend has to be read, and every one of the four pins has to be on
     screen at once, which a cover crop cannot promise. */
  /* the map slide buys its height back from the gutters: it is one picture and two lines,
     and it is the picture that has to be big */
  .ss-slide-map { padding: 62px 0 58px; }
  .ss-slide-map .ss-chapter-head { align-items: center; margin-bottom: clamp(20px, 3vh, 34px); }
  .ss-slide-map .ss-story-kicker { font-size: clamp(32px, 4.2vw, 64px); line-height: 1; }
  .ss-slide-map .ss-chapter-body { max-width: 62ch; }
  /* WIDTH IS DRIVEN BY THE HEIGHT LEFT OVER, not the other way round. The picture is 16/9
     and the slide is snap locked to one screen, so the stage takes whatever vertical it can
     have and derives its width from that; capped at 100% it simply goes full column on a
     tall window. Sizing by width instead overflows the slide on anything short. */
  .ss-map-col { width: min(100%, calc(58vh * 16 / 9)); margin: 0 auto; }
  .ss-slide-map .ss-chapter-head { grid-template-columns: minmax(0, .82fr) minmax(0, 1.18fr); }
  .ss-map-stage {
    position: relative; aspect-ratio: 16 / 9; width: 100%;
    overflow: hidden; background: #05070b;
    border: 1px solid rgba(245,242,237,.14);
  }
  .ss-map-hint {
    margin-top: 11px; text-align: right;
    font-family: var(--sf);
    font-size: 10px; font-weight: 590; letter-spacing: .06em; text-transform: uppercase;
    color: rgba(245,242,237,.34);
  }
  .ss-map-bed {
    position: absolute; left: -6%; top: -6%; width: 112%; height: 112%;
    object-fit: cover; filter: blur(26px) saturate(.75) brightness(.42);
  }
  .ss-map-fit { position: absolute; }
  .ss-map-img { display: block; width: 100%; height: 100%; }
  /* A PIN IS A STUD SEEN FROM ABOVE, which is what the whole world is made of, and it is
     the 44px target the tap rules ask for with a 15px stud drawn in the middle of it. */
  /* THE BUTTON IS A FIXED 44 SQUARE CENTRED ON THE BUILDING AND THE LABEL HANGS OUTSIDE
     IT. Laid out in flow beside the stud the label is part of the button's width, so
     "translate(-50%)" centres the STUD PLUS THE LABEL on the point and the stud itself
     lands well to the left of the thing it is pointing at: measured, the four pins sat at
     31.2 / 64.7 / 100.5 / 15.5 against the 17.8 / 53.3 / 95.0 / 10.5 they were given, and
     the mansion's ran clean off the picture. Absolutely positioned, the label cannot move
     the anchor whatever it says. 44 is the tap target the rest of the site holds to. */
  /* NOTE the centring is NOT here. "sbPin" animates "scale", and framer-motion writes the
     whole "transform" inline, so a "translate(-50%, -50%)" in this rule is silently
     overwritten the moment the variant runs and every stud lands 22px down and right of
     its building. It is passed as motion's own "x" / "y" instead, which motion composes
     with the scale rather than replacing. */
  .ss-map-pin {
    position: absolute;
    width: 44px; height: 44px; padding: 0;
    display: grid; place-items: center;
    background: none; border: 0; cursor: none;
  }
  /* A PIN HAS TO LOOK LIVE OR NOBODY FINDS OUT IT IS ONE. Four small blue dots on a
     photograph read as part of the photograph; the ring pushing out of each one is the only
     thing that says the picture answers back. The four are offset in time so they read as
     four separate things rather than one blinking pattern, and the ring stops on the pin
     you are actually on, where it would be noise. */
  .ss-map-stud {
    position: relative; flex: none; width: 15px; height: 15px; border-radius: 50%;
    border: 2px solid var(--sky); background: rgba(56,189,248,.22);
    box-shadow: 0 0 0 4px rgba(6,6,6,.5), 0 0 14px rgba(56,189,248,.5);
    transition: transform .18s var(--ease-out), background .18s var(--ease-out);
  }
  .ss-map-stud::after {
    content: ''; position: absolute; inset: -3px; border-radius: 50%;
    border: 1px solid rgba(56,189,248,.6);
    animation: ss-pin-pulse 2.8s cubic-bezier(.2,.7,.3,1) infinite;
  }
  .ss-map-pin:nth-child(3) .ss-map-stud::after { animation-delay: .7s; }
  .ss-map-pin:nth-child(4) .ss-map-stud::after { animation-delay: 1.4s; }
  .ss-map-pin:nth-child(5) .ss-map-stud::after { animation-delay: 2.1s; }
  .ss-map-pin:hover .ss-map-stud::after, .ss-map-pin.on .ss-map-stud::after { animation: none; opacity: 0; }
  @keyframes ss-pin-pulse {
    0% { transform: scale(.75); opacity: .85; }
    72% { transform: scale(2.3); opacity: 0; }
    100% { transform: scale(2.3); opacity: 0; }
  }
  .ss-map-tag {
    position: absolute; left: calc(100% - 12px); top: 50%;
    font-family: var(--sf);
    font-size: 10px; font-weight: 590; letter-spacing: .05em; text-transform: uppercase;
    color: rgba(245,242,237,.86); white-space: nowrap;
    padding: 3px 7px; border-radius: 3px;
    background: rgba(6,6,6,.66); backdrop-filter: blur(6px);
    opacity: 0; transform: translateY(-50%) translateX(-5px);
    transition: opacity .2s var(--ease-out), transform .2s var(--ease-out);
  }
  .ss-map-pin:hover .ss-map-tag, .ss-map-pin:focus-visible .ss-map-tag, .ss-map-pin.on .ss-map-tag {
    opacity: 1; transform: translateY(-50%) translateX(0);
  }
  .ss-map-pin:hover .ss-map-stud, .ss-map-pin.on .ss-map-stud {
    transform: scale(1.25); background: var(--sky);
  }
  /* the card is standing on this one, so it is taken away rather than left with its end
     showing from under a corner. Solved in the component, since only it knows where the
     card landed; it has to come AFTER the two rules above, which match on as many classes
     as it does. */
  .ss-map-pin.hushed.on .ss-map-tag { opacity: 0; }
  /* the mansion sits at 95% of the frame, so its label opens to the LEFT or it runs off
     the picture. Driven by the data and not by :nth-child, which would re-point at the
     wrong building the moment the four are reordered. */
  .ss-map-pin.flip .ss-map-tag {
    left: auto; right: calc(100% - 12px);
    transform: translateY(-50%) translateX(5px);
  }
  .ss-map-pin.flip:hover .ss-map-tag,
  .ss-map-pin.flip:focus-visible .ss-map-tag,
  .ss-map-pin.flip.on .ss-map-tag { transform: translateY(-50%) translateX(0); }
  /* THE CARD OPENS BESIDE THE PIN IT BELONGS TO, not in a fixed corner (user, 2026-09-09:
     they all show up in the right hand corner and it is not user friendly). All four
     structures shared one slot bottom right, so opening the Coffee Shop, which sits top
     left, put its picture and its name as far from the building as the frame allows and
     made every card look like the same card. The offset is solved in JS against the pin's
     own point in the fitted image, since only the component knows where that landed, and
     it is clamped so a card can never hang off the stage. This rule keeps the bottom right
     placement as the FALLBACK for the frame before it has been measured. */
  .ss-map-frame { position: relative; }
  .ss-map-card {
    position: absolute; right: 2.6%; bottom: 3.6%; width: min(28%, 306px);
    background: rgba(8,9,12,.9); backdrop-filter: blur(12px);
    border: 1px solid rgba(245,242,237,.18);
    box-shadow: 0 18px 40px rgba(0,0,0,.5);
  }
  .ss-map-card img { display: block; width: 100%; aspect-ratio: 16 / 9; object-fit: cover; }
  .ss-map-card-body { padding: 12px 13px 14px; display: flex; flex-direction: column; gap: 5px; }
  .ss-map-card-name {
    font-family: var(--sf);
    font-size: 17px; font-weight: 700; letter-spacing: -0.01em; color: var(--white);
  }
  .ss-map-card p { font-size: 12.5px; line-height: 1.45; color: rgba(245,242,237,.66); margin-top: 3px; }
  /* NARROW: the map takes the whole screen width by cancelling the story's gutters, the
     way the opener does, and the card drops below it instead of lying on it. Laid out side
     on, so a phone shows the still and the words without a scroll. */
  @media (max-width: 900px) {
    /* the map slide's own header override is more specific than the shared stack rule, so
       it has to be stacked again here or the title and the copy stay side by side on a
       phone in a column 150px wide */
    .ss-slide-map .ss-chapter-head { grid-template-columns: 1fr; gap: 16px; align-items: start; }
    .ss-map-col { width: 100%; }
    .ss-map-frame { margin-left: -8vw; margin-right: -8vw; }
    .ss-map-stage { border-left: 0; border-right: 0; }
    .ss-map-card {
      position: static; width: auto; margin: 0 8vw;
      display: grid; grid-template-columns: 40% 1fr; align-items: start;
      border-top: 0;
    }
    .ss-map-card img { height: 100%; }
    .ss-map-card-body { padding: 10px 12px 12px; }
    .ss-map-hint { text-align: left; }
  }

  /* ── THE QUIET SLIDE ──────────────────────────────────────────────────────────────
     A chapter band over one bordlerless plate. Everything either side of this screen is
     loud, so it is the one that is allowed to be nearly empty. */
  /* ══ THE THREE CHAPTER SLIDES ARE THREE DIFFERENT KINDS OF SCREEN ══════════════════
     (user, 2026-09-09: "the layout is still so similar ??????")
     THE REPETITION WAS THE BAND, NOT WHAT SAT UNDER IT. All three carried the identical
     chapter head: the same two line blue title in the same corner with the same paragraph
     beside it, filling the top third of three consecutive screens. Two passes were spent
     rearranging the CONTENT below that band, which was never what made them look alike.
     The deck's own rule is that no two slides in a row share a measure, and three did.
     Each now has a structure the others do not, and none of them reuses the two
     treatments already on the deck (the opener and closer are type on a full bleed
     picture) or the About page's 50/50 split:
       · WHAT IT IS   centred. A narrow header centred over a full width map.
       · WHY I MADE IT a side rail. The words in a narrow column, the picture taking the
                       rest of the width and the height.
       · HOW I MADE IT inverted. No display title at the top at all: the sheet leads, and
                       the title sits small at the foot beside the running caption.
     Below 1100 all three collapse to the stacked band they always had, because that is
     the arrangement that fits a 700px viewport under mandatory snapping. */

  /* ── WHY: THE SIDE RAIL ── */
  .ss-quiet { display: grid; row-gap: clamp(20px, 3.4vh, 38px); }
  @media (min-width: 1100px) {
    .ss-quiet {
      grid-template-columns: minmax(240px, 300px) 1fr;
      column-gap: clamp(30px, 3.4vw, 60px);
      align-items: center;
      row-gap: 0;
    }
    /* the rail: title, paragraph and caption stacked small, in reading order */
    .ss-slide-why .ss-chapter-head {
      grid-template-columns: 1fr;
      row-gap: clamp(12px, 1.8vh, 20px);
    }
    /* the rail is 300px, so the display size the other slides use cannot live here. That
       is the point rather than a compromise: a title at 44px reads as a different KIND of
       heading from one at 96px, which is half of what makes this screen its own. */
    .ss-slide-why .ss-story-kicker { font-size: clamp(32px, 3vw, 46px); line-height: 1.02; }
    .ss-slide-why .ss-chapter-body { font-size: 14px; line-height: 1.6; max-width: none; }
    /* the picture takes everything left over, and its caption goes back underneath it */
    .ss-quiet .ss-plate { grid-template-columns: 1fr; justify-items: stretch; }
    .ss-quiet .ss-plate-shot, .ss-quiet .ss-plate figcaption { max-width: 100%; }
    .ss-quiet .ss-plate-shot img { height: clamp(320px, 54vh, 540px); }
  }

  /* ── HOW I MADE IT: INVERTED ── the sheet leads and the words follow it */
  @media (min-width: 1100px) {
    /* The order property needs a flex or grid parent, and .ss-slide-inner is a plain
       block, so the
       shop slide's inner box is made a flex column HERE and nowhere else, rather than
       reordering the JSX: the source order is the reading order a screen reader and a
       keyboard get, and the sheet's caption line only makes sense after its grid. */
    .ss-slide-shop .ss-slide-inner { display: flex; flex-direction: column; }
    .ss-slide-shop .ss-chapter-head {
      order: 2;
      grid-template-columns: minmax(0, 300px) 1fr;
      column-gap: clamp(26px, 3vw, 52px);
      align-items: baseline;
      margin-top: clamp(14px, 2vh, 24px);
    }
    /* small enough to read as a caption's heading rather than as the screen's title */
    .ss-slide-shop .ss-story-kicker { font-size: clamp(26px, 2.4vw, 36px); line-height: 1.04; }
    .ss-slide-shop .ss-chapter-body { font-size: 13.5px; line-height: 1.6; max-width: 92ch; }
    .ss-slide-shop .ss-sheet { order: 1; margin-top: 0; }
    .ss-slide-shop .ss-sheet-grid { grid-template-columns: repeat(4, minmax(0, 1fr)); }
    .ss-slide-shop .ss-cell-shot img { height: clamp(96px, 17vh, 178px); }
  }

  /* ── WHAT IT IS: CENTRED ── the only centred screen on the site */
  @media (min-width: 1100px) {
    .ss-slide-map .ss-chapter-head {
      grid-template-columns: 1fr;
      justify-items: center;
      text-align: center;
      row-gap: clamp(10px, 1.4vh, 16px);
    }
    .ss-slide-map .ss-chapter-body { max-width: 68ch; margin: 0 auto; }
    .ss-slide-map .ss-map-hint { text-align: center; }
  }
  .ss-plate { margin: 0; display: grid; row-gap: 11px; justify-items: start; }
  .ss-plate-label {
    font-family: var(--sf);
    font-size: 10.5px; font-weight: 600; letter-spacing: .07em; text-transform: uppercase;
    color: rgba(245,242,237,.5);
  }
  /* ── THE PLATE IS NO LONGER A LETTERBOX STRIP (user, 2026-09-09: the player figure
     screenshot is too thin). IT IS AN ASPECT PROBLEM AND THE NUMBERS SAY SO.
     story_figure_front.jpg is 2400 x 1350, so 16:9, i.e. 1.78:1. It was rendered full
     bleed across the story column at 36vh, which at a 900px window is about 1560 x 414,
     or 3.63:1. object-fit cover then has to throw away 51% OF THE IMAGE'S HEIGHT to
     fill that box, and what it throws away is the bottom half of a STANDING FIGURE: he
     was cut at the waist, which is the one thing this particular still cannot afford,
     since the caption beside it is about how his parts were assembled.
     The fix is to stop asking a 16:9 photograph to fill a 3.6:1 hole. The width is capped
     and the height raised, which brings the box to roughly 1.9:1 and cuts the discarded
     height from 51% to about 7%. There was room for it: this slide was measured with
     about 16% of its own screen empty under the caption, so the picture grew into space
     that was doing nothing.
     Width is capped in CH-INDEPENDENT units on purpose. The caption under it is set to a
     reading measure, and matching the two by eye drifts the moment either changes. */
  .ss-plate-shot {
    display: block; overflow: hidden;
    width: 100%; max-width: min(100%, 780px);
  }
  /* THE CROP WINDOW IS STILL SET, NOT LEFT AT CENTRE, and it still matters at 1.9:1:
     centred, the little that is cropped comes off the top and takes the crown of his
     head. 30% down now rather than 24%, because a taller box needs less pulling up. */
  .ss-plate-shot img {
    display: block; width: 100%;
    height: clamp(230px, 46vh, 430px);
    object-fit: cover; object-position: 50% 30%;
  }
  /* Under 900 the deck stands down to free scrolling and the column narrows, so the cap
     stops doing anything useful and the picture goes back to full width. */
  @media (max-width: 1099px) {
    .ss-plate-shot { max-width: 100%; }
    .ss-plate-shot img { height: clamp(200px, 34vh, 340px); }
  }
  /* the caption sits under the picture, so it takes the picture's measure */
  .ss-plate figcaption {
    max-width: min(100%, 780px);
    max-width: 74ch; font-size: 15px; line-height: 1.5; color: rgba(245,242,237,.62);
  }

  /* ── THE WORKSHOP SHEET ───────────────────────────────────────────────────────────
     Four across, two rows, seven cells. Cell HEIGHT is driven by vh and the picture is
     cropped to it, because the sheet shares a snap locked screen with a chapter band and
     an aspect ratio would have made the height a function of the window's WIDTH, which is
     the one thing that cannot be traded for the band above it. */
  .ss-sheet { margin-top: clamp(18px, 3vh, 34px); }
  .ss-sheet-grid {
    display: grid; grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: clamp(9px, 1vw, 15px);
  }
  .ss-cell {
    display: grid; row-gap: 7px; justify-items: start;
    padding: 0; border: 0; background: none; text-align: left; cursor: none;
  }
  .ss-cell-shot {
    display: block; width: 100%; overflow: hidden;
    border: 1px solid rgba(245,242,237,.12);
    transition: border-color .2s var(--ease-out);
  }
  .ss-cell-shot img {
    display: block; width: 100%; height: clamp(78px, 14.5vh, 150px); object-fit: cover;
    filter: saturate(.72) brightness(.72);
    transition: filter .25s var(--ease-out), transform .25s var(--ease-out);
  }
  .ss-cell-label {
    font-family: var(--sf);
    font-size: 10px; font-weight: 590; letter-spacing: .06em; text-transform: uppercase;
    color: rgba(245,242,237,.42);
    transition: color .2s var(--ease-out);
  }
  /* the cell you are on is the only one at full strength, which is what makes a sheet of
     seven read as one thing being examined rather than seven competing for you */
  .ss-cell.on .ss-cell-shot { border-color: rgba(56,189,248,.55); }
  .ss-cell.on .ss-cell-shot img { filter: none; transform: scale(1.04); }
  .ss-cell.on .ss-cell-label { color: var(--sky); }
  .ss-sheet-cap {
    margin-top: clamp(13px, 2vh, 22px);
    max-width: 96ch; min-height: 3.1em;
    font-size: 14px; line-height: 1.55; color: rgba(245,242,237,.66);
  }
  .ss-sheet-cap b {
    font-family: var(--sf); font-weight: 600;
    font-size: 10px; letter-spacing: .06em; text-transform: uppercase;
    color: var(--sky); margin-right: 12px;
  }
  @media (max-width: 900px) {
    .ss-sheet-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
    .ss-sheet-cap { min-height: 5em; }
  }
  @media (max-width: 560px) {
    .ss-sheet-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  }

  /* ── THE MEASURED FIGURES, on the closing slide over the picture ──────────────────── */
  .ss-figs {
    display: flex; flex-wrap: wrap; gap: clamp(24px, 3.6vw, 54px);
    margin: 0 0 clamp(20px, 3vh, 32px);
    padding-bottom: clamp(16px, 2.4vh, 26px);
    border-bottom: 1px solid rgba(245,242,237,.16);
  }
  .ss-fig { display: flex; flex-direction: column-reverse; gap: 4px; }
  .ss-fig dd {
    margin: 0;
    font-family: var(--sf);
    font-size: clamp(26px, 3vw, 44px); font-weight: 700;
    line-height: 1; letter-spacing: -0.03em; color: var(--white);
  }
  .ss-fig dd i {
    font-style: normal; font-size: .52em; color: var(--sky); margin-left: 2px;
  }
  .ss-fig dt {
    font-family: var(--sf);
    font-size: 10px; font-weight: 590; letter-spacing: .06em; text-transform: uppercase;
    color: rgba(245,242,237,.52);
  }
  /* the closer is the opener's twin: same bleed, same veil, same type block */
  .ss-slide-close {
    justify-content: flex-end;
    padding-bottom: clamp(46px, 7vh, 76px);
    margin-left: -8vw; margin-right: -8vw;
  }
  .ss-slide-close .ss-slide-inner {
    position: static;
    max-width: calc(1180px + 16vw); margin: 0 auto; padding: 0 8vw;
  }
  .ss-close-title { font-size: clamp(38px, 5.4vw, 78px); }
  /* THE CLOSER'S VEIL HAS TO REACH HIGHER THAN THE OPENER'S, because its block is taller.
     The opener carries a title and one line and starts about 72% down; this one carries the
     four figures as well and starts at 52.8%, measured, which is above everything the
     opener's ramp was tuned for. Left on the shared veil the mono labels sat on open
     meadow: TRIANGLES A FRAME and FULL DAY CYCLE were unreadable. The figures' own labels
     also come up from .52 to .72 here, since a 9.5px mono line over a picture is the
     smallest thing on the deck and has the least contrast to spare. */
  .ss-slide-close .ss-open-veil {
    background:
      linear-gradient(to top, rgba(6,6,6,.95) 0%, rgba(6,6,6,.9) 34%, rgba(6,6,6,.74) 48%, rgba(6,6,6,.32) 62%, rgba(6,6,6,0) 78%),
      radial-gradient(105% 70% at 4% 104%, rgba(6,6,6,.5) 0%, rgba(6,6,6,.18) 48%, rgba(6,6,6,0) 74%),
      linear-gradient(to bottom, rgba(6,6,6,.82) 0%, rgba(6,6,6,.76) 7%, rgba(6,6,6,.34) 13%, rgba(6,6,6,0) 24%);
  }
  .ss-slide-close .ss-fig dt { color: rgba(245,242,237,.72); }

  /* ── THE INTERSTITIAL EYEBROW ─────────────────────────────────────────────────────
     The three slides that are frames alone had nothing on them but the two panels, which
     left them floating in the middle of a black screen with no top edge and no relation
     to the chapter they belong to. This is the smallest thing that anchors them: the same
     blue rule a chapter hangs off, at half the length, over the same mono the frames label
     themselves with. Deliberately NOT a kicker: a blue heading is a chapter, and these
     are the frames between them. */
  /* a light passes down the still as it lands. Sits inside the shot window, which is
     already overflow:hidden, so it is clipped to the picture and never the border. */

  /* ── DECK RAIL ────────────────────────────────────────────────────────────────────
     Where you are in the deck and a way to jump. The active tick is the only blue
     thing on the right hand side, so it reads without a legend. Ticks are real
     buttons; the label only appears on hover, so the resting state is four pixels of
     chrome rather than a menu. */
  .ss-deck-rail {
    position: fixed; right: max(20px, 2.4vw); top: 50%; transform: translateY(-50%);
    display: flex; flex-direction: column; align-items: flex-end; gap: 12px; z-index: 60;
    opacity: 0; pointer-events: none; transition: opacity .5s var(--ease-out);
  }
  .ss-deck-rail.on { opacity: 1; pointer-events: auto; }
  .ss-deck-tick { position: relative; display: block; width: 24px; height: 12px; padding: 0; border: 0; background: none; }
  .ss-deck-tick::after {
    content: ''; position: absolute; right: 0; top: 50%; transform: translateY(-50%);
    width: 11px; height: 2px; border-radius: 2px; background: rgba(245,242,237,.24);
    transition: width .5s var(--ease-out), background .5s var(--ease-out), box-shadow .5s var(--ease-out);
  }
  .ss-deck-tick:hover::after { width: 24px; background: rgba(245,242,237,.66); }
  .ss-deck-tick.on::after { width: 24px; background: var(--sky); box-shadow: 0 0 12px rgba(56,189,248,.55); }
  .ss-deck-tip {
    position: absolute; right: 34px; top: 50%;
    transform: translateY(-50%) translateX(8px); white-space: nowrap;
    font-family: var(--sf);
    font-size: 10.5px; font-weight: 590; letter-spacing: .06em; text-transform: uppercase;
    color: rgba(245,242,237,.75);
    opacity: 0; pointer-events: none;
    transition: opacity .35s var(--ease-out), transform .35s var(--ease-out);
  }
  .ss-deck-tick:hover .ss-deck-tip { opacity: 1; transform: translateY(-50%) translateX(0); }
  .ss-deck-count {
    position: fixed; right: max(20px, 2.4vw); bottom: 26px; z-index: 60;
    font-family: var(--sf);
    font-size: 10.5px; font-weight: 590; letter-spacing: .05em; color: rgba(245,242,237,.38);
    opacity: 0; transition: opacity .5s var(--ease-out);
  }
  .ss-deck-count.on { opacity: 1; }
  .ss-deck-count b { color: var(--sky); font-weight: 400; }

  /* Narrow or short: a slide cannot be made to fit without gutting the picture, so
     the deck stands down to ordinary scrolling and the rail goes with it. */
  @media (max-width: 860px), (max-height: 620px) {
    .ss-home-scroll { scroll-snap-type: none; }
    .ss-slide { min-height: auto; display: block; padding: 58px 0; overflow: visible; }
    .ss-deck-rail, .ss-deck-count { display: none; }
    /* THE OPENER KEEPS ITS HEIGHT WHEN THE REST OF THE DECK STANDS DOWN. The stand down
       exists because a chapter band and a two up frame row cannot be made to share one
       screen on a narrow or short window; the opener is one picture and two lines and has
       no such problem. Collapsed to "min-height: auto" with the rest it became a 270px
       strip with the title jammed under the nav, which is the one slide on the deck that
       is nothing but its own size. It does not snap here (the container's snap is off at
       this width), so a viewport height costs the visitor nothing. */
    .ss-slide-open {
      min-height: 74vh;
      display: flex; justify-content: flex-end;
      padding: 58px 0 clamp(34px, 5vh, 56px);
      overflow: hidden;
    }
  }

  /* Responsive modal sizing before mobile breakpoint */
  @media (max-width: 1200px) {
    .ss-work-modal {
      max-width: 1100px !important;
    }
  }

  @media (max-width: 1100px) {
    .ss-work-modal {
      max-width: 900px !important;
    }
  }

  @media (max-width: 1024px) {
    .ss-work-modal {
      max-width: 700px !important;
      max-height: 70dvh !important;
    }
  }

  @media (max-width: 1023px) {
    .ss-work-modal {
      width: 95vw !important;
      max-width: 100% !important;
      max-height: 65dvh !important;
    }
    .ss-modal-grid {
      display: flex !important;
      flex-direction: row !important;
      gap: 16px;
      overflow-x: auto !important;
      overflow-y: hidden !important;
      padding-right: 16px !important;
      scroll-snap-type: x mandatory;
      scrollbar-width: none;
    }
    .ss-modal-grid > * {
      flex-shrink: 0;
      width: 140px;
      scroll-snap-align: start;
    }
  }

  /* media viewer responsive */
  @media (max-width: 1023px) {
    .ss-media-viewer {
      position: relative !important;
      flex-direction: column !important;
      align-items: stretch !important;
      justify-content: flex-start !important;
      gap: 20px !important;
      max-height: 92dvh !important;
      max-width: 100vw !important;
      padding: 20px !important;
      overflow-y: auto !important;
      overflow-x: hidden !important;
    }
    .ss-media-viewer > button:first-child {
      position: static !important;
      order: -1 !important;
      margin-bottom: 12px !important;
      align-self: flex-start !important;
    }
    .ss-media-viewer > div:nth-child(2) {
      order: 1 !important;
      flex-shrink: 0 !important;
      width: 100% !important;
    }
    .ss-media-viewer > div:nth-child(3) {
      order: 2 !important;
      flex-shrink: 0 !important;
      width: 100% !important;
      padding-right: 4px !important;
      padding-top: 20px !important;
      padding-left: 4px !important;
    }
    .ss-media-viewer > div:nth-child(2) > div {
      width: 100% !important;
      height: auto !important;
      max-height: 35dvh !important;
    }
    .ss-media-viewer > div:nth-child(2) video,
    .ss-media-viewer > div:nth-child(2) img {
      max-height: 35dvh !important;
      width: auto !important;
      height: auto !important;
    }
    .ss-media-viewer .ss-asset-title { font-size: 34px !important; margin-bottom: 16px !important; }
  }

  @media (max-width: 768px) {
    .ss-hero-bg { object-position: 78% 5% !important; }
    /* close button fix on mobile */
    .ss-media-viewer > button:first-child {
      position: static !important;
      top: auto !important;
      right: auto !important;
      order: -1 !important;
      margin-bottom: 12px !important;
      align-self: flex-start !important;
      padding: 12px 16px !important;
      width: fit-content !important;
      pointer-events: auto !important;
    }
  }

  @media (max-width: 700px) {
    .ss-hero-bg { object-position: 82% 5% !important; }
  }

  @media (max-width: 640px) {
    .ss-hero-bg { object-position: 75% 5% !important; }
    /* homepage content positioning on mobile */
    .ss-home-page .ss-hero-intro { bottom: 17vh !important; }
    /* navigation hint on mobile */
    /* modal close button positioning */
    .ss-modal-close { top: 20px !important; }
    /* media viewer close button positioned above title on all devices */
    .ss-media-viewer-close { top: 100px !important; }
    /* contact page text sizing on mobile */
    .ss-contact-heading { font-size: clamp(90px,12vw,200px) !important; }
    .ss-contact-description { font-size: clamp(22px,4vw,36px) !important; }
  }

  /* Ensure pages extend behind safe areas on all devices */
  [key] {
    position: fixed !important;
    top: 0 !important;
    left: 0 !important;
    right: 0 !important;
    bottom: 0 !important;
    width: 100vw !important;
    height: 100dvh !important;
  }

  /* ═══════════════════════════════════════════════════════════
     APPLE-STYLE PASS — fonts + rounded corners only.
     Layout, spacing and structure are untouched. Remove this
     block to revert entirely.
  ═══════════════════════════════════════════════════════════ */
  /* ── THE BASE FACE ──
     Apple's system font (SF Pro on Mac) is the DEFAULT here, and it used to be an
     !important on the UNIVERSAL selector, which is two separate mistakes and both of
     them bite. An !important in a stylesheet beats an INLINE style, so every font
     family written in a style prop in this file was dead and rendered as SF Pro: the
     Space Mono labels, the Cormorant Garamond body copy, the Bebas Neue headings, all
     of it. And a universal selector beats INHERITANCE, so even a rule that did win on a
     parent could not reach the children, because every child matched the star directly
     and took SF Pro from it.
     Declared on html instead it is what it was meant to be: a default that inherits
     down and that anything more specific can override. Form controls do not inherit a
     font family on their own, which is the one thing the star was really buying, so
     they are given it explicitly.
     NOTE the comment above carries no backticks on purpose. GLOBAL_CSS is a template
     literal, so one backtick anywhere in here ends the string and breaks the file. */
  html {
    font-family: var(--sf);
  }
  button, input, select, textarea, optgroup { font-family: inherit; }
  /* The Apple pass also pulled the two big display headings to -0.02em and 700, which
     was right while they were SF Pro and is wrong now that they render in the Bebas
     Neue they were always written in: a condensed caps face needs POSITIVE tracking
     (they carry their own, 4px and 5px) and Bebas ships one weight, so 700 bought
     nothing and the negative tracking ran the letters into each other. Removed rather
     than retuned, because each heading already states what it wants inline. */

  /* smooth, rounded surfaces instead of sharp corners */
  .ss-card {
    border-radius: 22px !important;
    overflow: hidden !important;
  }
  .ss-tile { border-radius: 18px !important; }
  .ss-work-modal { border-radius: 26px !important; overflow: hidden !important; }
  /* masonry gallery (Work modal: creative + professional) — packs mixed
     aspect ratios tightly with no ragged gaps, shows every image uncropped */
  .ss-scell { position: relative; border-radius: 14px; overflow: hidden; background: #111214; border: 1px solid rgba(245,242,237,.1); cursor: none; transition: transform .5s var(--ease-out), border-color .4s var(--ease-out), box-shadow .5s var(--ease-out); }
  .ss-scell:hover { transform: translateY(-4px); border-color: var(--sky); box-shadow: 0 18px 44px rgba(0,0,0,.5); }
  .ss-scell .ss-sthumb { position: relative; width: 100%; background: #0a0a0c; overflow: hidden; }
  .ss-scell .ss-sthumb img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform .7s var(--ease-out); }
  .ss-scell:hover .ss-sthumb img { transform: scale(1.05); }
  .ss-scell .ss-sbody { padding: 10px 12px 12px; }
  /* scroll affordances: a visible slim scrollbar + a bottom fade */
  .ss-scroll { scrollbar-width: thin; scrollbar-color: rgba(245,242,237,.28) transparent; }
  .ss-scroll::-webkit-scrollbar { width: 8px; }
  .ss-scroll::-webkit-scrollbar-track { background: transparent; }
  .ss-scroll::-webkit-scrollbar-thumb { background: rgba(245,242,237,.22); border-radius: 8px; }
  .ss-scroll::-webkit-scrollbar-thumb:hover { background: rgba(56,189,248,.55); }
  .ss-scroll-fade { position: absolute; left: 0; right: 8px; bottom: 0; height: 54px; background: linear-gradient(to top, rgba(6,6,6,.92), transparent); pointer-events: none; }
  /* Work page background: ONE continuous drift; only the colours change per slide
     (registered custom props so the colours interpolate; motion never resets) */
  @property --wbc1 { syntax: "<color>"; inherits: true; initial-value: rgba(0,0,0,0); }
  @property --wbc2 { syntax: "<color>"; inherits: true; initial-value: rgba(0,0,0,0); }
  @property --wbc3 { syntax: "<color>"; inherits: true; initial-value: rgba(0,0,0,0); }
  @keyframes ssFloatA { 0%,100% { transform: translate(-10%,-6%) scale(1); } 33% { transform: translate(9%,11%) scale(1.16); } 66% { transform: translate(15%,-8%) scale(1.08); } }
  @keyframes ssFloatB { 0%,100% { transform: translate(12%,9%) scale(1.1); } 33% { transform: translate(-10%,-7%) scale(1); } 66% { transform: translate(-15%,11%) scale(1.15); } }
  @keyframes ssFloatC { 0%,100% { transform: translate(3%,-12%) scale(1.05); } 33% { transform: translate(-12%,7%) scale(1.17); } 66% { transform: translate(11%,13%) scale(1); } }
  .ss-media-viewer img,
  .ss-media-viewer video { border-radius: 22px !important; }
  .ss-contact-btn { border-radius: 980px !important; }

  /* Work page: hover "View" cue on cards + CTA link */

  .ss-contact-page { overflow-y: auto !important; justify-content: flex-start !important; overscroll-behavior: contain; }
  .ss-contact-content { flex-shrink: 0; margin: auto 0; padding: 120px max(24px, 8vw) 72px !important; }
  @media (max-width: 640px) {
    .ss-contact-page .ss-contact-heading { font-size: clamp(42px, 11vw, 64px) !important; }
    .ss-contact-page .ss-contact-description { font-size: 16px !important; text-align: left !important; }
    .ss-contact-content > div:first-child { align-items: flex-start !important; flex-direction: column; gap: 18px !important; }
  }

  .ss-work-page [role="button"]:focus-visible { outline: 2px solid var(--sky); outline-offset: 5px; }
  .ss-home-hero { min-height: max(620px, 100svh); }
  @media (max-height: 560px) and (min-width: 641px) {
    .ss-home-page .ss-hero-intro { bottom: 85px !important; }
    .ss-hero-name { font-size: 70px !important; }
  }
  @media (pointer: coarse) {
    button, a, [role="button"] { touch-action: manipulation; }
  }
  @media (max-width: 400px) {
    .ss-media-viewer .ss-asset-title { font-size: 28px !important; overflow-wrap: anywhere; }
  }

  .ss-scell, .ss-tile { display: block; width: 100%; text-align: left; padding: 0; font: inherit; }
  .ss-tile:focus-visible .ss-tile-info { opacity: 1; }
  @media (hover: none) { .ss-tile-info { opacity: 1 !important; } }
  .ss-work-modal { max-height: calc(100dvh - 32px) !important; overflow-y: auto; padding: 20px; }
  .ss-work-modal .ss-modal-close { position: static !important; display: block; align-self: flex-end; min-height: 44px; margin: 0 0 20px auto; flex-shrink: 0; }
  @media (max-width: 1023px), (max-height: 600px) {
    .ss-work-modal { display: block !important; width: calc(100vw - 32px) !important; }
    .ss-work-modal .ss-scroll { overflow: visible !important; }
    .ss-work-modal .ss-modal-grid { display: grid !important; grid-template-columns: repeat(2,minmax(0,1fr)) !important; overflow: visible !important; max-height: none !important; gap: 16px !important; }
    .ss-work-modal .ss-modal-grid > * { width: 100% !important; min-width: 0; }
    .ss-work-modal .ss-scroll-fade { display: none; }
  }
  @media (max-width: 640px) {
    .ss-home-hero { min-height: max(760px,100svh); }
    .ss-home-page .ss-hero-intro { bottom: 60px !important; }
    .ss-home-hero .ss-hero-bg { height: 62% !important; object-position: 75% 5% !important; mask-image: linear-gradient(#000 60%,transparent); }
    .ss-work-modal { padding: 14px; }
    .ss-work-modal .ss-tile { min-height: 160px !important; }
  }

  /* Chapter titles must fit their actual column, including intermediate window widths. */
  .ss-chapter-head > * { min-width: 0; }
  .ss-chapter-head .ss-story-kicker { overflow-wrap: anywhere; }
  .ss-chapter-head .ss-story-kicker .ss-w { max-width: 100%; line-height: inherit; }
  .ss-slide-map .ss-chapter-head { row-gap: 24px; }
  @media (max-width: 1099px) {
    .ss-chapter-head, .ss-slide-map .ss-chapter-head {
      grid-template-columns: minmax(0, 1fr); gap: 22px; align-items: start;
    }
    .ss-chapter-head .ss-story-kicker { font-size: clamp(32px, 5.3vw, 58px); line-height: 1.05; }
    .ss-chapter-head .ss-chapter-body { max-width: 68ch; }
  }
  /* Contact sizing follows CSS breakpoints even when the window changes without remounting. */
  .ss-contact-entry > span:nth-child(2) { white-space: normal !important; overflow-wrap: anywhere; }
  @media (max-width: 640px) {
    .ss-contact-entry { gap: 16px !important; padding: 16px 8px !important; }
    .ss-contact-entry > span:first-child { width: auto !important; font-size: 16px !important; }
    .ss-contact-entry > span:nth-child(2) { font-size: 13.5px !important; }
  }

  /* asset titles: rounded "iPhone bubble" font (SF Pro Rounded) */
  /* was SF Pro Rounded, the iMessage bubble face. One family means one family. */
  .ss-asset-title { font-weight: 590; letter-spacing: -0.01em; }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
    /* the storyboard's entrances are inline transforms from framer-motion, which the rules
       above cannot reach: pin every part at its finished state instead */
    .ss-story, .ss-story * { opacity: 1 !important; transform: none !important; clip-path: none !important; }
    /* The hero name is per letter and driven by framer-motion, so its transforms are
       INLINE and the duration rules above cannot reach them either. Pin it finished:
       the letters are the name, and a visitor who asked for less motion still has to
       be able to read it. */
    .ss-hero-name, .ss-hero-name * { opacity: 1 !important; transform: none !important; filter: none !important; }
    .ss-hero-bg { transform: none !important; }
    /* and the deck itself: snapping is motion the visitor did not ask for */
    .ss-home-scroll { scroll-snap-type: none !important; }
  }
`;

/* ─────────────────────────────────────────────────────────────
   CURSOR COMPONENT
───────────────────────────────────────────────────────────── */
function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    if (!dot) return;

    /* see the note on .ss-cursor-ready: the sheet is injected after first paint, so the
       transitions may only be armed once opacity:0 has actually been applied. */
    const armed = requestAnimationFrame(() => dot.classList.add("ss-cursor-ready"));

    /* THE DOT STARTS HIDDEN. `left`/`top` are unset until the first move, so the element
       resolves at 0,0 and its own -50% translate parks it at (-4.5, -4.5): a white speck
       in the top left corner of every fresh load, half off the screen, until the pointer
       is moved. Measured. It is shown on the first real move and hidden again whenever
       the pointer leaves the window, so it never sits stranded where the mouse left. */
    /* REVEALED BY REAL MOVEMENT, NOT BY THE FIRST EVENT. Chrome dispatches a mousemove
       when a page loads under the pointer, and in a fresh tab the pointer has no position
       yet, so that event arrives at 0,0 and flashed the dot in the top left corner,
       which is the bug this guard exists to kill. Measured: opacity 0.74 at rest on two
       runs in three. The delta is tracked HERE rather than read off the event's own
       movementX/movementY, which is not populated by every source (a synthetic move over
       CDP reports 0 for both, so a guard written on it never showed the cursor at all). */
    let px = -1, py = -1;
    const onMove = (e: MouseEvent) => {
      dot.style.left = e.clientX + "px";
      dot.style.top = e.clientY + "px";
      if (px >= 0 && (e.clientX !== px || e.clientY !== py)) dot.style.opacity = "1";
      px = e.clientX; py = e.clientY;
    };
    const onLeave = () => { dot.style.opacity = "0"; };

    /* A native HTML5 drag is the one state where the browser paints its own cursor over
       the page and `cursor: none` is ignored, so the arrow reappears mid gesture with a
       ghost of the picture under it. Nothing here uses the drag-and-drop API (the
       coverflow is pointer events), so cancelling it outright costs nothing and is what
       covers Firefox, where the CSS `user-drag` property does not exist. */
    const onDragStart = (e: DragEvent) => e.preventDefault();

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("dragstart", onDragStart);
    return () => {
      cancelAnimationFrame(armed);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("dragstart", onDragStart);
    };
  }, []);

  return <div id="ss-cursor-dot" ref={dotRef} />;
}

function useCursorHover() {
  const enter = useCallback(() => document.body.classList.add("ss-hover"), []);
  const leave = useCallback(() => document.body.classList.remove("ss-hover"), []);
  return { onMouseEnter: enter, onMouseLeave: leave };
}

/* ─────────────────────────────────────────────────────────────
   PAGE TRANSITION VARIANTS
───────────────────────────────────────────────────────────── */
/* Page roots overlap during a short crossfade. Content keeps its natural scale,
   and each page supplies a dark background so navigation never exposes the root. */
const APPLE_EASE = [0.32, 0.72, 0, 1] as const;

/* Read ONCE at module load. The reduced-motion block in GLOBAL_CSS kills CSS animations
   and transitions, but framer-motion writes inline transforms it cannot reach, which is
   the same reason the storyboard carries its own pin. Everything added in this pass is
   framer-driven, so it has to opt out in JS. */
const REDUCE = typeof window !== "undefined"
  && typeof window.matchMedia === "function"
  && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const fade = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: REDUCE ? 0.001 : 0.28, ease: "linear" as const },
};

/* ─────────────────────────────────────────────────────────────
   ROOT
───────────────────────────────────────────────────────────── */
export default function App() {
  const [page, setPage] = useState<Page>("home");
  const [modalProject, setModalProject] = useState<Project | null>(null);
  const [viewerItem, setViewerItem] = useState<MediaItem | null>(null);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);
  const pageIdx = PAGE_ORDER.indexOf(page);
  // Every top-level introduction uses a dark ground.
  const lightPage = page === "about";
  const cooldown = useRef(false);
  const hover = useCursorHover();

  /* inject global styles once */
  useEffect(() => {
    if (document.getElementById("ss-global")) return;
    const s = document.createElement("style");
    s.id = "ss-global";
    s.innerHTML = GLOBAL_CSS;
    document.head.appendChild(s);
  }, []);

  /* track device size */
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /* bg color sync */
  useEffect(() => {
    const bg = page === "about" ? "#f1eff2" : "#060606";
    document.documentElement.style.backgroundColor = bg;
    document.body.style.backgroundColor = bg;
  }, [page]);

  const pageIdxRef = useRef(pageIdx);
  useEffect(() => { pageIdxRef.current = pageIdx; }, [pageIdx]);
  const currentPageRef = useRef(page);
  useEffect(() => { currentPageRef.current = page; }, [page]);
  // track whether a project modal or media viewer is open, so page navigation
  // (wheel/touch) is fully disabled while one is — the modal scrolls instead
  const modalOpenRef = useRef(false);
  useEffect(() => { modalOpenRef.current = !!modalProject || !!viewerItem; }, [modalProject, viewerItem]);

  const navigate = useCallback((next: Page) => {
    if (next === page) return;
    setModalProject(null);
    setViewerItem(null);
    setPage(next);
  }, [page]);

  const openMediaByTitle = useCallback((title: string) => {
    const item = PROJECTS.flatMap(project => project.media).find(media => media.title === title);
    if (item) setViewerItem(item);
  }, []);

  /* wheel nav — skip on modals and work page */
  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      // No page navigation while a project modal / media viewer is open
      if (modalOpenRef.current) return;
      if (cooldown.current) return;
      // Home scrolls natively into the Lego Realm storyboard, so the wheel never flips pages there
      if (currentPageRef.current === "home" || currentPageRef.current === "about" || currentPageRef.current === "contact") return;
      // Skip page navigation on work page for mobile/tablet (screen < 1024px)
      if (currentPageRef.current === "work") return;
      // Skip if over a scrollable element
      const target = e.target as HTMLElement;
      if (target.closest(".ss-modal-grid") || target.closest(".ss-media-viewer")) return;
      // Only navigate if movement is clearly vertical (horizontal must be < 50% of vertical)
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY) * 0.5) return;
      const dir = e.deltaY > 0 ? 1 : -1;
      const next = Math.max(0, Math.min(PAGE_ORDER.length - 1, pageIdxRef.current + dir));
      if (next === pageIdxRef.current) return;
      cooldown.current = true;
      setPage(PAGE_ORDER[next]);
      setTimeout(() => { cooldown.current = false; }, 1100);
    };
    window.addEventListener("wheel", onWheel, { passive: true });
    return () => window.removeEventListener("wheel", onWheel);
  }, []);

  /* touch nav */
  const touchY = useRef(0);
  const touchX = useRef(0);
  useEffect(() => {
    const start = (e: TouchEvent) => {
      touchY.current = e.touches[0].clientY;
      touchX.current = e.touches[0].clientX;
    };
    const end = (e: TouchEvent) => {
      // No page navigation while a project modal / media viewer is open
      if (modalOpenRef.current) return;
      if (cooldown.current) return;
      // Home scrolls natively into the Lego Realm storyboard
      if (currentPageRef.current === "home" || currentPageRef.current === "about" || currentPageRef.current === "contact") return;
      // Skip page navigation on work page (use buttons only)
      if (currentPageRef.current === "work") return;
      const target = e.target as HTMLElement;
      // Skip if on a scrollable rail or modal grid
      if (target.closest(".ss-modal-grid")) return;
      const dy = touchY.current - e.changedTouches[0].clientY;
      const dx = touchX.current - e.changedTouches[0].clientX;
      // Require significant vertical movement (120px) and vertical > horizontal by 3x to prevent accidental triggers
      if (Math.abs(dy) < 120 || Math.abs(dy) < Math.abs(dx) * 3) return;
      const dir = dy > 0 ? 1 : -1;
      const next = Math.max(0, Math.min(PAGE_ORDER.length - 1, pageIdxRef.current + dir));
      if (next !== pageIdxRef.current) {
        cooldown.current = true;
        setPage(PAGE_ORDER[next]);
        setTimeout(() => { cooldown.current = false; }, 1100);
      }
    };
    window.addEventListener("touchstart", start, { passive: true });
    window.addEventListener("touchend", end, { passive: true });
    return () => {
      window.removeEventListener("touchstart", start);
      window.removeEventListener("touchend", end);
    };
  }, []);

  /* keyboard nav */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      // When viewing media, arrow keys navigate carousel
      if (viewerItem) {
        if (e.key === "Escape") setViewerItem(null);
        return;
      }
      // When modal is open, close with Escape
      if (modalProject) {
        if (e.key === "Escape") setModalProject(null);
        return;
      }
      // On home the arrows scroll the storyboard natively instead of flipping pages
      if (page === "home" || page === "about" || page === "contact" || page === "work") return;
      // Otherwise page navigation
      if (e.key === "ArrowDown" || e.key === "ArrowRight")
        setPage(PAGE_ORDER[Math.min(PAGE_ORDER.length - 1, pageIdx + 1)]);
      if (e.key === "ArrowUp" || e.key === "ArrowLeft")
        setPage(PAGE_ORDER[Math.max(0, pageIdx - 1)]);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [pageIdx, viewerItem, modalProject]);

  return (
    <div
      style={{
        position: "fixed", inset: 0,
        width: "100%", height: "100dvh",
        overflow: "hidden",
        // The BASE face is left to html (the Apple pass's SF Pro). This div used to set
        // Cormorant Garamond here, which was the site's original base and was dead for
        // as long as the star rule stood over it. Reviving it along with the cascade fix
        // would have turned every unstyled run on the site serif in one go: the hero
        // name, the storyboard captions, the Work header. The DELIBERATE faces still
        // land, because they are declared on the elements that want them.
        background: "#060606",
      }}
    >
      <svg width="0" height="0" aria-hidden="true" focusable="false" style={{ position: "absolute", pointerEvents: "none" }}>
        <defs>
          {/* Mild unsharp mask. Preserves the original photo and its flat backdrop. */}
          <filter id="ss-portrait-detail" x="0" y="0" width="100%" height="100%" colorInterpolationFilters="sRGB">
            <feGaussianBlur in="SourceGraphic" stdDeviation="0.65" edgeMode="duplicate" result="soft" />
            <feComposite in="SourceGraphic" in2="soft" operator="arithmetic" k1="0" k2="1.35" k3="-0.35" k4="0" />
          </filter>
        </defs>
      </svg>
      <Cursor />

      {/* ── NAV ─────────────────────────────────────────────── */}
      <nav
        /* ── NO BAR. THE LINKS FLOAT ON THE PAGE (user, 2026-09-09, who did not want the
           header space at all). This deletes the frosted glass pane, the ground it painted,
           its hairlines and its shadow, the `scrolled` / `frosted` state that switched it on
           past the top of Home, and the `ss-nav-light` thickening the stacked About needed.
           WHAT THAT GIVES BACK IS THE PROBLEM THE BAR EXISTED TO SOLVE: with no ground of its
           own the type is legible only against whatever pixel happens to be under it, and
           this site has four different grounds up there (a black portrait, a pale aerial, a
           cream copy column and, stacked, a photograph of dark hair and a black jacket).
           It is NOT solved by going back to `mix-blend-mode: difference`, which cancels
           toward mid grey (exact at 127.5, the trap the Realm's cursor documents) and put
           CONTACT at about 2.3:1 over the studio wall's vignette. It is solved by giving the
           GLYPHS their own separation instead of the bar: see the halo on NavLink, which is
           the only thing now standing between the type and the picture. */
        style={{
          position: "fixed", top: 0, left: 0, right: 0,
          zIndex: 10000,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          paddingTop: "max(28px, calc(28px + env(safe-area-inset-top)))",
          paddingBottom: "28px",
          paddingLeft: "max(48px, calc(48px + env(safe-area-inset-left)))",
          paddingRight: "max(48px, calc(48px + env(safe-area-inset-right)))",
          /* The bar is gone, so the element must not swallow clicks across the whole width of
             the page: it is a full-width fixed box with nothing drawn in most of it, and the
             deck under it is scrolled and dragged. Only the buttons take the pointer. */
          pointerEvents: "none",
        }}
      >
        <div style={{ visibility: "hidden" }} />
        <ul style={{ display: "flex", gap: 40, listStyle: "none", pointerEvents: "auto" }}>
          {PAGE_ORDER.map(p => (
            <li key={p}>
                <NavLink label={p.charAt(0).toUpperCase() + p.slice(1)} active={page === p} onClick={() => navigate(p)}
                onLight={lightPage} />
            </li>
          ))}
        </ul>
      </nav>

{/* ── PAGES ────────────────────────────────────────────── */}
      <AnimatePresence>
        {page === "home" && <HomePage key="home" onNavigate={navigate} onMediaClick={openMediaByTitle} />}
        {page === "work" && <WorkPage key="work" onCardClick={setModalProject} />}
        {page === "about" && <AboutPage key="about" />}
        {page === "contact" && <ContactPage key="contact" />}
      </AnimatePresence>

      {/* ── WORK MODAL ───────────────────────────────────────── */}
      <AnimatePresence>
        {modalProject && (
          <WorkModal
            project={modalProject}
            onClose={() => setModalProject(null)}
            onMediaClick={setViewerItem}
          />
        )}
      </AnimatePresence>

      {/* ── MEDIA VIEWER ─────────────────────────────────────── */}
      <AnimatePresence>
        {viewerItem && (
          <MediaViewer item={viewerItem} onClose={() => setViewerItem(null)} onItemClick={setViewerItem} />
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   NAV LINK
───────────────────────────────────────────────────────────── */
/* `onLight` is About, the one page whose ground is cream. The old `wideAbout` /
   `currentPage` pair is gone with the blend: the bar now paints its own ground, so an
   item's colour follows THE PAGE rather than the layout, and the dimming that had to be
   switched off under the blend (0.55 of a near-black reads as washed-out grey) is safe
   again, because the inactive colour is now stated outright instead of produced. */
function NavLink({ label, active, onClick, onLight }: { label: string; active: boolean; onClick: () => void; onLight?: boolean }) {
  const hover = useCursorHover();
  return (
    <button
      onClick={onClick}
      className="ss-tap"
      style={{
        fontFamily: "var(--sf)",
        fontSize: 12, fontWeight: 590, letterSpacing: "0.05em", textTransform: "uppercase",
        color: onLight ? "#14110b" : "var(--white)", background: "none", border: "none",
        /* 0.72 AND NOT THE 0.55 THE BLEND USED, and the number is measured rather than
           chosen. Against a produced colour the old value was as dim as it could be; against
           the bar's stated fill it has to clear 4.5:1 on the real composited pixels, and at
           0.58 the three dim items measured 4.38 to 4.40 over the opener and 3.87 to 3.98 on
           About's cream. scratchpad/nav_contrast.cjs samples the rendered frame on all four
           pages; re-run it if this number moves. */
        cursor: "none", opacity: active ? 1 : 0.86,
        /* ── THE HALO IS WHAT THE BAR USED TO BE. With no ground behind the nav the only
           thing separating a glyph from the picture is the glyph itself, so each one carries
           a soft shadow in the OPPOSITE tone to its own: dark under the white type, light
           under About's near-black. Two radii, not one. The tight 2px pass is the edge that
           keeps the letterform crisp against a busy crop; the wide 16px pass is a haze that
           lifts the local ground away from the type, and it is the one that carries the two
           real failures, white over the opener's pale aerial and dark over the stacked
           About's jacket. Measured on the composited frame by scratchpad/nav_contrast.cjs;
           a halo raises the ratio there for the same reason it works by eye, because the
           script reads the ground immediately around the glyphs.
           The dim opacity came up from 0.72 with the fill it was measured against gone. */
        textShadow: onLight
          ? "0 0 2px rgba(255,253,249,1), 0 0 4px rgba(255,253,249,1), 0 0 10px rgba(255,253,249,1), 0 0 20px rgba(255,253,249,.9)"
          : "0 0 2px rgba(0,0,0,.95), 0 1px 3px rgba(0,0,0,1), 0 0 10px rgba(0,0,0,.95)",
        transition: "opacity .3s var(--ease-out), color .45s var(--ease-out), text-shadow .45s var(--ease-out)",
        position: "relative",
      }}
      {...hover}
    >
      {label}
      <span
        style={{
          position: "absolute", bottom: -4, left: 0,
          height: 1, background: "var(--sky)",
          width: active ? "100%" : 0,
          transition: "width 0.4s var(--ease-out)",
          display: "block",
        }}
      />
    </button>
  );
}

/* ─────────────────────────────────────────────────────────────
   CAN THIS VISITOR GET INTO THE REALM?

   The rule itself lives in public/realm-support.js, loaded as a plain script by
   index.html, because lego.html has to apply the SAME rule and cannot import
   from this bundle. Read the reasoning there; the short version is that one
   frame of the Realm is 15.9M triangles and 283MB of GPU-side data, which a
   phone browser will not carry.

   THIS REPLACES A WIDTH TEST. The Realm used to be offered on `window.innerWidth
   > 640`, which hid it from a desktop browser dragged narrow (where it runs
   perfectly) and offered it to any wide-screened tablet. Capability belongs to
   the device, not to the size of the window, so this is read ONCE and never
   recomputed on resize.

   IT FAILS OPEN, deliberately. If the script did not load, this returns ok and
   the way in is shown, because lego.html carries the same gate and will turn
   away anything it should: an over-offer costs a redirect, while failing closed
   would hide the Realm from every desktop over one missing file.
───────────────────────────────────────────────────────────── */
type RealmSupport = { ok: boolean; why: string; message: string };
function readRealmSupport(): RealmSupport {
  const w = window as unknown as {
    __realmSupported?: () => { ok: boolean; why: string };
    __realmSupportMessage?: () => string;
  };
  if (typeof w.__realmSupported !== "function") return { ok: true, why: "", message: "" };
  try {
    const r = w.__realmSupported();
    return {
      ok: !!r.ok,
      why: r.why || "",
      message: typeof w.__realmSupportMessage === "function" ? w.__realmSupportMessage() : "",
    };
  } catch {
    return { ok: true, why: "", message: "" };
  }
}

/* ─────────────────────────────────────────────────────────────
   HOME PAGE
───────────────────────────────────────────────────────────── */
/* ══════════════════════════════════════════════════════════════════
   THE HERO NAME BUILDS ITSELF, ONE LETTER AT A TIME.

   A brick does not glide into position. It falls, and it seats with a knock. So each
   letter drops in from above its line, overshoots by a hair and settles back, and the
   stagger runs left to right the way a course is laid. That is the Realm's own
   vocabulary carried onto the homepage: everything in there snaps to the stud grid,
   and the title bubbles over the buildings already assemble course by course and print
   their label letter by letter. A plain fade up, which is what this was, is the same
   entrance any site could have.

   THE OVERSHOOT IS THE WHOLE EFFECT and it is in the KEYFRAMES, not in the easing.
   A springy cubic-bezier overshoots on every property it drives, which on `filter`
   means a negative blur (invalid, so the letter flickers) and on `opacity` means a
   value over 1 that clamps and flattens the fade. Driving y and scale past their
   targets explicitly, on a plain ease, keeps the knock on the two properties that
   should have it and leaves the other two monotonic.

   `y` IS IN `em`, NOT PIXELS, because the size is a `clamp()` that resolves differently
   at every window width: a fixed 90px drop is most of a letter's height on a phone and
   a third of one on a wide desktop. In em the fall is the same fraction of the letter
   everywhere.

   ACCESSIBILITY: split into spans the name reads as eleven separate letters to a
   screen reader, so the `h1` carries the real string as its label and the letters are
   hidden from the tree. Reduced motion pins the whole thing finished (see GLOBAL_CSS).
   ══════════════════════════════════════════════════════════════════ */
const NAME_LINES = ["Shyon", "Shiri"];

// The name's letters ride the site's one ease too. It was its own curve,
// [0.32, 0.9, 0.28, 1], which is close to this one but not it. What matters for THIS
// animation is not the shape but that the curve stays MONOTONIC: the drop's overshoot
// lives in the keyframes below, and a springy ease would overshoot every property it
// drives, which on `filter` means a negative blur (invalid, so the letter flickers) and
// on `opacity` a value over 1 that clamps and flattens the fade. APPLE_EASE never
// leaves 0..1 (its y control points are 0.72 and 0), so the knock still lands only on
// `y` and `scale`, which is where it was put on purpose.
const NAME_EASE = APPLE_EASE;

const nameStagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.052, delayChildren: 0.32 } },
};

const nameChar: Variants = {
  hidden: { opacity: 0, y: "-0.85em", scale: 1.06, filter: "blur(3px)" },
  show: {
    opacity: 1,
    // the three stops ARE the drop, the knock past the line, and the settle
    y: ["-0.85em", "0.045em", "0em"],
    scale: [1.06, 0.985, 1],
    filter: ["blur(3px)", "blur(0px)", "blur(0px)"],
    transition: { duration: 0.76, times: [0, 0.72, 1], ease: NAME_EASE },
  },
};

function HeroName({ isMobile }: { isMobile: boolean }) {
  return (
    <motion.h1
      className="ss-hero-name"
      aria-label={NAME_LINES.join(" ")}
      variants={nameStagger}
      initial="hidden"
      animate="show"
      style={{
        // SF is NOT condensed and it has descenders, so the Bebas sizes do not carry
        // over: 200px of SF on a 0.86 line put "Shyon" into "Shiri". The ceiling comes
        // back to 148 and the vw term with it.
        fontSize: isMobile ? "clamp(46px,7.4vw,74px)" : "clamp(68px,9.4vw,148px)",
      }}
    >
      {NAME_LINES.map((word) => (
        <span className="ss-hero-line" key={word} aria-hidden="true">
          {[...word].map((c, i) => (
            <motion.span className="ss-hero-ch" key={word + i} variants={nameChar}>
              {c}
            </motion.span>
          ))}
        </span>
      ))}
    </motion.h1>
  );
}

function HomePage({ onNavigate, onMediaClick }: { onNavigate: (p: Page) => void; onMediaClick: (title: string) => void }) {
  const [loaded, setLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 640);
  // read once: none of its inputs change while the page is open, and it must not
  // flip when the window is resized (see readRealmSupport)
  const [realm] = useState(readRealmSupport);
  const hover = useCursorHover();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 640);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const scrollAnimation = useRef<(() => void) | null>(null);
  useEffect(() => () => scrollAnimation.current?.(), []);
  const scrollToSection = (id: string) => {
    scrollAnimation.current?.();
    const root = scrollRef.current;
    const section = root?.querySelector<HTMLElement>(`[data-slide="${id}"]`);
    if (!root || !section) return;
    const start = root.scrollTop;
    const target = Math.min(root.scrollHeight - root.clientHeight,
      start + section.getBoundingClientRect().top - root.getBoundingClientRect().top);
    if (REDUCE) { root.scrollTo({ top: target, behavior: "instant" }); return; }
    const distance = target - start;
    const duration = Math.min(2600, 1200 + Math.abs(distance) * .45);
    const started = performance.now();
    const oldSnap = root.style.scrollSnapType;
    const oldBehavior = root.style.scrollBehavior;
    root.style.scrollSnapType = "none";
    root.style.scrollBehavior = "auto";
    let frame = 0;
    const stop = () => {
      cancelAnimationFrame(frame);
      root.style.scrollSnapType = oldSnap;
      root.style.scrollBehavior = oldBehavior;
      root.removeEventListener("wheel", stop);
      root.removeEventListener("touchstart", stop);
      root.removeEventListener("pointerdown", stop);
      window.removeEventListener("keydown", stop);
      scrollAnimation.current = null;
    };
    scrollAnimation.current = stop;
    root.addEventListener("wheel", stop, { passive: true });
    root.addEventListener("touchstart", stop, { passive: true });
    root.addEventListener("pointerdown", stop, { passive: true });
    window.addEventListener("keydown", stop);
    const step = (now: number) => {
      const progress = Math.min(1, (now - started) / duration);
      const eased = (1 - Math.cos(Math.PI * progress)) / 2;
      root.scrollTop = start + distance * eased;
      if (progress < 1) frame = requestAnimationFrame(step);
      else stop();
    };
    frame = requestAnimationFrame(step);
  };

  return (
    <motion.div key="home" {...fade}
      ref={scrollRef}
      className="ss-home-page ss-home-scroll"
      style={{ position: "absolute", inset: 0, background: "#060606" }}
    >
      {/* ── HERO (first viewport) ── */}
      <div className="ss-home-hero ss-snap" data-slide="hero" data-label="Top" style={{ position: "relative", height: "100dvh", overflow: "hidden" }}>
        {/* BG image */}
        <img
          src="/assets/New_Shiri_Site_Pic.jpg"
          alt=""
          onLoad={() => setLoaded(true)}
          className={loaded ? "ss-hero-bg ss-hero-bg-active" : "ss-hero-bg"}
          style={{
            position: "absolute", inset: 0,
            width: "100%", height: "100%",
            objectFit: "cover", objectPosition: "65% 5%",
            filter: "url(#ss-portrait-detail) brightness(0.62) contrast(1.1)",
            zIndex: 1,
          }}
        />

        {/* Vignette */}
        <div style={{
          position: "absolute", inset: 0, zIndex: 2,
          background: "radial-gradient(ellipse 65% 100% at 72% 50%, transparent 25%, rgba(6,6,6,.65) 70%), linear-gradient(to bottom, rgba(6,6,6,.25) 0%, transparent 30%, transparent 65%, rgba(6,6,6,.85) 100%)",
        }} />

        {/* Content */}
        <div className="ss-hero-intro" style={{ position: "absolute", bottom: isMobile ? "14vh" : "24vh", left: "8vw", right: "8vw", zIndex: 10, transition: "bottom 0.3s ease" }}>
          <motion.p className="ss-hero-kicker"
            initial={REDUCE ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: REDUCE ? 0 : 0.4, delay: REDUCE ? 0 : 0.2, ease: APPLE_EASE }}>
            Designer &amp; developer
          </motion.p>
          <HeroName isMobile={isMobile} />

          <motion.div className="ss-hero-summary"
            initial={REDUCE ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.38, delay: REDUCE ? 0 : 0.5, ease: APPLE_EASE }}>
            <p className="ss-hero-description">
              Brand identity, web development, and 3D design. Based in the Bay Area.
            </p>
            <div className="ss-hero-actions">
              <button type="button" className="ss-hero-primary" onClick={() => onNavigate("work")} {...hover}>
                View my work
              </button>
              <button type="button" className="ss-hero-secondary" onClick={() => scrollToSection("open")} {...hover}>
                Explore the Lego Realm
              </button>
            </div>
          </motion.div>
        </div>

        {/* Scroll cue into the storyboard */}
        <motion.button
          initial={REDUCE ? false : { opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 0.35, delay: REDUCE ? 0 : 0.7 }}
          className="ss-story-cue"
          onClick={() => scrollToSection("selected")}
          aria-label="Scroll to selected work"
          {...hover}
          style={{ cursor: "none" }}
        >
          <span className="ss-cue-arrow">▼</span>
        </motion.button>
      </div>

      <SelectedWork onOpen={onMediaClick} onAllWork={() => onNavigate("work")} />

      {/* ── STORYBOARD, AS A DECK ──
          One chapter or one frame row per screen, each locking in place and staging
          itself in. Slide order is the only place the deck is described: `Slide` tags
          itself for the rail, so nothing else has to be kept in step. */}
      <div className="ss-story" style={{ position: "relative", background: "#060606", padding: "0 8vw" }}>

        {/* THE OPENER. Outside the 1180 column on purpose: it is the one slide that runs
            edge to edge, and it does that by cancelling `.ss-story`'s own padding rather
            than with a viewport unit (see `.ss-slide-open`). The type is put back on the
            deck's column by the inner, so the title starts on the same left edge every
            chapter below it does. */}
        <Slide id="open" label="My Lego Realm" className="ss-slide-open" stagger={0.14}>
          <div className="ss-open-bg">
            <motion.img
              className="ss-open-img"
              variants={sbOpen}
              src="/assets/story/story_sunset.jpg"
              alt="The cottage and footbridge beside the river at sunset."
              decoding="async"
            />
            <div className="ss-open-veil" aria-hidden />
          </div>
          <div className="ss-open-copy">
            <Words className="ss-open-title" text="My Lego Realm" variant={sbWordUp} stagger={0.07} />
            <Words
              className="ss-open-line"
              text="A real-time 3D environment you can walk through in your browser. Cross the river, climb the ruins, and find projects inside the buildings."
              variant={sbWordIn}
              stagger={0.018}
            />
          </div>
        </Slide>

        <div style={{ maxWidth: 1180, margin: "0 auto" }}>

          {/* THE TOWN IS A MAP, NOT TWO RECTANGLES. This slide replaces what were two
              separate screens (the "What it is" chapter over the figure and the night
              house, then a "Portals" row of the shop and the crystal), and it replaces
              them with the thing that copy was describing all along: the paragraph says
              the town is four structures and that each one stands for a category of work,
              which is a LEGEND, and the aerial the deck opens on is the map it belongs to.
              So the same shot comes back, close, with the four buildings pinned on it and
              a card that opens on whichever one you pick. Its four payloads are the four
              stills those two slides were showing anyway. */}
          <Slide id="map" label="Navigation" className="ss-slide-map" stagger={0.18}>
            {/* A SLIM HEADER OVER A WIDE MAP, never a type column beside a small one. Side
                by side the map came out 778 wide and the card covered 40% of it, so two of
                the four buildings were hidden the moment you opened one; and the title, at
                the size it earned two slides ago, was stranded in its own half. Across the
                full column the same card is a quarter of the map and nothing is hidden.
                The COPY IS ALSO SHORTER HERE, because the map now says the thing the long
                version was saying: the four structures and what each one stands for is the
                legend, and a paragraph listing them underneath it is the same sentence
                twice. */}
            {/* header and map in ONE column of the map's own width. Centred on its own the
                stage sat 148px inside the type above it and the two read as unrelated
                objects that happened to land on the same screen. */}
            <div className="ss-map-col">
              <StoryChapter
                pair
                kicker="Navigation"
                body="The coffee shop opens client work, the cottage holds personal projects, and the house leads to About. NABU is at the crystal above the ruins."
              />
              <RealmMap />
              <div className="ss-map-hint">Select a building to preview it</div>
            </div>
          </Slide>

          {/* THE WORKSHOP. All seven Blender captures on one screen, and the density is the
              point: everything above this is the world, cinematic and full bleed, and this
              is the evidence under it. They used to be spread over three slides in the same
              hero frames the world shots got, which said a node graph and a sunset were the
              same kind of picture. Small, gridded and monospaced says what they are.
              The caption is not lost with the frames, it is MOVED: one line under the sheet
              that answers to whichever cell you are on, so seven captions cost the height of
              one and the sheet stays a sheet. */}
          <Slide id="shop" label="Development" className="ss-slide-shop" stagger={0.18}>
            <StoryChapter
              pair
              kicker="Development"
              body="Blender handles the modeling and materials; Three.js handles the real-time scene. Compressed glTF files keep the models manageable. Collision follows the brick geometry, terrain controls each step, and the lighting changes as you explore. Most builds are my own, alongside a few modified free assets."
            />
            <WorkSheet />
          </Slide>


        </div>

        {/* THE DOOR, and it mirrors the opener: the same full bleed treatment on the other
            aerial, so the deck ends where it began with the way in on it. The MEASURED
            FIGURES sit above the title. They are the one thing the page can say that the
            pictures cannot, they are all real (scratchpad/realm_cost.cjs and CLAUDE.md),
            and they cost no screen of their own here. */}
        <Slide id="close" label="Enter the Realm" className="ss-slide-close" stagger={0.16}>
          <div className="ss-open-bg">
            <motion.img
              className="ss-open-img"
              variants={sbOpen}
              src="/assets/story/story_aerial_sunset.jpg"
              alt="The town from above at sunset, the lampposts coming on."
              decoding="async"
            />
            <div className="ss-open-veil" aria-hidden />
          </div>
          <div className="ss-open-copy">
            <motion.dl className="ss-figs" variants={sbGroup}>
              {REALM_FIGS.map((f) => (
                <motion.div key={f.label} className="ss-fig" variants={sbFig}>
                  <dd>{f.n}<i>{f.unit}</i></dd>
                  <dt>{f.label}</dt>
                </motion.div>
              ))}
            </motion.dl>
            <Words
              className="ss-open-line"
              text={realm.ok
                ? "Controls are displayed on entry."
                : "Open this page on a supported desktop or laptop to explore the environment. All portfolio projects are also available in Work."}
              variant={sbWordIn}
              stagger={0.018}
            />
            <motion.div
              variants={sbRise}
              style={{ display: "flex", alignItems: "center", gap: 22, flexWrap: "wrap", marginTop: 26 }}
            >
            {realm.ok ? (
              <a
                href="/lego.html"
                {...hover}
                className="ss-contact-btn"
                style={{
                  display: "inline-flex", alignItems: "center", gap: 10,
                  padding: "16px 30px", borderRadius: 980, minHeight: 46,
                  border: "1px solid rgba(245,242,237,.4)",
                  color: "var(--white)", textDecoration: "none",
                  fontSize: 13, fontWeight: 600, cursor: "none",
                }}
              >
                <span>Enter the Realm</span><span>→</span>
              </a>
            ) : (
              <p
                style={{
                  maxWidth: 430, fontSize: 14, lineHeight: 1.6,
                  color: "rgba(245,242,237,.62)",
                  fontFamily: "var(--sf)",
                }}
              >
                <span style={{
                  display: "block", marginBottom: 6,
                  fontFamily: "var(--sf)", fontSize: 10.5, fontWeight: 600,
                  letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--sky)",
                }}>
                  Desktop only
                </span>
                {realm.message}
              </p>
            )}
            <span
              role="button" tabIndex={0}
              onClick={() => onNavigate("work")}
              onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") onNavigate("work"); }}
              {...hover}
              className="ss-tap"
              style={{
                fontFamily: "var(--sf)",
                fontSize: 11.5, fontWeight: 590, letterSpacing: "0.05em", textTransform: "uppercase",
                color: "rgba(245,242,237,.72)", textDecoration: "underline",
                textUnderlineOffset: "4px", cursor: "none",
                display: "inline-block",   // ss-tap needs a box to hang its hit area on
              }}
            >
              {/* the "or" only makes sense standing next to the button */}
              {realm.ok ? "or browse the work" : "Browse the work"}
            </span>
            </motion.div>
          </div>
        </Slide>

      </div>

      <DeckRail scrollRef={scrollRef} />
    </motion.div>
  );
}

/* Story slides reveal once with a short group entrance. Headings and paragraphs
   arrive as complete units; the individual spans only preserve the established wraps. */
const SB_EASE = APPLE_EASE;

const sbSlide: Variants = {                       // a whole slide: paces its parts
  hidden: {},
  show: { transition: { staggerChildren: 0.04, delayChildren: 0 } },
};
const sbGroup: Variants = {                       // a nested group (a frame's own parts)
  hidden: {},
  show: { transition: { staggerChildren: 0.03, delayChildren: 0 } },
};

/* Text uses one short entrance per heading or paragraph. */
const sbWordUp: Variants = {                      // heading: a small grouped arrival
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.36, ease: SB_EASE } },
};
const sbWordIn: Variants = {                      // body: a short grouped arrival
  hidden: { opacity: 0, y: 5 },
  show: { opacity: 1, y: 0, transition: { duration: 0.32, ease: SB_EASE } },
};
const sbRise: Variants = {                        // anything that just rises
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.72, ease: SB_EASE } },
};
const sbHead: Variants = {                        // the frame's head strip: wipes open left to right
  hidden: { opacity: 0, clipPath: "inset(0% 100% 0% 0%)" },
  show: { opacity: 1, clipPath: "inset(0% 0% 0% 0%)", transition: { duration: 0.62, ease: SB_EASE } },
};
const sbCap: Variants = {                         // the caption: unmasks upward off its own rule line
  hidden: { opacity: 0, y: 14, clipPath: "inset(0% 0% 100% 0%)" },
  show: { opacity: 1, y: 0, clipPath: "inset(0% 0% -6% 0%)", transition: { duration: 0.7, ease: SB_EASE } },
};
const sbBox: Variants = {                         // the frame CHROME, drawn before anything is in it
  hidden: { y: 30, borderColor: "rgba(245,242,237,0)" },
  show: {
    y: 0, borderColor: "rgba(245,242,237,0.16)",
    transition: { duration: 0.8, ease: SB_EASE, staggerChildren: 0.13, delayChildren: 0.14 },
  },
};
const sbOpen: Variants = {                        // the opener's picture: a slow settle out of scale
  hidden: { opacity: 0, scale: 1.015 },
  show: { opacity: 1, scale: 1, transition: { duration: 1.9, ease: SB_EASE } },
};

/* Splits a string into per-word spans so a heading or a paragraph can arrive a word at
   a time. The word is wrapped in its OWN inline-block: a transform on a raw text run
   does nothing, and a mask on it would clip the descenders, which is why the entrances
   above move and rotate rather than clip. The trailing space is a non-breaking one
   INSIDE the span, so inline-blocks that would otherwise collapse their whitespace
   still set as a sentence. */
/* A "\\n" in the text is a HARD line break, and the chapter titles need one. Left to wrap
   on its own a display title breaks wherever the column happens to run out, which at this
   size is always the wrong place: "Why I made" / "it" and "How I made" / "it" both strand
   the object on a line of its own. The break is a real <br> between two runs of word spans,
   so every word still animates on its own and the stagger runs straight through it. The
   nodes are flattened into one array rather than grouped per line, which keeps the <br> a
   sibling of the spans and needs no fragment.
   THE TRAILING SPACE IS A NON-BREAKING ONE (U+00A0) AND IT IS LOAD BEARING. A word is an
   inline-block, and an ordinary trailing space inside one is collapsed away at the end of
   the box: retyped as " " this renders every paragraph on the page as one unbroken run,
   "Theenvironmentisasmalltown". It is a real character in the source, not an escape. */
function Words({ text, variant, className, style }: {
  text: string; variant: Variants; stagger?: number; className?: string; style?: React.CSSProperties;
}) {
  const nodes: React.ReactNode[] = [];
  text.split("\n").forEach((line, li) => {
    if (li > 0) nodes.push(<br key={"br" + li} />);
    const words = line.split(" ");
    words.forEach((w, i) => nodes.push(
      <span key={li + "-" + i} className="ss-w" style={{ display: "inline-block" }}>
        {w}{i < words.length - 1 ? " " : ""}
      </span>
    ));
  });
  return (
    <motion.p
      className={className}
      style={style}
      variants={variant}
    >
      {nodes}
    </motion.p>
  );
}

/* ── PER-CHAPTER PHOTO SIGNATURES ───────────────────────────────────────────────────
   Each chapter brings its stills in its own way, so scrolling the deck reads as four
   passages rather than one effect repeated thirteen times. Only the PHOTOS differ:
   head strips, captions and copy keep the shared wipe/rise/word rhythm above, and that
   common rhythm is what holds the chapters together while the images behave
   differently.
   The frame panel is overflow:hidden, so a still that slides or is clipped moves inside
   its own window rather than spilling over the border. */
/* THE STEPPED REVEAL IS GONE (user, 2026-09-09: "i still have that glitch effect style
   for pictures that load in"). `stepEase(n)` QUANTIZED a tween into n held intervals, so
   a picture did not arrive, it jumped four to six times on the way in. It was built on
   purpose, as the deck's echo of a LEGO build going on course by course, and it is the
   single least Apple thing the page did: their whole vocabulary is one continuous move.
   It drove four things and all four are now smooth: every deck picture, the closer's
   figures, the map's pins and the map's card.
   AND THE WIPE ITSELF WENT WITH IT, not just its stepping. A clip revealing bottom to
   top is a curtain, which is a stage gesture; smoothing it would have left a smooth
   curtain. A picture on an Apple page fades and settles, so that is what this does. It
   moves on `y` rather than `scale` deliberately: `.ss-plate-shot` and `.ss-cell-shot`
   crop their images with `overflow:hidden`, and scaling a wrapper inside a crop pushes
   the picture against its own frame. A transform costs no layout either way. */
const shotReveal: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.85, ease: APPLE_EASE } },
};

/* A PLATE: a still with no border, no head strip and no caption box. The frame chrome was
   right when every picture on the deck was one of thirteen specimens in a catalogue; it is
   wrong now that the world shots are full bleed and the Blender captures are a contact
   sheet. A label over it, the picture, a caption under it, all in the open. */
function Plate({ scene, src, caption }: { scene: string; src: string; caption: string }) {
  return (
    <motion.figure className="ss-plate" variants={sbBox}>
      <motion.span className="ss-plate-label" variants={sbHead}>{scene}</motion.span>
      <motion.div className="ss-plate-shot" variants={shotReveal}>
        <img src={src} alt={scene} loading="lazy" decoding="async" />
      </motion.div>
      <motion.figcaption variants={sbCap}>{caption}</motion.figcaption>
    </motion.figure>
  );
}

/* ── THE WORKSHOP SHEET ──────────────────────────────────────────────────────────────
   The seven Blender captures as one contact sheet. The cell you are on is answered by a
   single caption line under the grid rather than by seven blocks of prose between the
   thumbnails, which is what lets the sheet stay dense enough to read as evidence.
   The line is ALWAYS PRESENT, holding the first cell's caption at rest, so nothing on the
   slide moves when you point at a cell: revealing it only on hover made the grid jump
   every time the pointer crossed one. */
const WORK_SHEET = [
  { scene: "Assembly", src: "/assets/story/story_blender_shop_assembly.jpg",
    caption: "The coffee shop in progress, assembled from individual bricks on the same stud grid used by the engine." },
  { scene: "Mesh editing", src: "/assets/story/story_blender_ruins_edit.jpg",
    caption: "Building the ruins in Edit Mode. The highlighted brick course forms the next section above the doorway." },
  { scene: "Sculpting", src: "/assets/story/story_blender_hair_sculpt.jpg",
    caption: "The character's hair in Sculpt Mode under a clay material. Roughly 8,000 vertices shaped by hand, then exported with cleaned normals for smooth shading." },
  { scene: "UV and texturing", src: "/assets/story/story_blender_skull_uv.jpg",
    caption: "The skull’s UV layout on the left and its mapped texture on the right. Printed details are applied through the same workflow." },
  { scene: "Figure assembly", src: "/assets/story/story_blender_figure_exploded.jpg",
    caption: "The minifig broken into its parts: hair, head, torso, and arms. The legs are a separate asset, attached to the hip pivots at runtime so the walk cycle can swing them." },
  { scene: "Materials", src: "/assets/story/story_blender_house_nodes.jpg",
    caption: "The house during construction, with the node graph for its tinted window material below the viewport." },
  { scene: "Render preview", src: "/assets/story/story_blender_cottage_render.jpg",
    caption: "Checking the cottage’s materials and lighting in Blender before export." },
];

function WorkSheet() {
  const [at, setAt] = useState(0);
  return (
    <motion.div className="ss-sheet" variants={sbGroup}>
      <div className="ss-sheet-grid">
        {WORK_SHEET.map((c, i) => (
          <motion.button
            key={c.src}
            className={`ss-cell${i === at ? " on" : ""}`}
            variants={sbBox}
            onMouseEnter={() => setAt(i)}
            onFocus={() => setAt(i)}
            aria-label={c.scene}
          >
            <motion.span className="ss-cell-shot" variants={shotReveal}>
              <img src={c.src} alt={c.scene} loading="lazy" decoding="async" />
            </motion.span>
            <span className="ss-cell-label">{c.scene}</span>
          </motion.button>
        ))}
      </div>
      <motion.p className="ss-sheet-cap" variants={sbCap}>
        <b>{WORK_SHEET[at].scene}</b>{WORK_SHEET[at].caption}
      </motion.p>
    </motion.div>
  );
}

/* The measured figures on the closing slide. Every one is real and in the docs: the frame
   cost and the draw calls were counted in the live page by scratchpad/realm_cost.cjs, the
   file count with them, and the cycle is CYCLE_SECS. */
const REALM_FIGS = [
  { n: "15.9", unit: "M", label: "Triangles a frame" },
  { n: "689", unit: "", label: "Draw calls" },
  { n: "35", unit: "", label: "Models loaded" },
  { n: "7", unit: "min", label: "Full day cycle" },
];
const sbFig: Variants = {                         // a figure rises into place
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: APPLE_EASE } },
};

/* ── THE TOWN MAP ────────────────────────────────────────────────────────────────────
   The four structures of the Realm pinned on the aerial the deck opens on, each opening a
   card that names the category of work it holds. This is the one element on the page that
   does what the Realm does rather than describing it.
   Two things about it are not obvious:
   · THE PINS ARE IN IMAGE SPACE, NOT CONTAINER SPACE. A percentage inside the stage would
     drift off its building the moment the stage's aspect stopped matching the picture's, so
     `fit` measures the CONTAINED box (the letterboxed rect the image really occupies) and
     the pins are positioned inside that. `contain` and not `cover` for the same reason: a
     map that crops its own corners off on a narrow window is not a map, and the mansion
     sits at 95% of the frame's width where any horizontal crop would take it.
   · A PIN IS A BUTTON. Hover opens a card on a mouse, but hover is not available on a
     phone and is not available from a keyboard, so click and focus open it too and the
     open card is real state rather than a CSS hover. */
/* EACH LINE NAMES THE WORK BEHIND THE PORTAL, NOT THE WEATHER IN THE PICTURE
   (user, 2026-09-03: the wording was "not professional or formal at all"). These four
   read as scene setting: "the shop at dusk, its terrace laid out under the umbrella",
   "the house after dark", the crystal's emissive material. That is a caption for a
   photograph, and the photograph is already on the card, above the words, saying all of
   it better. It also broke the site-copy-tone rule this project has reinforced before:
   professional and technical, never poetic.
   The card carries a CATEGORY, a NAME and this line, so the line is the only slot able to
   answer the question a visitor actually has, which is what is in there. Each is now the
   contents of that portal, taken from the real PROJECTS entries above, so nothing here
   claims work that is not on the site. Kept to 12 to 15 words: the card is about 280px
   wide at 12.5px, and it grows UPWARD off `bottom: 3.6%`, so a long line walks it up the
   map and over the buildings.
   THE NAMES ARE TITLE CASE AND THE COTTAGE LOST ITS ADJECTIVE (user, 2026-09-03). These
   are the names of four places, so they are set as proper nouns rather than as
   descriptions that happen to be sitting in a name slot. "The run down cottage" is now
   "The Cottage": "run down" was the one informal word among the four, and dropping it
   leaves a bare noun exactly as "The Ruins" already was, with no second cottage anywhere
   in the world for it to be confused with.
   In PROSE (the two alt strings and the workshop captions) the ARTICLE stays lower case
   and only the name is capitalised, "the Cottage", because "The Cottage" mid sentence
   reads as a broken sentence rather than as a proper noun. */
const REALM_MAP = [
  { id: "shop", name: "The Coffee Shop", cat: "Professional Services", x: 18.2, y: 26.0, flip: false,
    src: "/assets/story/story_shop_evening.jpg",
    line: "Commissioned client work. Full-stack websites, brand and print for small businesses, and concept visualization." },
  { id: "cottage", name: "The Cottage", cat: "Personal Projects", x: 53.5, y: 25.0, flip: false,
    src: "/assets/story/story_sunset.jpg",
    line: "Self-directed work. 3D modeling and rendering, product prototypes, custom hardware, photography and fabrication." },
  { id: "house", name: "The Modern House", cat: "About", x: 93.5, y: 38.0, flip: true,
    src: "/assets/story/story_lamp_night.jpg",
    line: "Background and training, and how the disciplines across the rest of the site fit together." },
  { id: "ruins", name: "The Ruins", cat: "NABU", x: 13.0, y: 85.0, flip: false,
    src: "/assets/story/story_crystal_night.jpg",
    line: "Art direction, promotional video and campaign photography for the NABU streetwear brand." },
];

/* The pin grows in rather than snapping on. It starts at 0.55 and not at 0: a dot that
   begins at nothing has no size to read at its first frames and flickers into being,
   which was the same stutter the stepping gave everything else. */
const sbPin: Variants = {
  hidden: { opacity: 0, scale: 0.55 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.55, ease: APPLE_EASE } },
};
const sbCard: Variants = {                        // and the card settles up under it
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: APPLE_EASE } },
};

function RealmMap() {
  const stage = useRef<HTMLDivElement>(null);
  const cardEl = useRef<HTMLDivElement>(null);
  const [fit, setFit] = useState({ left: 0, top: 0, w: 0, h: 0 });
  const [box, setBox] = useState({ w: 0, h: 0 });   // the stage itself, for the clamp
  const [bleed, setBleed] = useState({ l: 0, r: 0 }); // and how far past it a card may go
  const [cardH, setCardH] = useState(0);
  const [open, setOpen] = useState<string | null>(null);
  const [pinned, setPinned] = useState(false);

  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    const IW = 2400, IH = 1350;                    // story_aerial_town.jpg, measured
    const measure = () => {
      const r = el.getBoundingClientRect();
      if (!r.width || !r.height) return;
      const sc = Math.min(r.width / IW, r.height / IH);
      const w = IW * sc, h = IH * sc;
      setFit({ left: (r.width - w) / 2, top: (r.height - h) / 2, w, h });
      /* HOW FAR A CARD MAY HANG OFF THE PICTURE (user, 2026-09-09: the modals can be out
         of the frame of the map, it doesn't have to be within its boundaries). The map is
         capped at 58vh of 16/9, so on a wide window it leaves a band of empty page either
         side of itself, and that band is the best room on the slide: nothing is drawn in
         it. Measured in the stage's OWN coordinates so the clamp can use it directly.
         Vertically there is no bleed at all: the chapter copy is directly above the stage
         and the hint line directly under it, and both are text.
         THE LIMIT IS THE CLIPPING ANCESTOR, NOT THE WINDOW, and a rect check cannot see
         the difference. `.ss-slide` is `overflow: hidden` on purpose (the watermark numeral
         is laid out to bleed, and a slide that scrolls by 36px is a broken snap point), and
         it sits inside the story's own 8vw gutters: at 1024 that edge is x 82, so a card
         allowed out to the window was cut off mid word while every bounding box still
         reported it on screen. So the walk collects every clipping ancestor and the card is
         held inside the tightest of them, less 8. The right hand limit also answers to the
         deck rail, which is fixed to the WINDOW rather than to the slide. */
      const vw = document.documentElement.clientWidth;
      let clipL = 0, clipR = vw;
      for (let n: HTMLElement | null = el; n && n !== document.documentElement; n = n.parentElement) {
        const cs = getComputedStyle(n);
        if (cs.overflowX !== "visible") {
          const q = n.getBoundingClientRect();
          clipL = Math.max(clipL, q.left); clipR = Math.min(clipR, q.right);
        }
      }
      setBleed({ l: clipL + 8 - r.left, r: Math.min(clipR - 8, vw - 64) - r.left });
      setBox({ w: r.width, h: r.height });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  /* THE CARD'S REAL HEIGHT IS MEASURED, NOT ESTIMATED, because it is what decides whether
     a card opening below its pin still fits on the stage, and the four descriptions are
     different lengths so the same width is not the same height. It is read in a LAYOUT
     effect, before the browser paints, so the one frame it takes to correct an estimate is
     never on screen; the estimate below is only ever used for the very first frame of the
     very first card. */
  useLayoutEffect(() => {
    if (!open) return;
    const el = cardEl.current;
    if (el) setCardH(el.offsetHeight);
  }, [open, box.w]);

  const shown = REALM_MAP.find((b) => b.id === open) || null;
  const place = shown ? cardPos(shown) : undefined;
  return (
    <div className="ss-map-frame">
    <motion.div className="ss-map-stage" ref={stage} variants={sbRise}>
      {/* a blurred bed behind, so the letterbox on an off aspect window is the world out
          of focus rather than two black bars */}
      <img className="ss-map-bed" src="/assets/story/story_aerial_town.jpg" alt="" aria-hidden decoding="async" />
      <div className="ss-map-fit" style={{ left: fit.left, top: fit.top, width: fit.w, height: fit.h }}>
        <img className="ss-map-img" src="/assets/story/story_aerial_town.jpg"
          alt="The town from above: the Coffee Shop, the Cottage, the Modern House and the Ruins."
          decoding="async" />
        {REALM_MAP.map((b) => (
          <motion.button
            key={b.id}
            variants={sbPin}
            className={`ss-map-pin${b.flip ? " flip" : ""}${open === b.id ? " on" : ""}`
              + (open === b.id && place?.covered ? " hushed" : "")}
            style={{ left: b.x + "%", top: b.y + "%", x: "-50%", y: "-50%" }}
            onMouseEnter={() => { if (!pinned) setOpen(b.id); }}
            onMouseLeave={() => { if (!pinned) setOpen(null); }}
            onFocus={() => setOpen(b.id)}
            onClick={() => {
              const same = open === b.id && pinned;
              setPinned(!same);
              setOpen(same ? null : b.id);
            }}
            aria-label={b.name + ", " + b.cat}
          >
            <span className="ss-map-stud" aria-hidden />
            <span className="ss-map-tag">{b.cat}</span>
          </motion.button>
        ))}
      </div>
    </motion.div>
    {card()}
    </div>
  );

  /* THE CARD IS A SIBLING OF THE STAGE, NOT A CHILD OF IT, and that is what lets it stop
     being an overlay on a phone. The stage is aspect locked to the picture, so anything
     inside it is stuck over the map: at 390 the map is 328 wide and a card laid on it
     covered more than half the town, which is the one thing a map may not do. Outside it,
     the same element is absolutely positioned over the map on a wide window and drops to a
     plain block underneath it on a narrow one, where the deck is not snapped and the extra
     height costs nothing. */
  /* WHERE A CARD OPENS. It hangs off its own pin's point in the FITTED image (the picture
     is letterboxed inside the stage on an off aspect window, so a percentage of the stage
     is not a percentage of the map), on the side of the pin with the most room: outward
     from the middle horizontally, downward from a pin in the top half and upward from one
     in the bottom half. Both axes are then clamped inside the stage, so a card never hangs
     off the picture however small the window is.
     Anchoring by LEFT/TOP in pixels rather than by percentages is what makes the clamp
     honest: the card's width tracks the frame and its height tracks its own copy, and
     neither is expressible in the percentage the other axis is measured in.
     Returns nothing until the frame has been measured, which leaves the stylesheet's
     bottom right fallback in place for that first frame. */
  function cardPos(b: (typeof REALM_MAP)[number]) {
    if (!box.w || !fit.w) return undefined;
    /* NEAR is the clearance a pin needs, measured off the pin and not guessed: the stud is
       15px across and carries a 4px dark ring, so 16 from its CENTRE is the card edge just
       clear of the drawn dot. It was 24 first, and that is too much to spend: at 1512 it
       rejected the one placement that puts the Ruins card above its pin, over a Coffee Shop
       stud 5px outside its own ring, and sent the card down onto its own label instead. */
    const PAD = 10, GAP = 20, NEAR = 16;
    const w = Math.min(box.w * 0.28, 306);
    const h = cardH || w * 9 / 16 + 104;
    const at = (q: (typeof REALM_MAP)[number]) =>
      ({ x: fit.left + fit.w * q.x / 100, y: fit.top + fit.h * q.y / 100 });
    const p = at(b);
    const others = REALM_MAP.filter((q) => q.id !== b.id).map(at);
    /* FOUR CORNERS, TRIED IN ORDER, AND THE ORDER IS THE PREFERENCE. Outward from the
       middle of the map horizontally and away from the nearer edge vertically is the
       first choice, because that is the quadrant with the most room; the other three are
       the fallbacks, most similar first. */
    const outX = b.x < 50, downY = b.y < 55;
    const corners: [boolean, boolean][] =
      [[outX, downY], [outX, !downY], [!outX, downY], [!outX, !downY]];
    let best: { left: number; top: number; hits: number; tag: boolean } | null = null;
    for (const [right, down] of corners) {
      const L = Math.min(PAD, bleed.l), R = Math.max(box.w - PAD, bleed.r);
      const left = Math.max(L, Math.min(right ? p.x + GAP : p.x - GAP - w, R - w));
      const top = Math.max(PAD, Math.min(down ? p.y + GAP : p.y - GAP - h, box.h - h - PAD));
      /* A CARD MAY NOT SIT ON ANOTHER STRUCTURE'S PIN. Clamping keeps a card on the stage
         and can slide it back across the map while doing it, so the corners are scored
         AFTER the clamp, not before: at 1024 the Ruins card opened upward and landed
         squarely on the Coffee Shop, which is a pin you can then neither see nor click. */
      /* SCORED, NOT JUST TESTED, because on a small stage the clamp can leave every
         corner covering something. A pin another structure is opened by counts TEN and its
         own label ONE: a hidden pin costs the visitor a whole building, a hidden category
         costs three words that the card is standing next to. */
      let hits = 10 * others.filter((q) => q.x > left - NEAR && q.x < left + w + NEAR
        && q.y > top - NEAR && q.y < top + h + NEAR).length;
      /* AND NOT ON ITS OWN PIN'S LABEL EITHER. The card gave up printing the category
         yesterday precisely because the pin already carries it, so covering that tag would
         take the category off the screen altogether. The tag's width is ESTIMATED rather
         than measured (14px of padding plus 7.6 a character, against the 6.8 to 7.9 the
         four real labels measure at 10px), which is deliberately generous: this is a test
         for clear air, so erring wide only ever moves a card that could have stayed. */
      const tw = 14 + 7.6 * b.cat.length, tx = b.flip ? p.x - 10 - tw : p.x + 10;
      const tag = tx < left + w + 4 && tx + tw > left - 4
        && p.y - 11 < top + h + 4 && p.y + 11 > top - 4;
      if (tag) hits++;
      const c = { left, top, hits, tag };
      if (!hits) { best = c; break; }
      if (!best || hits < best.hits) best = c;
    }
    /* `tag` IS REPORTED BACK, and it is the tag's own hit and not the score, because a
       corner can be chosen for covering a label while covering no pin and the other way
       round. A label the card lands on is HIDDEN rather than left with its end poking out
       from under the corner: on a short stage the Ruins card cannot fit above its own pin
       and there is nowhere clear to put the label, and a card standing on a legible name
       and a full sentence is a better label than three words half behind it. */
    return { style: { left: best!.left, top: best!.top, right: "auto", bottom: "auto" },
      covered: best!.tag };
  }

  function card() {
    return (
      <AnimatePresence>
        {shown && (
          <motion.div
            key={shown.id}
            ref={cardEl}
            className="ss-map-card"
            style={place?.style}
            variants={sbCard}
            initial="hidden" animate="show"
            exit={{ opacity: 0, transition: { duration: 0.16 } }}
          >
            <img src={shown.src} alt={shown.name} decoding="async" />
            <div className="ss-map-card-body">
              {/* THE BLUE CATEGORY LINE IS GONE FROM THE CARD (user, 2026-09-09). The card
                  already opens from a pin that carries the category as its own label, so
                  printing it again three pixels above the structure's name was the same
                  word twice in one glance, in the loudest colour on the page.
                  `cat` ITSELF STAYS in REALM_MAP: it is what the pin's `.ss-map-tag` shows
                  on hover and half of the pin's aria-label, so the category is still
                  announced and still readable, just not repeated inside the card. */}
              <span className="ss-map-card-name">{shown.name}</span>
              <p>{shown.line}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }
}

/* One deck slide. The ONLY thing on the storyboard that watches the viewport: every
   part inside it inherits from here. `data-slide` / `data-label` are what the rail
   reads, so adding a slide adds a tick and nothing else has to be kept in step. */
function Slide({ id, label, className, stagger, children }: {
  id: string; label: string; className?: string; stagger?: number; children: React.ReactNode;
}) {
  const pace: Variants = stagger
    ? { hidden: {}, show: { transition: { staggerChildren: 0.04, delayChildren: 0 } } }
    : sbSlide;
  return (
    <motion.section
      className={`ss-slide ss-snap${className ? " " + className : ""}`}
      data-slide={id}
      data-label={label}
      variants={pace}
      initial="hidden"
      whileInView="show"
      viewport={{ amount: 0.2, once: true }}
    >
      <div className="ss-slide-inner">{children}</div>
    </motion.section>
  );
}

/* A storyboard chapter: a TITLE and a PARAGRAPH, and nothing else (user, 2026-09-03).
   It carried a number, a rule under the number and a contents line reading "Two frames ·
   FR 05 – 06"; all three are gone and the reasoning is on `.ss-chapter-head` in the CSS.
   `pair` is the chapter that SHARES its screen with two stills, which is all of them but
   04: title and copy go side by side so the header is a band rather than a column and the
   rest of the slide's height goes to the pictures. Stacked, the two together run past half
   the viewport on a laptop and the stills have nowhere left to go.
   `children` is the one thing that hangs off a chapter and is not type: 04's way in. */
/* ── HOW FAR THIS ELEMENT HAS COME UP THE SCREEN, 0 to 1 ────────────────────────────
   The deck is SNAP LOCKED, so there is no scrolling "within" a slide to scrub against:
   each slide is one screen and the scroller settles on it. What there IS, is the snap
   ITSELF. A snap animates the scroll position over a few hundred milliseconds, so an
   element's distance up the viewport is a real, continuous, REVERSIBLE signal during
   exactly the moment a slide is arriving. That is what this reads.
   So the copy lights up as the slide comes in and dims again as it leaves, both driven by
   where you actually are rather than by an entrance that fires once and is spent. Scroll
   up and it runs backwards, which is the whole point and the thing the deck could not do.
   It listens on the HOME SCROLLER and not on window: the page is `position:absolute;
   inset:0` and scrolls inside its own element, so window scroll events never fire. */
function useRiseProgress(ref: React.RefObject<HTMLElement | null>) {
  const [p, setP] = useState(REDUCE ? 1 : 0);
  useEffect(() => {
    if (REDUCE) return;
    const el = ref.current;
    if (!el) return;
    const scroller = el.closest(".ss-home-scroll") as HTMLElement | null;
    let raf = 0;
    const read = () => {
      raf = 0;
      const vh = window.innerHeight || 1;
      const r = el.getBoundingClientRect();
      /* HOW MUCH OF THE BLOCK HAS ENTERED THE VIEWPORT, measured against ITS OWN HEIGHT
         and not against fixed marks on the screen.
         The first version ramped between two fractions of the viewport, 0 below 92% and 1
         at 58%, which silently assumed every block sits in the upper half of its slide.
         That held while all three chapters had the same band at the top and broke the
         moment they did not: on the inverted slide the paragraph sits near the FOOT, at
         about 80% down, so it could never rise past the 58% mark and its last two lines
         stayed permanently half lit.
         Against the element's own height there is nothing to assume: 0 as its top touches
         the bottom of the screen, 1 once it has come up by its own height, wherever on the
         slide that happens to be. The 0.75 makes it finish a little before it is fully in
         view, so a settled slide is never still resolving. */
      const risen = (vh - r.top) / Math.max(1, r.height * 0.75);
      setP(risen < 0 ? 0 : risen > 1 ? 1 : risen);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(read); };
    (scroller || window).addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    read();
    return () => {
      if (raf) cancelAnimationFrame(raf);
      (scroller || window).removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [ref]);
  return p;
}

/* Apple sets a paragraph dim and brightens it word by word against the scroll. Each word
   gets its own slice of the progress with a little overlap, so the light travels through
   the sentence instead of the whole block stepping up together.
   IT IS A COLOUR RAMP, NOT AN OPACITY ONE. Opacity would fade the words against whatever
   is behind them, and on the deck that is a photograph on two of the slides; ramping the
   colour keeps the text opaque and lets it come up out of the page's own grey.
   THE SEPARATOR IS A PLAIN SPACE, NOT U+00A0, and this is the opposite of the rule that
   governs `Words`. There the spans are inline-BLOCK, so a line may break between two boxes
   whatever sits inside them, and the trailing space has to be non-breaking or it collapses
   away at the end of its box. These spans are plain inline, so an NBSP between words is
   exactly what it says: the paragraph would never wrap and would run off the slide. */
function LitWords({ text, p }: { text: string; p: number }) {
  const words = text.split(" ");
  const n = words.length;
  return (
    <>
      {words.map((w, i) => {
        const start = (i / n) * 0.82;
        const k = Math.min(1, Math.max(0, (p - start) / 0.2));
        return (
          <span
            key={w + i}
            style={{
              color: `rgba(245,242,237,${(0.22 + 0.56 * k).toFixed(3)})`,
              transition: "color .12s linear",
            }}
          >
            {w}
            {i < n - 1 ? " " : ""}
          </span>
        );
      })}
    </>
  );
}

function StoryChapter({ kicker, body, pair, children }: {
  kicker: string; body: string; pair?: boolean; children?: React.ReactNode;
}) {
  const kickerEl = <Words className="ss-story-kicker" text={kicker} variant={sbWordUp} stagger={0.055} />;
  // size, leading and colour come from `.ss-chapter-body`, not from an inline style: an
  // inline style beats a stylesheet, and the body's size has to be able to give way on a
  // short or narrow window for the slide to keep fitting its own screen.
  // THE BODY IS NO LONGER A ONE SHOT ENTRANCE. `Words` staggered it in once on arrival;
  // it is now driven by where the slide actually is, so it also runs backwards. The
  // kicker keeps its entrance: it is the title, and a title that dims as you scroll away
  // from it reads as broken rather than as responsive.
  const bodyRef = useRef<HTMLDivElement>(null);
  const p = useRiseProgress(bodyRef);
  const bodyEl = <LitWords text={body} p={p} />;
  if (pair) {
    return (
      <div className="ss-chapter-head">
        <div>{kickerEl}</div>
        <div className="ss-chapter-body" ref={bodyRef}>{bodyEl}</div>
      </div>
    );
  }
  return (
    <div className="ss-chapter-stack">
      {kickerEl}
      <div className="ss-chapter-body" ref={bodyRef}>{bodyEl}</div>
      {children}
    </div>
  );
}

/* The deck rail: which slide is on screen, and a click to jump to any of them. Reads
   the slides out of the DOM rather than off a second list, so the two can never drift.
   The active one is chosen with a rootMargin that collapses the viewport to its own
   middle band, which means EXACTLY ONE slide qualifies at a time. A threshold on a
   100dvh slide would not: during a snap two of them are partly on screen at once. */
function DeckRail({ scrollRef }: { scrollRef: React.RefObject<HTMLDivElement> }) {
  const [slides, setSlides] = useState<{ id: string; label: string }[]>([]);
  const [active, setActive] = useState(0);
  const els = useRef<HTMLElement[]>([]);

  useEffect(() => {
    const root = scrollRef.current;
    if (!root) return;
    const found = Array.from(root.querySelectorAll<HTMLElement>("[data-slide]"));
    els.current = found;
    setSlides(found.map((e) => ({ id: e.dataset.slide || "", label: e.dataset.label || "" })));
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            const i = els.current.indexOf(e.target as HTMLElement);
            if (i >= 0) setActive(i);
          }
        }
      },
      { root: null, rootMargin: "-48% 0px -48% 0px", threshold: 0 }
    );
    found.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, [scrollRef]);

  const jump = (i: number) => {
    const root = scrollRef.current;
    const el = els.current[i];
    if (!root || !el) return;
    root.scrollTo({
      top: root.scrollTop + el.getBoundingClientRect().top - root.getBoundingClientRect().top,
      behavior: REDUCE ? "auto" : "smooth",
    });
  };

  if (slides.length < 2) return null;
  const on = active > 0;                          // stays out of the way over the hero
  return (
    <>
      <div className={`ss-deck-rail${on ? " on" : ""}`} aria-hidden={!on}>
        {slides.map((sl, i) => (
          <button
            key={sl.id}
            type="button"
            className={`ss-deck-tick${i === active ? " on" : ""}`}
            onClick={() => jump(i)}
            aria-label={sl.label}
            aria-current={i === active}
            style={{ cursor: "none" }}
          >
            <span className="ss-deck-tip">{sl.label}</span>
          </button>
        ))}
      </div>
      <div className={`ss-deck-count${on ? " on" : ""}`}>
        <b>{String(active + 1).padStart(2, "0")}</b> / {String(slides.length).padStart(2, "0")}
      </div>
    </>
  );
}

/* Work page background: slow, clean particle flow. Particles emit the active
   project's colour; a single canvas runs continuously (motion never resets),
   and the base + emit colours lerp when the slide changes. */
function WorkParticles({ base, emit }: { base: string; emit: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const target = useRef({ base, emit });
  useEffect(() => { target.current = { base, emit }; }, [base, emit]);
  useEffect(() => {
    const canvas = ref.current; if (!canvas) return;
    const ctx = canvas.getContext("2d"); if (!ctx) return;
    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0, h = 0, raf = 0, last = performance.now();
    const resize = () => {
      w = canvas.clientWidth; h = canvas.clientHeight;
      canvas.width = Math.max(1, Math.floor(w * DPR)); canvas.height = Math.max(1, Math.floor(h * DPR));
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    };
    resize(); window.addEventListener("resize", resize);
    const P = Array.from({ length: 12 }, () => ({
      x: Math.random(), y: Math.random(), r: 110 + Math.random() * 280,      // fewer, bigger, varied sizes
      vx: (Math.random() - 0.5) * 0.024, vy: (Math.random() - 0.5) * 0.024,  // slow but visible drift
      ph: Math.random() * Math.PI * 2, sp: 0.07 + Math.random() * 0.12,
      a: 0.14 + Math.random() * 0.12,
    }));
    const hexToRgb = (hx: string) => { const s = hx.replace("#", ""); const n = parseInt(s.length === 3 ? s.split("").map(c => c + c).join("") : s, 16); return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 }; };
    const emitRgb = (e: string) => { const m = e.split(",").map(Number); return { r: m[0], g: m[1], b: m[2] }; };
    const cur = hexToRgb(base); const curE = emitRgb(emit);
    const draw = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000); last = now;
      const tb = hexToRgb(target.current.base); const te = emitRgb(target.current.emit); const k = Math.min(1, dt * 1.3);
      cur.r += (tb.r - cur.r) * k; cur.g += (tb.g - cur.g) * k; cur.b += (tb.b - cur.b) * k;
      curE.r += (te.r - curE.r) * k; curE.g += (te.g - curE.g) * k; curE.b += (te.b - curE.b) * k;
      ctx.fillStyle = `rgb(${cur.r | 0},${cur.g | 0},${cur.b | 0})`; ctx.fillRect(0, 0, w, h);
      const er = curE.r | 0, eg = curE.g | 0, eb = curE.b | 0;
      for (const p of P) {
        p.x += p.vx * dt; p.y += p.vy * dt; p.ph += p.sp * dt;
        if (p.x < -0.2) p.x = 1.2; if (p.x > 1.2) p.x = -0.2;
        if (p.y < -0.2) p.y = 1.2; if (p.y > 1.2) p.y = -0.2;
        const px = (p.x + Math.sin(p.ph) * 0.02) * w, py = (p.y + Math.cos(p.ph * 0.8) * 0.02) * h;
        const g = ctx.createRadialGradient(px, py, 0, px, py, p.r);
        g.addColorStop(0, `rgba(${er},${eg},${eb},${p.a})`); g.addColorStop(1, `rgba(${er},${eg},${eb},0)`);
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(px, py, p.r, 0, Math.PI * 2); ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={ref} aria-hidden style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block", zIndex: 0 }} />;
}

/* ─────────────────────────────────────────────────────────────
   WORK PAGE
───────────────────────────────────────────────────────────── */
function WorkPage({ onCardClick }: { onCardClick: (p: Project) => void }) {
  const hover = useCursorHover();
  const [size, setSize] = useState({ width: window.innerWidth, height: window.innerHeight });
  const isDesktop = size.width >= 1024;

  useEffect(() => {
    const handleResize = () => {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ── coverflow carousel: one focused card, two visible on the sides ──
  const [active, setActive] = useState(0);
  const n = PROJECTS.length;
  const startX = useRef(0);
  const moved = useRef(false);
  const go = (dir: number) => setActive((a) => (a + dir + n) % n);
  const isMob = size.width <= 640;
  // Cards a step smaller and pushed further apart (user, 2026-09-03). The gap is a
  // function of BOTH numbers: a side card sits at sideX and is drawn at 0.82, so the
  // clear air between it and the centre card is sideX - cardW*(0.5 + 0.41). At 420/0.98
  // that was 29px; at 380/1.12 it is 79px, and the neighbours still peek in at 1024.
  const cardW = isDesktop ? 380 : Math.min(size.width * 0.70, 330);
  const cardH = Math.min(cardW * 1.32, Math.max(290, size.height * 0.50));
  const sideX = cardW * (isDesktop ? 1.12 : 0.70);

  // per-slide identity: base colour + the colour the particles emit
  const WORK_BG_THEME: Record<string, { base: string; emit: string }> = {
    "creative-projects":     { base: "#030b05", emit: "65,119,86" },   // neon green
    "professional-services": { base: "#ffffff", emit: "150,152,158" },  // grey on white
    "nabu":                  { base: "#0d1015", emit: "84,168,255" },   // electric blue
  };
  const activeId = PROJECTS[active]?.id;
  const light = activeId === "professional-services";  // white slide → black UI text
  const titleColor = light ? "#14110b" : "var(--white)";
  const midColor = titleColor;  // whole header block: white on the dark slides, black on the white slide
  const textShadow = light ? "0 1px 12px rgba(255,255,255,.6)" : "0 1px 14px rgba(0,0,0,.6)"; // stays legible over the moving particles
  const bgt = WORK_BG_THEME[activeId] || WORK_BG_THEME["creative-projects"];

  return (
    <motion.div key="work" {...fade} className="ss-work-page"
      style={{
        position: "absolute", inset: 0, overflowX: "hidden", overflowY: "auto",
        background: "#0c0d0f",
      }}
    >
      <div className="ss-work-layout" style={{ position: "relative", minHeight: "max(730px, 100dvh)", overflow: "hidden" }}>
      {/* slow, continuous particle flow; particles emit the active project's colour */}
      {REDUCE ? <div aria-hidden style={{ position: "absolute", inset: 0, background: bgt.base }} />
        : <WorkParticles base={bgt.base} emit={bgt.emit} />}

      {/* faint grain for atmosphere — sits behind the grid */}
      <div aria-hidden style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        opacity: 0.03,
        backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='wn'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23wn)'/%3E%3C/svg%3E\")",
        backgroundSize: "180px",
      }} />

      {/* Header (left-aligned, clear of the top-right nav) */}
      <div style={{
        position: "absolute", top: 0, left: 0,
        padding: "115px 5vw 0",
        zIndex: 10, maxWidth: 780,
      }}>
        <motion.h2
          initial={REDUCE ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.34, delay: 0.04, ease: APPLE_EASE }}
          style={{ fontSize: "clamp(38px,5vw,64px)", letterSpacing: "-0.02em", fontWeight: 700, lineHeight: 1, color: titleColor, textShadow, transition: "color 0.7s ease" }}
        >
          Work
        </motion.h2>


      </div>

      {/* Coverflow carousel: one focused card, two visible on the sides */}
      <div
        style={{
          position: "absolute", left: 0, right: 0,
          top: 220, bottom: 65,
          display: "flex", alignItems: "center", justifyContent: "center",
          perspective: 1800, touchAction: "pan-y",
          /* a drag across the cards was starting a text selection under the pointer
             (measured: `selectstart` fires on the row). Only this surface gives it up,
             so the copy on every other page stays selectable. */
          userSelect: "none",
        }}
        onPointerDown={(e) => { startX.current = e.clientX; moved.current = false; }}
        onPointerMove={(e) => { if (Math.abs(e.clientX - startX.current) > 8) moved.current = true; }}
        onPointerUp={(e) => {
          const dx = e.clientX - startX.current;
          if (dx < -48) go(1); else if (dx > 48) go(-1);
        }}
      >
        {PROJECTS.map((proj, i) => {
          const rel = (i - active + n) % n; // 0 = center, 1 = right, 2 = left
          const target =
            rel === 0 ? { x: 0, scale: 1, rotateY: 0, opacity: 1, z: 3 }
            : rel === 1 ? { x: sideX, scale: 0.82, rotateY: -14, opacity: 1, z: 2 }
            : { x: -sideX, scale: 0.82, rotateY: 14, opacity: 1, z: 2 };

          // NABU: bare PNG (transparent, no card box/outline), name + tag below it
          if (proj.id === "nabu") {
            return (
              <motion.div
                key={proj.id}
                role="button" tabIndex={0} aria-label={`${rel === 0 ? "Open" : "Select"} ${proj.title}`}
                onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); if (rel === 0) onCardClick(proj); else setActive(i); } }}
                animate={{ x: target.x, scale: target.scale, rotateY: target.rotateY, opacity: target.opacity }}
                transition={{ duration: REDUCE ? 0 : 0.45, ease: APPLE_EASE }}
                onClick={() => { if (moved.current) return; if (rel === 0) onCardClick(proj); else setActive(i); }}
                {...hover}
                style={{
                  position: "absolute", width: cardW, height: cardH, zIndex: target.z,
                  cursor: "none", transformStyle: "preserve-3d",
                  display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                }}
              >
                <img
                  src={proj.img} alt={proj.title}
                  style={{
                    width: "100%", height: "78%", objectFit: "contain", objectPosition: "center",
                    display: "block", pointerEvents: "none",
                    filter: rel === 0 ? "drop-shadow(0 26px 55px rgba(0,0,0,.55))" : "none",
                    transition: "filter .5s ease",
                  }}
                />
                <div style={{ textAlign: "center", marginTop: 14, pointerEvents: "none" }}>
                  <div style={{ fontSize: 24, letterSpacing: -0.3, color: titleColor, lineHeight: 1.05, fontWeight: 600, transition: "color 0.7s ease" }}>
                    {proj.title}
                  </div>
                  <div style={{ fontSize: 12, letterSpacing: 1.5, color: "var(--sky)", textTransform: "uppercase", fontWeight: 500, marginTop: 7 }}>
                    {proj.tag}
                  </div>
                </div>
              </motion.div>
            );
          }

          return (
            <motion.div
              key={proj.id}
                role="button" tabIndex={0} aria-label={`${rel === 0 ? "Open" : "Select"} ${proj.title}`}
                onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); if (rel === 0) onCardClick(proj); else setActive(i); } }}
              className="ss-card"
              animate={{ x: target.x, scale: target.scale, rotateY: target.rotateY, opacity: target.opacity }}
              transition={{ duration: REDUCE ? 0 : 0.45, ease: APPLE_EASE }}
              onClick={() => { if (moved.current) return; if (rel === 0) onCardClick(proj); else setActive(i); }}
              {...hover}
              style={{
                position: "absolute",
                width: cardW, height: cardH,
                zIndex: target.z,
                borderRadius: 22, overflow: "hidden",
                background: "#111", cursor: "none",
                boxShadow: rel === 0 ? "0 40px 90px rgba(0,0,0,.6)" : "0 20px 50px rgba(0,0,0,.5)",
                transformStyle: "preserve-3d",
              }}
            >
              <img
                src={proj.img} alt={proj.title}
                style={{
                  width: "100%", height: "100%", objectFit: "cover",
                  objectPosition: proj.objectPosition || "center", display: "block", pointerEvents: "none",
                  filter: "brightness(0.95)", transition: "filter .5s ease",
                }}
              />
              <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(to top, rgba(6,6,6,.92) 0%, rgba(6,6,6,.4) 42%, rgba(6,6,6,0) 78%)",
                display: "flex", flexDirection: "column", justifyContent: "flex-end",
                padding: "24px 22px", pointerEvents: "none",
              }}>
                <div style={{ fontSize: 12, letterSpacing: 1.5, color: "var(--sky)", textTransform: "uppercase", fontWeight: 500, marginBottom: 6 }}>
                  {proj.tag}
                </div>
                <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 10 }}>
                  <div style={{ fontSize: 24, letterSpacing: -0.3, color: "var(--white)", lineHeight: 1.05, fontWeight: 600 }}>
                    {proj.title}
                  </div>
                  {rel === 0 && <span style={{ fontSize: 13, color: "var(--white)", whiteSpace: "nowrap", fontWeight: 500 }}>View →</span>}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="ss-work-controls" style={{ position: "absolute", bottom: isMob ? 20 : 28, left: 0, right: 0, display: "flex", justifyContent: "center", alignItems: "center", gap: 8, zIndex: 20 }}>
        <button type="button" aria-label="Previous category" onClick={() => go(-1)} style={{ color: titleColor, width: 44, height: 44 }}>←</button>
        {PROJECTS.map((project, i) => (
          <button type="button" key={project.id} aria-label={`Show ${project.title}`} aria-pressed={i === active} onClick={() => setActive(i)} style={{ width: 44, height: 44, display: "grid", placeItems: "center" }}>
            <span style={{ display: "block", width: i === active ? 26 : 8, height: 8, borderRadius: 980, background: i === active ? "#38bdf8" : (light ? "#777" : "#aaa"), transition: "width .3s ease" }} />
          </button>
        ))}
        <button type="button" aria-label="Next category" onClick={() => go(1)} style={{ color: titleColor, width: 44, height: 44 }}>→</button>
      </div>


      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────
   ABOUT PAGE
───────────────────────────────────────────────────────────── */
/* ─────────────────────────────────────────────────────────────
   CONTACT PAGE
───────────────────────────────────────────────────────────── */

function ContactPage() {
  const hover = useCursorHover();

  const links: { href: string; label: string; value: string; target?: string; icon: React.ReactNode }[] = [
    {
      href: "mailto:shyon2001@gmail.com", label: "Email Me", value: "shyon2001@gmail.com",
      icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 8l9 6 9-6M3 8v10a1 1 0 001 1h16a1 1 0 001-1V8M3 8a1 1 0 011-1h16a1 1 0 011 1" /></svg>,
    },
    {
      href: "https://www.linkedin.com/in/shyonshiri/", label: "LinkedIn", value: "in/shyonshiri", target: "_blank",
      icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 110-4.12 2.06 2.06 0 010 4.12zm1.78 13.02H3.56V9h3.56v11.45zM22.23 0H1.77C.8 0 0 .77 0 1.72v20.56C0 23.23.8 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.2 0 22.23 0z" /></svg>,
    },
    {
      href: "/My Resume.pdf", label: "Resume", value: "My Resume.pdf", target: "_blank",
      icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></svg>,
    },
  ];

  return (
    <motion.div key="contact" {...fade} className="ss-contact-page"
      style={{ position: "absolute", inset: 0, background: "#060606", display: "flex", flexDirection: "column", justifyContent: "center", overflow: "hidden" }}
    >
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
      {/* giant ghost word */}
      <div style={{
        position: "absolute", left: -30, bottom: "-12vh",
        fontFamily: "var(--sf)",
        fontSize: "clamp(220px, 34vw, 460px)", lineHeight: 0.8, letterSpacing: 6,
        color: "rgba(245,242,237,.05)", whiteSpace: "nowrap",
        filter: "blur(9px)",
        zIndex: 1, userSelect: "none", pointerEvents: "none",
      }}>CONTACT</div>

      {/* ambient glow top-right */}
      <div style={{
        position: "absolute", right: "-12vw", top: "-22vh",
        width: "min(900px, 100vw)", height: "min(900px, 100vw)", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(56,189,248,.35) 0%, rgba(56,189,248,0) 65%)",
        filter: "blur(65px)", zIndex: 1, pointerEvents: "none",
      }} />

      {/* ambient glow bottom-left */}
      <div style={{
        position: "absolute", left: "-15vw", bottom: "-25vh",
        width: "min(1100px, 120vw)", height: "min(1100px, 120vw)", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(56,189,248,.15) 0%, rgba(56,189,248,0) 60%)",
        filter: "blur(75px)", zIndex: 1, pointerEvents: "none",
      }} />

      </div>

      {/* content */}
      <div className="ss-contact-content" style={{ position: "relative", zIndex: 10, width: "100%" }}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: window.innerWidth <= 640 ? 20 : 40, flexWrap: "wrap", marginBottom: window.innerWidth <= 640 ? 24 : 44 }}>
          <div>
            {/* The "AVAILABLE FOR PROJECTS" eyebrow was removed here (user, 2026-09-03). The
                italic line to the right of this heading already says it, and says more:
                "Open to freelance, collaborations & full-time roles." Two availability
                statements on one screen is the same sentence twice, and the shorter one was
                the weaker of the pair. `.ss-contact-subtitle` went with it, being its only
                user. NOTE the heading's own entrance delay is deliberately left at 0.35: the
                sequence still staggers against the description at 0.5 beside it. */}
            <motion.h2
              initial={REDUCE ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.34, delay: 0.04, ease: APPLE_EASE }}
              className="ss-contact-heading"
              style={{ fontFamily: "var(--sf)", fontSize: "clamp(46px,6.2vw,96px)", fontWeight: 700, letterSpacing: "-0.038em", lineHeight: 1.02, color: "var(--white)" }}
            >
              Let's Work<span style={{ color: "var(--white)" }}>.</span>
            </motion.h2>
          </div>
          <motion.p
            initial={REDUCE ? false : { opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 0.34, delay: 0.04 }}
            className="ss-contact-description"
            style={{ fontFamily: "var(--sf)", fontWeight: 400, fontSize: "clamp(15px,1.5vw,18px)", lineHeight: 1.5, letterSpacing: "-0.005em", color: "var(--mid)", maxWidth: 300, textAlign: "right", marginBottom: 8 }}
          >
            Open to freelance, collaborations &amp; full-time roles.
          </motion.p>
        </div>

        {/* Contact links */}
        <motion.div
          initial={REDUCE ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.34, delay: 0.04, ease: APPLE_EASE }}
          style={{ display: "flex", flexDirection: "column", borderTop: "1px solid rgba(245,242,237,.14)" }}
        >
          {links.map((l) => (
            <a
              key={l.label}
              className="ss-contact-entry"
              href={l.href}
              target={l.target}
              rel={l.target ? "noopener noreferrer" : undefined}
              style={{
                display: "flex", alignItems: "center", gap: window.innerWidth <= 640 ? 16 : 28,
                padding: window.innerWidth <= 640 ? "16px 8px" : "26px 8px", textDecoration: "none",
                borderBottom: "1px solid rgba(245,242,237,.14)",
                transition: "background 0.3s ease, padding-left 0.3s ease",
                cursor: "none",
              }}
              {...hover}
            >
              <span style={{ fontFamily: "var(--sf)", fontSize: window.innerWidth <= 640 ? "clamp(15px,2.4vw,21px)" : "clamp(21px,2.8vw,30px)", fontWeight: 600, letterSpacing: "-0.02em", color: "var(--white)", width: window.innerWidth <= 640 ? "auto" : 240, flexShrink: 0 }}>
                {l.label}
              </span>
              <span style={{ fontFamily: "var(--sf)", fontSize: window.innerWidth <= 640 ? 13.5 : 17, fontWeight: 400, letterSpacing: "-0.005em", color: "var(--mid)", flex: 1, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {l.value}
              </span>
              <span style={{ fontFamily: "var(--sf)", fontSize: 17, color: "var(--sky)", flexShrink: 0 }}>→</span>
            </a>
          ))}
        </motion.div>

      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────
   WORK MODAL
───────────────────────────────────────────────────────────── */
/* THE MODAL LIFTS, IT DOES NOT GROW OUT OF THE CARD (user, 2026-09-09).
   A hand-rolled FLIP shipped here on 2026-09-08 and was pulled the same day: the panel
   started on the clicked card's rect carrying a clone of it and expanded into place.
   It was built and it worked, and it still looked wrong, for a reason worth keeping:
   the card is PORTRAIT (380x501) and the panel is LANDSCAPE (1080 x ~700), so the
   travel between them is a NON-UNIFORM scale, 0.35 across against 0.72 down. Anything
   carried along that path is stretched wide for the whole middle of the move. Fading
   the clone out hides some of it and not enough of it.
   So a card-to-panel morph is not simply a matter of tuning this one: it needs the two
   boxes to share an aspect, which means the modal growing from a CROP of the card
   rather than the card itself, and that is a redesign of the panel rather than a
   transition. Do not re-attempt the FLIP without solving that first.
   What is left is the plain lift the modal always had, on the site's one ease. */
function WorkModal({ project, onClose, onMediaClick }: {
  project: Project;
  onClose: () => void;
  onMediaClick: (item: MediaItem) => void;
}) {
  const hover = useCursorHover();
  const dialogRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const previousFocus = document.activeElement as HTMLElement | null;
    const dialog = dialogRef.current;
    dialog?.querySelector<HTMLButtonElement>("button")?.focus({ preventScroll: true });
    const trapFocus = (event: KeyboardEvent) => {
      if (event.key !== "Tab" || !dialog) return;
      const controls = Array.from(dialog.querySelectorAll<HTMLElement>(
        'button, a[href], video[controls], [tabindex="0"]'
      )).filter(element => element.getClientRects().length > 0);
      const first = controls[0], last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault(); last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault(); first?.focus();
      }
    };
    dialog?.addEventListener("keydown", trapFocus);
    return () => {
      dialog?.removeEventListener("keydown", trapFocus);
      if (previousFocus?.isConnected) previousFocus.focus({ preventScroll: true });
    };
  }, []);


  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
  const isDesktop = viewportWidth >= 1024;

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <motion.div
      ref={dialogRef} role="dialog" aria-modal="true" aria-label={project.title}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: REDUCE ? 0.001 : 0.4 }}
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 11000,
        background: "rgba(6,6,6,.93)",
        backdropFilter: "blur(20px)",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: REDUCE ? 1 : 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: REDUCE ? 1 : 0.96 }}
        transition={{ duration: REDUCE ? 0.001 : 0.4, ease: APPLE_EASE }}
        onClick={e => e.stopPropagation()}
        className="ss-work-modal"
        style={{
          position: "relative",
          width: "76vw", maxWidth: 1080,
          maxHeight: "80dvh",
          display: "flex", flexDirection: "column",
        }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="ss-modal-close" aria-label="Close project gallery"
          style={{
            position: "absolute", top: 60, right: 20,
            background: "none", border: "none", cursor: "none",
            fontFamily: "var(--sf)", fontSize: 10.5, fontWeight: 600,
            letterSpacing: "0.06em", textTransform: "uppercase",
            color: "var(--mid)",
            transition: "color 0.3s ease",
            padding: "4px 8px",
            zIndex: 2001,
          }}
          {...hover}
        >
          ✕ Close
        </button>

        {/* Header */}
        <div style={{
          display: "flex", alignItems: "flex-end", justifyContent: "space-between",
          paddingBottom: 18, borderBottom: "1px solid rgba(245,242,237,.1)",
          marginBottom: 22,
        }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: "clamp(36px,4.4vw,64px)", letterSpacing: "-0.02em", fontWeight: 700, lineHeight: 1, color: "var(--white)" }}>
              {project.title}
            </div>
            <div style={{ fontFamily: "var(--sf)", fontSize: 15, fontWeight: 400, lineHeight: 1.5, letterSpacing: "-0.005em", color: "var(--sky)", marginTop: 10 }}>
              {project.id === "creative-projects" ? "Personal projects in 3D, photography, electronics, and physical materials." : project.id === "professional-services" ? "Websites, identities, and print work made for clients." : project.id === "nabu" ? "Design and creative direction for NABU, a streetwear brand that draws from Persian and Assyrian heritage." : ""}
            </div>
          </div>
        </div>

        {/* Asset grid — masonry for creative + professional; existing grid for others */}
        {["creative-projects", "professional-services"].includes(project.id) ? (
          <div style={{ position: "relative", flex: 1, minHeight: 0, display: "flex", flexDirection: "column" }}>
            <div className="ss-scroll" style={{ flex: 1, minHeight: 0, overflowY: "auto", overflowX: "hidden", paddingRight: 8, display: "flex", gap: 14, alignItems: "flex-start" }}>
              {(() => {
                const items = project.media.filter(item => !item.hidden);
                const colCount = viewportWidth <= 640 ? 2 : viewportWidth <= 1023 ? 3 : 4;
                const cols: MediaItem[][] = Array.from({ length: colCount }, () => []);
                items.forEach((item, i) => cols[i % colCount].push(item));
                return cols.map((col, ci) => (
                  <div key={ci} style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 14 }}>
                    {col.map((item, k) => (
                      <StudioAssetCard key={k} item={item} onClick={() => onMediaClick(item)} />
                    ))}
                  </div>
                ));
              })()}
            </div>
            <div className="ss-scroll-fade" />
          </div>
        ) : (
          <div
            className="ss-modal-grid"
            style={{
              display: "grid",
              gridTemplateColumns: project.id === "3d-rendering" ? "repeat(3, 240px)" : project.id === "fabrication" ? "repeat(1, 420px)" : ["3d-modelling", "programming"].includes(project.id) ? "repeat(2, 300px)" : "repeat(4, 220px)",
              gap: 38,
              overflowY: "auto",
              overflowX: "hidden",
              maxHeight: "calc(80dvh - 150px)",
              paddingRight: 8,
              justifyContent: "center",
              gridAutoRows: "max-content",
            }}
          >
            {project.media.filter(item => !item.hidden).map((item, i) => (
              <ModalTile key={i} item={item} onClick={() => onMediaClick(item)} />
            ))}
          </div>
        )}

        {!isDesktop && (
          <div style={{
            marginTop: 24,
            textAlign: "center",
            fontFamily: "var(--sf)",
            fontSize: 10,
            letterSpacing: 1,
            color: "var(--mid)",
            textTransform: "uppercase",
          }}>
            Scroll to browse
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────
   MODAL TILE
───────────────────────────────────────────────────────────── */
/* Studio-style asset card (uniform grid cell + caption) — used for
   creative-projects and professional-services for site/studio consistency */
function StudioAssetCard({ item, onClick }: { item: MediaItem; onClick: () => void }) {
  const hover = useCursorHover();
  const ar = item.aspectRatio || "4/3";
  return (
    <button type="button" aria-label={`View ${item.title}`}  className="ss-scell" onClick={onClick} {...hover}>
      <div className="ss-sthumb" style={{ aspectRatio: ar }}>
        <img src={item.type === "video" ? item.poster : item.src} alt={item.title} loading="lazy" />
        {item.type === "video" && (
          <div style={{
            position: "absolute", top: 12, right: 12, width: 34, height: 34, borderRadius: "50%",
            background: "rgba(6,6,6,.5)", border: "1px solid rgba(245,242,237,.35)",
            display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(6px)",
          }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="var(--white)" style={{ marginLeft: 2 }}><path d="M8 5v14l11-7z" /></svg>
          </div>
        )}
      </div>
      <div className="ss-sbody">
        <div className="ss-asset-title" style={{ fontSize: 13, fontWeight: 600, color: "var(--white)", lineHeight: 1.25 }}>{item.title}</div>
        <div style={{ fontFamily: "var(--sf)", fontSize: 11, fontWeight: 500, fontVariantNumeric: "tabular-nums", color: "var(--mid)", marginTop: 4 }}>{item.year}</div>
      </div>
    </button>
  );
}

function ModalTile({ item, onClick }: { item: MediaItem; onClick: () => void }) {
  const hover = useCursorHover();

  return (
    <button type="button" aria-label={`View ${item.title}`}
      className="ss-tile"
      onClick={onClick}
      style={{
        position: "relative", overflow: "hidden",
        background: "#111",
        minHeight: item.type === "video" ? "250px" : "auto",
        cursor: "none",
        borderRadius: 12,
        aspectRatio: item.aspectRatio ? item.aspectRatio : undefined,
      }}
      {...hover}
    >
      {item.type === "video" ? (
        <>
          <img src={item.poster} alt={item.title} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          <div style={{
            position: "absolute", inset: 0,
            display: "flex", alignItems: "center", justifyContent: "center",
            background: "rgba(6,6,6,.3)",
            transition: "background 0.3s ease",
          }}>
            <div style={{
              width: 52, height: 52, borderRadius: "50%",
              border: "1.5px solid rgba(245,242,237,.7)",
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "transform 0.3s ease, border-color 0.3s ease",
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="var(--white)" style={{ marginLeft: 3 }}>
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        </>
      ) : (
        <img src={item.src} alt={item.title} loading="lazy" style={{ width: "100%", height: "100%", objectFit: item.aspectRatio ? "cover" : "contain" }} />
      )}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        padding: "20px 16px 14px",
        background: "linear-gradient(to top, rgba(6,6,6,.85) 0%, transparent 100%)",
        opacity: 0, transition: "opacity 0.3s ease",
      }}
        className="ss-tile-info"
      >
        <div className="ss-asset-title" style={{ fontSize: 14, color: "var(--white)", fontWeight: 600 }}>{item.title}</div>
        <div style={{ fontFamily: "var(--sf)", fontSize: 11, fontWeight: 500, fontVariantNumeric: "tabular-nums", color: "var(--sky)", marginTop: 2 }}>{item.year}</div>
      </div>
    </button>
  );
}

/* ─────────────────────────────────────────────────────────────
   MEDIA VIEWER (fullscreen single item)
───────────────────────────────────────────────────────────── */
function MediaViewer({ item, onClose, onItemClick }: { item: MediaItem; onClose: () => void; onItemClick?: (item: MediaItem) => void }) {
  const hover = useCursorHover();
  
  const dialogRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const previousFocus = document.activeElement as HTMLElement | null;
    const dialog = dialogRef.current;
    dialog?.querySelector<HTMLButtonElement>("button")?.focus({ preventScroll: true });
    const trapFocus = (event: KeyboardEvent) => {
      if (event.key !== "Tab" || !dialog) return;
      const controls = Array.from(dialog.querySelectorAll<HTMLElement>(
        'button, a[href], video[controls], [tabindex="0"]'
      )).filter(element => element.getClientRects().length > 0);
      const first = controls[0], last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault(); last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault(); first?.focus();
      }
    };
    dialog?.addEventListener("keydown", trapFocus);
    return () => {
      dialog?.removeEventListener("keydown", trapFocus);
      if (previousFocus?.isConnected) previousFocus.focus({ preventScroll: true });
    };
  }, []);

  // Single-asset view. No prev/next arrows (they interrupted assets that have
  // their own arrow/button controls). Related items open via the named links.
  const displayedItem = item;

  return (
    <motion.div
      ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="ss-viewer-title"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: REDUCE ? 0.001 : 0.25 }}
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 12000,
        background: "rgba(6,6,6,.97)",
        backdropFilter: "blur(30px)",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: REDUCE ? 1 : 0.985 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1 }}
        transition={{ duration: REDUCE ? 0.001 : 0.25, ease: APPLE_EASE }}
        onClick={e => e.stopPropagation()}
        className="ss-media-viewer"
        style={{
          position: "relative",
          maxWidth: "92vw", maxHeight: "88dvh",
          display: "flex", alignItems: "flex-start", gap: 48,
        }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="ss-media-viewer-close"
          style={{
            position: "absolute", top: 100, right: 20,
            background: "none", border: "none", cursor: "none",
            fontFamily: "var(--sf)", fontSize: 10.5, fontWeight: 600,
            letterSpacing: "0.06em", textTransform: "uppercase",
            color: "var(--mid)", transition: "color 0.3s ease",
            padding: "4px 8px",
            zIndex: 3001,
          }}
          {...hover}
        >
          ✕ Close
        </button>

        {/* Media & Navigation */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16, flexShrink: 0 }}>
          {/* Media */}
          <div
            style={{
              width: "60vw",
              height: "80dvh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
              borderRadius: 20,
              flexShrink: 0,
              backgroundColor: displayedItem.removeBackground ? "transparent" : "inherit",
              position: "relative",
            }}
          >
            {displayedItem.type === "video" ? (
              <video
                src={displayedItem.src}
                poster={displayedItem.poster}
                controls autoPlay muted playsInline
                key={displayedItem.src}
                style={{ 
                  width: "100%", 
                  height: "100%", 
                  objectFit: "contain",
                  maxWidth: "100%",
                  maxHeight: "100%",
                  display: "block",
                }}
              />
            ) : (
              <img
                src={displayedItem.src}
                alt={displayedItem.title}
                key={displayedItem.src}
                style={{ 
                  width: "100%", height: "100%", objectFit: "contain",
                  transform: displayedItem.scale ? `scale(${displayedItem.scale})` : "scale(1)",
                }}
              />
            )}
          </div>

        </div>

        {/* Info */}
        <div style={{ flex: 1, minWidth: 200, maxWidth: 340, paddingTop: 140 }}>
          <div id="ss-viewer-title" className="ss-asset-title" style={{ fontSize: 64, letterSpacing: 0.5, lineHeight: 1.02, color: "var(--white)", marginBottom: 24, fontWeight: 600 }}>
            {item.title}
          </div>
          <div style={{ fontFamily: "var(--sf)", fontSize: 10.5, fontWeight: 600, letterSpacing: "0.06em", color: "var(--sky)", textTransform: "uppercase", marginBottom: 20 }}>
            {item.year}
          </div>
          {item.desc && (
            <p style={{ fontFamily: "var(--sf)", fontSize: 16, lineHeight: 1.55, letterSpacing: "-0.005em", color: "rgba(245,242,237,.75)", fontWeight: 400, marginBottom: 32 }}>
              {item.desc}
            </p>
          )}

          {item.relatedItems && item.relatedItems.length > 0 ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 48 }}>
              {item.relatedItems.map((relatedTitle, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    const relatedItem = PROJECTS.flatMap(p => p.media).find(m => m.title === relatedTitle);
                    if (relatedItem && onItemClick) onItemClick(relatedItem);
                  }}
                  style={{
                    display: "inline-flex", alignItems: "center", gap: 8,
                    fontFamily: "var(--sf)", fontSize: 10.5, fontWeight: 600,
                    letterSpacing: "0.06em", textTransform: "uppercase",
                    color: "var(--sky)", background: "none", border: "none",
                    borderBottom: "1px solid var(--sky)", paddingBottom: 2,
                    cursor: "none", textDecoration: "none",
                    textAlign: "left",
                  }}
                  {...hover}
                >
                  View {relatedTitle} →
                </button>
              ))}
            </div>
          ) : null}

          {item.link && (
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                marginTop: 28,
                fontFamily: "var(--sf)", fontSize: 10.5, fontWeight: 600,
                letterSpacing: "0.06em", textTransform: "uppercase",
                color: "var(--sky)", textDecoration: "none",
                borderBottom: "1px solid var(--sky)", paddingBottom: 2,
                cursor: "none",
              }}
              {...hover}
            >
              Visit Website →
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
