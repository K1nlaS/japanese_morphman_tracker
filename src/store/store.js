//Misc
import { compose, createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";

//Root reducer
import { rootReducer } from "./root-reducer";

//Middlewares
const middleWares = [process.env.NODE_ENV !== "production" && logger, thunk].filter(Boolean);

const composeEnhancer = (process.env.NODE_ENV !== "production" && logger && window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));

//Redux Persist
const persistConfig = {
  key: "root",
  storage,
  whitelist: [
    "list"
  ],
  blacklist: ["user"]
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer, undefined, composedEnhancers);
export const persistor = persistStore(store);