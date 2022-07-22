type Offer = {
  bedrooms: number
  city: {
    location: {
      latitude: number
      longitude: number
      zoom: number
    }
    name: string
  }
  description: string
  goods: string[]
  host: {
    avatarUrl: string
    id: number
    isPro: boolean
    name: string
  }
  id: number
  images: string[]
  isFavorite: boolean
  isPremium: boolean
  location: {
    latitude: number
    longitude: number
    zoom: number
  }
  maxAdults: number
  previewImage: string
  price: number
  rating: number
  title: string
  type: string
};

type ArrayOffers = Offer[];

type City = {
  title: string;
  lat: number;
  lng: number;
  zoom: number;
};

type Point = {
  title: string;
  lat: number;
  lng: number;
};

type Points = Point[];
export type { Offer, ArrayOffers, City, Point, Points };
