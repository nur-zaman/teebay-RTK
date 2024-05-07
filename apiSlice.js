// apiSlice.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }), // Adjust base URL as needed
  tagTypes: ['Products'], // Define a tag type for products
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({ userId, status, exceptUserId, exceptStatus }) => {
        const queryParams = new URLSearchParams();
        if (userId) queryParams.append('userId', userId);
        if (status === null) queryParams.append('status', 'null');
        else if (status) queryParams.append('status', status);
        if (exceptUserId) queryParams.append('exceptUserId', exceptUserId);
        if (exceptStatus) queryParams.append('exceptStatus', exceptStatus);

        const queryString = queryParams.toString();
        return `/api/get-products${queryString ? '?' + queryString : ''}`;
      },
      providesTags: ['Products'], // Provide the 'Products' tag for this query
    }),
    deleteProduct: builder.mutation({
      query: (productId) => ({
        url: `/api/delete-product`,
        method: 'DELETE',
        body: { productId },
      }),
      invalidatesTags: ['Products'], // Invalidate the 'Products' tag after deletion
    }),
    createProduct: builder.mutation({
        query: (product) => ({
          url: `/api/add-product`,
          method: 'POST',
          body: product,
        }),
        invalidatesTags: ['Products'], // Invalidate 'Products' tag after creation
      }),

      updateProduct: builder.mutation({
        query: (product) => ({
          url: `/api/update-product`,
          method: 'PUT',
          body: product,
        }),
        invalidatesTags: ['Products'], // Invalidate 'Products' tag after update
      }),


      buyProduct: builder.mutation({
        query: ({ userId, productId }) => ({
          url: `/api/buy-product`,
          method: 'POST',
          body: { userId, productId },
        }),
        invalidatesTags: ['Products'],
      }),
      rentProduct: builder.mutation({
        query: ({ userId, productId, startDate, endDate }) => ({
          url: `/api/rent-product`,
          method: 'POST',
          body: { userId, productId, startDate, endDate },
        }),
        invalidatesTags: ['Products'],
      }),
  }),
});


export const { useUpdateProductMutation } = apiSlice;
export const { useCreateProductMutation } = apiSlice;
export const { useGetProductsQuery, useDeleteProductMutation } = apiSlice;
export const { useBuyProductMutation, useRentProductMutation } = apiSlice;