'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.findAllFileTags = exports.addFileTag = undefined;

var _FileTag = require('./../schemas/FileTag');

var _FileTag2 = _interopRequireDefault(_FileTag);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//create efile
var addFileTag = exports.addFileTag = function addFileTag(req, res) {

    var body = {
        file_tag: req.body.file_tag
    };

    _FileTag2.default.create(body, function (err, data) {
        return err ? res.status(422).send(err) : res.status(201).send(data);
    });
}; //@end


//read all data
var findAllFileTags = exports.findAllFileTags = function findAllFileTags(req, res) {
    //exclude content
    _FileTag2.default.find({}, '-content', function (err, data) {
        return err ? res.status(500).send(err) : res.send(data);
    });
}; //@end
//# sourceMappingURL=FileTagController.js.map