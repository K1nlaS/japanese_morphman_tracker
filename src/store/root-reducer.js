//Misc
import { combineReducers } from "redux";

//Reducers
import { userReducer } from "./user/user.reducer";

export const rootReducer = combineReducers({
  user: userReducer
});