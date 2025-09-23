export interface LoginRequest {
  username: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  expiresAt: string;
  username: string;
  role: string;
  accesos: string[];
}

export interface MeResponse {
  username: string;
  role: string;
  accesos: string[];
}
