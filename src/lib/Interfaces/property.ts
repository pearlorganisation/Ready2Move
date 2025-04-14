export interface Area {
  _id: string;
  name: string;
  area: number;
  areaMeasurement: string;
}

export interface SimpleType {
  _id: string;
  name: string;
  type: string;
}

export interface ImageGallery {
  secure_url: string;
  public_id: string;
  _id: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  phoneNumber: string;
}

export interface Property {
  _id: string;
  user: User;
  title: string;
  slug: string;
  subTitle: string;
  description: string;
  service: "SELL" | "RENT"; // Adjust based on possible enums
  property: "RESIDENTIAL" | "COMMERCIAL"; // Same here
  propertyType: SimpleType;
  apartmentName: string;
  apartmentNo: string;
  locality: string;
  city: string;
  state: string;
  area: Area[];
  reraNumber: string;
  reraPossessionDate: string;
  noOfBedrooms: number;
  noOfBathrooms: number;
  noOfBalconies: number;
  parking: SimpleType;
  furnishing: SimpleType;
  entranceFacing: SimpleType;
  availability: SimpleType;
  propertyAge: SimpleType;
  isOCAvailable: boolean;
  isCCAvailable: boolean;
  ownership: SimpleType;
  expectedPrice: number;
  isPriceNegotiable: boolean;
  isBrokerageCharge: boolean;
  brokerage: number;
  bankOfApproval: SimpleType[];
  aminities: SimpleType[];
  waterSource: SimpleType;
  otherFeatures: SimpleType[];
  propertyFlooring: SimpleType;
  imageGallery: ImageGallery[];
  isFeatured: boolean;
  youtubeEmbedLink: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Pagination {
  total: number;
  current_page: number;
  limit: number;
  next: number | null;
  prev: number | null;
  pages: number[];
}

export interface PropertyResponse {
  success: boolean;
  message: string;
  pagination: Pagination;
  data: Property[];
}

export type SingleProperty = Property;
