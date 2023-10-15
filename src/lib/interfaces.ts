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
