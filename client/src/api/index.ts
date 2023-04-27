import {
  PostInterface,
  StateInterface,
  UserInterface,
  VeriyTokenInterface,
} from "./../state/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { LoginInterface, LoginInterfaceUser } from "./types";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    prepareHeaders(headers, { getState }) {
      const { persistedReducer } = getState() as StateInterface;
      if (persistedReducer.token) {
        headers.set("Authorization", `Bearer ${persistedReducer.token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation<LoginInterface, LoginInterfaceUser>({
      query: (values) => ({
        url: "auth/login",
        method: "POST",
        body: values,
      }),
    }),
    register: builder.mutation<UserInterface, FormData>({
      query: (formData) => ({
        url: "auth/register",
        method: "POST",
        body: formData,
      }),
    }),
    getFeeds: builder.query<void, void>({
      query: (userId = "") =>
        `/posts/${userId}${userId.length > 0 ? "/posts" : ""}`,
      providesTags: ["posts"],
    }),
    postPost: builder.mutation<PostInterface, FormData>({
      query: (formData) => ({
        url: "posts",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["posts"],
    }),
    likeDislikePost: builder.mutation<void, void>({
      query: (postId) => ({
        url: `posts/${postId}/like`,
        method: "PATCH",
      }),
      invalidatesTags: ["posts"],
    }),
    addFriend: builder.mutation<void, string>({
      query: (combinedId) => ({
        url: `users/${combinedId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["posts", "verifyToken", "getUserFriends"],
    }),
    getUserFriends: builder.query({
      query: (userId) => `users/${userId}/friends`,
      providesTags: ["getUserFriends"],
    }),
    getUser: builder.query({
      query: (userId) => `users/${userId}`,
      providesTags: ["getUser"],
    }),
    verifyToken: builder.query<VeriyTokenInterface, { skip?: boolean }>({
      query: () => `/verifyToken`,
      providesTags: ["verifyToken"],
    }),
  }),
});

export type ApiType = ReturnType<typeof api.reducer>;
export const {
  useVerifyTokenQuery,
  useLoginMutation,
  useRegisterMutation,
  usePostPostMutation,
  useGetFeedsQuery,
  useLikeDislikePostMutation,
  useAddFriendMutation,
  useGetUserFriendsQuery,
  useGetUserQuery,
} = api;
