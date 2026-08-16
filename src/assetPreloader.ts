/**
 * Asset Preloader - Intelligent preloading and lazy loading strategy
 * Prioritizes critical assets and uses browser APIs for optimal performance
 */

interface PreloadConfig {
  priority: 'critical' | 'high' | 'medium' | 'low';
  type: 'image' | 'video';
  src: string;
  poster?: string; // For videos
}

// Asset manifest organized by priority and category
// (only references files that exist and are used by the live site)
export const ASSET_MANIFEST: PreloadConfig[] = [
  // === CRITICAL (Hero — the first thing visitors see) ===
  { type: 'image', src: '/assets/New_Shiri_Site_Pic.jpg', priority: 'critical' },

  // === HIGH PRIORITY (Work page category cards - visible on page load) ===
  { type: 'image', src: '/assets/Digital_Media_Cover.jpg', priority: 'high' },
  { type: 'image', src: '/assets/Programming_Cover_Pic.jpg', priority: 'high' },
  { type: 'image', src: '/assets/Shyon_Sculpture.jpg', priority: 'high' },
  { type: 'image', src: '/assets/3D_Models_Cover_Pic.jpg', priority: 'high' },

  // === MEDIUM PRIORITY (project modals - frequently accessed) ===
  { type: 'image', src: '/assets/NABU_Puffer_AD.jpg', priority: 'medium', poster: '/assets/NABU_Puffer_AD.jpg' },
  { type: 'video', src: '/assets/NABU_PUFFER_AD.mp4', priority: 'medium', poster: '/assets/NABU_Puffer_AD.jpg' },
  { type: 'image', src: '/assets/NABU_SALE_AD.jpg', priority: 'medium', poster: '/assets/NABU_SALE_AD.jpg' },
  { type: 'video', src: '/assets/NABU_SALE_AD.mp4', priority: 'medium', poster: '/assets/NABU_SALE_AD.jpg' },
  { type: 'image', src: '/assets/Stevie_Pic.JPG', priority: 'medium' },
  { type: 'image', src: '/assets/Adverstisement_Project.jpg', priority: 'medium' },
  { type: 'image', src: '/assets/Max_Pic.JPG', priority: 'medium' },
  { type: 'video', src: '/assets/Broken_NPC.MP4', priority: 'medium', poster: '/assets/Broken_NPC.jpg' },
  { type: 'image', src: '/assets/Broken_NPC.jpg', priority: 'medium' },
  { type: 'image', src: '/assets/Blender_Case.jpg', priority: 'medium' },
  { type: 'image', src: '/assets/Venom.PNG', priority: 'medium' },
  { type: 'video', src: '/assets/Nabu_Poster_Banner.mp4', priority: 'medium', poster: '/assets/Nabu_Poster_Banner.jpg' },
  { type: 'image', src: '/assets/Nabu_Poster_Banner.jpg', priority: 'medium' },
  { type: 'image', src: '/assets/Shiri_VIdeo_Game.jpg', priority: 'medium' },
  { type: 'image', src: '/assets/Mina_Website.png', priority: 'medium' },
  { type: 'image', src: '/assets/Everly_Cover_Image.png', priority: 'medium' },

  // === LOW PRIORITY (Below-fold assets, lazy load on demand) ===
  { type: 'video', src: '/assets/New_Radar_Sensor.mp4', priority: 'low', poster: '/assets/New_Radar_Sensor_front.jpg' },
  { type: 'image', src: '/assets/New_Radar_Sensor_front.jpg', priority: 'low' },
  { type: 'image', src: '/assets/New_Radar_Sensor_Back.jpg', priority: 'low' },
  { type: 'video', src: '/assets/New_LED_Box.mp4', priority: 'low', poster: '/assets/New_LED_Box_Front.jpg' },
  { type: 'image', src: '/assets/New_LED_Box_Front.jpg', priority: 'low' },
  { type: 'image', src: '/assets/New_LED_Box_Back.jpg', priority: 'low' },
  { type: 'image', src: '/assets/Airpod_Case.JPG', priority: 'low' },
  { type: 'image', src: '/assets/My_Case.jpg', priority: 'low' },
];

