const UserModel = require('../models/UserModel');
var UtilityModel = require('../models/UtilityModel');
var constants = require('../Utilities/Constants');
const _userdtls = require('../Utilities/_getLoginUserdtls');
var UserDetailsviewmodel = require('../viewModel/UserDetailsviewmodel');
var UserReport = require('../reports/UserDetailsReport');
var Utilities = require('../Utilities/Utilities');
const crdbAppLogs = require('../Utilities/logger').crdbAppLogs;


const GetResponseBody = (results, isAdmin, actiontype, roledata) => {
    let _results = [];
    let _roles = []
    let ID = -100;
    if (results === undefined) {
        return _results;
    }
    if (roledata != undefined) {
        roledata.map(role => {
            _roles.push(role.roleIdfk);
        });

    }
    results.map(result => {
        const Userviewmodel = Object.create(UserDetailsviewmodel.UserDetailsviewmodel);
        Userviewmodel.userIDPK = result.UserIDPK;
        Userviewmodel.userName = result.UserName;
        Userviewmodel.firstName = result.FirstName;
        Userviewmodel.lastName = result.LastName;
        Userviewmodel.email = result.Email;
        Userviewmodel.trailStDate = Utilities.DateFormat(result.trailStDate)
        Userviewmodel.trailEndDate = Utilities.DateFormat(result.traileddate)
        Userviewmodel.subscriptionStDate = Utilities.DateFormat(result.subscriptionstdate);
        Userviewmodel.subscriptionEdDate = Utilities.DateFormat(result.subscriptioneddate);
        Userviewmodel.isActive = result.isactive === 1 ? true : false;
        Userviewmodel.isTrailUser = result.istrailuser === 1 ? "Yes" : "No";
        Userviewmodel.isExpired = result.isexpired;
        Userviewmodel.isLocked = result.islocked;
        Userviewmodel.passwordrotation = result.passwordrotation;
        Userviewmodel.changepwdrequired = result.chgpwdrequired;
        Userviewmodel.lastlogin = result.lastlogin;
        Userviewmodel.wrngattempts = result.wrngattempts;
        Userviewmodel.createdBy = result.createdby;
        Userviewmodel.datecreated = result.datecreated;
        Userviewmodel.modifiedBy = result.modifiedby;
        Userviewmodel.datemodified = result.datemodified;
        Userviewmodel.crtby = result.crtby;
        Userviewmodel.mdfyby = result.mdfyby;
        Userviewmodel.errorCode = 200;
        Userviewmodel.roles = _roles;
        Userviewmodel.isEdit = isAdmin;
        switch (actiontype) {
            case constants.INSERT:
                Userviewmodel.errMsge = "Your data has been saved.";
            case constants.UPDATE:
                Userviewmodel.errMsge = "Your data has been saved.";
        }
        if (isAdmin !== true) {
            Userviewmodel.isEdit = false
            Userviewmodel.errorCode = 403;
            Userviewmodel.errMsge = "Don't have authorization access please contact Admin"
        }
        _results.push(Userviewmodel)
    });
    return _results;
}
exports.InsertUpdUserDetails = async function (req, res) {
    try {
        crdbAppLogs("info", "Entered InsertUserDetails");
        let result = null;
        const LoginUser = _userdtls.getLoginUser(req.cookies.token);
        const userID = LoginUser.userpk;
        const isAdmin = await UtilityModel.GetIsLoginUserAdmin(userID);
        const ValidationMsge = await userValidation(req);
        if (isAdmin === true && ValidationMsge.length === 0) {
            if (req.body.userIDPK <= 0) {
                result = await UserModel.InsertUserdtlsByAdmin(req, userID);
                req.body.userIDPK = result;
            } else {
                result = await UserModel.UpdateUserDetailsbyAdmin(req, userID);
            }
            const resp = await UserReport.SearchUserDetails(req);
            const roledata = await UserReport.GetRolesByUserID(req.body.userIDPK);
            const UserView = GetResponseBody(resp[1], isAdmin, constants.INSERT, roledata);
            return res.json(UserView[0]).status(UserView.UserIDPK >= 0 ? 200 : 500);
        }
        if (isAdmin === true && ValidationMsge.length > 0) {
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
exports.GetUserDetails = async (req, res) => {
    try {
        console.log("info", "Entered InsertUserDetails");
        const LoginUser = _userdtls.getLoginUser(req.cookies.token);
        const userID = LoginUser.userpk;
        const isAdmin = await UtilityModel.GetIsLoginUserAdmin(userID);
        const resp = await UserReport.SearchUserDetails(req);
        if (Object.keys(resp).length == 2) {
            let _results = [];
            const UserView = GetResponseBody(resp[1], isAdmin, constants.INSERT, []);
            _results.push(UserView);
            _results.push(resp[0]);
            return res.json(_results).status(200);
    
        }
        else{
            return res.json([]).status(200);
    
        }
    }
    catch (Ex) {
        req.body.errorCode = 500;
        req.body.errMsge = Ex;
        crdbAppLogs("error", Ex.stack.toString());
        return res.status(500).send({ _ObjData: [], _errMsg: { errMsg: req.body.errMsge, errCode: 500 } });
    }
};

const userValidation = async function (req) {
    const Value = await UtilityModel.GetUserValidation(req);
    if (Value[0].cnt >= 1 && req.body.userIDPK <= 0) {
        return "The User you are tring to create is alreday exists in the system.Please contact System Admin"
    }
    if (req.body.isTrailUser === true && Utilities.DateDifference(req.body.trailStDate, req.body.trailEndDate) < 0) {
        return "Trail Enddate has be greater than Trail Startdate."
    }
    if (req.body.isTrailUser === false && Utilities.DateDifference(req.body.subscriptionStDate, req.body.subscriptionEdDate) < 0) {
        return "Trail Subscription end date has be greater than Subscription enddate."
    }
    return "";
}
exports.user_password_post = function (req, res) {
    return _usermodal.updatepassword(req, res);
};

exports.user_username_get = function (req, res) {
    return _rpmpmodal.deleteRPMP(req, res);
};
exports.user_email_get = function (req, res) {
    return _rpmpmodal.deleteRPMP(req, res);
};
