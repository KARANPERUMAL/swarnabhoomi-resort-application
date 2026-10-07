import type { GalleryImage, ResortExperience, Room } from "@/types/room";

export const resortContact = {
  name: "Swarnabhoomi Farm Stay",
  tagline: "The nature's nest",
  phone: "+91 77608 33558",
  email: "avaniswarnabhoomi@gmail.com",
  address: "Swarnabhoomi, Kaggala, Karnataka 571463",
};

export const rooms: Room[] = [
  {
    slug: "nature-view-cottage",
    name: "Nature View Cottage",
    description:
      "A calm cottage stay with warm wood interiors and direct access to the garden-side resort paths.",
    capacity: "2-3 guests",
    size: "Room size to be confirmed",
    coverImage: "/images/rooms/room-01/bedroom.webp",
    gallery: [
      "/images/rooms/room-01/bedroom.webp",
      "/images/rooms/room-01/cover.webp",
      "/images/resort/cottage-veranda.webp",
    ],
    amenities: ["Air conditioning", "Attached bathroom", "Garden access", "Enquiry-based stay"],
  },
  {
    slug: "poolside-cottage",
    name: "Poolside Cottage",
    description:
      "A relaxed stay close to the pool and evening lights, ideal for families looking for quiet resort time.",
    capacity: "2-4 guests",
    size: "Room size to be confirmed",
    coverImage: "/images/rooms/room-02/cover.webp",
    gallery: [
      "/images/rooms/room-02/cover.webp",
      "/images/rooms/room-02/media-wall.webp",
      "/images/wellness/pool-night.webp",
    ],
    amenities: ["Pool access", "TV", "Attached bathroom", "Family friendly"],
  },
  {
    slug: "family-farm-stay",
    name: "Family Farm Stay",
    description:
      "A simple, comfortable stay for families and small groups who want nature, food, and unhurried time together.",
    capacity: "Family / group stay",
    size: "Room size to be confirmed",
    coverImage: "/images/rooms/room-03/cover.webp",
    gallery: [
      "/images/rooms/room-03/cover.webp",
      "/images/resort/arrival-sign.webp",
      "/images/experiences/veranda-path.webp",
    ],
    amenities: ["Bonfire on request", "Farm walks", "Pet friendly", "Food packages"],
  },
];

export const experiences: ResortExperience[] = [
  {
    title: "Farm Walks",
    text: "Walk through green farm paths and slow down into a quieter rhythm.",
    image: "/images/experiences/garden-lawn.webp",
  },
  {
    title: "Pool Evenings",
    text: "Spend golden hours by the pool, with the resort lights coming alive after dusk.",
    image: "/images/experiences/pool-evenings.webp",
  },
  {
    title: "Food Your Way",
    text: "Choose customized or fixed food plans for family stays and groups.",
    image: "/images/experiences/food-barbecue.webp",
  },
  {
    title: "Bonfire & Barbecue",
    text: "Evening add-ons can be arranged as part of the enquiry-led stay experience.",
    image: "/images/experiences/bonfire-evening.webp",
  },
];

export const galleryImages: GalleryImage[] = [
  { src: "/images/wellness/aerial-pool.webp", alt: "Aerial pool view at Swarnabhoomi Farm Stay" },
  { src: "/images/resort/arrival-sign.webp", alt: "Swarnabhoomi arrival sign and cottage exterior" },
  { src: "/images/resort/cottage-veranda.webp", alt: "Cottage veranda with seating" },
  { src: "/images/rooms/room-01/bedroom.webp", alt: "Warm wood bedroom at Swarnabhoomi" },
  { src: "/images/resort/resort-night.webp", alt: "Swarnabhoomi cottages glowing at night" },
  { src: "/images/experiences/avani-farms-buddha.webp", alt: "Avani Farms evening Buddha wall" },
  { src: "/images/location/hills-sunrise.webp", alt: "Sunrise over hills near the farm stay" },
  { src: "/images/gallery/art-corner.webp", alt: "Interior art detail at the resort" },
];
