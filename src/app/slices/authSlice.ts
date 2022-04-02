import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LoginPayload } from 'common';
import { errorMes, successMes } from 'helper/notify';
import { handleActivate, handleLogin, handleLogout, handleRegister } from 'apis/auth';
import { RootState } from 'app/store';
export interface AuthState {
    curUser: any;
    loading: boolean;
    isLoggedIn: boolean;
    isRegisterSuccess?: boolean;
}

const initialState: AuthState = {
    curUser: undefined,
    isLoggedIn: false,
    loading: false,
    isRegisterSuccess: false,
}
export const registerThunk = createAsyncThunk("auth/registerThunk", async (payload: LoginPayload) => {
    try {
        const res = await handleRegister(payload);
        if (res) {
            successMes("Register success!")
            return res;
        }
    } catch (error: any) {
        errorMes(error.data.email);
    }
});
export const loginThunk = createAsyncThunk("auth/loginThunk", async (payload: LoginPayload) => {
    try {
        const res = await handleLogin(payload);
        if (res) {
            successMes("Login success!")
            return res;
        }
    } catch (error: any) {
        errorMes(error.data.email);
    }
});
export const logoutThunk = createAsyncThunk("auth/logoutThunk", async () => {
    try {
        const res = await handleLogout();
        if (res) {
            successMes("Logout")
            return res;
        }
    } catch (error: any) {
        errorMes(error.data.email);
    }
});
export const activateThunk = createAsyncThunk("auth/activateThunk", async (payload: string) => {
    try {
        const res = await handleActivate(payload);
        if (res) {
            successMes("Activated!")
            return res;
        }
    } catch (error: any) {
        errorMes(error.data.email);
    }
});
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
    },
    extraReducers: {
        // @ts-ignore
        [registerThunk.pending]: (state: any) => {
            state.loading = true;
        },
        // @ts-ignore
        [registerThunk.fulfilled]: (state: any, action: PayloadAction<any>) => {
            state.loading = false;
            state.isRegisterSuccess = true;
            state.curUser = action.payload
        },
        // @ts-ignore
        [loginThunk.pending]: (state: any, action: PayloadAction<any>) => {
            state.loading = true;
        },
        // @ts-ignore
        [loginThunk.fulfilled]: (state: any, action: PayloadAction<any>) => {
            state.loading = false;
            state.isLoggedIn = true;
            state.curUser = action.payload
        },
        // @ts-ignore
        [logoutThunk.fulfilled]: (state: any, action: PayloadAction<any>) => {
            return initialState;
        },
    }
})
// Actions
export const authActions = authSlice.actions;

// Selectors
export const selectCurrentUser = (state: RootState) => state.auth?.curUser
export const selectIsRegisterSuccess = (state: RootState) => state.auth?.isRegisterSuccess
export const selectAuthLoading = (state: RootState) => state.auth?.loading
export const selectIsLoggedIn = (state: RootState) => state.auth?.isLoggedIn
// Reducer
const authReducer = authSlice.reducer;
export default authReducer; 