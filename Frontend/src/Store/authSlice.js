import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: "",
    name: "",
    email: "",
    id: "",
    accessToken: "",
    refreshToken: "",
  },
  reducers: {
    setIsLoggedIn(state, action) {
      state.isLoggedIn = action.payload.isLoggedIn;
    },
    setName(state, action) {
      state.name = action.payload.name;
    },
    setEmail(state, action) {
      state.email = action.payload.email;
    },
    setId(state, action) {
      state.id = action.payload.id;
    },
    setAccessToken(state, action) {
      state.accessToken = action.payload.accessToken;
    },
    setRefreshToken(state, action) {
      state.refreshToken = action.payload.refreshToken;
    },
    setAllData(state, action) {
      const { isLoggedIn, email, name, id, accessToken, refreshToken } =
        action.payload;

      state.isLoggedIn = isLoggedIn;
      state.name = name;
      state.email = email;
      state.id = id;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
    },
  },
});

export default authSlice.reducer;
export const {
  setIsLoggedIn,
  setAllData,
  setId,
  setName,
  setAccessToken,
  setRefreshToken,
  setEmail,
} = authSlice.actions;
