import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import AuthReducer from "./auth/auth.reducer";
import UserReducer from "./user/user.reducer";
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["userInfo", "auth"],
};

const rootReducer = combineReducers({
  userInfo: UserReducer,
  auth: AuthReducer,
});

export default persistReducer(persistConfig, rootReducer);
