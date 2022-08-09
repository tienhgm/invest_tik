import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { handleLoading } from './globalSlice';
import { RootState } from 'app/store';
export interface AuthState {
  curUser: any;
  loading: boolean;
  isLoggedIn: boolean;
}

const initialState: AuthState = {
  curUser: undefined,
  isLoggedIn: false,
  loading: false,
};
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    auth(state: any, action: PayloadAction<any>) {
      state.loading = true;
    },
    authSuccess(state: any, action: PayloadAction<any>) {
      state.loading = false;
    },
    authFailed(state: any, action: PayloadAction<any>) {
      state.loading = false;
    },
    logout(state: any, action: PayloadAction<any>) {
      return initialState;
    },
  },
});
// Actions
export const authActions = authSlice.actions;

// Selectors
export const selectCurrentUser = (state: RootState) => state.auth?.curUser;
export const selectAuthLoading = (state: RootState) => state.auth?.loading;
export const selectIsLoggedIn = (state: RootState) => state.auth?.isLoggedIn;
// Reducer
const authReducer = authSlice.reducer;
export default authReducer;
