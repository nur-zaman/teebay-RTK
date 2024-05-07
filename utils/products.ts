import { Product } from "@/types/productType";
import { apiURL } from "./apiUrl";

export async function getProducts(
  userId?: string,
  status?: Product["status"] | string | null,
  exceptUserId?: string,
  exceptStatus?: Product["status"] | string | null
): Promise<Product[]> {
  const queryParams: URLSearchParams = new URLSearchParams();
  if (userId) {
    queryParams.append("userId", userId);
  }
  if (status === null) {
    queryParams.append("status", "null");
  } else if (status && status != null) {
    queryParams.append("status", status);
  }
  if (exceptUserId) {
    queryParams.append("exceptUserId", exceptUserId);
  }
  if (exceptStatus) {
    queryParams.append("exceptStatus", exceptStatus);
  }

  const route = `${apiURL}/api/get-products${
    queryParams.toString().length > 0 ? `?${queryParams.toString()}` : ""
  }`;
  const res = await fetch(route);

  if (!res.ok) {
    throw new Error(`Failed to fetch products: ${res.statusText}`);
  }

  const products = (await res.json()) as Product[];
  return products;
}

export async function deleteProduct(productId: string) {
  const response = await fetch(`${apiURL}/api/delete-product`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ productId }),
  });

  return response;
}

export async function createProduct(product: Product) {
  const response = await fetch(`${apiURL}/api/add-product`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });

  return response;
}

export async function updateProduct(product: Product) {
  const response = await fetch(`${apiURL}/api/update-product`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });

  return response;
}

export async function buyProduct(userId: string, productId: string) {
  const response = await fetch(`${apiURL}/api/buy-product`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId, productId }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to purchase product");
  }

  const data = await response.json();
  return data;
}

export async function rentProduct(
  userId: string,
  productId: string,
  startDate: Date, // YYYY-MM-DD format
  endDate: Date // YYYY-MM-DD format
) {
  const formattedStartDate = startDate.toISOString();
  const formattedEndDate = endDate.toISOString();

  const response = await fetch(`${apiURL}/api/rent-product`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId,
      productId,
      startDate: formattedStartDate,
      endDate: formattedEndDate,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to rent product");
  }

  const data = await response.json();
  return data;
}
