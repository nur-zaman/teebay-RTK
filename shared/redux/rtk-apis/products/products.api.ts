"use client";
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "@/shared/redux/rtk-apis/baseQuery";
import {
  FilterProductDto,
  CreateProductDto,
  UpdateProductDto,
  BuyProductDto,
  RentProductDto,
} from "@/shared/typedefs";
import { Product } from "@/types/productType";
export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: baseQuery,
  tagTypes: ["Products"],
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], FilterProductDto>({
      query: (filterProductDto: FilterProductDto) => ({
        url: `/product`,
        method: "GET",
        params: filterProductDto,
      }),
      providesTags: ["Products"],
    }),
    deleteProduct: builder.mutation<void, string>({
      query: (productId) => ({
        url: `/product/${productId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products"],
    }),
    createProduct: builder.mutation<Product, CreateProductDto>({
      query: (product) => ({
        url: `/product`,
        method: "POST",
        body: product,
      }),
      invalidatesTags: ["Products"],
    }),
    updateProduct: builder.mutation<Product, UpdateProductDto>({
      query: ({ id, ...patch }) => ({
        url: `/product/${id}`,
        method: "PATCH",
        body: patch,
      }),
      invalidatesTags: ["Products"],
    }),
    buyProduct: builder.mutation<void, BuyProductDto>({
      query: (buyProductDto: BuyProductDto) => ({
        url: `/product/buy`,
        method: "POST",
        body: buyProductDto,
      }),
      invalidatesTags: ["Products"],
    }),
    rentProduct: builder.mutation<void, RentProductDto>({
      query: (rentProductDto: RentProductDto) => ({
        url: `/product/rent`,
        method: "POST",
        body: rentProductDto,
      }),
      invalidatesTags: ["Products"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useDeleteProductMutation,
  useCreateProductMutation,
  useUpdateProductMutation,
  useBuyProductMutation,
  useRentProductMutation,
} = productsApi;
