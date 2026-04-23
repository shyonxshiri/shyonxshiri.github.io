import * as React from "react";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, User, Mail, Linkedin, FileText, ChevronLeft, ChevronRight } from "lucide-react";
import CubeTab from "./CubeTab";
import { useInitialPreload } from "./useAssetPreloader";

// --- Haptic Feedback Utility ---------------------------------------------------------------
const triggerHaptic = (intensity: "light" | "medium" | "heavy" = "medium") => {
  if (typeof navigator !== "undefined" && "vibrate" in navigator) {
    const patterns: { [key: string]: number } = {
      light: 10,
      medium: 30,
      heavy: 50,
    };
    navigator.vibrate(patterns[intensity]);
  }
};

// --- Gesture Detection Hook ---------------------------------------------------------------
const useSwipeGesture = (onSwipeUp?: () => void, onSwipeDown?: () => void, onSwipeLeft?: () => void, onSwipeRight?: () => void) => {
  const touchStartRef = useRef({ x: 0, y: 0 });
  
  const handleTouchStart = (e: TouchEvent) => {
    touchStartRef.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    };
  };
  
  const handleTouchEnd = (e: TouchEvent) => {
    const touchEnd = {
      x: e.changedTouches[0].clientX,
      y: e.changedTouches[0].clientY,
    };
    
    const deltaX = touchEnd.x - touchStartRef.current.x;
    const deltaY = touchEnd.y - touchStartRef.current.y;
    const threshold = 50;
    
    if (Math.abs(deltaY) > threshold && Math.abs(deltaY) > Math.abs(deltaX)) {
      if (deltaY > 0 && onSwipeUp) {
        onSwipeUp();
      } else if (deltaY < 0 && onSwipeDown) {
        onSwipeDown();
      }
    } else if (Math.abs(deltaX) > threshold) {
      if (deltaX > 0 && onSwipeLeft) {
        onSwipeLeft();
      } else if (deltaX < 0 && onSwipeRight) {
        onSwipeRight();
      }
    }
  };
  
  return { handleTouchStart, handleTouchEnd };
};

// --- Device Optimization Hook ---------------------------------------------------------------
const useDeviceOptimizations = () => {
  useEffect(() => {
    const touchHandler = (e: TouchEvent) => {
      if (e.touches.length > 1) {
        e.preventDefault();
      }
    };
    
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      document.documentElement.style.scrollBehavior = "auto";
    }
    
    document.addEventListener("touchmove", touchHandler, { passive: true });
    
    return () => {
      document.removeEventListener("touchmove", touchHandler);
    };
  }, []);
};

// --- Device Type Detection Hook ---------------------------------------------------------------
const useDeviceType = () => {
  const [device, setDevice] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');
  
  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;
      if (width < 640) setDevice('mobile');
      else if (width < 1024) setDevice('tablet');
      else setDevice('desktop');
    };
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);
  
  return device;
};

// --- Config ---------------------------------------------------------------

const DIGITAL_MEDIA = [
  {
    id: "3d-modeling",
    title: "3D Rendering",
    tag: "Design & Printing",
    img: "/assets/3D_Modeling_Cover.PNG",
    objectPosition: "45% 50%",
    scale: 1.25,
    description:
      "Concept driven 3D visuals created entirely using Blender.",
  },
  {
    id: "digital-media",
    title: "Digital Media",
    tag: "Graphic Design",
    img: "/assets/Digital_Media_Cover.jpg",
    objectPosition: "50% 50%",
    description: "Motion graphics and design work ranging from promotional videos to UI/UX web development.",
  },
  {
    id: "camera-work",
    title: "Camera Work",
    tag: "Video & Photo Production",
    img: "/assets/Camera_Work_Cover.JPG",
    objectPosition: "50% 50%",
    description:
      "A collection of my camera based projects, each focused on their specific atmosphere and story.",
  },
];

const MODELING_MEDIA: MediaItem[] = [
  {
    type: "video",
    src: "/assets/Broken_NPC.MP4",
    poster: "/assets/Broken_NPC.jpg",
    title: "The Broken NPC",
    description: "A detailed 3D scene depicting in-game rendering errors and glitches from the video game, GTA San Andreas, created and rendered entirely using Blender.",
    aspectRatio: 16 / 9,
    year: 2024,
  },
  {
    type: "video",
    src: "/assets/Blender_Case_Video.mov",
    poster: "/assets/Blender_Case.jpg",
    title: "Apple Accessory Prototypes",
    description: "3D designed Apple product case prototypes, developed using Blender.",
    aspectRatio: 16 / 9,
    year: 2024,
    relatedLinks: [
      { category: "MODELS_MEDIA", index: 0, title: "Airpod Case" },
      { category: "MODELS_MEDIA", index: 1, title: "iPhone Case" }
    ]
  },
  {
    type: "image",
    src: "/assets/Venom.PNG",
    title: "Rendered 3D Model",
    description: "A high-quality 3D rendered movie character model showcasing detailed modeling and texturing techniques made using Blender",
    year: 2024,
  },
];

const GRAPHIC_MEDIA: MediaItem[] = [
  {
    type: "video",
    src: "/assets/Nabu_Poster_Banner.mp4",
    poster: "/assets/Nabu_Poster_Banner.jpg",
    title: "NABU Promotional Video",
    description: "A dynamic promotional video for NABU clothing, crafted with professional animation and transitions in Adobe After Effects.",
    year: 2023,
  },
  {
    type: "video",
    src: "/assets/Shiri_Video_Game.mov",
    poster: "/assets/Shiri_VIdeo_Game.jpg",
    title: "Video Game Demo",
    description: "A video created by animating and assembling a collection of images in Adobe After Effects.",
    year: 2024,
  },
  {
    type: "image",
    src: "/assets/Mina_Website.png",
    title: "UI/UX",
    description: "Full-stack website design and development including React frontend, responsive interface design, backend integration, and deployment optimization.",
    year: 2025,
    link: "https://minasech.net"
  },
  {
    type: "image",
    src: "/assets/Everly_Cover_Image.png",
    title: "Everly Care Home",
    description: "Professional website design for a compassionate living community providing senior care services.",
    year: 2025,
    link: "https://everlycarehome.com"
  },
];

const SHIRI_DESIGNS: MediaItem[] = [
  { type: "image", src: "/assets/Shiri_Design_1.PNG", title: "Clothing Line Mock Up", year: 2024 },
  { type: "image", src: "/assets/Shiri_Design_2.PNG", title: "Clothing Line Mock Up", year: 2024 },
  { type: "image", src: "/assets/Shiri_Design_3.PNG", title: "Clothing Line Mock Up", year: 2024 },
  { type: "image", src: "/assets/Shiri_Design_4.PNG", title: "Clothing Line Mock Up", year: 2024 },
];

