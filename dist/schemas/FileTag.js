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
};

var FileTags = _mongoose2.default.Schema({

    file_tag: {
        type: String,
        required: [true, "FileTag Schema: file_tag is required"]
    }

}, { timestamps: timestamps });

//adding pagination plugin for mongoose
FileTags.plugin(_mongoosePaginate2.default);

// mongoose.model(documentName, exportName)
exports.default = _mongoose2.default.model("file_tags", FileTags);
//# sourceMappingURL=FileTag.js.map