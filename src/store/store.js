import { compose, createStore, applyMiddleware } from "redux";
import { rootReducer } from "./root-reducer";
import { persistStore, persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage"
// import logger from "redux-logger";

const loggerMiddleware = (store) => (next) => (action) => {
  if (!action.type) {
    return next(action);
  }

  next(action);
};

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["user"]
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

/* const middleWares = [process.env.NODE_ENV === "development" && logger].filter(
  Boolean
); */
const middleWares = [loggerMiddleware];

const composedEnhancers = compose(applyMiddleware(...middleWares));

export const store = createStore(persistedReducer, undefined, composedEnhancers);

export const persistor = persistStore(store)