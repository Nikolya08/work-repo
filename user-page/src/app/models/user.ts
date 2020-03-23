export interface User {
  code: number;
  status: string;
  result: UserInfo[];
  _meta?: {
    pagination: {
      totalCount: number;
      pageCount: number;
      currentPage: number;
      perPage: number;
    };
  };
}

export interface UserInfo {
  id: number;
  country: string;
  city: string;
  firstName: string;
  lastName: string;
  email: string;
  image: any;
  lat: number;
  lon: number;
  gender: string;
  createdAt: number;
  updatedAt: number;
}

export interface UpdateUserRequest {
  firstName: string;
  lastName: string;
  gender: string;
  country: string;
  city: string;
}

export interface UpdateUserLocation {
  lat: number;
  lon: number;
}
