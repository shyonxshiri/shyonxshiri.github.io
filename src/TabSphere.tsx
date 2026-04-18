import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

export interface TabSphereItem {
  id: string;
  title: string;
  category: string;
  img: string;
  description: string;
}

interface TabSphereProps {
  items: TabSphereItem[];
  onTabClick: (index: number) => void;
  selectedIndex: number | null;
}

export default function TabSphere({ items, onTabClick, selectedIndex }: TabSphereProps) {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const sphereRef = useRef<HTMLDivElement>(null);

  // Calculate positions for 6 tabs on a sphere
  const calculatePosition = (index: number) => {
    const totalTabs = items.length;
    const angle = (index / totalTabs) * Math.PI * 2;
    const radius = 200; // Distance from center
    
    // Vertical distribution
    const verticalSpacing = 60;
    const verticalPositions = [
      -verticalSpacing,
      -verticalSpacing / 2,
      verticalSpacing / 2,
      verticalSpacing,
      -verticalSpacing / 3,
      verticalSpacing / 3,
    ];

    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;
    const y = verticalPositions[index] || 0;

    return { x, y, z };
  };

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
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove as any);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove as any);
      document.addEventListener('touchend', handleTouchEnd);

      return () => {
        document.removeEventListener('mousemove', handleMouseMove as any);
        document.removeEventListener('mouseup', handleMouseUp);
        document.removeEventListener('touchmove', handleTouchMove as any);
        document.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, [isDragging, dragStart]);

  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      if (sphereRef.current?.contains(e.target as Node)) {
        setIsDragging(true);
        setDragStart({ x: e.clientX, y: e.clientY });
      }
    };

    document.addEventListener('mousedown', handleMouseDown);
    return () => document.removeEventListener('mousedown', handleMouseDown);
  }, []);

  return (
    <div
      ref={sphereRef}
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
          width: '100%',
          height: '100%',
          position: 'relative',
          transformStyle: 'preserve-3d',
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          transition: isDragging ? 'none' : 'transform 0.1s ease-out',
        }}
      >
        {items.map((item, index) => {
          const { x, y, z } = calculatePosition(index);
          const isSelected = selectedIndex === index;

          return (
            <motion.button
              key={item.id}
              onClick={() => onTabClick(index)}
              className="absolute w-48 h-32 rounded-lg border border-slate-500/60 overflow-hidden bg-gradient-to-br from-slate-600/40 via-slate-700/50 to-slate-800/50 transition-all hover:shadow-lg"
              style={{
                transformStyle: 'preserve-3d',
                transform: `translate3d(calc(-50% + ${x}px), calc(-50% + ${y}px), ${z}px)`,
                left: '50%',
                top: '50%',
                width: '200px',
                height: '140px',
                boxShadow: isSelected ? '0 0 20px rgba(56, 189, 248, 0.15)' : '0 0 0px rgba(56, 189, 248, 0)',
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="p-4 flex flex-col h-full justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-sm font-semibold text-white truncate">
                      {item.title}
                    </h3>
                    <span className="text-xs px-2 py-1 rounded-full bg-sky-500/20 text-sky-300 whitespace-nowrap">
                      {item.category}
                    </span>
                  </div>
                  <p className="text-xs text-white/70 line-clamp-2">
                    {item.description}
                  </p>
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
