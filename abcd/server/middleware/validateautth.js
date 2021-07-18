const jwt = require('jsonwebtoken');
const jwtKey = require('../config');

const authmiddleware = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    //return res.status(401).end();
    return res.status(401).send({ _errMsg: { errMsg: "Cookie Invalid", errCode: 401 } });
  }
  let error = null;
  var payload
  try {
    payload = jwt.verify(token, jwtKey.secret)
  } catch (e) {
    if (e instanceof jwt.JsonWebTokenError) {
      error = e;
    }
  }

  if (payload) {
    next();
  } else {
    console.log("cookie Error", error);
    return res.status(401).send({ _errMsg: { errMsg: "Cookie Invalid", errCode: 401 } });
  }

}
module.exports = authmiddleware;