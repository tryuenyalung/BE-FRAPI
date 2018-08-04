'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.findAll = exports.findAllFilesByOwner = exports.findOne = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _gridfsStream = require('gridfs-stream');

var _gridfsStream2 = _interopRequireDefault(_gridfsStream);

var _Pagination = require('./Pagination');

var PaginationService = _interopRequireWildcard(_Pagination);

var _keys = require('./../keys');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

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

var findOne = exports.findOne = function findOne(bucket) {

    return function (req, res) {

        var fileName = { filename: req.params.filename };

        gfs.collection(bucket);

        var cbFindFile = function cbFindFile(err, file) {
            var readstream = gfs.createReadStream(fileName);
            // return error msg
            // readstream.on('error', (err) => res.status(404).send(keys.FILE_ERR_MSG))
            readstream.on('error', function (err) {
                return res.status(404).send(_keys2.default.FILE_ERR_MSG);
            });
            // return file
            readstream.pipe(res);
        };

        gfs.files.findOne(fileName, cbFindFile);
    };
};

// export const findOne =(req,res,bucket)=>{

//     const fileExt = path.extname(req.params.filename)
//     const bucketName = bucket
//     const fileName = {filename: req.params.filename}

//     // select a bucket base on file extension
//     gfs.collection( bucketName )

//     gfs.files.findOne(fileName, (err, file) =>{
//         const readstream = gfs.createReadStream(fileName)
//         // return error msg
//         readstream.on('error', (err) => res.status(404).send(keys.FILE_ERR_MSG))
//         // return file
//         readstream.pipe(res)

//     })

// }

// gfs.files.find({ filename: 'myImage.png' }).toArray(function (err, files) {
//     if (err) ...
//     console.log(files);
//   })


var findAllFilesByOwner = exports.findAllFilesByOwner = function findAllFilesByOwner(req, res) {
    var page = req.query.page;
    var limit = req.query.limit;
    var image_tag = req.query.tag;
    var bucket = req.headers.bucket;

    var fileOwner = {
        metadata: {
            owner: req.headers.owner_id
        }

        // choose a bucket to search files
    };gfs.collection(bucket);

    var cbFindFile = function cbFindFile(err, files) {
        err ? res.status(400).send(err) : res.json(PaginationService.paginate(files, page, limit));
    };

    gfs.files.find(fileOwner).toArray(cbFindFile);
};

var findAll = exports.findAll = function findAll(req, res) {
    var page = req.query.page;
    var limit = req.query.limit;
    // const file_type = req.headers.file_type

    gfs.collection("image");
    // gfs.collection( "fileType")

    // const fileOwner = {
    //     metadata: {
    //         owner: "5b61c8a8d0902c000414ccd6", req.headers.owner_id
    //         image_tag: "weee"
    //     }
    // }

    var fileOwner = {
        'metadata.owner': req.headers.owner_id,
        'metadata.image_tag': new RegExp(req.headers.tag, 'i')
    };

    var cbFindFile = function cbFindFile(err, files) {
        err ? res.status(400).send(err) : res.json(PaginationService.paginate(files, page, limit));
    };

    // {
    //     'metadata.section': 'my-blog'
    //     'metadata.published': { '$lt': datetime.utcnow() } }

    gfs.files.find(fileOwner).toArray(cbFindFile);
};

//findByUser
//header file_type
//header user?
//# sourceMappingURL=GridFsStream.js.map