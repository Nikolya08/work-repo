export interface AuthPayload {
  email: string;
  password: string;
}

export interface AuthResponse {
  code: number;
  status: string;
  result: {
    expiredAt: number;
    token: string;
  };
}
