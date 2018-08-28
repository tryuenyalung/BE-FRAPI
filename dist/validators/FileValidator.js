'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.validateUpdateSharedUser = undefined;

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var updateSharedUserValidator = _joi2.default.object().keys({
    filename: _joi2.default.string().required(),
    bucket: _joi2.default.string().required(),
    sharedUser: _joi2.default.array().required()
});

var validateUpdateSharedUser = exports.validateUpdateSharedUser = function validateUpdateSharedUser(req, res, next) {
    var err = _joi2.default.validate(req.body, updateSharedUserValidator, { abortEarly: false });
    err.error !== null ? res.status(422).send({ errors: err.error.details.map(function (x) {
            return x.message;
        }) }) : next();
};
//# sourceMappingURL=FileValidator.js.map