const CAMERA_MEDIA: MediaItem[] = [
  {
    type: "video",
    src: "/assets/NABU_PUFFER_AD.mp4",
    poster: "/assets/NABU_Puffer_AD.jpg",
    title: "NABU 2026 Teaser",
    description: "Professional promotional video for NABU's puffer jacket collection, shot and edited with cinematic quality.",
    aspectRatio: 9 / 16,
    year: 2025,
  },
  {
    type: "video",
    src: "/assets/NABU_SALE_AD.mp4",
    poster: "/assets/NABU_SALE_AD.jpg",
    title: "NABU 2025 Summer Collection",
    description: "Engaging promotional content showcasing NABU's latest collection and seasonal offerings.",
    aspectRatio: 9 / 16,
    year: 2025,
  },
  {
    type: "image",
    src: "/assets/Stevie_Pic.JPG",
    title: "NABU 2023 Spring Collection",
    description: "Professional portrait photography showcasing design systems and visual aesthetics.",
    year: 2022,
  },
  {
    type: "image",
    src: "/assets/Adverstisement_Project.jpg",
    title: "Campaign Project",
    description: "A conceptual brand advertisement utilizing environmental storytelling and scenic composition to promote a product.",
    year: 2024,
  },
  {
    type: "image",
    src: "/assets/Photography_Asset.jpg",
    title: "Abstract Scene",
    description: "An experimental scene exploring the interplay of form and shadow, creating an ethereal moment.",
    year: 2021,
  },
  {
    type: "image",
    src: "/assets/Photography_Asset_2.jpg",
    title: "Culinary Praise",
    description: "A display of Iran's iconic dish, presented with thoughtful composition and rich visual detail.",
    year: 2021,
  },
  {
    type: "image",
    src: "/assets/Max_Pic.JPG",
    title: "Candid Studio Portrait",
    description: "A vibrant portrait capturing authentic moments and natural expressions with professional lighting.",
    year: 2024,
  },
];

type MediaItem = {
  type: "image" | "video";
  src: string;
  alt?: string;
  link?: string;
  title?: string;
  poster?: string;
  description?: string;
  aspectRatio?: number;
  objectPosition?: string;
  scale?: number;
  relatedImages?: { src: string; title: string }[];
  relatedLinks?: { category: string; index: number; title: string }[];
  year?: number;
};

const PROGRAMMING_MEDIA: MediaItem[] = [
  { 
    type: "video", 
    src: "/assets/New_Radar_Sensor.mp4", 
    title: "HMI Sensor System", 
    description: "For my final project in <i>Topics in Human-Machine Interfaces</i>, I developed an interactive radar module that converts ultrasonic data into real-time feedback. As part of our rubric, I configured the micro-board to maintain a steady 5V power output to support the simultaneous load of the sensor, LCD, and speaker. This build focuses on human-machine interactivity, using a digital display, a sensor, and a speaker to communicate distance. All placed in a custom 3D printed enclosure.", 
    poster: "/assets/New_Radar_Sensor_front.jpg", 
    aspectRatio: 9 / 16,
    year: 2024,
    relatedImages: [
      { src: "/assets/New_Radar_Sensor_front.jpg", title: "Front View" },
      { src: "/assets/New_Radar_Sensor_Back.jpg", title: "Back View" }
    ]
  },
  { 
    type: "video", 
    src: "/assets/New_LED_Box.mp4", 
    title: "Custom RGB Controller", 
    description: "This project served as a practical test of what we learned in my <i>Topics in Human-Machine Interfaces</i> class. The goal was to demonstrate a solid understanding of the course material by building a functional system from scratch. I was thorough with meeting the technical requirements for the micro-board's power ratios and wire placement, then designing and 3D printing a geometric casing to function as housing for it all.", 
    poster: "/assets/New_LED_Box_Front.jpg", 
    aspectRatio: 9 / 16,
    year: 2024,
    relatedImages: [
      { src: "/assets/New_LED_Box_Front.jpg", title: "Front View" },
      { src: "/assets/New_LED_Box_Back.jpg", title: "Back View" }
    ]
  }, 
];

const SCULPTURES_MEDIA: MediaItem[] = [
  { type: "image", src: "/assets/Shyon_Sculpture.jpg", title: "Product, not Consumer", description: "Hand-fabricated through metalworking techniques — welding, grinding, sanding, and surface finishing — this steel sculpture references consumer tech culture by evoking an Apple Store-style display with a metal hand and cuff, symbolizing the chokehold and sense of confinement technology can impose on people.", aspectRatio: 4 / 5, year: 2024 },
  { type: "image", src: "/assets/Shyon_Glass.JPG", title: "Custom Designed Vase", description: "A custom-designed glass vase combining artistic form with functional design, showcasing craftsmanship.", aspectRatio: 4 / 5, year: 2024 },
];

const MODELS_MEDIA: MediaItem[] = [
  { type: "image", src: "/assets/Airpod_Case.JPG", title: "Custom Airpod Case", description: "A finalized rendition of my Airpod case prototype, designed to resemble the style of liquid metal.", objectPosition: "center 50%", aspectRatio: 1 / 1.2, year: 2026, relatedLinks: [{ category: "MODELING_MEDIA", index: 1, title: "Case Prototype Video" }] },
  { type: "image", src: "/assets/My_Case.jpg", title: "Custom Phone Case", description: "A finalized rendition of my iPhone case prototype, designed to resemble the style of liquid metal.", objectPosition: "center 0%", year: 2025, relatedLinks: [{ category: "MODELING_MEDIA", index: 1, title: "Case Prototype Video" }] },
];

const FABRICATION_MEDIA: Record<string, MediaItem[]> = {
  Programming: PROGRAMMING_MEDIA,
  Fabrication: SCULPTURES_MEDIA,
  "3D Modelling": MODELS_MEDIA,
};

const HANDMADE_WORKS = [
  {
    title: "Programming",
    img: "/assets/Programming_Cover_Pic.jpg",
    description: "Hardware focused interactive work using microcontrollers and sensors.",
    objectPosition: "center 70%",
  },
  {
    title: "Fabrication",
    img: "/assets/Shyon_Sculpture.jpg",
    description: "Handmade sculptures exploring form, balance, and physical interaction.",
    objectPosition: "center 45%",
  },
  {
    title: "3D Modelling",
    img: "/assets/3D_Models_Cover_Pic.jpg",
    description: "3D models designed for printing, functionality, and aesthetics.",
    objectPosition: "45% 100%",
    scale: 1.25,
  },
];

