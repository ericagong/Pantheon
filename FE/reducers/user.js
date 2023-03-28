const initialState = {
  isSignedIn: false,
  me: null,
  signUpData: {},
  signInData: {},
};

// actions
const SIGN_IN = "SIGN_IN";
const SIGN_OUT = "SIGN_OUT";

// actionCreators
const signInAction = (data) => {
  return {
    type: SIGN_IN,
    data,
  };
};

const signOutAction = () => {
  return {
    type: SIGN_OUT,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_IN:
      return {
        ...state,
        isSignedIn: true,
        me: action.data,
      };
    case SIGN_OUT:
      return {
        ...state,
        isSignedIn: false,
        me: null,
      };
    default:
      return { ...state };
  }
};

export { signInAction, signOutAction };
export default reducer;
