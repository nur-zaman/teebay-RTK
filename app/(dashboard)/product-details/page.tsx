"use client";
import ProductDetails from "@/components/ProductDetails";
import { redirect, useSearchParams } from "next/navigation";

export default function ProductDetailsPage() {
  const searchParam = useSearchParams();
  const productId = searchParam.get("productId");

  if (!productId) {
    console.log("Product ID invalid");
    redirect("/all-products");
    throw new Error("Product ID invalid");
  }

  return <ProductDetails status={null} productId={productId} />;
}
