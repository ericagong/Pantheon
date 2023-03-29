import * as ACTIONS from "./actions";

const initialState = {
  signInLoading: false, // 비동기 요청 진행 중
  signInDone: false,
  signInError: null,
  signOutLoading: false, // 비동기 요청 진행 중
  signOutDone: false,
  signOutError: null,

  isSignedIn: false,
  me: null,
  signUpData: {},
  signInData: {},
};

// actionCreators
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
  Posts: [],
  Followings: [],
  Followers: [],
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.SIGN_IN_REQUEST:
      return {
        ...state,
        signInLoading: true,
        signInDone: false,
        signInError: null, // 로딩 시 에러 삭제 필수
      };
    case ACTIONS.SIGN_IN_SUCCESS:
      return {
        ...state,
        signInLoading: false,
        signInDone: true,
        isSignedIn: true,
        me: createDummyUser(action.data),
      };
    case ACTIONS.SIGN_IN_FAILURE:
      return {
        ...state,
        signInLoading: false,
        signInError: action.error,
      };
    case ACTIONS.SIGN_OUT_REQUEST:
      return {
        ...state,
        signOutLoading: true,
        signOutDone: false,
        signOutError: null,
      };
    case ACTIONS.SIGN_OUT_SUCCESS:
      return {
        ...state,
        signOutLoading: false,
        signOutDone: true,
        isSignedIn: false,
        me: null,
      };
    case ACTIONS.SIGN_OUT_FAILURE:
      return {
        ...state,
        signOutLoading: false,
        signOutError: action.error,
      };
    default:
      return { ...state };
  }
};

export default reducer;
