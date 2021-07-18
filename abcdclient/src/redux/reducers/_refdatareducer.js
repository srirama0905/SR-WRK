import {
  GET_REF_COUNTRY_SUCCESS,
  GET_REF_COUNTRY_ERROR ,
  GET_REF_QUESTION_CHOICE_SUCCESS,
  GET_REF_QUESTION_CHOICE_ERROR,
  GET_REF_QUESTION_SUCCESS,
  GET_REF_REGUSER_INITIAL_MODEL_SUCCESS
} from "../../utilities/_actiontypes";

import initialState from "./_initialstate";
import { QuestionDetailsStorage, ComboDetailsStorage } from '../../utilities/_localstorage';
export default function RefCountriesReducer(state = initialState.RefCountry, action) {
  switch (action.type) {
    case  GET_REF_COUNTRY_SUCCESS:
         return action.payload;;
    case GET_REF_COUNTRY_ERROR:
      return action.payload;
    default:
         return state;
  }
}
export  function QuestionchoiceReducer(state = initialState.RefQueschoice, action) {
  let localQuestionchoice= localStorage.getItem(ComboDetailsStorage) === null ? initialState.RefQuestions
  : JSON.parse(localStorage.getItem(ComboDetailsStorage));
  switch (action.type) {
    case  GET_REF_QUESTION_CHOICE_SUCCESS:
         return localQuestionchoice;
    case GET_REF_QUESTION_CHOICE_ERROR:
      return action.payload;
    default:
         return state;
  }
}

export  function QuestionsReducer(state = initialState.RefQuestions, action) {
  let localQuestions= localStorage.getItem(QuestionDetailsStorage) === null ? initialState.RefQuestions
  : JSON.parse(localStorage.getItem(QuestionDetailsStorage));
  switch (action.type) {
    case  GET_REF_QUESTION_SUCCESS:
         return localQuestions;
    default:
         return state;
  }
}
export  function GetInitialUserRegModelReducer(state = initialState.UserRegistrationDetails, action) {
 switch (action.type) {
    case  GET_REF_REGUSER_INITIAL_MODEL_SUCCESS:
         return state;
    default:
         return state;
  }
}