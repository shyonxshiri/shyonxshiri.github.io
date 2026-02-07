import * as React from "react";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Briefcase, User, Mail, Linkedin, Instagram, FileText } from "lucide-react";

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
  },
  {
    type: "video",
    src: "/assets/Blender_Case_Video.mov",
    poster: "/assets/Blender_Case.jpg",
    title: "Custom Apple Product Case Prototypes",
    description: "Unique 3D designed Apple product case prototypes, developed using Blender.",
    aspectRatio: 16 / 9,
  },
  {
    type: "image",
    src: "/assets/Venom.PNG",
    title: "Rendered 3D Model",
    description: "A high-quality 3D rendered movie character model showcasing detailed modeling and texturing techniques made using Blender",
  },
];

const GRAPHIC_MEDIA: MediaItem[] = [
  {
    type: "video",
    src: "/assets/Nabu_Poster_Banner.mp4",
    poster: "/assets/Nabu_Poster_Banner.jpg",
    title: "NABU Promotional Video",
    description: "A dynamic promotional video for NABU clothing, crafted with professional animation and transitions in Adobe After Effects.",
  },
  {
    type: "video",
    src: "/assets/Shiri_Video_Game.mp4",
    poster: "/assets/Shiri_VIdeo_Game.jpg",
    title: "Video Game Demo",
    description: "A video created by animating and assembling a collection of images in Adobe After Effects.",
  },
  {
    type: "image",
    src: "/assets/Mina_Website.png",
    title: "UI/UX Web Development",
    description: "Full-stack website design and development including React frontend, responsive interface design, backend integration, and deployment optimization.",
    link: "https://minasech.net"
  },
];

const SHIRI_DESIGNS: MediaItem[] = [
  {
    type: "image",
    src: "/assets/Shiri_Design_1.PNG",
    title: "Clothing Line Design 1",
    description: "Design exploration 1",
  },
  {
    type: "image",
    src: "/assets/Shiri_Design_2.PNG",
    title: "Clothing Line Design 2",
    description: "Design exploration 2",
  },
  {
    type: "image",
    src: "/assets/Shiri_Design_3.PNG",
    title: "Clothing Line Design 3",
    description: "Design exploration 3",
  },
  {
    type: "image",
    src: "/assets/Shiri_Design_4.PNG",
    title: "Clothing Line Design 4",
    description: "Design exploration 4",
  },
];

