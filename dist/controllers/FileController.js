'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.sendResponse = exports.validateFile = undefined;

var _keys = require('./../keys');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var bucketList = _keys2.default.BUCKET_LIST;

// export const validateFile =(req, res, next)=>{
//     let bucketName = getBucket(req.headers.bucket)

//     if(bucketName === null){
//         res.status(400).send(keys.NO_BUCKET_ERR_MSG) }
//     }else{
//         next()
//     }
// }

var validateFile = exports.validateFile = function validateFile(req, res, next) {
    var bucketName = getBucket(req.headers.bucket);

    bucketName !== null ? next() : res.status(400).send(_keys2.default.NO_BUCKET_ERR_MSG);
}; //@end

var sendResponse = exports.sendResponse = function sendResponse(req, res) {
    res.json({ file: req.file });
};

// check the file extension and the bucket for it
var getBucket = function getBucket(bucketFromHeader) {
    var bucket = bucketList[bucketFromHeader];
    return bucket ? bucket : null;
};
//# sourceMappingURL=FileController.js.map