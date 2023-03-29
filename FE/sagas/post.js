import axios from "axios";
import shortId from "shortid";
import { put, delay, call, takeLatest, all, fork } from "redux-saga/effects";
import * as ACTIONS from "../reducers/actions";

// API 호출
export function createPostAPI(data) {
  axios.post("/api/post", data);
}

export function removePostAPI(data) {
  axios.delete("/api/post", data);
}

export function createCommentAPI(data) {
  axios.post("/api/comment", data);
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
    const dummyPost = createDummyPost(action.data);
    // 신규 post 생성
    yield put({
      type: ACTIONS.CREATE_POST_SUCCESS,
      data: dummyPost,
    });
    // 생성 post를 나의 post 목록에 추가
    yield put({
      type: ACTIONS.ADD_POST_TO_ME,
      data: dummyPost.id,
    });
  } catch (err) {
    yield put({
      type: ACTIONS.CREATE_POST_FAILURE,
      error: err.response.data,
    });
  }
}

export function* deletePost(action) {
  try {
    // const response = yield call(deletePost, action.data)
    yield delay(1000);
    // 선택 post 삭제
    yield put({
      type: ACTIONS.DELETE_POST_SUCCESS,
      data: {
        postId: action.data.postId,
      },
    });
    // 삭제 post를 나의 post 목록에서 제외
    yield put({
      type: ACTIONS.REMOVE_POST_OF_ME,
      data: {
        postId: action.data.postId,
      },
    });
  } catch (err) {
    yield put({
      type: ACTIONS.DELETE_POST_FAILURE,
      data: err.response.data,
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

export function* watchDeletePost() {
  yield takeLatest(ACTIONS.DELETE_POST_REQUEST, deletePost);
}

export function* watchCreateComment() {
  yield takeLatest(ACTIONS.CREATE_COMMENT_REQUEST, createComment);
}

// saga
export default function* postSaga() {
  yield all([
    fork(watchCreatePost),
    fork(watchDeletePost),
    fork(watchCreateComment),
  ]);
}
