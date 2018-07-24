'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _keys = require('./../keys');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (app) {
    var PORT = process.env.PORT || _keys2.default.LOCAL_PORT;
    app.listen(PORT, function () {
        return console.log(new Date().toLocaleString() + ' server : started at port ' + PORT);
    });
};
//# sourceMappingURL=AppServer.js.map