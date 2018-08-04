'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.validateObjectId = undefined;

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_joi2.default.objectId = require('joi-objectid')(_joi2.default);

var validateObjectId = exports.validateObjectId = function validateObjectId(req, res, next) {
    var err = _joi2.default.validate(req.params.id, _joi2.default.objectId().error(Error("invalid object id")));
    err.error !== null ? res.status(422).send({ errors: err.error.message }) : next();
}; //@end
//# sourceMappingURL=GenericValidator.js.map