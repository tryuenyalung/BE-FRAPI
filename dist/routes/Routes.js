'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _UserRoute = require('./UserRoute');

var _UserRoute2 = _interopRequireDefault(_UserRoute);

var _FileRoute = require('./FileRoute');

var _FileRoute2 = _interopRequireDefault(_FileRoute);

var _EfileRoute = require('./EfileRoute');

var _EfileRoute2 = _interopRequireDefault(_EfileRoute);

var _FileTagRoute = require('./FileTagRoute');

var _FileTagRoute2 = _interopRequireDefault(_FileTagRoute);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (app) {
    app.use("/api/v1/users", _UserRoute2.default);
    app.use("/api/v1/files", _FileRoute2.default);
    app.use("/api/v1/efiles", _EfileRoute2.default);
    app.use("/api/v1/fileTag", _FileTagRoute2.default);
};
//# sourceMappingURL=Routes.js.map