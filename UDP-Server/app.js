var dgram = require("dgram");
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var KodemonSchema=mongoose.Schema({
	execution_time: Number,
	timestamp: Date,
	token: String,
	key: String
});

var MonData=mongoose.model('MonData',KodemonSchema);

var server = dgram.createSocket("udp4");


var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log('Connected to MongoDB');
});

server.on("message", function(msg, rinfo){
  console.log('got message from client: ' + msg);
  var data=JSON.parse(msg);
  var mondata= new MonData({
    execution_time: data.execution_time,
    timestamp: new Date(data.timestamp*1000),
    token: data.token,
    key: data.key
  });
  mondata.save(function(err, mondata){
    console.log('client executed: ' + data.sub + ' time: ' + data.execution_time);
    var dags = new Date(data.timestamp*1000); //dags.getDate()+'-'+dags.getMonth()+'-'+dags.getFullYear()+ ' - ' +dags.getHours()+':'+dags.getMinutes()+':'+dags.getSeconds()
    console.log(dags.toGMTString());
  });
});

server.on('listening', function(){
  console.log('Kodemon server listening on')
  console.log('hostname: ' + server.address().address);
  console.log('port: ' + server.address().port);
});

server.bind(4000)

