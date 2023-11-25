import { Request } from 'express';
import { Product } from 'src/products/entities/product.entity';
import { Review } from 'src/reviews/entities/review.entity';

export interface IProductWithReviews extends Partial<Product> {
  numberOfReviews: number;
}

export interface IProducts {
  counts: {
    total: number;
  };
  products: IProductWithReviews[];
}

export interface IAccessoryProducts {
  counts: {
    total: number;
    brandCounts: any;
    typeCounts: any;
    bowlTypeCounts: any;
    statusCounts: any;
    prices: any;
  };
  products: IProductWithReviews[];
}

export interface IHookahProducts {
  counts: {
    total: number;
    brandCounts: any;
    colorCounts: any;
    hookahSizeCounts: any;
    statusCounts: any;
    prices: any;
  };
  products: IProductWithReviews[];
}

export interface ICoalProducts {
  counts: {
    total: number;
    brandCounts: any;
    sizeCounts: any;
    weightCounts: any;
    statusCounts: any;
    prices: any;
  };
  products: IProductWithReviews[];
}

export interface ITobaccoProducts {
  counts: {
    total: number;
    brandCounts: any;
    flavorCounts: any;
    weightCounts: any;
    statusCounts: any;
    prices: any;
  };
  products: IProductWithReviews[];
}

export interface IUserRequest extends Request {
  user: { id: number };
}

export interface IProductReviews {
  product: Product;
  reviews: Omit<Review, 'user'>[];
}

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
  id?: number;
  images?: boolean;
  publish?: boolean;
  promotion?: string;
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
  strength: string;
}

export interface ISearchHookahs extends ISearch {
  color: string;
  hookahSize: string;
}

export interface ISearchCoals extends ISearch {
  coalSize: string;
  coalWeight: string;
}

export interface ISearchAccessories extends ISearch {
  type: string;
  bowlType: string;
}

export interface IOptionsUpload {
  deleteBG: boolean;
  trim: boolean;
}
