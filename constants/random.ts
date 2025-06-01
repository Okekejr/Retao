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

export const machineIP = process.env.EXPO_PUBLIC_MACHINE_IP;

export const BASE_URL = `http://${machineIP}:3000/api/`;

export const AppName = "Rezñuf";

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
      name: "Emmanuel Okeke",
      avatar: require("../assets/img/avatar.png"),
      contact: "@Okekejr",
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
    status: "borrowed",
    owner: {
      name: "Chidera Okeke",
      avatar: require("../assets/img/avatar.png"),
      contact: "@Chidera",
    },
    borrower: {
      name: "Emmanuel Okeke",
      contact: "@Okekejr",
      borrowedOn: "2025-05-20",
      dueDate: "2025-05-30",
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

export type categoriesT = {
  id: string;
  icon: any;
}[];

export const categoriesIcon: categoriesT = [
  {
    id: "tools",
    icon: require("../assets/img/cat/tools.png"),
  },
  {
    id: "camping",
    icon: require("../assets/img/cat/camping.png"),
  },
  {
    id: "camera",
    icon: require("../assets/img/cat/photograph.png"),
  },
  {
    id: "gardening",
    icon: require("../assets/img/cat/gardening.png"),
  },
  {
    id: "furniture",
    icon: require("../assets/img/cat/furniture.png"),
  },
];

interface userProfile {
  id: string;
  name: string;
  handle: string;
  avatar: any;
  bio: string;
  joinDate: string;
  stats: {
    listed: number;
    borrowed: number;
    rating: number;
    reviewsCount: number;
  };
  listings: {
    id: string;
    image: any[];
    title: string;
    description: string;
    distance: string;
    favorited?: boolean;
  }[];
  borrowedItems: {
    id: string;
    image: any[];
    title: string;
    description: string;
    distance: string;
    favorited?: boolean;
  }[];
  favorites: {
    id: string;
    image: any[];
    title: string;
    description: string;
    distance: string;
    favorited?: boolean;
  }[];
}

export const mockUserProfile: userProfile = {
  id: "user_001",
  name: "Alex Garcia",
  handle: "@alexg",
  avatar: require("../assets/img/avatar.png"),
  bio: "DIY enthusiast. Sharing tools and gear to build a better community.",
  joinDate: "2024-08-15",
  stats: {
    listed: 12,
    borrowed: 5,
    rating: 4.8,
    reviewsCount: 18,
  },
  listings: [
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
      favorited: true,
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
      favorited: false,
    },
  ],
  borrowedItems: [
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
      favorited: false,
    },
  ],
  favorites: [
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
      favorited: true,
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
      favorited: true,
    },
  ],
};
