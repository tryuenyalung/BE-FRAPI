'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.postReqValidate = undefined;

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var postReqValidator = _joi2.default.object().keys({
    name: _joi2.default.string().required(),
    content: _joi2.default.string().required(),
    recipient: _joi2.default.array().required(),
    sender: _joi2.default.object().required(),
    private_doc: _joi2.default.boolean().required()
});

var postReqValidate = exports.postReqValidate = function postReqValidate(req, res, next) {
    var err = _joi2.default.validate(req.body, postReqValidator, { abortEarly: false });
    err.error !== null ? res.status(422).send({ errors: err.error.details.map(function (x) {
            return x.message;
        }) }) : next();
};
//# sourceMappingURL=EfileValidator.js.map