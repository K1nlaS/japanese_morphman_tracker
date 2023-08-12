//Misc
import { compose, createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
// import thunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";

//Root saga
import { rootSaga } from "./root-saga";

//Root reducer
import { rootReducer } from "./root-reducer";

//Redux Persist
const persistConfig = {
  key: "root",
  storage,
  whitelist: [
    "user",
    "list"
  ]
};

//Saga Middleware
const sagaMiddleware = createSagaMiddleware();

const persistedReducer = persistReducer(persistConfig, rootReducer);

//Middlewares
const middleWares = [
  sagaMiddleware, // Place Redux Saga first
  process.env.NODE_ENV !== 'production' && logger,
].filter(Boolean);


const composeEnhancer =
  (process.env.NODE_ENV !== 'production' &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));


export const store = createStore(persistedReducer, undefined, composedEnhancers);

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);