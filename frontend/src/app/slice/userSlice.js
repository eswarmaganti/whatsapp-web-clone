import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: localStorage.getItem("whatsAppUserInfo")
    ? JSON.parse(localStorage.getItem("whatsAppUserInfo")).user
    : {},
};

export const userSlice = createSlice({
  name: "whatsAppUserInfo",
  initialState,
  reducers: {
    setUserInfo: (state, data) => {
      localStorage.setItem(
        "whatsAppUserInfo",
        JSON.stringify({ user: data.payload })
      );
      state.user = { ...data.payload };
    },
  },
});

export const { setUserInfo } = userSlice.actions;

export default userSlice.reducer;
