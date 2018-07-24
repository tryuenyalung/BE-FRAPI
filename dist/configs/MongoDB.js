'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _keys = require('./../keys');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {

    var uri = _keys2.default.USERS_DB;

    var options = {
        autoIndex: false, // Don't build indexes
        reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
        reconnectInterval: 500, // Reconnect every 500ms
        poolSize: 10, // Maintain up to 10 socket connections
        // If not connected, return errors immediately rather than waiting for reconnect
        bufferMaxEntries: 0
    };

    _mongoose2.default.connect(uri, options).then(function () {
        console.log(new Date().toLocaleString() + ' mongodb : connnection success');
    }, function (err) {
        console.error(err);
    });

    // mongoose.connect(uri,  { useNewUrlParser: true })
};
//# sourceMappingURL=MongoDB.js.map