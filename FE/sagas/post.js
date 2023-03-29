import axios from "axios";
import { put, delay, call, takeLatest, all, fork } from "redux-saga/effects";

const CREATE_POST_REQUEST = "CREATE_POST_REQUEST";
const CREATE_POST_SUCCESS = "CREATE_POST_SUCCESS";
const CREATE_POST_FAILURE = "CREATE_POST_FAILURE";

export function addPostAPI(data) {
  axios.post("/api/post/create", data);
}

export function* addPost(action) {
  try {
    // const response = yield call(addPostAPI, action.data)
    yield delay(1000);
    yield put({
      type: CREATE_POST_SUCCESS,
      // data: response.data
    });
  } catch (err) {
    yield put({
      type: CREATE_POST_FAILURE,
      data: err.response.data,
    });
  }
}

export function* watchAddPost() {
  yield takeLatest(CREATE_POST_REQUEST, addPost);
}

export default function* postSaga() {
  yield all([fork(watchAddPost)]);
}
