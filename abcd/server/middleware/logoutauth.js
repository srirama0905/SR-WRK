const jwt = require('jsonwebtoken');
const jwtKey = require('../config');

const logoutauth = (req, res, next) => {
  //const token = req.cookies.token;
   res.cookie("token", "", { expires: new Date(0),domain: 'localhost',SameSite:false, path:'/'}).
   send({ _errMsg: { errMsg: "Logout Successfully", errCode: 900 } });
  
}
module.exports = logoutauth;