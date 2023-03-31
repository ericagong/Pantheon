import axios from "axios";
import {
  put,
  delay,
  call,
  takeLatest,
  throttle,
  all,
  fork,
} from "redux-saga/effects";
import {
  createOnePost,
  createManyPosts,
  createOneComment,
} from "../reducers/dummies";
import * as ACTIONS from "../reducers/actions";

// API call functions
export function createPostAPI(data) {
  axios.post("/api/post", data);
}

export function readPostsAPI(data) {
  axios.post("/api/posts", data); // page_num 등의 정보 전달
}

export function removePostAPI(data) {
  axios.delete("/api/post", data);
}

export function createCommentAPI(data) {
  axios.post("/api/comment", data);
}

// async functions (비동기 처리 함수)
// ACTION_MODEL_REQUEST에서 전달된 action을 받아 처리

/**
 * createPost
 * @param {{type, data: { content, User }}} action
 * @description action.data로 Post 생성 API를 호출.
 * @description 호출 결과에 따라 __SUCCESS, __FAILURE를 action을 dispatch.
 */
export function* createPost(action) {
  try {
    // const response = yield call(createPostAPI, action.data)
    yield delay(1000);
    // 신규 post 생성
    const dummyPost = createOnePost(action.data);
    yield put({
      type: ACTIONS.CREATE_POST_SUCCESS,
      data: dummyPost,
    });
    // dummy 데이터 사용하므로, 생성 post를 나의 post 목록 추가 (서버 연결 시 제거)
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

/**
 * readPosts
 * @param {{type, data: {???}}} action
 * @description action.data로 DB 내 일정 수의 Posts를 받아오는 API를 호출.
 * @description 호출 결과에 따라 __SUCCESS, __FAILURE를 action을 dispatch.
 */
export function* readPosts(action) {
  try {
    // const response = yield call(readPosts, action.data);
    yield delay(1000);
    yield put({
      type: ACTIONS.READ_POSTS_SUCCESS,
      data: createManyPosts(),
    });
  } catch (err) {}
}

/**
 * deletePost
 * @param {{type, data: { postId }}} action
 * @description action.data 내의 postId에 해당하는 post 제거 API 호출.
 * @description 호출 결과에 따라 __SUCCESS, __FAILURE를 action을 dispatch.
 */
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

/**
 * createComment
 * @param {{type, data: { content, postId, User}}}
 * @description action.data로 Comment 생성 API를 호출.
 * @description 호출 결과에 따라 __SUCCESS, __FAILURE를 action을 dispatch.
 */
export function* createComment(action) {
  try {
    // const response = yield call(createCommentAPI, action.data)
    yield delay(1000);
    yield put({
      type: ACTIONS.CREATE_COMMENT_SUCCESS,
      data: {
        comment: createOneComment(action.data),
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

// action handlers
export function* watchCreatePost() {
  yield takeLatest(ACTIONS.CREATE_POST_REQUEST, createPost);
}

export function* watchReadPosts() {
  // yield takeLatest(ACTIONS.READ_POSTS_REQUEST, readPosts);
  yield throttle(5000, ACTIONS.READ_POSTS_REQUEST, readPosts);
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
    fork(watchReadPosts),
    fork(watchDeletePost),
    fork(watchCreateComment),
  ]);
}
