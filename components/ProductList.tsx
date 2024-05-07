"use client";

import { useQuery } from "@tanstack/react-query";
import ProductCard from "./ProductCard";
import { Product } from "@/types/productType";
import { getProducts } from "@/utils/products";

import { useGetProductsQuery } from "@/apiSlice";

type productListProps = {
  userId?: string;
  status?: string | null;
  onclickURL: string;
  exceptUserId?: string;
  exceptStatus?: string;
  hideDeleteButton?: boolean;
};
/**
 * This TypeScript React component, `ProductList`, fetches and displays a list of products based on
 * certain criteria.
 * @property {string} userId - The `userId` property in the `ProductList` component is used to filter
 * products based on a specific user ID. This allows you to display products that belong to a
 * particular user.
 * @property {string | null} status - The `status` property in the `ProductList` component is used to
 * filter products based on their status. It allows you to specify a specific status value to only
 * display products with that status. If you don't provide a `status` value, all products will be
 * displayed regardless of their status.
 * @property {string} onclickURL - The `onclickURL` property in the `ProductList` component is a string
 * that represents the URL that should be navigated to when a user clicks on a product card. This URL
 * is passed down to the `ProductCard` component as a prop and used to handle the click event for each
 * product
 * @property {string} exceptUserId - The `exceptUserId` property in the `ProductList` component is used
 * to specify a user ID that should be excluded from the list of products displayed. This means that if
 * a product belongs to the `exceptUserId`, it will not be shown in the list.
 * @property {string} exceptStatus - The `exceptStatus` property in the `ProductList` component is used
 * to specify a status value that should be excluded when fetching products. This means that when
 * fetching products, any product with the specified `exceptStatus` will not be included in the result
 * set. This can be useful for filtering out
 * @property {boolean} hideDeleteButton - The `hideDeleteButton` property in the `ProductList`
 * component is a boolean flag that determines whether to show or hide the delete button on each
 * `ProductCard` component rendered in the list. If `hideDeleteButton` is set to `true`, the delete
 * button will be hidden. If
 */
export default function ProductList({
  userId,
  status,
  onclickURL,
  exceptUserId,
  exceptStatus,
  hideDeleteButton,
}: productListProps) {
  // const productQuery = useQuery<Product[]>({
  //   queryKey: ["products", userId, status, exceptUserId, exceptStatus],
  //   queryFn: () => getProducts(userId, status, exceptUserId, exceptStatus),
  // });
  // const { data: products, isLoading, error } = productQuery;

  const {
    data: products,
    isLoading,
    error,
  } = useGetProductsQuery({
    userId,
    status,
    exceptUserId,
    exceptStatus,
  });

  if (isLoading) {
    return <div>Fetching Data</div>;
  }

  if (error || !products) {
    return <div>Error fetching data</div>;
  }

  if (products.length === 0) {
    return <div>No product in the database, consider adding some</div>;
  }

  return (
    <div className="w-full">
      {products.map((product: Product) => (
        <ProductCard
          key={product.id}
          product={product}
          status={status}
          onclickURL={onclickURL}
          hideDeleteButton={hideDeleteButton}
        />
      ))}
    </div>
  );
}
