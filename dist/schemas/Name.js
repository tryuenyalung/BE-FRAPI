"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var options = {
    _id: false
};

var Name = _mongoose2.default.Schema({

    first_name: {
        type: String,
        required: [true, "User Schema: first_name is required"]
    },

    middle_name: {
        type: String,
        required: [true, "User Schema: middlea_name is required"]
    },

    last_name: {
        type: String,
        required: [true, "User Schema: last_name is required"]
    }

}, options);

exports.default = Name;
//# sourceMappingURL=Name.js.map