import { createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist"; // imports from redux-persist
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import logger from "redux-logger";
import promiseMiddleware from "redux-promise-middleware";
import rootReducer from "./reducer";
const persistConfig = {
  // configuration object for redux-persist
  key: "root",
  storage // define which storage to use
};
const persistedReducer = persistReducer(persistConfig, rootReducer); // create a persisted reducer
const store = createStore(
  persistedReducer, // pass the persisted reducer instead of rootReducer to createStore
  applyMiddleware(promiseMiddleware, logger) // add any middlewares here
);
const persistor = persistStore(store); // used to create the persisted store, persistor will be used in the next step
// export default createStore(rootReducer, applyMiddleware(promiseMiddleware, logger));

export { store, persistor };
