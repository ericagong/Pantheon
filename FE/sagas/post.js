import axios from "axios";
import shortId from "shortid";
import { put, delay, call, takeLatest, all, fork } from "redux-saga/effects";
import * as ACTIONS from "../reducers/actions";

// API 호출
export function createPostAPI(data) {
  axios.post("/api/post/create", data);
}

export function createCommentAPI(data) {
  axios.post("/api/post/create", data);
}

// 서버 통신 모방을 위한 더미 데이터 생성 함수
const createDummyPost = (data) => ({
  id: shortId.generate(),
  Images: [],
  Comments: [],
  ...data,
});

const createDummyComment = (data) => {
  return {
    id: shortId.gernerate(),
    User: data.User,
    content: data.content,
  };
};

// 비동기 처리 함수
export function* createPost(action) {
  try {
    // const response = yield call(createPostAPI, action.data)
    yield delay(1000);
    yield put({
      type: ACTIONS.CREATE_POST_SUCCESS,
      data: createDummyPost(action.data),
    });
  } catch (err) {
    yield put({
      type: ACTIONS.CREATE_POST_FAILURE,
      error: err.response.data,
    });
  }
}

export function* createComment(action) {
  try {
    // const response = yield call(createCommentAPI, action.data)
    yield delay(1000);
    yield put({
      type: ACTIONS.CREATE_COMMENT_SUCCESS,
      data: {
        comment: createDummyComment(action.data),
        postId: action.data.postId,
      },
    });
  } catch (err) {
    yield put({
      type: ACTIONS.CREATE_COMMENT_FAILURE,
      error: err.response.data,
    });
  }
}

// 액션 핸들러
export function* watchCreatePost() {
  yield takeLatest(ACTIONS.CREATE_POST_REQUEST, createPost);
}

export function* watchCreateComment() {
  yield takeLatest(ACTIONS.CREATE_COMMENT_REQUEST, createComment);
}

// saga
export default function* postSaga() {
  yield all([fork(watchCreatePost), fork(watchCreateComment)]);
}
