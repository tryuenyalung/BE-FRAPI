'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _EfileController = require('./../controllers/EfileController');

var EfileController = _interopRequireWildcard(_EfileController);

var _GenericValidator = require('./../validators/GenericValidator');

var GenericValidator = _interopRequireWildcard(_GenericValidator);

var _EfileValidator = require('./../validators/EfileValidator');

var EfileValidator = _interopRequireWildcard(_EfileValidator);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get('/',
//check if it has query page=number
EfileController.paginatedEfile, EfileController.findAllEfiles);

router.get('/:efileId',
// GenericValidator.validateObjectId,
EfileController.findEfileById);

//find all the pending recipients for specific user
router.get('/pending/:userId', EfileController.findAllPendingEfileById);

//find all public efile that has been published
router.get('/published/public', EfileController.findAllPublicPublishedEfile);

//find all rejected efile the user has
router.get('/rejected/:userId', EfileController.findAllRejectedEfileByUserId);

router.get('/published/private/user/:userId', EfileController.findAllPrivatePublishedEfileByUserId);

// approve the efile
router.put('/approve/:efileId', EfileController.approveEfile);

// jwt in the interceptor
// router.post('/reject/:efileId', 

// )

// jwt in the interceptor
// router.get('/publish/:efileId', 

// )


// router.get('/search', 
//     UserValidator.validateQueryString,
//     UserController.searchQuery
// )


router.post("/", EfileValidator.postReqValidate, EfileController.createEfile);

router.put('/:efileId',
// GenericValidator.validateObjectId,
EfileController.updateEfile);

router.delete('/:efileId',
// GenericValidator.validateObjectId,
EfileController.deleteEfile);

exports.default = router;
//# sourceMappingURL=EfileRoute.js.map