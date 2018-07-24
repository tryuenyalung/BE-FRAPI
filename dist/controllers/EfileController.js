'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.deleteEfile = exports.approveEfile = exports.updateEfile = exports.findEfileById = exports.paginatedEfile = exports.findAllPrivatePublishedEfileByUserId = exports.findAllRejectedEfileByUserId = exports.findAllPublicPublishedEfile = exports.findAllPendingEfileById = exports.findAllEfiles = exports.createEfile = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _Efile = require('./../schemas/Efile');

var _Efile2 = _interopRequireDefault(_Efile);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//create efile
var createEfile = exports.createEfile = function createEfile(req, res) {
    var body = req.body;
    //copy the values of recipient to pending recipients
    body = Object.assign(body, { pending_recipient: req.body.recipient });

    _Efile2.default.create(body, function (err, data) {
        return err ? res.status(422).send(err) : res.status(201).send(data);
    });
}; //@end

//read all data
var findAllEfiles = exports.findAllEfiles = function findAllEfiles(req, res) {
    //exclude content
    _Efile2.default.find({}, '-content', function (err, data) {
        return err ? res.status(500).send(err) : res.send(data);
    });
}; //@end

//read all data
var findAllPendingEfileById = exports.findAllPendingEfileById = function findAllPendingEfileById(req, res) {
    //search all pending efile that a specific user has by id, disregard content
    var searchObj = {
        "pending_recipient.0.id": req.params.userId,
        $where: "this.rejected_recipient ===  null"
    };
    var pageInput = req.query.page;
    paginatedSearch(searchObj, pageInput, res);
}; //@end

//read all data
var findAllPublicPublishedEfile = exports.findAllPublicPublishedEfile = function findAllPublicPublishedEfile(req, res) {
    var efileName = req.query.name;
    var sender = req.query.sender;
    var recipient = req.query.recipient;
    var createdAt = req.query.createdAt;

    // _.isEmpty(createdAt) ? createdAt = null : createdAt = new Date( req.query.createdAt ).toISOString() 

    var searchObj = {
        private_doc: false,
        publish: true,
        name: new RegExp(efileName, 'i'),
        'recipient.name': new RegExp(recipient, 'i'),
        'sender.name': new RegExp(sender, 'i')
        // created_at: new RegExp( createdAt, 'i'),


        // if createdAt not empty add search to db
    };if (!_lodash2.default.isEmpty(createdAt)) {
        searchObj = _extends({}, searchObj, { created_at: { $gte: new Date(req.query.createdAt).toISOString() } });
    }

    console.log(searchObj);

    var pageInput = req.query.page;
    // Object.keys(searchObj).forEach((key) => (searchObj[key] == null) && delete searchObj[key])
    paginatedSearch(searchObj, pageInput, res);
}; //@end

//read all data
var findAllRejectedEfileByUserId = exports.findAllRejectedEfileByUserId = function findAllRejectedEfileByUserId(req, res) {
    var user_id = req.params.userId;
    // find all rejected efiles where the sender is you
    var searchObj = {
        'sender.id': user_id,
        $where: "this.rejected_recipient !==  null"
    };
    var pageInput = req.query.page;
    paginatedSearch(searchObj, pageInput, res);
}; //@end

//read all data
var findAllPrivatePublishedEfileByUserId = exports.findAllPrivatePublishedEfileByUserId = function findAllPrivatePublishedEfileByUserId(req, res) {
    var user_id = req.params.userId;
    var pageInput = req.query.page;
    var efileName = req.query.name;
    var sender = req.query.sender;
    var recipient = req.query.recipient;
    var createdAt = req.query.createdAt;

    // const searchName = req.query.name

    var searchObj = { //find all private efile that has been published that you have access
        private_doc: true, //it is a private doc
        publish: true, // it is published
        name: new RegExp(efileName, 'i'),
        'recipient.name': new RegExp(recipient, 'i'),
        'sender.name': new RegExp(sender, 'i'),

        //should get all the published private efile if the user is either the sender or recipient
        $or: [{
            recipient: {
                $elemMatch: {
                    //any record on arrays of object containing the id will be displayed
                    id: user_id
                }
            }
        }, { //check if the sender is you
            'sender.id': user_id
        }] //or

        //sender object

        // if createdAt not empty add search to db
    };if (!_lodash2.default.isEmpty(createdAt)) {
        searchObj = _extends({}, searchObj, { created_at: { $gte: new Date(req.query.createdAt).toISOString() } });
    }

    paginatedSearch(searchObj, pageInput, res);
}; //@end

