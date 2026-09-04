import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";

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
    objectPosition: "45% 90%",
    media: [
      { type: "video", src: "/assets/Broken_NPC.MP4", poster: "/assets/Broken_NPC.jpg", title: "The Broken NPC", year: 2024, desc: "A detailed 3D scene depicting in-game rendering errors from GTA San Andreas, created entirely using Blender.", aspectRatio: "16/9", relatedItems: [] },
      { type: "video", src: "/assets/Blender_Case_Video.mp4", poster: "/assets/Blender_Case.jpg", title: "Apple Accessory Prototypes", year: 2024, desc: "3D designed Apple product case prototypes developed using Blender.", aspectRatio: "16/9", relatedItems: ["Custom Airpod Case", "Custom Phone Case"] },
      { type: "video", src: "/assets/Shiri_Video_Game.mp4", poster: "/assets/Shiri_VIdeo_Game.jpg", title: "Video Game Demo", year: 2024, desc: "Animated and assembled collection of images created in Adobe After Effects.", aspectRatio: "16/9" },
      { type: "image", src: "/assets/Venom.PNG", title: "Rendered 3D Model", year: 2024, desc: "Movie character modeled, textured, and rendered in Blender.", aspectRatio: "16/9" },
      { type: "image", src: "/assets/My_Case.jpg", title: "Custom Phone Case", year: 2025, desc: "Finalized rendition of the iPhone case prototype, designed to resemble liquid metal.", aspectRatio: "5/6", relatedItems: ["Apple Accessory Prototypes"] },
      { type: "image", src: "/assets/Airpod_Case.JPG", title: "Custom Airpod Case", year: 2026, desc: "Finalized rendition of the Airpod case prototype, designed to resemble liquid metal.", aspectRatio: "4/5", relatedItems: ["Apple Accessory Prototypes"] },
      { type: "image", src: "/assets/New_Radar_Sensor_front.jpg", title: "Radar — Front View", year: 2024, desc: "Front of the radar enclosure. Paired ultrasonic transducers, a 16x2 character LCD, and a recessed speaker cone, all set into a 3D printed shell.", aspectRatio: "4/3", hidden: true, relatedItems: ["Radar — Back View", "Hardware Builds Together", "HMI Sensor System"] },
      { type: "image", src: "/assets/New_Radar_Sensor_Back.jpg", title: "Radar — Back View", year: 2024, desc: "Back of the radar enclosure, showing the access panel, wiring routing, and the power and control cutouts.", aspectRatio: "4/3", hidden: true, relatedItems: ["Radar — Front View", "Hardware Builds Together", "HMI Sensor System"] },
      { type: "image", src: "/assets/New_LED_Box_Front.jpg", title: "RGB Box — Front View", year: 2024, desc: "Front of the RGB controller. A faceted 3D printed shell with the addressable LED strip seated in a chamfered channel.", aspectRatio: "4/3", hidden: true, relatedItems: ["RGB Box — Back View", "Hardware Builds Together", "Custom RGB Controller"] },
      { type: "image", src: "/assets/New_LED_Box_Back.jpg", title: "RGB Box — Back View", year: 2024, desc: "Back of the RGB controller, with the potentiometer, mode button, and toggle switch mounted through the top panel.", aspectRatio: "4/3", hidden: true, relatedItems: ["RGB Box — Front View", "Hardware Builds Together", "Custom RGB Controller"] },
      { type: "image", src: "/assets/Programming_Cover_Pic.jpg", title: "Hardware Builds Together", year: 2024, desc: "The radar module and the RGB controller side by side. Each enclosure was modeled around its own board, display, and controls, then 3D printed and finished by hand.", aspectRatio: "4/3", hidden: true, relatedItems: ["HMI Sensor System", "Custom RGB Controller"] },
      { type: "image", src: "/assets/Max_Pic.JPG", title: "Candid Studio Portrait", year: 2024, desc: "Studio portrait shot with controlled lighting.", aspectRatio: "2/3" },
      { type: "image", src: "/assets/Photography_1.jpg", title: "Studio Photography", year: 2024, desc: "Studio photography focused on composition and lighting.", aspectRatio: "1/1" },
      { type: "video", src: "/assets/New_Radar_Sensor.mp4", poster: "/assets/New_Radar_Sensor_front.jpg", title: "HMI Sensor System", year: 2024, desc: "Interactive radar module converting ultrasonic data into real-time feedback. Custom 3D printed enclosure with LCD and speaker.", aspectRatio: "4/3", relatedItems: ["Radar — Front View", "Radar — Back View", "Hardware Builds Together"] },
      { type: "video", src: "/assets/New_LED_Box.mp4", poster: "/assets/New_LED_Box_Front.jpg", title: "Custom RGB Controller", year: 2024, desc: "Functional system built from scratch. 3D printed geometric casing housing the microcontroller.", aspectRatio: "4/3", relatedItems: ["RGB Box — Front View", "RGB Box — Back View", "Hardware Builds Together"] },
      { type: "image", src: "/assets/Shyon_Sculpture.jpg", title: "Product, not Consumer", year: 2024, desc: "Hand-fabricated steel sculpture referencing consumer tech culture, welded, ground, sanded and finished.", aspectRatio: "5/4" },
      { type: "image", src: "/assets/Adverstisement_Project.jpg", title: "Campaign Project", year: 2024, desc: "Conceptual brand advertisement built around scenic composition.", aspectRatio: "16/9" },
    ],
  },
  {
    id: "professional-services",
    title: "Professional Services",
    tag: "Web & Design",
    img: "/assets/Everly_Cover_Image.png",
    size: "wide",
    media: [
      { type: "image", src: "/assets/Mina_Website.png", title: "UI/UX — minasech.net", year: 2025, desc: "Full-stack website design including React frontend and responsive interface.", link: "https://minasech.net", wide: true, aspectRatio: "16/9" },
      { type: "image", src: "/assets/Everly_Cover_Image.png", title: "Everly Care Home", year: 2026, desc: "Full-stack website design and development including branding, responsive interface, and complete deployment for a senior care community business.", link: "https://everlycarehome.com", wide: true, aspectRatio: "16/9" },
      { type: "image", src: "/assets/RealEstate_Luning_Flyer.jpg", title: "Real Estate Marketing — Luning Dr", year: 2022, desc: "Property marketing flyer designed for Real Estate Experts, pairing a hero listing photo with clean typographic hierarchy, a status badge, and agent branding.", aspectRatio: "3/4" },
      { type: "image", src: "/assets/RealEstate_Colleen_Flyer.jpg", title: "Real Estate Marketing — Colleen Dr", year: 2022, desc: "A dual-agent listing flyer combining property details, brand elements, and paired agent headshots in a balanced square format.", aspectRatio: "1/1" },
      { type: "image", src: "/assets/RealEstate_MorningStar_Flyer.png", title: "Compass × Real Estate Experts — Morning Star Dr", year: 2022, desc: "A premium listing announcement co-branded with Compass, layering sales highlights, pricing, and property specs over a bold editorial layout.", aspectRatio: "4/5" },
      { type: "image", src: "/assets/RealEstate_MoskowiteCorner_Concept.jpg", title: "Moskowite Corner — Concept Visualization", year: 2026, desc: "An AI-generated concept visualization for a real estate redevelopment study at Moskowite Corner, CA. It shows a closed gas station lot rebuilt as a fuel and retail stop, modeled from aerial references for a developer evaluating the property.", aspectRatio: "5/3", relatedItems: ["Moskowite Corner — Existing Site"] },
      { type: "image", src: "/assets/RealEstate_MoskowiteCorner_Before.png", title: "Moskowite Corner — Existing Site", year: 2026, desc: "The existing site before redevelopment. A closed 1.26 acre gas station lot with parking and an office building.", aspectRatio: "16/9", hidden: true, relatedItems: ["Moskowite Corner — Concept Visualization"] },
    ],
  },
  {
    id: "nabu",
    title: "NABU",
    tag: "Clothing Brand",
    img: "/assets/New_NABU_Cover_Card.png",
    size: "tall",
    media: [
      { type: "video", src: "/assets/Nabu_Poster_Banner.mp4", poster: "/assets/Nabu_Poster_Banner.jpg", title: "NABU Promotional Video", year: 2023, desc: "Promotional video for NABU clothing, animated in Adobe After Effects.", wide: true },
      { type: "video", src: "/assets/NABU_PUFFER_AD.mp4", poster: "/assets/NABU_Puffer_AD.jpg", title: "NABU 2026 Teaser", year: 2025, desc: "Promotional video for NABU's puffer jacket collection.", relatedItems: ["NABU Puffer Front", "NABU Puffer Back"] },
      { type: "video", src: "/assets/NABU_SALE_AD.mp4", poster: "/assets/NABU_SALE_AD.jpg", title: "NABU 2025 Summer Collection", year: 2025, desc: "Promotional video for the NABU 2025 summer collection." },
      { type: "image", src: "/assets/Stevie_Pic.JPG", title: "NABU 2023 Spring Collection", year: 2022, desc: "Portrait photography for the NABU 2023 spring collection." },
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
    --ease-out: cubic-bezier(0.16,1,0.3,1);
  }

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  html, body {
    width: 100%; height: 100%;
    overflow: hidden;
    background: var(--black);
    color: var(--white);
    -webkit-font-smoothing: antialiased;
    cursor: none !important;
  }

  * { cursor: none !important; }

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

    /* Work Page - Cards */
    .ss-card { min-height: 420px !important; }

    /* About Page */
    .ss-about-subtitle { font-size: 9px !important; }
    .ss-about-page h2 { font-size: 28px !important; }
    .ss-about-page p { font-size: 12px !important; line-height: 1.8 !important; }

    /* Contact Page */
    .ss-contact-heading { font-size: clamp(32px, 6vw, 64px) !important; }
    .ss-contact-description { font-size: clamp(12px, 1.5vw, 14px) !important; }
  }

  /* cursor */
  #ss-cursor-dot {
    position: fixed; top: 0; left: 0; z-index: 99999;
    width: 9px; height: 9px;
    background: #ffffff;
    border-radius: 50%;
    pointer-events: none;
    transform: translate(-50%,-50%);
    opacity: 1;
    mix-blend-mode: difference; /* always contrasts — visible on white or dark */
  }

  /* work rail drag cursor */
  .ss-rail { cursor: none; }
  .ss-rail:active { cursor: none; }

  @media (max-width: 1023px) {
    /* WorkPage grid adjusts for tablet */
    .ss-grid {
      grid-template-columns: repeat(2, 1fr) !important;
    }
  }

  @media (max-width: 640px) {
    /* WorkPage grid is single column on mobile */
    .ss-grid {
      grid-template-columns: 1fr !important;
    }
  }

  /* modal / viewer scrollbar hide */
  .ss-modal-grid { scrollbar-width: none; }
  .ss-modal-grid::-webkit-scrollbar { display: none; }

  /* scroll hint wheel */
  @keyframes ss-wheel {
    0%,100% { top: 5px; opacity: 1; }
    60%      { top: 18px; opacity: .15; }
  }
  .ss-wheel-dot { animation: ss-wheel 1.8s ease-in-out infinite; }

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

  /* 3d rendering card zoom hover */
  .ss-3d-rendering:hover img {
    transform: scale(1.14) !important;
  }

  /* work card image */
  .ss-card-img {
    transform: scale(1.08);
    transition: transform .7s var(--ease-out), filter .4s ease;
    filter: brightness(.65) saturate(.85);
  }
  .ss-card:hover .ss-card-img {
    transform: scale(1);
    filter: brightness(.88) saturate(1);
  }
  .ss-card-overlay {
    opacity: 0;
    transition: opacity .35s ease;
  }
  .ss-card:hover .ss-card-overlay { opacity: 1; }

  /* about photo */
  .ss-about-photo {
    transform: scale(1.12);
    transition: transform 10s ease;
  }
  .ss-about-photo-active { transform: scale(1) !important; }

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
    font-family: 'Bebas Neue', 'Space Grotesk', sans-serif;
    line-height: 0.86;
    letter-spacing: 0.012em;
    color: var(--white);
  }
  /* Each letter is its own inline-block so it can be transformed on its own; without
     this the spans are inline boxes and every transform is silently dropped. */
  .ss-hero-name .ss-hero-ch { display: inline-block; will-change: transform, opacity, filter; }
  .ss-hero-name .ss-hero-line { display: block; white-space: nowrap; }

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
    font-family: 'Space Grotesk', 'Inter', sans-serif;
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
  }
  .ss-story-kicker { filter: drop-shadow(0 0 26px rgba(56,189,248,.20)); }
  /* chapter header with a still alongside it */
  .ss-chapter-split {
    display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1.04fr);
    gap: 54px; align-items: center;
  }
  .ss-chapter-shot {
    margin: 0;
    border: 1px solid rgba(245,242,237,.16);
    background: #0a0a0c;
  }
  .ss-chapter-shot img { display: block; width: 100%; height: auto; }
  /* chapter opener: the still runs the full column width under the text */
  .ss-chapter-hero { margin: 40px 0 0; }
  @media (max-width: 1000px) {
    .ss-chapter-split { grid-template-columns: 1fr; gap: 34px; }
  }

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
  .ss-home-scroll { scroll-snap-type: y mandatory; }
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
  .ss-chapter-pair { display: grid; gap: clamp(20px, 3vh, 30px); }
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
  .ss-chapter-pair .ss-chapter-body { font-size: clamp(14.4px, 1.2vw, 16px); }
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
  .ss-chapter-pair .ss-story-kicker {
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
      radial-gradient(105% 78% at 4% 104%, rgba(6,6,6,.62) 0%, rgba(6,6,6,.22) 45%, rgba(6,6,6,0) 72%),
      /* AND A BAND UNDER THE NAV, WHOSE DEPTH IS SOLVED AND NOT GUESSED. This is the only
         slide on the deck whose top is not black. The nav is #f5f2ed at opacity 1 for the
         current page and .55 for the other three, so on every other slide it inverts
         against a near black and the dim state still runs 5.8:1. Over this picture it does
         not: sampled through a canvas, the world under the nav is a flat 170,140,140 (the
         brightest pixel in the whole strip is 172,142,142, so there is no worst case to
         hide from), and the three dim items measured 2.4:1 against it. A first attempt at
         .62 falling to .24 by 6% missed too, because the nav sits at 4.0% to 5.9% of the
         slide and the ramp had already collapsed by the time it got there.
         Solved against that sample, .75 through the nav's own band puts the dim state back
         over 4.5:1, so the ramp holds .82 to .76 across the top 7% and is gone by 24%.
         scratchpad/nav_contrast.cjs measures it rather than trusting the gradient. */
      linear-gradient(to bottom, rgba(6,6,6,.82) 0%, rgba(6,6,6,.76) 7%, rgba(6,6,6,.34) 13%, rgba(6,6,6,0) 24%);
  }
  .ss-open-copy { position: relative; z-index: 1; max-width: 760px; }
  .ss-open-title {
    font-family: 'Space Grotesk', 'Inter', sans-serif;
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
    font-family: 'Space Mono', monospace;
    font-size: 9.5px; letter-spacing: 2.2px; text-transform: uppercase;
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
    font-family: 'Space Mono', monospace;
    font-size: 9.5px; letter-spacing: 1.8px; text-transform: uppercase;
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
  /* the card sits bottom right, the one quarter of this aerial with no building in it */
  .ss-map-frame { position: relative; }
  .ss-map-card {
    position: absolute; right: 2.6%; bottom: 3.6%; width: min(28%, 306px);
    background: rgba(8,9,12,.9); backdrop-filter: blur(12px);
    border: 1px solid rgba(245,242,237,.18);
  }
  .ss-map-card img { display: block; width: 100%; aspect-ratio: 16 / 9; object-fit: cover; }
  .ss-map-card-body { padding: 11px 13px 13px; display: flex; flex-direction: column; gap: 3px; }
  .ss-map-card-cat {
    font-family: 'Space Mono', monospace;
    font-size: 9.5px; letter-spacing: 2px; text-transform: uppercase; color: var(--sky);
  }
  .ss-map-card-name {
    font-family: 'Space Grotesk', 'Inter', sans-serif;
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
  .ss-quiet { display: grid; row-gap: clamp(20px, 3.4vh, 38px); }
  .ss-plate { margin: 0; display: grid; row-gap: 11px; justify-items: start; }
  .ss-plate-label {
    font-family: 'Space Mono', monospace;
    font-size: 10px; letter-spacing: 2.5px; text-transform: uppercase;
    color: rgba(245,242,237,.5);
  }
  .ss-plate-shot { display: block; overflow: hidden; width: 100%; }
  /* THE CROP WINDOW IS SET, NOT LEFT AT CENTRE. The plate is much wider than it is tall,
     so a landscape still is cropped hard, and centred that took the top off the figure's
     head, which is the subject of both the picture and the paragraph over it. 24% down
     keeps the whole minifig with the plate under his feet. */
  .ss-plate-shot img {
    display: block; width: 100%;
    height: clamp(180px, 36vh, 380px);
    object-fit: cover; object-position: 50% 24%;
  }
  .ss-plate figcaption {
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
    font-family: 'Space Mono', monospace;
    font-size: 9.5px; letter-spacing: 2px; text-transform: uppercase;
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
    font-family: 'Space Mono', monospace; font-weight: 400;
    font-size: 9.5px; letter-spacing: 2px; text-transform: uppercase;
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
    font-family: 'Space Grotesk', 'Inter', sans-serif;
    font-size: clamp(26px, 3vw, 44px); font-weight: 700;
    line-height: 1; letter-spacing: -0.03em; color: var(--white);
  }
  .ss-fig dd i {
    font-style: normal; font-size: .52em; color: var(--sky); margin-left: 2px;
  }
  .ss-fig dt {
    font-family: 'Space Mono', monospace;
    font-size: 9.5px; letter-spacing: 2.1px; text-transform: uppercase;
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
  /* the still tips up off its own bottom edge in chapter 01 */
  .ss-shot-unfold { transform-origin: 50% 100%; }
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
    font-family: 'Space Mono', monospace;
    font-size: 10px; letter-spacing: 2px; text-transform: uppercase;
    color: rgba(245,242,237,.75);
    opacity: 0; pointer-events: none;
    transition: opacity .35s var(--ease-out), transform .35s var(--ease-out);
  }
  .ss-deck-tick:hover .ss-deck-tip { opacity: 1; transform: translateY(-50%) translateX(0); }
  .ss-deck-count {
    position: fixed; right: max(20px, 2.4vw); bottom: 26px; z-index: 60;
    font-family: 'Space Mono', monospace;
    font-size: 10px; letter-spacing: 2.5px; color: rgba(245,242,237,.38);
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
      maxHeight: 95dvh !important;
      maxWidth: 100vw !important;
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
      order: 2 !important;
      flex-shrink: 0 !important;
      width: 100% !important;
    }
    .ss-media-viewer > div:nth-child(3) {
      order: 1 !important;
      flex-shrink: 0 !important;
      width: 100% !important;
      padding-right: 12px !important;
      padding-top: 20px !important;
      padding-left: 16px !important;
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
  }

  @media (max-width: 768px) {
    html, body { cursor: grab; }
    #ss-cursor-dot, #ss-cursor-ring { display: none !important; }
    .ss-hero-bg { object-position: 78% 5% !important; }
    /* about page font sizing on tablet */
    .ss-about-page .ss-about-subtitle { font-size: 8px !important; }
    .ss-about-page h2 { font-size: clamp(56px, 7vw, 120px) !important; }
    .ss-about-page p { font-size: 15px !important; }
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

  /* A SHORT SCREEN BUYS ITS LAST LINE OUT OF THE GAP, NOT OUT OF THE COPY. At 1280x720 the
     column still ran 14px over once the AI evaluation clause said what the job actually is,
     and 14px is under half a 35px line, so there was nothing to trim in the text that would
     not have cost a whole line of meaning. The headline and the rule carry 48px of air
     between them (16 under the H2, 16 either side of the rule), which is right on a full
     display and is the first thing that should give on a laptop that is 720 tall. 26px back,
     none of it from the words. 760 is the same short-height breakpoint the homepage deck
     already uses. Both margins are INLINE styles, hence !important. */
  @media (max-height: 760px) {
    .ss-about-page h2 { margin-bottom: 2px !important; }
    .ss-about-rule { margin-top: 6px !important; margin-bottom: 6px !important; }
  }

  /* THE 769 TO 1100 BAND IS THE NARROWEST MEASURE ON THE PAGE, and it is the only place the
     About copy still overran its own box after the padding was made viewport relative. The
     grid is a flat 1fr 1fr, so at 1024 the text column is 512 wide and the 8vw + 60px gutters
     leave 370 of it; at 20px Cormorant that is about 38 characters a line, which is under the
     45 to 75 a paragraph wants and wrapped 95 words into 14 lines and 475px of height. This
     is therefore a typographic fix and a fitting fix at once: 17px takes the measure to about
     50 characters and the block to 9 lines. It sits between the 20px the wide layout uses and
     the 15px the 768 rule already steps down to, so the page reads as one progression.
     It needs !important because the size is written as an INLINE style on the paragraphs. */
  @media (min-width: 769px) and (max-width: 1100px) {
    .ss-about-page p { font-size: 17px !important; }
  }

  @media (max-width: 700px) {
    .ss-hero-bg { object-position: 82% 5% !important; }
  }

  @media (max-width: 640px) {
    .ss-hero-bg { object-position: 75% 5% !important; }
    html, body { cursor: grab; }
    #ss-cursor-dot, #ss-cursor-ring { display: none !important; }
    /* homepage content positioning on mobile */
    .ss-home-page > div > div { bottom: 18vh !important; }
    /* navigation hint on mobile */
    .ss-nav-hint { right: 150px !important; }
    .ss-nav-hint svg { width: 11px !important; height: 19px !important; }
    /* modal close button positioning */
    .ss-modal-close { top: 20px !important; }
    /* media viewer close button positioned above title on all devices */
    .ss-media-viewer-close { top: 100px !important; }
    /* contact page text sizing on mobile */
    .ss-contact-heading { font-size: clamp(90px,12vw,200px) !important; }
    .ss-contact-description { font-size: clamp(22px,4vw,36px) !important; }
    /* about page font sizing on mobile */
    .ss-about-page .ss-about-subtitle { font-size: 6px !important; }
    .ss-about-page h2 { font-size: clamp(42px, 5vw, 90px) !important; }
    .ss-about-page p { 
      font-size: 13px !important; 
      line-height: 1.4 !important;
      margin-top: 8px !important;
    }
    .ss-about-text-column { padding-top: 100px !important; }
    /* reduce about page image cropping on mobile */
    .ss-about-photo { object-position: center 25% !important; }
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
    font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display",
      "SF Pro Text", "Inter", system-ui, sans-serif;
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
  .ss-masonry { column-width: 206px; column-gap: 14px; }
  @media (max-width: 900px){ .ss-masonry { column-width: 172px; column-gap: 12px; } }
  @media (max-width: 640px){ .ss-masonry { column-width: 144px; column-gap: 10px; } }
  .ss-scell { position: relative; border-radius: 14px; overflow: hidden; background: #111214; border: 1px solid rgba(245,242,237,.1); cursor: none; transition: transform .5s cubic-bezier(.16,1,.3,1), border-color .4s cubic-bezier(.16,1,.3,1), box-shadow .5s cubic-bezier(.16,1,.3,1); }
  .ss-scell:hover { transform: translateY(-4px); border-color: var(--sky); box-shadow: 0 18px 44px rgba(0,0,0,.5); }
  .ss-scell .ss-sthumb { position: relative; width: 100%; background: #0a0a0c; overflow: hidden; }
  .ss-scell .ss-sthumb img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform .7s cubic-bezier(.16,1,.3,1); }
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
  .ss-workbg { transition: background-color .9s ease, --wbc1 .9s ease, --wbc2 .9s ease, --wbc3 .9s ease; }
  .ss-blob { position: absolute; border-radius: 50%; filter: blur(42px); will-change: transform; pointer-events: none; }
  @keyframes ssFloatA { 0%,100% { transform: translate(-10%,-6%) scale(1); } 33% { transform: translate(9%,11%) scale(1.16); } 66% { transform: translate(15%,-8%) scale(1.08); } }
  @keyframes ssFloatB { 0%,100% { transform: translate(12%,9%) scale(1.1); } 33% { transform: translate(-10%,-7%) scale(1); } 66% { transform: translate(-15%,11%) scale(1.15); } }
  @keyframes ssFloatC { 0%,100% { transform: translate(3%,-12%) scale(1.05); } 33% { transform: translate(-12%,7%) scale(1.17); } 66% { transform: translate(11%,13%) scale(1); } }
  .ss-media-viewer img,
  .ss-media-viewer video { border-radius: 22px !important; }
  .ss-contact-btn { border-radius: 980px !important; }
  .ss-about-photo { border-radius: 20px !important; }

  /* Work page: hover "View" cue on cards + CTA link */
  .ss-view-cue { opacity: 0; transform: translateX(-6px); transition: opacity .35s var(--ease-out), transform .35s var(--ease-out); }
  .ss-card:hover .ss-view-cue { opacity: 1; transform: translateX(0); }
  .ss-work-cta { transition: color .3s ease; }
  .ss-work-cta:hover { color: var(--sky) !important; }

  /* asset titles: rounded "iPhone bubble" font (SF Pro Rounded) */
  .ss-asset-title {
    font-family: ui-rounded, "SF Pro Rounded", "Hiragino Maru Gothic ProN", -apple-system, system-ui, sans-serif;
  }

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
    const onMove = (e: MouseEvent) => {
      if (dotRef.current) {
        dotRef.current.style.left = e.clientX + "px";
        dotRef.current.style.top = e.clientY + "px";
      }
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
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
const fade = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.6 } },
  exit:    { opacity: 0, transition: { duration: 0.45 } },
};

/* ─────────────────────────────────────────────────────────────
   ROOT
───────────────────────────────────────────────────────────── */
export default function App() {
  const [page, setPage] = useState<Page>("home");
  const [modalProject, setModalProject] = useState<Project | null>(null);
  const [viewerItem, setViewerItem] = useState<MediaItem | null>(null);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);
  const [hintsVisible, setHintsVisible] = useState(true);
  const pageIdx = PAGE_ORDER.indexOf(page);
  const cooldown = useRef(false);
  const hover = useCursorHover();
  const hintInteracted = useRef(false);

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
    const bg = page === "about" ? "#ede8e0" : "#060606";
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

  /* wheel nav — skip on modals and work page */
  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      if (!hintInteracted.current) {
        hintInteracted.current = true;
        setHintsVisible(false);
      }
      // No page navigation while a project modal / media viewer is open
      if (modalOpenRef.current) return;
      if (cooldown.current) return;
      // Home scrolls natively into the Lego Realm storyboard, so the wheel never flips pages there
      if (currentPageRef.current === "home") return;
      // Skip page navigation on work page for mobile/tablet (screen < 1024px)
      if (currentPageRef.current === "work" && window.innerWidth < 1024) return;
      // Skip if over a scrollable element
      const target = e.target as HTMLElement;
      if (target.closest(".ss-modal-grid") || target.closest(".ss-masonry") || target.closest(".ss-media-viewer")) return;
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
      if (!hintInteracted.current) {
        hintInteracted.current = true;
        setHintsVisible(false);
      }
      // No page navigation while a project modal / media viewer is open
      if (modalOpenRef.current) return;
      if (cooldown.current) return;
      // Home scrolls natively into the Lego Realm storyboard
      if (currentPageRef.current === "home") return;
      // Skip page navigation on work page (use buttons only)
      if (currentPageRef.current === "work") return;
      const target = e.target as HTMLElement;
      // Skip if on a scrollable rail or modal grid
      if (target.closest(".ss-rail") || target.closest(".ss-modal-grid") || target.closest(".ss-masonry")) return;
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
      if (page === "home") return;
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
      <Cursor />

      {/* ── NAV ─────────────────────────────────────────────── */}
      <nav
        style={{
          position: "fixed", top: 0, left: 0, right: 0,
          zIndex: 10000,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          paddingTop: "max(28px, calc(28px + env(safe-area-inset-top)))",
          paddingBottom: "28px",
          paddingLeft: "max(48px, calc(48px + env(safe-area-inset-left)))",
          paddingRight: "max(48px, calc(48px + env(safe-area-inset-right)))",
          // ── ABOUT'S NAV FOLLOWS THE PHOTO'S CROP, NOT THE PAGE (user, 2026-09-02).
          // It paints solid black over a `normal` blend, which is right for the backdrop the WIDE
          // layout puts behind it: the photo column starts at 50% and the nav lands on the pale
          // studio wall behind Shyon's head. The photo is `object-fit: cover`, so narrowing the
          // window crops it to the dark hair and jacket instead, and there black on black was
          // effectively invisible: measured at 768 and 390, WORK / ABOUT / CONTACT all but
          // disappeared. Under 1024 it therefore joins every other page on `difference`, which
          // resolves light over that dark crop.
          // WHY NOT `difference` EVERYWHERE, which would drop the special case: difference
          // CANCELS toward mid grey (the same trap the Realm's cursor documents, exact at 127.5),
          // and the studio wall's vignette behind the wide layout's nav sits right in that zone.
          // Rendered at 1024 and 1512 that put CONTACT at roughly 2.3:1 against its backdrop where
          // the approved black gives 8.6:1. So each layout keeps the treatment that measures best
          // for what is actually behind it, and the approved wide look is untouched.
          mixBlendMode: page === "about" && isDesktop ? "normal" : "difference",
        }}
      >
        <div style={{ visibility: "hidden" }} />
        <ul style={{ display: "flex", gap: 40, listStyle: "none" }}>
          {PAGE_ORDER.map(p => (
            <li key={p}>
                <NavLink label={p.charAt(0).toUpperCase() + p.slice(1)} active={page === p} onClick={() => navigate(p)}
                currentPage={page} wideAbout={page === "about" && isDesktop} />
            </li>
          ))}
        </ul>
      </nav>

      {/* ── PAGE INDICATOR ───────────────────────────────────── */}
      <div
        style={{
          position: "fixed", right: "max(32px, calc(32px + env(safe-area-inset-right)))", top: "50%",
          transform: "translateY(-50%)",
          zIndex: 400,
          display: "flex", flexDirection: "column", gap: 12,
          mixBlendMode: page === "about" && isDesktop ? "normal" : "difference",   // same reason as the nav
        }}
      >
        {PAGE_ORDER.map((p) => (
          <button
            key={p}
            onClick={() => navigate(p)}
            className="ss-tap"
            aria-label={p}
            style={{
              width: 10, height: 10, borderRadius: "50%",
              border: "1px solid rgba(245,242,237,0.4)",
              background: page === p ? "var(--white)" : "transparent",
              transform: page === p ? "scale(1.5)" : "scale(1)",
              transition: "all 0.4s ease",
              cursor: "none",
              position: "relative",
            }}
            {...hover}
          />
        ))}
      </div>

{/* ── PAGES ────────────────────────────────────────────── */}
      <AnimatePresence mode="wait">
        {page === "home" && <HomePage key="home" onNavigate={navigate} />}
        {page === "work" && <WorkPage key="work" onCardClick={setModalProject} onNavigate={setPage} />}
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
function NavLink({ label, active, onClick, currentPage, wideAbout }: { label: string; active: boolean; onClick: () => void; currentPage?: string; wideAbout?: boolean }) {
  const hover = useCursorHover();
  // `wideAbout` is About in the WIDE layout, the one place the nav is painted rather than blended
  // (see the nav's own note). Everywhere else it is white through `difference`. About also does
  // not DIM its inactive items: elsewhere the page behind is dark, so 0.55 of the near-white the
  // blend produces still reads, while on About the backdrops are light and 0.55 of near-black
  // measured as a washed-out grey. The active item is still marked, by the page dots.
  const isAboutPage = currentPage === "about";
  return (
    <button
      onClick={onClick}
      className="ss-tap"
      style={{
        fontFamily: "'Space Mono', monospace",
        fontSize: 11, letterSpacing: 2, textTransform: "uppercase",
        color: wideAbout ? "#000000" : "var(--white)", background: "none", border: "none",
        cursor: "none", opacity: isAboutPage ? 1 : (active ? 1 : 0.55),
        transition: "opacity 0.3s ease, color 0.3s ease",
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
          transition: "width 0.4s cubic-bezier(0.16,1,0.3,1)",
          display: "none",
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

// `as const` so the four control points stay a TUPLE: widened to number[] framer-motion's
// Easing type rejects it, which is the same reason SB_EASE is written this way.
const NAME_EASE = [0.32, 0.9, 0.28, 1] as const;

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
        // Bebas is condensed, so the same point size covers far less width than the
        // sans this replaced: the ceiling goes 160 to 200 and the vw term with it.
        fontSize: isMobile ? "clamp(58px,9vw,92px)" : "clamp(84px,12.5vw,200px)",
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

function HomePage({ onNavigate }: { onNavigate: (p: Page) => void }) {
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

  const scrollToStory = () => {
    const el = scrollRef.current;
    if (el) el.scrollTo({ top: el.clientHeight, behavior: "smooth" });
  };

  return (
    <motion.div key="home" {...fade}
      ref={scrollRef}
      className="ss-home-page ss-home-scroll"
      style={{ position: "absolute", inset: 0, background: "#060606" }}
    >
      {/* ── HERO (first viewport) ── */}
      <div className="ss-snap" data-slide="hero" data-label="Top" style={{ position: "relative", height: "100dvh", overflow: "hidden" }}>
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
            filter: "brightness(0.62) contrast(1.1)",
            zIndex: 1,
          }}
        />

        {/* Vignette */}
        <div style={{
          position: "absolute", inset: 0, zIndex: 2,
          background: "radial-gradient(ellipse 65% 100% at 72% 50%, transparent 25%, rgba(6,6,6,.65) 70%), linear-gradient(to bottom, rgba(6,6,6,.25) 0%, transparent 30%, transparent 65%, rgba(6,6,6,.85) 100%)",
        }} />

        {/* Content */}
        <div style={{ position: "absolute", bottom: isMobile ? "14vh" : "24vh", left: "8vw", zIndex: 10, transition: "bottom 0.3s ease" }}>
          <HeroName isMobile={isMobile} />

          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.58, ease: [0.16,1,0.3,1] }}
            style={{ marginTop: 16, maxWidth: 460, fontSize: 16, lineHeight: 1.5, color: "rgba(245,242,237,.82)" }}
          >
            Click{" "}
            <span
              role="button" tabIndex={0}
              onClick={() => onNavigate("work")}
              onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") onNavigate("work"); }}
              {...hover}
              style={{ color: "#38bdf8", textDecoration: "underline", textUnderlineOffset: "3px", textDecorationThickness: "1.5px", fontWeight: 600, cursor: "none" }}
            >
              here
            </span>{" "}
            {/* THE WHOLE SENTENCE, ON EVERY DEVICE (user, 2026-09-02). The tail used to be cut
                to a full stop under 640px, so a phone was never told the 3D environment existed
                at all. Whether you can ENTER it is a separate question, answered at the end of
                the storyboard; being able to read about it is not gated on anything. */}
            to browse my site, or scroll down for the interactive 3D environment built into it.
          </motion.p>
        </div>

        {/* Scroll cue into the storyboard */}
        <motion.button
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.15 }}
          className="ss-story-cue"
          onClick={scrollToStory}
          {...hover}
          style={{ cursor: "none" }}
        >
          <span className="ss-cue-arrow">▼</span>
        </motion.button>
      </div>

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
              src="/assets/story/story_aerial_town.jpg"
              alt="The town from above: the ruins, the coffee shop, the run down cottage across the river, and the modern house with a car on its driveway."
              decoding="async"
            />
            <div className="ss-open-veil" aria-hidden />
          </div>
          <div className="ss-open-copy">
            <Words className="ss-open-title" text="My Lego Realm" variant={sbWordUp} stagger={0.07} />
            <Words
              className="ss-open-line"
              text="An interactive real time 3D environment, built brick by brick in Blender. Walk the town and step inside any building to see the work it holds."
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
          <Slide id="map" label="The town" className="ss-slide-map" stagger={0.18}>
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
                kicker="What it is"
                body="A small town built on a LEGO inspired baseplate. Each structure holds a different branch of the work, and walking into one is how you open it."
              />
              <RealmMap />
              <div className="ss-map-hint">Pick a structure to see what it holds</div>
            </div>
          </Slide>

          {/* WHY: THE QUIET ONE. Every screen either side of it is loud, the map before it
              and the workshop after, so this one is deliberately the least furnished thing
              on the deck: a title, the paragraph, and one picture with no border, no head
              strip and no caption box. Its still is the last in-engine frame that is not
              the town itself, and the figure IS the subject of the copy. */}
          <Slide id="why" label="Why I made it" stagger={0.2}>
            <div className="ss-quiet">
              <StoryChapter
                pair
                kicker={"Why I\nmade it"}
                body="The environment is a work sample in its own right. Building it took the same disciplines the rest of the portfolio presents, hard surface modeling and UV work in Blender, real time rendering and collision in the browser, and the front end engineering that ties the two together. It also goes back to where my work started, stop motion films built from LEGO, and to the technologies I have taken on since."
              />
              <Plate
                scene="The player figure"
                src="/assets/story/story_figure_front.jpg"
                caption="A younger me by design. Assembled from separate parts rather than one mesh: each was modeled and textured on its own, then measured into place and bound to the rig at load time."
              />
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
          <Slide id="shop" label="How I made it" stagger={0.18}>
            <StoryChapter
              pair
              kicker={"How I\nmade it"}
              body="Every structure was assembled from individual bricks in Blender. Most are my own builds, with some free assets worked in and modified to fit. Each model is exported as glTF, Draco compressed, and loaded by a custom Three.js engine that runs directly in the browser. The world uses the exact LEGO stud pitch as its grid, collision is rasterized per brick rather than per bounding box, stair climbing runs on a walkable heightmap, and the lighting completes a full day cycle every seven minutes."
            />
            <WorkSheet />
          </Slide>


        </div>

        {/* THE DOOR, and it mirrors the opener: the same full bleed treatment on the other
            aerial, so the deck ends where it began with the way in on it. The MEASURED
            FIGURES sit above the title. They are the one thing the page can say that the
            pictures cannot, they are all real (scratchpad/realm_cost.cjs and CLAUDE.md),
            and they cost no screen of their own here. */}
        <Slide id="close" label="Try it" className="ss-slide-close" stagger={0.16}>
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
              className="ss-open-title ss-close-title"
              text={realm.ok ? "Walk it yourself" : "The finished build"}
              variant={sbWordUp}
              stagger={0.07}
            />
            <Words
              className="ss-open-line"
              text={realm.ok
                ? "The full version runs on this site, with the day cycle and all four portals active."
                : "The full version runs on this site on a desktop or laptop, with the day cycle and all four portals active."}
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
                <span>Enter My Lego Realm</span><span>→</span>
              </a>
            ) : (
              <p
                style={{
                  maxWidth: 430, fontSize: 14, lineHeight: 1.6,
                  color: "rgba(245,242,237,.62)",
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                }}
              >
                <span style={{
                  display: "block", marginBottom: 6,
                  fontFamily: "'Space Mono', monospace", fontSize: 10,
                  letterSpacing: 2, textTransform: "uppercase", color: "var(--sky)",
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
                fontFamily: "'Space Mono', monospace",
                fontSize: 11, letterSpacing: 2, textTransform: "uppercase",
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

/* ── DECK MOTION ─────────────────────────────────────────────────────────────────────
   The deck's rule: A SLIDE IS ONE ORCHESTRATOR AND NOTHING BELOW IT TRIGGERS ITSELF.
   `Slide` is the only thing carrying `whileInView`; every part under it declares
   `variants` alone and inherits when it runs. That is what makes a slide arrive as a
   sequence, label then heading then body then the picture then the caption, instead of
   as four independent blocks that happen to be near each other. Variant inheritance in
   framer-motion is React CONTEXT, not the DOM, so a plain grid <div> between a slide
   and its two frames does not break the chain and both frames still stagger off the
   slide.
   And it re-runs. `once` is deliberately NOT set: on a deck the slide you left is
   fully off screen, so coming back up should replay rather than show you a finished
   still. */
const SB_EASE = [0.16, 1, 0.3, 1] as const;

const sbSlide: Variants = {                       // a whole slide: paces its parts
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.06 } },
};
const sbGroup: Variants = {                       // a nested group (a frame's own parts)
  hidden: {},
  show: { transition: { staggerChildren: 0.11, delayChildren: 0.04 } },
};

/* ── TEXT ──
   Words, not blocks. A heading and a paragraph are the two things on a slide with no
   picture, so a single fade would leave those slides doing nothing at all. */
const sbWordUp: Variants = {                      // kicker: each word tips up off its baseline
  hidden: { opacity: 0, y: "0.55em", rotateX: -68, transformPerspective: 700 },
  show: { opacity: 1, y: "0em", rotateX: 0, transition: { duration: 0.66, ease: SB_EASE } },
};
const sbWordIn: Variants = {                      // body: a quick, quiet ripple across the lines
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: SB_EASE } },
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
  hidden: { opacity: 0, scale: 1.09 },
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
function Words({ text, variant, stagger = 0.03, className, style }: {
  text: string; variant: Variants; stagger?: number; className?: string; style?: React.CSSProperties;
}) {
  const nodes: React.ReactNode[] = [];
  text.split("\n").forEach((line, li) => {
    if (li > 0) nodes.push(<br key={"br" + li} />);
    const words = line.split(" ");
    words.forEach((w, i) => nodes.push(
      <motion.span key={li + "-" + i} className="ss-w" variants={variant} style={{ display: "inline-block", willChange: "transform" }}>
        {w}{i < words.length - 1 ? " " : ""}
      </motion.span>
    ));
  });
  return (
    <motion.p
      className={className}
      style={style}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger } } }}
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
// Quantizes a tween into n held intervals stepping 0 -> 1. Dividing by n-1 (not n) is
// load bearing: with /n the value only reaches 1 at exactly t === 1, a single instant that
// keyframe sampling skips, which left every still clipped a fifth short of the top forever.
const stepEase = (n: number) => (t: number) => Math.min(1, Math.floor(t * n) / (n - 1));

