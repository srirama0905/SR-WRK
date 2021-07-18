import {
  VALIDATE_AUTHUSER_SUCCESS,
  VALIDATE_AUTHUSER_FAILURE,
  VALIDATE_AUTHUSER_MODEL_ERROR,
  LOGOUT_AUTHUSER_SUCCESS,
  COOKIE_VALIDATION_FAILED
} from "../../utilities/_actiontypes";

import initialState from "./_initialstate";
import { LoginDetailsStorage } from '../../utilities/_localstorage';
export default function AuthenticateReducer(state = initialState.LoginDetails, action) {

  let LoginDetails = localStorage.getItem("LoginDetailsStorage") === null ? initialState.LoginDetails
    : JSON.parse(localStorage.getItem(LoginDetailsStorage));

  switch (action.type) {
    case VALIDATE_AUTHUSER_SUCCESS:
      return LoginDetails;
    case LOGOUT_AUTHUSER_SUCCESS:
      return LoginDetails;
    case VALIDATE_AUTHUSER_FAILURE:
      return state;
    default:
      return LoginDetails;
  }
}
export  function CookieValidateReducer(state = initialState.LogoutObject, action) {
  switch (action.type) {
    case COOKIE_VALIDATION_FAILED:
      return action.payload;
    default:
      return  state;
  }
}