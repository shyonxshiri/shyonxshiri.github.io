/**
 * useAssetPreloader - React hook for managing asset preloading
 * Intelligently preloads assets based on component lifecycle and user interaction
 */

import { useEffect, useRef } from 'react';
import { preloadAssets, preloadImage, preloadVideoMetadata } from './assetPreloader';

/**
 * Hook to automatically preload critical assets on app startup
 */
export const useInitialPreload = () => {
  const hasPreloadedRef = useRef(false);
  
  useEffect(() => {
    if (hasPreloadedRef.current) return;
    hasPreloadedRef.current = true;
    
    // Start preloading after component mounts
    preloadAssets().catch(console.error);
  }, []);
};

/**
 * Hook to preload assets when a modal is about to open
 * Used with onMouseEnter/onFocus on modal buttons
 */
export const useModalPreload = (assetSrcs: string[]) => {
  const handlePreload = () => {
    assetSrcs.forEach(src => {
      if (src.endsWith('.mp4') || src.endsWith('.mov')) {
        preloadVideoMetadata(src);
      } else {
        preloadImage(src).catch(() => {});
      }
    });
  };
  
  return { onMouseEnter: handlePreload, onFocus: handlePreload };
};

/**
 * Hook to lazy load an image when it becomes visible
 */
export const useLazyImage = (ref: React.RefObject<HTMLImageElement>, src: string) => {
  useEffect(() => {
    if (!ref.current) return;
    
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          preloadImage(src).then(() => {
            if (ref.current) {
              ref.current.src = src;
            }
          }).catch(() => {
            // Fallback
            if (ref.current) {
              ref.current.src = src;
            }
          });
          observer.unobserve(entry.target);
        }
      }, { rootMargin: '50px' });
      
      observer.observe(ref.current);
      return () => observer.disconnect();
    } else {
      // Fallback for older browsers
      if (ref.current) {
        ref.current.src = src;
      }
    }
  }, [src]);
};

/**
 * Hook to optimize video loading with lazy playback
 */
export const useVideoOptimization = (
  videoRef: React.RefObject<HTMLVideoElement>,
  src: string,
  poster?: string,
  shouldAutoplay?: boolean
) => {
  useEffect(() => {
    if (!videoRef.current) return;
    
    const video = videoRef.current;
    
    // Set poster for better UX while loading
    if (poster) {
      video.poster = poster;
    }
    
    // Preload metadata only (load full video only on user interaction)
    video.preload = 'metadata';
    
    // Handle click to load/play
    const handlePlayAttempt = () => {
      if (!video.src && src) {
        video.src = src;
        video.play();
      }
    };
    
    // If autoplay is enabled and user hasn't interacted yet
    if (shouldAutoplay && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting && !video.src) {
          video.src = src;
          video.play().catch(() => {
            // Autoplay might be blocked, wait for user interaction
            video.addEventListener('click', handlePlayAttempt);
          });
        }
      }, { threshold: 0.5 });
      
      observer.observe(video);
      return () => observer.disconnect();
    } else {
      // Wait for user interaction to load video
      if (!video.src) {
        video.addEventListener('click', handlePlayAttempt);
      }
    }
  }, [src, poster, shouldAutoplay]);
};

/**
 * Hook to prefetch assets when hovering over a project card
 * Used to make modal opening feel faster
 */
export const usePrefetchOnHover = (assetSrcs: string[]) => {
  const cachRef = useRef<Set<string>>(new Set());
  
  const handleHover = () => {
    assetSrcs.forEach(src => {
      if (cachRef.current.has(src)) return;
      
      cachRef.current.add(src);
      
      if (src.endsWith('.mp4') || src.endsWith('.mov')) {
        // For videos, just preload metadata
        preloadVideoMetadata(src);
      } else {
        // For images, fully preload
        preloadImage(src).catch(() => {});
      }
    });
  };
  
  return { onMouseEnter: handleHover };
};