const shotCourses: Variants = {                   // 03 How I made it: uncovered bottom to top in five held
  hidden: { clipPath: "inset(100% 0% 0% 0%)" },   // courses, the way a build goes on course by course
  show: { clipPath: "inset(0% 0% 0% 0%)", transition: { duration: 1.05, ease: stepEase(6) } },
};

/* A PLATE: a still with no border, no head strip and no caption box. The frame chrome was
   right when every picture on the deck was one of thirteen specimens in a catalogue; it is
   wrong now that the world shots are full bleed and the Blender captures are a contact
   sheet. A label over it, the picture, a caption under it, all in the open. */
function Plate({ scene, src, caption }: { scene: string; src: string; caption: string }) {
  return (
    <motion.figure className="ss-plate" variants={sbBox}>
      <motion.span className="ss-plate-label" variants={sbHead}>{scene}</motion.span>
      <motion.div className="ss-plate-shot" variants={shotCourses}>
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
    caption: "The coffee shop part way up: walls built to the halfway course, the roof and awning not yet placed, the umbrella pole still bare. Every piece is a separate modeled brick that snaps to the same stud grid the engine uses." },
  { scene: "Mesh editing", src: "/assets/story/story_blender_ruins_edit.jpg",
    caption: "The ruins in Edit Mode, built up to the doorway arch with the upper storey still to come. The highlighted course is the one going on next." },
  { scene: "Sculpting", src: "/assets/story/story_blender_hair_sculpt.jpg",
    caption: "The character's hair in Sculpt Mode under a clay material. Roughly 8,000 vertices shaped by hand, then exported with cleaned normals for smooth shading." },
  { scene: "UV and texturing", src: "/assets/story/story_blender_skull_uv.jpg",
    caption: "The skull prop in the UV Editing workspace. On the left the mesh is unwrapped flat over its painted texture, on the right the same texture is shown mapped onto the model. Every printed detail in the world is applied this way." },
  { scene: "Figure assembly", src: "/assets/story/story_blender_figure_exploded.jpg",
    caption: "The minifig broken into its parts: hair, head, torso, and arms. The legs are a separate asset, attached to the hip pivots at runtime so the walk cycle can swing them." },
  { scene: "Materials", src: "/assets/story/story_blender_house_nodes.jpg",
    caption: "The modern house with the ground floor closed and the upper storey just started. The node graph under the viewport defines the tinted window glass: fully metallic, zero roughness, reduced alpha." },
  { scene: "Render preview", src: "/assets/story/story_blender_cottage_render.jpg",
    caption: "The run down cottage with its walls finished and the roof not yet on, in a rendered viewport under a warm sun. Renders like this were used to check color and lighting before export." },
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
            <motion.span className="ss-cell-shot" variants={shotCourses}>
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
const sbFig: Variants = {                         // a figure lands in held steps, like a piece
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: stepEase(4) } },
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
   map and over the buildings. */
