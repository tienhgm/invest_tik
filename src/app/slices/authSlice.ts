import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { LoginPayload } from 'common';
// import { errorMes, successMes } from 'helper/notify';
// import { handleGetCsrfToken, handleLogin, handleLogout, handleRegister } from 'apis/auth';
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
// export const registerThunk = createAsyncThunk(
//   'auth/registerThunk',
//   async (payload: LoginPayload) => {
//     try {
//       const res = await handleRegister(payload);
//       if (res) {
//         successMes('Register success!');
//         return res;
//       }
//     } catch (error: any) {
//       errorMes(error.data.message);
//     }
//   }
// );
// export const getCsrfToken = createAsyncThunk(
//   'auth/csrfToken',
//   async () => {
//     try {
//       const res = await handleGetCsrfToken();
//       if (res) {
//         return res;
//       }
//     } catch (error: any) {
//     }
//   }
// );
// export const loginThunk = createAsyncThunk('auth/loginThunk', async (payload: LoginPayload) => {
//   try {
//     const res = await handleLogin(payload);
//     if (res) {
//       successMes('Login success!');
//       return res;
//     }
//   } catch (error: any) {
//     errorMes(error.data.message);
//   }
// });
// export const logoutThunk = createAsyncThunk('auth/logoutThunk', async () => {
//   try {
//     const res = await handleLogout();
//     if (res) {
//       successMes('Logout');
//       return res;
//     }
//   } catch (error: any) {
//     errorMes(error.data.message);
//   }
// });
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
