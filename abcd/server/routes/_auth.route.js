var express = require('express');
var authrouter = express.Router();

const auth_controller=require('../controllers/_authrouterController');
const middleware = require('../middleware/validateschema');
const authmiddleware = require('../middleware/validateautth');
const AuthUser=require('../schemas/Userdtls.schema');
const LogoutAuthMiddleware = require('../middleware/logoutauth');

authrouter.post('/api/usr',middleware(AuthUser.AuthUser,'body'),auth_controller.auth_user_details);
authrouter.get('/api',authmiddleware,auth_controller.isCookeValid);
authrouter.get('/api/logout', LogoutAuthMiddleware);
module.exports = authrouter;