const PORTRAIT_IMAGES = [
  {
    src: "/assets/Shyon_Pic_2.JPG",
    alt: "Portrait",
    frame: "60% 40% 50% 50% / 65% 35% 55% 45%",
  },
];

// --- ShimmerButton Component -----------------------------------------------

function ShimmerButton({ onClick, icon }: { onClick: () => void; icon: React.ReactNode }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isTouching, setIsTouching] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    setMousePos({ x: ((e.clientX - rect.left) / rect.width) * 100, y: ((e.clientY - rect.top) / rect.height) * 100 });
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLButtonElement>) => {
    setIsTouching(true);
    triggerHaptic("light");
    if (!buttonRef.current) return;
    const touch = e.touches[0];
    const rect = buttonRef.current.getBoundingClientRect();
    setMousePos({ x: ((touch.clientX - rect.left) / rect.width) * 100, y: ((touch.clientY - rect.top) / rect.height) * 100 });
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;
    const touch = e.touches[0];
    const rect = buttonRef.current.getBoundingClientRect();
    setMousePos({ x: ((touch.clientX - rect.left) / rect.width) * 100, y: ((touch.clientY - rect.top) / rect.height) * 100 });
  };

  const showGradient = isHovering || isTouching;

  return (
    <motion.button
      ref={buttonRef}
      onClick={() => { triggerHaptic("medium"); onClick(); }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={() => setIsTouching(false)}
      className="shimmer-button group relative w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-white/15 via-white/10 to-white/15 border border-white/25 shadow-[0_8px_30px_rgba(0,180,255,0.15)] backdrop-blur-2xl flex items-center justify-center text-white focus:outline-none focus:ring-2 focus:ring-sky-400 transition-all overflow-hidden active:ring-2 active:ring-sky-300"
      whileHover={{ scale: 1.12 }}
      whileTap={{ scale: 0.94 }}
    >
      <span className="absolute -inset-1 rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.45),transparent_55%)] opacity-70" />
      <span
        className={`absolute inset-0 rounded-full transition-opacity duration-150 ${showGradient ? 'opacity-100' : 'opacity-0'}`}
        style={{ background: showGradient ? `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(125,211,252,0.6), transparent 55%)` : `radial-gradient(circle at 60% 20%, rgba(125,211,252,0.6), transparent 55%)` }}
      />
      <span className={`absolute inset-0 rounded-full ring-1 transition-colors duration-150 ${showGradient ? 'ring-sky-200/40' : 'ring-white/20'}`} />
      <div className="relative z-10">{icon}</div>
    </motion.button>
  );
}

// --- PageNavigation Component -----------------------------------------------

interface PageNavProps {
  direction: "next" | "prev";
  pageName: string;
  onClick: () => void;
}

