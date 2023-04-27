import { createSlice } from "@reduxjs/toolkit";
import { AuthInterface } from "./types";

const initialState: AuthInterface = {
  mode: "light",
  token: null,
  posts: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state, action) => {
      state.mode = action.payload;
    },
    setLogin: (state, action) => {
      // state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.token = null;
    },
    setPost: (state, action) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post.id) return action.payload.post;
        return post;
      });
      state.posts = updatedPosts;
    },
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
    setFriends: (state, action) => {
      if (state.user) {
        state.user.friends = action.payload.friends;
      } else {
        console.error("user friends non-existent :(");
      }
    },
  },
});

export const { setLogin, setLogout, setPost, setPosts, setFriends, setMode } =
  authSlice.actions;

export default authSlice.reducer;
