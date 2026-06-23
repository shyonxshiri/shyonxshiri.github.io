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
  relatedItems?: string[];
  id?: string;
  alt?: string;
  scale?: number;
  poster?: string;
  removeBackground?: boolean;
  hidden?: boolean;
}

interface AutoAspectTileProps {
  item: MediaItem;
  onMediaClick?: (item: MediaItem) => void;
}

// Placeholder AutoAspectTile
const AutoAspectTile: React.FC<AutoAspectTileProps> = ({ item, onMediaClick }) => (
  <div className={`w-full rounded-2xl overflow-hidden cursor-pointer ${item.removeBackground ? 'bg-transparent' : 'bg-gray-900'}`} onClick={() => onMediaClick?.(item)}>
    {item.type === "image" ? (
      <img src={item.src} alt={item.alt ?? item.title} className="w-full h-auto object-cover rounded-2xl" />
    ) : (
      <video src={item.src} poster={item.poster} className="w-full h-auto object-cover rounded-2xl" />
    )}
  </div>
);

// 3D Modeling Media Data
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
    relatedItems: ["Custom Airpod Case", "Custom Phone Case"],
  },
  {
    type: "image",
    src: "/assets/Venom.PNG",
    title: "Rendered 3D Model",
    description: "A high-quality 3D rendered movie character model showcasing detailed modeling and texturing techniques made using Blender",
    year: 2024,
  },
  {
    type: "image",
    src: "/assets/Airpod_Case.JPG",
    title: "Custom Airpod Case",
    description: "Finalized Airpod case prototype designed to resemble liquid metal.",
    year: 2026,
  },
  {
    type: "image",
    src: "/assets/My_Case.jpg",
    title: "Custom Phone Case",
    description: "Finalized iPhone case prototype designed to resemble liquid metal.",
    year: 2025,
  },
];

interface ProjectDetailModelingMediaProps {
  onMediaClick: (item: MediaItem) => void;
}

export default function ProjectDetailModelingMedia({ onMediaClick }: ProjectDetailModelingMediaProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 4 }}
      className="space-y-6"
    >
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {MODELING_MEDIA.map((item, index) => (
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

export { MODELING_MEDIA };