const REALM_MAP = [
  { id: "shop", name: "The coffee shop", cat: "Professional Services", x: 18.2, y: 26.0, flip: false,
    src: "/assets/story/story_shop_evening.jpg",
    line: "Commissioned client work. Full stack websites, brand and print for small businesses, and concept visualization." },
  { id: "cottage", name: "The run down cottage", cat: "Personal Projects", x: 53.5, y: 25.0, flip: false,
    src: "/assets/story/story_sunset.jpg",
    line: "Self directed work. 3D modeling and rendering, product prototypes, custom hardware, photography and fabrication." },
  { id: "house", name: "The modern house", cat: "About", x: 93.5, y: 38.0, flip: true,
    src: "/assets/story/story_lamp_night.jpg",
    line: "Background and training, and how the disciplines across the rest of the site fit together." },
  { id: "ruins", name: "The ruins", cat: "NABU", x: 13.0, y: 85.0, flip: false,
    src: "/assets/story/story_crystal_night.jpg",
    line: "Art direction, promotional video and campaign photography for the NABU clothing label." },
];

/* the pin snaps on in held steps instead of easing, because everything in this world
   arrives by being pressed onto a plate */
const sbPin: Variants = {
  hidden: { opacity: 0, scale: 0 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: stepEase(4) } },
};
const sbCard: Variants = {                        // and the card builds course by course
  hidden: { opacity: 0, clipPath: "inset(100% 0% 0% 0%)" },
  show: { opacity: 1, clipPath: "inset(0% 0% 0% 0%)", transition: { duration: 0.5, ease: stepEase(5) } },
};

