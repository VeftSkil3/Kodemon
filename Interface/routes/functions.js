var express = require('express');
var router = express.Router();
var request = require("request");

/* GET list of functions. */
router.get('/functionlist', function(req, res1) {
  request.get("http://localhost:4242/api/kodemon/keys", function (err, res, body) {
		if (!err) {
			var resultsObj = JSON.parse(body);
			res1.send(resultsObj);
		}
	});
});

/* GET list of functions. */
router.get('/times/:id', function(req, res1) {
  request.get("http://localhost:4242/api/kodemon/key/times/"+req.params.id, function (err, res, body) {
		if (!err) {
			var resultsObj = JSON.parse(body);
			res1.send(resultsObj);
		}
	});
});

/* GET list of functions by date. */
router.get('/times/:id/:from/:to', function(req, res1) {
  request.get("http://localhost:4242/api/kodemon/key/times/"+req.params.id + "/" + req.params.from + "/" + req.params.to, function (err, res, body) {
		if (!err) {
			var resultsObj = JSON.parse(body);
			res1.send(resultsObj);
		}
	});
});

module.exports = router;
