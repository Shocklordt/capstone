import { compose, createStore, applyMiddleware } from "redux";
import { rootReducer } from "./root-reducer";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { loggerMiddleware } from "./middleware/logger";
import thunk from "redux-thunk";
// import logger from "redux-logger";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

/* const middleWares = [process.env.NODE_ENV === "development" && logger].filter(
  Boolean
); */
const middleWares = [
  process.env.NODE_ENV !== "production" && loggerMiddleware,
  thunk,
].filter(Boolean);

const composedEnhancers = compose(applyMiddleware(...middleWares));

export const store = createStore(
  persistedReducer,
  undefined,
  composedEnhancers
);

export const persistor = persistStore(store);
