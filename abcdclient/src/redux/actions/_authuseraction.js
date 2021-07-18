import _baseapi from '../../api/_baseapi';
import {
    VALIDATE_COOKIE,
    AUTHNTICATE_USER,
    CREATE_USER_DETAILS,
    UPDATE_USER_DETAILS,
    SCH_USER_DETAILS,
    CREATE_REG_DETAILS
} from "../../api/_endpoints";
import {
    VALIDATE_AUTHUSER_SUCCESS,
    VALIDATE_AUTHUSER_FAILURE,
    VALIDATE_AUTHUSER_MODEL_ERROR,
    LOGOUT_AUTHUSER_SUCCESS,
    INSERT_USER_SUCCESS,
    UPDATE_USER_SUCCESS,
    GET_USER_DETAILS,
    USER_MODEL_ERRORS,
    COOKIE_VALIDATION_FAILED,
    SCH_USER_DETAILS_SUCCESS,
    SCH_USER_DETAILS_ERROR 
} from "../../utilities/_actiontypes";

import { LoginDetailsStorage,
      
        ComboDetailsStorage

    } from "../../utilities/_localstorage";
import { ReturnMessage } from "../../utilities/_commomfuncs";

export const ValidateAuthUser = (objLoginDetails) => async dispatch => {

    const resp = await _baseapi.post(AUTHNTICATE_USER, objLoginDetails);
    localStorage.setItem(LoginDetailsStorage, JSON.stringify(resp.data));
    dispatch({ type: VALIDATE_AUTHUSER_SUCCESS, logindetails: LoginDetailsStorage });
}

export const LogoutAuthUser = (objLoginDetails) => async dispatch => {
    objLoginDetails.UserIDPK = -1;
    /* Need to remove the dummy code*/
    localStorage.setItem(LoginDetailsStorage, JSON.stringify(objLoginDetails));
     localStorage.setItem(ComboDetailsStorage, -1);
    dispatch({ type: LOGOUT_AUTHUSER_SUCCESS, logindetails: LoginDetailsStorage });
}
export const InsertUserDetails = (objUserDetails) => async (dispatch, getState) => {
    try {
        const resp = await _baseapi.post(CREATE_USER_DETAILS, objUserDetails);
        dispatch({ type: INSERT_USER_SUCCESS, payload: resp.data });
    }
    catch (Error) {
        objUserDetails.errorCode = Error.response === undefined ? 401 : Error.response.status;
        objUserDetails.errMsge = ReturnMessage(Error.response.data._errMsg.errCode,Error.response.data._errMsg.errMsg);
        dispatch({ type: USER_MODEL_ERRORS, payload: objUserDetails });
    }
}
export const InsertUserRegDetails = (objUserRegDetails) => async (dispatch, getState) => {
    try {
        const resp = await _baseapi.post(CREATE_REG_DETAILS, objUserRegDetails);
        dispatch({ type: INSERT_USER_SUCCESS, payload: resp.data });
    }
    catch (Error) {
        objUserRegDetails.errorCode = Error.response === undefined ? 401 : Error.response.status;
        objUserRegDetails.errMsge = ReturnMessage(Error.response.data._errMsg.errCode,Error.response.data._errMsg.errMsg);
        dispatch({ type: USER_MODEL_ERRORS, payload: objUserRegDetails });
    }
}
export const UpdateUserDetails = (objUserDetails) => async dispatch => {
    try {
        const resp = await _baseapi.post(UPDATE_USER_DETAILS, objUserDetails);
        dispatch({ type: UPDATE_USER_SUCCESS, payload: resp.data });
    }
    catch (Error) {
        objUserDetails.errorCode = Error.response === undefined ? 401 : Error.response.status;
        objUserDetails.errMsge =  ReturnMessage(Error.response.data._errMsg.errCode,Error.response.data._errMsg.errMsg);
        dispatch({ type: USER_MODEL_ERRORS, payload: objUserDetails });
    }
}
export const SearchUserDetails = (objUserDetails) => async dispatch => {
    try {
        const resp = await _baseapi.post(SCH_USER_DETAILS, objUserDetails);
        dispatch({ type: SCH_USER_DETAILS_SUCCESS, payload: resp.data });
    }
    catch (Error) {
        objUserDetails.errorCode = Error.response === undefined ? 401 : Error.response.status;
        objUserDetails.errMsge =  ReturnMessage(Error.response.data._errMsg.errCode,Error.response.data._errMsg.errMsg);
        dispatch({ type: SCH_USER_DETAILS_ERROR, payload: objUserDetails });
    }
}
export const validateCookie=() => async dispatch =>{
    try {
        await _baseapi.get(VALIDATE_COOKIE);
    }
    catch (Error) {
        let objCoookieDetails = {};
        objCoookieDetails.errorCode = Error.response === undefined ? 401 : Error.response.status;
        objCoookieDetails.errMsge = Error.response === undefined ? "Unauthorized":ReturnMessage(Error.response.data._errMsg.errCode,Error.response.data._errMsg.errMsg);
        dispatch({ type: COOKIE_VALIDATION_FAILED, payload: objCoookieDetails });
    }
 }

