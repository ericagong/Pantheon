import shortId from "shortid";
import * as ACTIONS from "./actions";
import produce from "immer";

const initialState = {
  signUpLoading: false, // 비동기 요청 진행 중
  signUpDone: false,
  signUpError: null,
  signInLoading: false, // 비동기 요청 진행 중
  signInDone: false,
  signInError: null,
  signOutLoading: false, // 비동기 요청 진행 중
  signOutDone: false,
  signOutError: null,

  me: null,
  signUpData: {},
  signInData: {},
};

// actionCreators
export const signUpRequestAction = (data) => {
  return {
    type: ACTIONS.SIGN_UP_REQUEST,
    data,
  };
};

export const signInRequestAction = (data) => {
  return {
    type: ACTIONS.SIGN_IN_REQUEST,
    data,
  };
};

export const signOutRequestAction = (data) => {
  return {
    type: ACTIONS.SIGN_OUT_REQUEST,
  };
};

const createDummyUser = (data) => ({
  ...data,
  id: 1,
  username: "Erica",
  Posts: [{ id: 1 }],
  Followings: [
    {
      id: shortId.generate(),
      username: "HY",
    },
    {
      id: shortId.generate(),
      username: "JW",
    },
    {
      id: shortId.generate(),
      username: "YS",
    },
  ],
  Followers: [
    {
      id: shortId.generate(),
      username: "HYBOT",
    },
    {
      id: shortId.generate(),
      username: "JWBOT",
    },
    {
      id: shortId.generate(),
      username: "YSBOT",
    },
  ],
});

const reducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case ACTIONS.SIGN_UP_REQUEST:
        draft.signUpLoading = true;
        draft.signUpDone = false;
        draft.signUpError = null; // 로딩 시 에러 삭제 필수
        break;
      case ACTIONS.SIGN_UP_SUCCESS:
        draft.signUpLoading = false;
        draft.signUpDone = true;
        // TODO 추가 회원가입 정보 처리
        break;
      case ACTIONS.SIGN_UP_FAILURE:
        draft.signUpLoading = false;
        draft.signUpError = action.error;
        break;
      case ACTIONS.SIGN_IN_REQUEST:
        draft.signInLoading = true;
        draft.signInDone = false;
        draft.signInError = null; // 로딩 시 에러 삭제 필수
        break;
      case ACTIONS.SIGN_IN_SUCCESS:
        draft.signInLoading = false;
        draft.signInDone = true;
        draft.isSignedIn = true;
        draft.me = createDummyUser(action.data);
        break;
      case ACTIONS.SIGN_IN_FAILURE:
        draft.signInLoading = false;
        draft.signInError = action.error;
        break;
      case ACTIONS.SIGN_OUT_REQUEST:
        draft.signOutLoading = true;
        draft.signOutDone = false;
        draft.signOutError = null;
        break;
      case ACTIONS.SIGN_OUT_SUCCESS:
        draft.signOutLoading = false;
        draft.signOutDone = true;
        draft.isSignedIn = false;
        draft.me = null;
        break;
      case ACTIONS.SIGN_OUT_FAILURE:
        draft.signOutLoading = false;
        draft.signOutError = action.error;
        break;
      case ACTIONS.ADD_POST_TO_ME:
        const newPost = { id: action.data };
        draft.me.Posts.unshift(newPost); // 시간복잡도 좋지 않음
        // draft.me.Posts = [newPost, ...draft.me.Posts];
        break;
      case ACTIONS.REMOVE_POST_OF_ME:
        draft.me.Posts = draft.me.Posts.filter(
          (post) => post.id != action.data.postId
        );
        break;
      default:
        break;
    }
  });
};

export default reducer;
