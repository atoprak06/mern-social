import { createSlice } from "@reduxjs/toolkit";
import { AuthInterface } from "@/api/types";

const initialState: AuthInterface = {
  mode: "light",
  token: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state, action) => {
      state.mode = action.payload;
    },
    setLogin: (state, action) => {
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.token = null;
    },
  },
});

export const { setLogin, setLogout, setMode } = authSlice.actions;

export default authSlice.reducer;
