const util = require('util');
const pool = require('../db');
var DateDiff = require('date-diff');
const _userpwdhash = require('../Utilities/Utilities');
const _userdtls=require('../Utilities/_getLoginUserdtls');
var flatMap = require('flatmap');
/*Insert a NEW  User By Admin and will determine is that Trail user or Subscribed user*/

const InsertUpdateUserRoleDtls=async (role,adminUserId,userId) =>
{
    let returnCode=0; //0 -Success ,1  Bulk updae fail,2 Select fail, 3 Update user role, 4 Insert user Role fail
    const _queryUpdate = 'UPDATE tbl_userrole SET isactive=?,modifiedby=?,datemodified=? WHERE  useridfk=?' ;
    const _queryupdateObj = [0,adminUserId,new Date(),userId]
    const _mapSelectQuery = 'SELECT * from  tbl_userrole WHERE  useridfk=?  AND roleidfk=?' ;
    const _mapQueryUpdate = 'UPDATE tbl_userrole SET isactive=?,modifiedby=?,datemodified=? WHERE  useridfk=? AND roleidfk=? ' ;
    const _queryInsert = 'INSERT INTO tbl_userrole (useridfk,roleidfk,isactive,createdby,datecreated,modifiedby,datemodified)'
                        + ' VALUES (?,?,?,?,?,?,?)';

    try {
        var rows = await pool.query(_queryUpdate, _queryupdateObj);                      
    } catch (err) {
        console.log(err.stack);
         returnCode=1;
    }
    role.map(async (x)=>
        {
          const _mapObject = [userId,x]
            try {
                var rows = await pool.query(_mapSelectQuery, _mapObject);   
                if (rows.length > 0) {
                        const _mapQueryUpdateObject = [1,adminUserId,new Date(),userId,x]
                    try {
                        var rows = await pool.query(_mapQueryUpdate, _mapQueryUpdateObject);                      
                    } catch (err) {
                        console.log(err.stack);
                         returnCode=3;
                    }
                }else{                 
                const __queryInsertObject = [userId,x,1,adminUserId,new Date(),adminUserId,new Date()];
                try {
                    const _result = await pool.query(_queryInsert, __queryInsertObject);
                } catch (err) {
                    console.log(err.stack);
                     returnCode=4;
                }
            }
            } catch (err) {
                console.log(err.stack);
                 returnCode=2;
            }
        });

        return returnCode; 
}



const InsertUserdtlsByAdmin = async (req) => {
    let subscriptionStDate = null;
    let subscriptionEdDate = null;
    let trailStDate =new Date(req.body.trailStDate);
    let trailEndDate =new Date(req.body.trailEndDate);
    if (req.body.isTrailUser !== true) {
        subscriptionStDate = new Date(req.body.subscriptionStDate);
        subscriptionEdDate = new Date(req.body.subscriptionEdDate);
        trailStDate = null;
        trailEndDate = null;
    }
    var _user=_userdtls.getLoginUser(req.cookies.token);

    const _query = 'INSERT INTO tbl_user '
        + ' (username,firstname,lastname,email,istrailuser,'
        + ' trailstdate,traileddate,subscriptionstdate, '
        + ' subscriptioneddate,chgpwdrequired,isactive, '
        + ' createdby,datecreated,modifiedby,datemodified,wrngattempts)'

        + ' VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
    const _objbody = [
        req.body.email, req.body.firstName, req.body.lastName, req.body.email,
        req.body.isTrailUser===true?1:0, trailStDate, trailEndDate,
        subscriptionStDate, subscriptionEdDate, 1,
        req.body.isActive===true?1:0,_user.userpk, new Date(), _user.userpk, new Date(),
        req.body.wrngattempts===true?1:0
    ];
    try {

        const _result = await pool.query(_query, _objbody);
        if(req.body.roles !== undefined)   
        await InsertUpdateUserRoleDtls( req.body.roles,_user.userpk,_result.insertId)    
        return _result.insertId;

    } catch (err) {
        throw new Error(err)
    }
};
const UpdateUserDetailsbyAdmin = async (req) => {
    //Case 1 if the user is trail user then No subscription
    //Case 2 if the user is Subscribed then insert data in to Scubscription columns
    let subscriptionStDate = null;
    let subscriptionEdDate = null;
    let trailStDate =new Date(req.body.trailStDate);
    let trailEndDate =new Date(req.body.trailEndDate);
    if (req.body.isTrailUser !== true) {
        subscriptionStDate = new Date(req.body.subscriptionStDate);
        subscriptionEdDate = new Date(req.body.subscriptionEdDate);
        trailStDate = null;
        trailEndDate = null;
    }
    var _user=_userdtls.getLoginUser(req.cookies.token);

    const _query = 'UPDATE tbl_user SET username=?,firstname=?,lastname=?, '
        + ' email=?,istrailuser=?,trailstdate=?,traileddate=?,subscriptionstdate=?, '
        + ' subscriptioneddate=?,chgpwdrequired=?,isactive=?, '
        + ' modifiedby=?,datemodified=?'
        + ' WHERE userIdpk  =? '

    const _objbody = [req.body.userName, req.body.firstName, req.body.lastName, req.body.email,
    req.body.isTrailUser, trailStDate, trailEndDate,
    subscriptionStDate, subscriptionEdDate, req.body.changepwdrequired,
    req.body.isActive,_user.userpk, new Date(),
    req.body.userIDPK
    ];

    try {
        const rs = await pool.query(_query, _objbody);
        if(req.body.roles !== undefined)
        await InsertUpdateUserRoleDtls( req.body.roles,_user.userpk,req.body.userIDPK);    
        return rs.affectedRows;
    } catch (err) {
        console.log(err.stack)
        return -1;
    }
};

