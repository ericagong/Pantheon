import axios from "axios";
import { put, delay, call, takeLatest, all, fork } from "redux-saga/effects";
import * as ACTIONS from "../reducers/actions";

export function addPostAPI(data) {
  axios.post("/api/post/create", data);
}

export function* addPost(action) {
  try {
    // const response = yield call(addPostAPI, action.data)
    yield delay(1000);
    yield put({
      type: ACTIONS.CREATE_POST_SUCCESS,
      // data: response.data
    });
  } catch (err) {
    yield put({
      type: ACTIONS.CREATE_POST_FAILURE,
      error: err.response.data,
    });
  }
}

export function* watchAddPost() {
  yield takeLatest(ACTIONS.CREATE_POST_REQUEST, addPost);
}

export default function* postSaga() {
  yield all([fork(watchAddPost)]);
}
