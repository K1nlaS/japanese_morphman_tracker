//Misc
import { compose, createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";

//Root reducer
import { rootReducer } from "./root-reducer";

//Middlewares
const middleWares = [logger, thunk];
const composedEnhancers = compose(applyMiddleware(...middleWares));

//Redux Persist
const persistConfig = {
  key: "root",
  storage,
  whitelist: [
    "user",
    "list"
  ]
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer, undefined, composedEnhancers);
export const persistor = persistStore(store);