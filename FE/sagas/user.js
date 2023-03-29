import axios from "axios";
import { put, delay, call, fork, takeLatest, all } from "redux-saga/effects";
import * as ACTIONS from "../reducers/actions";

// API 호출만 제너레이터 함수 아님
function signUpAPI(data) {
  return axios.get("/api/signUp");
}

function signInAPI(data) {
  return axios.get("/api/signIn");
}

function signOutAPI() {
  return axios.get("/api/signOut");
}

// 비동기 요청이 실패하는 경우 대비해 try... catch... 처리 필수
// 특정 타입의 action이 발생하면 action 객체가 자동으로 매개변수로 전달됨(이벤트 핸들러 느낌)
export function* signUp(action) {
  try {
    // 서버 구현 전 비동기 처리
    yield delay(1000);
    // call은 call, apply 처럼 매개변수를 펴 넣어줌
    // const result = yield call(signUpAPI, action.data);
    yield put({
      type: ACTIONS.SIGN_UP_SUCCESS,
      data: action.data,
    });
  } catch (err) {
    yield put({
      type: ACTIONS.SIGN_UP_FAILURE,
      error: err.response.data,
    });
  }
}

export function* signIn(action) {
  try {
    // 서버 구현 전 비동기 처리
    yield delay(1000);
    // call은 call, apply 처럼 매개변수를 펴 넣어줌
    // const result = yield call(signInAPI, action.data);
    yield put({
      type: ACTIONS.SIGN_IN_SUCCESS,
      data: action.data,
    });
  } catch (err) {
    yield put({
      type: ACTIONS.SIGN_IN_FAILURE,
      error: err.response.data,
    });
  }
}

export function* signOut() {
  try {
    // 서버 구현 전 비동기 처리
    yield delay(1000);
    // yield call(signOutAPI);
    yield put({
      type: ACTIONS.SIGN_OUT_SUCCESS,
    });
  } catch (err) {
    yield put({
      type: ACTIONS.SIGN_OUT_FAILURE,
      error: err.response.data,
    });
  }
}

// 비동기 action Creator로 이벤트 리스너처럼 동작
// 단, while (true) 처리 하지 않으면 1회용 -> takeEvery 변경
// 사용자의 잘못된 연속 클릭 중복 처리 방지 -> takeLatest 처리
// TODO 서버측 별도 검사 없으면, throttle로 변경
export function* watchSignUp() {
  yield takeLatest(ACTIONS.SIGN_UP_REQUEST, signUp);
}

export function* watchSignIn() {
  yield takeLatest(ACTIONS.SIGN_IN_REQUEST, signIn);
}

export function* watchSignOut() {
  yield takeLatest(ACTIONS.SIGN_OUT_REQUEST, signOut);
}

export default function* userSaga() {
  yield all([fork(watchSignUp), fork(watchSignIn), fork(watchSignOut)]);
}
