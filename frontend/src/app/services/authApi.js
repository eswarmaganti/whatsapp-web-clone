import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/user/" }),
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (data) => ({
        url: "login",
        method: "POST",
        body: data,
      }),
    }),
    registerUser: builder.mutation({
      query: (data) => ({
        url: "register",
        method: "POST",
        body: data,
      }),
    }),
    updateUserProfile: builder.mutation({
      query: ({ about, name, image, password, token }) => ({
        url: "",
        method: "PUT",
        body: { about, name, password, image },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    searchUsers: builder.query({
      query: ({ searchText, token }) => ({
        url: `?search=${searchText}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
});

export const {
  useLoginUserMutation,
  useRegisterUserMutation,
  useLazySearchUsersQuery,
  useUpdateUserProfileMutation,
} = authApi;
