export interface Business {
  id: string;
  name: string;
  address: string;
  featuredImage?: string;
  bingMapsUrl?: string;
  latitude?: number;
  longitude?: number;
  rating?: number;
  ratingInfo?: string;
  category: string;
  website?: string;
  phone?: string;
  emails?: string;
  facebook?: string;
  instagram?: string;
  twitter?: string;
}
