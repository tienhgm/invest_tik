// import { LoginPayload } from 'common';
// import { authActions } from "app/slices/authSlice";
// import { takeLatest, call } from "redux-saga/effects";
// import { PayloadAction } from '@reduxjs/toolkit';
// import authApi, { handleRegister } from 'apis/auth/index';

// import { fork } from "redux-saga/effects";


// function* flowRegister(action: PayloadAction<LoginPayload>) {
//     console.log('saga', action.payload)
//     // const response:any = yield call(authApi.post, action.payload)
//     // yield put()
//     // if (response) console.log(response)
// }
// function* watchLoginFlow() {
//     while (true) {
//         const isLoggedIn = Boolean(localStorage.getItem('access_token'));
//         if (!isLoggedIn) {
//             // Tạm dừng đến khi nhận được action login()
//             const action: PayloadAction<LoginPayload> = yield take(authActions.login.type)
//             yield fork(handleLogin, action.payload)
//         }
//         // Tạm dừng cho đến khi nhận đc action logout()
//         yield take(authActions.logout.type)
//         yield call(handleLogout)
//     }
// }
export function* authSaga() {
    // yield fork(watchLoginFlow);
    // yield takeLatest(authActions.register.type, flowRegister)
}