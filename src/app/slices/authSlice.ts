import { createSlice } from '@reduxjs/toolkit';
// import { handleLoading } from './globalSlice';
import { RootState } from 'app/store';
export interface AuthState {
  curUser: any;
  isLoggedIn: boolean;
  twoFa: boolean;
}

const initialState: AuthState = {
  curUser: undefined,
  isLoggedIn: false,
  twoFa: false,
};
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // auth(state: any) {
    //   state.loading = true;
    // },
    authSuccess(state: any, action: any) {
      state.isLoggedIn = action.payload;
      state.twoFa = false;
    },
    authTwoFa(state: any, action: any) {
      state.isLoggedIn = false;
      state.twoFa = action.payload;
    },
    logout(state: any) {
      state.isLoggedIn = false;
    },
  },
});
// Actions
export const authActions = authSlice.actions;

// Selectors
export const selectCurrentUser = (state: RootState) => state.auth?.curUser;
export const selectIsLoggedIn = (state: RootState) => state.auth?.isLoggedIn;
// Reducer
const authReducer = authSlice.reducer;
export default authReducer;
