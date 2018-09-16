'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.findAll = exports.updateFile = exports.deactivateFile = exports.findAllSharedFilesByUserId = exports.findAllFilesByOwner = exports.findOne = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _gridfsStream = require('gridfs-stream');

var _gridfsStream2 = _interopRequireDefault(_gridfsStream);

var _Pagination = require('./Pagination');

var PaginationService = _interopRequireWildcard(_Pagination);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _keys = require('./../keys');

var _keys2 = _interopRequireDefault(_keys);

var _dns = require('dns');

var _fs = require('fs');

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

        var fileName = {
            filename: req.params.filename
        };

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
    var bucket = req.query.bucket;
    var tag = req.query.tag;
    var name = req.query.name;
    var owner_id = req.query.id;

    gfs.collection(bucket);

    var fileOwner = {
        'metadata.owner': owner_id,
        'metadata.name': new RegExp(name, 'i'),
        'metadata.tag': new RegExp(tag, 'i'),
        'metadata.isDeleted': false
    };

    var cbFindFile = function cbFindFile(err, files) {
        err ? res.status(400).send(err) : res.json(PaginationService.paginate(files, page, limit));
    };

    gfs.files.find(fileOwner).toArray(cbFindFile);
};

var findAllSharedFilesByUserId = exports.findAllSharedFilesByUserId = function findAllSharedFilesByUserId(req, res) {
    var page = req.query.page;
    var limit = req.query.limit;
    var bucket = req.query.bucket;
    var tag = req.query.tag;
    var name = req.query.name;
    var sharedUser_id = req.query.id;
    gfs.collection(bucket);

    var fileOwner = {
        'metadata.tag': new RegExp(tag, 'i'),
        'metadata.name': new RegExp(name, 'i'),
        'metadata.sharedUser': {
            $elemMatch: {
                //any record on arrays of object containing the id will be displayed
                id: sharedUser_id
            }
        },

        'metadata.isDeleted': false
    };

    var cbFindFile = function cbFindFile(err, files) {
        err ? res.status(400).send(err) : res.json(PaginationService.paginate(files, page, limit));
    };

    gfs.files.find(fileOwner).toArray(cbFindFile);
};

var deactivateFile = exports.deactivateFile = function deactivateFile(req, res) {

    var config = {
        queryString: req.query,
        validQueryString: ['bucket', 'filename'],
        UPDATE_METADATA: {
            'metadata.isDeleted': true
        }
    };

    validatingQueryString(config).then(function (x) {
        return deactivatingFile(x);
    }).then(function (x) {
        return res.status(200).send(x);
    }).catch(function (err) {
        return res.status(400).send(err);
    });

    //PROMISE
    var deactivatingFile = function deactivatingFile(data) {
        return new Promise(function (resolve, reject) {

            gfs.collection(data.queryString.bucket);

            var cbDeactivateFile = function cbDeactivateFile(err, updated) {
                return err ? reject("error on updating metadata") : resolve({
                    message: "file deactivated"
                });
            };

            gfs.files.update({
                filename: data.queryString.filename
            }, {
                $set: data.UPDATE_METADATA
            }, cbDeactivateFile);
        });
    };
};

var updateFile = exports.updateFile = function updateFile(req, res) {
    //PROMISE
    var updatingFile = function updatingFile(data) {
        return new Promise(function (resolve, reject) {

            gfs.collection(data.bucket);

            var cbUpdateFile = function cbUpdateFile(err, updated) {
                return err ? reject("error on updating metadata") : resolve({
                    message: "updated shared users"
                });
            };

            gfs.files.update({
                filename: data.filename
            }, {
                $set: data.UPDATE_METADATA
            }, cbUpdateFile);
        });
    };

    var config = {
        bucket: req.body.bucket,
        filename: req.body.filename,
        UPDATE_METADATA: {
            'metadata.sharedUser': req.body.sharedUser,
            'metadata.name': req.body.name,
            'metadata.tag': req.body.tag
        }
    };

    return updatingFile(config).then(function (x) {
        return res.status(200).send(x);
    }).catch(function (err) {
        return res.status(400).send(err);
    });
};

//REUSABLE PROMISE
var validatingQueryString = function validatingQueryString(data) {

    var msg = "";

    return new Promise(function (resolve, reject) {

        data.validQueryString.forEach(function (x) {
            if (x in data.queryString === false) msg = ' ' + (msg + x) + ', ';
        });

        !_lodash2.default.isEmpty(msg) ? reject({
            "error": 'missing query strings :' + msg
        }) : resolve(data);
    });
};

// db.open()
//     // !!!!!!!!!
//     // !WARNING! THIS DROPS THE CURRENT DATABASE
//     // !!!!!!!!!
//     .then(() => db.dropDatabase())
//     .then(() => {
//         const gfs = Grid(db, mongo);

//         // create my_file
//         return new Promise((resolve, reject) => {
//             gfs.createWriteStream({ filename: 'my_file.txt' })
//                 .once('finish', resolve)
//                 .once('error', reject)
//                 .end('hello world');
//         })
//             // find my_file
//             .then(() => gfs.files.findOne({ filename: 'my_file.txt'})
//             .then(file => console.log('should find file:', !!file)))
//             // rename my_file to my_renamed_file
//             .then(() => gfs.files.update(
//                 { filename: 'my_file.txt'},
//                 { $set: { filename: 'my_renamed_file.txt' } }
//             )
//             .then(res => console.log('should have modified:', res.result.nModified === 1)))
//             // should not find my_file
//             .then(() => gfs.files.findOne({ filename: 'my_file.txt'})
//             .then(file => console.log('should not find: ', !file)))
//             // should find my_renamed_file
//             .then(() => gfs.files.findOne({ filename: 'my_renamed_file.txt'})
//             .then(file => console.log('should find renamed:', !!file)))
//     })
//     .catch(console.error);


var findAll = exports.findAll = function findAll(req, res) {
    var page = req.query.page;
    var limit = req.query.limit;
    var bucket = req.query.bucket;
    var image_tag = req.query.tag;
    var owner_id = req.query.id;

    gfs.collection(bucket);
    // gfs.collection( "fileType")

    // const fileOwner = {
    //     metadata: {
    //         owner: "5b61c8a8d0902c000414ccd6", req.headers.owner_id
    //         image_tag: "weee"
    //     }
    // }

    var fileOwner = {
        'metadata.owner': owner_id,
        'metadata.image_tag': new RegExp(image_tag, 'i'),
        'metadata.isDeleted': false
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