//get efile list with pagination
var paginatedEfile = exports.paginatedEfile = function paginatedEfile(req, res, next) {
    if (isNaN(req.query.page)) {
        next();
    } else {
        _Efile2.default.paginate(_Efile2.default.find({}, '-content'), { page: req.query.page, limit: 10 }, function (err, data) {
            err ? res.status(500).send(err) : res.send(data);
        });
    }
}; //@end

//read one data
var findEfileById = exports.findEfileById = function findEfileById(req, res) {
    var id = req.params.efileId;
    _Efile2.default.findById(id).exec(function (err, data) {
        if (err) {
            res.status(500).send({ message: 'no user found at id : ' + id });
        } else {
            data !== null ? res.send(data) : res.status(404).send({ message: 'no user found at id : ' + id });
        }
    });
}; //@end

//update one by id
var updateEfile = exports.updateEfile = function updateEfile(req, res) {
    var id = req.params.efileId;

    _Efile2.default.findById(id, function (err, data) {
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

//approve efile
//this needs to be refactor
var approveEfile = exports.approveEfile = function approveEfile(req, res) {
    var id = req.params.efileId;

    var cbApproveEfile = function cbApproveEfile(err, data) {
        //fetch the data from id
        if (err) {
            res.status(404).send({ message: 'no efile found at id : ' + req.params.id });
        } else {
            if (!data.pending_recipient.length) {
                //check if no more pending recipients
                res.status(400).send({ message: 'efile : ' + id + ' , was already published' });
            } else {

                var pending_recipient = data.pending_recipient;
                var approved_recipient = data.approved_recipient;

                var approve_user_details = req.body;

                //remove the first recipient of the pending recipient to be transfer to approve recipient
                var approve_user = pending_recipient.shift();
                //get the old signature
                var signatures = data.signatures;
                //append another signature
                signatures += escape('<span>\n                                        <div style=\'display:inline-block !important; text-align:center !important; padding-left:10px !important; padding-right:10px !important;\'>\n                                        <img src=\'' + approve_user_details.signature + '\' width=\'150\'>\n                                        <br> ' + approve_user_details.name.first_name + ' ' + approve_user_details.name.middle_name + ' ' + approve_user_details.name.last_name + ' <br>\n                                        ' + approve_user_details.position + '\n                                        </div>\n                                    <span>');

                //add the recipient who approved the efile to the approved recipient
                approved_recipient.push(approve_user);

                var updated_recipients = {
                    approved_recipient: approved_recipient,
                    pending_recipient: pending_recipient,
                    signatures: signatures

                    //check if pending recipients is empty
                };if (!pending_recipient.length) {
                    //make the efile publish if no more pending recipients


                    var content = unescape(data.content);
                    // remove the </body> </html> on the end to append the signature
                    content = content.substring(0, content.length - 20);
                    // insert the signature at the end and add </body> </html>
                    content = ' ' + content + '  <div style=\'text-align: center !important\'> ' + unescape(updated_recipients.signatures) + '</div></body></html>';

                    var updatedContentWithSignature = escape(content);
                    // let updatedContentWithSignature = content

                    var publishedEfile = Object.assign(updated_recipients, { content: updatedContentWithSignature, publish: true });
                    var body = Object.assign(data, publishedEfile);

                    //update efile content here 

                    body.save(function (err, data) {
                        return err ? res.send(err) : res.send(data);
                    }); //update the data from db
                } else {
                    //just update the pending & approved recipients
                    var _body = Object.assign(data, updated_recipients); //overwrite the data 
                    _body.save(function (err, data) {
                        return err ? res.send(err) : res.send(data);
                    }); //update the data from db
                } //else
            } //else
        } //else
    }; //cbApproveEfile

    _Efile2.default.findById(id, cbApproveEfile);
}; //@end


//delete one data by id
var deleteEfile = exports.deleteEfile = function deleteEfile(req, res) {
    var id = req.params.efileId;
    _Efile2.default.findOneAndRemove({ _id: id }, function (err, data) {
        err ? res.status(404).send({ message: 'no user found at id : ' + id }) : res.status(200).send({ message: 'user deleted at id : ' + id });
    });
}; //@end


//////////////////
//reusable method for searching query strings
var paginatedSearch = function paginatedSearch(searchObj) {
    var pageInput = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
    var res = arguments[2];

    _Efile2.default.paginate(_Efile2.default.find(searchObj, '-content'), { page: pageInput, limit: 10 }, function (err, data) {
        err ? res.status(500).send(err) : res.send(data);
    });
};
//# sourceMappingURL=EfileController.js.map