function RealmMap() {
  const stage = useRef<HTMLDivElement>(null);
  const [fit, setFit] = useState({ left: 0, top: 0, w: 0, h: 0 });
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
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const shown = REALM_MAP.find((b) => b.id === open) || null;
  return (
    <div className="ss-map-frame">
    <motion.div className="ss-map-stage" ref={stage} variants={sbRise}>
      {/* a blurred bed behind, so the letterbox on an off aspect window is the world out
          of focus rather than two black bars */}
      <img className="ss-map-bed" src="/assets/story/story_aerial_town.jpg" alt="" aria-hidden decoding="async" />
      <div className="ss-map-fit" style={{ left: fit.left, top: fit.top, width: fit.w, height: fit.h }}>
        <img className="ss-map-img" src="/assets/story/story_aerial_town.jpg"
          alt="The town from above: the coffee shop, the run down cottage, the modern house and the ruins."
          decoding="async" />
        {REALM_MAP.map((b) => (
          <motion.button
            key={b.id}
            variants={sbPin}
            className={`ss-map-pin${b.flip ? " flip" : ""}${open === b.id ? " on" : ""}`}
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
  function card() {
    return (
      <AnimatePresence>
        {shown && (
          <motion.div
            key={shown.id}
            className="ss-map-card"
            variants={sbCard}
            initial="hidden" animate="show"
            exit={{ opacity: 0, transition: { duration: 0.16 } }}
          >
            <img src={shown.src} alt={shown.name} decoding="async" />
            <div className="ss-map-card-body">
              <span className="ss-map-card-cat">{shown.cat}</span>
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
    ? { hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: 0.06 } } }
    : sbSlide;
  return (
    <motion.section
      className={`ss-slide ss-snap${className ? " " + className : ""}`}
      data-slide={id}
      data-label={label}
      variants={pace}
      initial="hidden"
      whileInView="show"
      viewport={{ amount: 0.35 }}
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
function StoryChapter({ kicker, body, pair, children }: {
  kicker: string; body: string; pair?: boolean; children?: React.ReactNode;
}) {
  const kickerEl = <Words className="ss-story-kicker" text={kicker} variant={sbWordUp} stagger={0.055} />;
  // size, leading and colour come from `.ss-chapter-body`, not from an inline style: an
  // inline style beats a stylesheet, and the body's size has to be able to give way on a
  // short or narrow window for the slide to keep fitting its own screen.
  const bodyEl = <Words text={body} variant={sbWordIn} stagger={0.016} />;
  if (pair) {
    return (
      <div className="ss-chapter-head">
        <div>{kickerEl}</div>
        <div className="ss-chapter-body">{bodyEl}</div>
      </div>
    );
  }
  return (
    <div className="ss-chapter-stack">
      {kickerEl}
      <div className="ss-chapter-body">{bodyEl}</div>
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
      behavior: "smooth",
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
function WorkPage({ onCardClick, onNavigate }: { onCardClick: (p: Project) => void; onNavigate: (p: Page) => void }) {
  const hover = useCursorHover();
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ── coverflow carousel: one focused card, two visible on the sides ──
  const [active, setActive] = useState(0);
  const n = PROJECTS.length;
  const startX = useRef(0);
  const moved = useRef(false);
  useEffect(() => {
    const t = setTimeout(() => setActive((a) => (a + 1) % n), 30000); // auto-advance, resets on any change
    return () => clearTimeout(t);
  }, [active, n]);
  const go = (dir: number) => setActive((a) => (a + dir + n) % n);
  const isMob = window.innerWidth <= 640;
  const cardW = isDesktop ? 420 : Math.min(window.innerWidth * 0.74, 360);
  const cardH = Math.min(cardW * 1.32, window.innerHeight * 0.6);
  const sideX = cardW * (isDesktop ? 0.98 : 0.62);

  // per-slide identity: base colour + the colour the particles emit
  const WORK_BG_THEME: Record<string, { base: string; emit: string }> = {
    "creative-projects":     { base: "#030b05", emit: "46,224,120" },   // neon green
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
    <motion.div key="work" {...fade}
      style={{
        position: "absolute", inset: 0, overflow: "hidden",
        background: "#0c0d0f",
      }}
    >
      {/* slow, continuous particle flow; particles emit the active project's colour */}
      <WorkParticles base={bgt.base} emit={bgt.emit} />

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
        padding: "44px 5vw 0",
        zIndex: 10, maxWidth: 780,
      }}>
        <motion.h2
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16,1,0.3,1] }}
          style={{ fontSize: "clamp(38px,5vw,84px)", letterSpacing: "-0.02em", fontWeight: 700, lineHeight: 1, color: titleColor, textShadow, transition: "color 0.7s ease" }}
        >
          Work
        </motion.h2>

        {/* THE CTA IS NO LONGER DESKTOP ONLY, and it no longer states availability
            (user, 2026-09-03). Two separate changes to one block:
            · The gate moved from the whole motion.div ONTO THE PARAGRAPH. This link is the
              only route from Work to Contact other than the nav, and it was inside an
              `isDesktop && (...)` (>= 1024), so every phone and every tablet browsed the
              entire portfolio with no call to action at the end of it. The blurb underneath
              the heading stays desktop only, because that is a space decision and the phone
              layout was built without it.
            · "Available for work. Let's talk" lost its first sentence. The site said it in
              three places, and this was the one where it sat in front of the verb: a CTA
              should open with the action. Contact's italic line is the single place that
              states availability now, and it is the most specific of the three.
            `ss-tap` because at 14px this is well under the 44px touch minimum once it is
            actually reachable on a phone. It lays a transparent ::after over the link and
            changes neither the drawn size nor the layout. */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.16,1,0.3,1] }}
          style={{ marginTop: 10, maxWidth: 640 }}
        >
          {isDesktop && (
            <p style={{ fontSize: 15, lineHeight: 1.45, color: midColor, textShadow, transition: "color 0.7s ease" }}>
              Commissioned client work, plus personal and academic projects across every medium.
            </p>
          )}
          <a
            onClick={() => onNavigate("contact")}
            {...hover}
            className="ss-work-cta ss-tap"
            style={{ display: "inline-block", marginTop: 8, fontSize: 14, fontWeight: 600, color: titleColor, textShadow, cursor: "none", transition: "color 0.7s ease" }}
          >
            Let's talk &rarr;
          </a>
        </motion.div>
      </div>

      {/* Coverflow carousel: one focused card, two visible on the sides */}
      <div
        style={{
          position: "absolute", left: 0, right: 0,
          top: 0, bottom: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
          perspective: 1800, touchAction: "pan-y",
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
                animate={{ x: target.x, scale: target.scale, rotateY: target.rotateY, opacity: target.opacity }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
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
              className="ss-card"
              animate={{ x: target.x, scale: target.scale, rotateY: target.rotateY, opacity: target.opacity }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
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

      {/* Carousel indicators */}
      <div style={{ position: "absolute", bottom: isMob ? 22 : 30, left: 0, right: 0, display: "flex", justifyContent: "center", gap: 9, zIndex: 20 }}>
        {PROJECTS.map((_, i) => (
          <div
            key={i}
            onClick={() => setActive(i)}
            {...hover}
            style={{
              width: i === active ? 26 : 8, height: 8, borderRadius: 980,
              background: i === active ? "#38bdf8" : (light ? "rgba(20,17,11,.3)" : "rgba(245,242,237,.28)"),
              cursor: "none", transition: "all .45s cubic-bezier(.16,1,.3,1)",
            }}
          />
        ))}
      </div>


    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────
   ABOUT PAGE
───────────────────────────────────────────────────────────── */
function AboutPage() {
  const [photoLoaded, setPhotoLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 640);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 640);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <motion.div key="about" {...fade}
      style={{ position: "absolute", inset: 0, background: "var(--cream)", overflow: "hidden" }}
      className="ss-about-page"
    >
      <div style={{
        display: "grid", gridTemplateColumns: "1fr 1fr",
        height: "100%", width: "100%",
      }}>
        {/* Text column */}
        <div className="ss-about-text-column" style={{
          display: "flex", flexDirection: "column", justifyContent: "center",
          /* THE VERTICAL PADDING HAS TO GIVE WAY, because this column is justify-content:
             center AND overflow:hidden, so copy that outgrows it is not scrolled to, it is
             silently cut in half. A flat 80px was affordable when the headline was one word
             on one line; measured after the name and the longer copy went in, the column ran
             6px over its own box at 1280x800, 46 at 1280x720 and 55 at 1024x768. (1024x700
             was ALREADY 30px over before any of this, which nothing had caught.) 6vh gives
             the copy back 64 to 76px exactly where the screen is short, and resolves to the
             original 80px at 1333px of height and up, so nothing changes on a full display. */
          padding: window.innerWidth <= 640 ? "60px 3vw 60px 3vw" : "clamp(32px, 6vh, 80px) 60px clamp(32px, 6vh, 80px) 8vw",
          overflow: "hidden",
        }}>
          <motion.div
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16,1,0.3,1] }}
            className="ss-about-subtitle"
            style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, letterSpacing: 4, textTransform: "uppercase", color: "var(--accent)", marginBottom: 16 }}
          >
            Designer &amp; Maker
          </motion.div>

          {/* THE NAME, NOT THE WORD "ABOUT". This is the largest object on the page and it
              used to spend itself on the same word as the nav item that was just clicked,
              which is a label rather than information: the nav has already said which page
              this is. Meanwhile "Shyon Shiri" appeared nowhere in the rendered text of his
              own About page, only in the photo's alt attribute.
              TWO HAND SET LINES, and the break is not cosmetic. The name is 11 characters
              against "About"'s 5, so at the old clamp(96,12vw,180) it measured wider than
              the text column at every width the page is built for and would have run under
              the photo. Broken, the longest line is 5 characters, which is exactly what the
              old size was scaled for; the max comes down to 132 so the two lines together
              (0.92 leading, so 243px) still leave the copy its room at a 900px viewport.
              The 768 and 640 overrides below still apply and are unchanged. */}
          <motion.h2
            initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16,1,0.3,1] }}
            style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(64px,7.4vw,124px)", letterSpacing: 4, lineHeight: 0.92, color: "#060606", marginBottom: 16 }}
          >
            Shyon<br />Shiri
          </motion.h2>

          <motion.div
            className="ss-about-rule"
            initial={{ width: 0 }} animate={{ width: 80 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.16,1,0.3,1] }}
            style={{ height: 1, background: "#060606", margin: "16px 0" }}
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55, ease: [0.16,1,0.3,1] }}
          >
            {/* WHAT THIS PAGE IS FOR, and it is the one job no other page does. Home carries
                the narrative (the "Why I made it" slide already tells the stop motion and
                LEGO origin, in context and against a picture), and Work carries the evidence.
                About was carrying neither: it ran a six discipline list and then two
                unfalsifiable lines about craft and standards, which is the one mode that
                gives a reviewer nothing, since no designer claims the opposite.
                So this is the FACTS page now, in the order a recruiter scans for them: what
                he is, where he is, the credential and its date, the scope he works at, and
                what he does today.
                NO CLIENT AND NO EMPLOYER IS NAMED HERE, deliberately (user, 2026-09-03, in
                two passes). A draft called out Everly Care Home and minasech.net with the
                scope of each spelled out, which is the right move on a STANDALONE about page
                where prose is the only evidence a reader will ever get. It is the wrong move
                on this site: Work is one click away and carries both of them with images,
                descriptions and live links, so naming them here is the same evidence twice in
                the weaker format, it goes stale the moment a better project ships, and a
                reader takes a list of exactly two clients as the complete list. Handshake
                came out on the same principle in the pass after.
                The AI evaluation FACT stays, because it is the one thing on this page that
                the rest of the site cannot show: there is no Work entry for it, so unlike the
                client sites it is not duplicated anywhere. Unattributed it needs to say what
                the job actually IS or it reads as a vague claim, hence the rubric and ground
                truth clause, which is the resume's own description of the role.
                Proof lives on Work. About states the scope.
                The second paragraph is the only biography kept, and it earns its line by
                explaining the thing the work would otherwise look scattered for: why a
                graphic designer's portfolio also holds welding, hardware and a game engine. */}
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 300, lineHeight: 1.75, color: "#3a3a3a", maxWidth: 480 }}>
              I'm a graphic designer and developer in the Bay Area, with a BA in Graphic Design from San Jose State, 2025. I take a project from identity through to a deployed site, so design, front end, and deployment are one job rather than three handoffs. I also evaluate multimodal AI systems against rubrics, writing the corrected ground truth where models fail.
            </p>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 300, lineHeight: 1.75, color: "#3a3a3a", maxWidth: 480, marginTop: 20 }}>
              Most of what I design ends up physical or interactive rather than sitting on a page. That is why the same portfolio holds 3D printed hardware enclosures, a welded steel sculpture, and a LEGO world running in this browser.
            </p>
          </motion.div>
        </div>

        {/* Photo column */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.1 }}
          style={{ position: "relative", overflow: "hidden", background: "#1a1a1a" }}
        >
          <img
            src="/assets/Shyon_About.png"
            alt="Shyon Shiri"
            onLoad={() => setPhotoLoaded(true)}
            className={photoLoaded ? "ss-about-photo ss-about-photo-active" : "ss-about-photo"}
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 10%", filter: "grayscale(20%) contrast(1.05)" }}
          />
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to right, rgba(237,232,224,.2) 0%, transparent 30%), linear-gradient(to bottom, rgba(6,6,6,.35) 0%, transparent 30%, transparent 60%, rgba(6,6,6,.18) 100%)",
          }} />
        </motion.div>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────
   CONTACT PAGE
