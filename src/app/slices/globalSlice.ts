import { createSlice } from "@reduxjs/toolkit";
import { RootState } from 'app/store';

interface AppState {
  loading: boolean;
}

const initialState: AppState = {
  loading: false,
}

const globalSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    handleLoading(state: any, action:any) {
      state.loading = action.payload;
    },
  },
});

export const { handleLoading } = globalSlice.actions;
export const selectLoading = (state: RootState) => state.global?.loading;

const globalReducer = globalSlice.reducer;

export default globalReducer;
