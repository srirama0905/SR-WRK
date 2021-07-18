const pool = require('../db');
const _userdtls=require('../Utilities/_getLoginUserdtls');


const InsertComboDetailsByAdmin = async (req, res) => {

  var _user=_userdtls.getLoginUser(req.cookies.token);
  
  const _query = 'INSERT INTO tbl_combodetails(combodtldesc,comboheaderfk,isactive,sortorder,ParentId,'
      +' createdby,modifiedby,datecreated,datemodified) VALUES (?,?,?,?,?,?,?,?,?)';
    const _buObject = [
    req.body.combodtldesc, req.body.comboheaderfk, req.body.isactive, req.body.sortorder, req.body.ParentId,
   _user.userpk, _user.userpk,new Date(),new Date() ];
  
   try {

    const _result = await pool.query(_query, _buObject);
    return _result.insertId;

  } catch (err) {
      throw new Error(err)
  }
};

const UpdateComboDetaisByAdmin = async (req, res) => {

  var _user=_userdtls.getLoginUser(req.cookies.token);
  
  const _query = 'UPDATE tbl_combodetails SET  combodtldesc=?, comboheaderfk=?, isactive=? ,'
    + ' sortorder=?, ParentId=?,modifiedby=?, datemodified=? '
    + ' WHERE combodtlIdpk=? '

  const _buObject = [req.body.combodtldesc, req.body.comboheaderfk,
  req.body.isactive, req.body.sortorder,
  req.body.ParentId,_user.userpk, new Date(),
  req.body.combodtlIdpk];

  try {
    const rs = await pool.query(_query, _buObject);
    return rs.affectedRows;
    } catch (err) {
        console.log(err.stack)
        return -1;
    }
};


module.exports = {
  InsertComboDetailsByAdmin: InsertComboDetailsByAdmin,
  UpdateComboDetaisByAdmin: UpdateComboDetaisByAdmin
}