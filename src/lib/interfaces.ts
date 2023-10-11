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
