import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
    title: "Creative Projects",
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
      { type: "image", src: "/assets/New_Radar_Sensor_front.jpg", title: "Radar — Front View", year: 2024, hidden: true },
      { type: "image", src: "/assets/New_Radar_Sensor_Back.jpg", title: "Radar — Back View", year: 2024, hidden: true },
      { type: "image", src: "/assets/New_LED_Box_Front.jpg", title: "RGB Box — Front View", year: 2024, hidden: true },
      { type: "image", src: "/assets/New_LED_Box_Back.jpg", title: "RGB Box — Back View", year: 2024, hidden: true },
      { type: "image", src: "/assets/Max_Pic.JPG", title: "Candid Studio Portrait", year: 2024, desc: "Studio portrait shot with controlled lighting.", aspectRatio: "2/3" },
      { type: "image", src: "/assets/Photography_1.jpg", title: "Studio Photography", year: 2024, desc: "Studio photography focused on composition and lighting.", aspectRatio: "1/1" },
      { type: "video", src: "/assets/New_Radar_Sensor.mp4", poster: "/assets/New_Radar_Sensor_front.jpg", title: "HMI Sensor System", year: 2024, desc: "Interactive radar module converting ultrasonic data into real-time feedback. Custom 3D printed enclosure with LCD and speaker.", aspectRatio: "4/3", relatedItems: ["Radar — Front View", "Radar — Back View"] },
      { type: "video", src: "/assets/New_LED_Box.mp4", poster: "/assets/New_LED_Box_Front.jpg", title: "Custom RGB Controller", year: 2024, desc: "Functional system built from scratch. 3D printed geometric casing housing the microcontroller.", aspectRatio: "4/3", relatedItems: ["RGB Box — Front View", "RGB Box — Back View"] },
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
      { type: "image", src: "/assets/RealEstate_MoskowiteCorner_Before.png", title: "Moskowite Corner — Existing Site", year: 2026, desc: "The existing site before redevelopment. A closed 1.26 acre gas station lot with parking and an office building.", aspectRatio: "16/9", hidden: true },
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
      { type: "video", src: "/assets/NABU_PUFFER_AD.mp4", poster: "/assets/NABU_Puffer_AD.jpg", title: "NABU 2026 Teaser", year: 2025, desc: "Promotional video for NABU's puffer jacket collection." },
      { type: "video", src: "/assets/NABU_SALE_AD.mp4", poster: "/assets/NABU_SALE_AD.jpg", title: "NABU 2025 Summer Collection", year: 2025, desc: "Promotional video for the NABU 2025 summer collection." },
      { type: "image", src: "/assets/Stevie_Pic.JPG", title: "NABU 2023 Spring Collection", year: 2022, desc: "Portrait photography for the NABU 2023 spring collection." },
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
    .ss-contact-subtitle { font-size: 8px !important; letter-spacing: 3px !important; }
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

  /* ── Lego Realm storyboard (home page scroll) ── */
  .ss-home-scroll {
    overflow-y: auto; overflow-x: hidden;
    scrollbar-width: none; -ms-overflow-style: none;
    overscroll-behavior: contain;
  }
  .ss-home-scroll::-webkit-scrollbar { display: none; }
  .ss-story-cue {
    position: absolute; left: 50%; bottom: max(22px, calc(22px + env(safe-area-inset-bottom)));
    transform: translateX(-50%);
    display: flex; flex-direction: column; align-items: center; gap: 8px;
    background: none; border: none; color: var(--white);
    opacity: .78; transition: opacity .3s ease;
    z-index: 12;
  }
  .ss-story-cue:hover { opacity: 1; }
  .ss-story-cue .ss-cue-label {
    font-family: 'Space Mono', monospace;
    font-size: 10px; letter-spacing: 3px; text-transform: uppercase;
  }
  .ss-story-cue .ss-cue-arrow {
    font-size: 15px; line-height: 1;
    animation: ss-cue-drop 1.9s ease-in-out infinite;
  }
  @keyframes ss-cue-drop {
    0%, 100% { transform: translateY(0); opacity: .9; }
    55% { transform: translateY(7px); opacity: .45; }
  }
  .ss-story-kicker {
    font-family: 'Space Mono', monospace;
    font-size: 11px; letter-spacing: 3px; text-transform: uppercase;
    color: var(--sky);
  }
  .ss-frame {
    border: 1px solid rgba(245,242,237,.16);
    background: #0a0a0c;
  }
  .ss-frame .ss-frame-head {
    display: flex; align-items: center; justify-content: space-between;
    padding: 9px 14px;
    border-bottom: 1px solid rgba(245,242,237,.14);
    font-family: 'Space Mono', monospace;
    font-size: 10px; letter-spacing: 2.5px; text-transform: uppercase;
    color: rgba(245,242,237,.6);
  }
  .ss-frame .ss-frame-img { display: block; width: 100%; height: auto; }
  .ss-frame figcaption {
    padding: 12px 14px 14px;
    border-top: 1px solid rgba(245,242,237,.14);
    font-size: 16px; line-height: 1.45;
    color: rgba(245,242,237,.7);
  }
  .ss-frame-grid {
    display: grid; grid-template-columns: 1fr 1fr; gap: 26px;
    align-items: start;
  }
  @media (max-width: 760px) {
    .ss-frame-grid { grid-template-columns: 1fr; }
    .ss-frame figcaption { font-size: 15px; }
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
    .ss-contact-subtitle { font-size: 16px !important; }
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
  /* Apple's system font (SF Pro on Mac) everywhere */
  * {
    font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display",
      "SF Pro Text", "Inter", system-ui, sans-serif !important;
  }
  /* big display headings read best with Apple's tight tracking */
  .ss-contact-heading,
  .ss-about-page h2 {
    letter-spacing: -0.02em !important;
    font-weight: 700 !important;
  }
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
    font-family: ui-rounded, "SF Pro Rounded", "Hiragino Maru Gothic ProN", -apple-system, system-ui, sans-serif !important;
  }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
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
        fontFamily: "'Cormorant Garamond', serif",
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
          mixBlendMode: page === "about" ? "normal" : "difference",
        }}
      >
        <div style={{ visibility: "hidden" }} />
        <ul style={{ display: "flex", gap: 40, listStyle: "none" }}>
          {PAGE_ORDER.map(p => (
            <li key={p}>
              <NavLink label={p.charAt(0).toUpperCase() + p.slice(1)} active={page === p} onClick={() => navigate(p)} currentPage={page} />
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
          mixBlendMode: page === "about" ? "normal" : "difference",
        }}
      >
        {PAGE_ORDER.map((p, i) => (
          <button
            key={p}
            onClick={() => navigate(p)}
            style={{
              width: 10, height: 10, borderRadius: "50%",
              border: "1px solid rgba(245,242,237,0.4)",
              background: page === p ? "var(--white)" : "transparent",
              transform: page === p ? "scale(1.5)" : "scale(1)",
              transition: "all 0.4s ease",
              cursor: "none",
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
function NavLink({ label, active, onClick, currentPage }: { label: string; active: boolean; onClick: () => void; currentPage?: string }) {
  const hover = useCursorHover();
  const isAboutPage = currentPage === "about";
  return (
    <button
      onClick={onClick}
      style={{
        fontFamily: "'Space Mono', monospace",
        fontSize: 11, letterSpacing: 2, textTransform: "uppercase",
        color: isAboutPage ? "#000000" : "var(--white)", background: "none", border: "none",
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
   HOME PAGE
───────────────────────────────────────────────────────────── */
function HomePage({ onNavigate }: { onNavigate: (p: Page) => void }) {
  const [loaded, setLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 640);
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
      <div style={{ position: "relative", height: "100dvh", overflow: "hidden" }}>
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
          <motion.h1
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.35, ease: [0.16,1,0.3,1] }}
            style={{
              fontSize: isMobile ? "clamp(48px,7vw,72px)" : "clamp(72px,10vw,160px)",
              lineHeight: 0.99, letterSpacing: "-0.02em", fontWeight: 700,
              color: "var(--white)",
            }}
          >
            Shyon<br />Shiri
          </motion.h1>

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
            to browse my site{!isMobile ? ", or the button below to step into My Lego Realm." : "."}
          </motion.p>

          {/* Ghost: enter the 3D realm (desktop only) */}
          {!isMobile && (
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.72, ease: [0.16,1,0.3,1] }}
              style={{ marginTop: 24 }}
            >
              <a
                href="/lego.html"
                {...hover}
                className="ss-contact-btn"
                style={{
                  display: "inline-flex", alignItems: "center", gap: 10,
                  padding: "15px 28px", borderRadius: 980,
                  border: "1px solid rgba(245,242,237,.4)",
                  color: "var(--white)", textDecoration: "none",
                  fontSize: 13, fontWeight: 600, cursor: "none",
                }}
              >
                <span>Enter My Lego Realm</span><span>→</span>
              </a>
            </motion.div>
          )}
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
          <span className="ss-cue-label">Build breakdown</span>
          <span className="ss-cue-arrow">▼</span>
        </motion.button>
      </div>

      {/* ── STORYBOARD ── */}
      <div style={{ position: "relative", background: "#060606", padding: "0 8vw" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto" }}>

          {/* Intro */}
          <StoryChapter
            kicker="The Lego Realm · Build breakdown"
            title="An interactive 3D portfolio, documented frame by frame."
            body="This site includes a second, interactive layer. The section below documents the Lego Realm: what it is, why I built it, and the pipeline used to produce it."
            first
          />

          {/* Chapter 01 · WHAT */}
          <StoryChapter
            kicker="01 · What it is"
            title="The portfolio as a 3D environment."
            body="The Lego Realm is a real time 3D environment embedded in this site. It is a small town on a single baseplate: a coffee shop, a modern house, a set of ruins, a run down cottage, and a playable minifig modeled after me. Each building functions as a portal. Entering one opens a category of my work: Professional Services, Creative Projects, About, and NABU."
          />
          <StoryFrame num="FR 01" scene="Overview" src="/assets/story/story_world_midday.jpg"
            caption="The full map at midday. Four structures, a sidewalk loop, and a continuous day and night cycle running on a seven minute loop." />
          <div className="ss-frame-grid" style={{ marginTop: 26 }}>
            <StoryFrame num="FR 02" scene="Player figure" src="/assets/story/story_figure_front.jpg"
              caption="The playable character, modeled after me. The hair, jacket, and denim legs were modeled and textured separately, then bound to the walk cycle rig." />
            <StoryFrame num="FR 03" scene="Night cycle" src="/assets/story/story_lamp_night.jpg"
              caption="Night in the realm. The lampposts are driven by the day cycle and brighten as the sun goes down. All lighting is computed in real time." />
          </div>
          <div className="ss-frame-grid" style={{ marginTop: 26 }}>
            <StoryFrame num="FR 04" scene="The coffee shop" src="/assets/story/story_shop_evening.jpg"
              caption="The coffee shop at dusk. Its interior is the portal to Professional Services." />
            <StoryFrame num="FR 05" scene="The NABU crystal" src="/assets/story/story_crystal_night.jpg"
              caption="The NABU portal: a crystal in the ruins built with an emissive material and a dedicated point light." />
          </div>

          {/* Chapter 02 · WHY */}
          <StoryChapter
            kicker="02 · Why I made it"
            title="It doubles as a work sample."
            body="I grew up building LEGO, and the format fits how I work: modular parts, a consistent grid, and structures you can inspect from any angle. The realm also functions as a work sample in itself. It demonstrates the 3D modeling, engineering, and web development skills that the portfolio inside it presents."
          />
          <StoryFrame num="FR 06" scene="Lighting" src="/assets/story/story_sunset.jpg"
            caption="The map at dusk. Sky, fog, sun color, exposure, and lamp intensity are interpolated continuously across the cycle rather than switched between presets." />

          {/* Chapter 03 · HOW */}
          <StoryChapter
            kicker="03 · How it was made"
            title="Modeled in Blender, rendered with Three.js."
            body="Every structure was assembled from individual bricks in Blender, using my own builds. Each model is exported as glTF, Draco compressed, and loaded by a custom Three.js engine that runs directly in the browser. The world uses the exact LEGO stud pitch as its grid, collision is rasterized per brick rather than per bounding box, stair climbing runs on a walkable heightmap, and the lighting completes a full day cycle every seven minutes."
          />
          <StoryFrame num="FR 07" scene="Props" src="/assets/story/story_blender_props.jpg"
            caption="Prop assets staged in Blender before export: the Porsche 912, the treasure chest, a lamppost, and the money bricks." />
          <div className="ss-frame-grid" style={{ marginTop: 26 }}>
            <StoryFrame num="FR 08" scene="Wireframe" src="/assets/story/story_blender_shop_wire.jpg"
              caption="The coffee shop in wireframe. Every brick is individually modeled geometry, not a texture or a decal." />
            <StoryFrame num="FR 09" scene="Edit mode" src="/assets/story/story_blender_hair.jpg"
              caption="The character's hair in edit mode. Modeled manually, then exported with cleaned normals for smooth shading." />
          </div>
          <div className="ss-frame-grid" style={{ marginTop: 26 }}>
            <StoryFrame num="FR 10" scene="Figure build" src="/assets/story/story_blender_figure.jpg"
              caption="The figure mid build in Blender. The legs were exported as a separate asset and bound to the hip pivots for the walk animation." />
            <StoryFrame num="FR 11" scene="The ruins" src="/assets/story/story_blender_ruins.jpg"
              caption="The ruins in Blender. The exported geometry was edited further for the final build, including removing extra columns and flower petals." />
          </div>
          <div className="ss-frame-grid" style={{ marginTop: 26 }}>
            <StoryFrame num="FR 12" scene="The modern house" src="/assets/story/story_blender_house.jpg"
              caption="The modern house with its garage and garden. In the realm, its door opens the About section." />
            <StoryFrame num="FR 13" scene="The cottage" src="/assets/story/story_blender_rundown.jpg"
              caption="The run down cottage, the most recent structure added to the map." />
          </div>

          {/* Closing CTA */}
          <StoryChapter
            kicker="04 · Try it"
            title="The live build."
            body="The full version runs on this site, with the day cycle and all four portals active."
          />
          <StoryFrame num="FR 14" scene="Live build" src="/assets/story/story_figure_back.jpg"
            caption="The current build, running in-engine. The entry button is below." />
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease: [0.16,1,0.3,1] }}
            style={{ display: "flex", alignItems: "center", gap: 22, flexWrap: "wrap", margin: "44px 0 14vh" }}
          >
            {!isMobile && (
              <a
                href="/lego.html"
                {...hover}
                className="ss-contact-btn"
                style={{
                  display: "inline-flex", alignItems: "center", gap: 10,
                  padding: "16px 30px", borderRadius: 980,
                  border: "1px solid rgba(245,242,237,.4)",
                  color: "var(--white)", textDecoration: "none",
                  fontSize: 13, fontWeight: 600, cursor: "none",
                }}
              >
                <span>Enter My Lego Realm</span><span>→</span>
              </a>
            )}
            <span
              role="button" tabIndex={0}
              onClick={() => onNavigate("work")}
              onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") onNavigate("work"); }}
              {...hover}
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: 11, letterSpacing: 2, textTransform: "uppercase",
                color: "rgba(245,242,237,.72)", textDecoration: "underline",
                textUnderlineOffset: "4px", cursor: "none",
              }}
            >
              {isMobile ? "Browse the work" : "or browse the work"}
            </span>
          </motion.div>

        </div>
      </div>
    </motion.div>
  );
}

/* One storyboard cell: numbered head strip, still, caption */
function StoryFrame({ num, scene, src, caption }: { num: string; scene: string; src: string; caption: string }) {
  return (
    <motion.figure
      className="ss-frame"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.8, ease: [0.16,1,0.3,1] }}
    >
      <div className="ss-frame-head"><span>{num}</span><span>{scene}</span></div>
      <img className="ss-frame-img" src={src} alt={scene} loading="lazy" decoding="async" />
      <figcaption>{caption}</figcaption>
    </motion.figure>
  );
}

/* Storyboard chapter header: mono kicker, display title, serif body */
function StoryChapter({ kicker, title, body, first }: { kicker: string; title: string; body: string; first?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.8, ease: [0.16,1,0.3,1] }}
      style={{ padding: first ? "13vh 0 46px" : "15vh 0 46px" }}
    >
      <div className="ss-story-kicker">{kicker}</div>
      <h2 style={{
        marginTop: 14,
        fontSize: "clamp(34px, 4.6vw, 62px)",
        lineHeight: 1.04, letterSpacing: "-0.015em", fontWeight: 700,
        color: "var(--white)", maxWidth: 820,
      }}>
        {title}
      </h2>
      <p style={{ marginTop: 20, maxWidth: 660, fontSize: 18, lineHeight: 1.65, color: "rgba(245,242,237,.78)" }}>
        {body}
      </p>
    </motion.div>
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

        {isDesktop && (
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: [0.16,1,0.3,1] }}
            style={{ marginTop: 10, maxWidth: 640 }}
          >
            <p style={{ fontSize: 15, lineHeight: 1.45, color: midColor, textShadow, transition: "color 0.7s ease" }}>
              Commissioned client work, plus personal and academic projects across every medium.
            </p>
            <a
              onClick={() => onNavigate("contact")}
              {...hover}
              className="ss-work-cta"
              style={{ display: "inline-block", marginTop: 8, fontSize: 14, fontWeight: 600, color: titleColor, textShadow, cursor: "none", transition: "color 0.7s ease" }}
            >
              Available for work. Let's talk →
            </a>
          </motion.div>
        )}
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
          padding: window.innerWidth <= 640 ? "60px 3vw 60px 3vw" : "80px 60px 80px 8vw",
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

          <motion.h2
            initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16,1,0.3,1] }}
            style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(96px,12vw,180px)", letterSpacing: 4, lineHeight: 0.92, color: "#060606", marginBottom: 16 }}
          >
            About
          </motion.h2>

          <motion.div
            initial={{ width: 0 }} animate={{ width: 80 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.16,1,0.3,1] }}
            style={{ height: 1, background: "#060606", margin: "16px 0" }}
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55, ease: [0.16,1,0.3,1] }}
          >
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 300, lineHeight: 1.75, color: "#3a3a3a", maxWidth: 480 }}>
              I'm a graphic designer and developer working across 3D design, motion graphics, UI/UX, fabrication, cinematography, and code. Covering several disciplines lets me take a project from concept to delivery without handing it off.
            </p>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 300, lineHeight: 1.75, color: "#3a3a3a", maxWidth: 480, marginTop: 20 }}>
              That range started in childhood with LEGO builds and stop motion films, and it became a working habit: learn the tools each project requires and use them properly. I hold finished work to a high standard of craft and detail.
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
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16,1,0.3,1] }}
              className="ss-contact-subtitle"
              style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, letterSpacing: 5, textTransform: "uppercase", color: "var(--sky)", marginBottom: 20 }}
            >
              Available for projects
            </motion.div>
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

          {item.relatedItems && item.relatedItems.length > 0 && !(item.title === "HMI Sensor System" || item.title === "Custom RGB Controller") ? (
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
