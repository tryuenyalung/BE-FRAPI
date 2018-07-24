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

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _gridfsStream = require('gridfs-stream');

var _gridfsStream2 = _interopRequireDefault(_gridfsStream);

var _keys = require('./../keys');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get('/', FileStream.findAll);

router.get('/:filename', FileStream.findOne);

router.post("/", FileUpload.upload.single('file'), FileController.upload);

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