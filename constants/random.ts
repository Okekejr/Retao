export const h2 = {
  fontFamily: "Satoshi-Bold",
  fontSize: 24,
  letterSpacing: 0.4,
  color: "#1A1A1A",
};

export const h3 = {
  fontFamily: "Satoshi-Bold",
  fontSize: 20,
  letterSpacing: 0.3,
  color: "#1A1A1A",
};

export type UserRole = "owner" | "borrower" | "viewer";

export type ItemStatus = "listed" | "borrowed";

export type mockItemsT = {
  id: string;
  image: any[];
  title: string;
  description: string;
  distance: string;
  availability: string;
  favorited: boolean;
  category: string;
  status?: ItemStatus;
  owner: {
    name: string;
    avatar: any;
    contact: string;
  };
  borrower?: {
    name: string;
    contact: string;
    borrowedOn?: string;
    dueDate?: string;
  };
}[];

export const mockItems: mockItemsT = [
  {
    id: "1",
    image: [
      require("../assets/img/drill.png"),
      require("../assets/img/drill.png"),
      require("../assets/img/drill.png"),
    ],
    title: "Cordless Drill",
    description: "Perfect for home repairs and woodworking projects.",
    distance: "2.3 km",
    availability: "Mon - Fri, 10am - 6pm",
    favorited: true,
    category: "Tools",
    status: "borrowed",
    borrower: {
      name: "Chris N.",
      contact: "@chrisn",
      borrowedOn: "2025-05-20",
      dueDate: "2025-05-30",
    },
    owner: {
      name: "Alex Garcia",
      avatar: require("../assets/img/avatar.png"),
      contact: "@alexg",
    },
  },
  {
    id: "2",
    image: [
      require("../assets/img/lawnmower.png"),
      require("../assets/img/lawnmower.png"),
      require("../assets/img/lawnmower.png"),
    ],
    title: "Lawn Mower",
    description: "Electric mower for a quiet and clean cut.",
    distance: "4.1 km",
    availability: "Weekends only",
    category: "Gardening",
    favorited: false,
    status: "listed",
    owner: {
      name: "Maria Lopez",
      avatar: require("../assets/img/avatar.png"),
      contact: "@maria_lo",
    },
  },
  {
    id: "3",
    image: [
      require("../assets/img/campingtent.png"),
      require("../assets/img/campingtent.png"),
      require("../assets/img/campingtent.png"),
    ],
    title: "Camping Tent",
    description: "4-person waterproof camping tent for outdoor trips.",
    distance: "1.8 km",
    availability: "Any day, 9am - 8pm",
    category: "Camping",
    favorited: false,
    status: "listed",
    owner: {
      name: "David Kim",
      avatar: require("../assets/img/avatar.png"),
      contact: "@dkim",
    },
  },
  {
    id: "4",
    image: [
      require("../assets/img/projector.png"),
      require("../assets/img/projector.png"),
      require("../assets/img/projector.png"),
    ],
    title: "Projector",
    description: "HD projector, great for movie nights or presentations.",
    distance: "3.0 km",
    availability: "Mon - Sat, 12pm - 10pm",
    category: "Tools",
    favorited: true,
    status: "listed",
    owner: {
      name: "Sarah Lee",
      avatar: require("../assets/img/avatar.png"),
      contact: "@slee_media",
    },
  },
];

export interface categoriesT {
  id: string;
  title: string;
  icon: any;
  description: string;
}
[];

export const categories = [
  {
    id: "1",
    title: "Tools",
    icon: require("../assets/img/cat/tools.png"),
    description: "Power tools, drills, and gear for DIY or professional work.",
  },
  {
    id: "2",
    title: "Camping",
    icon: require("../assets/img/cat/camping.png"),
    description:
      "Find tents, stoves, and gear for your next outdoor adventure.",
  },
  {
    id: "3",
    title: "Photography",
    icon: require("../assets/img/cat/photograph.png"),
    description: "Cameras, lenses, tripods, and other creative equipment.",
  },
  {
    id: "4",
    title: "Gardening",
    icon: require("../assets/img/cat/gardening.png"),
    description: "Everything from lawn mowers to watering cans and shears.",
  },
  {
    id: "5",
    title: "Furniture",
    icon: require("../assets/img/cat/furniture.png"),
    description: "Chairs, tables, shelves and other home essentials.",
  },
];
