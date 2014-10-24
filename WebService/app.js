express = require("express");
//path = require("path");
mongoose = require('mongoose');

var app = express();

// Database

mongoose.connect('mongodb://localhost/test');

var KodemonSchema=mongoose.Schema({
	execution_time: Number,
	timestamp: Date,
	token: String,
	key: String
});

var MonData=mongoose.model('MonData',KodemonSchema);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log('Connected to MongoDB');
});

app.get('/api', function (req, res) {
  res.send('API is running');
});

app.get('/api/kodemon/keys', function (req, res){
  return MonData.distinct('key',function (err, mondatas) {
    if (!err) {
      return res.send(mondatas);
    } else {
      return console.log(err);
    }
  });
});

app.get('/api/kodemon/key/times/:id', function (req, res){
  console.log(req.params.id);
  MonData.findById(req.params.id,function (err, mondatas){
	  if (!err) {
      return MonData.find({'key': mondatas.key},function (err, mondatas) {
        if (!err) {
          return res.send(mondatas);
        } else {
          return console.log(err);
        }
      });
    }
  });
});


// Launch server

app.listen(4242);
