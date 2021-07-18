var express = require('express');
var router = express.Router();

const UserController = require('../controllers/UserController');
const ValidateSchema = require('../middleware/validateschema');
const AuthMiddleware = require('../middleware/validateautth');
const UserDtls = require('../schemas/Userdtls.schema');

router.post('/api/create', AuthMiddleware, ValidateSchema(UserDtls.UserPost, 'body'), UserController.InsertUpdUserDetails);
router.post('/api/update', AuthMiddleware, ValidateSchema(UserDtls.UserPost, 'body'), UserController.InsertUpdUserDetails);
router.post('/api/updatepassword', AuthMiddleware, ValidateSchema(UserDtls.userPWD, 'body'), UserController.user_password_post);
router.post('/api/search',AuthMiddleware,ValidateSchema(UserDtls.UserSearch,'body'),UserController.GetUserDetails);

router.get('/getusername/:username', AuthMiddleware, ValidateSchema(UserDtls.userValidation, 'params'), UserController.user_username_get);
router.get('/getemail/:email', AuthMiddleware, ValidateSchema(UserDtls.userValidation, 'params'), UserController.user_email_get);

module.exports = router;

