import * as React from "react";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, User, Mail, Linkedin, FileText, ChevronLeft, ChevronRight } from "lucide-react";
import CubeTab from "./CubeTab";
import { useInitialPreload } from "./useAssetPreloader";

// Cache bust v2 - ensure My_Case.jpg loads on live site
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
    
    // Vertical swipes
    if (Math.abs(deltaY) > threshold && Math.abs(deltaY) > Math.abs(deltaX)) {
      if (deltaY > 0 && onSwipeUp) {
        onSwipeUp();
      } else if (deltaY < 0 && onSwipeDown) {
        onSwipeDown();
      }
    }
    // Horizontal swipes
    else if (Math.abs(deltaX) > threshold) {
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
    // Disable double-tap zoom on iOS for faster touch response
    const touchHandler = (e: TouchEvent) => {
      if (e.touches.length > 1) {
        e.preventDefault();
      }
    };
    
    // Optimize for reduced-motion preference
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      document.documentElement.style.scrollBehavior = "auto";
    }
    
    // Enable passive touch listeners for better scroll performance
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
  {
    type: "image",
    src: "/assets/Shiri_Design_1.PNG",
    title: "Clothing Line Mock Up",
    year: 2024,
  },
  {
    type: "image",
    src: "/assets/Shiri_Design_2.PNG",
    title: "Clothing Line Mock Up",
    year: 2024,
  },
  {
    type: "image",
    src: "/assets/Shiri_Design_3.PNG",
    title: "Clothing Line Mock Up",
    year: 2024,
  },
  {
    type: "image",
    src: "/assets/Shiri_Design_4.PNG",
    title: "Clothing Line Mock Up",
    year: 2024,
  },
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
    description: "A conceptual brand advertisement utilizing environmental storytelling and scenic composition to promote a product. Developed to emulate the visual sophistication and marketing strategies employed by well-known brands.",
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

// --- Handmade Media Collections ------------------------------------------