function PageNavigation({ direction, pageName, onClick }: PageNavProps) {
  const isNext = direction === "next";
  return (
    <motion.button
      onClick={() => { triggerHaptic("light"); onClick(); }}
      className="cursor-pointer outline-none transition-all focus:outline-none border-none bg-transparent"
      style={{ WebkitTapHighlightColor: "transparent", WebkitAppearance: "none", appearance: "none" }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <h3 className="font-[KiwiSoda] text-lg md:text-xl font-normal bounce-text-dark flex items-center gap-2 whitespace-nowrap px-4 py-2 rounded transition-colors hover:text-sky-400" style={{ color: "#1a1a1a" }}>
        {!isNext && "← "}{pageName}{isNext && " →"}
      </h3>
    </motion.button>
  );
}

// --- Root Component --------------------------------------------------------

const PAGE_ORDER = ["home", "work", "about", "contact"] as const;

export default function PortfolioUniqueNav() {
  const [currentPage, setCurrentPage] = useState<"home" | "work" | "about" | "contact">("home");
  const [direction, setDirection] = useState<"forward" | "backward">("forward");
  const [prevPage, setPrevPage] = useState<"home" | "work" | "about" | "contact">("home");
  const [particles, setParticles] = useState<Array<{
    id: number; size: number; duration: number; delay: number; startX: number; startY: number;
    seedOpacity: number; seedScale: number; seedX: number; seedY: number;
    driftX1: number; driftY1: number; driftX2: number; driftY2: number;
  }> | null>(null);
  const device = useDeviceType();
  const isScrollingRef = useRef(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const currentPageRef = useRef(currentPage);
  const mainDivRef = useRef<HTMLDivElement>(null);
  const pageOrder = PAGE_ORDER;

  // Generate particles once on mount
  useEffect(() => {
    if (particles === null) {
      const particleCount = typeof window !== "undefined" && window.innerWidth < 768 ? 60 : 80;
      const newParticles = [...Array(particleCount)].map((_, i) => ({
        id: i,
        size: Math.random() * 6 + 2,
        duration: Math.random() * 3 + 3,
        delay: 0,
        startX: Math.random() * 100,
        startY: Math.random() * 100,
        seedOpacity: Math.random() * 0.5 + 0.2,
        seedScale: Math.random() * 0.25 + 0.9,
        seedX: (Math.random() * 2 - 1) * 20,
        seedY: (Math.random() * 2 - 1) * 20,
        driftX1: (Math.random() * 2 - 1) * 40,
        driftY1: (Math.random() * 2 - 1) * 40,
        driftX2: (Math.random() * 2 - 1) * 40,
        driftY2: (Math.random() * 2 - 1) * 40,
      }));
      setParticles(newParticles);
    }
  }, [particles]);

  // Keep currentPageRef in sync
  useEffect(() => {
    currentPageRef.current = currentPage;
    if (prevPage === "work" && currentPage === "home") {
      const timer = setTimeout(() => { setPrevPage(currentPageRef.current); }, 600);
      return () => clearTimeout(timer);
    } else {
      setPrevPage(currentPageRef.current);
    }
  }, [currentPage, prevPage]);

  useDeviceOptimizations();
  useInitialPreload();

  // Force dark mode + inject global styles once on mount
  useEffect(() => {
    document.documentElement.classList.add("dark");

    const style = document.createElement('style');
    style.id = 'portfolio-global-styles';
    style.innerHTML = `
      /* ─── Kill ALL scrollbars ─── */
      *, *::before, *::after { box-sizing: border-box; }
      html, body {
        margin: 0; padding: 0;
        overflow: hidden;
        overscroll-behavior: none;
        -webkit-overflow-scrolling: touch;
      }
      html::-webkit-scrollbar,
      body::-webkit-scrollbar,
      div::-webkit-scrollbar { display: none; }
      html, body { scrollbar-width: none; -ms-overflow-style: none; }

      /* ─── Safari full-height fix ─── */
      /* 100dvh respects the collapsing browser chrome on iOS Safari */
      .portfolio-root {
        position: fixed;
        inset: 0;
        width: 100%;
        /* Fallback for browsers without dvh support */
        height: 100vh;
        /* Dynamic viewport height — fills the VISIBLE area even when Safari toolbar shrinks */
        height: 100dvh;
        overflow: hidden;
      }
      .portfolio-page {
        position: fixed;
        inset: 0;
        width: 100%;
        height: 100vh;
        height: 100dvh;
        overflow: hidden;
      }
    `;
    if (!document.getElementById('portfolio-global-styles')) {
      document.head.appendChild(style);
    }
  }, []);

  // Scroll lock only for about/contact (they don't scroll internally)
  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
  }, [currentPage]);

  const navigateTo = (page: "home" | "work" | "about" | "contact") => {
    const currentIndex = pageOrder.indexOf(currentPage);
    const nextIndex = pageOrder.indexOf(page);
    setDirection(nextIndex > currentIndex ? "forward" : "backward");
    setCurrentPage(page);
  };

  const { handleTouchStart, handleTouchEnd } = useSwipeGesture(
    () => {
      if (device === "mobile" || device === "tablet") {
        const currentIndex = pageOrder.findIndex(page => page === currentPageRef.current);
        if (currentIndex > 0) {
          isScrollingRef.current = true;
          setDirection("backward");
          setCurrentPage(pageOrder[currentIndex - 1]);
          if (timeoutRef.current) clearTimeout(timeoutRef.current);
          timeoutRef.current = setTimeout(() => { isScrollingRef.current = false; }, 1500);
        }
      }
    },
    () => {
      if (device === "mobile" || device === "tablet") {
        const currentIndex = pageOrder.findIndex(page => page === currentPageRef.current);
        if (currentIndex < pageOrder.length - 1) {
          isScrollingRef.current = true;
          setDirection("forward");
          setCurrentPage(pageOrder[currentIndex + 1]);
          if (timeoutRef.current) clearTimeout(timeoutRef.current);
          timeoutRef.current = setTimeout(() => { isScrollingRef.current = false; }, 1500);
        }
      }
    }
  );

  // ── Per-page particle config ──────────────────────────────────────────────
  const isHome = currentPage === "home";
  const isDark = currentPage === "work";
  const particleColor = isDark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,1)";

  // Returns true when a particle at (px%, py%) should render for the current page
  const isParticleVisible = (px: number, py: number): boolean => {
    if (currentPage === "home") return false;
    // Work: block top 28% so particles don't float over the title + carousel tab
    if (currentPage === "work" && py < 28) return false;
    // About: block right 52% so particles stay off the portrait photo column
    if (currentPage === "about" && px > 48) return false;
    return true;
  };

  const getParticleOpacity = (seedOpacity: number): number => {
    if (currentPage === "about" || currentPage === "contact") return 0.22;
    return seedOpacity;
  };

  return (
    <motion.div
      ref={mainDivRef}
      className="portfolio-root"
      animate={{
        backgroundColor:
          (prevPage === "work" && currentPage === "home") ? "#000000"
          : currentPage === "home" && prevPage === "home" ? "transparent"
          : currentPage === "work" ? "#0f172a"
          : "#ffffff"
      }}
      transition={{
        duration: (prevPage === "work" && currentPage === "home") ? 0.6 : 0.3,
        ease: "easeInOut"
      }}
      onWheel={(e) => {
        e.preventDefault();
        if (isScrollingRef.current) return;
        if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
        const currentIndex = pageOrder.findIndex(page => page === currentPageRef.current);
        if (e.deltaY > 0 && currentIndex < pageOrder.length - 1) {
          isScrollingRef.current = true;
          setDirection("forward");
          setCurrentPage(pageOrder[currentIndex + 1]);
          if (timeoutRef.current) clearTimeout(timeoutRef.current);
          timeoutRef.current = setTimeout(() => { isScrollingRef.current = false; }, 1500);
        } else if (e.deltaY < 0 && currentIndex > 0) {
          isScrollingRef.current = true;
          setDirection("backward");
          setCurrentPage(pageOrder[currentIndex - 1]);
          if (timeoutRef.current) clearTimeout(timeoutRef.current);
          timeoutRef.current = setTimeout(() => { isScrollingRef.current = false; }, 1500);
        }
      }}
      onTouchStart={(e) => { if (device !== "desktop") handleTouchStart(e.nativeEvent); }}
      onTouchEnd={(e) => { if (device !== "desktop") handleTouchEnd(e.nativeEvent); }}
      style={{ color: "inherit" }}
    >
      {/* ── Dust Particles ───────────────────────────────────────────────────
          Hidden on home. Instant opacity on page enter (no delay).
          Per-page zone exclusions:
            work    → blocked from top 28% (title + carousel area)
            about   → blocked from right 52% (portrait photo column)
            contact → full screen
      ────────────────────────────────────────────────────────────────────── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 10 }}>
        {!isHome && particles?.map((particle) => {
          if (!isParticleVisible(particle.startX, particle.startY)) return null;
          const opacity = getParticleOpacity(particle.seedOpacity);
          return (
            <motion.div
              key={`${particle.id}-${currentPage}`}
              className="absolute rounded-full"
              style={{
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                background: particleColor,
                left: `${particle.startX}%`,
                top: `${particle.startY}%`,
                filter: "blur(2px)",
              }}
              initial={{ opacity: 0, x: particle.seedX, y: particle.seedY, scale: particle.seedScale }}
              animate={{
                opacity: opacity,
                x: [particle.seedX, particle.seedX + particle.driftX1, particle.seedX + particle.driftX2, particle.seedX],
                y: [particle.seedY, particle.seedY + particle.driftY1, particle.seedY + particle.driftY2, particle.seedY],
                scale: [particle.seedScale, 1.08, 0.9, particle.seedScale],
              }}
              transition={{
                opacity: { duration: 0.3, ease: "easeIn" },
                x: { duration: particle.duration, ease: "easeInOut", repeat: Infinity, delay: 0, times: [0, 0.45, 1] },
                y: { duration: particle.duration, ease: "easeInOut", repeat: Infinity, delay: 0, times: [0, 0.45, 1] },
                scale: { duration: particle.duration, ease: "easeInOut", repeat: Infinity, delay: 0, times: [0, 0.45, 1] },
              }}
            />
          );
        })}
      </div>

      {/* ── Main content — simple opacity fade, no translate ── */}
      <main className="fixed inset-0 overflow-hidden" style={{ zIndex: 20, width: "100%", height: "100dvh" }}>
        <AnimatePresence mode="wait">
          {currentPage === "home" && <Hero key="home" setPage={navigateTo} />}
          {currentPage === "work" && <Work key="work" setPage={navigateTo} />}
          {currentPage === "about" && <About key="about" setPage={navigateTo} />}
          {currentPage === "contact" && <Contact key="contact" setPage={navigateTo} />}
        </AnimatePresence>
      </main>
    </motion.div>
  );
}

