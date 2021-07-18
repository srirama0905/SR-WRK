export const ResetReducer ={
  isReset: 0 ,
}
export const UserDetails = {
  userIDPK: -1,
  userName: "",
  firstName: "SRIRAM",
  lastName: "",
  email: "",
  trailStDate: null,
  trailEndDate: null,
  subscriptionStDate: null,
  subscriptionEdDate: null,
  isActive: 0,
  isTrailUser: false,
  isExpired: 0,
  isLocked: 0,
  passwordrotation: 0,
  changepwdrequired: 0,
  lastlogin: null,
  wrngattempts: 0,
  createdBy: 0,
  datecreated: null,
  modifiedBy: 0,
  datemodified: null,
  /*Search Parameters ..*/
  crtby: " ",
  mdfyby: " ",
  errorCode: 0,
  errMsge: 0,
  successCode: 0,
  successMsg: " ",
  roles: [71,72],
  isEdit: false
};
export const UserData=  {
  UserSchdata:[]
};

export const LoginDetails =  {
  UserName: " ", 
  FirstName: " ",
  LastName: " ",
  Email: " ",
  LastLogin: "",
  UserPK: -1,
  Errorode: 0, 
  ErrorMsg: "", 
  Password: "", 
  Role: [], 
  Action: null
};
export const LogoutObject =  {
  errorCode:0,
  errMsge: null
};
export const RefBudata=  [];
export const RefYeadata=  [];
export const RefcmbYeadata=  [];

export const UserRegistrationDetails =  {
  regUserID:-1,
  firstName:"",
  lastName:"",
  emailId:"",
  phoneNumber: " ",
  country :  -1,   
  traingIDFK: -1,
  errorCode:0,
  errMsge:0,
  successCode:0,
  successMsg:" ",
  question: [],

 };

 export const RefCountry=  [];
 export const RefQueschoice=  [];
 export const RegQuestions=  [];