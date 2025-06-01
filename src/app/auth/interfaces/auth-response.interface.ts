import { User } from "./user.interface";

export interface AuthResponse {
  user:  User;
  token: Token;
}

export interface Token {
  accessToken:  string;
  refreshToken: string;
}