───────────────────────────────────────────────────────────── */
function ContactPage() {
  const hover = useCursorHover();

  const links = [
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
    <motion.div key="contact" {...fade}
      style={{ position: "absolute", inset: 0, background: "#060606", display: "flex", flexDirection: "column", justifyContent: "center", overflow: "hidden" }}
    >
      {/* giant ghost word */}
      <div style={{
        position: "absolute", left: -30, bottom: "-12vh",
        fontFamily: "'Bebas Neue', sans-serif",
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

      {/* content */}
      <div style={{ position: "relative", zIndex: 10, padding: window.innerWidth <= 640 ? "0 18px" : "0 9vw", width: "100%" }}>
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
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.35, ease: [0.16,1,0.3,1] }}
              className="ss-contact-heading"
              style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(64px,9vw,128px)", letterSpacing: 5, lineHeight: 0.86, color: "var(--white)" }}
            >
              Let's Work<span style={{ color: "var(--white)" }}>.</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="ss-contact-description"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontWeight: 300, fontSize: "clamp(18px,2vw,22px)", color: "var(--mid)", maxWidth: 280, textAlign: "right", marginBottom: 8 }}
          >
            Open to freelance, collaborations &amp; full-time roles.
          </motion.p>
        </div>

        {/* indexed contact list */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.65, ease: [0.16,1,0.3,1] }}
          style={{ display: "flex", flexDirection: "column", borderTop: "1px solid rgba(245,242,237,.14)" }}
        >
          {links.map((l, i) => (
            <a
              key={l.label}
              href={l.href}
              target={(l as any).target}
              rel={(l as any).target ? "noopener noreferrer" : undefined}
              style={{
                display: "flex", alignItems: "center", gap: window.innerWidth <= 640 ? 16 : 28,
                padding: window.innerWidth <= 640 ? "16px 8px" : "26px 8px", textDecoration: "none",
                borderBottom: "1px solid rgba(245,242,237,.14)",
                transition: "background 0.3s ease, padding-left 0.3s ease",
                cursor: "none",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(56,189,248,.07)";
                e.currentTarget.style.paddingLeft = "24px";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.paddingLeft = "8px";
              }}
              {...hover}
            >
              <span style={{ fontFamily: "'Space Mono', monospace", fontSize: window.innerWidth <= 640 ? 10 : 12, letterSpacing: 2, color: "var(--sky)", width: 34, flexShrink: 0 }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: window.innerWidth <= 640 ? "clamp(18px,3vw,28px)" : "clamp(28px,4vw,40px)", letterSpacing: 2, color: "var(--white)", width: window.innerWidth <= 640 ? "auto" : 240, flexShrink: 0 }}>
                {l.label}
              </span>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: window.innerWidth <= 640 ? 14 : 20, color: "var(--mid)", flex: 1, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {(l as any).value}
              </span>
              <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 18, color: "var(--sky)", flexShrink: 0 }}>→</span>
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
function WorkModal({ project, onClose, onMediaClick }: {
  project: Project;
  onClose: () => void;
  onMediaClick: (item: MediaItem) => void;
}) {
  const hover = useCursorHover();
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 2000,
        background: "rgba(6,6,6,.93)",
        backdropFilter: "blur(20px)",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.4, ease: [0.16,1,0.3,1] }}
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
          className="ss-modal-close"
          style={{
            position: "absolute", top: 60, right: 20,
            background: "none", border: "none", cursor: "none",
            fontFamily: "'Space Mono', monospace", fontSize: 10,
            letterSpacing: 2, textTransform: "uppercase",
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
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 16, color: "var(--sky)", marginTop: 8 }}>
              {project.id === "creative-projects" ? "A selection of projects that demonstrate my range across various creative disciplines and mediums." : project.id === "professional-services" ? "Client-focused work including UI/UX, web development, branding and marketing assets." : project.id === "nabu" ? "Design and creative direction for NABU, a streetwear brand that draws from Persian and Assyrian heritage." : "testing"}
            </div>
          </div>
        </div>

        {/* Asset grid — masonry for creative + professional; existing grid for others */}
        {["creative-projects", "professional-services"].includes(project.id) ? (
          <div style={{ position: "relative", flex: 1, minHeight: 0, display: "flex", flexDirection: "column" }}>
            <div className="ss-scroll" style={{ flex: 1, minHeight: 0, overflowY: "auto", overflowX: "hidden", paddingRight: 8, display: "flex", gap: 14, alignItems: "flex-start" }}>
              {(() => {
                const items = project.media.filter(item => !item.hidden);
                const colCount = window.innerWidth <= 640 ? 2 : window.innerWidth <= 1023 ? 3 : 4;
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
            fontFamily: "'Space Mono', monospace",
            fontSize: 10,
            letterSpacing: 1,
            color: "var(--mid)",
            textTransform: "uppercase",
          }}>
            ↻ Swipe to explore
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
    <div className="ss-scell" onClick={onClick} {...hover}>
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
        <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: "var(--mid)", marginTop: 4 }}>{item.year}</div>
      </div>
    </div>
  );
}

