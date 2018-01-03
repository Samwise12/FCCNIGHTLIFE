'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _User = require('../models/User');

var _User2 = _interopRequireDefault(_User);

var _parseErrors = require('../utils/parseErrors');

var _parseErrors2 = _interopRequireDefault(_parseErrors);

var _mailer = require('../mailer');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();
// night-api


router.post('/', function (req, res) {
	var _req$body$user = req.body.user,
	    email = _req$body$user.email,
	    password = _req$body$user.password;

	var user = new _User2.default({ email: email });
	user.setPassword(password);
	user.setConfirmationToken();
	user.save().then(function (userRecord) {
		(0, _mailer.sendConfirmationEmail)(userRecord);
		res.json({ user: userRecord.toAuthJSON() });
	}).catch(function (err) {
		return res.status(400).json({ errors: (0, _parseErrors2.default)(err.errors) });
	});
});

exports.default = router;