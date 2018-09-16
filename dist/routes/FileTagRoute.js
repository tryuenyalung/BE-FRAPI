'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _FileTagController = require('./../controllers/FileTagController');

var FileTagController = _interopRequireWildcard(_FileTagController);

var _keys = require('./../keys');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import mongoose from 'mongoose'
// import path from 'path'
// import Grid from 'gridfs-stream'
// import keys from './../keys'


var router = _express2.default.Router();

router.get('/', FileTagController.findAllFileTags);
// router.get('/', FileStream.findAllFilesByOwner)

// router.get('/sharedFile', FileStream.findAllSharedFilesByUserId)

// router.get('/delete', FileStream.deactivateFile)

// router.get('/signature/:filename', FileStream.findOne(keys.BUCKET.SIGNATURE) )
// router.get('/image/:filename', FileStream.findOne(keys.BUCKET.IMAGE) )
// router.get('/profile/:filename', FileStream.findOne(keys.BUCKET.PROFILE) )
// router.get('/document/:filename', FileStream.findOne(keys.BUCKET.DOCUMENT) )
// router.get('/presentation/:filename', FileStream.findOne(keys.BUCKET.PRESENTATION) )
// router.get('/spreadsheet/:filename', FileStream.findOne(keys.BUCKET.SPREADSHEET) )

router.post("/",
// FileController.validateFile,
FileTagController.addFileTag);

exports.default = router;
//# sourceMappingURL=FileTagRoute.js.map