const Joi = require('@hapi/joi');

const authuserSchema = {
    AuthUser: Joi.object().keys({
        Email: Joi.string().min(3).max(45).required(),
        Password:  Joi.string().min(3).max(45).required(),
    }).options({ stripUnknown: true }),
    UserPost: Joi.object().keys({
        userIDPK:Joi.number().integer().required(),
        //userName:Joi.string().min(3).max(45).required().error(() => 'Please enter User Name'),
        firstName:Joi.string().min(3).max(45).required().error(() =>'Please enter First Name'),
        lastName:Joi.string().min(3).max(45).required().error(() => 'Please enter Last Name'),
        email:Joi.string().min(3).max(45).required().error(() => 'Please enter Email')
        
    }).options({ stripUnknown: true }),
    UserSearch: Joi.object().keys({
        userIDPK:Joi.number().integer().required(),
        //userName:Joi.string().min(3).max(45).required().error(() => 'Please enter User Name'),
        skip: Joi.number().required(),
        take: Joi.number().required(),
        sortcolumn: Joi.string().min(3).max(50).required(),
        sortorder: Joi.string().min(3).max(4).required()
    }).options({ stripUnknown: true }),
    
    UserPWD: Joi.object().keys({
        UserIDPK: Joi.number().integer().required(),
        Password:  Joi.string().min(3).max(45).required(),
    }).options({ stripUnknown: true }),
    UserValidation: Joi.object().keys({
        Email: Joi.string().min(3).max(45).required(),
        UserName:  Joi.string().min(3).max(45).required(),
    }).options({ stripUnknown: true }),
  
  
};

module.exports = authuserSchema;