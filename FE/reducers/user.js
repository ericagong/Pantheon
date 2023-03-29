import * as ACTIONS from "./actions";

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
  Posts: [],
  Followings: [],
  Followers: [],
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.SIGN_UP_REQUEST:
      return {
        ...state,
        signUpLoading: true,
        signUpDone: false,
        signUpError: null, // 로딩 시 에러 삭제 필수
      };
    case ACTIONS.SIGN_UP_SUCCESS:
      return {
        ...state,
        signUpLoading: false,
        signUpDone: true,
        // TODO 추가 회원가입 정보 처리
      };
    case ACTIONS.SIGN_UP_FAILURE:
      return {
        ...state,
        signUpLoading: false,
        signUpError: action.error,
      };
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
