'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongoosePaginate = require('mongoose-paginate');

var _mongoosePaginate2 = _interopRequireDefault(_mongoosePaginate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//adding createdAt and updatedAt field
var timestamps = {
    createdAt: 'created_at',
    updatedAt: 'update_at'

    //required string
};var reqStr = {
    type: String,
    required: true
};
var strNull = {
    type: String,
    default: null
};

var Efile = _mongoose2.default.Schema({

    name: reqStr,

    content: reqStr,

    recipient: { type: Array },

    pending_recipient: { type: Array },

    approved_recipient: { type: Array },

    rejected_recipient: {
        type: Object,
        default: null
    },

    signatures: {
        type: String,
        default: ''
    },

    sender: { type: Object },

    publish: {
        type: Boolean,
        default: false
    },

    private_doc: { //true for private , false for public 
        type: Boolean
    },

    rejection_reason: strNull

}, { timestamps: timestamps });

//adding pagination plugin for mongoose
Efile.plugin(_mongoosePaginate2.default);

// mongoose.model(documentName, exportName)
exports.default = _mongoose2.default.model("efiles", Efile);
//# sourceMappingURL=Efile.js.map