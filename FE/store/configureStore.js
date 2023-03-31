import createSagaMiddleware from "redux-saga";
import { createStore, compose, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import reducer from "../reducers/index";
import rootSaga from "../sagas";
import { createWrapper } from "next-redux-wrapper";

// custom logger 미들웨어
const loggerMiddleware =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    console.log(action);
    return next(action);
  };

const sagaMiddleWare = createSagaMiddleware();

const configureStore = () => {
  const middlewares = [loggerMiddleware, sagaMiddleWare];

  // 개발 시만 devTool 연결
  const enhancer =
    process.env.NODE_ENV === "production"
      ? compose(applyMiddleware(...middlewares))
      : composeWithDevTools(applyMiddleware(...middlewares));

  const store = createStore(reducer, enhancer);

  store.sagaTask = sagaMiddleWare.run(rootSaga);

  return store;
};

const wrapper = createWrapper(configureStore, {
  debug: process.env.NODE_ENV === "development",
});

export default wrapper;