type MediaItem = {
  type: "image" | "video";
  src: string;
  alt?: string;
  link?: string; //
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

// CATEGORY CARDS (do not change — these control framing)
const HANDMADE_WORKS = [
  {
    title: "Programming",
    img: "/assets/Programming_Cover_Pic.jpg",
    description:
      "Hardware focused interactive work using microcontrollers and sensors.",
    objectPosition: "center 70%", // shows more of top area
  },
  {
    title: "Fabrication",
    img: "/assets/Shyon_Sculpture.jpg",
    description:
      "Handmade sculptures exploring form, balance, and physical interaction.",
    objectPosition: "center 45%", // shows more of the lower area
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

function ShimmerButton({ 
  onClick, 
  icon 
}: { 
  onClick: () => void; 
  icon: React.ReactNode;
}) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isTouching, setIsTouching] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;
    
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Normalize to percentage (0-100)
    const percentX = (x / rect.width) * 100;
    const percentY = (y / rect.height) * 100;
    
    setMousePos({ x: percentX, y: percentY });
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLButtonElement>) => {
    setIsTouching(true);
    triggerHaptic("light");
    if (!buttonRef.current) return;
    
    const touch = e.touches[0];
    const rect = buttonRef.current.getBoundingClientRect();
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    
    const percentX = (x / rect.width) * 100;
    const percentY = (y / rect.height) * 100;
    
    setMousePos({ x: percentX, y: percentY });
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;
    
    const touch = e.touches[0];
    const rect = buttonRef.current.getBoundingClientRect();
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    
    const percentX = (x / rect.width) * 100;
    const percentY = (y / rect.height) * 100;
    
    setMousePos({ x: percentX, y: percentY });
  };

  const handleTouchEnd = () => {
    setIsTouching(false);
  };

  const showGradient = isHovering || isTouching;

  return (
    <motion.button
      ref={buttonRef}
      onClick={() => {
        triggerHaptic("medium");
        onClick();
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="shimmer-button group relative w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-white/15 via-white/10 to-white/15 border border-white/25 shadow-[0_8px_30px_rgba(0,180,255,0.15)] backdrop-blur-2xl flex items-center justify-center text-white focus:outline-none focus:ring-2 focus:ring-sky-400 transition-all overflow-hidden active:ring-2 active:ring-sky-300"
      whileHover={{ scale: 1.12 }}
      whileTap={{ scale: 0.94 }}
    >
      <span className="absolute -inset-1 rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.45),transparent_55%)] opacity-70" />
      <span 
        className={`absolute inset-0 rounded-full transition-opacity duration-150 ${showGradient ? 'opacity-100' : 'opacity-0'}`}
        style={{
          background: showGradient
            ? `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(125,211,252,0.6), transparent 55%)`
            : `radial-gradient(circle at 60% 20%, rgba(125,211,252,0.6), transparent 55%)`
        }}
      />
      <span className={`absolute inset-0 rounded-full ring-1 transition-colors duration-150 ${showGradient ? 'ring-sky-200/40' : 'ring-white/20'}`} />
      <div className="relative z-10">
        {icon}
      </div>
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
      onClick={() => {
        triggerHaptic("light");
        onClick();
      }}
      className="cursor-pointer outline-none transition-all focus:outline-none border-none bg-transparent"
      style={{ 
        WebkitTapHighlightColor: "transparent",
        WebkitAppearance: "none",
        appearance: "none"
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <h3 className="font-[KiwiSoda] text-lg md:text-xl font-normal bounce-text-dark flex items-center gap-2 whitespace-nowrap px-4 py-2 rounded transition-colors hover:text-sky-400" style={{ color: "#1a1a1a" }}>
        {!isNext && "← "}
        {pageName}
        {isNext && " →"}
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
  const device = useDeviceType();
  const isScrollingRef = useRef(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const currentPageRef = useRef(currentPage);
  const mainDivRef = useRef<HTMLDivElement>(null);
  
  const pageOrder = PAGE_ORDER;

  // Keep currentPageRef in sync with state
  useEffect(() => {
    currentPageRef.current = currentPage;
    
    // Only delay prevPage update when transitioning FROM work TO home
    if (prevPage === "work" && currentPage === "home") {
      const timer = setTimeout(() => {
        setPrevPage(currentPageRef.current);
      }, 600);
      return () => clearTimeout(timer);
    } else {
      setPrevPage(currentPageRef.current);
    }
  }, [currentPage, prevPage]);

  // Apply device optimizations
  useDeviceOptimizations();

  // Preload assets on mount
  useInitialPreload();

  // Force dark mode once on mount
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  // Disable scroll on body for work/about/contact pages only
  useEffect(() => {
    if (currentPage !== "home" && currentPage !== "work") {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
  }, [currentPage]);

  // Handle page navigation with direction tracking
  const navigateTo = (page: "home" | "work" | "about" | "contact") => {
    const currentIndex = pageOrder.indexOf(currentPage);
    const nextIndex = pageOrder.indexOf(page);
    setDirection(nextIndex > currentIndex ? "forward" : "backward");
    setCurrentPage(page);
  };

  // Swipe handlers for page navigation on mobile/tablet
  const { handleTouchStart, handleTouchEnd } = useSwipeGesture(
    // swipeUp (next page)
    () => {
      if (device === "mobile" || device === "tablet") {
        const currentIndex = pageOrder.findIndex(page => page === currentPageRef.current);
        if (currentIndex < pageOrder.length - 1) {
          isScrollingRef.current = true;
          const nextPage = pageOrder[currentIndex + 1];
          setDirection("forward");
          setCurrentPage(nextPage);
          
          if (timeoutRef.current) clearTimeout(timeoutRef.current);
          timeoutRef.current = setTimeout(() => {
            isScrollingRef.current = false;
          }, 1500);
        }
      }
    },
    // swipeDown (previous page)
    () => {
      if (device === "mobile" || device === "tablet") {
        const currentIndex = pageOrder.findIndex(page => page === currentPageRef.current);
        if (currentIndex > 0) {
          isScrollingRef.current = true;
          const prevPage = pageOrder[currentIndex - 1];
          setDirection("backward");
          setCurrentPage(prevPage);
          
          if (timeoutRef.current) clearTimeout(timeoutRef.current);
          timeoutRef.current = setTimeout(() => {
            isScrollingRef.current = false;
          }, 1500);
        }
      }
    }
  );

  

  return (
  <motion.div 
    ref={mainDivRef}
    className={`fixed inset-0 w-screen h-screen text-slate-700 dark:text-slate-200 overflow-hidden`}
    style={{ zIndex: 5 }}
    animate={{ 
      backgroundColor: (prevPage === "work" && currentPage === "home")
        ? "#000000"
        : currentPage === "home" && prevPage === "home"
          ? "transparent"
          : currentPage === "work"
            ? "#0f172a"
            : "#ffffff"
    }}
    transition={{ 
      duration: (prevPage === "work" && currentPage === "home") ? 0.6 : 0.3,
      ease: "easeInOut"
    }}
    onWheel={(e) => {
      e.preventDefault();
      
      if (isScrollingRef.current) return;
      
      const currentIndex = pageOrder.findIndex(page => page === currentPageRef.current);
      
      if (e.deltaY > 0) {
        if (currentIndex < pageOrder.length - 1) {
          isScrollingRef.current = true;
          const nextPage = pageOrder[currentIndex + 1];
          setDirection("forward");
          setCurrentPage(nextPage);
          
          if (timeoutRef.current) clearTimeout(timeoutRef.current);
          timeoutRef.current = setTimeout(() => {
            isScrollingRef.current = false;
          }, 1500);
        }
      } else if (e.deltaY < 0) {
        if (currentIndex > 0) {
          isScrollingRef.current = true;
          const prevPage = pageOrder[currentIndex - 1];
          setDirection("backward");
          setCurrentPage(prevPage);
          
          if (timeoutRef.current) clearTimeout(timeoutRef.current);
          timeoutRef.current = setTimeout(() => {
            isScrollingRef.current = false;
          }, 1500);
        }
      }
    }}
    onTouchStart={(e) => {
      if (device !== "desktop") {
        handleTouchStart(e.nativeEvent);
      }
    }}
    onTouchEnd={(e) => {
      if (device !== "desktop") {
        handleTouchEnd(e.nativeEvent);
      }
    }}
  >
      {/* Dust Particles only - background colors handled by wrapper */}
      <motion.div 
        className="fixed inset-0 w-screen h-screen z-10 pointer-events-none overflow-hidden"
        initial={{ opacity: 1 }}
        animate={{ opacity: currentPage === "home" ? 0 : 1 }}
        transition={{ duration: 0.9 }}
      >
        {[...Array(typeof window !== "undefined" && window.innerWidth < 768 ? 30 : 80)].map((_, i) => {
          const size = Math.random() * 6 + 2; // 2px to 8px
          const duration = Math.random() * 3 + 3; // 3s to 6s
          const delay = Math.random() * 1.5; // 0s to 1.5s
          const startX = Math.random() * 100;
          const startY = Math.random() * 100;
          const seedOpacity = Math.random() * 0.7 + 0.15;
          const seedScale = Math.random() * 0.25 + 0.9;
          const seedX = (Math.random() * 2 - 1) * 20;
          const seedY = (Math.random() * 2 - 1) * 20;
          const driftX1 = (Math.random() * 2 - 1) * 40;
          const driftY1 = (Math.random() * 2 - 1) * 40;
          const driftX2 = (Math.random() * 2 - 1) * 40;
          const driftY2 = (Math.random() * 2 - 1) * 40;
          
          return (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                background: currentPage === "work" 
                  ? `rgba(255, 255, 255, ${Math.random() * 0.28 + 0.08})`
                  : `rgba(0, 0, 0, ${Math.random() * 0.28 + 0.08})`,
                left: `${startX}%`,
                top: `${startY}%`,
                filter: "blur(2px)",
                opacity: seedOpacity,
              }}
              initial={{ opacity: seedOpacity, x: seedX, y: seedY, scale: seedScale }}
              animate={{
                opacity: [seedOpacity, 0.85, 0],
                x: [seedX, seedX + driftX1, seedX + driftX2, seedX],
                y: [seedY, seedY + driftY1, seedY + driftY2, seedY],
                scale: [seedScale, 1.08, 0.9, seedScale],
              }}
              transition={{
                duration,
                ease: "easeInOut",
                repeat: Infinity,
                delay,
                times: [0, 0.45, 1],
              }}
            />
          );
        })}
      </motion.div>

      {/* Main Content */}
  <main className={`relative z-20 pb-0 overflow-visible`} style={{ paddingTop: "max(3rem, calc(env(safe-area-inset-top) + 2rem))" }}>
        <AnimatePresence mode="wait">
          {currentPage === "home" && (
            <Hero setPage={navigateTo} />
          )}
          {currentPage === "work" && (
            <motion.div 
              key="work" 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              transition={{ duration: 0.9, ease: [0.34, 1.56, 0.64, 1] }}
              className="w-full"
            >
              <Work setPage={navigateTo} />
            </motion.div>
          )}
          {currentPage === "about" && (
            <motion.div 
              key="about" 
              initial={{ opacity: 0, scale: direction === "forward" ? 0.7 : 1.3 }} 
              animate={{ opacity: 1, scale: 1 }} 
              exit={{ opacity: 0, scale: direction === "forward" ? 1.3 : 0.7 }} 
              transition={{ duration: 0.9, ease: [0.34, 1.56, 0.64, 1] }}
              className="max-w-6xl mx-auto px-4"
            >
              <About setPage={navigateTo} />
            </motion.div>
          )}
          {currentPage === "contact" && (
            <motion.div 
              key="contact" 
              initial={{ opacity: 0, scale: direction === "forward" ? 0.7 : 1.3 }} 
              animate={{ opacity: 1, scale: 1 }} 
              exit={{ opacity: 0, scale: direction === "forward" ? 1.3 : 0.7 }} 
              transition={{ duration: 0.9, ease: [0.34, 1.56, 0.64, 1] }}
              className="max-w-6xl mx-auto px-4"
            >
              <Contact setPage={navigateTo} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </motion.div>
  );
}

// --- Sections --------------------------------------------------------------

function Section({
  id,
  children,
  active = true,
}: {
  id: string;
  children: React.ReactNode;
  active?: boolean;
}) {
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
      <div className="relative max-w-6xl mx-auto h-full grid place-items-center px-4">
        {children}
      </div>
    </section>
  );
}

function Hero({ setPage }: { setPage: (page: "home" | "work" | "about" | "contact") => void }) {
  const [windowWidth, setWindowWidth] = React.useState(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth;
    }
    return 1024;
  });

  React.useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Calculate background position based on viewport width for progressive left crop
  const getBackgroundPosition = () => {
    if (windowWidth >= 1024) {
      return "center 2%";
    } else {
      // Smoothly shift right as screen gets smaller (from 1024px down to 320px mobile)
      const progress = Math.max(0, (1024 - windowWidth) / (1024 - 320));
      const shiftAmount = progress * 48; // Gradually shift up to 48%
      return `calc(50% + ${shiftAmount}%) 50%`;
    }
  };

  // Calculate title left position smoothly based on viewport width
  const getTitleLeftPosition = () => {
    if (windowWidth >= 1024) {
      return "20%"; // Desktop position
    } else {
      // Smoothly transition from md:left-[20%] to left-4 as screen gets smaller
      const progress = Math.max(0, (1024 - windowWidth) / (1024 - 320));
      const leftPercent = 20 - (progress * 22); // From 20% down to ~-2% at mobile (clamped to 1%)
      return `${Math.max(1, leftPercent)}%`;
    }
  };

  // Preload the background image to prevent flash on load
  React.useEffect(() => {
    const img = new Image();
    img.src = '/assets/IMG_2282.JPG';
  }, []);

  return (
    <motion.div 
      id="home"
      key="hero"
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }} 
      transition={{ 
        duration: 0.9, 
        ease: [0.34, 1.56, 0.64, 1]
      }}
      className="fixed z-20 flex items-center overflow-hidden"
      style={{
        backgroundColor: "#0f172a",
        backgroundImage: "url('/assets/IMG_2282.JPG')",
        backgroundSize: "cover",
        backgroundPosition: getBackgroundPosition(),
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        inset: 0,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: "100%",
        height: "100%",
        minHeight: "100vh",
        minWidth: "100vw"
      }}
    >
      {/* Title and buttons overlay - positioned absolutely */}
      <div 
        className="absolute z-30 top-1/2 md:top-[47%] -translate-y-1/2 flex flex-col items-start md:items-center justify-center gap-4 sm:gap-6 w-auto"
        style={{ left: getTitleLeftPosition() }}
      >
        <motion.h1
          layout
          className="font-[KiwiSoda] font-normal leading-tight bounce-text text-center"
          style={{ color: "#1a1a1a" }}
        >
          {/* Bigger name - responsive sizing */}
          <span className="block text-5xl sm:text-5xl md:text-7xl lg:text-8xl">
            Shyon Shiri
          </span>

          {/* Smaller subtitle - responsive sizing */}
          <span className="block mt-2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-cyan-400 bounce-text">
            Graphic Designer
          </span>
        </motion.h1>

        {/* End of Hero content */}
      </div>
    </motion.div>
  );
}

function AutoAspectTile({ 
  item, 
  onMediaClick 
}: { 
  item: MediaItem;
  onMediaClick?: (item: MediaItem) => void;
}) {
  const [ratio, setRatio] = React.useState<number | null>(item.aspectRatio ?? null);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const setSafeRatio = (w: number, h: number) => {
    if (!w || !h) return;
    const r = w / h;
    if (Number.isFinite(r) && r > 0) setRatio(r);
  };

  const Wrapper = item.link && !onMediaClick ? "a" : "div";

  const handleClick = () => {
    if (onMediaClick) {
      onMediaClick(item);
    }
  };

  const isShiriDesign = item.src.includes("Shiri_Design");
  // Disable link wrapper if onMediaClick is provided (modal mode)
  const shouldDisableLink = onMediaClick && item.link;
  
  return (
    <motion.article
      ref={containerRef}
      className={`group relative rounded-3xl overflow-hidden cursor-pointer ${onMediaClick ? "bg-transparent backdrop-filter-none" : ""}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      onClick={handleClick}
      style={onMediaClick ? { background: "transparent", backdropFilter: "none" } : undefined}
    >
      <Wrapper
        {...(!shouldDisableLink && item.link && !onMediaClick
          ? {
              href: item.link,
              target: "_blank",
              rel: "noopener noreferrer",
            }
          : {})}
        className={`block w-full h-full ${onMediaClick ? "bg-transparent" : ""}`}
        style={onMediaClick ? { background: "transparent" } : undefined}
      >
        {/* MEDIA */}
        <div
          className="w-full bg-transparent"
          style={{ aspectRatio: ratio ?? 16 / 9 }}
        >
          {item.type === "image" ? (
            <img
              src={item.src}
              alt={item.alt ?? ""}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
              style={{ objectPosition: item.objectPosition ?? "center", transform: item.scale ? `scale(${item.scale})` : "scale(1)", transformOrigin: item.objectPosition ?? "center" }}
              onLoad={(e) => {
                const img = e.currentTarget;
                if (!item.aspectRatio) {
                  setSafeRatio(img.naturalWidth, img.naturalHeight);
                }
              }}
            />
          ) : (
            <div className="relative w-full h-full bg-black/40">
              {/* poster - aspect ratio determined by image dimensions */}
              <img
                src={item.poster}
                alt={item.title ?? ""}
                className="w-full h-full object-cover"
                style={{ objectPosition: "center" }}
                onLoad={(e) => {
                  const img = e.currentTarget;
                  setSafeRatio(img.naturalWidth, img.naturalHeight);
                }}
              />

              {/* play button overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  className="w-16 h-16 rounded-full bg-black/60 backdrop-blur
                             flex items-center justify-center
                             transition-transform group-hover:scale-110"
                >
                  <svg
                    className="w-7 h-7 text-white ml-1"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </div>
          )}
        </div>

      </Wrapper>
    </motion.article>
  );
}

function MediaModal({ 
  item, 
  onClose,
  onNavigate
}: { 
  item: MediaItem;
  onClose: () => void;
  onNavigate?: (category: string, index: number) => void;
}) {
  const device = useDeviceType();
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);

  // Create a combined media array: start with the main item, then related images
  const allMedia = [
    { type: item.type, src: item.src, title: item.title ?? "Media" },
    ...(item.relatedImages?.map((img) => ({
      type: "image" as const,
      src: img.src,
      title: img.title,
    })) ?? []),
  ];

  // Calculate base size based on aspect ratio
  const aspectRatio = item.aspectRatio || 1;
  
  // Start with a base size and scale down if aspect ratio is smaller
  let baseWidth = 500;
  let baseHeight = baseWidth / aspectRatio;
  
  // If aspect ratio is very small (more portrait), reduce base size
  if (aspectRatio < 0.8) {
    baseWidth = 480;
    baseHeight = baseWidth / aspectRatio;
  }
  
  const maxAvailableWidth = window.innerWidth * 0.55; // Right side of layout
  const maxAvailableHeight = window.innerHeight * 0.65;
  
  // Scale down if exceeds available space
  let finalWidth = baseWidth;
  let finalHeight = baseHeight;
  
  if (baseWidth > maxAvailableWidth) {
    finalWidth = maxAvailableWidth;
    finalHeight = finalWidth / aspectRatio;
  }
  
  if (baseHeight > maxAvailableHeight) {
    finalHeight = maxAvailableHeight;
    finalWidth = finalHeight * aspectRatio;
  }  useEffect(() => {
    // Disable body scroll when modal opens
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);
    
    return () => {
      // Re-enable body scroll when modal closes
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  const handlePrevImage = () => {
    setCurrentMediaIndex((prev) => (prev - 1 + allMedia.length) % allMedia.length);
  };

  const handleNextImage = () => {
    setCurrentMediaIndex((prev) => (prev + 1) % allMedia.length);
  };

  const currentMedia = allMedia[currentMediaIndex];

  return (
    <motion.div
      className="fixed bg-black/40 backdrop-blur-md media-modal-fullscreen pointer-events-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      style={{ 
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        padding: 0,
        margin: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "auto",
        width: "100vw",
        height: "100vh",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
      }}
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
          gap: window.innerWidth < 1024 ? "-0.5rem" : "-1rem",
          maxHeight: "calc(100vh - 10rem)",
          flexDirection: window.innerWidth < 1024 ? "column" : "row",
          paddingTop: window.innerWidth < 768 ? "6rem" : "4rem",
          paddingBottom: "4rem",
          paddingLeft: "0",
          paddingRight: "0",
          boxSizing: "border-box",
          border: "none",
          outline: "none",
          background: "transparent",
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-12 right-0 z-20 w-10 h-10 rounded-full flex items-center justify-center text-white transition hover:scale-110"
        >
          <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Left: Text content */}
        <div className="flex flex-col justify-center items-start flex-shrink-0 w-full lg:w-1/3" style={{ paddingLeft: "1rem", paddingRight: "0", maxHeight: "100%", overflow: "hidden" }}>
          {item.title && (
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2 leading-tight break-words">
                {item.title === "Product, not Consumer" ? (
                  <span className="italic">{item.title}</span>
                ) : (
                  item.title
                )}
              </h2>
              {item.year && (
                <p className="text-sm text-white/60 mb-3">{item.year}</p>
              )}
            </div>
          )}
          {item.description && item.title !== "Clothing Line Mock Up" && (
            <p className="text-base sm:text-lg text-white/90 leading-relaxed" dangerouslySetInnerHTML={{ __html: item.description }} />
          )}
        </div>

        {/* Right: Media content */}
        <div className="flex items-center justify-center flex-shrink-0 w-full lg:flex-1" style={{ 
          width: window.innerWidth < 1024 ? "100%" : "auto", 
          height: window.innerWidth < 1024 ? "auto" : finalHeight, 
          minHeight: 0, 
          minWidth: 0,
          maxWidth: "100%",
          paddingLeft: "0",
          paddingRight: "1rem"
        }}>
          {currentMedia.type === "image" ? (
            <motion.img
              key={currentMediaIndex}
              src={currentMedia.src}
              alt={currentMedia.title}
              className="max-w-full max-h-full object-contain rounded-3xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ maxHeight: window.innerWidth < 1024 ? "35vh" : "100%" }}
            />
          ) : (
            <video
              key={currentMediaIndex}
              src={currentMedia.src}
              poster={item.poster}
              controls
              className="max-w-full max-h-full object-contain rounded-3xl"
              autoPlay
              muted
              playsInline
              preload="metadata"
              style={{ maxHeight: window.innerWidth < 1024 ? "35vh" : "100%" }}
            >
              Your browser does not support the video tag.
            </video>
          )}
        </div>

        {/* Link below media (if exists) */}
        {item.link && (
          <div className="relative mt-6 flex justify-center w-full lg:w-auto">
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2 bg-slate-600 hover:bg-slate-700 text-white text-sm font-semibold rounded-lg transition"
            >
              Visit Website
            </a>
          </div>
        )}

        {/* Related Links - Navigation buttons */}
        {item.relatedLinks && item.relatedLinks.length > 0 && (
          <div className="absolute left-1/2 transform -translate-x-1/2 flex flex-col gap-3 items-center" style={{ bottom: item.relatedLinks.length === 1 ? "-3rem" : "-7rem" }}>
            {item.relatedLinks.map((link, idx) => (
              <button
                key={idx}
                onClick={() => {
                  if (onNavigate) {
                    onNavigate(link.category, link.index);
                  }
                }}
                className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white text-sm font-semibold rounded-lg transition whitespace-nowrap"
              >
                → {link.title}
              </button>
            ))}
          </div>
        )}

        {/* Navigation - Bottom center */}
        {allMedia.length > 1 && (
          <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center gap-4" style={{ bottom: "-0.5rem" }}>
            <button
              onClick={handlePrevImage}
              className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <span className="text-white/70 text-sm">
              {currentMediaIndex + 1} / {allMedia.length}
            </span>
            <button
              onClick={handleNextImage}
              className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

function ProjectModal({ 
  project,
  projectId,
  onClose
}: { 
  project: any;
  projectId: string;
  onClose: () => void;
}) {
  const device = useDeviceType();
  // Individual scaling for each project
  let scaleValue = 0.75;
  switch(projectId) {
    case "3d-modeling":
      scaleValue = 0.90; // 3D Rendering - ORIGINAL
      break;
    case "digital-media":
      scaleValue = 0.88; // Digital Media
      break;
    case "camera-work":
      scaleValue = 0.95; // Camera Work
      break;
    case "programming":
      scaleValue = 0.55; // Programming - ORIGINAL (you want this smaller, what scale?)
      break;
    case "fabrication":
      scaleValue = 0.60; // Fabrication - ORIGINAL
      break;
    case "3d-modelling":
      scaleValue = 0.62; // 3D Modelling
      break;
  }

  useEffect(() => {
    // Disable body scroll when modal opens
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);
    
    return () => {
      // Re-enable body scroll when modal closes
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed backdrop-blur-xl media-modal-fullscreen pointer-events-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      style={{ 
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        padding: 0,
        margin: 0,
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        overflow: device === "desktop" ? "hidden" : "auto",
        width: "100vw",
        height: "100vh",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        background: "rgba(0, 0, 0, 0.3)",
      }}
    >
      <motion.div
        className="relative w-11/12 max-w-full flex flex-col items-center p-8"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        onClick={(e) => e.stopPropagation()}
        style={{ marginTop: projectId === "camera-work" ? "110px" : projectId === "3d-modeling" ? "210px" : "90px", overflow: device === "desktop" ? "hidden" : "visible" }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className={`absolute z-50 p-2 hover:bg-white/10 rounded-full transition-colors ${projectId === "digital-media" ? "top-0 right-0" : "top-4 right-4"}`}
        >
          <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Project description */}
        {project.description && (
          <p className="text-sm md:text-base text-white/80 mb-8 text-center max-w-2xl">
            {project.description}
          </p>
        )}

        {/* Project content - scaled based on project type */}
        <div style={{ width: "100%", transform: `scale(${scaleValue})`, transformOrigin: "top" }}>
          {project.content}
        </div>
      </motion.div>
    </motion.div>
  );
}

function Work({ setPage }: { setPage: (page: "home" | "work" | "about" | "contact") => void }) {
  const [activeVideo, setActiveVideo] = useState<MediaItem | null>(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const device = useDeviceType();

  // Combine all projects with their metadata
  const allProjectItems = [
    ...DIGITAL_MEDIA.map((p, idx) => ({
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
    ...HANDMADE_WORKS.map((p, idx) => ({
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
            <div key={item.src ?? index}>
              <AutoAspectTile item={item} onMediaClick={setActiveVideo} />
            </div>
          ))}
        </div>
      ),
    })),
  ];

  const [selectedProjectIndex, setSelectedProjectIndex] = useState<number | null>(null);

  return (
    <div className="flex flex-col w-full" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
      <h2 className="font-[KiwiSoda] text-5xl font-normal bounce-text pt-20 px-4 ml-8 md:ml-32" style={{ color: "#ffffff" }}>My Work</h2>
      
      {/* Tab Carousel */}
      <div className="mt-12 px-4">
        <CubeTab items={allProjectItems} onItemClick={setSelectedProjectIndex} selectedIndex={selectedProjectIndex} />
      </div>

      {/* Project Modal */}
      <AnimatePresence mode="wait">
        {selectedProjectIndex !== null && allProjectItems[selectedProjectIndex] && (
          <ProjectModal 
            project={allProjectItems[selectedProjectIndex]} 
            projectId={allProjectItems[selectedProjectIndex].id}
            onClose={() => setSelectedProjectIndex(null)} 
          />
        )}
      </AnimatePresence>

      {/* Drag Indicator - All Devices */}
      <motion.div 
        className="flex items-center justify-center gap-3 mt-8 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <div 
          className="bounce-text"
          style={{ 
            filter: "drop-shadow(0 0 8px rgba(56, 189, 248, 0.9)) drop-shadow(0 0 16px rgba(56, 189, 248, 0.7))"
          }}
        >
          <ChevronLeft size={32} style={{ color: "#ffffff" }} />
        </div>
        <span 
          className="font-[KiwiSoda] bounce-text" 
          style={{ 
            color: "#ffffff", 
            fontSize: "20px", 
            letterSpacing: "0.5px"
          }}
        >
          {device === "desktop" ? "Drag tab to explore" : "Scroll tab to explore"}
        </span>
        <div 
          className="bounce-text"
          style={{ 
            filter: "drop-shadow(0 0 8px rgba(56, 189, 248, 0.9)) drop-shadow(0 0 16px rgba(56, 189, 248, 0.7))"
          }}
        >
          <ChevronRight size={32} style={{ color: "#ffffff" }} />
        </div>
      </motion.div>

      {/* Media Modal 2 - displays when an asset is clicked */}
      <AnimatePresence>
        {activeVideo && (
          <MediaModal 
            item={activeVideo} 
            onClose={() => setActiveVideo(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function ProjectDetailModelingMedia({ onMediaClick }: { onMediaClick: (item: MediaItem) => void }) {
  return (
    <section className="space-y-6">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 items-end">
        {MODELING_MEDIA.map((item, index) => (
          <div key={item.src ?? index} className="w-full">
            <AutoAspectTile item={item} onMediaClick={onMediaClick} />
          </div>
        ))}
      </div>
    </section>
  );
}

function ProjectDetailDigitalMedia({ onMediaClick }: { onMediaClick: (item: MediaItem) => void }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 4 }}
      className="scale-75 origin-top"
      style={{ marginLeft: '-20px' }}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Column 1: Shiri designs 1 & 2 stacked */}
        <div className="flex flex-col gap-5">
          <div>
            <AutoAspectTile item={SHIRI_DESIGNS[0]} onMediaClick={onMediaClick} />
          </div>
          <div>
            <AutoAspectTile item={SHIRI_DESIGNS[1]} onMediaClick={onMediaClick} />
          </div>
        </div>

        {/* Column 2: Nabu only */}
        <div className="flex flex-col gap-5">
          <div>
            <AutoAspectTile item={GRAPHIC_MEDIA[0]} onMediaClick={onMediaClick} />
          </div>
        </div>

        {/* Column 3: Video Game Demo, Mina, Everly */}
        <div className="flex flex-col gap-5">
          <div>
            <AutoAspectTile item={GRAPHIC_MEDIA[1]} onMediaClick={onMediaClick} />
          </div>
          <div>
            <AutoAspectTile item={GRAPHIC_MEDIA[2]} onMediaClick={onMediaClick} />
          </div>
          <div>
            <AutoAspectTile item={GRAPHIC_MEDIA[3]} onMediaClick={onMediaClick} />
          </div>
        </div>

        {/* Column 4: Shiri designs 3 & 4 stacked */}
        <div className="flex flex-col gap-5" style={{ marginTop: '0px' }}>
          <div>
            <AutoAspectTile item={SHIRI_DESIGNS[2]} onMediaClick={onMediaClick} />
          </div>
          <div>
            <AutoAspectTile item={SHIRI_DESIGNS[3]} onMediaClick={onMediaClick} />
          </div>
        </div>
      </div>
    </motion.section>
  );
}

function ProjectDetailCameraWork({ onMediaClick }: { onMediaClick: (item: MediaItem) => void }) {
  const [windowWidth, setWindowWidth] = React.useState(typeof window !== "undefined" ? window.innerWidth : 1024);

  React.useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Calculate responsive margins to keep Campaign and Abstract in fixed position
  const getMarginForIndex = (index: number) => {
    if (index === 9) return "-320px"; // Campaign - keep fixed
    if (index === 14) return "-180px"; // Abstract - keep fixed
    if (index === 0) return "40px";
    return "0";
  };

  // Reorder: 5-column grid with Candid on left, Culinary Praise on right with Campaign and Abstract below
  const reorderedMedia = [
    CAMERA_MEDIA[6], // Candid Studio Portrait - Col 0
    CAMERA_MEDIA[0], // NABU 2026 Teaser - Col 1
    CAMERA_MEDIA[1], // NABU 2025 Summer - Col 2
    CAMERA_MEDIA[2], // NABU 2023 Spring - Col 3
    CAMERA_MEDIA[5], // Culinary Praise - Col 4
    null, // Empty - Col 0, Row 2
    null, // Empty - Col 1, Row 2
    null, // Empty - Col 2, Row 2
    null, // Empty - Col 3, Row 2
    CAMERA_MEDIA[3], // Campaign Project - Col 4, Row 2
    null, // Empty - Col 0, Row 3
    null, // Empty - Col 1, Row 3
    null, // Empty - Col 2, Row 3
    null, // Empty - Col 3, Row 3
    CAMERA_MEDIA[4], // Abstract Scene - Col 4, Row 3
  ];

  return (
    <section className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {reorderedMedia.map((item, index) => (
          item ? (
            <div 
              key={item.src ?? index} 
              className="space-y-2"
              style={
                (index === 4 || index === 9 || index === 14) 
                  ? { transform: "scale(0.85)", transformOrigin: "top center", marginTop: index === 9 ? "-320px" : index === 14 ? "-180px" : "0" }
                  : {}
              }
            >
              <AutoAspectTile item={item} onMediaClick={onMediaClick} />
            </div>
          ) : (
            <div key={`empty-${index}`} />
          )
        ))}
      </div>
    </section>
  );
}

function About({ setPage }: { setPage: (page: "home" | "work" | "about" | "contact") => void }) {
  const currentImage = PORTRAIT_IMAGES[0];
  const [windowWidth, setWindowWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1024);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getPhotoMargin = () => {
    if (windowWidth >= 1024) {
      return "0px";
    } else {
      const progress = Math.max(0, (1024 - windowWidth) / (1024 - 320));
      const marginAmount = progress * 120;
      return `${marginAmount}px`;
    }
  };

  return (
  <div className="w-full pt-16 overflow-visible">
      <h2 className="font-[KiwiSoda] text-5xl font-normal bounce-text ml-8 md:ml-32 px-4 mb-8" style={{ color: "#1a1a1a" }}>About</h2>
      {/* Grid wrapper for content */}
      <div className="grid grid-cols-2 gap-4 md:gap-8 items-start max-w-7xl ml-8 md:ml-32 mr-4 md:mr-0 px-4 md:px-0 overflow-visible">
      {/* Left: Text Content */}
      <div className="pt-0 md:pt-8">
        <p className="mt-0 text-sm md:text-base text-slate-700 dark:text-slate-700">
          I am a graphic designer and creative technologist based in the Bay Area with over a decade of experience across diverse mediums. My journey began in 2013 when I created a 3D model in Maya as part of a middle school project, and since then, I've developed a broad skill set spanning digital design, 3D modeling, motion graphics, interactive media, and fabrication. My work reflects a commitment to exploring the intersection of visual design and hands-on creation.
        </p>
        <p className="mt-4 text-sm md:text-base text-slate-700 dark:text-slate-700">
          I'm driven by a genuine passion for making and a curiosity to experiment with new tools and techniques. Rather than chasing recognition, I create because I enjoy the process itself, whether it's designing a brand identity, building interactive hardware, or exploring experimental 3D forms. For me, design is less about the finished product and more about the creative exploration that gets me there.
        </p>
      </div>

      {/* Right: Image */}
      <motion.div
        className="w-56 sm:w-72 md:w-80 h-80 sm:h-[450px] md:h-[520px] origin-center relative border border-white/10 mx-auto"
        style={{ 
          borderRadius: currentImage.frame,
          boxShadow: "0 0 20px rgba(128, 128, 128, 0.6)",
          overflow: "visible",
          marginTop: getPhotoMargin()
        }}
      >
        <motion.img
          src={currentImage.src}
          alt={currentImage.alt}
          className="w-full h-full object-cover"
          style={{ borderRadius: currentImage.frame }}
        />
      </motion.div>
      </div>
    </div>
  );
}

function Contact({ setPage }: { setPage: (page: "home" | "work" | "about" | "contact") => void }) {
  return (
  <div className="w-full min-h-screen flex flex-col items-center pt-60">
      {/* Centered content */}
      <div className="flex flex-col items-center justify-center px-4">
        <h2 className="font-[KiwiSoda] text-6xl md:text-7xl lg:text-8xl font-normal bounce-text text-center" style={{ color: "#1a1a1a" }}>
          Let’s collaborate
        </h2>
        <div className="mt-12 flex gap-4 flex-wrap justify-center">
          <a
            href="mailto:shyon2001@gmail.com"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-sky-500 to-cyan-500 shadow hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 dark:focus:ring-offset-0 text-lg"
          >
            <Mail className="w-6 h-6" /> Email Me
          </a>
          <a
            href="https://www.linkedin.com/in/shyonshiri/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold bg-gradient-to-br from-slate-600/40 via-slate-700/50 to-slate-800/50 border border-slate-500/60 text-white hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 dark:focus:ring-offset-0 text-lg"
          >
            <Linkedin className="w-6 h-6" /> LinkedIn
          </a>
<a
  href="/assets/My_Resume.pdf"
  target="_blank"
  rel="noopener noreferrer"
  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold bg-gradient-to-br from-slate-600/40 via-slate-700/50 to-slate-800/50 border border-slate-500/60 text-white hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 dark:focus:ring-offset-0 text-lg"
>
  <FileText className="w-6 h-6" />
  Resume
</a>
        </div>
      </div>
    </div>
  );
}


