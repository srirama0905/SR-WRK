const pool = require('../db');
var constants = require('../Utilities/Constants');

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

const GetUserValidation = async (req) => {
  var _query = "SELECT count (*) as cnt from tbl_user where FirstName = ? OR ( LastName = ? OR Email = ?) ";
 
  const _Object = [req.body.firstName, req.body.lastName, req.body.email];

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
const GetQuestions = async () => {
  let result = false;
  var _query = 'SELECT questionsIDPK ,questiondesc, questiontype from   tbl_user_reg_questions  WHERE  QuestionsIDPK > 0 '
  try {
    const _result = await pool.query(_query);
     return _result;
  }
  catch (err) {
    console.log(err.stack);
  }
  return result;
}



module.exports = {
  GetUserValidation:GetUserValidation,
  GetIsLoginUserAdmin:GetIsLoginUserAdmin,
  GetQuestions:GetQuestions
  

}