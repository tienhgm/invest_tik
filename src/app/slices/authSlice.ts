import { createSlice } from '@reduxjs/toolkit';
// import { handleLoading } from './globalSlice';
import { RootState } from 'app/store';
export interface AuthState {
  curUser: any;
  isLoggedIn: boolean;
}

const initialState: AuthState = {
  curUser: undefined,
  isLoggedIn: false,
};
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // auth(state: any) {
    //   state.loading = true;
    // },
    authSuccess(state: any) {
      state.isLoggedIn = true;
    },
    logout() {
      return initialState;
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
