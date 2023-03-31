import { HYDRATE } from "next-redux-wrapper";
import { combineReducers } from "redux";
import user from "./user";
import post from "./post";

// 이전 상태를 액션을 통해 다음 상태로 만들어내는 함수(불변성 유지)
const rootReducer = combineReducers({
  index: (state = {}, action) => {
    switch (action.type) {
      case HYDRATE:
        console.log("HYDRATE", action);
        return { ...state, ...action.payload };
      default:
        return { ...state };
    }
  },
  user,
  post,
});

export default rootReducer;
