//Firebase
import { getSettingsList } from "../../utils/firebase/firebase.utils";

//Reducer shorthand
import { createAction } from "../../utils/reducer/reducer.utils";

//Action types
import { USER_ACTION_TYPES } from "./user.types";

export const setCurrentUser = (user) =>
  createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user);

export const fetchSettingsStart = () =>
  createAction(USER_ACTION_TYPES.FETCH_SETTINGS_START);

export const fetchSettingsSuccess = (settingsObject) =>
  createAction(USER_ACTION_TYPES.FETCH_SETTINGS_SUCCESS, settingsObject);

export const fetchSettingsFailed = (error) =>
  createAction(USER_ACTION_TYPES.FETCH_SETTINGS_FAILED, error);

export const fetchSettingsAsync = (currentUser) => async (dispatch) => {
  dispatch(fetchSettingsStart());

  if (!currentUser) {
    dispatch(fetchSettingsSuccess({}));
  } else {
    try {
      const settingsObject = await getSettingsList(currentUser);
      dispatch(fetchSettingsSuccess(settingsObject));
    } catch (error) {
      dispatch(fetchSettingsFailed(error));
    }
  }
};