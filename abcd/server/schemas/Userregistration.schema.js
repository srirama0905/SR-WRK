const Joi = require('@hapi/joi');

const UserRegistrationSchema = {
  RegisterUserDtls: Joi.object().keys({   
    regUserID: Joi.number().integer().required().error(() => 'UserId is Required'),
    firstName:  Joi.string().min(5).required().error(() => 'First Name is required')   ,
    lastName:  Joi.string().min(5).required().error(() => 'Last Name is required'),
    emailId:  Joi.string().email().required().error(() => 'EmailId is required')   ,
    country: Joi.number().integer().required().error(() => 'Conutry Name is required'),
      //phoneNumber: Joi.string().regex(/^[0-9]{10}$/).required().error(() => 'Phone Number is required'),
    traingIDFK: Joi.number().integer().required().error(() => 'TrainingSchedule is Required'),
    
  }).options({ stripUnknown: true }),
  RegisterUserSearch: Joi.object().keys({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    emailId:Joi.string().required(),
    phoneNumber:Joi.string().required(),
    skip: Joi.number().required(),
    take: Joi.number().required(),
    sortcolumn: Joi.string().min(3).max(50).required(),
    sortorder: Joi.string().min(3).max(4).required()
  }).options({ stripUnknown: true })
}
 
module.exports = UserRegistrationSchema;




