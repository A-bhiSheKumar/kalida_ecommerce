import type { Product } from "../types/category";

export const featured: Product[] = [
  {
    id: "d-hammer-01",
    title: "Brushless Drill Driver 18V (2x Li-Ion 4.0Ah)",
    price: 11499,
    image:
      "https://images.unsplash.com/photo-1585771724684-38269d6639fd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=80",
    rating: 4.7,
    badge: "Bestseller",
  },
  {
    id: "grinder-02",
    title: "Angle Grinder 100mm 850W",
    price: 3999,
    image:
      "https://images.unsplash.com/photo-1713263934884-8ca7e7312cc0?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    rating: 4.5,
  },
  {
    id: "impact-03",
    title: 'Impact Wrench 1/2" 20V (Bare Tool)',
    price: 7299,
    image:
      "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=80",
    rating: 4.6,
    badge: "New",
  },
  {
    id: "saw-04",
    title: 'Circular Saw 7-1/4" 1400W',
    price: 6599,
    image:
      "https://images.unsplash.com/photo-1560264357-8d9202250f21?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=80",
    rating: 4.4,
  },
];

export const categories = [
  {
    id: "powertools",
    name: "Power Tools",
    image:
      "https://images.unsplash.com/photo-1585771724684-38269d6639fd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1400&q=80",
  },

  {
    id: "fasteners",
    name: "Fasteners",
    image:
      "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "electrical",
    name: "Electrical",
    image:
      "https://images.unsplash.com/photo-1551269901-5c5e14c25df7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "plumbing",
    name: "Plumbing",
    image:
      "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1400&q=80",
  },
];
