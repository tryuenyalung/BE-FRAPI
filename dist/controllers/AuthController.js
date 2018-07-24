'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.verifyToken = exports.authUser = undefined;

var _Users = require('./../schemas/Users');

var _Users2 = _interopRequireDefault(_Users);

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _keys = require('./../keys');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

//authenticate user
var authUser = function authUser(req, res) {
    var username = { username: req.body.username };

    var cbGetUser = function cbGetUser(err, userData) {
        if (err) {
            res.status(404).send({ errors: err });
        } else if (userData === null) {
            //check if no user match the credentials
            res.status(401).send({ errors: "no record found in database" });
        } else {

            if (!userData.status) {
                //check if status is active
                res.status(401).send({ errors: "your account is registered, but we still need approval of the admin, please contact your system administrator" });
            } else {

                var cbSendToken = function cbSendToken(err, token) {
                    //send token
                    //destructure userData, exclude some fields
                    var _userData$_doc = userData._doc,
                        password = _userData$_doc.password,
                        created_at = _userData$_doc.created_at,
                        update_at = _userData$_doc.update_at,
                        __v = _userData$_doc.__v,
                        user = _objectWithoutProperties(_userData$_doc, ['password', 'created_at', 'update_at', '__v']);

                    var dataForLocalStorage = {
                        token: token,
                        user: user
                    };
                    res.send(dataForLocalStorage);
                }; //cbSendToken

                var cbCheckPassword = function cbCheckPassword(err, isPasswordValid) {
                    // check if password valid and send token
                    !isPasswordValid ? res.status(401).send({ errors: "invalid password" }) : _jsonwebtoken2.default.sign({ id: userData._id }, _keys2.default.SECRET, { expiresIn: '30s' }, cbSendToken);
                };

                //check if password matches
                _bcrypt2.default.compare(req.body.password, userData.password, cbCheckPassword);
            }
        } //else
    }; //cbGetUser

    //findOne by username
    _Users2.default.findOne(username, cbGetUser); //findOne
}; //@end

exports.authUser = authUser;
var verifyToken = exports.verifyToken = function verifyToken(req, res, next) {
    var bearerHeader = req.headers['Authorization'];

    if (bearerHeader !== undefined) {
        var bearerToken = bearerHeader.split(' '); //split the Bearer and token
        var token = bearerToken[1]; // get the token on (Bearer token12eiuasd8)

        var cbDecodeToken = function cbDecodeToken(err, decoded) {
            // if token is doesn't have error and its not undefined
            !err || decoded !== undefined ? next() : res.status(401).send({ errors: err });
        };

        _jsonwebtoken2.default.verify(token, _keys2.default.SECRET, cbDecodeToken);
    } else {
        res.status(401).send({ message: "Not Authorized!" });
    }
}; //@end
//# sourceMappingURL=AuthController.js.map