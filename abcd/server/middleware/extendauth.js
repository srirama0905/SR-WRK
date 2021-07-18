const jwt = require('jsonwebtoken')
const jwtKey=require('../config');

const refresh = (req, res,next) => {
   
    const token = req.cookies.token;
  
    if (!token) {
      return res.status(401).end();
    }
  
    var payload
    try {
      payload = jwt.verify(token, jwtKey.secret);
    } catch (e) {
      if (e instanceof jwt.JsonWebTokenError) {
        return res.status(401).end();
      }
      return res.status(400).end();
    }
    // (END) The code uptil this point is the same as the first part of the `welcome` route
    // We ensure that a new token is not issued until enough time has elapsed
    // In this case, a new token will only be issued if the old token is within
    // 30 seconds of expiry. Otherwise, return a bad request status
    const nowUnixSeconds = Math.round(Number(new Date()) / 1000)
    if (payload.exp - nowUnixSeconds > 30) {
      return res.status(400).end()
    }
  
    // Now, create a new token for the current user, with a renewed expiration time
    const newToken = jwt.sign({ username: payload.username }, jwtKey.secret, {
      algorithm: 'HS256',
      expiresIn: jwtExpirySeconds
    });
  
    // Set the new token as the users `token` cookie
    res.cookie('token', newToken, { maxAge: jwtExpirySeconds * 1000 })
    res.end();
};