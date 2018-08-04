'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _keys = require('./keys');

var _keys2 = _interopRequireDefault(_keys);

var _AppServer = require('./configs/AppServer');

var _AppServer2 = _interopRequireDefault(_AppServer);

var _BodyParser = require('./configs/BodyParser');

var _BodyParser2 = _interopRequireDefault(_BodyParser);

var _MongoDB = require('./configs/MongoDB');

var _MongoDB2 = _interopRequireDefault(_MongoDB);

var _Routes = require('./routes/Routes');

var _Routes2 = _interopRequireDefault(_Routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

app.use((0, _cors2.default)());
// app.use ((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });

// app.use( (req, res, next) => {
//     // res.header("Access-Control-Allow-Origin", "*")
//     // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, meta")
//     res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, meta")
//     res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS')

//     // res.header("Access-Control-Allow-Origin", "*");
//     // res.header("Access-Control-Allow-Credentials", "true");
//     // res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
//     // res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");

//     next()
// })

(0, _MongoDB2.default)();
(0, _AppServer2.default)(app);
(0, _BodyParser2.default)(app);
(0, _Routes2.default)(app);

app.get('*', function (req, res) {
    return res.status(404).send(_keys2.default.ERR_MSG);
});
//# sourceMappingURL=Application.js.map