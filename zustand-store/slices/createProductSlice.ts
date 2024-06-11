import { StateCreator } from "zustand";
import { Option } from "@/components/ui/multiple-selector";

type Product = {
  title: string;
  categories: Option[];
  description: string;
  priceInfo: {
    price: number;
    rent: number;
    rate: string;
  };
};

type ProductSlice = {
  product: Product;
  setProduct: (data: Product) => void;
  resetProduct: () => void;
};

const initialState: Product = {
  title: "",
  categories: [],
  description: "",
  priceInfo: {
    price: 0,
    rent: 0,
    rate: "",
  },
};

const createProductSlice: StateCreator<ProductSlice> = (set) => ({
  product: initialState,
  setProduct: (data) => set(() => ({ product: data })),
  resetProduct: () => set(() => ({ product: initialState })),
});

export default createProductSlice;
export type { Product, ProductSlice };
