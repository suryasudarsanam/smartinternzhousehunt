export interface Property {
  id: string;
  title: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  propertyType: 'apartment' | 'house' | 'condo' | 'townhouse';
  images: string[];
  description: string;
  amenities: string[];
  landlord: {
    name: string;
    phone: string;
    email: string;
    avatar?: string;
  };
  coordinates: {
    latitude: number;
    longitude: number;
  };
  available: boolean;
  availableDate: string;
  petFriendly: boolean;
  furnished: boolean;
  parkingSpaces: number;
  yearBuilt?: number;
  isFavorite?: boolean;
}

export interface SearchFilters {
  priceRange: [number, number];
  bedrooms?: number;
  bathrooms?: number;
  propertyTypes: string[];
  amenities: string[];
  petFriendly?: boolean;
  furnished?: boolean;
  parkingRequired?: boolean;
}