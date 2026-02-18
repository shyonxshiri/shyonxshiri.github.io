import * as React from "react";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, User, Mail, Linkedin, Instagram, FileText } from "lucide-react";

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

// --- Config ---------------------------------------------------------------

const DIGITAL_MEDIA = [
  {
    id: "3d-modeling",
    title: "3D Rendering",
    tag: "Design & Printing",
    img: "/assets/3D_Modeling_Cover.PNG",
    objectPosition: "50% 50%",
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
    src: "/assets/Shiri_Video_Game.mp4",
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
];

const SHIRI_DESIGNS: MediaItem[] = [
  {
    type: "image",
    src: "/assets/Shiri_Design_1.PNG",
    title: "Clothing Line Mock Up",
  },
  {
    type: "image",
    src: "/assets/Shiri_Design_2.PNG",
    title: "Clothing Line Mock Up",
  },
  {
    type: "image",
    src: "/assets/Shiri_Design_3.PNG",
    title: "Clothing Line Mock Up",
  },
  {
    type: "image",
    src: "/assets/Shiri_Design_4.PNG",
    title: "Clothing Line Mock Up",
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
    title: "Culinary Art",
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
    title: "Distance Radar Sensor", 
    description: "Live demonstration of the Distance Radar Sensor in action, detecting objects and measuring distances in real-time.", 
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
    title: "LED System", 
    description: "Interactive demonstration of the LED System controlling multiple RGB lights with custom programming.", 
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
  { type: "image", src: "/assets/TeaCup.JPG", title: "Tea Spill Decor", description: "A home decor sculpture based on original 3D artwork, finished with precision craftsmanship and premium materials.", year: 2026 },
  { type: "image", src: "/assets/El_Camino.JPG", title: "Chevy El Camino 9:1 scale", description: "A detailed 3D model of a classic El Camino showcasing automotive design and technical modeling expertise.", objectPosition: "center 50%", year: 2026 },
  { type: "image", src: "/assets/3D_Chair_Model.jpg", title: "Phone Stand Chair", description: "A functional chair model that doubles as a phone stand. Designed in Blender with careful attention to geometry and structural form.", objectPosition: "center 50%", year: 2026 },
];

const FABRICATION_MEDIA: Record<string, MediaItem[]> = {
  Programming: PROGRAMMING_MEDIA,
  Sculptures: SCULPTURES_MEDIA,
  "3D Models": MODELS_MEDIA,
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
    title: "Sculptures",
    img: "/assets/Shyon_Sculpture.jpg",
    description:
      "Handmade sculptures exploring form, balance, and physical interaction.",
    objectPosition: "center 45%", // shows more of the lower area
  },
  {
    title: "3D Models",
    img: "/assets/3D_Models_Cover_Pic.jpg",
    description: "3D models designed for printing, functionality, and aesthetics.",
    objectPosition: "center 80%", // moved slightly down to avoid cutoff
  },
];

const PORTRAIT_IMAGES = [
  {
    src: "/assets/Shyon_Pic_1.jpg",
    alt: "Portrait 1",
    frame: "70% 30% 65% 35% / 55% 65% 35% 45%",
  },
  {
    src: "/assets/Shyon_Pic_2.JPG",
    alt: "Portrait 2",
    frame: "35% 65% 25% 75% / 70% 30% 65% 35%",
  },
  {
    src: "/assets/Shyon_Pic_3.JPG",
    alt: "Portrait 3",
    frame: "80% 20% 60% 40% / 45% 75% 25% 55%",
  },
  {
    src: "/assets/Shyon_Pic_5.jpg",
    alt: "Portrait 4",
    frame: "60% 40% 50% 50% / 65% 35% 55% 45%",
  },
  {
    src: "/assets/Shyon_Pic_13.jpg",
    alt: "Portrait 5",
    frame: "28% 72% 40% 60% / 80% 20% 70% 30%",
  },
  {
    src: "/assets/Shyon_Pic_12.jpg",
    alt: "Portrait 6",
    frame: "75% 25% 45% 55% / 35% 85% 15% 65%",
  },
  {
    src: "/assets/Shyon_Pic_7.jpg",
    alt: "Portrait 7",
    frame: "25% 75% 55% 45% / 60% 40% 80% 20%",
  },
  {
    src: "/assets/Shyon_Pic_8.JPG",
    alt: "Portrait 8",
    frame: "85% 15% 70% 30% / 50% 60% 20% 80%",
  },
];

const PORTRAIT_SIZES = ["w-40 h-56", "w-32 h-44", "w-36 h-48", "w-32 h-40"];

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
      className="shimmer-button group relative w-16 h-16 rounded-full bg-gradient-to-br from-slate-600/40 via-slate-700/50 to-slate-800/50 border border-slate-500/60 shadow-[0_8px_30px_rgba(0,180,255,0.25)] backdrop-blur-xl flex items-center justify-center text-white focus:outline-none focus:ring-2 focus:ring-sky-400 transition-all overflow-hidden active:ring-2 active:ring-sky-300"
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

export default function PortfolioUniqueNav() {
  const [currentPage, setCurrentPage] = useState<"home" | "work" | "about" | "contact">("home");

  // Force dark mode once on mount
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  return (
  <div className="relative min-h-screen overflow-x-hidden text-slate-700 dark:text-slate-200 bg-white dark:bg-[#050a15]">
      {/* Solid full-screen background layer */}
      <div className="fixed inset-0 z-0 bg-[#e8e8e8]" aria-hidden />

      {/* Animated Dust Particles Background */}
      <div className="fixed inset-0 z-10 pointer-events-none overflow-hidden">
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
                background: `rgba(0, 0, 0, ${Math.random() * 0.28 + 0.08})`,
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
      </div>

      {/* Fixed Logo - floating above everything */}
      <div className="fixed top-0 left-0 right-0 z-50 pointer-events-none h-24 sm:h-32">
        <motion.button
          onClick={() => {
            triggerHaptic("medium");
            setCurrentPage("home");
          }}
          className="absolute left-1/2 pointer-events-auto cursor-pointer h-16 w-40 sm:h-20 sm:w-52 logo-button"
          style={{ 
            top: "50%",
            outline: "none",
            border: "none",
            boxShadow: "none",
          }}
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.4 }}
          whileTap={{ scale: 1.3 }}
          animate={{ x: "-50%", y: "-50%" }}
          transition={{ type: "spring", stiffness: 200, damping: 25 }}
        >
          {/* Base white logo */}
          <img
            src="/assets/Shiri_Logo.png"
            alt="Shiri Logo White"
            className="absolute inset-0 w-full h-full object-contain"
          />
          <motion.img
            src="/assets/Shiri_Logo_Black.png"
            alt="Shiri Logo Black"
            className="absolute inset-0 w-full h-full object-contain"
            animate={{
              opacity: [0, 0, 1, 1, 0],
            }}
            transition={{
              duration: 8,
              times: [0, 0.45, 0.55, 0.95, 1],
              ease: "easeInOut",
              repeat: Infinity,
            }}
          />
        </motion.button>
      </div>

      {/* Header Container - Bezel style with shadow */}
      <div
        className="fixed top-0 left-0 right-0 z-40 backdrop-blur-sm"
        style={{
          background: "rgba(20, 30, 50, 0.45)",
          borderBottomLeftRadius: "3rem",
          borderBottomRightRadius: "3rem",
          boxShadow: "0 10px 26px rgba(0, 0, 0, 0.75)",
          paddingTop: "max(env(safe-area-inset-top), 1.5rem)",
          paddingBottom: "1.5rem",
          minHeight: "max(7.5rem, calc(env(safe-area-inset-top) + 7.5rem))",
        }}
      />

      {/* Main Content */}
  <main className={`relative z-20 pb-16 pt-28 sm:pt-32 ${currentPage === "contact" ? "overflow-hidden h-screen" : ""}`} style={{ paddingTop: "max(8rem, calc(env(safe-area-inset-top) + 8rem))" }}>
        <AnimatePresence mode="wait">
          {currentPage === "home" && (
            <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
              <Section id="home">
                <Hero setPage={setCurrentPage} />
              </Section>
            </motion.div>
          )}
          {currentPage === "work" && (
            <motion.div key="work" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="max-w-6xl mx-auto px-4">
              <Work setPage={setCurrentPage} />
            </motion.div>
          )}
          {currentPage === "about" && (
            <motion.div key="about" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="max-w-6xl mx-auto px-4">
              <About setPage={setCurrentPage} />
            </motion.div>
          )}
          {currentPage === "contact" && (
            <motion.div key="contact" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="max-w-6xl mx-auto px-4">
              <Contact setPage={setCurrentPage} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
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
    <section id={id} className="relative py-24 scroll-mt-32">
      <div className="absolute inset-0">
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -inset-20 blur-3xl"
          animate={{ opacity: active ? 0.6 : 0.2, scale: active ? 1 : 0.98 }}
          transition={{ type: "spring", stiffness: 80, damping: 20 }}
          style={{
            background:
              "radial-gradient(600px 400px at 20% 20%, rgba(14,165,233,.22), transparent)," +
              "radial-gradient(600px 400px at 80% 80%, rgba(34,211,238,.18), transparent)",
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
  return (
    <div className="relative w-full pt-16 sm:pt-20 md:pt-24">
      {/* MAIN HERO CONTENT: 2-column grid with title left and content right */}
      <div className="relative z-10 w-full grid md:grid-cols-2 gap-8 items-start max-w-6xl mx-auto px-4">
        
        {/* LEFT: Title with pulsating glow */}
        <div className="flex flex-col items-center md:items-start">
          {/* Main title */}
          <motion.h1
            layout
            className="relative z-10 font-[KiwiSoda] font-normal leading-tight bounce-text"
            style={{ color: "#1a1a1a" }}
          >
            {/* Bigger name */}
            <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl">
              Shyon Shiri
            </span>

            {/* Smaller subtitle */}
            <span className="block mt-1 text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-cyan-400 bounce-text">
              Graphic Designer
            </span>
          </motion.h1>
        </div>

        {/* RIGHT: Buttons */}
        <motion.div
          className="flex flex-col gap-4 items-center justify-center mt-6"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          {/* Buttons */}
          <div className="flex flex-row gap-6 items-center justify-center">
            {/* Work Button */}
            <ShimmerButton onClick={() => setPage("work")} icon={<Briefcase className="w-6 h-6" />} />


            {/* About Button */}
            <ShimmerButton onClick={() => setPage("about")} icon={<User className="w-6 h-6" />} />


            {/* Contact Button */}
            <ShimmerButton onClick={() => setPage("contact")} icon={<Mail className="w-6 h-6" />} />

          </div>
        </motion.div>
      </div>
    </div>
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
      className="group relative rounded-3xl overflow-hidden cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      onClick={handleClick}
    >
      <Wrapper
        {...(!shouldDisableLink && item.link && !onMediaClick
          ? {
              href: item.link,
              target: "_blank",
              rel: "noopener noreferrer",
            }
          : {})}
        className="block w-full h-full"
      >
        {/* MEDIA */}
        <div
          className="w-full"
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
    baseWidth = 350;
    baseHeight = baseWidth / aspectRatio;
  }
  
  const maxAvailableWidth = window.innerWidth * 0.55; // Right side of layout
  const maxAvailableHeight = window.innerHeight * 0.7;
  
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
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      style={{ paddingTop: window.innerWidth < 768 ? "8rem" : "6rem", paddingBottom: "2rem", paddingLeft: "1rem", paddingRight: "1rem" }}
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
          gap: window.innerWidth < 1024 ? "1.5rem" : "3rem",
          maxHeight: "calc(100vh - 8rem)",
          flexDirection: window.innerWidth < 1024 ? "column" : "row",
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
        <div className="flex flex-col justify-center items-start flex-shrink-0 w-full lg:w-1/3" style={{ paddingRight: window.innerWidth >= 1024 ? "1.5rem" : "0", maxHeight: "100%", overflow: "hidden" }}>
          {item.title && (
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight break-words">
                {item.title === "Product, not Consumer" ? (
                  <span className="italic">{item.title}</span>
                ) : (
                  item.title
                )}
              </h2>
              {item.year && (
                <p className="text-sm text-white/60 mb-4">{item.year}</p>
              )}
            </div>
          )}
          {item.description && item.title !== "Clothing Line Mock Up" && (
            <p className="text-base sm:text-lg text-white/90 leading-relaxed">
              {item.description}
            </p>
          )}
        </div>

        {/* Right: Media content */}
        <div className="flex items-center justify-center flex-shrink-0 w-full lg:flex-1" style={{ 
          width: window.innerWidth < 1024 ? "100%" : "auto", 
          height: window.innerWidth < 1024 ? "auto" : finalHeight, 
          minHeight: 0, 
          minWidth: 0,
          maxWidth: "100%"
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
              controls
              className="max-w-full max-h-full object-contain rounded-3xl"
              autoPlay
              muted
              playsInline
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
          <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center gap-4" style={{ bottom: aspectRatio < 1 ? "-4rem" : "0" }}>
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

function Work({ setPage }: { setPage: (page: "home" | "work" | "about" | "contact") => void }) {
  const [activeVideo, setActiveVideo] = useState<MediaItem | null>(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  // Combine all projects with their metadata
  const allProjectItems = [
    ...DIGITAL_MEDIA.map((p, idx) => ({
      id: p.id,
      title: p.title,
      description: p.description,
      img: p.img,
      objectPosition: p.objectPosition,
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
      category: "Interactive Media & Fabrication" as const,
      content: (
        <div className="grid items-start gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {(FABRICATION_MEDIA[p.title as keyof typeof FABRICATION_MEDIA] || []).map((item, index) => (
            <div key={item.src ?? index}>
              {item.title && (
                <h4 className="text-white font-semibold text-sm mb-2">
                  {item.title}
                </h4>
              )}
              {item.description && (
                <p className="text-white/70 text-xs mb-3 line-clamp-2">
                  {item.description}
                </p>
              )}
              <AutoAspectTile item={item} onMediaClick={setActiveVideo} />
            </div>
          ))}
        </div>
      ),
    })),
  ];

  return (
    <div className="w-full min-h-screen py-16 sm:py-20">
      {/* Navigation */}
      <div className="flex justify-between items-center px-4 mb-0 -mt-8">
        <div></div>
        <PageNavigation 
          direction="next" 
          pageName="About" 
          onClick={() => setPage("about")}
        />
      </div>

      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-16">
        <h2 className="font-[KiwiSoda] text-4xl sm:text-5xl md:text-6xl font-normal bounce-text mb-4" style={{ color: "#1a1a1a" }}>
          My Work
        </h2>
        <p className="text-slate-700 text-lg max-w-2xl">
          Explore my projects across design systems, digital media, and fabrication work.
        </p>
      </div>

      {/* Accordion-style Projects */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-4">
        {allProjectItems.map((project, index) => (
          <motion.div
            key={project.id}
            className="rounded-xl border border-slate-500/60 overflow-hidden bg-gradient-to-br from-slate-600/40 via-slate-700/50 to-slate-800/50 transition-shadow"
            initial={false}
            animate={{ 
              boxShadow: expandedIndex === index 
                ? "0 0 20px rgba(56, 189, 248, 0.15)" 
                : "0 0 0px rgba(56, 189, 248, 0)"
            }}
            transition={{ duration: 0.2 }}
          >
            {/* Project Header - Clickable */}
            <motion.button
              onClick={() => {
                triggerHaptic("light");
                setExpandedIndex(expandedIndex === index ? null : index);
              }}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="w-full px-4 sm:px-6 py-5 sm:py-6 flex items-center gap-4 text-left transition-colors origin-center"
            >
              {/* Thumbnail */}
              <div className="hidden sm:block w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden flex-shrink-0 border border-white/10">
                <img 
                  src={project.img} 
                  alt={project.title}
                  className="w-full h-full object-cover"
                  style={{ objectPosition: project.objectPosition ?? "center" }}
                />
              </div>

              {/* Project Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="text-lg sm:text-xl font-semibold text-white truncate">
                    {project.title}
                  </h3>
                  <span className="text-xs px-2 py-1 rounded-full bg-sky-500/20 text-sky-300 whitespace-nowrap">
                    {project.category}
                  </span>
                </div>
                <p className="text-sm text-white line-clamp-2">
                  {project.description}
                </p>
              </div>

              {/* Expand Icon */}
              <motion.div
                animate={{ rotate: expandedIndex === index ? 180 : 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="flex-shrink-0 ml-auto"
              >
                <svg 
                  className="w-5 h-5 text-sky-400" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </motion.div>
            </motion.button>

            {/* Expanded Content */}
            <AnimatePresence>
              {expandedIndex === index && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="px-4 sm:px-6 py-8 border-t border-white/10 bg-white/[0.02]">
                    {/* Full Image on Mobile */}
                    <div className="sm:hidden mb-6 rounded-lg overflow-hidden border border-white/10">
                      <img 
                        src={project.img} 
                        alt={project.title}
                        className="w-full object-cover aspect-video"
                        style={{ objectPosition: project.objectPosition ?? "center" }}
                      />
                    </div>

                    {/* Content Grid */}
                    <div className="space-y-6">
                      <div className="bg-white/5 rounded-lg p-4 sm:p-6 space-y-6">
                        {project.content}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {/* Footer Spacing */}
      <div className="mt-20" />

      {/* Media Modal */}
      <AnimatePresence>
        {activeVideo && (
          <MediaModal 
            item={activeVideo} 
            onClose={() => setActiveVideo(null)}
            onNavigate={(category, index) => {
              const categoryMap: Record<string, MediaItem[]> = {
                "MODELING_MEDIA": MODELING_MEDIA,
                "MODELS_MEDIA": MODELS_MEDIA,
              };
              const items = categoryMap[category];
              if (items && items[index]) {
                setActiveVideo(items[index]);
              }
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function ProjectDetailModelingMedia({ onMediaClick }: { onMediaClick: (item: MediaItem) => void }) {
  return (
    <section className="space-y-6">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {MODELING_MEDIA.map((item, index) => (
          <div key={item.src ?? index} className="space-y-2">
            <div>
              <h5 className="text-sm font-semibold text-white">{item.title}</h5>
              {item.description && (
                <p className="text-xs text-white mt-0.5 line-clamp-2">{item.description}</p>
              )}
            </div>
            <div className="rounded-lg overflow-hidden border border-white/10">
              <AutoAspectTile item={item} onMediaClick={onMediaClick} />
            </div>
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
      className="space-y-6"
    >
      <div className="grid lg:grid-cols-2 gap-5">
        {/* Nabu Banner - Takes 2 rows on desktop */}
        <div className="space-y-2">
          <div>
            <h5 className="text-sm font-semibold text-white">{GRAPHIC_MEDIA[0].title}</h5>
            {GRAPHIC_MEDIA[0].description && (
              <p className="text-xs text-white mt-0.5 line-clamp-2">{GRAPHIC_MEDIA[0].description}</p>
            )}
          </div>
          <div className="rounded-lg overflow-hidden border border-white/10">
            <AutoAspectTile item={GRAPHIC_MEDIA[0]} onMediaClick={onMediaClick} />
          </div>
        </div>

        {/* Right column wrapper for stacked items */}
        <div className="flex flex-col gap-5">
          {/* Video Game Demo */}
          <div className="space-y-2">
            <div>
              <h5 className="text-sm font-semibold text-white">{GRAPHIC_MEDIA[1].title}</h5>
              {GRAPHIC_MEDIA[1].description && (
                <p className="text-xs text-white mt-0.5 line-clamp-2">{GRAPHIC_MEDIA[1].description}</p>
              )}
            </div>
            <div className="rounded-lg overflow-hidden border border-white/10">
              <AutoAspectTile item={GRAPHIC_MEDIA[1]} onMediaClick={onMediaClick} />
            </div>
          </div>

          {/* Mina Website */}
          <div className="space-y-2">
            <div>
              <h5 className="text-sm font-semibold text-white">{GRAPHIC_MEDIA[2].title}</h5>
              {GRAPHIC_MEDIA[2].description && (
                <p className="text-xs text-white mt-0.5 line-clamp-2">{GRAPHIC_MEDIA[2].description}</p>
              )}
            </div>
            <div className="rounded-lg overflow-hidden border border-white/10">
              <AutoAspectTile item={GRAPHIC_MEDIA[2]} onMediaClick={onMediaClick} />
            </div>
          </div>
        </div>
      </div>

      {/* Shiri Designs */}
      <div className="space-y-3">
        <h5 className="text-sm font-semibold text-white">Design Concepts</h5>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {SHIRI_DESIGNS.map((item, index) => (
            <div key={item.src ?? index} className="space-y-1">
              <div className="rounded-lg overflow-hidden border border-white/10">
                <AutoAspectTile item={item} onMediaClick={onMediaClick} />
              </div>
              {item.title && (
                <p className="text-xs text-white line-clamp-1">{item.title}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

function ProjectDetailCameraWork({ onMediaClick }: { onMediaClick: (item: MediaItem) => void }) {
  return (
    <section className="space-y-6">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {CAMERA_MEDIA.map((item, index) => (
          <div key={item.src ?? index} className="space-y-2">
            <div>
              <h5 className="text-sm font-semibold text-white">{item.title}</h5>
              {item.description && (
                <p className="text-xs text-white mt-0.5 line-clamp-2">{item.description}</p>
              )}
            </div>
            <div className="rounded-lg overflow-hidden border border-white/10">
              <AutoAspectTile item={item} onMediaClick={onMediaClick} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function About({ setPage }: { setPage: (page: "home" | "work" | "about" | "contact") => void }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(4); // Start with Pic 5 (index 4)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % PORTRAIT_IMAGES.length);
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(interval);
  }, []);

  const currentImage = PORTRAIT_IMAGES[currentImageIndex];

  return (
  <div className="w-full pt-16 sm:pt-20">
      {/* Navigation */}
      <div className="flex justify-between items-center px-4 mb-0 -mt-8">
        <PageNavigation 
          direction="prev" 
          pageName="My Work" 
          onClick={() => setPage("work")}
        />
        <PageNavigation 
          direction="next" 
          pageName="Contact" 
          onClick={() => setPage("contact")}
        />
      </div>

      {/* Grid wrapper for content */}
      <div className="grid md:grid-cols-2 gap-8 items-center max-w-5xl mx-auto px-4 md:px-0">
      {/* Left: Text Content */}
      <div>
  <h2 className="font-[KiwiSoda] text-3xl md:text-5xl font-normal bounce-text" style={{ color: "#1a1a1a" }}>About</h2>
        <p className="mt-4 text-slate-700 dark:text-slate-700">
          I am a graphic designer and programmer based in the Bay Area, passionate about creating through several mediums whether it be for work or personal projects.
        </p>
      </div>

      {/* Right: Image Carousel */}
      <motion.div
        className="relative mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="relative w-full flex items-center justify-center">
          <motion.div
            className="relative"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <motion.div
              className="w-56 sm:w-72 md:w-80 h-80 sm:h-[450px] md:h-[520px] origin-center relative overflow-hidden border border-white/10 bg-slate-900/40 shadow-2xl"
              animate={{ borderRadius: currentImage.frame }}
              transition={{ duration: 1.2 }}
              style={{ borderRadius: currentImage.frame }}
            >
              <AnimatePresence mode="sync">
                <motion.img
                  key={currentImageIndex}
                  src={currentImage.src}
                  alt={currentImage.alt}
                  className="w-full h-full object-cover absolute inset-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.2 }}
                />
              </AnimatePresence>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
      </div>
    </div>
  );
}

function Contact({ setPage }: { setPage: (page: "home" | "work" | "about" | "contact") => void }) {
  return (
  <div className="w-full pt-24 sm:pt-28 min-h-screen flex flex-col overflow-hidden">
      {/* Navigation */}
      <div className="flex justify-between items-center px-4 mb-0 -mt-8">
        <PageNavigation 
          direction="prev" 
          pageName="About" 
          onClick={() => setPage("about")}
        />
        <div></div>
      </div>

      {/* Centered content */}
      <div className="flex-1 flex flex-col items-center justify-start px-4 pt-32">
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
            href="https://www.instagram.com/shyonshiri?igsh=MWNhdWY4dGRoajVqdg%3D%3D&utm_source=qr"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold bg-gradient-to-br from-slate-600/40 via-slate-700/50 to-slate-800/50 border border-slate-500/60 text-white hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 dark:focus:ring-offset-0 text-lg"
          >
            <Instagram className="w-6 h-6" /> Instagram
          </a>
<a
  href="/Shyon_Shiri_Resume_2026.pdf"
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

// --- Buttons --------------------------------------------------------------

function PrimaryButton({
  children,
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type={rest.type ?? "button"}
      {...rest}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-white bg-gradient-to-r from-sky-500 to-cyan-500 shadow hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 dark:focus:ring-offset-0"
    >
      {children}
    </button>
  );
}


