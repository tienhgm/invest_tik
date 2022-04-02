import { configureStore, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './rootSaga';
import authReducer from './slices/authSlice';
import { persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage';
const rootReducer = combineReducers({
  auth: authReducer
})
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};
const persistedReducer = persistReducer(persistConfig, rootReducer)

const sagaMiddleware = createSagaMiddleware()
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({serializableCheck: false}).concat(sagaMiddleware),
});
sagaMiddleware.run(rootSaga)
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;