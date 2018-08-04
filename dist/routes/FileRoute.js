'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _FileController = require('./../controllers/FileController');

var FileController = _interopRequireWildcard(_FileController);

var _GridFsStorage = require('./../services/GridFsStorage');

var FileUpload = _interopRequireWildcard(_GridFsStorage);

var _GridFsStream = require('./../services/GridFsStream');

var FileStream = _interopRequireWildcard(_GridFsStream);

var _keys = require('./../keys');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import mongoose from 'mongoose'
// import path from 'path'
// import Grid from 'gridfs-stream'
// import keys from './../keys'


var router = _express2.default.Router();

// router.get('/', FileStream.findAll)
router.get('/', FileStream.findAllFilesByOwner);

router.get('/signature/:filename', FileStream.findOne(_keys2.default.BUCKET.SIGNATURE));
router.get('/image/:filename', FileStream.findOne(_keys2.default.BUCKET.IMAGE));
router.get('/profile/:filename', FileStream.findOne(_keys2.default.BUCKET.PROFILE));
router.get('/document/:filename', FileStream.findOne(_keys2.default.BUCKET.DOCUMENT));
router.get('/presentation/:filename', FileStream.findOne(_keys2.default.BUCKET.PRESENTATION));
router.get('/spreadsheet/:filename', FileStream.findOne(_keys2.default.BUCKET.SPREADSHEET));

router.post("/",
// FileController.validateFile,
FileUpload.upload.single('file'), FileController.sendResponse);

// router.put(
//     '/:id', 
//     usersController.method
// )

// router.delete(
//     '/:id',
//     usersController.method
// )

exports.default = router;
//# sourceMappingURL=FileRoute.js.map