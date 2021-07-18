import {RESET_REDUX_SUCCESS} from "../../utilities/_actiontypes";

export const ResetUserModel=() => async dispatch =>{
    let resetReducer={isReset:1};
        dispatch({ type: RESET_REDUX_SUCCESS,payload: resetReducer });
  }