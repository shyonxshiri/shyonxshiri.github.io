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
      { type: "image", src: "/assets/Venom.PNG", title: "Rendered 3D Model", year: 2024, desc: "High-quality 3D rendered movie character with detailed modeling and texturing in Blender.", aspectRatio: "16/9" },
      { type: "image", src: "/assets/My_Case.jpg", title: "Custom Phone Case", year: 2025, desc: "Finalized rendition of the iPhone case prototype, designed to resemble liquid metal.", aspectRatio: "5/6", relatedItems: ["Apple Accessory Prototypes"] },
      { type: "image", src: "/assets/Airpod_Case.JPG", title: "Custom Airpod Case", year: 2026, desc: "Finalized rendition of the Airpod case prototype, designed to resemble liquid metal.", aspectRatio: "4/5", relatedItems: ["Apple Accessory Prototypes"] },
      { type: "image", src: "/assets/New_Radar_Sensor_front.jpg", title: "Radar — Front View", year: 2024, hidden: true },
      { type: "image", src: "/assets/New_Radar_Sensor_Back.jpg", title: "Radar — Back View", year: 2024, hidden: true },
      { type: "image", src: "/assets/New_LED_Box_Front.jpg", title: "RGB Box — Front View", year: 2024, hidden: true },
      { type: "image", src: "/assets/New_LED_Box_Back.jpg", title: "RGB Box — Back View", year: 2024, hidden: true },
      { type: "image", src: "/assets/Max_Pic.JPG", title: "Candid Studio Portrait", year: 2024, desc: "A vibrant portrait capturing authentic moments with professional lighting.", aspectRatio: "2/3" },
      { type: "image", src: "/assets/Photography_1.jpg", title: "Studio Photography", year: 2024, desc: "Professional photography exploring composition and lighting techniques.", aspectRatio: "1/1" },
      { type: "video", src: "/assets/New_Radar_Sensor.mp4", poster: "/assets/New_Radar_Sensor_front.jpg", title: "HMI Sensor System", year: 2024, desc: "Interactive radar module converting ultrasonic data into real-time feedback. Custom 3D printed enclosure with LCD and speaker.", aspectRatio: "4/3", relatedItems: ["Radar — Front View", "Radar — Back View"] },
      { type: "video", src: "/assets/New_LED_Box.mp4", poster: "/assets/New_LED_Box_Front.jpg", title: "Custom RGB Controller", year: 2024, desc: "Functional system built from scratch. 3D printed geometric casing housing the microcontroller.", aspectRatio: "4/3", relatedItems: ["RGB Box — Front View", "RGB Box — Back View"] },
      { type: "image", src: "/assets/Shyon_Sculpture.jpg", title: "Product, not Consumer", year: 2024, desc: "Hand-fabricated steel sculpture referencing consumer tech culture — welded, ground, sanded and finished.", aspectRatio: "5/4" },
      { type: "image", src: "/assets/Adverstisement_Project.jpg", title: "Campaign Project", year: 2024, desc: "Conceptual brand advertisement utilizing environmental storytelling and scenic composition.", aspectRatio: "16/9" },
    ],
  },
  {
    id: "professional-services",
    title: "Professional Services",
    tag: "Web & Design",
    img: "/assets/Digital_Media_Cover.jpg",
    size: "wide",
    media: [
      { type: "image", src: "/assets/Mina_Website.png", title: "UI/UX — minasech.net", year: 2025, desc: "Full-stack website design including React frontend and responsive interface.", link: "https://minasech.net", wide: true, aspectRatio: "16/9" },
      { type: "image", src: "/assets/Everly_Cover_Image.png", title: "Everly Care Home", year: 2026, desc: "Full-stack website design and development including branding, responsive interface, and complete deployment for a senior care community business.", link: "https://everlycarehome.com", wide: true, aspectRatio: "16/9" },
    ],
  },
  {
    id: "nabu",
    title: "NABU",
    tag: "Clothing Brand",
    img: "/assets/New_NABU_Site_Cover_Card.jpg",
    size: "tall",
    media: [
      { type: "video", src: "/assets/Nabu_Poster_Banner.mp4", poster: "/assets/Nabu_Poster_Banner.jpg", title: "NABU Promotional Video", year: 2023, desc: "Dynamic promotional video for NABU clothing, crafted with professional animation in Adobe After Effects.", wide: true },
      { type: "video", src: "/assets/NABU_PUFFER_AD.mp4", poster: "/assets/NABU_Puffer_AD.jpg", title: "NABU 2026 Teaser", year: 2025, desc: "Professional promotional video for NABU's puffer jacket collection shot with cinematic quality." },
      { type: "video", src: "/assets/NABU_SALE_AD.mp4", poster: "/assets/NABU_SALE_AD.jpg", title: "NABU 2025 Summer Collection", year: 2025, desc: "Engaging promotional content showcasing NABU's latest collection." },
      { type: "image", src: "/assets/Stevie_Pic.JPG", title: "NABU 2023 Spring Collection", year: 2022, desc: "Professional portrait photography showcasing design systems and visual aesthetics." },
      { type: "image", src: "/assets/Digital_Media_Cover.jpg", title: "NABU 2024 Rerelease Promotion", year: 2024, desc: "Promotional campaign showcasing the return of our Persian rug pants, reimagined for 2024.", aspectRatio: "3/4" },
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
    width: 8px; height: 8px;
    background: var(--white);
    border-radius: 50%;
    pointer-events: none;
    transform: translate(-50%,-50%);
    opacity: 0.8;
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
      if (cooldown.current) return;
      // Skip page navigation on work page for mobile/tablet (screen < 1024px)
      if (currentPageRef.current === "work" && window.innerWidth < 1024) return;
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
      if (!hintInteracted.current) {
        hintInteracted.current = true;
        setHintsVisible(false);
      }
      if (cooldown.current) return;
      // Skip page navigation on work page (use buttons only)
      if (currentPageRef.current === "work") return;
      const target = e.target as HTMLElement;
      // Skip if on a scrollable rail or modal grid
      if (target.closest(".ss-rail") || target.closest(".ss-modal-grid")) return;
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

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 640);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <motion.div key="home" {...fade}
      className="ss-home-page"
      style={{ position: "absolute", inset: 0, background: "#060606", overflow: "hidden" }}
    >
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
      <div style={{ position: "absolute", bottom: isMobile ? "18vh" : "36vh", left: "12vw", zIndex: 10, transition: "bottom 0.3s ease" }}>
        <motion.h1
          initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35, ease: [0.16,1,0.3,1] }}
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: isMobile ? "clamp(48px,7vw,72px)" : "clamp(72px,10vw,160px)",
            lineHeight: 0.92, letterSpacing: 4,
            color: "var(--white)",
          }}
        >
          Shyon<br />Shiri
        </motion.h1>

        {!isMobile && (
          <motion.a
            href="/studio.html"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7, ease: [0.16,1,0.3,1] }}
            className="ss-contact-btn"
            style={{
              display: "inline-flex", alignItems: "center", gap: 12,
              marginTop: 32, padding: "16px 34px",
              border: "1px solid rgba(245,242,237,.35)",
              color: "var(--white)", textDecoration: "none",
              fontFamily: "'Space Mono', monospace", fontSize: 12,
              letterSpacing: 4, textTransform: "uppercase", cursor: "none",
            }}
          >
            <span>Explore the Studio</span>
            <span>→</span>
          </motion.a>
        )}
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────
   WORK PAGE
