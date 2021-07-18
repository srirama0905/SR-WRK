var express = require('express');
var router = express.Router();

const ReferenceDataController = require('../controllers/ReferencedataController');


const ValidateSchema = require('../middleware/validateschema');
const AuthMiddleware = require('../middleware/validateautth');
const ReferenceData = require('../schemas/ReferenceData.schema');


router.post('/api/getcmblst',ValidateSchema(ReferenceData.RefDataSearch,'body'),ReferenceDataController.GetReferenceDetails)
router.post('/api/getquestions',ReferenceDataController.GetQuestions)
module.exports = router;