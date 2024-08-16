import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "../../constants";

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
      baseUrl: API_BASE_URL,
      prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.token
        if (token) {
          headers.set('authorization', `Bearer ${token}`)
        }
        return headers
      },
    }),
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: 'auth/login/',
                method: 'POST',
                body: credentials,
        }),
        register: builder.mutation({
            query: (userData) => ({
                url: 'auth/register/',
                method: 'POST',
                body: userData,
            }),
      }),
    }),
  })
})
  
  export const { useLoginMutation, userRegisterMutation} = authApi;