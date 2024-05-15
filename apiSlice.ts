"use client";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseURL = "http://localhost:3456/api";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
  tagTypes: ["Products"],
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (filterProductDto) => ({
        url: `/product`,
        method: "GET",
        params: filterProductDto,
      }),
      providesTags: ["Products"],
    }),
    deleteProduct: builder.mutation({
      query: (productId) => ({
        url: `/product/${productId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products"],
    }),
    createProduct: builder.mutation({
      query: (product) => ({
        url: `/product`,
        method: "POST",
        body: product,
      }),
      invalidatesTags: ["Products"],
    }),
    updateProduct: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `/product/${id}`,
        method: "PATCH",
        body: patch,
      }),
      invalidatesTags: ["Products"],
    }),
    buyProduct: builder.mutation({
      query: (buyProductDto) => ({
        url: `/product/buy`,
        method: "POST",
        body: buyProductDto,
      }),
      invalidatesTags: ["Products"],
    }),
    rentProduct: builder.mutation({
      query: (rentProductDto) => ({
        url: `/product/rent`,
        method: "POST",
        body: rentProductDto,
      }),
      invalidatesTags: ["Products"],
    }),

    signup: builder.mutation({
      query: (createUserDto) => ({
        url: `/signup`,
        method: "POST",
        body: createUserDto,
      }),
    }),
    login: builder.mutation({
      query: (loginDto) => ({
        url: `/signin`,
        method: "POST",
        body: loginDto,
      }),
    }),
  }),
});

export const { useSignupMutation, useLoginMutation } = apiSlice;
export const { useUpdateProductMutation } = apiSlice;
export const { useCreateProductMutation } = apiSlice;
export const { useGetProductsQuery, useDeleteProductMutation } = apiSlice;
export const { useBuyProductMutation, useRentProductMutation } = apiSlice;