const CAMERA_MEDIA: MediaItem[] = [
  {
    type: "video",
    src: "/assets/NABU_PUFFER_AD.mp4",
    poster: "/assets/NABU_Puffer_AD.jpg",
    title: "NABU Promotional Video",
    description: "Professional promotional video for NABU's puffer jacket collection, shot and edited with cinematic quality.",
    aspectRatio: 9 / 16,
  },
  {
    type: "video",
    src: "/assets/NABU_SALE_AD.mp4",
    poster: "/assets/NABU_SALE_AD.jpg",
    title: "NABU Promotional Video",
    description: "Engaging promotional content showcasing NABU's latest collection and seasonal offerings.",
    aspectRatio: 9 / 16,
  },
  {
    type: "image",
    src: "/assets/Stevie_Pic.JPG",
    title: "NABU Spring 2023 Collection",
    description: "Professional portrait photography showcasing design systems and visual aesthetics.",
  },
  {
    type: "image",
    src: "/assets/Max_Pic.JPG",
    title: "Candid Studio Portrait",
    description: "A vibrant studio portrait capturing authentic moments and natural expressions with professional lighting.",
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
  relatedImages?: { src: string; title: string }[];
};

const PROGRAMMING_MEDIA: MediaItem[] = [
  { 
    type: "video", 
    src: "/assets/New_Radar_Sensor.mp4", 
    title: "Distance Radar Sensor Functionality", 
    description: "Live demonstration of the Distance Radar Sensor in action, detecting objects and measuring distances in real-time.", 
    poster: "/assets/New_Radar_Sensor_front.jpg", 
    aspectRatio: 9 / 16,
    relatedImages: [
      { src: "/assets/New_Radar_Sensor_front.jpg", title: "Front View" },
      { src: "/assets/New_Radar_Sensor_Back.jpg", title: "Back View" }
    ]
  },
  { 
    type: "video", 
    src: "/assets/New_LED_Box.mp4", 
    title: "LED System Functionality", 
    description: "Interactive demonstration of the LED System controlling multiple RGB lights with custom programming.", 
    poster: "/assets/New_LED_Box_Front.jpg", 
    aspectRatio: 9 / 16,
    relatedImages: [
      { src: "/assets/New_LED_Box_Front.jpg", title: "Front View" },
      { src: "/assets/New_LED_Box_Back.jpg", title: "Back View" }
    ]
  }, 
];

const SCULPTURES_MEDIA: MediaItem[] = [
  { type: "image", src: "/assets/Shyon_Sculpture.jpg", title: "Product, not Consumer", description: "Hand-fabricated through metalworking techniques — welding, grinding, sanding, and surface finishing — this steel sculpture references consumer tech culture by evoking an Apple Store-style display with a metal hand and cuff, symbolizing the chokehold and sense of confinement technology can impose on people.", aspectRatio: 3 / 4 },
  { type: "image", src: "/assets/Shyon_Glass.JPG", title: "Custom Designed Vase", description: "A custom-designed glass vase combining artistic form with functional design, showcasing craftsmanship.", aspectRatio: 3 / 4 },
];

const MODELS_MEDIA: MediaItem[] = [
  { type: "image", src: "/assets/3D_Models_Cover_Pic.jpg", title: "16:1 Scale Glow in the Dark Lego Skeleton", description: "A meticulously assembled 1:6 scale LEGO skeleton featuring glow-in-the-dark elements, combining building precision with creative design.", aspectRatio: 16 / 9, objectPosition: "center 70%" },
  { type: "image", src: "/assets/3D_Chair_Model.jpg", title: "3D Modeled Chair", description: "A functional chair model that doubles as a phone stand. Designed in Blender with careful attention to geometry and structural form.", objectPosition: "center 50%" },
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

type PortraitTile = {
  src: string;
  alt: string;
  style: React.CSSProperties;
};

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

const sections = [
  { id: "home", label: "Home", icon: Home },
  { id: "work", label: "Work", icon: Briefcase },
  { id: "about", label: "About", icon: User },
  { id: "contact", label: "Contact", icon: Mail },
] as const;

// --- Hooks ----------------------------------------------------------------

function useActiveSection() {
  const [active, setActive] = useState<(typeof sections)[number]["id"]>(
    sections[0].id
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id as any);
        });
      },
      { threshold: 0.6 }
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return [active] as const;
}

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

  return (
    <motion.button
      ref={buttonRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className="group relative w-16 h-16 rounded-full bg-gradient-to-br from-white/15 via-sky-400/20 to-cyan-300/20 border border-white/20 shadow-[0_8px_30px_rgba(56,189,248,0.25)] backdrop-blur-xl flex items-center justify-center text-white focus:outline-none focus:ring-2 focus:ring-sky-400 transition-all overflow-hidden"
      whileHover={{ scale: 1.12 }}
      whileTap={{ scale: 0.94 }}
    >
      <span className="absolute -inset-1 rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.45),transparent_55%)] opacity-70" />
      <span 
        className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: isHovering 
            ? `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(125,211,252,0.6), transparent 55%)`
            : `radial-gradient(circle at 60% 20%, rgba(125,211,252,0.6), transparent 55%)`
        }}
      />
      <span className="absolute inset-0 rounded-full ring-1 ring-white/20 group-hover:ring-sky-200/40 transition-all" />
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
      onClick={onClick}
      className="cursor-pointer focus:outline-none focus:ring-2 focus:ring-sky-400 rounded-lg transition-all"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <h3 className="font-[KiwiSoda] text-lg md:text-xl font-normal bounce-text flex items-center gap-2 whitespace-nowrap px-4 py-2">
        {!isNext && "← "}
        {pageName}
        {isNext && " →"}
      </h3>
    </motion.button>
  );
}

// --- Root Component --------------------------------------------------------

