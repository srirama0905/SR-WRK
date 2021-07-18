const Joi = require('@hapi/joi');
const ReferenceDataSchema = {
    BusinessunitPOST: Joi.object().keys({
        BUID: Joi.number().integer().required(),
        BuMasterID: Joi.number().integer().required(),
        BUMstrName: Joi.string().min(5).required().error(() => 'Please enter Master Business Unit details'),
        Businessunit: Joi.string().min(5).required().error(() => 'Please enter Business Unit details'),
        StartDate: Joi.date().required().error(() => 'Please enter Start Date'),
        EndDate: Joi.date().required().error(() => 'Please enter End Date'),
        isActive: Joi.number().integer().required(),
        }).options({ stripUnknown: true }),
    BusinessunitGet: Joi.object().keys({
        BUID: Joi.number().required().error(() => 'Business Unit Id is required')
        }).options({ stripUnknown: true }),
    BusinessunitList: Joi.object().keys({        
        skip: Joi.number().required(),
        take: Joi.number().required(),
        sortcolumn: Joi.string().min(3).max(50).required(),
        sortorder: Joi.string().min(3).max(4).required()
    }).options({ stripUnknown: true }),
    ReferenceDataPOST: Joi.object().keys({
        comboDetailIDPK: Joi.number().integer().required(),
        comboHeaderIDFK: Joi.number().integer().required(),
        comboDesc: Joi.string().min(3).required(),
        sortOrder: Joi.number().integer().required(),
        parentID: Joi.number().integer().required(),
        isActive: Joi.number().integer().required()
    }).options({ stripUnknown: true }),
    RefDataSearch: Joi.object().keys({
        comboHeaderIDFK:Joi.number().integer().required(),
        //userName:Joi.string().min(3).max(45).required().error(() => 'Please enter User Name'),
        skip: Joi.number().required(),
        take: Joi.number().required(),
        sortcolumn: Joi.string().min(3).max(50).required(),
        sortorder: Joi.string().min(3).max(4).required()
    }).options({ stripUnknown: true }),
    CRMReferenceDataPOST: Joi.object().keys({
        CRMID: Joi.number().integer().required().error(() => 'CRM ID is required'),
        ProcID: Joi.number().integer().required().error(() => 'ProcID Card is required'),
        Proceduredesc: Joi.string().min(3).required().error(() => 'Procedure is required'),
        ProceduregrpID: Joi.number().integer().required().error(() => 'Procedure group is required'),
        TemplateID: Joi.number().integer().required().error(() => 'TemplateID is required'),
        IsActive: Joi.number().integer().required().error(() => 'Active is required'),
        IsExaminer: Joi.number().integer().required().error(() => 'Examiner is required'),
        IsEIC: Joi.number().integer().required().error(() => 'EIC is required'),
        StartDate: Joi.date().required().error(() => 'StartDate is required'),
        EndDate: Joi.date().required().error(() => 'EndDate is required'),
    }).options({ stripUnknown: true }),
    CRMGetDelete: Joi.object().keys({
        CRMID: Joi.number().required()
    }).options({ stripUnknown: true }),
    CRMSearchList: Joi.object().keys({
        skip: Joi.number().required(),
        take: Joi.number().required(),
        sortcolumn: Joi.string().min(3).max(50).required(),
        sortorder: Joi.string().min(3).max(4).required()

    }).options({ stripUnknown: true })
  
};
module.exports = ReferenceDataSchema;