const getuserUsernamevalidation = async (req, res) => {
    const _query = 'Select * from  tbl_user Where  username=? '
    const _objbody = [req.body.username];
    try {
        var rows = await pool.query(_query, _objbody);
        if (rows.length > 0)
            return res.send(false).status(200);
        else return res.send(true).status(200);

    } catch (err) {
        console.log(err.stack)
    }
};
const getuserUseremailvalidation = async (req, res) => {
    const _query = 'Select * from  tbl_user Where  email=? '
    const _objbody = [req.body.email];

    try {
        var rows = await pool.query(_query, _objbody);
        if (rows.length > 0)
            return res.send(false).status(200);
        else return res.send(true).status(200);

    } catch (err) {
        console.log(err.stack)
    }
};

const updatepassword = async (req, res) => {
    const _query = 'UPDATE tbl_user SET password  =? WHERE userIdpk  =? '
    const _objbody = [_userpwdhash.setPasswordHashing(req.body.password),
    req.body.userpk
    ];

    try {
        await pool.query(_query, _objbody);
        return res.send("Password updated successfully").status(200);

    } catch (err) {
        console.log(err.stack)
    }
};

const getloginUserroles = async (loginUserId) => {
    const _mapSelectQuery = 'SELECT * from  tbl_userrole WHERE  useridfk=? and isactive=1' ;
    const _mapSelectQueryObject = [loginUserId]
            try {
                  var rows=  await pool.query(_mapSelectQuery, _mapSelectQueryObject); 
                  return rows;                     
            } catch (err) {
                  console.log(err.stack);
            }
}
const getloginUseractions = async (roles,loginUserId) => {

    let useractions=[];
  let roleIds=  flatMap(roles, function(role) {
        return role.roleidfk;
      });
      
          const _mapSelectQuery = 'SELECT  roles.actionroleIdpk,roles.roleIdfk,roles.actionIdfk, '
         +' cd.combodtldesc as rolename ,actions.action,actions.displayname as actiondisplayname, '
         +' headername,hdrs.displayname as displayheadername  '
         +' FROM tbl_actionroles roles    '
         +' left join tbl_combodetails cd on cd.combodtlIdpk=roles.roleIdfk '
         +' LEFT JOIN   tbl_actions actions ON actions.actionIdpk=roles.actionIdfk '
         +' left join tbl_actionheaders hdrs on hdrs.headerIdpk=actions.actionheaderIdfk '
         +' where  roleIdfk in ( ? )' ;
         
            try {
                  var rows=  await pool.query(_mapSelectQuery, [roleIds]);
                  
                  let headerGroup = rows.reduce((r, a) => {
                    r[a.displayheadername] = [...r[a.displayheadername] || [], a];
                    return r;
                   }, {});
                   console.log("headerGroup", headerGroup);
                   //useractions.push(headerGroup);   
                  // headerGroup;

                  return headerGroup;                      
            } catch (err) {
                  console.log(err.stack);
            }
}
    
