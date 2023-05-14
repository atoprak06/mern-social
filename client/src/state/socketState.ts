import { SocketStateInterface } from "@/api/types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: SocketStateInterface = {
  activeUsers: [],
};

export const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    setActiveUsers: (state, action) => {
      state.activeUsers = action.payload;
    },
  },
});

export const { setActiveUsers } = socketSlice.actions;
export default socketSlice.reducer;
