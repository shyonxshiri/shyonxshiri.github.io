import * as React from "react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Briefcase, User, Mail, Linkedin, Instagram } from "lucide-react";

// --- Config ---------------------------------------------------------------

const DIGITAL_MEDIA = [
  {
    id: "3d-modeling",
    title: "3D Modeling",
    tag: "Design & Printing",
    img: "/assets/3D_Modeling_Cover.PNG",
    objectPosition: "50% 50%",
    description:
      "Concept driven 3D work varying from visual renders to fully functional 3D printed prototypes.",
  },
  {
    id: "digital-media",
    title: "Digital Media",
    tag: "Graphic Design",
    img: "/assets/Digital_Media_Cover.jpg",
    objectPosition: "50% 50%",
    description: "Digital branding, logo devlopment, and UI/UX design.",
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

const MODELING_MEDIA = [
  {
    type: "video",
    src: "/assets/Broken_NPC.MP4",
    alt: "Rendered scene depicting GTA in game errors",
  },
  {
    type: "video",
    src: "/assets/Blender_Case_Video.mov",
    alt: "Custom Apple product case prototypes",
  },
  {
    type: "image",
    src: "/assets/Venom.PNG",
  },
];

const GRAPHIC_MEDIA = [
  {
    type: "image",
    src: "/assets/Cover_Art.JPG",
  },
  {
    type: "image",
    src: "/assets/Cover_Art_2.jpg",
  },
  {
    type: "video",
    src: "/assets/Shiri_Video_Game.MP4",
  },
  {
    type: "video",
    src: "/assets/Nabu_Poster_Banner.mov",
  },
];

const CAMERA_MEDIA = [
  {
    type: "video",
    src: "/assets/NABU_PUFFER_AD.mp4",
  },
  {
    type: "video",
    src: "/assets/NABU_SALE_AD.mp4",
  },
];

// --- Handmade Media Collections ------------------------------------------

type MediaItem = {
  type: "image" | "video";
  src: string;
  alt?: string;
};

const PROGRAMMING_MEDIA: MediaItem[] = [
  { type: "image", src: "/assets/New_Radar_Sensor_front.jpg" },
  { type: "image", src: "/assets/New_Radar_Sensor_Back.jpg" },
  { type: "video", src: "/assets/New_Radar_Sensor.mp4" },
  { type: "image", src: "/assets/New_LED_Box_Front.jpg" },
  { type: "image", src: "/assets/New_LED_Box_Back.jpg" },
  { type: "video", src: "/assets/New_LED_Box.mp4" },
];

const SCULPTURES_MEDIA: MediaItem[] = [
  { type: "image", src: "/assets/Shyon_Sculpture.jpg" },
  { type: "image", src: "/assets/Shyon_Glass.JPG" },
];

const MODELS_MEDIA: MediaItem[] = [
  { type: "image", src: "/assets/3D_Models_Cover_Pic.jpg" },
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
    description: "3D printed model design and fabrication.",
    objectPosition: "center 80%", // moved slightly down to avoid cutoff
  },
];

type PortraitTile = {
  src: string;
  alt: string;
  style: React.CSSProperties;
};

const PORTRAIT_IMAGES = [
  { src: "/assets/Shyon_Pic_1.jpg", alt: "Portrait 1" },
  { src: "/assets/Shyon_Pic_2.JPG", alt: "Portrait 2" },
  { src: "/assets/Shyon_Pic_3.JPG", alt: "Portrait 3" },
  { src: "/assets/Shyon_Pic_4.jpg", alt: "Portrait 4" },
  { src: "/assets/Shyon_Pic_5.jpg", alt: "Portrait 5" },
  { src: "/assets/Shyon_Pic_12.jpg", alt: "Portrait 6" },
  { src: "/assets/Shyon_Pic_7.jpg", alt: "Portrait 7" },
  { src: "/assets/Shyon_Pic_8.JPG", alt: "Portrait 8" },
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

// --- Root Component --------------------------------------------------------

export default function PortfolioUniqueNav() {
  const [active] = useActiveSection();

  // Force dark mode once on mount
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  return (
    <div className="relative min-h-screen text-sky-800 dark:text-slate-200 bg-white dark:bg-[#0e1116]">
      {/* Background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden [mask-image:radial-gradient(ellipse_at_center,black,transparent_65%)]">
        <div className="absolute -inset-[10%] opacity-20 dark:opacity-30" />
        <div className="absolute inset-0 hidden dark:block" aria-hidden>
          <div className="absolute -inset-24 blur-3xl opacity-40 bg-[radial-gradient(600px_400px_at_20%_20%,rgba(14,165,233,.25),transparent),radial-gradient(600px_400px_at_80%_80%,rgba(34,211,238,.20),transparent)]" />
        </div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-slate-900/40 border-b border-white/10">
        <div className="w-full px-6 py-3 flex items-center justify-center">
          <img
            src="/assets/Shiri_Logo.png"
            alt="Shiri Logo"
            className="h-20 w-auto object-contain"
          />
        </div>
      </header>

      {/* Main sections */}
      <main className="pb-16">
        <Section id="home" active={active === "home"}>
          <Hero />
        </Section>
        <Section id="work" active={active === "work"}>
          <Work />
        </Section>
        <Section id="about" active={active === "about"}>
          <About />
        </Section>
        <Section id="contact" active={active === "contact"}>
          <Contact />
        </Section>
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
    <section id={id} className="relative py-24 scroll-mt-24">
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

function Hero() {
  return (
    <div className="relative w-full">
      {/* MAIN HERO CONTENT */}
      <div className="relative z-10 w-full grid md:grid-cols-2 gap-10 items-center">
        {/* LEFT: title with pulsating glow */}
        <div>
          <div className="relative inline-block">
            {/* Main title */}
            <motion.h1
              layout
              className="relative z-10 font-[KiwiSoda] font-normal leading-tight text-left"
            >
              {/* Bigger name */}
              <span className="block text-4xl sm:text-5xl md:text-7xl lg:text-8xl">
                Shyon Shiri
              </span>

              {/* Smaller subtitle */}
              <span className="block mt-1 text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-cyan-400">
                Graphic Designer
              </span>
            </motion.h1>

            {/* Pulsating glow under both lines */}
            <motion.div
              className="
                pointer-events-none
                absolute inset-x-[-40px]
                top-6
                h-28
                blur-3xl
                bg-gradient-to-b from-sky-400/80 via-cyan-400/60 to-transparent
              "
              initial={{ opacity: 0.55, scale: 1 }}
              animate={{
                opacity: [0.55, 0.9, 0.55],
                scale: [1, 1.12, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut",
              }}
            />
          </div>
        </div>

        {/* RIGHT: portrait mosaic (unchanged) */}
        <motion.div
          className="relative max-w-xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-wrap gap-4 justify-center">
            {PORTRAIT_IMAGES.slice(0, 8).map((img, i) => {
              const sizeClass = PORTRAIT_SIZES[i % PORTRAIT_SIZES.length];
              const offsetClass = i === 1 ? "mt-8" : "";

              return (
                <div
                  key={img.src}
                  className={`${sizeClass} ${offsetClass} origin-center relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/40 shadow-2xl`}
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full object-cover transition-transform duration-300 ease-out hover:scale-110"
                  />
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function AutoAspectTile({
  item,
}: {
  item: { type: "image" | "video"; src: string; alt?: string };
}) {
  const [ratio, setRatio] = React.useState<number | null>(null);

  const setSafeRatio = (w: number, h: number) => {
    if (!w || !h) return;
    const r = w / h;
    if (Number.isFinite(r) && r > 0) setRatio(r);
  };

  return (
    <motion.article
      className="group rounded-3xl overflow-hidden border border-white/10 bg-slate-950/60 backdrop-blur"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
    >
      {/* The wrapper becomes the SAME shape as the file itself */}
      <div
        className="w-full"
        style={{
          aspectRatio: ratio ?? 16 / 9, // fallback until loaded
        }}
      >
        {item.type === "image" ? (
          <img
            src={item.src}
            alt={item.alt ?? ""}
            loading="lazy"
            className="w-full h-full object-contain block"
            onLoad={(e) => {
              const img = e.currentTarget;
              setSafeRatio(img.naturalWidth, img.naturalHeight);
            }}
          />
        ) : (
          <video
            src={item.src}
            controls
            playsInline
            preload="metadata"
            className="w-full h-full object-contain block"
            onLoadedMetadata={(e) => {
              const v = e.currentTarget;
              setSafeRatio(v.videoWidth, v.videoHeight);
            }}
          />
        )}
      </div>
    </motion.article>
  );
}

function Work() {
  const [category, setCategory] = useState<"digital" | "handmade">("digital");
  const [openProject, setOpenProject] = useState<string | null>(null);
  const [openHandmade, setOpenHandmade] = useState<string | null>(null);

  const tabs = [
    { id: "digital", label: "Design" },
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
    <div className="w-full">
      <div className="flex items-end justify-between gap-6">
        <div>
          <h2 className="font-[KiwiSoda] text-3xl md:text-5xl font-normal">
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
      <AutoAspectTile key={item.src ?? index} item={item} />
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
      <ProjectDetailModelingMedia />
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
      <ProjectDetailDigitalMedia />
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
      <ProjectDetailCameraWork />
    </motion.div>
  )}
</AnimatePresence>
    </div>
  );
}

function ProjectDetailModelingMedia() {
  return (
    <section className="mt-10">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {MODELING_MEDIA.map((item) => (
          <motion.article
            key={item.src}
            className="group rounded-3xl overflow-hidden border border-white/10 bg-slate-950/60 backdrop-blur"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
          >
            {item.type === "image" ? (
              <img
                src={item.src}
                alt={item.alt ?? ""}
                className="w-full h-full object-cover block"
              />
            ) : (
              <div className="aspect-video w-full">
                <video
                  src={item.src}
                  controls
                  className="w-full h-full object-cover rounded-3xl block"
                />
              </div>
            )}
          </motion.article>
        ))}
      </div>
    </section>
  );
}

function ProjectDetailDigitalMedia() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 4 }}
      className="mt-8 space-y-4"
    >
      <div className="grid items-start gap-4 md:grid-cols-3">
        {GRAPHIC_MEDIA.map((item, index) => (
          <AutoAspectTile key={item.src ?? index} item={item} />
        ))}
      </div>
    </motion.section>
  );
}

function ProjectDetailCameraWork() {
  return (
    <section className="mt-8 space-y-6">
      <div className="grid items-start gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {CAMERA_MEDIA.map((item, index) => (
          <AutoAspectTile key={item.src ?? index} item={item} />
        ))}
      </div>
    </section>
  );
}

function About() {
  return (
    <div className="max-w-3xl">
      <h2 className="font-[KiwiSoda] text-3xl md:text-5xl font-normal">About</h2>
      <p className="mt-4 text-slate-600 dark:text-slate-300">
        I am a Bay Area–based graphic designer with a Bachelor of Arts in Studio
        Practice with a focus in Graphic Design. My passion for design stems from
        my fasicnation for creating, whether it&apos;s for visual storytelling or
        personal projects.
      </p>
      <p className="mt-4 text-slate-600 dark:text-slate-300">
        Design is just a short summarization to describe my broad set of
        capabilities. I work across several mediums including UI/UX Design, 3D
        Modeling, Visual Production, Welding, Sculpting, and Coding. Often times
        I take on related roles ranging from photographer to creative director.
      </p>
    </div>
  );
}

function Contact() {
  return (
    <div className="w-full grid md:grid-cols-2 gap-8 items-center">
      <div>
        <h2 className="font-[KiwiSoda] text-3xl md:text-5xl font-normal">
          Let’s collaborate
        </h2>
        <p className="mt-4 text-slate-600 dark:text-slate-300">
          If my work peaks your interest, contact me and we can discuss bringing
          your ideas to fruition.
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


