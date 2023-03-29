import {
  SIGN_IN_FAILURE,
  SIGN_IN_REQUEST,
  SIGN_IN_SUCCESS,
  SIGN_OUT_FAILURE,
  SIGN_OUT_REQUEST,
  SIGN_OUT_SUCCESS,
} from "../sagas/user";

const initialState = {
  isLoading: false, // 비동기 요청 진행 중
  isSignedIn: false,
  me: null,
  signUpData: {},
  signInData: {},
};

// actionCreators
export const signInRequestAction = (data) => {
  return {
    type: SIGN_IN_REQUEST,
    data,
  };
};

export const signOutRequestAction = (data) => {
  return {
    type: SIGN_OUT_REQUEST,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_IN_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case SIGN_IN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isSignedIn: true,
        me: { ...action.data, username: "Erica" },
      };
    case SIGN_IN_FAILURE:
      return {
        ...state,
        isLoading: false,
      };
    case SIGN_OUT_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case SIGN_OUT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isSignedIn: false,
        me: null,
      };
    case SIGN_OUT_FAILURE:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return { ...state };
  }
};

export default reducer;
