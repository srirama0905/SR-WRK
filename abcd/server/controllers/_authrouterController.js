const jwt = require('jsonwebtoken');
const jwtKey = require('../config');
var cookie = require('cookie');
const _usermodal = require('../models/UserModel');
const jwtExpirySeconds = 3000;

//Need to pass the user  name and Pwd from DB 
exports.auth_user_details = async function (req, res) {
 // return 401 error is username or password doesn't exist, or if password does
  // not match the password in our records
  let _userobj = await _usermodal.getloginuserdetails(req.body.Email, req.body.Password);
  let Usercookie = {
    userpk: _userobj.UserIDPK,
    firstname: _userobj.FirstName,
    lastname: _userobj.LastName
  }
  if (_userobj.ErrorCode != 200)
    return res.status(401).send(_userobj.ErrorMsge);
  // Create a new token with the username in the payload
  // and which expires 30 seconds after issue
  const token = jwt.sign(Usercookie, jwtKey.secret, {
    algorithm: 'HS256',
    expiresIn: jwtExpirySeconds
  })
  console.log('token:', token);
  const options = {
    secure: false,
    httpOnly: false,
    domain: 'localhost',
    path: '/',
    maxAge: jwtExpirySeconds * 1000
  }
  // set the cookie as the token string, with a similar max age as the token
  // here, the max age is in milliseconds, so we multiply by 1000
  res.cookie('token', token, {
    maxAge: jwtExpirySeconds * 1000, httpOnly: false,
    domain: 'localhost', SameSite: false, path: '/'
  }).send(_userobj);
  //res.setHeader('Location', req.headers.referer || '/');
  //res.end();
  //res.send('NOT IMPLEMENTED: Business unit Master create POST');
}
exports.isCookeValid =  async function (req, res) { 
  let CookieObject = {};

  try {
    CookieObject.errorCode = 200;
    CookieObject.errMsge = "Cookie Valied";
    return res.status(200).send({ _errMsg: { errMsg: "Cookie Valid", errCode: 200 } });

  }
  catch (Ex) {
    CookieObject.errorCode = 500;
    CookieObject.errMsge = "Cookie Not Valied";
    return res.status(500).send({ _errMsg: { errMsg: "Cookie Invalid", errCode: 500 } });
  }

}