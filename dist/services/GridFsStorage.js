'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.upload = undefined;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _multer = require('multer');

var _multer2 = _interopRequireDefault(_multer);

var _multerGridfsStorage = require('multer-gridfs-storage');

var _multerGridfsStorage2 = _interopRequireDefault(_multerGridfsStorage);

var _keys = require('./../keys');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mlab = _keys2.default.USERS_DB;

var bucketList = _keys2.default.BUCKET_LIST;

// check the file extension and the bucket for it
var getBucket = function getBucket(fileType) {
  var bucket = bucketList[fileType];
  return bucket ? bucket : "uploads";
};

// stores the file to a specific bucket from the bucketlist
var storage = new _multerGridfsStorage2.default({

  url: mlab,

  file: function file(req, _file) {

    return new Promise(function (resolve, reject) {

      // create unique filename
      _crypto2.default.randomBytes(16, function (err, buf) {

        if (err) {
          return reject(err);
        }

        var filename = buf.toString('hex') + _path2.default.extname(_file.originalname);
        var fileInfo = {
          filename: filename,
          metadata: {
            owner: "ownerId"
          },
          bucketName: getBucket(_file.mimetype)
        };

        resolve(fileInfo);
      });
    });
  }
});

var upload = exports.upload = (0, _multer2.default)({ storage: storage });
//# sourceMappingURL=GridFsStorage.js.map