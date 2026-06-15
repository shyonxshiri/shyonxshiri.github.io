export interface MediaItem {
  type: "image" | "video";
  src: string;
  poster?: string;
  title?: string;
  description?: string;
  year?: number;
  link?: string;
  aspectRatio?: number;
  objectPosition?: string;
  scale?: number;
  removeBackground?: boolean;
  relatedLinks?: { category: string; index: number; title: string }[];
  alt?: string;
}
