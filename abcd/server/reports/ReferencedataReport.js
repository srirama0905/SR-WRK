var HashMap = require('hashmap');
const pool = require('../db');
var Utilities = require('../Utilities/Utilities');

const GetSortOrder = (orderBy) => {
  if (orderBy !== "asc") return "desc"; else return "asc";
}
const GetSortColumn = (order) => {
  let _default = "comboDtlIDPK";
  switch (order) {
    case "comboDetailIDPK":
      ColumnName = "comboDtlIDPK"; //Proceduredesc     
    case "comboDesc":
      ColumnName = "comboDesc";
      break;
    case "comboHeaderDesc":
      ColumnName = "hdrdesc";
      break;
    case "isActive":
      ColumnName = "isActive";
      break;
    default:
      ColumnName = _default;
  }
  return ColumnName;
}
const BuildInputQuery = (req) => {
  var map = new HashMap();
  if (req.body.comboDetailIDPK !== undefined) {
    if (Utilities.NumberValidation(req.body.comboDetailIDPK) != -1)
      map.set(" AND comboDtlIDPK =?", parseInt(req.body.comboDetailIDPK));
  }
  if (req.body.comboHeaderIDFK !== undefined) {
    if (Utilities.NumberValidation(req.body.comboHeaderIDFK) != -1)
      map.set(" AND comboHeaderFK =?", parseInt(req.body.comboHeaderIDFK));
  }
  if (req.body.isActive !== undefined) {
    if (Utilities.NumberValidation(req.body.isActive) != -1)
      map.set(" AND isActive =?", parseInt(req.body.isActive));
  }
  if (req.body.comboDesc !== undefined) {
    if (Utilities.isNullorEmpty(req.body.comboDesc))
      map.set(" AND comboDesc LIKE ? ", "%" + req.body.comboDesc + "%");
  }
  if (req.body.comboHeaderDesc !== undefined) {
    if (Utilities.isNullorEmpty(req.body.comboHeaderDesc))
      map.set(" AND hdrdesc LIKE ? ", "%" + req.body.comboHeaderDesc + "%");
  }
  return map;
};

const SearchReferenceDataDetails = async (req) => {
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
      var BaseQuery = " select  cmbhdrIdpk,hdrdesc ,comboheaderfk,"
      +" combodtldesc,comboheaderfk,DTLS.combodtlIdpk,isactive,sortorder,ParentId"
      +" from tbl_comboheaderdtls CMBH  LEFT JOIN tbl_combodetails DTLS "
      +" ON DTLS.comboheaderfk=CMBH.cmbhdrIdpk where combodtlIdpk > 0";
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

module.exports = {
SearchReferenceDataDetails: SearchReferenceDataDetails
  
}
