var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'T-514-VEFT Kodemon' });
});

/* GET chart page. */
router.get('/chart/:key/:keyname', function(req, res) {
  res.render('chart', { title: 'Kodemon - Chart: ', chartId: req.param("key"), chartName: req.param("keyname") });
});

module.exports = router;

