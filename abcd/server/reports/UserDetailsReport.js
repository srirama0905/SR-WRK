var HashMap = require('hashmap');
const pool = require('../db');
var Utilities = require('../Utilities/Utilities');

const GetSortOrder = (orderBy) => {
  if (orderBy !== "asc") return "desc"; else return "asc";
}
const GetSortColumn = (order) => {
  let _default = "UserIDPK";
  switch (order) {
    case "userIDPK":
      ColumnName = "UserIDPK"; //Proceduredesc     
    case "firstName":
      ColumnName = "FirstName";
      break;
    case "lastName":
      ColumnName = "LastName";
      break;
    case "email":
      ColumnName = "Email";
      break;
      case "isActive":
        ColumnName = "isActive";
        break;
        case "isTrailUser":
          ColumnName = "isTrailUser";
          break;

    default:
      ColumnName = _default;
  }
  return ColumnName;
}
const BuildInputQuery = (req) => {
  var map = new HashMap();
  if (req.body.userIDPK !== undefined) {
    if (Utilities.NumberValidation(req.body.userIDPK) != -1)
      map.set(" AND u.UserIDPK =?", parseInt(req.body.userIDPK));
  }
  if (req.body.isactive !== undefined) {
    if (Utilities.NumberValidation(req.body.isactive) != -1)
      map.set(" AND u.isactive =?", parseInt(req.body.isactive));
  }
  if (req.body.istrailUser !== undefined) {
    if (Utilities.NumberValidation(req.body.istrailUser) != -1)
      map.set(" AND u.istrailuser =?", parseInt(req.body.istrailUser));
  }
  if (req.body.firstName !== undefined) {
    if (Utilities.isNullorEmpty(req.body.firstName))
      map.set(" AND u.FirstName LIKE ? ", "%" + req.body.firstName + "%");
  }
  if (req.body.lastName !== undefined) {
    if (Utilities.isNullorEmpty(req.body.lastName))
      map.set(" AND u.LastName LIKE ? ", "%" + req.body.lastName + "%");
  }
  if (req.body.email !== undefined) {
    if (Utilities.isNullorEmpty(req.body.email))
      map.set(" AND u.Email LIKE ? ", "%" + req.body.email + "%");
  }
  return map;
};

const SearchUserDetails = async (req) => {
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
      var BaseQuery = " SELECT u.UserIDPK,u.UserName,u.FirstName,u.LastName,u.Email,u.isexpired,u.islocked,u.istrailuser,"
      + " u.trailStDate,u.traileddate,u.lastlogin,u.wrngattempts,u.passwordrotation, "
      + " u.chgpwdrequired,u.createdby,u.datecreated,u.modifiedby,u.datemodified,"
      +"  u.subscriptionstdate,u.subscriptioneddate,u.isactive,"
      + " CONCAT(crtby.Firstname  , '' ,crtby.lastname ) as crtby, "
      + " CONCAT(mdfy.Firstname, '' , mdfy.lastname ) as mdfyby "
      + " FROM  tbl_user u "
      + " LEFT JOIN  tbl_user crtby on crtby.userIdpk=u.createdby "
      + " LEFT JOIN  tbl_user mdfy on mdfy.userIdpk=u.modifiedby "   
      + " WHERE u.UserIDPK > 1";
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

const GetRolesByUserID = async (userIDPK) => {
      var BaseQuery = " SELECT roleIdfk FROM crdb.tbl_userrole "   
      + " WHERE userroleIdpk > 1 AND isactive = 1 AND userIdfk = ? ";
  try {
      const rows = await pool.query(BaseQuery, userIDPK);
      return rows;
  }
  catch (err) {
    return -1;
  }
};
module.exports = {
  SearchUserDetails: SearchUserDetails,
  GetRolesByUserID: GetRolesByUserID

}
