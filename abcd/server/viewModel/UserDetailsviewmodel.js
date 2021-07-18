let  UserDetailsviewmodel={  
    userIDPK:-1,
    userName:"",
    firstName:"",
    lastName:"",
    email:"",
    trailStDate:null,
    trailEndDate:null,
    subscriptionStDate:null,
    subscriptionEdDate:null,
    isActive:0,
    isTrailUser:0,
    isExpired:0,
    isLocked:0,
    passwordrotation:0,
    changepwdrequired:0,
    lastlogin:null,
    wrngattempts:0,
    createdBy :0,
    datecreated :null, 
    modifiedBy :0,
    datemodified:null ,
    /*Search Parameters ..*/  
    crtby:" ",
    mdfyby :" ",  
    errorCode:0,
    errMsge:0,
    successCode:0,
    successMsg:" ",
    roles: [],
    isEdit:false     
    }  
    module.exports ={
        UserDetailsviewmodel:UserDetailsviewmodel  
    }
    
    