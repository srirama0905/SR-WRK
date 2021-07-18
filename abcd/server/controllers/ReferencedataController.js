const RefdataModel = require('../models/ReferenceData.model');
const crdbAppLogs = require('../Utilities/logger').crdbAppLogs;
var UtilityModel = require('../models/UtilityModel');
var constants = require('../Utilities/Constants');
const _userdtls = require('../Utilities/_getLoginUserdtls');
var Referencedataviewmodel = require('../viewModel/Referencedataviewmodel');
var ReferencedataReport = require('../reports/ReferencedataReport');

const GetResponseBody = (results, isAdmin, actiontype) => {
    let _results = [];
    if (results === undefined) {
        return _results;
    }
  
    results.map(result => {
        const Referencedata= Object.create(Referencedataviewmodel.Referencedataviewmodel);
        Referencedata.comboDetailIDPK = result.combodtlIdpk;
        Referencedata.comboDesc = result.combodtldesc;
        Referencedata.comboHeaderIDFK = result.comboheaderfk;
        Referencedata.comboHeaderDesc = result.hdrdesc;
        Referencedata.isActive = result.isactive === 1 ? true : false;
        Referencedata.sortOrder = result.sortorder;
        Referencedata.parentID = result.ParentId;
        Referencedata.createdBy =  ""
        Referencedata.datecreated = null;
        Referencedata.modifiedBy = null;
        Referencedata.datemodified = "";
        Referencedata.crtby = " ";
        Referencedata.mdfyby = " ";
        Referencedata.errorCode = 200;
        Referencedata.isEdit = isAdmin;
        switch (actiontype) {
            case constants.INSERT:
                Referencedata.errMsge = "Your data has been saved.";
            case constants.UPDATE:
                Referencedata.errMsge = "Your data has been saved.";
        }
        if (isAdmin !== true) {
            Referencedata.isEdit = false
            Referencedata.errorCode = 403;
            Referencedata.errMsge = "Don't have authorization access please contact Admin"
        }
        _results.push(Referencedata)
    });
    return _results;
}


exports.InsertUpdReferenceData = async function (req, res) {
    try {
        crdbAppLogs("info", "EInsertUpdReferenceData");
        let result = null;
        const LoginUser = _userdtls.getLoginUser(req.cookies.token);
        const userID = LoginUser.userpk;
        const isAdmin = await UtilityModel.GetIsLoginUserAdmin(userID);
       if (isAdmin === true ) {
            if (req.body.comboDetailIDPK <= 0) {
                result = await RefdataModel.InsertComboDetailsByAdmin(req, userID);
                req.body.comboDetailIDPK = result;
            } else {
                result = await RefdataModel.UpdateComboDetaisByAdmin(req, userID);
            }
            const resp = await ReferencedataReport.SearchReferenceDataDetails(req);
            const ReferenceView = GetResponseBody(resp[1], isAdmin, constants.INSERT);
            return res.json(ReferenceView[0]).status(ReferenceView.comboDetailIDPK >= 0 ? 200 : 500);
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



exports.GetQuestions = async (req, res) => {
    try {
        console.log("info", "Entered InsertUserDetails");
       let _results =   await UtilityModel.GetQuestions();
            return res.json(_results).status(200);
      
    }
    catch (Ex) {
        req.body.errorCode = 500;
        req.body.errMsge = Ex;
        crdbAppLogs("error", Ex.stack.toString());
        return res.status(500).send({ _ObjData: [], _errMsg: { errMsg: req.body.errMsge, errCode: 500 } });
    }
};




exports.GetReferenceDetails = async (req, res) => {
    try {
        console.log("info", "Entered InsertUserDetails");
       const resp = await ReferencedataReport.SearchReferenceDataDetails(req);
        if (Object.keys(resp).length == 2) {
            let _results = [];
            const UserView = GetResponseBody(resp[1], true, constants.INSERT);
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



