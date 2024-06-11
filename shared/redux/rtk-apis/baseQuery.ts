import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseURL } from "./api.config";

export const baseQuery = fetchBaseQuery({ baseUrl: baseURL });
