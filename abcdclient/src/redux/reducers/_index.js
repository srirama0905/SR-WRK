import { combineReducers } from "redux";
import  AuthenticateReducer,{CookieValidateReducer} from "./_authenticationreducer";
import  UserMaintenanceReducer,{SearchUserReducer} from "./_usermaintenancereducer";
/*RefData Reducer */
import  RefCountriesReducer, {QuestionchoiceReducer,QuestionsReducer,GetInitialUserRegModelReducer}  from "./_refdatareducer";



const rootReducer = combineReducers({
    LoginDetails:AuthenticateReducer ,
    UserRegistrationDetails:UserMaintenanceReducer ,
    LogoutObject:CookieValidateReducer,
    UserSchdata:SearchUserReducer,
    RefCountry:RefCountriesReducer,
    RefQuestionchoice:QuestionchoiceReducer,
    RefQuestions:QuestionsReducer,
    //UserRegistrationDetails:GetInitialUserRegModelReducer
  
 });



export default rootReducer;