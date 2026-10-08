export interface Room {
  slug: string;
  name: string;
  description: string;
  capacity: string;
  size: string;
  coverImage: string;
  gallery: string[];
  amenities: string[];
}

export interface ResortExperience {
  title: string;
  text: string;
  image: string;
}

export interface ResortService {
  title: string;
  text: string;
  image: string;
}

export interface GalleryImage {
  src: string;
  alt: string;
}
