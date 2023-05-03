import {
  FriendInterface,
  PostInterface,
  StateInterface,
  UserInterface,
  VerifyTokenInterface,
  LoginInterface,
  LoginInterfaceUser,
  GetPostInterface,
  VerifyTokenQueryInterface,
  GetCommentsInterface,
  GetPostInterfaceQuery,
} from "@/api/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

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
  tagTypes: ["posts", "verifyToken", "getUser", "getUserFriends", "comments"],
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
    getFeeds: builder.query<
      GetPostInterfaceQuery,
      { userId: string; page: number; limit: number }
    >({
      query: ({ userId = "", page = 1, limit = 12 }) =>
        `/posts/${userId}${
          userId.length > 0 ? "/posts" : ""
        }?page=${page}&limit=${limit}`,
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
    likeDislikePost: builder.mutation<GetPostInterface, string>({
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
    getUserFriends: builder.query<Array<FriendInterface>, string>({
      query: (userId) => `users/${userId}/friends`,
      providesTags: ["getUserFriends"],
    }),
    getUser: builder.query({
      query: (userId) => `users/${userId}`,
      providesTags: ["getUser"],
    }),
    getPostComments: builder.query<
      GetCommentsInterface,
      { postId: string; page: number; limit: number }
    >({
      query: ({ postId, page, limit }) =>
        `posts/${postId}/comments?page=${page}&limit=${limit}`,
      providesTags: ["comments"],
    }),
    postComment: builder.mutation<
      void,
      { postId: string; correctForm: string }
    >({
      query: (parameters) => ({
        url: `posts/${parameters.postId}/comments`,
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: parameters.correctForm,
      }),
      invalidatesTags: ["posts", "comments"],
    }),
    likeComment: builder.mutation<void, string>({
      query: (commentId) => ({
        url: `comments/${commentId}/like`,
        method: "POST",
      }),
      invalidatesTags: ["comments"],
    }),
    verifyToken: builder.query<VerifyTokenInterface, VerifyTokenQueryInterface>(
      {
        query: () => `/verifyToken`,
        providesTags: ["verifyToken"],
      }
    ),
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
  useGetPostCommentsQuery,
  usePostCommentMutation,
  useLikeCommentMutation,
} = api;
