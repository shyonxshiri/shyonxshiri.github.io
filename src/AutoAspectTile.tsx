import React from "react";
import { MediaItem } from "./types";

interface AutoAspectTileProps {
  item: MediaItem;
  onMediaClick?: (item: MediaItem) => void;
}

const AutoAspectTile: React.FC<AutoAspectTileProps> = ({ item, onMediaClick }) => (
  <div className={`w-full rounded-2xl overflow-hidden cursor-pointer ${item.removeBackground ? 'bg-transparent' : 'bg-gray-900'}`} onClick={() => onMediaClick?.(item)}>
    {item.type === "image" ? (
      <img src={item.src} alt={item.alt ?? item.title} className="w-full h-auto object-cover rounded-2xl" />
    ) : (
      <video src={item.src} poster={item.poster} className="w-full h-auto object-cover rounded-2xl" />
    )}
  </div>
);

export default AutoAspectTile;
