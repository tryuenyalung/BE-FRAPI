'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.paginate = undefined;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var paginate = exports.paginate = function paginate(arrayToPaginate) {
    var page = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
    var limit = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 8;


    page = Number.parseInt(page);
    limit = Number.parseInt(limit);
    var offset = (page - 1) * limit;

    return {
        docs: _lodash2.default.drop(arrayToPaginate, offset).slice(0, limit),
        total: arrayToPaginate.length,
        limit: limit,
        page: page,
        pages: Math.ceil(arrayToPaginate.length / limit)
    };
};
//# sourceMappingURL=Pagination.js.map