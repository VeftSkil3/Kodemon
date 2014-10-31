var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'T-514-VEFT Kodemon' });
});

module.exports = router;

