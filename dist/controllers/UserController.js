'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.searchQuery = exports.deleteUser = exports.updateUserPassword = exports.updateUser = exports.findUserById = exports.findAllUsers = exports.paginatedUser = exports.addUser = undefined;

var _Users = require('./../schemas/Users');

var _Users2 = _interopRequireDefault(_Users);

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var saltRounds = 10;

//create data
var addUser = exports.addUser = function addUser(req, res) {
    //check if username already exist
    _Users2.default.findOne({ username: req.body.username }, function (err, userData) {

        if (userData !== null) {
            //check if the return data is empty
            res.status(400).send({ errors: 'username: ' + req.body.username + ' already exist' });
        } else {
            //hash the password 
            _bcrypt2.default.hash(req.body.password, saltRounds).then(function (hashedPassword) {
                //update the password the req.body
                var userData = Object.assign(req.body, { password: hashedPassword });

                _Users2.default.create(userData, function (err, data) {
                    return err ? res.status(422).send(err) : res.status(201).send(data);
                });
            }); //bcrypt
        } //else
    }); //findOne
}; //@end

//get user list with pagination
var paginatedUser = exports.paginatedUser = function paginatedUser(req, res, next) {
    if (isNaN(req.query.page)) {
        next();
    } else {
        _Users2.default.paginate({}, { page: req.query.page, limit: 10 }, function (err, data) {
            err ? res.status(500).send(err) : res.send(data);
        });
    }
}; //@end


//read all data
var findAllUsers = exports.findAllUsers = function findAllUsers(req, res) {
    _Users2.default.find({}, function (err, data) {
        return err ? res.status(500).send(err) : res.send(data);
    });
}; //@end

//read one data
var findUserById = exports.findUserById = function findUserById(req, res) {
    var id = req.params.userId;
    _Users2.default.findById(id).exec(function (err, data) {
        if (err) {
            res.status(500).send({ message: 'no user found at id : ' + id });
        } else {
            data !== null ? res.send(data) : res.status(404).send({ message: 'no user found at id : ' + id });
        }
    });
}; //@end

//update one by id
var updateUser = exports.updateUser = function updateUser(req, res) {
    var id = req.params.userId;

    _Users2.default.findById(id, function (err, data) {
        //fetch the data from id
        if (err) {
            res.status(404).send({ message: 'no user found at id : ' + req.params.id });
        } else {
            var body = Object.assign(data, req.body); //overwrite the data 
            body.save(function (err, data) {
                return err ? res.send(err) : res.send(data);
            }); //update the data from db
        } //else
    });
}; //@end

//update user's password by id
var updateUserPassword = exports.updateUserPassword = function updateUserPassword(req, res) {
    var id = req.params.userId;

    _Users2.default.findById(id, function (err, data) {
        //fetch the data from id
        if (err) {
            res.status(404).send({ message: 'no user found at id : ' + req.params.id });
        } else {
            var body = Object.assign(data, req.body); //overwrite the data 

            _bcrypt2.default.hash(body.password, saltRounds).then(function (hashedPassword) {
                //update the password on the body
                Object.assign(body, { password: hashedPassword });

                body.save(function (err, data) {
                    return err ? res.send(err) : res.send(data);
                }); //update the data from db
            }); //bcrypt
        } //else
    });
}; //@end

//delete one data by id
var deleteUser = exports.deleteUser = function deleteUser(req, res) {
    var id = req.params.userId;
    _Users2.default.findOneAndRemove({ _id: id }, function (err, data) {
        err ? res.status(404).send({ message: 'no user found at id : ' + id }) : res.status(200).send({ message: 'user deleted at id : ' + id });
    });
}; //@end

//search by query strings
var searchQuery = exports.searchQuery = function searchQuery(req, res) {

    if (req.query.gender) {
        var searchObj = { gender: req.query.gender };
        var page = req.query.page;
        findByQueryString(searchObj, page, res);
    } else if (req.query.address) {
        var _searchObj = { address: new RegExp(req.query.address, 'i') };
        var _page = req.query.page;
        findByQueryString(_searchObj, _page, res);
    }

    // DO NOT DELETE! 
    // else if(req.query.status){// y = true , any character(but intercepted on validator, use n for false) = false
    //     let statusInput = false

    //     req.query.status === 'y' ? statusInput = true : statusInput = false 

    //     let searchObj = { status: statusInput }
    //     let page = req.query.page
    //     findByQueryString(searchObj, page ,res)
    // }

    else if (req.query.status) {
            // y = true , any character(but intercepted on validator, use n for false) = false
            var statusInput = false;
            req.query.status === 'y' ? statusInput = true : statusInput = false;
            var _searchObj2 = { status: true };
            _Users2.default.find(_searchObj2, function (err, data) {
                return err ? res.status(500).send(err) : res.send(data);
            });
        } else if (req.query.department) {
            var _searchObj3 = { department: new RegExp(req.query.department, 'i') };
            var _page2 = req.query.page;
            findByQueryString(_searchObj3, _page2, res);
        } else if (req.query.position) {
            var _searchObj4 = { position: new RegExp(req.query.position, 'i') };
            var _page3 = req.query.page;
            findByQueryString(_searchObj4, _page3, res);
        } else if (req.query.dateOfBirth) {
            var _searchObj5 = { dateOfBirth: new RegExp(req.query.dateOfBirth, 'i') };
            var _page4 = req.query.page;
            findByQueryString(_searchObj5, _page4, res);
        } else if (req.query.username) {
            var _searchObj6 = { username: new RegExp(req.query.username, 'i') };
            var _page5 = req.query.page;
            findByQueryString(_searchObj6, _page5, res);
        } else if (req.query.name) {
            var _searchObj7 = {
                $or: [{ 'name.first_name': new RegExp(req.query.name, 'i') }, { 'name.last_name': new RegExp(req.query.name, 'i') }, { 'name.middle_name': new RegExp(req.query.name, 'i') }]
            };
            var _page6 = req.query.page;
            findByQueryString(_searchObj7, _page6, res);
        } else {
            var _searchObj8 = req.query;
            var _page7 = req.query.page;
            findByQueryString(_searchObj8, _page7, res);
        }
}; //@end

//reusable method for searching query strings
var findByQueryString = function findByQueryString(searchObj, pageInput, res) {
    _Users2.default.paginate(_Users2.default.find(searchObj), { page: pageInput, limit: 10 }, function (err, data) {
        err ? res.status(500).send(err) : res.send(data);
    });
};
//# sourceMappingURL=UserController.js.map