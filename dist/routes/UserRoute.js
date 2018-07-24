'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _UserController = require('./../controllers/UserController');

var UserController = _interopRequireWildcard(_UserController);

var _AuthController = require('./../controllers/AuthController');

var AuthController = _interopRequireWildcard(_AuthController);

var _UserValidator = require('./../validators/UserValidator');

var UserValidator = _interopRequireWildcard(_UserValidator);

var _GenericValidator = require('./../validators/GenericValidator');

var GenericValidator = _interopRequireWildcard(_GenericValidator);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get('/',
// AuthController.verifyToken,
UserController.paginatedUser, //check if it has query page=number
UserController.findAllUsers);

router.get('/search', UserValidator.validateQueryString, UserController.searchQuery);

router.get('/:userId',
// GenericValidator.validateObjectId,
UserController.findUserById);

router.post("/", UserValidator.validateUsers, // validates the req body
UserController.addUser);

router.post("/login", AuthController.authUser);

router.put('/:userId',
// GenericValidator.validateObjectId,
UserController.updateUser);

router.put('/password/:userId',
// GenericValidator.validateObjectId,
UserController.updateUserPassword);

router.delete('/:userId',
// GenericValidator.validateObjectId,
UserController.deleteUser);

exports.default = router;
//# sourceMappingURL=UserRoute.js.map