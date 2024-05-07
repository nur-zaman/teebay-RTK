"use client";

import { Product } from "@/types/productType";
import { redirect, useRouter } from "next/navigation";
import React from "react";
import { ConfirmAlert } from "./ConfirmAlert";
import {
  useBuyProductMutation,
  useRentProductMutation,
  useGetProductsQuery,
} from "@/apiSlice";
import { ProductRentMenu } from "./ProductRentMenu";

type Props = { productId: string; status?: string | null };

export default function ProductDetails({ productId, status }: Props) {
  const userId = localStorage.getItem("userId");

  if (!userId) {
    console.log("please log in first");
    redirect("/");
    throw new Error("User ID invalid");
  }

  const router = useRouter();

  // Use RTK Query to fetch all products
  const {
    data: products,
    isLoading,
    error,
  } = useGetProductsQuery({
    userId: undefined,
    status: null,
    exceptUserId: undefined,
    exceptStatus: undefined,
  });

  const product: Product | undefined = products?.find(
    (p: Product) => p.id === productId
  );

  if (!product) {
    console.log("Product ID invalid");
    redirect(`/all-products`);
    throw new Error("Product ID invalid");
  }

  // RTK Query Mutations
  const [buyProduct] = useBuyProductMutation();
  const [rentProduct] = useRentProductMutation();

  const [startDate, setStartDate] = React.useState<Date>(new Date());
  const [endDate, setEndDate] = React.useState<Date>(new Date());

  const handleBuy = async () => {
    if (!userId) {
      alert("Please log in to purchase a product.");
      return;
    }

    try {
      await buyProduct({ userId, productId });
      // RTK Query will automatically refetch and update the 'getProducts' query
      // based on the invalidatesTags setting in apiSlice.js
      router.push("/all-products");
    } catch (error) {
      console.error("Error in handleBuy:", error);
      // Additional error handling if needed
    }
  };

  const handleRentProduct = async () => {
    if (!userId) {
      alert("Please log in to rent a product.");
      return;
    }

    try {
      await rentProduct({ userId, productId, startDate, endDate });
      // RTK Query will automatically refetch and update the 'getProducts' query
      router.push("/all-products");
    } catch (error) {
      console.error("Error in handleBuy:", error);
      // Additional error handling if needed
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 min-w-[800px]">
      <h2 className="text-2xl font-bold mb-4">{product.title}</h2>
      <p className="text-gray-600 mb-2">
        Categories:{" "}
        {product.categories.map((category) => category.name).join(", ")}
      </p>
      <p className="text-gray-600 mb-4">
        Price: ${product.price} | Rent: ${product.rent} per{" "}
        {product.rate.toString().toLowerCase()}
      </p>
      <p className="text-gray-700">{product.description}</p>
      <div className="flex justify-end mt-6 gap-2">
        <ProductRentMenu
          setStartDate={setStartDate}
          setEndDate={setEndDate}
          handleRentProduct={handleRentProduct}
        >
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
            Rent
          </button>
        </ProductRentMenu>

        <ConfirmAlert
          optionYes="Yes"
          optionNo="No"
          yesAction={handleBuy}
          message="Are you sure you want to Buy this product?"
        >
          <div className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-2 hover:cursor-pointer">
            Buy
          </div>
        </ConfirmAlert>
      </div>
    </div>
  );
}