// --- Sections --------------------------------------------------------------

function Section({ id, children, active = true }: { id: string; children: React.ReactNode; active?: boolean }) {
  return (
    <section id={id} className="relative py-24 scroll-mt-32 overflow-hidden">
      <div className="absolute inset-0 max-w-6xl mx-auto">
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 blur-3xl"
          animate={{ opacity: active ? 0.4 : 0.1, scale: active ? 1 : 0.95 }}
          transition={{ type: "spring", stiffness: 80, damping: 20 }}
          style={{
            background:
              "radial-gradient(400px 300px at 30% 40%, rgba(14,165,233,.15), transparent)," +
              "radial-gradient(400px 300px at 70% 60%, rgba(34,211,238,.10), transparent)",
          }}
        />
      </div>
      <div className="relative max-w-6xl mx-auto h-full grid place-items-center px-4">{children}</div>
    </section>
  );
}

// ─── FADE TRANSITION VARIANTS (no translate — content stays in place) ─────
const pageFadeVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit:    { opacity: 0 },
};

// ─── Hero ─────────────────────────────────────────────────────────────────

function Hero({ setPage }: { setPage: (page: "home" | "work" | "about" | "contact") => void }) {
  const [windowWidth, setWindowWidth] = React.useState(() =>
    typeof window !== "undefined" ? window.innerWidth : 1024
  );

  React.useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getObjectPosition = () => {
    if (windowWidth >= 1024) return "center 5%";      // desktop: standard crop
    if (windowWidth >= 640)  return "65% 20%";        // tablet: shift right, crop top
    return "85% 50%";                                  // mobile: right side zoomed in
  };

  const getTitleLeftPosition = () => {
    if (windowWidth >= 1024) return "20%";
    const progress = Math.max(0, (1024 - windowWidth) / (1024 - 320));
    return `${Math.max(1, 20 - progress * 22)}%`;
  };

  React.useEffect(() => {
    const img = new Image();
    img.src = '/assets/IMG_2282.JPG';
  }, []);

  return (
    <motion.div
      key="hero"
      variants={pageFadeVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.55 }}
      className="portfolio-page flex items-center relative overflow-hidden"
      style={{
        backgroundColor: "#0f172a",
      }}
    >
      {/* Background Image using img element for better control */}
      <img
        src="/assets/IMG_2282.JPG"
        alt="Hero background"
        className="absolute inset-0 w-full h-full"
        style={{
          objectFit: "cover",
          objectPosition: getObjectPosition(),
          zIndex: 1,
        }}
      />

      <div
        className="absolute z-30 top-1/2 md:top-[47%] -translate-y-1/2 flex flex-col items-start md:items-center justify-center gap-4 sm:gap-6 w-auto"
        style={{ left: getTitleLeftPosition() }}
      >
        <motion.h1
          layout
          className="font-[KiwiSoda] font-normal leading-tight bounce-text text-center"
          style={{ color: "#1a1a1a" }}
        >
          <span className="block text-5xl sm:text-5xl md:text-7xl lg:text-8xl">Shyon Shiri</span>
          <span className="block mt-2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-cyan-400 bounce-text">
            Graphic Designer
          </span>
        </motion.h1>
      </div>
    </motion.div>
  );
}

// ─── AutoAspectTile ────────────────────────────────────────────────────────

