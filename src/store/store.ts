//Misc
import { compose, createStore, applyMiddleware, Middleware } from "redux";
import logger from "redux-logger";
import { persistStore, persistReducer, PersistConfig } from "redux-persist";
import storage from "redux-persist/lib/storage";
// import thunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";

//Root saga
import { rootSaga } from "./root-saga";

//Root reducer
import { rootReducer } from "./root-reducer";
export type RootState = ReturnType<typeof rootReducer>;

declare global {
	interface Window {
		__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: (options: {
			trace?: boolean;
		}) => typeof compose;
	}
}

//Redux Persist
type ExtentedPersistConfig = PersistConfig<RootState> & {
	whitelist: (keyof RootState)[];
};

const persistConfig: ExtentedPersistConfig = {
	key: "root",
	storage,
	whitelist: ["user", "list"],
};

//Saga Middleware
const sagaMiddleware = createSagaMiddleware();

const persistedReducer = persistReducer(persistConfig, rootReducer);

//Middlewares
const middleWares = [
	sagaMiddleware, // Place Redux Saga first
	process.env.NODE_ENV !== "production" && logger,
].filter((middleware): middleware is Middleware => Boolean(middleware));

const composeEnhancer =
	(process.env.NODE_ENV !== "production" &&
		window &&
		window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?.({ trace: true })) ||
	compose;

const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));

export const store = createStore(
	persistedReducer,
	undefined,
	composedEnhancers
);

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
