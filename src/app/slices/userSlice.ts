import { createSlice } from "@reduxjs/toolkit";

interface userState {
  userInfo: any;
}

const initialState: userState = {
    userInfo: null,
}

const userSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setUserInfo(state: any, action:any) {
      state.userInfo = action.payload;
    },
  },
});

export const { setUserInfo } = userSlice.actions;

const userReducer = userSlice.reducer;

export default userReducer;
