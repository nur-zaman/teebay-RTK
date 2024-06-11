"use client";
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "@/shared/redux/rtk-apis/baseQuery";
import { CreateUserDto, LoginDto } from "@/shared/typedefs";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    signup: builder.mutation<void, CreateUserDto>({
      query: (createUserDto) => ({
        url: `/signup`,
        method: "POST",
        body: createUserDto,
      }),
    }),
    login: builder.mutation<void, LoginDto>({
      query: (loginDto) => ({
        url: `/signin`,
        method: "POST",
        body: loginDto,
      }),
    }),
  }),
});

export const { useSignupMutation, useLoginMutation } = userApi;
