export interface IAuthResponse {
  user: {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
  };
  token?: string;
}
