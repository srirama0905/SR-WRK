var HashMap = require('hashmap');
const pool = require('../db');
var Utilities = require('../Utilities/Utilities');

const GetSortOrder = (orderBy) => {
  if (orderBy !== "asc") return "desc"; else return "asc";
}
const GetSortColumn = (order) => {
  let _default = "regUserID";
  switch (order) {
    case "firstName":
      ColumnName = "firstName";     
    case "lastName":
      ColumnName = "lastName";
      break;
    case "emailId":
      ColumnName = "emailId";
      break;
    case "country":
      ColumnName = "country";
      break;
      case "phoneNumber":
        ColumnName = "phoneNumber";
        break;
    default:
      ColumnName = _default;
  }
  return ColumnName;
}
const BuildInputQuery = (req) => {
  var map = new HashMap();
  if (req.body.regUserID !== undefined) {
    if (Utilities.NumberValidation(req.body.regUserID) != -1)
      map.set(" AND ur.regUserID =?", parseInt(req.body.regUserID));
  }
  if (req.body.firstName !== undefined) {
    if (Utilities.isNullorEmpty(req.body.firstName))
      map.set(" AND ur.firstName LIKE ? ", "%" + req.body.firstName + "%");
  }
  if (req.body.lastName !== undefined) {
    if (Utilities.isNullorEmpty(req.body.lastName))
      map.set(" AND ur.lastName LIKE ? ", "%" + req.body.lastName + "%");
  }
  if (req.body.phoneNumber !== undefined) {
    if (Utilities.isNullorEmpty(req.body.phoneNumber))
      map.set(" AND ur.phoneNumber LIKE ? ", "%" + req.body.phoneNumber + "%");
  }
  if (req.body.emailId !== undefined) {
    if (Utilities.isNullorEmpty(req.body.emailId))
      map.set(" AND ur.emailId LIKE ? ", "%" + req.body.emailId + "%");
  }
  return map;
};

const SearchRegisterUserDetails = async (req) => {
  let take = 1; let skip = 0;
  let ParameterQuery = " ";
  let ParameterQueryData = [];
  let SearchResults = [];
  if (req.body.take !== undefined) {
      take = req.body.take;
  }
  if (req.body.skip !== undefined) {
      skip = req.body.skip;
  }
  let Pagenation = {
      totlapages: 0,
      take: take,
      skip: skip
  }
  let reqBody = BuildInputQuery(req);
  reqBody.forEach(function (value, key) {
      ParameterQueryData.push(value);
      ParameterQuery += key;
  });
  let OrderBy = " ORDER BY " + GetSortColumn(req.body.sortcolumn) + ' '
      + GetSortOrder(req.body.sortorder) + " LIMIT ? OFFSET ? ";
      var BaseQuery = " SELECT traingIDFK,regUserID,phonenumber,lastName,firstName,emailiD,country "
                     + " FROM  tbl_userregistration ur " 
                     + " WHERE ur.ReguserId > 1";
  try {
      const rows = await pool.query(BaseQuery + ParameterQuery, ParameterQueryData);
      if (rows.length > 0) {
          Pagenation.totlapages = rows.length;
      }
      ParameterQueryData.push(parseInt(Pagenation.take));
      ParameterQueryData.push(parseInt(Pagenation.skip));
      let SearchQuery = BaseQuery + ParameterQuery + OrderBy;
      const Results = await pool.query(SearchQuery, ParameterQueryData);
      SearchResults.push(Pagenation);
      SearchResults.push(Results);
      return SearchResults;
  }
  catch (err) {
    throw new Error(err)
  }
};
const GetUserQuesandAnswers = async (userRegID,traingIDFK) => {
  
  var SearchQuery = " Select userIDFK,useranswerIdPk,traingIDFK,questionIDFK,questiondesc,answersDesc,answercomboID,combodtldesc "
  +" from tbl_user_reg_answers usr_reg_ans "
  +" LEFT JOIN tbl_user_reg_questions user_reg_q "
  +" ON user_reg_q.QuestionsIDPK = usr_reg_ans.QuestionIDFK "
  +" LEFT JOIN tbl_combodetails cmb on cmb.combodtlIdpk =usr_reg_ans.answercomboID "
  +" WHERE UserIDFK = ? AND traingIDFK = ?";
  const _Object = [userRegID,traingIDFK
  ];
try {
  const rows = await pool.query(SearchQuery ,_Object);
  return rows;
}
catch (err) {
throw new Error(err)
}
};
module.exports = {
  SearchRegisterUserDetails: SearchRegisterUserDetails,
  GetUserQuesandAnswers:GetUserQuesandAnswers
}
