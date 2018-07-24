'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (app) {
    app.use(_bodyParser2.default.json({ limit: '50mb' }));
    app.use(_bodyParser2.default.urlencoded({ extended: true, limit: '50mb' }));
};
//# sourceMappingURL=BodyParser.js.map