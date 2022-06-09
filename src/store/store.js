import { compose, createStore, applyMiddleware } from "redux";
import { rootReducer } from "./root-reducer";
// import logger from "redux-logger";

const loggerMiddleware = (store) => (next) => (action) => {
  if (!action.type) {
    return next(action);
  }

  next(action);
};

/* const middleWares = [process.env.NODE_ENV === "development" && logger].filter(
  Boolean
); */
const middleWares = [loggerMiddleware];

const composedEnhancers = compose(applyMiddleware(...middleWares));

export const store = createStore(rootReducer, undefined, composedEnhancers);
