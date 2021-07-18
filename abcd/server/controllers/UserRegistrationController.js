const UserRegistrationModel = require('../models/UserRegistration.model');
var constants = require('../Utilities/Constants');
const _userdtls = require('../Utilities/_getLoginUserdtls');
var Registeruserviewmodel = require('../viewModel/Registeruserviewmodel');
var UserRegistrationReport = require('../reports/UserRegistrationReport');
const crdbAppLogs = require('../Utilities/logger').crdbAppLogs;

const GetResponseBody = (results, isAdmin, actiontype, _questions) => {
    let _results = [];
    let _Question = []
    let ID = -100;
    if (results === undefined) {
        return _results;
    }
    if (_questions != undefined) {
        _questions.map(question => {
        let _Object = {regUserID:question.userIDFK ,
                      questionIDFK:question.questionIDFK,
                      answersDesc:question.answersDesc,
                      answercomboID:question.answercomboID ,
                      traingIDFK:question.traingIDFK 
                     }
           
            _Question.push(_Object);
        });

    }

    results.map(result => {
        const RegUserModel = Object.create(Registeruserviewmodel.RegisterUserDetailsviewmodel);
        RegUserModel.regUserID = result.regUserID;
        RegUserModel.firstName = result.firstName;
        RegUserModel.lastName = result.lastName;
        RegUserModel.emailId = result.emailiD;
        RegUserModel.phonenumber = result.phonenumber;
        RegUserModel.country = result.country;
        RegUserModel.traingIDFK = result.traingIDFK
        RegUserModel.errorCode = 200;
     
        switch (actiontype) {
            case constants.INSERT:
                RegUserModel.errMsge = "Your data has been saved.";
            case constants.UPDATE:
                RegUserModel.errMsge = "Your data has been saved.";
        }
        if (isAdmin !== true) {
            RegUserModel.isEdit = false
            RegUserModel.errorCode = 403;
            RegUserModel.errMsge = "Don't have authorization access please contact Admin"
        }
        RegUserModel.question= _Question;
        _results.push(RegUserModel)
        //_results.push(_Question)
    });
    return _results;
}



exports.InserUserRegistaratonDetails = async function (req, res) {
    try {
        crdbAppLogs("info", "Entered InsertUserDetails");
        const ValidationMsge = await userRegistrationValidation(req);
        if (ValidationMsge.length === 0) {
            let result = await UserRegistrationModel.InserUserRegistrationDeatails(req, 1);
            req.body.regUserID = result;
            const _user = await UserRegistrationReport.SearchRegisterUserDetails(req);
            const _userQuestions = await UserRegistrationReport.GetUserQuesandAnswers(req.body.regUserID, req.body.traingIDFK);
            const UserRegview = GetResponseBody(_user[1], true, constants.INSERT, _userQuestions);
            return res.status(200).send({ _ObjData: UserRegview[0] });
        }
        if (ValidationMsge.length > 0) {
            req.body.errorCode = 700;
            req.body.errMsge = ValidationMsge;
            return res.status(700).send({ _ObjData: req.body, _errMsg: { errMsg: req.body.errMsge, errCode: 700 } });
        }

    }
    catch (Ex) {
        req.body.errorCode = 500;
        req.body.errMsge = Ex;
        crdbAppLogs("error", Ex.stack.toString());
        return res.status(500).send({ _ObjData: req.body, _errMsg: { errMsg: req.body.errMsge, errCode: 500 } });

    }
};
exports.UpdUserRegistaratonDetails = async function (req, res) {
    try {
        crdbAppLogs("info", "Entered InsertUserDetails");
        const LoginUser = _userdtls.getLoginUser(req.cookies.token);
        const userID = LoginUser.userpk;
        const isAdmin = await UserRegistrationModel.GetIsLoginUserAdmin(userID);
        const ValidationMsge = await userRegistrationValidation(req);
        if (ValidationMsge.length === 0) {
            if (req.body.regUserID > 0 && isAdmin == true) {
                await UserRegistrationModel.UpdateUserRegistrationDeatails(req, req.body.regUserID);
                const _user = UserRegistrationReport.SearchRegisterUserDetails(req);
                const _userQuestions = UserRegistrationReport.GetUserQuesandAnswers(req.body.regUserID, req.body.traingIDFK);
                const UserRegview = GetResponseBody(_user[1], true, constants.INSERT, _userQuestions);

                return res.status(200).send({ _ObjData: UserRegview });
            }
        }
        if (ValidationMsge.length > 0) {
            req.body.errorCode = 700;
            req.body.errMsge = ValidationMsge;
            return res.status(700).send({ _ObjData: req.body, _errMsg: { errMsg: req.body.errMsge, errCode: 700 } });
        }
        else {
            req.body.errorCode = 403;
            req.body.errMsge = "Don't have authorization access please contact Admin";
            return res.status(403).send({ _ObjData: req.body, _errMsg: { errMsg: req.body.errMsge, errCode: 403 } });
        }
    }
    catch (Ex) {
        req.body.errorCode = 500;
        req.body.errMsge = Ex;
        crdbAppLogs("error", Ex.stack.toString());
        return res.status(500).send({ _ObjData: req.body, _errMsg: { errMsg: req.body.errMsge, errCode: 500 } });

    }
};
exports.GetUserRegistrationDetails = async (req, res) => {
    try {
        console.log("info", "Entered InsertUserDetails");
        const LoginUser = _userdtls.getLoginUser(req.cookies.token);
        const userID = LoginUser.userpk;
        const isAdmin = await UserRegistrationModel.GetIsLoginUserAdmin(userID);
        if (isAdmin === true) {
            const resp = await UserRegistrationReport.SearchUserDetails(req);
            if (Object.keys(resp).length == 2) {
                let _results = [];
                const UserView = GetResponseBody(resp[1], isAdmin, constants.INSERT, []);
                _results.push(UserView);
                _results.push(resp[0]);
                return res.json(_results).status(200);
            }
        }
        return res.json([]).status(200);

    }
    catch (Ex) {
        req.body.errorCode = 500;
        req.body.errMsge = Ex;
        crdbAppLogs("error", Ex.stack.toString());
        return res.status(500).send({ _ObjData: [], _errMsg: { errMsg: req.body.errMsge, errCode: 500 } });
    }
};

const userRegistrationValidation = async function (req) {
    return "";
    const Value = await UserRegistrationModel.GetUserRegistationValidation(req);
    if (Value[0].cnt >= 1) {
        return "The User you are tring to create is alreday exists in the system.Please contact System Admin"
    }

    return "";
}
