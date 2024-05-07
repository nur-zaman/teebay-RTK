"use client";
import EditProduct from "@/components/EditProduct";
import { useSearchParams } from "next/navigation";

export default function EditProductPage() {
  const searchParam = useSearchParams();
  const productId = searchParam.get("productId");

  return <EditProduct productId={productId} />;
}