export default function PortfolioUniqueNav() {
  const [active] = useActiveSection();
  const [currentPage, setCurrentPage] = useState<"home" | "work" | "about" | "contact">("home");

  // Force dark mode once on mount
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  return (
  <div className="relative min-h-screen overflow-x-hidden text-sky-800 dark:text-slate-200 bg-white dark:bg-[#050a15]">
      {/* Solid full-screen background layer */}
      <div className="fixed inset-0 z-0 bg-[#050a15]" aria-hidden />

      {/* Animated Dust Particles Background */}
      <div className="fixed inset-0 z-10 pointer-events-none overflow-hidden">
        {[...Array(80)].map((_, i) => {
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
          const phase = Math.random() * Math.PI * 2;
          
          return (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                background: `rgba(150, 220, 255, ${Math.random() * 0.28 + 0.08})`,
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
        <button
          onClick={() => setCurrentPage("home")}
          className="absolute left-1/2 pointer-events-auto cursor-pointer focus:outline-none focus:ring-2 focus:ring-sky-400 rounded-lg h-16 w-40 sm:h-20 sm:w-52"
          style={{ 
            top: "50%",
            transform: "translate(-50%, -50%) scale(1)",
            transition: "transform 0.3s ease, filter 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translate(-50%, -50%) scale(1.4)";
            e.currentTarget.style.filter = "drop-shadow(0 0 12px rgba(56, 189, 248, 0.5))";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translate(-50%, -50%) scale(1)";
            e.currentTarget.style.filter = "drop-shadow(0 0 0px rgba(56, 189, 248, 0))";
          }}
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
        </button>
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
  <main className="relative z-20 pb-16 pt-28 sm:pt-32" style={{ paddingTop: "max(8rem, calc(env(safe-area-inset-top) + 8rem))" }}>
        <AnimatePresence mode="wait">
          {currentPage === "home" && (
            <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
              <Section id="home" active={active === "home"}>
                <Hero setPage={setCurrentPage} />
              </Section>
            </motion.div>
          )}
          {currentPage === "work" && (
            <motion.div key="work" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="max-w-6xl mx-auto px-4">
              <Work setPage={setCurrentPage} />
            </motion.div>
          )}
          {currentPage === "about" && (
            <motion.div key="about" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="max-w-6xl mx-auto px-4">
              <About setPage={setCurrentPage} />
            </motion.div>
          )}
          {currentPage === "contact" && (
            <motion.div key="contact" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="max-w-6xl mx-auto px-4">
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
  active,
}: {
  id: string;
  children: React.ReactNode;
  active: boolean;
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
  
  return (
    <motion.article
      ref={containerRef}
      className={`group relative rounded-3xl overflow-hidden cursor-pointer ${
        isShiriDesign ? "" : "border border-white/10 bg-slate-950/60 backdrop-blur"
      }`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      onClick={handleClick}
    >
      <Wrapper
        {...(item.link && !onMediaClick
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
              style={{ objectPosition: item.objectPosition ?? "center" }}
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

        {/* Title Overlay */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl bg-gradient-to-b from-black/60 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-start justify-center pt-4">
          <h4 className="text-xs font-medium text-white text-center px-3 line-clamp-2">
            {item.title === "Product, not Consumer" ? (
              <span className="italic">{item.title}</span>
            ) : (
              item.title
            )}
          </h4>
        </div>
      </Wrapper>
    </motion.article>
  );
}

function MediaModal({ 
  item, 
  onClose 
}: { 
  item: MediaItem;
  onClose: () => void;
}) {
  const [showCarousel, setShowCarousel] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  const handlePrevImage = () => {
    if (item.relatedImages) {
      setCurrentImageIndex((prev) => (prev - 1 + item.relatedImages!.length) % item.relatedImages!.length);
    }
  };

  const handleNextImage = () => {
    if (item.relatedImages) {
      setCurrentImageIndex((prev) => (prev + 1) % item.relatedImages!.length);
      if (currentImageIndex === 0) setShowCarousel(true);
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      style={{ paddingTop: "6rem" }}
    >
      <motion.div
        className="relative bg-slate-900/95 border border-white/10 rounded-3xl w-full max-w-3xl"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/60 backdrop-blur hover:bg-black/80 flex items-center justify-center text-white transition"
        >
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <div className="flex flex-col p-6">
          {/* Media with arrows on sides */}
          <div className="flex items-center justify-center gap-6 mb-6">
            {/* Left Arrow */}
            {item.relatedImages && item.relatedImages.length > 0 && (
              <button
                onClick={handlePrevImage}
                className="flex-shrink-0 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
            )}

            {/* Video/Image Display */}
            <div className="flex-1 flex items-center justify-center bg-black/40 rounded-2xl min-h-96">
              {showCarousel && item.relatedImages && item.relatedImages.length > 0 ? (
                // Show carousel images
                <motion.img
                  key={currentImageIndex}
                  src={item.relatedImages[currentImageIndex].src}
                  alt={item.relatedImages[currentImageIndex].title}
                  className="max-w-full max-h-96 object-contain"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
              ) : item.type === "image" ? (
                <img
                  src={item.src}
                  alt={item.title ?? ""}
                  className="max-w-full max-h-96 object-contain"
                />
              ) : (
                <video
                  src={item.src}
                  controls
                  className="max-w-full max-h-96 object-contain"
                  autoPlay
                />
              )}
            </div>

            {/* Right Arrow */}
            {item.relatedImages && item.relatedImages.length > 0 && (
              <button
                onClick={handleNextImage}
                className="flex-shrink-0 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            )}
          </div>

          {/* Image Counter */}
          {showCarousel && item.relatedImages && item.relatedImages.length > 0 && (
            <div className="text-center mb-4 text-sm text-slate-400">
              {item.relatedImages[currentImageIndex].title}
            </div>
          )}

          {/* Bottom: Title and Description */}
          <div className="border-t border-white/10 pt-6 space-y-3">
            {item.title && (
              <h3 className="text-lg font-semibold text-white">
                {item.title === "Product, not Consumer" ? (
                  <span className="italic">{item.title}</span>
                ) : (
                  item.title
                )}
              </h3>
            )}
            {item.description && (
              <p className="text-sm text-slate-300">
                {item.description}
              </p>
            )}
            {item.link && (
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold rounded-lg transition"
              >
                Visit Website
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function Work({ setPage }: { setPage: (page: "home" | "work" | "about" | "contact") => void }) {
  const [activeVideo, setActiveVideo] = useState<MediaItem | null>(null);
  const [category, setCategory] = useState<"digital" | "handmade">("digital");
  const [openProject, setOpenProject] = useState<string | null>(null);
  const [openHandmade, setOpenHandmade] = useState<string | null>(null);

  const tabs = [
    { id: "digital", label: "Design Systems & Visuals" },
    { id: "handmade", label: "Interactive Media & Fabrication" },
  ] as const;

  const handleProjectClick = (id: string) => {
    setOpenProject((prev) => (prev === id ? null : id));
    setOpenHandmade(null); // keep behavior clean
  };

  const handleHandmadeClick = (title: string) => {
    setOpenHandmade((prev) => (prev === title ? null : title));
    setOpenProject(null); // keep behavior clean
  };

  return (
  <div className="w-full pt-12 sm:pt-16 relative">
      {/* Navigation */}
      <div className="absolute top-0 left-0 right-0 flex justify-between items-center px-4 mb-8">
        <div></div>
        <PageNavigation 
          direction="next" 
          pageName="About" 
          onClick={() => setPage("about")}
        />
      </div>

      <div className="flex items-end justify-between gap-6">
        <div>
          <h2 className="font-[KiwiSoda] text-3xl md:text-5xl font-normal bounce-text">
            My Work
          </h2>
        </div>
      </div>

      <div className="mt-6 flex gap-2">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => {
              setCategory(t.id as any);
              setOpenProject(null);
              setOpenHandmade(null); // ✅ important reset
            }}
            className={`px-3 py-1.5 rounded-xl text-sm border transition ${
              category === t.id
                ? "bg-gradient-to-r from-sky-500 to-cyan-500 text-white border-transparent"
                : "bg-white/60 dark:bg-white/5 border-white/10 hover:bg-white/70 dark:hover:bg-white/10"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* CARDS GRID (ONLY CARDS LIVE INSIDE THIS GRID) */}
      <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {category === "digital" &&
          DIGITAL_MEDIA.map((p) => {
            const isActive = openProject === p.id;
            return (
              <motion.article
                key={p.id}
                onClick={() => handleProjectClick(p.id)}
                className={`cursor-pointer group rounded-2xl overflow-hidden bg-white/60 dark:bg-white/5 backdrop-blur hover:shadow-xl hover:-translate-y-0.5 transition border ${
                  isActive ? "border-sky-400 glow-ring" : "border-white/10"
                }`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
              >
                <div className="relative aspect-video">
                  <img
                    src={p.img}
                    alt={p.title}
                    className="w-full h-full object-cover"
                    style={{ objectPosition: p.objectPosition ?? "50% 50%" }}
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg">{p.title}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300">
                    {p.description}
                  </p>
                </div>
              </motion.article>
            );
          })}

        {category === "handmade" &&
          HANDMADE_WORKS.map((p) => {
            const isActive = openHandmade === p.title;

            return (
              <motion.article
                key={p.title}
                onClick={() => handleHandmadeClick(p.title)}
                className={`cursor-pointer group rounded-2xl overflow-hidden bg-white/60 dark:bg-white/5 
                  backdrop-blur hover:shadow-xl hover:-translate-y-0.5 transition border 
                  ${isActive ? "border-sky-400 glow-ring" : "border-white/10"}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
              >
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={p.img}
                    alt={p.title}
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{ objectPosition: p.objectPosition || "center" }}
                  />
                </div>

                <div className="p-4">
                  <h3 className="font-semibold text-lg">{p.title}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300">
                    {p.description}
                  </p>
                </div>
              </motion.article>
            );
          })}
      </div>


<AnimatePresence initial={false}>
  {category === "handmade" && openHandmade && (
  <section className="mt-10">
  <div className="grid items-start gap-5 sm:grid-cols-2 lg:grid-cols-3">
    {(FABRICATION_MEDIA[openHandmade] || []).map((item, index) => (
      <AutoAspectTile key={item.src ?? index} item={item} onMediaClick={setActiveVideo} />
    ))}
  </div>
</section>
)}
</AnimatePresence>

      <AnimatePresence mode="wait" initial={false}>
  {category === "digital" && openProject === "3d-modeling" && (
    <motion.div
      key="digital-3d"
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="overflow-hidden"
    >
      <ProjectDetailModelingMedia onMediaClick={setActiveVideo} />
    </motion.div>
  )}

  {category === "digital" && openProject === "digital-media" && (
    <motion.div
      key="digital-graphic"
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="overflow-hidden"
    >
      <ProjectDetailDigitalMedia onMediaClick={setActiveVideo} />
    </motion.div>
  )}

  {category === "digital" && openProject === "camera-work" && (
    <motion.div
      key="digital-camera"
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="overflow-hidden"
    >
      <ProjectDetailCameraWork onMediaClick={setActiveVideo} />
    </motion.div>
  )}
</AnimatePresence>

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
    <section className="mt-10">
      <div className="grid items-start gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {MODELING_MEDIA.map((item, index) => (
          <AutoAspectTile key={item.src ?? index} item={item} onMediaClick={onMediaClick} />
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
      className="mt-8"
    >
      <div className="grid items-start gap-4 grid-cols-1 md:grid-cols-6">
        {/* Nabu Banner - Column 1, spans 2 rows */}
        <div className="md:col-span-2 md:row-span-2">
          <AutoAspectTile item={GRAPHIC_MEDIA[0]} onMediaClick={onMediaClick} />
        </div>
        
        {/* Video Game Demo - Column 2, Row 1 */}
        <div className="md:col-span-2">
          <AutoAspectTile item={GRAPHIC_MEDIA[1]} onMediaClick={onMediaClick} />
        </div>
        
        {/* Mina Website - Column 3, Row 1 */}
        <div className="md:col-span-2">
          <AutoAspectTile item={GRAPHIC_MEDIA[2]} onMediaClick={onMediaClick} />
        </div>
        
        {/* Shiri Designs 2x2 Grid - Columns 2-3, Row 2 (bottom half) */}
        <div className="md:col-span-4 grid gap-4 grid-cols-2">
          {SHIRI_DESIGNS.map((item, index) => (
            <AutoAspectTile key={item.src ?? index} item={item} onMediaClick={onMediaClick} />
          ))}
        </div>
      </div>
    </motion.section>
  );
}

function ProjectDetailCameraWork({ onMediaClick }: { onMediaClick: (item: MediaItem) => void }) {
  return (
    <section className="mt-8 space-y-6">
      <div className="grid items-start gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {CAMERA_MEDIA.map((item, index) => (
          <AutoAspectTile key={item.src ?? index} item={item} onMediaClick={onMediaClick} />
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
  <div className="w-full grid md:grid-cols-2 gap-8 items-center max-w-5xl mx-auto pt-16 sm:pt-20 relative">
      {/* Navigation */}
      <div className="absolute top-0 left-0 right-0 flex justify-between items-center px-4 mb-8">
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

      {/* Left: Text Content */}
      <div>
  <h2 className="font-[KiwiSoda] text-3xl md:text-5xl font-normal bounce-text">About</h2>
        <p className="mt-4 text-slate-600 dark:text-slate-300">
          I am a Bay Area–based graphic designer with a Bachelor of Arts in Studio
          Practice with a focus in Graphic Design. My passion for design stems from
          my fasicnation for creating, whether it&apos;s for visual storytelling or
          personal projects.
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
  );
}

function Contact({ setPage }: { setPage: (page: "home" | "work" | "about" | "contact") => void }) {
  return (
  <div className="w-full grid md:grid-cols-2 gap-8 items-center pt-24 sm:pt-28 relative">
      {/* Navigation */}
      <div className="absolute top-0 left-0 right-0 flex justify-between items-center px-4 mb-8">
        <PageNavigation 
          direction="prev" 
          pageName="About" 
          onClick={() => setPage("about")}
        />
        <div></div>
      </div>

      <div>
  <h2 className="font-[KiwiSoda] text-3xl md:text-5xl font-normal bounce-text">
          Let’s collaborate
        </h2>
        <p className="mt-4 text-slate-600 dark:text-slate-300">
        </p>
        <div className="mt-6 flex gap-3 flex-wrap">
          <a
            href="mailto:shyon2001@gmail.com"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-white bg-gradient-to-r from-sky-500 to-cyan-500 shadow hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 dark:focus:ring-offset-0"
          >
            <Mail className="w-5 h-5" /> Email Me
          </a>
          <a
            href="https://www.linkedin.com/in/shyonshiri/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl font-semibold border border-slate-200/60 dark:border-white/10 hover:bg-slate-900/5 dark:hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-400 dark:focus:ring-offset-0"
          >
            <Linkedin className="w-5 h-5" /> LinkedIn
          </a>
          <a
            href="https://www.instagram.com/shyonshiri?igsh=MWNhdWY4dGRoajVqdg%3D%3D&utm_source=qr"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl font-semibold border border-slate-200/60 dark:border-white/10 hover:bg-slate-900/5 dark:hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-400 dark:focus:ring-offset-0"
          >
            <Instagram className="w-5 h-5" /> Instagram
          </a>
<a
  href="/Shyon_Shiri_Resume_2026.pdf"
  target="_blank"
  rel="noopener noreferrer"
  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl font-semibold
             border border-slate-200/60 dark:border-white/10
             hover:bg-slate-900/5 dark:hover:bg-white/10
             focus:outline-none focus:ring-2 focus:ring-offset-2
             focus:ring-slate-400 dark:focus:ring-offset-0"
>
  <FileText className="w-5 h-5" />
  Resume
</a>
        </div>
      </div>
      <div className="rounded-3xl border border-white/10 p-6 bg-white/60 dark:bg-white/5 backdrop-blur">
        <form className="grid gap-4">
          <label className="grid gap-2 text-sm">
            <span>Name</span>
            <input
              className="px-3 py-2 rounded-lg bg-transparent border border-slate-300/50 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-sky-500"
              placeholder="Your name"
            />
          </label>
          <label className="grid gap-2 text-sm">
            <span>Email</span>
            <input
              type="email"
              className="px-3 py-2 rounded-lg bg-transparent border border-slate-300/50 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-sky-500"
              placeholder="you@domain.com"
            />
          </label>
          <label className="grid gap-2 text-sm">
            <span>Message</span>
            <textarea
              rows={5}
              className="px-3 py-2 rounded-lg bg-transparent border border-slate-300/50 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-sky-500"
              placeholder="Project goals, timeline, budget…"
            />
          </label>
          <PrimaryButton type="submit">Send</PrimaryButton>
        </form>
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

function GhostButton({
  children,
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type={rest.type ?? "button"}
      {...rest}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl font-semibold border border-slate-200/60 dark:border-white/10 hover:bg-slate-900/5 dark:hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-400 dark:focus:ring-offset-0"
    >
      {children}
    </button>
  );
}


