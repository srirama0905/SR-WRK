var express = require('express');
var router = express.Router();

const UserRegistrationController = require('../controllers/UserRegistrationController');
const ValidateSchema = require('../middleware/validateschema');
const AuthMiddleware = require('../middleware/validateautth');
const UserRegistration = require('../schemas/Userregistration.schema');

router.post('/api/create',  ValidateSchema(UserRegistration.RegisterUserDtls, 'body'), UserRegistrationController.InserUserRegistaratonDetails);
router.post('/api/update',  ValidateSchema(UserRegistration.RegisterUserDtls, 'body'), UserRegistrationController.UpdUserRegistaratonDetails);
router.post('/api/search',AuthMiddleware,ValidateSchema(UserRegistration.RegisterUserSearch,'body'),UserRegistrationController.GetUserRegistrationDetails);
//Need to implement
//router.get('/api/getuserreg/:userregId', AuthMiddleware, ValidateSchema(UserDtls.userValidation, 'params'), UserController.user_username_get);

module.exports = router;