function ModalTile({ item, onClick }: { item: MediaItem; onClick: () => void }) {
  const hover = useCursorHover();

  return (
    <div
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
        <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: "var(--sky)", letterSpacing: 1, marginTop: 2 }}>{item.year}</div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   MEDIA VIEWER (fullscreen single item)
───────────────────────────────────────────────────────────── */
function MediaViewer({ item, onClose, onItemClick }: { item: MediaItem; onClose: () => void; onItemClick?: (item: MediaItem) => void }) {
  const hover = useCursorHover();
  
  // Single-asset view. No prev/next arrows (they interrupted assets that have
  // their own arrow/button controls). Related items open via the named links.
  const displayedItem = item;

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 3000,
        background: "rgba(6,6,6,.97)",
        backdropFilter: "blur(30px)",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.35, ease: [0.16,1,0.3,1] }}
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
            fontFamily: "'Space Mono', monospace", fontSize: 10,
            letterSpacing: 2, textTransform: "uppercase",
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
          <div className="ss-asset-title" style={{ fontSize: 64, letterSpacing: 0.5, lineHeight: 1.02, color: "var(--white)", marginBottom: 24, fontWeight: 600 }}>
            {item.title}
          </div>
          <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, letterSpacing: 2, color: "var(--sky)", textTransform: "uppercase", marginBottom: 20 }}>
            {item.year}
          </div>
          {item.desc && (
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, lineHeight: 1.7, color: "rgba(245,242,237,.75)", fontWeight: 300, marginBottom: 32 }}>
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
                    fontFamily: "'Space Mono', monospace", fontSize: 10,
                    letterSpacing: 2, textTransform: "uppercase",
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
                fontFamily: "'Space Mono', monospace", fontSize: 10,
                letterSpacing: 2, textTransform: "uppercase",
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