const getloginuserdetails = async (email, password) => {
    
    let wrngattempts = 1;
    let _passwordrotation = null;
    /* let _passwordrotation = null;
     let _lastlogin = null; 
     let _userpk = 0; let _password = null;
     let _username = null; let _firstname = null;
     let _lastname = null; let _email = null;
     let _lastlogin = null; let _role = null; */
    var _user = {
        UserName: null, FirstName: null,
        LastName: null, Email: null,
        LastLogin: null, UserIDPK: null,
        ErrorCode: 0, ErrorMsge: null, Roles: [],Action:null,
        SuccessMsg:"",SuccessCode:0
     
    }

    const _userQuery = 'Select * from  tbl_user Where  email=? and isactive=1'
    const _objbody = [email];

    try {
        var objuserdtls = await pool.query(_userQuery, _objbody);
        //If user email is found and is Active then check the HASH Password
        if (objuserdtls.length > 0) {
            const  objuser=objuserdtls[0];
            wrngattempts += objuser.wrngattempts;
            _passwordrotation = objuser.passwordrotation;
            _password = objuser.password;

            _user.UserIDPK = objuser.userIdpk;
            _user.LastLogin = objuser.lastlogin;
            _user.UserName = objuser.username;
            _user.FirstName = objuser.firstname;
            _user.LastName = objuser.lastname;
            _user.Email = objuser.email;
            //Case 1 Last Login > than 30 days 
            if (wrngattempts-1 >=3 && islocked==1) {
               
                        _user.ErrorCode = 703;
                        _user.ErrorMsge = "User account Locked,Please contact Administrator";
                        return _user;

                    
            }
            if (_user.LastLogin != null &&   wrngattempts-1 < 4) {

                //let _currentdate = new Date();
                //let _lstdate = new Date(_user.lastlogin);
                //var _noofdays = parseInt((_currentdate - _lstdate) / (1000 * 60 * 60 * 24)); 
                var _days=new DateDiff(new Date(), _user.LastLogin);
                if (_days.days() > 30) {
                    try {
                        _user.ErrorCode = 700;
                        _user.ErrorMsge = "User is inActived,didnt login from 30 days";
                        return _user;

                    } catch (err) {
                        console.log(err.stack)
                    }
                }
            }
            if (_passwordrotation != null  && ! wrngattempts-1 >=3) {
                 //If user didnt change the Pwd from  120 days syem will lock the user
                if (Date.diff(new Date(), _passwordrotation).days() > 120) {
                    try {
                        _user.ErrorCode = 701;
                        _user.ErrorMsge = "User not chnaged the passwrod scince 120 days";
                        return _user;

                    } catch (err) {
                        console.log(err.stack)
                    }
                }
            }
            if (_userpwdhash.isPasswordHashing(password, _password) === false) {
                try {
                    let _locked=wrngattempts >=4?1:0;
                    const _query = 'UPDATE tbl_user SET wrngattempts =? ,islocked =?,chgpwdrequired=0 WHERE userIdpk  =? ';
                    const _objbody = [wrngattempts, _locked,_user.UserIDPK,]

                    await pool.query(_query, _objbody);
                    _user.ErrorCode = 702;
                    _user.ErrorMsge = "User Name or Password is wrong";
                    return _user;

                } catch (err) {
                    console.log(err.stack)
                }

            }// update Last login and send the user deatils as a repsose
            else {
                try {
                    const _query = 'UPDATE tbl_user SET lastlogin =?,islocked=0,wrngattempts=0  where userIdpk=?';
                    const _objbody = [new Date(), _user.UserIDPK]
                    await pool.query(_query, _objbody);
                    _user.ErrorCode = 200;
                    _user.ErrorMsge = "Success";
                    //Getting Roles...
                    let  roles=await getloginUserroles(_user.UserIDPK);
                    //Getting user actions..
                    let actions=await  getloginUseractions(roles,_user.UserIDPK);
                    //Setting roles and actions...
                    _user.Roles=roles;
                    _user.Action=actions;
                    return _user;

                } catch (err) {
                    console.log(err.stack)
                }
            }
        }
        else {
            _user.ErrorCode = 900;
            _user.ErrorMsge = "User not registred";
            return _user;
        }
    }
    catch (err) {
        console.log(err.stack)
    }

};

module.exports =
    {
        InsertUserdtlsByAdmin: InsertUserdtlsByAdmin,
        UpdateUserDetailsbyAdmin: UpdateUserDetailsbyAdmin,
        getuserUsernamevalidation: getuserUsernamevalidation,
        getuserUseremailvalidation: getuserUseremailvalidation,
        updatepassword: updatepassword,
        getloginuserdetails: getloginuserdetails
    }

