const jwt = require('jsonwebtoken');
const jwtKey = require('../config');

 getLoginUser = (token) => {
    try {
        return jwt.verify(token, jwtKey.secret);
    }
    catch (e) {
        if (e instanceof jwt.JsonWebTokenError) {
            error = e;
        }

    }
};
module.exports={
    getLoginUser:getLoginUser
}
