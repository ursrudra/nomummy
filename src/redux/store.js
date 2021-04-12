import { createStore, applyMiddleware } from "redux";
import { persistStore } from "redux-persist";
import logger from "redux-logger";

import rootReducer from "./root-reducer";
import thunk from "redux-thunk";
import { firebase, auth, firestore } from "../firebase/firebase";
const middlewares = [
  logger,
  thunk.withExtraArgument({ firebase, auth, firestore }),
];
const store = createStore(rootReducer, applyMiddleware(...middlewares));
const persistor = persistStore(store);

export { store, persistor };