/**
 * Preload an image asset
 */
export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
    img.src = src;
  });
};

/**
 * Preload video metadata (more efficient than full preload)
 */
export const preloadVideoMetadata = (src: string): void => {
  const video = document.createElement('video');
  video.preload = 'metadata';
  video.src = src;
  // Add to DOM but hide it
  video.style.display = 'none';
  document.body.appendChild(video);
  
  // Clean up after metadata loads
  setTimeout(() => {
    if (video.parentNode) {
      document.body.removeChild(video);
    }
  }, 5000);
};

/**
 * Main preloader function - intelligently preloads assets based on priority
 */
export const preloadAssets = async () => {
  // Critical assets - preload immediately and wait for them
  const criticalAssets = ASSET_MANIFEST.filter(a => a.priority === 'critical');
  const criticalPromises = criticalAssets.map(asset => {
    if (asset.type === 'image') {
      return preloadImage(asset.src);
    }
    // For critical videos, preload poster instead
    return asset.poster ? preloadImage(asset.poster) : Promise.resolve();
  });
  
  await Promise.allSettled(criticalPromises);
  
  // High priority assets - preload in background (don't wait)
  const highPriorityAssets = ASSET_MANIFEST.filter(a => a.priority === 'high');
  highPriorityAssets.forEach(asset => {
    if (asset.type === 'image') {
      preloadImage(asset.src).catch(() => {}); // Silently fail
    }
  });
  
  // Medium priority - preload video metadata and posters (after delay)
  setTimeout(() => {
    const mediumPriorityAssets = ASSET_MANIFEST.filter(a => a.priority === 'medium');
    mediumPriorityAssets.forEach(asset => {
      if (asset.type === 'video' && asset.poster) {
        // Preload poster image for faster display
        preloadImage(asset.poster).catch(() => {});
      } else if (asset.type === 'image') {
        preloadImage(asset.src).catch(() => {});
      }
    });
  }, 1500);
  
  // Low priority - lazy load on demand via Intersection Observer
  setupLazyLoadObserver();
};

/**
 * Setup Intersection Observer for lazy loading low-priority assets
 */
const setupLazyLoadObserver = () => {
  if (!('IntersectionObserver' in window)) {
    return; // Fallback for older browsers
  }
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const element = entry.target as HTMLImageElement | HTMLVideoElement;
        
        if (element.tagName === 'IMG' && element.dataset.src) {
          preloadImage(element.dataset.src).then(() => {
            element.src = element.dataset.src as string;
            element.removeAttribute('data-src');
            observer.unobserve(element);
          }).catch(() => {
            // Fallback - load anyway
            element.src = element.dataset.src as string;
          });
        } else if (element.tagName === 'VIDEO') {
          element.preload = 'auto';
          observer.unobserve(element);
        }
      }
    });
  }, {
    rootMargin: '50px', // Start loading 50px before visible
  });
  
  // Observe all lazy-loadable images and videos
  const lazyElements = document.querySelectorAll('[data-lazy]');
  lazyElements.forEach(el => observer.observe(el));
};

/**
 * Add rel="preconnect" for faster DNS resolution
 */
export const addDNSPreconnect = (origins: string[]): void => {
  origins.forEach(origin => {
    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = origin;
    document.head.appendChild(link);
  });
};

/**
 * Optimize video element for faster loading
 */
export const optimizeVideoElement = (videoElement: HTMLVideoElement, src: string, poster?: string): void => {
  // Set attributes for optimal loading
  videoElement.preload = 'metadata'; // Load only metadata initially
  
  if (poster) {
    videoElement.poster = poster;
  }
  
  // Use progressive loading
  const source = document.createElement('source');
  source.src = src;
  source.type = src.endsWith('.mp4') ? 'video/mp4' : 'video/quicktime';
  
  videoElement.appendChild(source);
  
  // Preload metadata only
  videoElement.load();
};

/**
 * Invalidate cache (useful during development)
 */
export const getCachebustedUrl = (url: string): string => {
  const timestamp = new Date().getTime();
  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}cb=${timestamp}`;
};
