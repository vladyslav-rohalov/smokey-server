export interface IAuthResponse {
  user: {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    address?: {
      city?: string;
      street?: string;
      house?: string;
      apartment?: string;
    };
  };

  token?: string;
}

export interface IAllCats {
  id: number;
  promotion: string;
  status: string;
  images: string[] | null;
  price: number;
  description: string;
  brand: string;
  title: string;
  available: number;
  rating: number | null;
  createdAt: Date;
  updatedAt: Date;
  tobacco?: {
    id?: number;
    flavor?: string;
    tobacco_weight?: number;
    strength?: number;
  };
  hookahs?: { id?: number; color?: string; hookah_size?: string };
  coals?: { id?: number; coal_size?: number; coal_weight?: number };
  accessories?: { id?: number; type?: string; bowl_type?: string };
}

export interface ISearch {
  page: number;
  limit: number;
  sort: string;
  brand: string;
  status: string;
  min: number;
  max: number;
}

export interface ISearchTobacco extends ISearch {
  flavor: string;
  weight: string;
  strength: number;
}

export interface ISearchHookahs extends ISearch {
  color: string;
  hookah_size: string;
}

export interface ISearchCoals extends ISearch {
  coal_size: number;
  coal_weight: number;
}

export interface ISearchAccessories extends ISearch {
  type: string;
  bowl_type: string;
}
