'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.findAll = exports.findOne = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _gridfsStream = require('gridfs-stream');

var _gridfsStream2 = _interopRequireDefault(_gridfsStream);

var _keys = require('./../keys');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mlab = _keys2.default.USERS_DB;
var conn = _mongoose2.default.createConnection(mlab);
var gfs = void 0;

conn.once('open', function () {
    gfs = (0, _gridfsStream2.default)(conn.db, _mongoose2.default.mongo);
});

// list of valid file extensions
var fileExtList = _keys2.default.FILE_EXT_LIST;

// check if valid file extension and fetch it on a dedicated bucket
var getExtForBucket = function getExtForBucket(fileExt) {
    var bucket = fileExtList[fileExt];
    return bucket ? bucket : "uploads";
};

var findOne = exports.findOne = function findOne(req, res) {

    var fileExt = _path2.default.extname(req.params.filename);
    var fileName = { filename: req.params.filename

        // select a bucket base on file extension
    };gfs.collection(getExtForBucket(fileExt));

    gfs.files.findOne(fileName, function (err, file) {
        var readstream = gfs.createReadStream(fileName);
        // return error msg
        readstream.on('error', function (err) {
            return res.status(404).send(_keys2.default.FILE_ERR_MSG);
        });
        // return file
        readstream.pipe(res);
    });
};

// gfs.files.find({ filename: 'myImage.png' }).toArray(function (err, files) {
//     if (err) ...
//     console.log(files);
//   })


var findAll = exports.findAll = function findAll(req, res) {

    gfs.collection("images");
    // gfs.collection( "fileType")

    var fileOwner = { metadata: { owner: "ownerId" } };
    gfs.files.find(fileOwner).toArray(function (err, files) {
        return res.json(files);
    });
};
//# sourceMappingURL=GridFsStream.js.map