function AutoAspectTile({ item, onMediaClick }: { item: MediaItem; onMediaClick?: (item: MediaItem) => void }) {
  const [ratio, setRatio] = React.useState<number | null>(item.aspectRatio ?? null);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const setSafeRatio = (w: number, h: number) => {
    if (!w || !h) return;
    const r = w / h;
    if (Number.isFinite(r) && r > 0) setRatio(r);
  };

  const Wrapper = item.link && !onMediaClick ? "a" : "div";
  const shouldDisableLink = onMediaClick && item.link;

  return (
    <motion.article
      ref={containerRef}
      className={`group relative rounded-3xl overflow-hidden cursor-pointer ${onMediaClick ? "bg-transparent backdrop-filter-none" : ""}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      onClick={() => onMediaClick?.(item)}
      style={onMediaClick ? { background: "transparent", backdropFilter: "none" } : undefined}
    >
      <Wrapper
        {...(!shouldDisableLink && item.link && !onMediaClick ? { href: item.link, target: "_blank", rel: "noopener noreferrer" } : {})}
        className={`block w-full h-full ${onMediaClick ? "bg-transparent" : ""}`}
        style={onMediaClick ? { background: "transparent" } : undefined}
      >
        <div className="w-full bg-transparent" style={{ aspectRatio: ratio ?? 16 / 9 }}>
          {item.type === "image" ? (
            <img
              src={item.src}
              alt={item.alt ?? ""}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
              style={{ objectPosition: item.objectPosition ?? "center", transform: item.scale ? `scale(${item.scale})` : "scale(1)", transformOrigin: item.objectPosition ?? "center" }}
              onLoad={(e) => { const img = e.currentTarget; if (!item.aspectRatio) setSafeRatio(img.naturalWidth, img.naturalHeight); }}
            />
          ) : (
            <div className="relative w-full h-full bg-black/40">
              <img
                src={item.poster}
                alt={item.title ?? ""}
                className="w-full h-full object-cover"
                style={{ objectPosition: "center" }}
                onLoad={(e) => { const img = e.currentTarget; setSafeRatio(img.naturalWidth, img.naturalHeight); }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-black/60 backdrop-blur flex items-center justify-center transition-transform group-hover:scale-110">
                  <svg className="w-7 h-7 text-white ml-1" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
                </div>
              </div>
            </div>
          )}
        </div>
      </Wrapper>
    </motion.article>
  );
}

// ─── MediaModal ────────────────────────────────────────────────────────────

function MediaModal({ item, onClose, onNavigate }: { item: MediaItem; onClose: () => void; onNavigate?: (category: string, index: number) => void }) {
  const device = useDeviceType();
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);

  const allMedia = [
    { type: item.type, src: item.src, title: item.title ?? "Media" },
    ...(item.relatedImages?.map((img) => ({ type: "image" as const, src: img.src, title: img.title })) ?? []),
  ];

  const aspectRatio = item.aspectRatio || 1;
  let baseWidth = 500;
  let baseHeight = baseWidth / aspectRatio;
  if (aspectRatio < 0.8) { baseWidth = 480; baseHeight = baseWidth / aspectRatio; }
  const maxAvailableWidth = window.innerWidth * 0.55;
  const maxAvailableHeight = window.innerHeight * 0.65;
  let finalWidth = baseWidth;
  let finalHeight = baseHeight;
  if (baseWidth > maxAvailableWidth) { finalWidth = maxAvailableWidth; finalHeight = finalWidth / aspectRatio; }
  if (baseHeight > maxAvailableHeight) { finalHeight = maxAvailableHeight; finalWidth = finalHeight * aspectRatio; }

  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    const handleEscape = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handleEscape);
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  const currentMedia = allMedia[currentMediaIndex];

  return (
    <motion.div
      className="fixed bg-black/40 backdrop-blur-md pointer-events-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      style={{ position: "fixed", inset: 0, zIndex: 99999, display: "flex", alignItems: "center", justifyContent: "center", overflow: "auto", width: "100vw", height: "100vh" }}
    >
      <motion.div
        className="relative w-11/12 max-w-6xl flex flex-col lg:flex-row items-center justify-center lg:items-center"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        onClick={(e) => e.stopPropagation()}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          maxHeight: "calc(100vh - 10rem)",
          flexDirection: window.innerWidth < 1024 ? "column" : "row",
          paddingTop: window.innerWidth < 768 ? "6rem" : "4rem",
          paddingBottom: "4rem",
          boxSizing: "border-box",
          background: "transparent",
        }}
      >
        <button onClick={onClose} className="absolute top-12 right-0 z-20 w-10 h-10 rounded-full flex items-center justify-center text-white transition hover:scale-110">
          <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
        </button>

        <div className="flex flex-col justify-center items-start flex-shrink-0 w-full lg:w-1/3" style={{ paddingLeft: "1rem", paddingRight: "0", maxHeight: "100%", overflow: "hidden" }}>
          {item.title && (
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2 leading-tight break-words">
                {item.title === "Product, not Consumer" ? <span className="italic">{item.title}</span> : item.title}
              </h2>
              {item.year && <p className="text-sm text-white/60 mb-3">{item.year}</p>}
            </div>
          )}
          {item.description && item.title !== "Clothing Line Mock Up" && (
            <p className="text-base sm:text-lg text-white/90 leading-relaxed" dangerouslySetInnerHTML={{ __html: item.description }} />
          )}
        </div>

        <div className="flex items-center justify-center flex-shrink-0 w-full lg:flex-1" style={{ width: window.innerWidth < 1024 ? "100%" : "auto", height: window.innerWidth < 1024 ? "auto" : finalHeight, minHeight: 0, minWidth: 0, maxWidth: "100%", paddingRight: "1rem" }}>
          {currentMedia.type === "image" ? (
            <motion.img key={currentMediaIndex} src={currentMedia.src} alt={currentMedia.title} className="max-w-full max-h-full object-contain rounded-3xl" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ maxHeight: window.innerWidth < 1024 ? "35vh" : "100%" }} />
          ) : (
            <video key={currentMediaIndex} src={currentMedia.src} poster={item.poster} controls className="max-w-full max-h-full object-contain rounded-3xl" autoPlay muted playsInline preload="metadata" style={{ maxHeight: window.innerWidth < 1024 ? "35vh" : "100%" }}>Your browser does not support the video tag.</video>
          )}
        </div>

        {item.link && (
          <div className="relative mt-6 flex justify-center w-full lg:w-auto">
            <a href={item.link} target="_blank" rel="noopener noreferrer" className="px-6 py-2 bg-slate-600 hover:bg-slate-700 text-white text-sm font-semibold rounded-lg transition">Visit Website</a>
          </div>
        )}

        {item.relatedLinks && item.relatedLinks.length > 0 && (
          <div className="absolute left-1/2 transform -translate-x-1/2 flex flex-col gap-3 items-center" style={{ bottom: item.relatedLinks.length === 1 ? "-3rem" : "-7rem" }}>
            {item.relatedLinks.map((link, idx) => (
              <button key={idx} onClick={() => onNavigate?.(link.category, link.index)} className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white text-sm font-semibold rounded-lg transition whitespace-nowrap">→ {link.title}</button>
            ))}
          </div>
        )}

        {allMedia.length > 1 && (
          <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center gap-4" style={{ bottom: "-0.5rem" }}>
            <button onClick={() => setCurrentMediaIndex((prev) => (prev - 1 + allMedia.length) % allMedia.length)} className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="15 18 9 12 15 6" /></svg>
            </button>
            <span className="text-white/70 text-sm">{currentMediaIndex + 1} / {allMedia.length}</span>
            <button onClick={() => setCurrentMediaIndex((prev) => (prev + 1) % allMedia.length)} className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="9 18 15 12 9 6" /></svg>
            </button>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

// ─── ProjectModal ──────────────────────────────────────────────────────────

function ProjectModal({ project, projectId, onClose }: { project: any; projectId: string; onClose: () => void }) {
  const device = useDeviceType();
  const scaleMap: Record<string, number> = {
    "3d-modeling": 0.90,
    "digital-media": 0.88,
    "camera-work": 0.95,
    "programming": 0.55,
    "fabrication": 0.60,
    "3d-modelling": 0.62,
  };
  const scaleValue = scaleMap[projectId] ?? 0.75;

  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    const handleEscape = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handleEscape);
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed backdrop-blur-xl pointer-events-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      style={{ position: "fixed", inset: 0, zIndex: 99999, display: "flex", alignItems: "flex-start", justifyContent: "center", overflow: device === "desktop" ? "hidden" : "auto", width: "100vw", height: "100vh", background: "rgba(0, 0, 0, 0.3)" }}
    >
      <motion.div
        className="relative w-11/12 max-w-full flex flex-col items-center p-8"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        onClick={(e) => e.stopPropagation()}
        style={{ marginTop: projectId === "camera-work" ? "110px" : projectId === "3d-modeling" ? "210px" : "90px", overflow: device === "desktop" ? "hidden" : "visible" }}
      >
        <button onClick={onClose} className={`absolute z-50 p-2 hover:bg-white/10 rounded-full transition-colors ${projectId === "digital-media" ? "top-0 right-0" : "top-4 right-4"}`}>
          <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
        </button>
        {project.description && <p className="text-sm md:text-base text-white/80 mb-8 text-center max-w-2xl">{project.description}</p>}
        <div style={{ width: "100%", transform: `scale(${scaleValue})`, transformOrigin: "top" }}>{project.content}</div>
      </motion.div>
    </motion.div>
  );
}

// ─── Work ──────────────────────────────────────────────────────────────────

function Work({ setPage }: { setPage: (page: "home" | "work" | "about" | "contact") => void }) {
  const [activeVideo, setActiveVideo] = useState<MediaItem | null>(null);
  const [selectedProjectIndex, setSelectedProjectIndex] = useState<number | null>(null);
  const device = useDeviceType();

  const allProjectItems = [
    ...DIGITAL_MEDIA.map((p) => ({
      id: p.id,
      title: p.title,
      description: p.description,
      img: p.img,
      objectPosition: p.objectPosition,
      scale: p.scale,
      category: "Design Systems & Visuals" as const,
      content: (
        <div>
          {p.id === "3d-modeling" && <ProjectDetailModelingMedia onMediaClick={setActiveVideo} />}
          {p.id === "digital-media" && <ProjectDetailDigitalMedia onMediaClick={setActiveVideo} />}
          {p.id === "camera-work" && <ProjectDetailCameraWork onMediaClick={setActiveVideo} />}
        </div>
      ),
    })),
    ...HANDMADE_WORKS.map((p) => ({
      id: p.title.toLowerCase().replace(/\s+/g, "-"),
      title: p.title,
      description: p.description,
      img: p.img,
      objectPosition: p.objectPosition,
      scale: (p as any).scale,
      category: "Interactive Media" as const,
      content: (
        <div className="grid items-start gap-5 sm:grid-cols-2 lg:grid-cols-2">
          {(FABRICATION_MEDIA[p.title as keyof typeof FABRICATION_MEDIA] || []).map((item, index) => (
            <div key={item.src ?? index}><AutoAspectTile item={item} onMediaClick={setActiveVideo} /></div>
          ))}
        </div>
      ),
    })),
  ];

  return (
    <motion.div
      key="work"
      variants={pageFadeVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.55 }}
      className="portfolio-page overflow-y-auto"
      style={{ 
        backgroundColor: '#0f172a',
        width: '100%',
        height: '100dvh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <h2 className="font-[KiwiSoda] text-5xl font-normal bounce-text pt-28 md:pt-40 px-4 ml-8 md:ml-32" style={{ color: "#ffffff" }}>My Work</h2>

      <div className="mt-16 md:mt-24 px-4">
        <CubeTab items={allProjectItems} onItemClick={setSelectedProjectIndex} selectedIndex={selectedProjectIndex} />
      </div>

      <AnimatePresence mode="wait">
        {selectedProjectIndex !== null && allProjectItems[selectedProjectIndex] && (
          <ProjectModal project={allProjectItems[selectedProjectIndex]} projectId={allProjectItems[selectedProjectIndex].id} onClose={() => setSelectedProjectIndex(null)} />
        )}
      </AnimatePresence>

      <motion.div className="flex items-center justify-center gap-3 mt-12 md:mt-12 mb-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
        <div className="bounce-text" style={{ filter: "drop-shadow(0 0 8px rgba(56, 189, 248, 0.9)) drop-shadow(0 0 16px rgba(56, 189, 248, 0.7))" }}>
          <ChevronLeft size={32} style={{ color: "#ffffff" }} />
        </div>
        <span className="font-[KiwiSoda] bounce-text" style={{ color: "#ffffff", fontSize: "20px", letterSpacing: "0.5px" }}>
          {device === "desktop" ? "Drag tab to explore" : "Scroll tab to explore"}
        </span>
        <div className="bounce-text" style={{ filter: "drop-shadow(0 0 8px rgba(56, 189, 248, 0.9)) drop-shadow(0 0 16px rgba(56, 189, 248, 0.7))" }}>
          <ChevronRight size={32} style={{ color: "#ffffff" }} />
        </div>
      </motion.div>

      <AnimatePresence>
        {activeVideo && <MediaModal item={activeVideo} onClose={() => setActiveVideo(null)} />}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Project Detail Components ─────────────────────────────────────────────

function ProjectDetailModelingMedia({ onMediaClick }: { onMediaClick: (item: MediaItem) => void }) {
  return (
    <section className="space-y-6">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 items-end">
        {MODELING_MEDIA.map((item, index) => (
          <div key={item.src ?? index} className="w-full"><AutoAspectTile item={item} onMediaClick={onMediaClick} /></div>
        ))}
      </div>
    </section>
  );
}

function ProjectDetailDigitalMedia({ onMediaClick }: { onMediaClick: (item: MediaItem) => void }) {
  return (
    <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 4 }} className="scale-75 origin-top" style={{ marginLeft: '-20px' }}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="flex flex-col gap-5">
          <AutoAspectTile item={SHIRI_DESIGNS[0]} onMediaClick={onMediaClick} />
          <AutoAspectTile item={SHIRI_DESIGNS[1]} onMediaClick={onMediaClick} />
        </div>
        <div className="flex flex-col gap-5">
          <AutoAspectTile item={GRAPHIC_MEDIA[0]} onMediaClick={onMediaClick} />
        </div>
        <div className="flex flex-col gap-5">
          <AutoAspectTile item={GRAPHIC_MEDIA[1]} onMediaClick={onMediaClick} />
          <AutoAspectTile item={GRAPHIC_MEDIA[2]} onMediaClick={onMediaClick} />
          <AutoAspectTile item={GRAPHIC_MEDIA[3]} onMediaClick={onMediaClick} />
        </div>
        <div className="flex flex-col gap-5">
          <AutoAspectTile item={SHIRI_DESIGNS[2]} onMediaClick={onMediaClick} />
          <AutoAspectTile item={SHIRI_DESIGNS[3]} onMediaClick={onMediaClick} />
        </div>
      </div>
    </motion.section>
  );
}

function ProjectDetailCameraWork({ onMediaClick }: { onMediaClick: (item: MediaItem) => void }) {
  // Columns 1–4: single items each, scaled down slightly to match col 5 height
  const col1 = CAMERA_MEDIA[6]; // Candid Studio Portrait
  const col2 = CAMERA_MEDIA[0]; // NABU 2026 Teaser
  const col3 = CAMERA_MEDIA[1]; // NABU 2025 Summer
  const col4 = CAMERA_MEDIA[2]; // NABU 2023 Spring
  // Column 5: Culinary → Campaign → Abstract, evenly spaced
  const col5 = [CAMERA_MEDIA[5], CAMERA_MEDIA[3], CAMERA_MEDIA[4]];

  const singleColStyle: React.CSSProperties = {
    transform: "scale(0.85)",
    transformOrigin: "top center",
  };

  return (
    <section className="space-y-6">
      {/* 5-column grid — each column is a flex container so items don't leak rows */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-start">

        {/* Col 1 */}
        <div style={singleColStyle}>
          <AutoAspectTile item={col1} onMediaClick={onMediaClick} />
        </div>

        {/* Col 2 */}
        <div style={singleColStyle}>
          <AutoAspectTile item={col2} onMediaClick={onMediaClick} />
        </div>

        {/* Col 3 */}
        <div style={singleColStyle}>
          <AutoAspectTile item={col3} onMediaClick={onMediaClick} />
        </div>

        {/* Col 4 */}
        <div style={singleColStyle}>
          <AutoAspectTile item={col4} onMediaClick={onMediaClick} />
        </div>

        {/* Col 5 — Culinary / Campaign / Abstract stacked with consistent gap */}
        <div
          className="flex flex-col"
          style={{
            transform: "scale(0.85)",
            transformOrigin: "top center",
            gap: "0.5rem", // ~half inch at 96dpi — adjust to taste
          }}
        >
          {col5.map((item) => (
            <AutoAspectTile key={item.src} item={item} onMediaClick={onMediaClick} />
          ))}
        </div>

      </div>
    </section>
  );
}

// ─── About ─────────────────────────────────────────────────────────────────

function About({ setPage }: { setPage: (page: "home" | "work" | "about" | "contact") => void }) {
  const currentImage = PORTRAIT_IMAGES[0];
  const [windowWidth, setWindowWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1024);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getScalingValues = () => {
    if (windowWidth >= 1024) {
      return { textSize: 16, smallTextSize: 14, photoWidth: 320, photoHeight: 520, photoMargin: 0, photoBorder: 2, padding: 32, gap: 32, headingSize: 48 };
    } else if (windowWidth <= 320) {
      return { textSize: 10.5, smallTextSize: 10, photoWidth: 160, photoHeight: 240, photoMargin: 140, photoBorder: 1.5, padding: 12, gap: 16, headingSize: 24 };
    } else {
      const progress = (1024 - windowWidth) / (1024 - 320);
      return {
        textSize: 16 - (progress * 5.5),
        smallTextSize: 14 - (progress * 4),
        photoWidth: 320 - (progress * 160),
        photoHeight: 520 - (progress * 280),
        photoMargin: progress * 140,
        photoBorder: 2 - (progress * 0.5),
        padding: 32 - (progress * 20),
        gap: 32 - (progress * 16),
        headingSize: 48 - (progress * 24),
      };
    }
  };

  const scaling = getScalingValues();

  return (
    <motion.div
      key="about"
      variants={pageFadeVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.55 }}
      className="portfolio-page"
      style={{ backgroundColor: '#ffffff' }}
    >
      <div style={{ height: windowWidth >= 1024 ? '100px' : '64px', flexShrink: 0 }} />

      <div
        className="grid grid-cols-2 items-start overflow-visible mt-8 md:mt-20"
        style={{ gap: `${scaling.gap}px`, width: '100%', boxSizing: 'border-box' }}
      >
        <motion.div style={{ marginLeft: windowWidth >= 1024 ? '128px' : `${scaling.padding}px` }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }}>
          <motion.h2
            className="font-[KiwiSoda] font-normal bounce-text mb-8 mt-8 md:mt-0"
            style={{ color: "#1a1a1a", fontSize: `${scaling.headingSize}px` }}
          >
            About
          </motion.h2>

          <motion.div className="pt-0 mt-20 md:mt-20" exit={{ opacity: 0 }} transition={{ duration: 0.6 }}>
            <p className="mt-0 text-slate-700" style={{ fontSize: `${scaling.textSize}px`, lineHeight: '1.6' }}>
              My journey into design started with a LEGO collection and a stop-motion app, turning simple bricks into narratives. That early obsession with building evolved into a career defined by a 'no-limits' approach to creation. Whether I'm coding a UI/UX interface, welding raw steel, or calibrating a 3D print on my Bambu Labs setup, I view every medium as a new language to master.
            </p>
            <p className="mt-4 text-slate-700" style={{ fontSize: `${scaling.textSize}px`, lineHeight: '1.6' }}>
              I'm a perfectionist by nature, a trait that drives me to work rigorously until a project matches the exact vision I've engineered in my head. I thrive on the challenge of learning new tools to solve complex problems. When you work with me, you're getting a designer who is as comfortable with a soldering iron as they are with Adobe Illustrator, and someone who won't stop until the work meets my own high standards for excellence, as well as your own.
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          className="origin-center relative mx-auto"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            width: `${scaling.photoWidth}px`,
            height: `${scaling.photoHeight}px`,
            border: `${scaling.photoBorder}px solid rgba(255, 255, 255, 0.1)`,
            borderRadius: currentImage.frame,
            boxShadow: "0 0 20px rgba(128, 128, 128, 0.6)",
            overflow: "visible",
            marginTop: `${scaling.photoMargin + 24}px`,
            zIndex: 30,
          }}
        >
          <motion.img src={currentImage.src} alt={currentImage.alt} className="w-full h-full object-cover" style={{ borderRadius: currentImage.frame }} />
        </motion.div>
      </div>
    </motion.div>
  );
}

// ─── Contact ───────────────────────────────────────────────────────────────

function Contact({ setPage }: { setPage: (page: "home" | "work" | "about" | "contact") => void }) {
  return (
    <motion.div
      key="contact"
      variants={pageFadeVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.55 }}
      className="portfolio-page flex flex-col items-center justify-center"
      style={{ backgroundColor: '#ffffff' }}
    >
      <h2 className="font-[KiwiSoda] text-6xl md:text-7xl lg:text-8xl font-normal bounce-text text-center" style={{ color: "#1a1a1a" }}>
        Let's collaborate
      </h2>
      <div className="mt-12 flex gap-4 flex-wrap justify-center">
        <a href="mailto:shyon2001@gmail.com" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-sky-500 to-cyan-500 shadow hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 text-lg">
          <Mail className="w-6 h-6" /> Email Me
        </a>
        <a href="https://www.linkedin.com/in/shyonshiri/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold bg-gradient-to-br from-slate-600/40 via-slate-700/50 to-slate-800/50 border border-slate-500/60 text-white hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 text-lg">
          <Linkedin className="w-6 h-6" /> LinkedIn
        </a>
        <a href="/assets/My_Resume.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold bg-gradient-to-br from-slate-600/40 via-slate-700/50 to-slate-800/50 border border-slate-500/60 text-white hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 text-lg">
          <FileText className="w-6 h-6" /> Resume
        </a>
      </div>
    </motion.div>
  );
}
