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
}

interface AutoAspectTileProps {
  item: MediaItem;
  onMediaClick?: (item: MediaItem) => void;
}

// Placeholder AutoAspectTile - actual implementation in App.tsx
const AutoAspectTile: React.FC<AutoAspectTileProps> = ({ item, onMediaClick }) => (
  <div className={`w-full rounded-2xl overflow-hidden cursor-pointer bg-gray-900`} onClick={() => onMediaClick?.(item)}>
    {item.type === "image" ? (
      <img src={item.src} alt={item.alt ?? item.title} className="w-full h-auto object-cover rounded-2xl" />
    ) : (
      <video src={item.src} className="w-full h-auto object-cover rounded-2xl" />
    )}
  </div>
);

// Camera Work Media Data
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
    scale: 1.15,
    objectPosition: "center",
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

interface ProjectDetailCameraWorkProps {
  onMediaClick: (item: MediaItem) => void;
}

export default function ProjectDetailCameraWork({ onMediaClick }: ProjectDetailCameraWorkProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 4 }}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {CAMERA_MEDIA.slice(0, 3).map((item, index) => (
          <div key={item.src ?? index} className="space-y-2">
            <div>
              <h5 className="text-sm font-semibold text-white">{item.title}</h5>
              {item.description && (
                <p className="text-xs text-white mt-0.5 line-clamp-2">{item.description}</p>
              )}
            </div>
            <div className="rounded-2xl overflow-hidden">
              <AutoAspectTile item={item} onMediaClick={onMediaClick} />
            </div>
          </div>
        ))}
      </div>

      {/* Campaign Project - Fixed position */}
      <div className="space-y-2">
        <div>
          <h5 className="text-sm font-semibold text-white">{CAMERA_MEDIA[3].title}</h5>
          {CAMERA_MEDIA[3].description && (
            <p className="text-xs text-white mt-0.5 line-clamp-2">{CAMERA_MEDIA[3].description}</p>
          )}
        </div>
        <div className="rounded-2xl overflow-hidden">
          <AutoAspectTile item={CAMERA_MEDIA[3]} onMediaClick={onMediaClick} />
        </div>
      </div>

      {/* Abstract Scene - Fixed position */}
      <div className="space-y-2 min-h-[380px]">
        <div>
          <h5 className="text-sm font-semibold text-white">{CAMERA_MEDIA[4].title}</h5>
          {CAMERA_MEDIA[4].description && (
            <p className="text-xs text-white mt-0.5 line-clamp-2">{CAMERA_MEDIA[4].description}</p>
          )}
        </div>
        <div className="rounded-2xl overflow-hidden">
          <AutoAspectTile item={CAMERA_MEDIA[4]} onMediaClick={onMediaClick} />
        </div>
      </div>

      {/* Remaining items */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {CAMERA_MEDIA.slice(5).map((item, index) => (
          <div key={item.src ?? index} className="space-y-2">
            <div>
              <h5 className="text-sm font-semibold text-white">{item.title}</h5>
              {item.description && (
                <p className="text-xs text-white mt-0.5 line-clamp-2">{item.description}</p>
              )}
            </div>
            <div className="rounded-2xl overflow-hidden">
              <AutoAspectTile item={item} onMediaClick={onMediaClick} />
            </div>
          </div>
        ))}
      </div>
    </motion.section>
  );
}

export { CAMERA_MEDIA };
