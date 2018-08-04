'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.validateQueryString = exports.validateUsers = undefined;

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var postReqValidator = _joi2.default.object().keys({
    username: _joi2.default.string().required(),
    password: _joi2.default.string().required(),
    name: {
        first_name: _joi2.default.string().required(),
        middle_name: _joi2.default.string().required(),
        last_name: _joi2.default.string().required()
    },
    gender: _joi2.default.string().valid('male', 'female').required(),
    dateOfBirth: _joi2.default.string().required(),
    address: _joi2.default.string().required(),
    department: _joi2.default.string().required(),
    position: _joi2.default.string().required(),
    signature: _joi2.default.string().required()
});

var validateUsers = exports.validateUsers = function validateUsers(req, res, next) {
    var err = _joi2.default.validate(req.body, postReqValidator, { abortEarly: false });
    // {errors: (err.error.details).map(x => x.message) }
    err.error !== null ? res.status(422).send({ errors: err.error.details.map(function (x) {
            return x.message;
        }) }) : next();
}; //@end


var validateQueryString = exports.validateQueryString = function validateQueryString(req, res, next) {
    //checking query strings, all are not required
    if (req.query.gender) {
        var err = _joi2.default.validate(req.query.gender, _joi2.default.string().valid('male', 'female').error(Error("gender must be either male or female only")));
        err.error !== null ? res.status(422).send({ errors: err.error.message }) : next();
    } else if (req.query.name) {
        var _err = _joi2.default.validate(req.query.name, _joi2.default.string());
        _err.error !== null ? res.status(422).send({ errors: _err.error.message }) : next();
    } else if (req.query.status) {
        var _err2 = _joi2.default.validate(req.query.status, _joi2.default.string().valid('y', 'n').error(Error("status must be either y(true) or n(false) only")));
        _err2.error !== null ? res.status(422).send({ errors: _err2.error.message }) : next();
    } else {
        next();
    }
}; //@end
//# sourceMappingURL=UserValidator.js.map