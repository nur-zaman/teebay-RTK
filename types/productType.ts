export interface Category {
  id?: string;
  name: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Product {
  id?: string;
  title: string;
  description: string;
  price: number;
  rent: number;
  status?: "RENTED" | "SOLD" | null;
  rate: "YEAR" | "MONTH" | "WEEK" | "DAY";
  userId: string;
  createdAt?: string;
  updatedAt?: string;
  categories: Category[] | string[];
}
