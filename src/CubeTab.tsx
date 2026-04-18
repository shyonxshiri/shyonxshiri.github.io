import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';

export interface CubeItem {
  id: string;
  title: string;
  category: string;
  img: string;
  description: string;
  scale?: number;
  objectPosition?: string;
}

interface CubeTabProps {
  items: CubeItem[];
  onItemClick: (index: number) => void;
  selectedIndex: number | null;
}

export default function CubeTab({ items, onItemClick, selectedIndex }: CubeTabProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const [tempDragDelta, setTempDragDelta] = useState(0);
  const cubeRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number | null>(null);
  const dragThresholdRef = useRef(40);

  const cubeItems = items;
  const itemCount = items.length;

  // Optimize for mobile - use smaller threshold on touch devices
  useEffect(() => {
    const isMobile = window.matchMedia('(max-width: 640px)').matches;
    dragThresholdRef.current = isMobile ? 30 : 40;
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart(e.clientX);
    setTempDragDelta(0);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging) return;
    const delta = e.clientX - dragStart;
    setTempDragDelta(delta);
  }, [isDragging, dragStart]);

  const handleMouseUp = useCallback(() => {
    if (!isDragging) return;
    setIsDragging(false);
    
    if (Math.abs(tempDragDelta) > dragThresholdRef.current) {
      const direction = tempDragDelta > 0 ? -1 : 1;
      setCurrentIndex((prev) => (prev + direction + itemCount) % itemCount);
    } else {
      onItemClick(currentIndex);
    }
    setTempDragDelta(0);
  }, [isDragging, tempDragDelta, itemCount, currentIndex, onItemClick]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setIsDragging(true);
    setDragStart(e.touches[0].clientX);
    setTempDragDelta(0);
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging) return;
    const delta = e.touches[0].clientX - dragStart;
    setTempDragDelta(delta);
  }, [isDragging, dragStart]);

  const handleTouchEnd = useCallback(() => {
    if (!isDragging) return;
    setIsDragging(false);
    
    if (Math.abs(tempDragDelta) > dragThresholdRef.current) {
      const direction = tempDragDelta > 0 ? -1 : 1;
      setCurrentIndex((prev) => (prev + direction + itemCount) % itemCount);
    } else {
      onItemClick(currentIndex);
    }
    setTempDragDelta(0);
  }, [isDragging, tempDragDelta, itemCount, currentIndex, onItemClick]);

  useEffect(() => {
    document.addEventListener('mouseup', handleMouseUp, { passive: true });
    document.addEventListener('touchend', handleTouchEnd, { passive: true });
    
    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [handleMouseUp, handleTouchEnd]);

  const currentItem = cubeItems[currentIndex];

  return (
    <div
      ref={cubeRef}
      className="w-full flex items-center justify-center cursor-grab active:cursor-grabbing px-4 touch-none select-none"
      style={{
        perspective: '1200px',
        height: '380px',
        WebkitUserSelect: 'none',
        WebkitTouchCallout: 'none',
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Single Tab Frame that rotates */}
      <motion.div
        key={`tab-${currentIndex}`}
        onClick={() => {
          if (!isDragging) {
            onItemClick(currentIndex);
          }
        }}
        className="w-full max-w-md h-full rounded-2xl overflow-hidden shadow-2xl cursor-pointer relative"
        initial={{ opacity: 0, rotateY: 90 }}
        animate={{ opacity: 1, rotateY: 0 }}
        exit={{ opacity: 0, rotateY: -90 }}
        transition={{
          duration: 0.6,
          ease: [0.34, 1.56, 0.64, 1],
        }}
        style={{
          transformStyle: 'preserve-3d',
          willChange: 'transform',
          backfaceVisibility: 'hidden',
        }}
      >
        {/* Tab Image Background */}
        <img
          src={currentItem.img}
          alt={currentItem.title}
          loading="lazy"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: currentItem.objectPosition || 'center',
            transform: currentItem.scale ? `scale(${currentItem.scale})` : 'none',
            transformOrigin: currentItem.objectPosition || 'center',
            willChange: 'transform',
          }}
        />
        
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        
        {/* Tab Content */}
        <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-5 pointer-events-none">
          <div className="space-y-2">
            <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-white leading-tight">
              {currentItem.title}
            </h3>
          </div>
        </div>
      </motion.div>

      {/* Bottom Dot Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 sm:gap-2.5 z-10">
        {cubeItems.map((_, index) => (
          <motion.button
            key={`dot-${index}`}
            onClick={() => {
              setCurrentIndex(index);
              onItemClick(index);
            }}
            className="rounded-full transition-all"
            style={{
              backgroundColor: index === currentIndex ? '#0ea5e9' : 'rgba(255, 255, 255, 0.25)',
              width: index === currentIndex ? '28px' : '8px',
              height: '8px',
              WebkitUserSelect: 'none',
            }}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.85 }}
          />
        ))}
      </div>
    </div>
  );
}
