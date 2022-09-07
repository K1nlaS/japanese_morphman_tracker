//Misc
import { combineReducers } from "redux";

//Reducers
import { userReducer } from "./user/user.reducer";
import { categoriesReducer } from "./list/list.reducer";

export const rootReducer = combineReducers({
  user: userReducer,
  list: categoriesReducer,
});