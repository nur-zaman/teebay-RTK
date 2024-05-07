"use client";
import ProductList from "@/components/ProductList";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function MyProductsPage() {
  let userId;

  if (typeof window !== "undefined") {
    userId = localStorage.getItem("userId");
  }
  if (!userId) {
    redirect("/");
    throw new Error("User ID invalid");
  }
  return (
    <div className="container mx-auto p-4 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-4">My Products</h1>

      <div className="flex flex-col gap-4 w-full justify-center items-center">
        <ProductList
          userId={userId as string}
          onclickURL="edit-product?productId="
        />
        <div className="m-2 self-end">
          <Button>
            <Link href="/create-product">Add Product</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