───────────────────────────────────────────────────────────── */
function WorkPage({ onCardClick }: { onCardClick: (p: Project) => void }) {
  const hover = useCursorHover();
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  return (
    <motion.div key="work" {...fade}
      style={{ position: "absolute", inset: 0, background: "#1a1a1a", overflow: "hidden" }}
    >
      {/* Header */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0,
        padding: "60px 8vw 0 5vw",
        zIndex: 10,
        display: "flex", alignItems: "flex-end", justifyContent: "space-between",
      }}>
        <motion.h2
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16,1,0.3,1] }}
          style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(40px,6vw,120px)", letterSpacing: 4, lineHeight: 1, color: "var(--white)" }}
        >
          Work
        </motion.h2>
      </div>

      {/* Grid Layout */}
      <div
        className="ss-grid"
        style={{
          position: "absolute", inset: 0, top: window.innerWidth <= 640 ? 100 : 140,
          display: "grid",
          gridTemplateColumns: isDesktop ? "repeat(3, 1fr)" : window.innerWidth <= 640 ? "1fr" : "repeat(2, 1fr)",
          gap: 20,
          padding: "0 8vw 72px",
          overflowY: "auto",
          overflowX: "hidden",
          scrollbarWidth: "none",
        }}
      >
        {PROJECTS.map((proj, i) => (
          <motion.div
            key={proj.id}
            className={`ss-card ${proj.id === "3d-rendering" ? "ss-3d-rendering" : ""}`}
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 + i * 0.1, ease: [0.16,1,0.3,1] }}
            onClick={() => onCardClick(proj)}
            {...hover}
            style={{
              position: "relative",
              overflow: "hidden",
              background: "#111",
              cursor: "none",
              border: "1px solid transparent",
              transition: "border-color 0.4s ease",
              height: "auto",
            }}
            whileHover={{ borderColor: "var(--sky)" } as any}
          >
            <img
              className="ss-card-img"
              src={proj.img}
              alt={proj.title}
              loading="lazy"
              style={{
                width: "100%", height: "100%",
                objectFit: "cover",
                objectPosition: proj.objectPosition || "center",
                display: "block",
                ...(proj.id === "3d-rendering" && { transform: "scale(1.22)" }),
              }}
            />
            <div
              className="ss-card-overlay"
              style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(to top, rgba(6,6,6,.9) 0%, rgba(6,6,6,.3) 50%, transparent 100%)",
                display: "flex", flexDirection: "column", justifyContent: "flex-end",
                padding: "28px 24px",
              }}
            >
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 28, letterSpacing: 2, color: "var(--white)", lineHeight: 1 }}>
                {proj.title}
              </div>
            </div>
          </motion.div>
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
              I am a graphic designer who specializes in countless mediums ranging through 3D Design, Motion Graphics, UI/UX, Fabrication, Cinematography, Coding, and etc. This variety developed naturally, driven by a lifelong curiosity that started with Lego stop-motion films and never really stopped. What stayed constant through all of it is a perfectionist mindset that I'd describe as both my greatest asset and my most relentless quality. The work isn't done until it's done right, not by anyone else's measure, but by my own.
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
        color: "rgba(245,242,237,.035)", whiteSpace: "nowrap",
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
          width: "90vw", maxWidth: 1300,
          maxHeight: "88dvh",
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
          paddingBottom: 24, borderBottom: "1px solid rgba(245,242,237,.1)",
          marginBottom: 32,
        }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(48px,6vw,96px)", letterSpacing: 3, lineHeight: 1, color: "var(--white)" }}>
              {project.title}
            </div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, color: "var(--sky)", marginTop: 12 }}>
              {project.id === "creative-projects" ? "A selection of projects that demonstrate my range across various creative disciplines and mediums." : project.id === "professional-services" ? "Client-focused work including UI/UX, web development, branding and marketing assets." : project.id === "nabu" ? "Design and creative direction for NABU, a streetwear brand that draws from Persian and Assyrian heritage." : "testing"}
            </div>
          </div>
        </div>

        {/* Horizontal Scroll Rail */}
        <div
          className="ss-modal-grid"
          style={{
            display: "grid",
            gridTemplateColumns: ["creative-projects", "professional-services"].includes(project.id) ? "repeat(auto-fit, minmax(420px, 1fr))" : project.id === "3d-rendering" ? "repeat(3, 300px)" : project.id === "fabrication" ? "repeat(1, 500px)" : ["3d-modelling", "programming"].includes(project.id) ? "repeat(2, 380px)" : "repeat(4, 280px)",
            gap: 56,
            overflowY: "auto",
            overflowX: "hidden",
            maxHeight: "calc(88dvh - 180px)",
            paddingRight: 8,
            justifyContent: "center",
            width: project.id === "creative-projects" ? "100%" : "auto",
            gridAutoRows: "max-content",
          }}
        >
          {project.media.filter(item => !item.hidden).map((item, i) => (
            <ModalTile key={i} item={item} onClick={() => onMediaClick(item)} />
          ))}
        </div>

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
        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 14, color: "var(--white)" }}>{item.title}</div>
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
  
  // Build carousel: current item + related items in sequence
  const carouselItems: MediaItem[] = [item];
  if (item.relatedItems && item.relatedItems.length > 0) {
    item.relatedItems.forEach(relatedTitle => {
      const relatedItem = PROJECTS.flatMap(p => p.media).find(m => m.title === relatedTitle);
      if (relatedItem) carouselItems.push(relatedItem);
    });
  }
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const displayedItem = carouselItems[currentIndex];

  const goToNext = () => {
    setCurrentIndex((currentIndex + 1) % carouselItems.length);
  };

  const goToPrev = () => {
    setCurrentIndex((currentIndex - 1 + carouselItems.length) % carouselItems.length);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goToNext();
      if (e.key === "ArrowLeft") goToPrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex, carouselItems.length]);

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

          {/* Navigation Button - Only show if there are related items (but not for Airpod/iPhone cases or Apple Accessories) */}
          {carouselItems.length > 1 && !(item.title === "Custom Airpod Case" || item.title === "Custom Phone Case" || item.title === "Apple Accessory Prototypes") && (
            <div style={{ display: "flex", gap: 8, alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, color: "var(--mid)", letterSpacing: 1 }}>
                {currentIndex + 1} / {carouselItems.length}
              </div>
              <div style={{ display: "flex", gap: 6, flex: 1 }}>
                <button
                  onClick={goToPrev}
                  style={{
                    flex: 1,
                    padding: "8px 12px",
                    fontFamily: "'Space Mono', monospace", fontSize: 9,
                    letterSpacing: 1, textTransform: "uppercase",
                    color: "var(--white)",
                    border: "1px solid rgba(245,242,237,.3)",
                    background: "rgba(245,242,237,.05)",
                    borderRadius: 2,
                    cursor: "none",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "rgba(245,242,237,.6)";
                    e.currentTarget.style.background = "rgba(245,242,237,.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(245,242,237,.3)";
                    e.currentTarget.style.background = "rgba(245,242,237,.05)";
                  }}
                  {...hover}
                >
                  ← Prev
                </button>
                <button
                  onClick={goToNext}
                  style={{
                    flex: 1,
                    padding: "8px 12px",
                    fontFamily: "'Space Mono', monospace", fontSize: 9,
                    letterSpacing: 1, textTransform: "uppercase",
                    color: "var(--white)",
                    border: "1px solid rgba(245,242,237,.3)",
                    background: "rgba(245,242,237,.05)",
                    borderRadius: 2,
                    cursor: "none",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "rgba(245,242,237,.6)";
                    e.currentTarget.style.background = "rgba(245,242,237,.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(245,242,237,.3)";
                    e.currentTarget.style.background = "rgba(245,242,237,.05)";
                  }}
                  {...hover}
                >
                  Next →
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Info */}
        <div style={{ flex: 1, minWidth: 200, maxWidth: 340, paddingTop: 140 }}>
          <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 64, letterSpacing: 2, lineHeight: 1, color: "var(--white)", marginBottom: 24 }}>
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
