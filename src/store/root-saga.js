import { all, call } from "redux-saga/effects";
import { listSaga } from "./list/list.saga";
import { userSagas } from "./user/user.saga";

export function* rootSaga() {
  yield all([call(listSaga), call(userSagas)]);
}