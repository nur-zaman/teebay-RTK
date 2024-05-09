"use client";
import ProductList from "@/components/ProductList";

export default function AllProductsPage() {
  return (
    <div className="container mx-auto p-4 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-4">All Products</h1>

      <div className="flex flex-col gap-4 w-full justify-center items-center">
        <ProductList
          // status={null}
          onclickURL="product-details?productId="
          hideDeleteButton={true}
        />
      </div>
    </div>
  );
}
