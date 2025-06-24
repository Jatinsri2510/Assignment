export interface Artist {
    id: string;
    name: string;
    category: string[];
    bio: string;
    languages: string[];
    feeRange: string;
    location: string;
    imageUrl?: string;
    rating?: number;
    experience?: string;
}

export interface Category {
    id: string;
    name: string;
    description: string;
    icon: string;
}

export interface BookingRequest {
    id: string;
    artistName: string;
    category: string[];
    location: string;
    feeRange: string;
    status: 'pending' | 'approved' | 'rejected';
    requestDate: string;
}

export interface FilterOptions {
    category: string[];
    location: string[];
    priceRange: string[];
}

export interface FormData {
  name: string;
  bio: string;
  category: string[];
  languages: string[];
  feeRange: string;
  location: string;
  imageUrl?: string;
}
