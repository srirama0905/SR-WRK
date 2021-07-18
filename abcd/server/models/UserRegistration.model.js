const pool = require('../db');


const DeleteUserQuestions= async (regUserID, traingIDFK) => {
  const _deleteQuestion = 'DELETE FROM tbl_user_reg_answers  WHERE  RegUserID = ? and traingIDFK = ?';
  const _Object = [regUserID,traingIDFK];
  try {
    await pool.query(_deleteQuestion, _Object);
    return 0;
  }
  catch (err) {
    console.log(err.stack);
    return -1;
  }
}
const InsertuserQuestions = async (quesObj, RegUserID) => {
  let _ObjectArray = [];
  const _query = 'INSERT INTO tbl_user_reg_answers (userIDFK,questionIDFK,answersDesc,answercomboID,traingIDFK,'
    + ' createdby,modifiedby,datecreated,datemodified) '
    + ' VALUES ?'
    quesObj.map(result => {
      let val= [ RegUserID, result.questionIDFK, result.answersDesc,result.answercomboID,result.traingIDFK,
        1,1, new Date(), new Date()
      ]
        _ObjectArray.push(val);
      });
 
  try {
    const result = await pool.query(_query,[_ObjectArray]);
    return result.insertId;
  } catch (err) {
    console.log(err.stack);
    return -1;
  }
}

const InserUserRegistrationDeatails = async (req) => {
  const Query = 'INSERT INTO tbl_userregistration (ReguserId,firstName,lastName,emailiD,Phonenumber,Country,traingIDFK,'
    + ' createdby,modifiedby,datecreated,datemodified) '
    + ' VALUES(?,?,?,?,?,?,?,?,?,?,?)';

  const _Object = [req.body.reguserId, req.body.firstName, req.body.lastName, req.body.emailId, req.body.phoneNumber, req.body.country,
    1, 1, 1, new Date().toISOString().split('T')[0], new Date().toISOString().split('T')[0]];
  try {
    const result = await pool.query(Query, _Object);
    await InsertuserQuestions(req.body.question, result.insertId);
    return result.insertId;
  } catch (err) {
    console.log(err.stack);
    return -1;
  }
}

const UpdateUserRegistrationDeatails = async (req, RegUserID) => {
  const Query = 'UPDATE tbl_userregistration SET firstName=?, lastName=?, emailId= ? ,phoneNumber=? ,TrainingIDFK = ?'
    + ' country=?,modifiedby=?, datemodified=? '
    + ' WHERE RegUserID=? ';
  const _Object = [req.body.firstName, req.body.lastName, req.body.emailId, req.body.phoneNumber, req.body.trainingIdfk,
  req.body.country, 1, new Date(), RegUserID
  ];
  try {
    await pool.query(Query, _Object);
    await DeleteUserQuestions (RegUserID,req.body.trainingIdfk);
    await InsertuserQuestions(req.body.question, result.insertId);
    return 1;
  } catch (err) {
    console.log(err.stack);
    return -1;
  }
}
const DeleteUserRegistration = async (RegUserID) => {
  // Need to delete Question table data also......
  const _deleteQuestion = 'DELETE FROM tbl_user_reg_answers  WHERE  RegUserID = ?';
  const _deleteRegUser = 'DELETE FROM tbl_userregistration  WHERE  RegUserID = ?';
  const _Object = [RegUserID];
  try {
    await pool.query(_deleteQuestion, _Object);
    await pool.query(_deleteRegUser, _Object);
    return 0;
  }
  catch (err) {
    console.log(err.stack);
    return -1;
  }
}
const GetUserRegistationValidation = async (req) => {
  var _query = "SELECT count (*) as cnt from tbl_userregistration where FirstName = ? OR ( LastName = ? OR EmailID = ? OR  PhoneNumber = ?) ";

  const _Object = [req.body.firstName, req.body.lastName, req.body.emailId, req.body.phoneNumber];

  try {
    const _result = await pool.query(_query, _Object);
    return _result;
  }
  catch (err) {
    console.log(err.stack);
    throw new Error(err);
  }
  return true;
}
const GetIsLoginUserAdmin = async (userID) => {
  let result = false;
  var _query = 'SELECT * from  tbl_userrole WHERE  useridfk=? '
  const _Object = [userID];
  try {
    const _result = await pool.query(_query, _Object);
    await _result.filter(async (x) => {
      if (x.useridfk == userID && (x.roleidfk === constants.ADMIN)) result = true;
    });
  }
  catch (err) {
    console.log(err.stack);
  }
  return result;
}

module.exports = {
  InserUserRegistrationDeatails: InserUserRegistrationDeatails,
  UpdateUserRegistrationDeatails: UpdateUserRegistrationDeatails,
  DeleteUserRegistration: DeleteUserRegistration,
  GetUserRegistationValidation: GetUserRegistationValidation,
  GetIsLoginUserAdmin: GetIsLoginUserAdmin,
  DeleteUserQuestions:DeleteUserQuestions
}