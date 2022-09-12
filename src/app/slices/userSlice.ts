import { createSlice } from '@reduxjs/toolkit';

interface userState {
  userInfo: any;
  isGetMe: boolean;
}

const initialState: userState = {
  userInfo: null,
  isGetMe: false,
};

const userSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setUserInfo(state: any, action: any) {
      state.userInfo = action.payload;
    },
    setIsGetMe(state: any, action: any) {
      state.isGetMe = action.payload;
    },
  },
});

export const { setUserInfo, setIsGetMe } = userSlice.actions;

const userReducer = userSlice.reducer;

export default userReducer;
