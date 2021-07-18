import _baseapi from '../../api/_baseapi';
import {
 
    GET_REFDATA_LIST,
    GET_QUESTION_LIST
} from "../../api/_endpoints";
import {
    
    GET_REF_COUNTRY_SUCCESS,
    GET_REF_COUNTRY_ERROR ,
    GET_REF_QUESTION_CHOICE_SUCCESS,
    GET_REF_QUESTION_CHOICE_ERROR,
    GET_REF_QUESTION_SUCCESS,
    GET_REF_REGUSER_INITIAL_MODEL_SUCCESS,
    GET_REF_REGUSER_INITIAL_MODEL_ERROR
    } from "../../utilities/_actiontypes";

import { 
    ComboDetailsStorage,
    QuestionDetailsStorage
} from "../../utilities/_localstorage";
import { ReturnMessage } from "../../utilities/_commomfuncs";


export const GetallReferenceData = () => async (dispatch, getState) => {
    try {
       if (localStorage.getItem(ComboDetailsStorage) == undefined || localStorage.getItem(ComboDetailsStorage) == -1 ) { 
        let _Objetct = {"comboHeaderIDFK": -1,"skip":0,"take":500,"sortcolumn":"userIDPK", "sortorder":"asc"}

        const resp = await _baseapi.post(GET_REFDATA_LIST, _Objetct);
            localStorage.setItem(ComboDetailsStorage, JSON.stringify(resp.data));
        }
    }
    catch (Err) {
         throw  new Error (Err);
    }
}


export const GetallCountryDetails = (CmbID) => async (dispatch, getState) => {
    try {
       if (localStorage.getItem(ComboDetailsStorage) !== undefined  && localStorage.getItem(ComboDetailsStorage) !== -1  ) { 
            let cmbDetails = JSON.parse(localStorage.getItem(ComboDetailsStorage));
            let _data = cmbDetails.filter(e => e.comboheaderfk === CmbID )
            dispatch({ type: GET_REF_COUNTRY_SUCCESS, payload: _data });
        }
    }
    catch (Error) {
        let objErrorDetails ={}
        objErrorDetails.errorCode = Error.response === undefined ? 401 : Error.response.status;
        objErrorDetails.errMsge = ReturnMessage(Error.response.data._errMsg.errCode, Error.response.data._errMsg.errMsg);
        dispatch({ type: GET_REF_COUNTRY_ERROR, payload: objErrorDetails });
    }
}

export const GetallQuestionChoice = (CmbID) => async (dispatch, getState) => {
    try {
       if (localStorage.getItem(ComboDetailsStorage) !== undefined  && localStorage.getItem(ComboDetailsStorage) !== -1  ) { 
            let cmbDetails = JSON.parse(localStorage.getItem(ComboDetailsStorage));
            let _data = cmbDetails.filter(e => e.comboheaderfk === CmbID )
            dispatch({ type: GET_REF_QUESTION_CHOICE_SUCCESS, payload: _data });
        }
    }
    catch (Error) {
        let objErrorDetails ={}
        objErrorDetails.errorCode = Error.response === undefined ? 401 : Error.response.status;
        objErrorDetails.errMsge = ReturnMessage(Error.response.data._errMsg.errCode, Error.response.data._errMsg.errMsg);
        dispatch({ type: GET_REF_QUESTION_CHOICE_ERROR, payload: objErrorDetails });
    }
}
export const GetallQuestionDetails = () => async (dispatch, getState) => {
        try {
           if (localStorage.getItem(QuestionDetailsStorage) !== undefined  && localStorage.getItem(QuestionDetailsStorage) !== -1 ) { 
            const resp = await _baseapi.post(GET_QUESTION_LIST);
                localStorage.setItem(QuestionDetailsStorage, JSON.stringify(resp.data));
                dispatch({ type: GET_REF_QUESTION_SUCCESS, payload: resp.data });
   
            }
        }
        catch (Err) {
             throw  new Error (Err);
        }
    
}
export const GetInitialUserRegModel = () => async (dispatch, getState) => {
    try {
        dispatch({ type: GET_REF_REGUSER_INITIAL_MODEL_SUCCESS, payload: null});
        }
    
    catch (Err) {
        dispatch({ type: GET_REF_REGUSER_INITIAL_MODEL_ERROR, payload: null });
    }

}
