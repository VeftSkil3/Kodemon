var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'T-514-VEFT Kodemon' });
});

/* GET chart page. */
router.get('/chart', function(req, res) {
  res.render('chart', { title: 'T-514-VEFT Kodemon - Chart' });
});

module.exports = router;
