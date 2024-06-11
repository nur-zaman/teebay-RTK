import { RateType, RentStatus } from "./enums";

export interface FilterProductDto {
  userId?: string;
  status?: RentStatus;
  exceptUserId?: string;
  exceptStatus?: RentStatus;
}

export interface CreateProductDto {
  title: string;

  description: string;

  price: number;

  rent: number;

  rate: RateType;

  userId: string;

  categories: string[];
}

export interface UpdateProductDto {
  id?: string;
  title?: string;

  description?: string;

  price?: number;

  rent?: number;

  rate?: RateType;

  categories?: string[];
}

export interface BuyProductDto {
  userId: string;
  productId: string;
}

export interface RentProductDto {
  userId: string;

  productId: string;

  startDate: Date;

  endDate: Date;
}
export interface CreateUserDto {
  firstName: string;

  lastName?: string;

  phone?: string;

  address?: string;

  email: string;

  password: string;
}

export interface LoginDto {
  username: string;
  password: string;
}
