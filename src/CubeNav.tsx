import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

export interface CubeItem {
  id: string;
  title: string;
  category: string;
  img: string;
  description: string;
}

interface CubeNavProps {
  items: CubeItem[];
  onFaceClick: (index: number) => void;
  selectedIndex: number | null;
}

export default function CubeNav({ items, onFaceClick, selectedIndex }: CubeNavProps) {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const cubeRef = useRef<HTMLDivElement>(null);

  // Only use first 6 items for cube faces
  const cubeItems = items.slice(0, 6);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;

    const deltaX = e.clientX - dragStart.x;
    const deltaY = e.clientY - dragStart.y;

    setRotation((prev) => ({
      x: prev.x + deltaY * 0.5,
      y: prev.y + deltaX * 0.5,
    }));

    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.touches[0].clientX, y: e.touches[0].clientY });
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;

    const deltaX = e.touches[0].clientX - dragStart.x;
    const deltaY = e.touches[0].clientY - dragStart.y;

    setRotation((prev) => ({
      x: prev.x + deltaY * 0.5,
      y: prev.y + deltaX * 0.5,
    }));

    setDragStart({ x: e.touches[0].clientX, y: e.touches[0].clientY });
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

  // Proper cube face transforms - Z is 200px (half of 400px cube size)
  const CUBE_SIZE = 200;
  const faceTransforms = [
    { rotateY: 0, translateZ: CUBE_SIZE },           // Front
    { rotateY: 180, translateZ: CUBE_SIZE },         // Back
    { rotateY: 90, translateZ: CUBE_SIZE },          // Right
    { rotateY: -90, translateZ: CUBE_SIZE },         // Left
    { rotateX: 90, translateZ: CUBE_SIZE },          // Top
    { rotateX: -90, translateZ: CUBE_SIZE },         // Bottom
  ];

  return (
    <div
      ref={cubeRef}
      className="w-full h-[600px] flex items-center justify-center cursor-grab active:cursor-grabbing"
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
          width: '400px',
          height: '400px',
          position: 'relative',
          transformStyle: 'preserve-3d',
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          transition: isDragging ? 'none' : 'transform 0.08s ease-out',
        }}
      >
        {cubeItems.map((item, index) => {
          const face = faceTransforms[index];
          const isSelected = selectedIndex === index;

          const transformString = `rotateX(${face.rotateX || 0}deg) rotateY(${face.rotateY || 0}deg) translateZ(${face.translateZ}px)`;

          return (
            <motion.button
              key={item.id}
              onClick={() => onFaceClick(index)}
              className="absolute w-96 h-96 rounded-lg border border-slate-400/40 overflow-hidden bg-gradient-to-br from-slate-600/50 via-slate-700/60 to-slate-800/70 flex items-center justify-center transition-all"
              style={{
                transformStyle: 'preserve-3d',
                transform: transformString,
                left: '50%',
                top: '50%',
                marginLeft: '-200px',
                marginTop: '-200px',
                boxShadow: isSelected
                  ? '0 0 40px rgba(56, 189, 248, 0.4), inset 0 0 30px rgba(56, 189, 248, 0.15)'
                  : '0 0 20px rgba(0, 0, 0, 0.5), inset 0 0 20px rgba(0, 0, 0, 0.3)',
                backfaceVisibility: 'hidden' as const,
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Background Image */}
              <div
                className="absolute inset-0 opacity-30"
                style={{
                  backgroundImage: `url('${item.img}')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />

              {/* Content Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col items-center justify-center p-8 text-center">
                <h3 className="text-3xl font-bold text-white mb-2 drop-shadow-lg">
                  {item.title}
                </h3>
                <span className="text-sm px-4 py-2 rounded-full bg-sky-500/40 text-sky-200 backdrop-blur-sm">
                  {item.category}
                </span>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Interaction Hint */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/50 text-sm pointer-events-none">
        Drag to rotate
      </div>
    </div>
  );
}
