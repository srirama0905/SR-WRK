import {
  INSERT_USER_SUCCESS,
  UPDATE_USER_SUCCESS,
  GET_USER_DETAILS,
  USER_MODEL_ERRORS,
  SCH_USER_DETAILS_SUCCESS,
  SCH_USER_DETAILS_ERROR

} from "../../utilities/_actiontypes";

import initialState from "./_initialstate";

export default function UserMaintenanceReducer(state = initialState.UserRegistrationDetails, action) {
  switch (action.type) {
    case INSERT_USER_SUCCESS:
      return action.payload;
    case UPDATE_USER_SUCCESS:
      return action.payload;
    case USER_MODEL_ERRORS:
    return action.payload;
    default:
      return state;
  }
}
export  function SearchUserReducer(state = initialState.UserData, action) {
  switch (action.type) {
    case SCH_USER_DETAILS_SUCCESS:
      return action.payload;
    case SCH_USER_DETAILS_ERROR:
    return action.payload;
    default:
      return state;
  }
}