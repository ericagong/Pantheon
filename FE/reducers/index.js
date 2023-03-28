import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  user: {
    isLoggedIn: false,
    user: null,
    signUpData: {},
    signInData: {},
  },
  post: {
    mainPosts: [],
  },
};

// actionCreator
const signInAction = (data) => {
  return {
    type: "SIGN_IN",
    data,
  };
};

const signOutAction = () => {
  return {
    type: "SIGN_OUT",
  };
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case HYDRATE:
      console.log("HYDRATE", action);
      return { ...state, ...action.payload };
    case "SIGN_IN":
      return {
        ...state,
        user: { ...state.user, isLoggedIn: true, user: action.data },
      };
    case "SIGN_OUT":
      return {
        ...state,
        user: { ...state.user, isLoggedIn: false, user: null },
      };
    default:
      return state;
  }
};

export { signInAction, signOutAction };
export default rootReducer;
