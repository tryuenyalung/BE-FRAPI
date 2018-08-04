'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongoosePaginate = require('mongoose-paginate');

var _mongoosePaginate2 = _interopRequireDefault(_mongoosePaginate);

var _Name = require('./Name');

var _Name2 = _interopRequireDefault(_Name);

var _keys = require('./../keys');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//adding createdAt and updatedAt field
var timestamps = {
    createdAt: 'created_at',
    updatedAt: 'update_at'
};

var Users = _mongoose2.default.Schema({

    username: {
        type: String,
        required: [true, "User Schema: username is required"]
    },

    password: {
        type: String,
        required: [true, "User Schema: password is required"]
    },

    avatar: {
        type: String,
        default: null
    },

    name: _Name2.default,

    gender: {
        type: String,
        enum: {
            values: ['male', 'female'],
            message: 'User Schema: gender must only be male or female'
        },
        required: [true, "User Schema: gender is required"]
    },

    dateOfBirth: {
        type: String,
        required: [true, "User Schema: dateOfBirth is required"]
    },

    address: {
        type: String,
        required: [true, "User Schema: address is required"]
    },

    department: {
        type: String,
        required: [true, "User Schema: department is required"]
    },

    position: {
        type: String,
        required: [true, "User Schema: position is required"]
    },

    signature: {
        type: String,
        required: [true, "User Schema: signature is required"]
    },

    status: {
        type: Boolean,
        default: false
    }

}, { timestamps: timestamps });

//adding pagination plugin for mongoose
Users.plugin(_mongoosePaginate2.default);

// mongoose.model(documentName, exportName)
exports.default = _mongoose2.default.model("users", Users);
//# sourceMappingURL=Users.js.map