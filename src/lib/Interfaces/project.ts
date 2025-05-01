interface Range {
  min: number;
  max: number;
}

export interface Amenity {
  _id: string;
  name: string;
  type: string; // e.g., "AMENITIES"
}

interface BankApproval {
  _id: string;
  name: string;
  type: string; // e.g., "BANKS"
}

interface Image {
  secure_url: string;
  public_id: string;
  _id: string;
}

interface Availability {
  _id: string;
  name: string;
  type: string; // e.g., "AVAILABILITY"
}

export interface SingleProject {
  _id: string;
  user: string;
  title: string;
  slug: string;
  subTitle: string;
  description: string;
  locality: string;
  city: string;
  state: string;
  service: "RENT" | "SALE" | string; // expand as needed
  projectType: "RESIDENTIAL" | "COMMERCIAL" | string;
  areaRange: Range;
  priceRange: Range;
  pricePerSqFt: number;
  reraNumber: string;
  reraPossessionDate: string; // ISO date string
  availability: Availability;
  aminities: Amenity[];
  bankOfApproval: BankApproval[];
  imageGallery: Image[];
  isFeatured: boolean;
  youtubeEmbedLink: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  __v: number;
}
