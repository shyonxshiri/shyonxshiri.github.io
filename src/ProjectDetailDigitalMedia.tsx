import React from "react";
import { motion } from "framer-motion";

interface MediaItem {
  type: "image" | "video";
  src: string;
  title: string;
  description?: string;
  aspectRatio?: number;
  objectPosition?: string;
  year?: number;
  link?: string;
  relatedImages?: { src: string; title: string }[];
  relatedLinks?: { category: string; index: number; title: string }[];
  id?: string;
  alt?: string;
  scale?: number;
  poster?: string;
  removeBackground?: boolean;
}

interface AutoAspectTileProps {
  item: MediaItem;
  onMediaClick?: (item: MediaItem) => void;
}

// Placeholder AutoAspectTile - actual implementation in App.tsx
const AutoAspectTile: React.FC<AutoAspectTileProps> = ({ item, onMediaClick }) => (
  <div className={`w-full rounded-2xl overflow-hidden cursor-pointer ${item.removeBackground ? 'bg-transparent' : 'bg-gray-900'}`} onClick={() => onMediaClick?.(item)}>
    {item.type === "image" ? (
      <img src={item.src} alt={item.alt ?? item.title} className="w-full h-auto object-cover rounded-2xl" />
    ) : (
      <video src={item.src} className="w-full h-auto object-cover rounded-2xl" />
    )}
  </div>
);

// Digital Media Data
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
];

const SHIRI_DESIGNS: MediaItem[] = [
  {
    type: "image",
    src: "/assets/Shiri_Design_1.PNG",
    title: "Clothing Line Mock Up",
    year: 2024,
    removeBackground: true,
  },
  {
    type: "image",
    src: "/assets/Shiri_Design_2.PNG",
    title: "Clothing Line Mock Up",
    year: 2024,
    removeBackground: true,
  },
  {
    type: "image",
    src: "/assets/Shiri_Design_3.PNG",
    title: "Clothing Line Mock Up",
    year: 2024,
    removeBackground: true,
  },
  {
    type: "image",
    src: "/assets/Shiri_Design_4.PNG",
    title: "Clothing Line Mock Up",
    year: 2024,
    removeBackground: true,
  },
];

interface ProjectDetailDigitalMediaProps {
  onMediaClick: (item: MediaItem) => void;
}

export default function ProjectDetailDigitalMedia({ onMediaClick }: ProjectDetailDigitalMediaProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 4 }}
      className="space-y-4"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Nabu Banner - Full width on mobile, 2 cols on desktop */}
        <div className="lg:col-span-2 space-y-2">
          <div>
            <h5 className="text-sm font-semibold text-white">{GRAPHIC_MEDIA[0].title}</h5>
            {GRAPHIC_MEDIA[0].description && (
              <p className="text-xs text-white mt-0.5 line-clamp-2">{GRAPHIC_MEDIA[0].description}</p>
            )}
          </div>
          <div className="rounded-2xl overflow-hidden">
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
            <div className="rounded-2xl overflow-hidden">
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
            <div className="rounded-2xl overflow-hidden">
              <AutoAspectTile item={GRAPHIC_MEDIA[2]} onMediaClick={onMediaClick} />
            </div>
          </div>
        </div>
      </div>

      {/* Shiri Designs */}
      <div className="space-y-3">
        <h5 className="text-sm font-semibold text-white">Design Concepts</h5>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {SHIRI_DESIGNS.map((item, index) => (
            <div key={item.src ?? index} className="space-y-1">
              <div className="rounded-2xl overflow-hidden">
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

export { GRAPHIC_MEDIA, SHIRI_DESIGNS };
