import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

export interface HexagonItem {
  id: string;
  title: string;
  category: string;
  img: string;
  description: string;
}

interface HexagonRingProps {
  items: HexagonItem[];
  onItemClick: (index: number) => void;
  selectedIndex: number | null;
}

export default function HexagonRing({ items, onItemClick, selectedIndex }: HexagonRingProps) {
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const hexRef = useRef<HTMLDivElement>(null);

  const hexItems = items.slice(0, 6);
  const RADIUS = 220; // Distance from center to each hexagon vertex
  const ANGLE_STEP = 60; // 360 / 6 = 60 degrees per item

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const delta = e.clientX - dragStart;
    setRotation((prev) => prev + delta * 0.5);
    setDragStart(e.clientX);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setDragStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const delta = e.touches[0].clientX - dragStart;
    setRotation((prev) => prev + delta * 0.5);
    setDragStart(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('touchend', handleTouchEnd);
    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  return (
    <div
      ref={hexRef}
      className="w-full h-[500px] flex items-center justify-center cursor-grab active:cursor-grabbing"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{
        perspective: '1200px',
      }}
    >
      <div
        style={{
          position: 'relative',
          width: '500px',
          height: '500px',
          transformStyle: 'preserve-3d',
          transform: `rotateZ(${rotation}deg)`,
          transition: isDragging ? 'none' : 'transform 0.1s ease-out',
        }}
      >
        {hexItems.map((item, index) => {
          const angle = (index * ANGLE_STEP) * (Math.PI / 180);
          const x = Math.cos(angle) * RADIUS;
          const y = Math.sin(angle) * RADIUS;
          const isSelected = selectedIndex === index;
          const zDepth = Math.cos(angle) * 100; // Depth based on position

          return (
            <motion.button
              key={item.id}
              onClick={() => onItemClick(index)}
              className="absolute w-40 h-40 rounded-lg border border-slate-400/40 overflow-hidden bg-gradient-to-br from-slate-600/50 via-slate-700/60 to-slate-800/70 flex items-center justify-center transition-all"
              style={{
                transformStyle: 'preserve-3d',
                transform: `translateX(calc(-50% + ${x}px)) translateY(calc(-50% + ${y}px)) translateZ(${zDepth}px)`,
                left: '50%',
                top: '50%',
                boxShadow: isSelected
                  ? '0 0 40px rgba(56, 189, 248, 0.4), inset 0 0 30px rgba(56, 189, 248, 0.15)'
                  : '0 0 20px rgba(0, 0, 0, 0.5)',
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Background Image */}
              <div
                className="absolute inset-0 opacity-40"
                style={{
                  backgroundImage: `url('${item.img}')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />

              {/* Content Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col items-center justify-center p-4 text-center">
                <h3 className="text-lg font-bold text-white drop-shadow-lg line-clamp-2">
                  {item.title}
                </h3>
                <span className="text-xs px-2 py-1 rounded-full bg-sky-500/40 text-sky-200 backdrop-blur-sm mt-2 whitespace-nowrap">
                  {item.category}
                </span>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Interaction Hint */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white/40 text-xs pointer-events-none">
        Drag to rotate
      </div>
    </div>
  );
}
