import axios from "axios";
import { put, call, take, all } from "redux-saga/effects";

const SIGN_IN_REQUEST = "SIGN_IN_REQUEST";
const SIGN_IN_SUCCESS = "SIGN_IN_SUCCESS";
const SIGN_IN_FAILURE = "SIGN_IN_FAILURE";

const SIGN_OUT_REQUEST = "SIGN_OUT_REQUEST";
const SIGN_OUT_SUCCESS = "SIGN_OUT_SUCCESS";
const SIGN_OUT_FAILURE = "SIGN_OUT_FAILURE";

// API 호출만 제너레이터 함수 아님
function signInAPI(data, a, b, c) {
  return axios.get("/api/signIn");
}

function signOutAPI() {
  return axios.get("/api/signOut");
}

// 비동기 요청이 실패하는 경우 대비해 try... catch... 처리 필수
// 특정 타입의 action이 발생하면 action 객체가 자동으로 매개변수로 전달됨(이벤트 핸들러 느낌)
export function* signIn(action) {
  try {
    // call은 call, apply 처럼 매개변수를 펴 넣어줌
    const result = yield call(signInAPI, action.data, "a", "b", "c");
    yield put({
      type: SIGN_IN_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: SIGN_IN_FAILURE,
      data: err.response.data,
    });
  }
}

export function* signOut() {
  try {
    yield call(signOutAPI);
    yield put({
      type: SIGN_OUT_SUCCESS,
    });
  } catch (err) {
    yield put({
      type: SIGN_OUT_FAILURE,
      data: err.response.data,
    });
  }
}

// 비동기 action Creator로 이벤트 리스너처럼 동작
// 단, while (true) 처리 하지 않으면 1회용
export function* watchSignIn() {
  while (true) {
    yield take(SIGN_IN_REQUEST, signIn);
  }
}

export function* watchSignOut() {
  while (true) {
    yield take(SIGN_OUT_REQUEST, signOut);
  }
}

export default function* rootSaga() {
  yield all([fork(watchSignIn), fork(watchSignOut)]);
}
