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
  latitude: number;
  longitude: number;
  zoom: number;
};

type Point = {
  id: number;
  latitude: number;
  longitude: number;
};

type Points = Point[];

type Comment = {
  comment: string
  date: string
  id: number
  rating: number
  user: {
    avatarUrl: string
    id: number
    isPro: boolean
    name: string
  }
}

type Comments = Comment[];

type AuthData = {
  login: string;
  password: string;
}
type UserData = {
  avatarUrl: string
  email: string
  id: number
  isPro: boolean
  name: string
  token: string
}

type CommentData = {
  hotelId: number,
  comment: string,
  rating: number,
}
type ErrorType = unknown;

export type { Offer, ArrayOffers, City, Point, Points, Comment, Comments, AuthData, UserData, ErrorType, CommentData };
