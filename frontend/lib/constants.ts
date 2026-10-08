import type { GalleryImage, ResortExperience, ResortService, Room } from "@/types/room";

export const resortContact = {
  name: "Swarnabhoomi Farm Stay",
  tagline: "The nature's nest",
  phone: "+91 77608 33558",
  email: "avaniswarnabhoomi@gmail.com",
  address: "Swarnabhoomi, Kaggala, Karnataka 571463",
  instagram: "https://www.instagram.com/swarnabhoomi89?stkn=MTVkNWN5dWo0Nzk0bA==",
};

export const rooms: Room[] = [
  {
    slug: "nature-view-cottage",
    name: "Villa Stay",
    description:
      "A private villa-style stay with living space, attached washrooms, warm lighting, and easy access to the lawn and pool side.",
    capacity: "Family / group stay",
    size: "Details to be confirmed",
    coverImage: "/images/services/A51.webp",
    gallery: [
      "/images/rooms/A41.webp",
      "/images/rooms/A42.webp",
      "/images/rooms/A47.webp",
    ],
    amenities: ["Attached bathroom", "Living area", "Garden access", "Enquiry-based stay"],
  },
  {
    slug: "poolside-cottage",
    name: "Cottage Stay",
    description:
      "A relaxed cottage stay close to the pool and evening lights, ideal for families looking for quiet resort time.",
    capacity: "2-4 guests",
    size: "Details to be confirmed",
    coverImage: "/images/rooms/room-02/cover.webp",
    gallery: [
      "/images/rooms/room-02/cover1.webp",
      "/images/rooms/room-02/media-wall.webp",
      "/images/rooms/room-02/A50.webp",
      "/images/wellness/pool-night.webp",
    ],
    amenities: ["Pool access", "TV", "Attached bathroom", "Family friendly"],
  },
  {
    slug: "family-farm-stay",
    name: "Bunk Room Stay",
    description:
      "A simple, comfortable bunk room option for groups who want nature, food, games, and unhurried time together.",
    capacity: "Family / group stay",
    size: "Details to be confirmed",
    coverImage: "/images/services/A39.webp",
    gallery: [
      "/images/rooms/A40.webp",
      "/images/rooms/A43.webp",
      "/images/services/A38.webp",
    ],
    amenities: ["Group friendly", "Attached facilities", "Farm walks", "Food packages"],
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

export const services: ResortService[] = [
  {
    title: "Villa Stay",
    text: "Private villa-style rooms for families and groups who want more space.",
    image: "/images/services/A51.webp",
  },
  {
    title: "Cottage Stay",
    text: "Comfortable cottages surrounded by garden paths and evening lights.",
    image: "/images/rooms/room-02/cover.webp",
  },
  {
    title: "Tent Stay",
    text: "Outdoor stay options can be discussed for group plans and events.",
    image: "/images/services/A38.webp",
  },
  {
    title: "Swimming Pool",
    text: "Pool time for relaxed afternoons and lit-up evenings.",
    image: "/images/services/A52.webp",
  },
  {
    title: "Bonfire",
    text: "Evening bonfire arrangements for groups on request.",
    image: "/images/experiences/bonfire-evening.webp",
  },
  {
    title: "Barbeque",
    text: "Barbeque add-ons for food-led gatherings and celebrations.",
    image: "/images/experiences/food-barbecue.webp",
  },
  {
    title: "Music with Karaoke",
    text: "Music and karaoke arrangements for private group evenings.",
    image: "/images/rooms/A41.webp",
  },
  {
    title: "Net Cricket",
    text: "Open play and net cricket activities for active groups.",
    image: "/images/services/A31.webp",
  },
  {
    title: "Badminton",
    text: "Casual badminton for families, friends, and team outings.",
    image: "/images/services/A38.webp",
  },
  {
    title: "Archery",
    text: "Archery-style activity setup available as part of the outdoor experience.",
    image: "/images/services/archery.jpg",
  },
  {
    title: "Indoor Games",
    text: "Indoor games and common-room time for slower parts of the day.",
    image: "/images/rooms/A42.webp",
  },
  {
    title: "Farm Walk",
    text: "Walk through the farm landscape and enjoy a quieter rhythm.",
    image: "/images/services/avocado-orchard.webp",
  },
];

export const galleryImages: GalleryImage[] = [
  { src: "/images/services/A51.webp", alt: "Villa exterior with garden pathway at Swarnabhoomi" },
  { src: "/images/services/A38.webp", alt: "Cottages and lawn at dusk" },
  { src: "/images/rooms/A42.webp", alt: "Villa living room and indoor swing" },
  { src: "/images/resort/resort-night.webp", alt: "Swarnabhoomi cottages glowing at night" },
  { src: "/images/services/A52.webp", alt: "Swimming pool at night" },
  { src: "/images/location/hills-sunrise.webp", alt: "Sunrise over hills near the farm stay" },
  { src: "/images/services/A34.webp", alt: "Dining sit-out and courtyard lights" },
  { src: "/images/services/A31.webp", alt: "Outdoor game and gathering area at night" },
  { src: "/images/services/archery.jpg", alt: "Archery activity setup at Swarnabhoomi" },
];
